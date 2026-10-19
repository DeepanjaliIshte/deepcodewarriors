import { Course, Topic, Subtopic, LearningStep, UserProgress, Quiz } from "./course-schema";
import { MOCK_COURSES } from "./mock-courses";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, getDocs as getDocsQuery } from "firebase/firestore";

// Fetch courses from Firestore, fallback to mock data if empty
export async function getCourses(): Promise<Course[]> {
  try {
    const coursesCol = collection(db, "courses");
    const courseSnapshot = await getDocs(coursesCol);
    
    if (courseSnapshot.empty) {
      console.log("Firestore 'courses' collection is empty, using mock data fallback.");
      return MOCK_COURSES;
    }
    
    const firestoreCourses = courseSnapshot.docs.map(doc => doc.data() as Course);
    // Merge or fallback to mock courses if firestore has stub/incomplete data
    return MOCK_COURSES.map(mockCourse => {
      const match = firestoreCourses.find(fc => fc.slug === mockCourse.slug || fc.id === mockCourse.id);
      if (!match || (match.topics && match.topics.length < mockCourse.topics.length)) {
        return mockCourse;
      }
      return match;
    });
  } catch (error) {
    console.error("Error fetching courses from Firestore, using mock data:", error);
    return MOCK_COURSES;
  }
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const mockCourse = MOCK_COURSES.find((c) => c.slug === slug) || null;
  try {
    const q = query(collection(db, "courses"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log(`Course ${slug} not found in Firestore, checking mock data.`);
      return mockCourse;
    }
    
    const firestoreCourse = querySnapshot.docs[0].data() as Course;
    // Prevent stale/stub Firestore records with fewer topics from truncating the curriculum
    if (mockCourse && (!firestoreCourse.topics || firestoreCourse.topics.length < mockCourse.topics.length)) {
      return mockCourse;
    }
    return firestoreCourse;
  } catch (error) {
    console.error("Error fetching course by slug from Firestore, using mock data:", error);
    return mockCourse;
  }
}

export async function getTopicBySlug(courseSlug: string, topicSlug: string): Promise<{course: Course, topic: Topic} | null> {
  try {
    const course = await getCourseBySlug(courseSlug);
    if (!course) return null;
    
    const topic = course.topics.find((t) => t.slug === topicSlug);
    if (!topic) return null;

    return { course, topic };
  } catch (error) {
    console.error("Error in getTopicBySlug:", error);
    return null;
  }
}

// Adapter to transform Course -> Learning Path
export function mapCourseToLearningPath(course: Course, progress?: UserProgress | null): LearningStep[] {
  return course.topics.map((topic, index) => {
    
    let status: "locked" | "available" | "in_progress" | "completed" = "locked";
    
    if (progress) {
      if (progress.completedSteps?.includes(topic.id)) {
        status = "completed";
      } else {
        if (index === 0) {
          status = "available";
        } else {
          const previousTopicId = course.topics[index - 1].id;
          if (progress.completedSteps?.includes(previousTopicId)) {
            status = "available";
          }
        }
        
        if (status === "available" && progress.currentStep === topic.id) {
          const hasProgress = progress.stepProgress && progress.stepProgress[topic.id] > 0;
          if (hasProgress) {
            status = "in_progress";
          }
        }
      }
    } else {
      // Guest state: first step is available
      if (index === 0) {
        status = "available";
      }
    }

    const prerequisites = index > 0 ? [course.topics[index - 1].id] : [];

    let practiceQs = topic.subtopics.flatMap(st => st.practiceQuestions || []);
    if (practiceQs.length === 0) {
      practiceQs = [`Write a basic program demonstrating the concepts of ${topic.title}.`];
    }

    // Generate step-specific quiz from subtopics quizzes or course quiz
    const subtopicQuestions = topic.subtopics.flatMap(st => st.quiz?.questions || []);
    let stepQuiz: Quiz | undefined;
    if (subtopicQuestions.length > 0) {
      stepQuiz = {
        id: `quiz-${topic.id}`,
        courseId: course.id,
        title: `Quiz: ${topic.title}`,
        passingScore: 70,
        questions: subtopicQuestions.slice(0, 10)
      };
    } else if (course.quiz && course.quiz.questions.length > 0) {
      stepQuiz = {
        id: `quiz-${topic.id}`,
        courseId: course.id,
        title: `Quiz: ${topic.title}`,
        passingScore: 70,
        questions: course.quiz.questions.slice(0, 10)
      };
    } else {
      stepQuiz = {
        id: `quiz-${topic.id}`,
        courseId: course.id,
        title: `Quiz: ${topic.title}`,
        passingScore: 70,
        questions: [
           {
              id: `q-${topic.id}-1`,
              question: `Which of the following is a key application of ${topic.title}?`,
              options: ["Implementing core logic.", "Ignoring standard conventions.", "Causing application crashes.", "Bypassing security protocols."],
              correctOptionIndex: 0,
              explanation: "These concepts are fundamental to writing robust software."
           }
        ]
      };
    }

    return {
      id: topic.id,
      courseId: course.id,
      stepNumber: index + 1,
      title: topic.title,
      slug: topic.slug,
      description: topic.description,
      level: course.level,
      lessons: topic.subtopics,
      practiceQuestions: practiceQs,
      quiz: stepQuiz,
      passingScore: 70,
      prerequisites,
      status
    };
  });
}
