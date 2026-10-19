export interface Subtopic {
  id: string; // subtopicId
  topicId: string;
  title: string;
  order: number;
  
  // 12-Point Lesson Structure (Made optional temporarily until all courses are migrated)
  whatIsThis?: string;
  whyIsItImportant?: string;
  howDoesItWork?: string;
  syntaxStructure?: string;
  simpleExample?: string;
  codeExample?: { language: string; code: string; output?: string; title?: string; explanation: string };
  realWorldUseCase?: string;
  commonMistakes?: string[];
  bestPractices?: string[];
  keyTakeaways?: string[];
  practiceTask?: { title: string; description: string; hint: string; solution: string };
  
  // Deprecated/Legacy fields for backwards compatibility (optional)
  explanation?: string;
  importantPoints?: string[];
  codeExamples?: { language: string; code: string; output?: string; title?: string; explanation?: string }[];
  interviewQuestions?: { question: string; answer: string }[];
  practiceQuestions?: string[];
  quiz?: Quiz;
  
  // Extended DSA fields
  learningObjectives?: string[];
  walkthrough?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  interviewTips?: string[];
  codingExercise?: {
    title: string;
    problemStatement: string;
    constraints?: string[];
    examples?: { input: string; output: string; explanation?: string }[];
    starterCode?: string;
    solution?: string;
    testCases?: { input: string; expectedOutput: string }[];
  };
}

export interface Topic {
  id: string; // topicId
  courseId: string;
  title: string;
  slug: string;
  order: number;
  description: string;
  subtopics: Subtopic[]; // Embedded for mock data, in Firestore it might be a subcollection
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty?: "easy" | "medium" | "hard";
  hint?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface Course {
  id: string; // courseId
  title: string;
  slug: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  topics: Topic[]; // Embedded for mock data
  quiz?: Quiz; // Embedded mock quiz
}

export type StepStatus = "locked" | "available" | "in_progress" | "completed";

export interface LearningStep {
  id: string;
  courseId: string;
  stepNumber: number;
  title: string;
  slug: string;
  description: string;
  level: string;
  lessons: Subtopic[];
  practiceQuestions: string[];
  quiz?: Quiz;
  passingScore: number;
  prerequisites: string[]; // step IDs
  status: StepStatus;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  currentStep: string;
  completedSteps: string[];
  completedLessons: string[];
  stepProgress: Record<string, number>; // e.g. "step1" -> 80 (percentage)
  quizScores: Record<string, number>;
  quizMistakes?: Record<string, string[]>; // e.g. quizId -> array of questionIds failed
  interviewMastery?: Record<string, "mastered" | "needs_practice" | "unattempted">; // e.g. questionId -> mastery level
  lastActivity: any; // timestamp
}
