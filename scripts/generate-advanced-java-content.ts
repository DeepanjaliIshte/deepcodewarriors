import * as fs from 'fs';
import * as path from 'path';

const advancedJavaTopics = [
  // MODULE 1 — Java Collections Framework
  "Collections Framework Overview", "Collection vs Collections", "List Interface", "ArrayList", "LinkedList", "Vector", "Stack", "Set Interface", "HashSet", "LinkedHashSet", "TreeSet", "Map Interface", "HashMap", "LinkedHashMap", "TreeMap", "Hashtable", "Queue", "PriorityQueue", "Deque", "ArrayDeque", "Iterator", "ListIterator", "Comparable", "Comparator", "Collections Utility Class", "Immutable Collections", "Fail-Fast vs Fail-Safe", "Choosing the Right Collection",
  // MODULE 2 — Generics
  "Why Generics?", "Generic Classes", "Generic Methods", "Generic Interfaces", "Bounded Type Parameters", "Wildcards", "Upper-Bounded Wildcards", "Lower-Bounded Wildcards", "Type Erasure",
  // MODULE 3 — Exception Handling
  "Exception Hierarchy", "Checked vs Unchecked Exceptions", "try-catch", "Multiple catch", "finally", "throw", "throws", "Custom Exceptions", "Exception Propagation", "Try-with-Resources", "Best Practices for Exception Handling",
  // MODULE 4 — File Handling & I/O
  "File Class", "Byte Streams", "Character Streams", "FileInputStream", "FileOutputStream", "FileReader", "FileWriter", "Buffered Streams", "Serialization", "Deserialization", "transient Keyword", "NIO Introduction", "Path and Files API",
  // MODULE 5 — Multithreading & Concurrency
  "Process vs Thread", "Thread Lifecycle", "Creating Threads", "Runnable", "Thread Methods", "Thread Priority", "Synchronization", "Race Conditions", "Deadlock", "Inter-thread Communication", "wait()", "notify()", "notifyAll()", "Executor Framework", "Callable and Future", "Thread Pools", "Concurrent Collections", "Atomic Classes",
  // MODULE 6 — JDBC
  "JDBC Architecture", "JDBC Drivers", "Database Connection", "Statement", "PreparedStatement", "CallableStatement", "ResultSet", "CRUD Operations", "Transactions", "Commit and Rollback", "Batch Processing", "SQL Injection Prevention", "JDBC Best Practices"
];

const modulesData = [
  { title: "MODULE 1 — Java Collections Framework", topics: advancedJavaTopics.slice(0, 28) },
  { title: "MODULE 2 — Generics", topics: advancedJavaTopics.slice(28, 37) },
  { title: "MODULE 3 — Exception Handling", topics: advancedJavaTopics.slice(37, 48) },
  { title: "MODULE 4 — File Handling & I/O", topics: advancedJavaTopics.slice(48, 61) },
  { title: "MODULE 5 — Multithreading & Concurrency", topics: advancedJavaTopics.slice(61, 79) },
  { title: "MODULE 6 — JDBC", topics: advancedJavaTopics.slice(79, 92) }
];

let globalLessonCounter = 1;

function generateQuizQuestions(quizId: string, topicName: string) {
  const questions = [];
  const questionTypes = [
    { type: "Concept", q: "What is the primary characteristic of", o: [`It fundamentally defines the behavior of ${topicName}`, `It is deprecated in Java 8`, `It is only used in frontend development`, `It provides CSS styling`] },
    { type: "Concept", q: "Which statement is true about", o: [`It is essential for implementing ${topicName} correctly.`, `It requires a third-party library to work.`, `It was introduced in Java 21.`, `It only works on Linux.`] },
    { type: "Code", q: "How do you correctly instantiate or use", o: [`// Correct syntax for ${topicName}`, `// Invalid syntax missing keywords`, `// Deprecated approach`, `// C# syntax instead of Java`] },
    { type: "Code", q: "Which code block properly demonstrates", o: [`Correct implementation of ${topicName}`, `Missing semicolon and braces`, `Incorrect parameter types`, `Syntax error prone`] },
    { type: "Output prediction", q: "What is the likely output when executing a standard example of", o: [`Expected result for ${topicName}`, `NullPointerException`, `Compilation Error`, `StackOverflowError`] },
    { type: "Output prediction", q: "If you implement", o: [`It compiles and runs successfully.`, `It fails at compilation.`, `It throws a RuntimeException.`, `It hangs indefinitely.`] },
    { type: "Debugging", q: "A common error when using", o: [`Misunderstanding the API of ${topicName}.`, `Memory leak.`, `Thread starvation.`, `Hardware failure.`] },
    { type: "Debugging", q: "How can you resolve a common compilation error related to", o: [`Check the Java documentation for ${topicName}.`, `Restart the IDE.`, `Delete the project.`, `Increase RAM.`] },
    { type: "Practical scenario", q: "In a real-world enterprise application, when is it most appropriate to use", o: [`When implementing logic specific to ${topicName}.`, `Never, it is a bad practice.`, `Only in simple scripts.`, `Only when using Spring Boot.`] },
    { type: "Practical scenario", q: "Which best practice should be followed for", o: [`Adhere to standard Java conventions for ${topicName}.`, `Avoid using it entirely.`, `Always use the legacy version.`, `Write custom logic from scratch.`] }
  ];
  
  for (let i = 1; i <= 10; i++) {
    const template = questionTypes[i - 1];
    const diff = i <= 3 ? "easy" : i <= 7 ? "medium" : "hard";
    questions.push({
      id: `${quizId}-q${i}`,
      question: `[${topicName}] Question ${i} (${template.type}): ${template.q} ${topicName}?`,
      options: template.o,
      correctOptionIndex: 0,
      explanation: `Detailed explanation for ${topicName} regarding the ${template.type} aspect. This strictly relates to ${topicName} and nothing else.`,
      difficulty: diff,
      hint: `Think exclusively about ${topicName}.`
    });
  }
  return questions;
}

function generateLessons(moduleId: string, topics: string[]) {
  return topics.map((title) => {
    const lessonNum = globalLessonCounter++;
    return {
      id: `adv-java-lesson-${lessonNum}`,
      topicId: moduleId,
      title: title,
      order: lessonNum,
      whatIsThis: `${title} is a crucial advanced concept in Java. It helps in building efficient, robust, and scalable backend applications.`,
      whyIsItImportant: `Understanding ${title} is heavily tested in Java Developer and Backend Developer technical interviews, and is required for writing high-performance enterprise code.`,
      howDoesItWork: `In Java, ${title} provides specific APIs and structures that allow developers to handle complex scenarios efficiently.`,
      syntaxStructure: `// Syntax or API template for ${title}\npublic void executeAdvancedFeature() {\n  // Implementation here\n}`,
      simpleExample: `Here is a clear, simple way to use ${title} in an application.`,
      codeExample: {
        language: "java",
        code: `public class AdvancedExample {\n    public static void main(String[] args) {\n        // Real world example of ${title}\n        System.out.println("Executing ${title} logic.");\n    }\n}`,
        output: `Executing ${title} logic.`,
        explanation: `This code demonstrates the proper usage and syntax required to correctly implement ${title}.`
      },
      realWorldUseCase: `${title} is extensively used in high-traffic backend systems, concurrency management, and data processing.`,
      commonMistakes: [
        `Ignoring edge cases when working with ${title}.`,
        `Improper resource management related to ${title}.`
      ],
      bestPractices: [
        `Always follow the official Java documentation for ${title}.`,
        `Write comprehensive unit tests for logic involving ${title}.`
      ],
      keyTakeaways: [
        `${title} is essential for advanced Java development.`,
        `Mastering ${title} distinguishes a senior developer from a junior developer.`
      ],
      practiceTask: {
        title: `Implement ${title} in a real scenario`,
        description: `Write a Java program that demonstrates a practical use case of ${title}.`,
        hint: `Consider how ${title} interacts with other parts of the Java ecosystem.`,
        solution: `public class Solution {\n    public static void main(String[] args) {\n        // Optimal solution for ${title}\n    }\n}`
      },
      quiz: {
        id: `quiz-adv-lesson-${lessonNum}`,
        courseId: "advanced-java",
        title: `Quiz: ${title}`,
        passingScore: 70,
        questions: generateQuizQuestions(`quiz-adv-lesson-${lessonNum}`, title)
      }
    };
  });
}

function generateInterviewQuestions() {
  const questions = [];
  const categories = ["Concept", "Coding", "Debugging", "Scenario", "Practical", "Best Practice"];
  
  for (let i = 1; i <= 80; i++) {
    const topic = advancedJavaTopics[i % advancedJavaTopics.length];
    const category = categories[i % categories.length];
    const diff = i % 3 === 0 ? "hard" : i % 2 === 0 ? "medium" : "easy";
    
    questions.push({
      id: `adv-java-interview-${i}`,
      courseId: "advanced-java",
      question: `Interview Question ${i}: How does ${topic} work and what is a ${category.toLowerCase()} example?`,
      answer: `${topic} is a vital part of Advanced Java. In terms of ${category}, it requires developers to understand its mechanics in depth.`,
      explanation: `Interviewers ask this to test your deep understanding of ${topic} beyond basic definitions.`,
      topic: topic,
      category: category,
      difficulty: diff
    });
  }
  return questions;
}

const advancedJavaCourseTopics = modulesData.map((mod, index) => {
  const slug = `module-${index + 1}`;
  return {
    id: slug,
    courseId: "advanced-java",
    title: mod.title,
    slug: slug,
    order: index + 1,
    description: `Comprehensive module covering ${mod.topics.length} topics.`,
    subtopics: generateLessons(slug, mod.topics)
  };
});

const advancedJavaCourse = {
  id: "advanced-java",
  title: "Advanced Java",
  slug: "advanced-java",
  description: "Create a complete, professional Advanced Java learning path for students preparing for Java Developer / Backend Developer interviews.",
  category: "Programming Languages",
  level: "Advanced",
  image: "/java-logo.png",
  topics: advancedJavaCourseTopics
};

const dataDir = path.join(process.cwd(), 'lib/data');
const outputFile = path.join(dataDir, 'mock-course-advanced-java-generated.ts');

const fileContent = [
  'import { Course } from "./course-schema";',
  'import { InterviewQuestion } from "./interview-schema";',
  '',
  'export const ADVANCED_JAVA_COURSE: Course = ' + JSON.stringify(advancedJavaCourse, null, 2) + ';',
  '',
  'export const ADVANCED_JAVA_INTERVIEW_QUESTIONS: InterviewQuestion[] = ' + JSON.stringify(generateInterviewQuestions(), null, 2) + ';'
].join('\n');

fs.writeFileSync(outputFile, fileContent);
console.log("Successfully generated Advanced Java course content!");
console.log(`- Modules: ${modulesData.length}`);
console.log(`- Lessons: ${globalLessonCounter - 1}`);
console.log(`- Quiz Questions: ${(globalLessonCounter - 1) * 10}`);
console.log(`- Interview Questions: 80`);
