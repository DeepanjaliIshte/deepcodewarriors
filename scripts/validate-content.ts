import { FLUTTER_COURSE, FLUTTER_INTERVIEW_QUESTIONS } from "../lib/data/mock-course-flutter-generated";
import { WEB_COURSE, WEB_INTERVIEW_QUESTIONS } from "../lib/data/mock-course-web-generated";
import { DSA_COURSE, DSA_INTERVIEW_QUESTIONS } from "../lib/data/mock-course-dsa-generated";
import { Course } from "../lib/data/course-schema";
import { InterviewQuestion } from "../lib/data/interview-schema";

function validateCourse(course: Course, interviewQuestions: InterviewQuestion[], name: string) {
  console.log("==========================================");
  console.log(`   DEEPCODEWARRIORS CONTENT VALIDATION: ${name} `);
  console.log("==========================================\n");

  let totalLessons = 0;
  let totalQuizzes = 0;
  let totalQuestions = 0;
  let minQuestions = Infinity;
  let lessonsWithLessQuestions = 0;
  let selfAssessmentQuestions = 0;
  let topicMismatchQuestions = 0;
  
  const allQuestionIds = new Set<string>();
  let duplicateQuestions = 0;

  course.topics.forEach((module) => {
    module.subtopics.forEach((lesson) => {
      totalLessons++;
      
      if (lesson.quiz) {
        totalQuizzes++;
        const qCount = lesson.quiz.questions.length;
        if (qCount < minQuestions) minQuestions = qCount;
        if (qCount < 10) lessonsWithLessQuestions++;
        
        totalQuestions += qCount;
        
        const forbiddenPhrases = [
          "did you understand",
          "how confident",
          "do you feel",
          "yes, completely",
          "no, not really",
          "partially",
          "i need more practice"
        ];
        
        lesson.quiz.questions.forEach((q) => {
          if (allQuestionIds.has(q.id)) {
            duplicateQuestions++;
          }
          allQuestionIds.add(q.id);

          const lowerQ = q.question.toLowerCase();
          const lowerOpts = q.options.join(" ").toLowerCase();

          let hasSelfAssessment = false;
          forbiddenPhrases.forEach(phrase => {
            if (lowerQ.includes(phrase) || lowerOpts.includes(phrase)) {
              hasSelfAssessment = true;
            }
          });
          if (hasSelfAssessment) selfAssessmentQuestions++;

          if (!q.question.includes(lesson.title)) {
            topicMismatchQuestions++;
          }
        });
      } else {
        throw new Error(`Lesson ${lesson.id} is missing a quiz.`);
      }
    });
  });

  const allInterviewQuestionIds = new Set<string>();
  let duplicateInterviewQuestions = 0;
  interviewQuestions.forEach(q => {
    if (allInterviewQuestionIds.has(q.id)) {
      duplicateInterviewQuestions++;
    }
    allInterviewQuestionIds.add(q.id);
  });

  const interviewCount = interviewQuestions.length;

  console.log(`${name}:`);
  console.log(`- Total lessons: ${totalLessons}`);
  console.log(`- Total quiz questions: ${totalQuestions}`);
  console.log(`- Minimum quiz questions in any lesson: ${minQuestions === Infinity ? 0 : minQuestions}`);
  console.log(`- Lessons with <10 questions: ${lessonsWithLessQuestions}`);
  console.log(`- Self-assessment questions: ${selfAssessmentQuestions}`);
  console.log(`- Topic-mismatch questions: ${topicMismatchQuestions}`);
  console.log(`- Duplicate questions: ${duplicateQuestions}`);
  console.log(`- Interview questions: ${interviewCount}`);
  console.log(`- Duplicate interview questions: ${duplicateInterviewQuestions}`);

  let validationPassed = true;
  if (totalLessons < 70) validationPassed = false;
  if (minQuestions < 10) validationPassed = false;
  if (lessonsWithLessQuestions > 0) validationPassed = false;
  if (selfAssessmentQuestions > 0) validationPassed = false;
  if (topicMismatchQuestions > 0) validationPassed = false;
  if (duplicateQuestions > 0) validationPassed = false;
  if (duplicateInterviewQuestions > 0) validationPassed = false;
  if (interviewCount < 70) validationPassed = false;

  console.log(`- Validation: ${validationPassed ? "PASSED" : "FAILED"}`);

  if (!validationPassed) {
    process.exit(1);
  }
}

validateCourse(FLUTTER_COURSE, FLUTTER_INTERVIEW_QUESTIONS, "Flutter");
validateCourse(WEB_COURSE, WEB_INTERVIEW_QUESTIONS, "Web Development");
validateCourse(DSA_COURSE, DSA_INTERVIEW_QUESTIONS, "Data Structures and Algorithms (DSA)");
