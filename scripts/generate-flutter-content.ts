import * as fs from 'fs';
import * as path from 'path';

const flutterTopics = [
  // MODULE 1 — Dart Fundamentals
  "What is Dart?", "Dart Features", "Dart Installation and Setup", "Dart Program Structure", "Variables", "Data Types", "Type Inference", "final and const", "Operators", "Strings", "String Methods", "Lists", "Sets", "Maps", "Null Safety", "if / else", "switch", "for Loop", "while Loop", "break and continue", "Functions", "Optional Parameters", "Named Parameters", "Arrow Functions", "Anonymous Functions", "Scope", "Exception Handling",
  
  // MODULE 2 — Dart OOP
  "Classes and Objects", "Constructors", "Named Constructors", "this Keyword", "Instance Variables", "Instance Methods", "Static Members", "Encapsulation", "Inheritance", "Method Overriding", "Abstract Classes", "Interfaces", "Mixins", "Enums", "Extension Methods", "Generics",
  
  // MODULE 3 — Flutter Fundamentals
  "What is Flutter?", "Flutter Architecture", "Flutter vs Native Development", "Flutter SDK", "Creating a Flutter Project", "Flutter Project Structure", "main() and runApp()", "Widgets", "StatelessWidget", "StatefulWidget", "Build Method", "Widget Tree", "Hot Reload and Hot Restart",
  
  // MODULE 4 — Flutter UI
  "MaterialApp", "Scaffold", "AppBar", "Text", "Container", "Row", "Column", "Stack", "SizedBox", "Padding", "Center", "Expanded", "Flexible", "Align", "Card", "Image", "Icon", "Button Widgets", "TextField", "Form", "Input Validation", "ListView", "GridView", "ListTile", "SingleChildScrollView",
  
  // MODULE 5 — Layout and Responsive UI
  "Flutter Constraints", "MediaQuery", "LayoutBuilder", "Responsive Design", "Orientation", "SafeArea", "Adaptive UI", "Responsive Lists and Grids",
  
  // MODULE 6 — Navigation
  "Navigator", "Routes", "Named Routes", "Passing Data Between Screens", "Returning Data From Screens", "Navigation Drawer", "Bottom Navigation", "Tab Navigation",
  
  // MODULE 7 — State Management
  "What is State?", "setState()", "Stateful UI Patterns", "Lifting State Up", "Provider Introduction", "ChangeNotifier", "Consumer", "Provider Architecture", "State Management Best Practices",
  
  // MODULE 8 — API and Networking
  "HTTP Basics", "REST APIs", "HTTP Package", "GET Requests", "POST Requests", "PUT Requests", "DELETE Requests", "JSON Parsing", "Model Classes", "API Error Handling", "Loading States", "Empty States", "API Integration Project",
  
  // MODULE 9 — Firebase
  "Firebase Introduction", "Connecting Flutter to Firebase", "Firebase Authentication", "Email/Password Authentication", "Google Authentication", "Firebase Firestore", "CRUD with Firestore", "Firebase Storage", "Realtime Data", "Firebase Security Rules", "Firebase Integration Project",
  
  // MODULE 10 — Local Storage
  "SharedPreferences", "Local Data Storage", "SQLite Introduction", "Local CRUD", "Hive / Local Database Concepts", "Choosing Local Storage",
  
  // MODULE 11 — Advanced Flutter
  "Future", "async / await", "FutureBuilder", "Streams", "StreamBuilder", "Futures vs Streams", "Isolates Introduction", "Async Programming Best Practices", "Lifecycle Management", "Dispose and Resource Management",
  
  // MODULE 12 — Flutter Architecture
  "Clean Code in Flutter", "Folder Structure", "Repository Pattern", "Service Layer", "Model Layer", "View / UI Layer", "Separation of Concerns", "Reusable Widgets", "Custom Widgets", "Dependency Management",
  
  // MODULE 13 — Testing and Debugging
  "Flutter Debugging", "Reading Flutter Errors", "Debug Console", "Unit Testing", "Widget Testing", "Integration Testing", "Testable Flutter Architecture",
  
  // MODULE 14 — Deployment
  "Android Build", "Release APK", "App Signing", "App Bundle", "App Versioning", "Play Store Preparation", "Flutter Performance Optimization", "Production Checklist",
  
  // MODULE 15 — PROJECTS
  "Beginner Flutter UI Project", "To-Do App", "Weather App", "API-Based App", "Firebase Authentication App", "Firebase CRUD App", "Expense Tracker", "E-Commerce App", "Final Flutter Project"
];

const modulesData = [
  { title: "MODULE 1 — Dart Fundamentals", topics: flutterTopics.slice(0, 27) },
  { title: "MODULE 2 — Dart OOP", topics: flutterTopics.slice(27, 43) },
  { title: "MODULE 3 — Flutter Fundamentals", topics: flutterTopics.slice(43, 56) },
  { title: "MODULE 4 — Flutter UI", topics: flutterTopics.slice(56, 81) },
  { title: "MODULE 5 — Layout and Responsive UI", topics: flutterTopics.slice(81, 89) },
  { title: "MODULE 6 — Navigation", topics: flutterTopics.slice(89, 97) },
  { title: "MODULE 7 — State Management", topics: flutterTopics.slice(97, 106) },
  { title: "MODULE 8 — API and Networking", topics: flutterTopics.slice(106, 119) },
  { title: "MODULE 9 — Firebase", topics: flutterTopics.slice(119, 130) },
  { title: "MODULE 10 — Local Storage", topics: flutterTopics.slice(130, 136) },
  { title: "MODULE 11 — Advanced Flutter", topics: flutterTopics.slice(136, 146) },
  { title: "MODULE 12 — Flutter Architecture", topics: flutterTopics.slice(146, 156) },
  { title: "MODULE 13 — Testing and Debugging", topics: flutterTopics.slice(156, 163) },
  { title: "MODULE 14 — Deployment", topics: flutterTopics.slice(163, 171) },
  { title: "MODULE 15 — PROJECTS", topics: flutterTopics.slice(171, 180) }
];

let globalLessonCounter = 1;

function generateQuizQuestions(quizId: string, topicName: string) {
  const questions = [];
  const questionTypes = [
    { type: "Concept", q: "What is the primary characteristic of", o: [`It fundamentally defines the behavior of ${topicName}`, `It is deprecated in Flutter`, `It is only used in backend development`, `It provides pure CSS styling`] },
    { type: "Concept", q: "Which statement is true about", o: [`It is essential for implementing ${topicName} correctly.`, `It requires a separate native plugin for iOS only.`, `It was removed in Dart 3.`, `It only works on Android devices.`] },
    { type: "Code", q: "How do you correctly instantiate or use", o: [`// Correct Flutter syntax for ${topicName}`, `// Invalid syntax missing keywords`, `// Deprecated approach`, `// React Native syntax instead of Flutter`] },
    { type: "Code", q: "Which code block properly demonstrates", o: [`Correct implementation of ${topicName}`, `Missing semicolon and braces`, `Incorrect widget parameter types`, `Syntax error prone`] },
    { type: "Output prediction", q: "What is the likely output when executing a standard example of", o: [`Expected result for ${topicName}`, `NullPointerException`, `Compilation Error`, `StackOverflowError`] },
    { type: "Output prediction", q: "If you implement", o: [`It compiles and runs successfully.`, `It fails at compilation.`, `It throws a RuntimeException.`, `It crashes the app instantly.`] },
    { type: "Debugging", q: "A common error when using", o: [`Misunderstanding the API of ${topicName}.`, `Memory leak.`, `Thread starvation.`, `Hardware failure.`] },
    { type: "Debugging", q: "How can you resolve a common compilation error related to", o: [`Check the Flutter documentation for ${topicName}.`, `Restart the IDE.`, `Delete the project.`, `Increase RAM.`] },
    { type: "Practical scenario", q: "In a real-world enterprise application, when is it most appropriate to use", o: [`When implementing logic specific to ${topicName}.`, `Never, it is a bad practice.`, `Only in simple scripts.`, `Only when using React Native.`] },
    { type: "Practical scenario", q: "Which best practice should be followed for", o: [`Adhere to standard Flutter conventions for ${topicName}.`, `Avoid using it entirely.`, `Always use the legacy version.`, `Write custom native logic from scratch.`] }
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
      id: `flutter-lesson-${lessonNum}`,
      topicId: moduleId,
      title: title,
      order: lessonNum,
      whatIsThis: `${title} is a crucial concept in Flutter and Dart. It helps in building efficient, robust, and scalable mobile applications.`,
      whyIsItImportant: `Understanding ${title} is heavily tested in Mobile Developer technical interviews, and is required for writing high-performance apps.`,
      howDoesItWork: `In Flutter/Dart, ${title} provides specific APIs and structures that allow developers to handle complex UI and logic efficiently.`,
      syntaxStructure: `// Syntax or API template for ${title}\nvoid executeFeature() {\n  // Implementation here\n}`,
      simpleExample: `Here is a clear, simple way to use ${title} in an application.`,
      codeExample: {
        language: "dart",
        code: `class FlutterExample {\n    void demonstrate() {\n        // Real world example of ${title}\n        print("Executing ${title} logic.");\n    }\n}`,
        output: `Executing ${title} logic.`,
        explanation: `This code demonstrates the proper usage and syntax required to correctly implement ${title}.`
      },
      realWorldUseCase: `${title} is extensively used in high-traffic mobile systems, UI rendering, and state management.`,
      commonMistakes: [
        `Ignoring edge cases when working with ${title}.`,
        `Improper widget management related to ${title}.`
      ],
      bestPractices: [
        `Always follow the official Flutter documentation for ${title}.`,
        `Write comprehensive unit/widget tests for logic involving ${title}.`
      ],
      keyTakeaways: [
        `${title} is essential for advanced Flutter development.`,
        `Mastering ${title} distinguishes a senior developer from a junior developer.`
      ],
      practiceTask: {
        title: `Implement ${title} in a real scenario`,
        description: `Write a Flutter/Dart program that demonstrates a practical use case of ${title}.`,
        hint: `Consider how ${title} interacts with other parts of the Flutter ecosystem.`,
        solution: `void main() {\n    // Optimal solution for ${title}\n}`
      },
      quiz: {
        id: `quiz-flutter-lesson-${lessonNum}`,
        courseId: "flutter-basics",
        title: `Quiz: ${title}`,
        passingScore: 70,
        questions: generateQuizQuestions(`quiz-flutter-lesson-${lessonNum}`, title)
      }
    };
  });
}

function generateInterviewQuestions() {
  const questions = [];
  const categories = ["Concept", "Coding", "Debugging", "Scenario", "Practical", "Best Practice"];
  
  for (let i = 1; i <= 80; i++) {
    const topic = flutterTopics[i % flutterTopics.length];
    const category = categories[i % categories.length];
    const diff = i % 3 === 0 ? "hard" : i % 2 === 0 ? "medium" : "easy";
    
    questions.push({
      id: `flutter-interview-${i}`,
      courseId: "flutter-basics",
      question: `Interview Question ${i}: How does ${topic} work and what is a ${category.toLowerCase()} example?`,
      answer: `${topic} is a vital part of Flutter. In terms of ${category}, it requires developers to understand its mechanics in depth.`,
      explanation: `Interviewers ask this to test your deep understanding of ${topic} beyond basic definitions.`,
      topic: topic,
      category: category,
      difficulty: diff
    });
  }
  return questions;
}

const flutterCourseTopics = modulesData.map((mod, index) => {
  const slug = `module-${index + 1}`;
  return {
    id: slug,
    courseId: "flutter-basics",
    title: mod.title,
    slug: slug,
    order: index + 1,
    description: `Comprehensive module covering ${mod.topics.length} topics.`,
    subtopics: generateLessons(slug, mod.topics)
  };
});

const flutterCourse = {
  id: "flutter-basics",
  title: "Flutter Mobile Development",
  slug: "flutter",
  description: "Build beautiful, natively compiled, multi-platform applications from a single codebase using Flutter and Dart.",
  category: "Mobile Development",
  level: "Beginner",
  image: "/flutter-logo.png",
  topics: flutterCourseTopics
};

const dataDir = path.join(process.cwd(), 'lib/data');
const outputFile = path.join(dataDir, 'mock-course-flutter-generated.ts');

const fileContent = [
  'import { Course } from "./course-schema";',
  'import { InterviewQuestion } from "./interview-schema";',
  '',
  'export const FLUTTER_COURSE: Course = ' + JSON.stringify(flutterCourse, null, 2) + ';',
  '',
  'export const FLUTTER_INTERVIEW_QUESTIONS: InterviewQuestion[] = ' + JSON.stringify(generateInterviewQuestions(), null, 2) + ';'
].join('\n');

fs.writeFileSync(outputFile, fileContent);
console.log("Successfully generated Flutter course content!");
console.log(`- Modules: ${modulesData.length}`);
console.log(`- Lessons: ${globalLessonCounter - 1}`);
console.log(`- Quiz Questions: ${(globalLessonCounter - 1) * 10}`);
console.log(`- Interview Questions: 80`);
