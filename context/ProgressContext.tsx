"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { UserProgress } from "@/lib/data/course-schema";

interface ProgressContextType {
  progressData: Record<string, UserProgress>; // courseId -> UserProgress
  loading: boolean;
  loadCourseProgress: (courseId: string) => Promise<UserProgress | null>;
  markLessonComplete: (courseId: string, stepId: string, lessonId: string) => Promise<void>;
  submitQuiz: (courseId: string, stepId: string, score: number, passingScore: number, nextStepId?: string, mistakes?: string[]) => Promise<boolean>;
  updateInterviewMastery: (courseId: string, questionId: string, mastery: "mastered" | "needs_practice") => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType>({
  progressData: {},
  loading: true,
  loadCourseProgress: async () => null,
  markLessonComplete: async () => {},
  submitQuiz: async () => false,
  updateInterviewMastery: async () => {},
});

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user, profile, updateUserProfile } = useAuth();
  const [progressData, setProgressData] = useState<Record<string, UserProgress>>({});
  const [loading, setLoading] = useState(true);

  // Helper to get local guest progress
  const getLocalProgress = (courseId: string): UserProgress => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(`dw_progress_${courseId}`);
        if (stored) return JSON.parse(stored);
      } catch (e) {}
    }
    return {
      userId: "guest",
      courseId,
      currentStep: "",
      completedSteps: [],
      completedLessons: [],
      stepProgress: {},
      quizScores: {},
      quizMistakes: {},
      interviewMastery: {},
      lastActivity: new Date().toISOString(),
    };
  };

  // Helper to save local guest progress
  const saveLocalProgress = (courseId: string, data: UserProgress) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`dw_progress_${courseId}`, JSON.stringify(data));
      } catch (e) {}
    }
  };

  // Load progress for a specific course
  const loadCourseProgress = async (courseId: string) => {
    if (!user) {
      const localData = getLocalProgress(courseId);
      setProgressData((prev) => ({ ...prev, [courseId]: localData }));
      setLoading(false);
      return localData;
    }

    try {
      const docRef = doc(db, "users", user.uid, "progress", courseId);
      const docSnap = await getDoc(docRef);

      let data: UserProgress;

      if (docSnap.exists()) {
        data = docSnap.data() as UserProgress;
      } else {
        // Sync local guest progress if exists, otherwise initialize empty
        const local = getLocalProgress(courseId);
        data = {
          userId: user.uid,
          courseId,
          currentStep: local.currentStep || "",
          completedSteps: local.completedSteps || [],
          completedLessons: local.completedLessons || [],
          stepProgress: local.stepProgress || {},
          quizScores: local.quizScores || {},
          quizMistakes: local.quizMistakes || {},
          interviewMastery: local.interviewMastery || {},
          lastActivity: serverTimestamp(),
        };
        await setDoc(docRef, data);
      }

      setProgressData((prev) => ({ ...prev, [courseId]: data }));
      saveLocalProgress(courseId, data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error loading progress from Firestore, falling back to local:", error);
      const localData = getLocalProgress(courseId);
      setProgressData((prev) => ({ ...prev, [courseId]: localData }));
      setLoading(false);
      return localData;
    }
  };

  const markLessonComplete = async (courseId: string, stepId: string, lessonId: string) => {
    const current = progressData[courseId] || getLocalProgress(courseId);
    const newCompletedLessons = [...new Set([...(current.completedLessons || []), lessonId])];
    
    const newData: UserProgress = {
      ...current,
      completedLessons: newCompletedLessons,
      lastActivity: new Date().toISOString()
    };

    setProgressData((prev) => ({ ...prev, [courseId]: newData }));
    saveLocalProgress(courseId, newData);

    if (user) {
      try {
        const docRef = doc(db, "users", user.uid, "progress", courseId);
        if (!current.completedLessons?.includes(lessonId)) {
          if (updateUserProfile) {
            await updateUserProfile({ xp: (profile?.xp || 0) + 20 });
          }
        }
        await updateDoc(docRef, {
          completedLessons: newCompletedLessons,
          lastActivity: serverTimestamp()
        });
      } catch (error) {
        console.error("Error updating lesson completion in Firestore:", error);
      }
    }
  };

  const submitQuiz = async (courseId: string, stepId: string, score: number, passingScore: number, nextStepId?: string, mistakes?: string[]): Promise<boolean> => {
    const current = progressData[courseId] || getLocalProgress(courseId);
    const passed = score >= passingScore;
    
    const newQuizScores = { ...(current.quizScores || {}), [stepId]: score };
    const newQuizMistakes = mistakes ? { ...(current.quizMistakes || {}), [stepId]: mistakes } : current.quizMistakes;
    let newCompletedSteps = current.completedSteps || [];
    let newCurrentStep = current.currentStep || stepId;
    const alreadyPassed = newCompletedSteps.includes(stepId);

    if (passed && !alreadyPassed) {
      newCompletedSteps = [...newCompletedSteps, stepId];
      if (nextStepId) {
        newCurrentStep = nextStepId;
      }
    }

    const newData: UserProgress = {
      ...current,
      quizScores: newQuizScores,
      ...(mistakes && { quizMistakes: newQuizMistakes }),
      completedSteps: newCompletedSteps,
      currentStep: newCurrentStep,
      lastActivity: new Date().toISOString()
    };

    setProgressData((prev) => ({ ...prev, [courseId]: newData }));
    saveLocalProgress(courseId, newData);

    if (user) {
      try {
        const docRef = doc(db, "users", user.uid, "progress", courseId);
        if (passed && !alreadyPassed && updateUserProfile) {
          await updateUserProfile({ xp: (profile?.xp || 0) + 50 });
        }
        await updateDoc(docRef, {
          quizScores: newQuizScores,
          ...(mistakes && { quizMistakes: newQuizMistakes }),
          completedSteps: newCompletedSteps,
          currentStep: newCurrentStep,
          lastActivity: serverTimestamp()
        });
      } catch (error) {
        console.error("Error updating quiz submission in Firestore:", error);
      }
    }

    return passed;
  };

  const updateInterviewMastery = async (courseId: string, questionId: string, mastery: "mastered" | "needs_practice") => {
    if (!user) return;
    try {
      const docRef = doc(db, "users", user.uid, "progress", courseId);
      const current = progressData[courseId];
      if (!current) return;

      const newInterviewMastery = { ...(current.interviewMastery || {}), [questionId]: mastery };
      
      const newData = {
        ...current,
        interviewMastery: newInterviewMastery,
        lastActivity: serverTimestamp()
      };

      await updateDoc(docRef, {
        interviewMastery: newInterviewMastery,
        lastActivity: serverTimestamp()
      });

      setProgressData((prev) => ({ ...prev, [courseId]: newData as UserProgress }));
    } catch (error) {
      console.error("Error updating interview mastery:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      setProgressData({});
      setLoading(false);
    }
  }, [user]);

  return (
    <ProgressContext.Provider value={{ progressData, loading, loadCourseProgress, markLessonComplete, submitQuiz, updateInterviewMastery }}>
      {children}
    </ProgressContext.Provider>
  );
};
