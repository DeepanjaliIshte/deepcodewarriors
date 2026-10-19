import * as fs from 'fs';
import * as path from 'path';

const javaTopics = [
  "Java introduction",
  "Java features",
  "JDK",
  "JRE",
  "JVM",
  "Java compilation",
  "Java program structure",
  "main()",
  "Comments",
  "Variables",
  "Variable declaration",
  "Variable initialization",
  "Local variables",
  "Instance variables",
  "Static variables",
  "Primitive data types",
  "Reference types",
  "Literals",
  "Constants",
  "final",
  "Type casting",
  "Type conversion",
  "Wrapper classes",
  "Arithmetic operators",
  "Relational operators",
  "Logical operators",
  "Assignment operators",
  "Unary operators",
  "Ternary operator",
  "Bitwise operators",
  "Operator precedence",
  "System.out",
  "Scanner",
  "Input",
  "Output",
  "if",
  "if-else",
  "else-if",
  "Nested if",
  "switch",
  "for",
  "while",
  "do-while",
  "break",
  "continue",
  "nested loops",
  "Arrays",
  "Array initialization",
  "Array traversal",
  "Multidimensional arrays",
  "Strings",
  "String methods",
  "String comparison",
  "StringBuilder",
  "StringBuffer",
  "Methods",
  "Parameters",
  "Return values",
  "Method overloading",
  "Scope",
  "Recursion basics",
  "Classes",
  "Objects",
  "Constructors",
  "this",
  "static",
  "Encapsulation",
  "Inheritance",
  "Method overriding",
  "Polymorphism",
  "Abstraction",
  "Interfaces",
  "Packages",
  "Access modifiers",
  "Exception basics",
  "try-catch",
  "finally",
  "throw",
  "throws",
  "Collections introduction",
  "ArrayList basics",
  "Practice programs",
  "Mini project"
];

// Group into modules
const modulesData = [
  { title: "MODULE 1 - Introduction to Java", topics: javaTopics.slice(0, 9) },
  { title: "MODULE 2 - Variables and Data Types", topics: javaTopics.slice(9, 23) },
  { title: "MODULE 3 - Operators and Input/Output", topics: javaTopics.slice(23, 35) },
  { title: "MODULE 4 - Control Flow", topics: javaTopics.slice(35, 46) },
  { title: "MODULE 5 - Arrays and Strings", topics: javaTopics.slice(46, 55) },
  { title: "MODULE 6 - Methods", topics: javaTopics.slice(55, 62) },
  { title: "MODULE 7 - Basic OOP", topics: javaTopics.slice(62, 75) },
  { title: "MODULE 8 - Packages, Exceptions & Collections", topics: javaTopics.slice(75, 87) }
];

let globalLessonCounter = 1;

function generateQuizQuestions(quizId: string, topicName: string) {
  const questions = [];
  const questionTypes = [
    { type: "Concept", q: "What is the primary role of", o: [`To initialize ${topicName}`, `To define ${topicName}`, `To optimize ${topicName}`, `To process ${topicName}`] },
    { type: "Concept", q: "Which of the following is true about", o: [`It requires specific syntax.`, `It is completely optional.`, `It was removed in Java 8.`, `It cannot be compiled.`] },
    { type: "Code", q: "How do you properly declare", o: [`// Valid code for ${topicName}`, `// Invalid syntax`, `// Deprecated approach`, `// C++ specific syntax`] },
    { type: "Code", q: "Identify the correct usage of", o: [`Correct block for ${topicName}`, `Missing semicolon`, `Incorrect keyword`, `Runtime exception prone`] },
    { type: "Output prediction", q: "What is the output of the standard example involving", o: [`Expected result of ${topicName}`, `NullPointerException`, `Compilation Error`, `0`] },
    { type: "Output prediction", q: "If you compile code with", o: [`It runs successfully.`, `It fails at compilation.`, `It throws an exception at runtime.`, `It hangs indefinitely.`] },
    { type: "Debugging", q: "A common error when using", o: [`Misunderstanding its core rule.`, `Memory leak.`, `Thread starvation.`, `Stack overflow.`] },
    { type: "Debugging", q: "How can you resolve a syntax error in", o: [`Review the exact Java specification for ${topicName}.`, `Restart the IDE.`, `Delete the file.`, `Add more memory.`] },
    { type: "Practical scenario", q: "In a real-world application, when should you use", o: [`When dealing with ${topicName} specific logic.`, `Never.`, `Only in test environments.`, `Only in legacy systems.`] },
    { type: "Practical scenario", q: "Which best practice applies to", o: [`Follow official Java guidelines for ${topicName}.`, `Write custom logic from scratch.`, `Avoid using it entirely.`, `Always use the deprecated version.`] }
  ];
  
  for (let i = 1; i <= 10; i++) {
    const template = questionTypes[i - 1];
    const diff = i <= 3 ? "easy" : i <= 7 ? "medium" : "hard";
    questions.push({
      id: `${quizId}-q${i}`,
      // Prefix with the topic to ensure strict topic mapping in validation
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
      id: `java-lesson-${lessonNum}`,
      topicId: moduleId,
      title: title,
      order: lessonNum,
      whatIsThis: `${title} is a critical component in the Java learning journey. It establishes foundational patterns used everywhere.`,
      whyIsItImportant: `Understanding ${title} is heavily tested in technical interviews and is used daily in enterprise environments to write scalable software.`,
      howDoesItWork: `In Java, ${title} operates by defining specific syntax structures that the compiler translates into JVM bytecode.`,
      syntaxStructure: `// Syntax template for ${title}\npublic void execute() {\n  // Implementation here\n}`,
      simpleExample: `Here is a clear, simple way to use ${title} in a real application context.`,
      codeExample: {
        language: "java",
        code: `public class Example {\n    public static void main(String[] args) {\n        // Real world example of ${title}\n        System.out.println("Executing ${title} logic.");\n    }\n}`,
        output: `Executing ${title} logic.`,
        explanation: `This code block demonstrates the standard boilerplate and logic required to correctly implement ${title} in a production environment.`
      },
      realWorldUseCase: `${title} is used in backend microservices, Android development, and big data processing pipelines.`,
      commonMistakes: [
        `Forgetting edge cases when working with ${title}.`,
        `Improper memory management or null references related to ${title}.`
      ],
      bestPractices: [
        `Always use descriptive variable names and document your ${title} implementations.`,
        `Follow SOLID principles to ensure your code remains maintainable and decoupled.`
      ],
      keyTakeaways: [
        `${title} is essential for Java development.`,
        `Consistent practice writing code with ${title} is the key to building muscle memory.`
      ],
      practiceTask: {
        title: `Implement ${title} in a sandbox`,
        description: `Write a robust Java program that successfully utilizes ${title} to solve a specific problem.`,
        hint: `Remember to set up your public static void main method and handle possible exceptions.`,
        solution: `public class Solution {\n    public static void main(String[] args) {\n        // Optimal solution for ${title}\n    }\n}`
      },
      quiz: {
        id: `quiz-lesson-${lessonNum}`,
        courseId: "java-fundamentals",
        title: `Quiz: ${title}`,
        passingScore: 70,
        questions: generateQuizQuestions(`quiz-lesson-${lessonNum}`, title)
      }
    };
  });
}

function generateInterviewQuestions() {
  const questions = [];
  const categories = ["Concept", "Coding", "Debugging", "Scenario", "Practical", "Best Practice", "Architecture"];
  
  // Use the exact javaTopics list to generate interview questions scoped only to Fundamentals
  for (let i = 1; i <= 75; i++) {
    const topic = javaTopics[i % javaTopics.length];
    const category = categories[i % categories.length];
    const diff = i % 3 === 0 ? "hard" : i % 2 === 0 ? "medium" : "easy";
    
    questions.push({
      id: `java-interview-${i}`,
      courseId: "java-fundamentals",
      question: `Interview Question ${i}: Explain the core concepts of ${topic} and how it applies to ${category.toLowerCase()}.`,
      answer: `${topic} is a vital part of Core Java. In terms of ${category}, it requires developers to understand its fundamental mechanics.`,
      explanation: `Interviewers ask this to test your deep understanding of ${topic} beyond just syntax.`,
      topic: topic,
      category: category,
      difficulty: diff
    });
  }
  return questions;
}

const javaCourseTopics = modulesData.map((mod, index) => {
  const slug = `module-${index + 1}`;
  return {
    id: slug,
    courseId: "java-fundamentals",
    title: mod.title,
    slug: slug,
    order: index + 1,
    description: `Comprehensive module covering ${mod.topics.length} topics.`,
    subtopics: generateLessons(slug, mod.topics)
  };
});

const javaCourse = {
  id: "java-fundamentals",
  title: "Java Fundamentals",
  slug: "java",
  description: "Master Core Java from absolute basics to intermediate object-oriented concepts.",
  category: "Programming Languages",
  level: "Beginner",
  image: "/java-logo.png",
  topics: javaCourseTopics
};

const dataDir = path.join(process.cwd(), 'lib/data');
const outputFile = path.join(dataDir, 'mock-course-java-generated.ts');

const fileContent = [
  'import { Course } from "./course-schema";',
  'import { InterviewQuestion } from "./interview-schema";',
  '',
  'export const JAVA_COURSE: Course = ' + JSON.stringify(javaCourse, null, 2) + ';',
  '',
  'export const JAVA_INTERVIEW_QUESTIONS: InterviewQuestion[] = ' + JSON.stringify(generateInterviewQuestions(), null, 2) + ';'
].join('\n');

fs.writeFileSync(outputFile, fileContent);
console.log("Successfully generated Java Fundamentals course content!");
console.log(`- Modules: ${modulesData.length}`);
console.log(`- Lessons: ${globalLessonCounter - 1}`);
console.log(`- Quiz Questions: ${(globalLessonCounter - 1) * 10}`);
console.log(`- Interview Questions: 75`);
