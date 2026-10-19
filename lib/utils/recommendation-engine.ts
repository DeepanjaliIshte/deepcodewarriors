import { Course, UserProgress } from "@/lib/data/course-schema";
import { mapCourseToLearningPath } from "@/lib/data/course-service";

export interface Recommendation {
  title: string;
  description: string;
  actionText: string;
  url: string;
}

export function getSmartNextStep(courses: Course[], progressData: Record<string, UserProgress>): Recommendation {
  // Simple Rule-Based Engine

  // 1. Check for weak quiz scores
  for (const course of courses) {
    const prog = progressData[course.id];
    if (prog && prog.quizScores) {
      for (const [stepId, score] of Object.entries(prog.quizScores)) {
        if (score < 70) {
          const step = course.topics.find(t => t.id === stepId);
          if (step) {
            return {
              title: `Practice ${step.title} again`,
              description: `Your quiz score was a bit low. Reviewing this will strengthen your foundation.`,
              actionText: "Review Lesson",
              url: `/courses/${course.slug}/${step.slug}`
            };
          }
        }
      }
    }
  }

  // 2. Find the current active lesson
  for (const course of courses) {
    const prog = progressData[course.id];
    const path = mapCourseToLearningPath(course, prog);
    const activeStep = path.find(s => s.status === "in_progress" || s.status === "available");
    
    if (activeStep) {
      return {
        title: activeStep.status === "in_progress" ? `Continue ${activeStep.title}` : `Start ${activeStep.title}`,
        description: `This is the next step in your ${course.title} journey.`,
        actionText: activeStep.status === "in_progress" ? "Continue Learning" : "Start Lesson",
        url: `/courses/${course.slug}/${activeStep.slug}`
      };
    }
  }

  // 3. Fallback
  return {
    title: "Explore Build Mode",
    description: "You seem to have completed the available courses. Time to build something real!",
    actionText: "Go to Build Mode",
    url: "/build"
  };
}
