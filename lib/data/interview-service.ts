import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";

export interface InterviewResponse {
  id?: string;
  question: string;
  answer: string;
  category: string;
  timestamp: any;
}

export const INTERVIEW_QUESTIONS = [
  {
    category: "Java",
    question: "Explain the difference between ArrayList and LinkedList."
  },
  {
    category: "Java",
    question: "What is a Memory Leak in Java and how does the Garbage Collector handle it?"
  },
  {
    category: "OOP",
    question: "What is Polymorphism? Provide a real-world analogy."
  },
  {
    category: "OOP",
    question: "Explain the difference between an Interface and an Abstract Class."
  },
  {
    category: "Spring Boot",
    question: "What is Dependency Injection in Spring?"
  },
  {
    category: "SQL",
    question: "Explain the difference between INNER JOIN and LEFT JOIN."
  },
  {
    category: "HR",
    question: "Tell me about a time you faced a difficult technical challenge."
  }
];

export async function saveInterviewResponse(uid: string, category: string, question: string, answer: string) {
  try {
    const colRef = collection(db, `users/${uid}/interviews`);
    await addDoc(colRef, {
      category,
      question,
      answer,
      timestamp: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error saving interview response:", error);
    return false;
  }
}

export async function getInterviewResponses(uid: string): Promise<InterviewResponse[]> {
  try {
    const colRef = collection(db, `users/${uid}/interviews`);
    const q = query(colRef, orderBy("timestamp", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as InterviewResponse));
  } catch (error) {
    console.error("Error fetching interview responses:", error);
    return [];
  }
}
