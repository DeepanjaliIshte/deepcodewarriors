import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

export interface ProblemProgressData {
  problemId: string;
  status: "attempted" | "solved";
  language: "java" | "python";
  lastSubmittedCode?: string;
  attemptsCount: number;
  solvedAt?: any;
  updatedAt: any;
  runtimeMs?: number;
}

export interface UserPracticeStats {
  solvedProblemIds: string[];
  attemptedProblemIds: string[];
  solvedCount: number;
  attemptedCount: number;
  currentStreak: number;
  lastActiveDate?: string; // YYYY-MM-DD
}

/**
 * Helper to get user's coding practice subcollection reference
 */
function getPracticeProgressDoc(uid: string, problemId: string) {
  return doc(db, `users/${uid}/codingPractice`, problemId);
}

/**
 * Record a user's attempt or accepted solution in Firestore.
 * Automatically updates daily streaks and problem counts.
 */
export async function saveCodingProblemProgress(
  uid: string,
  problemId: string,
  data: {
    status: "attempted" | "solved";
    language: "java" | "python";
    code?: string;
    runtimeMs?: number;
  }
): Promise<boolean> {
  try {
    const ref = getPracticeProgressDoc(uid, problemId);
    const existingSnap = await getDoc(ref);
    const existingData = existingSnap.exists() ? existingSnap.data() : null;

    // Do not downgrade a solved problem to attempted
    const finalStatus =
      existingData?.status === "solved" ? "solved" : data.status;

    const attemptsCount = (existingData?.attemptsCount || 0) + 1;

    await setDoc(
      ref,
      {
        problemId,
        status: finalStatus,
        language: data.language,
        lastSubmittedCode: data.code || existingData?.lastSubmittedCode || "",
        attemptsCount,
        runtimeMs: data.runtimeMs ?? existingData?.runtimeMs ?? 0,
        updatedAt: serverTimestamp(),
        ...(finalStatus === "solved" && !existingData?.solvedAt
          ? { solvedAt: serverTimestamp() }
          : {}),
      },
      { merge: true }
    );

    // Update streak and aggregate stats on user profile document
    await updatePracticeStreakAndStats(uid, finalStatus === "solved");

    return true;
  } catch (error) {
    console.error("Error saving coding problem progress:", error);
    return false;
  }
}

/**
 * Load user's aggregate practice progress & all solved problem IDs
 */
export async function getUserPracticeStats(uid: string): Promise<UserPracticeStats> {
  try {
    const colRef = collection(db, `users/${uid}/codingPractice`);
    const snap = await getDocs(colRef);

    const solvedIds: string[] = [];
    const attemptedIds: string[] = [];

    snap.forEach((docSnap) => {
      const data = docSnap.data();
      const pId = docSnap.id;
      if (data.status === "solved") {
        solvedIds.push(pId);
      }
      attemptedIds.push(pId);
    });

    // Check user profile for streak info
    let currentStreak = 0;
    try {
      const userDocRef = doc(db, "users", uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        const uData = userSnap.data();
        currentStreak = uData.practiceStreak || (solvedIds.length > 0 ? 1 : 0);
      }
    } catch (err) {
      console.warn("Could not load user practice streak:", err);
    }

    return {
      solvedProblemIds: solvedIds,
      attemptedProblemIds: attemptedIds,
      solvedCount: solvedIds.length,
      attemptedCount: attemptedIds.length,
      currentStreak: Math.max(currentStreak, solvedIds.length > 0 ? 1 : 0),
    };
  } catch (error) {
    console.error("Error getting user practice stats:", error);
    return {
      solvedProblemIds: [],
      attemptedProblemIds: [],
      solvedCount: 0,
      attemptedCount: 0,
      currentStreak: 0,
    };
  }
}

/**
 * Load single problem submission record for a user
 */
export async function getProblemUserProgress(
  uid: string,
  problemId: string
): Promise<ProblemProgressData | null> {
  try {
    const ref = getPracticeProgressDoc(uid, problemId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as ProblemProgressData;
    }
    return null;
  } catch (error) {
    console.error("Error getting problem progress:", error);
    return null;
  }
}

/**
 * Calculate and persist daily streak in user profile
 */
async function updatePracticeStreakAndStats(uid: string, isSolvedNow: boolean) {
  try {
    const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const userDocRef = doc(db, "users", uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) return;

    const data = userSnap.data();
    const lastActive = data.lastPracticeDate;
    let streak = data.practiceStreak || 0;

    if (!lastActive) {
      streak = 1;
    } else if (lastActive === todayStr) {
      // Already active today, streak stays current
      streak = Math.max(streak, 1);
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (lastActive === yesterdayStr) {
        streak += 1;
      } else {
        // Streak broken
        streak = 1;
      }
    }

    await setDoc(
      userDocRef,
      {
        practiceStreak: streak,
        lastPracticeDate: todayStr,
        ...(isSolvedNow ? { xp: (data.xp || 0) + 50 } : {}),
      },
      { merge: true }
    );
  } catch (e) {
    console.warn("Error updating practice streak:", e);
  }
}
