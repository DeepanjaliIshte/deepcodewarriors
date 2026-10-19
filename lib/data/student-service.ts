import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc, collection, query, where, getDocs, serverTimestamp, deleteDoc } from "firebase/firestore";

// --- Progress ---
export async function markLessonCompleted(uid: string, courseId: string, topicId: string) {
  try {
    const progressRef = doc(db, `users/${uid}/progress`, `${courseId}_${topicId}`);
    await setDoc(progressRef, {
      courseId,
      topicId,
      status: "completed",
      completedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error marking lesson completed:", error);
    return false;
  }
}

export async function getLessonProgress(uid: string, courseId: string, topicId: string) {
  try {
    const progressRef = doc(db, `users/${uid}/progress`, `${courseId}_${topicId}`);
    const snap = await getDoc(progressRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting lesson progress:", error);
    return null;
  }
}

export async function getCourseProgress(uid: string, courseId: string) {
  try {
    const q = query(collection(db, `users/${uid}/progress`), where("courseId", "==", courseId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error getting course progress:", error);
    return [];
  }
}

// --- Bookmarks ---
export async function toggleBookmark(uid: string, bookmarkId: string, data: { title: string, url: string, courseId?: string }) {
  try {
    const bookmarkRef = doc(db, `users/${uid}/bookmarks`, bookmarkId);
    const snap = await getDoc(bookmarkRef);
    if (snap.exists()) {
      await deleteDoc(bookmarkRef);
      return false; // unbookmarked
    } else {
      await setDoc(bookmarkRef, {
        ...data,
        savedAt: serverTimestamp()
      });
      return true; // bookmarked
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    throw error;
  }
}

export async function checkBookmark(uid: string, bookmarkId: string) {
  try {
    const bookmarkRef = doc(db, `users/${uid}/bookmarks`, bookmarkId);
    const snap = await getDoc(bookmarkRef);
    return snap.exists();
  } catch (error) {
    console.error("Error checking bookmark:", error);
    return false;
  }
}

// --- Quiz Scores & Certificates ---
export async function saveQuizScore(uid: string, courseId: string, quizId: string, score: number, passed: boolean) {
  try {
    const scoreRef = doc(db, `users/${uid}/quizScores`, quizId);
    await setDoc(scoreRef, {
      courseId,
      quizId,
      score,
      passed,
      attemptedAt: serverTimestamp()
    });

    if (passed) {
      // Issue certificate
      const certRef = doc(db, `users/${uid}/certificates`, courseId);
      const certSnap = await getDoc(certRef);
      // Only issue if they don't already have one for this course
      if (!certSnap.exists()) {
        await setDoc(certRef, {
          courseId,
          issuedAt: serverTimestamp()
        });
      }
    }
    return true;
  } catch (error) {
    console.error("Error saving quiz score:", error);
    return false;
  }
}

export async function getQuizScore(uid: string, quizId: string) {
  try {
    const scoreRef = doc(db, `users/${uid}/quizScores`, quizId);
    const snap = await getDoc(scoreRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting quiz score:", error);
    return null;
  }
}

export async function getCertificates(uid: string) {
  try {
    const certCol = collection(db, `users/${uid}/certificates`);
    const snap = await getDocs(certCol);
    return snap.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error getting certificates:", error);
    return [];
  }
}

export async function getBookmarks(uid: string) {
  try {
    const bookmarkCol = collection(db, `users/${uid}/bookmarks`);
    const snap = await getDocs(bookmarkCol);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting bookmarks:", error);
    return [];
  }
}

export async function getEnrolledCourses(uid: string) {
  try {
    const progressCol = collection(db, `users/${uid}/progress`);
    const snap = await getDocs(progressCol);
    const courseIds = new Set(snap.docs.map(doc => doc.data().courseId));
    return Array.from(courseIds);
  } catch (error) {
    console.error("Error getting enrolled courses:", error);
    return [];
  }
}
