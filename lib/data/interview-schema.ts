export type InterviewCategory = 
  | "Concept" 
  | "Coding" 
  | "Debugging" 
  | "Scenario" 
  | "Best Practice" 
  | "Practical" 
  | "Architecture";

export type InterviewDifficulty = "easy" | "medium" | "hard";

export interface InterviewQuestion {
  id: string;
  courseId: string;
  question: string;
  answer: string;
  explanation: string;
  topic: string; // e.g. "Core Java", "Collections"
  category: InterviewCategory;
  difficulty: InterviewDifficulty;
  code?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
}

export type MasteryLevel = "mastered" | "needs_practice" | "unattempted";

export interface InterviewProgress {
  userId: string;
  courseId: string;
  questionMastery: Record<string, MasteryLevel>; // Maps questionId to MasteryLevel
  lastActivity: any; // Firebase Timestamp
}
