import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI2l9MPtmFoKbQuCKgSL5lv7wgmL_ejCY",
  authDomain: "education-website-f9a5b.firebaseapp.com",
  projectId: "education-website-f9a5b",
  storageBucket: "education-website-f9a5b.firebasestorage.app",
  messagingSenderId: "277021201332",
  appId: "1:277021201332:web:2f9bee92065d578cefd8e1",
  measurementId: "G-FTBVZGWRLR"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
