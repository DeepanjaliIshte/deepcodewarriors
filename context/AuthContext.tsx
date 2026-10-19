"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  provider: string;
  role: string;
  createdAt: any;
  updatedAt: any;
  lastLoginAt: any;
  onboardingCompleted?: boolean;
  goal?: string;
  currentLevel?: string;
  studyTime?: string;
  careerGoal?: string;
  xp?: number;
  streak?: number;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  saveUserProfile: (user: User, providerId: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  loginWithGoogle: async () => {},
  logout: async () => {},
  saveUserProfile: async () => {},
  updateUserProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to save/update user profile in Firestore
  const saveUserProfile = async (currentUser: User, providerId: string) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      const commonData = {
        displayName: currentUser.displayName,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
        photoURL: currentUser.photoURL,
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      };

      if (!userSnap.exists()) {
        // Create new user profile
        await setDoc(userRef, {
          ...commonData,
          uid: currentUser.uid,
          provider: providerId,
          role: "student", // default role
          createdAt: serverTimestamp(),
          onboardingCompleted: false,
          xp: 0,
          streak: 0,
        });
      } else {
        // Update existing user profile (last login, etc.)
        // Don't overwrite role or provider if they exist
        await setDoc(userRef, commonData, { merge: true });
      }

      // Fetch the updated profile to set in state
      const updatedSnap = await getDoc(userRef);
      if (updatedSnap.exists()) {
        setProfile(updatedSnap.data() as UserProfile);
      }
    } catch (error) {
      console.error("Error saving user profile to Firestore:", error);
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
      // Update local state
      setProfile((prev) => prev ? { ...prev, ...data, updatedAt: new Date() } : null);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch profile if user exists. 
        // Note: we don't know the exact provider here easily for new creation if it wasn't triggered via our buttons,
        // but we can default to something or just fetch the existing profile.
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setProfile(userSnap.data() as UserProfile);
          } else {
             // We do not save "unknown" profile here because it races with explicit registration 
             // which sets the correct provider. The registration flow will handle creating the profile.
             console.log("User profile not found in Firestore. Awaiting registration flow.");
          }
        } catch (e) {
          console.error("Error fetching user profile:", e);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await saveUserProfile(result.user, "google.com");
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message || error);
      throw error; // Rethrow to let the UI handle it if needed
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setProfile(null);
    } catch (error: any) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, loginWithGoogle, logout, saveUserProfile, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
