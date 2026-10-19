import * as fs from 'fs';
import * as path from 'path';

const modulesData = [
  {
    title: "MODULE 1 — WEB FUNDAMENTALS",
    topics: [
      "What is Web Development?",
      "How the Internet Works",
      "Client vs Server",
      "Browser and Web Server",
      "HTTP and HTTPS",
      "URLs",
      "DNS Basics",
      "Request and Response",
      "HTTP Methods",
      "HTTP Status Codes",
      "Developer Tools",
      "Web Accessibility Basics",
      "Responsive Web Design"
    ]
  },
  {
    title: "MODULE 2 — HTML",
    topics: [
      "What is HTML?",
      "HTML Document Structure",
      "Headings and Paragraphs",
      "Text Formatting",
      "Links",
      "Images",
      "Lists",
      "Tables",
      "Forms",
      "Input Types",
      "Form Validation",
      "Buttons",
      "Semantic HTML",
      "Audio and Video",
      "iframe",
      "HTML Entities",
      "Accessibility Attributes",
      "HTML Best Practices"
    ]
  },
  {
    title: "MODULE 3 — CSS",
    topics: [
      "What is CSS?",
      "CSS Syntax",
      "Selectors",
      "Colors",
      "Units",
      "Fonts and Typography",
      "Box Model",
      "Margin and Padding",
      "Borders",
      "Display",
      "Position",
      "z-index",
      "Overflow",
      "Flexbox",
      "Flex Container",
      "Flex Items",
      "CSS Grid",
      "Grid Layout",
      "Responsive CSS",
      "Media Queries",
      "Pseudo-classes",
      "Pseudo-elements",
      "CSS Variables",
      "Transitions",
      "Transforms",
      "Animations",
      "CSS Best Practices"
    ]
  },
  {
    title: "MODULE 4 — JAVASCRIPT FUNDAMENTALS",
    topics: [
      "What is JavaScript?",
      "JavaScript in the Browser",
      "Variables",
      "let, const and var",
      "Data Types",
      "Type Conversion",
      "Operators",
      "Strings",
      "String Methods",
      "Arrays",
      "Array Methods",
      "Objects",
      "Object Methods",
      "if / else",
      "switch",
      "for Loop",
      "while Loop",
      "Functions",
      "Arrow Functions",
      "Scope",
      "Hoisting",
      "Template Literals",
      "Destructuring",
      "Spread and Rest Operators",
      "Modules"
    ]
  },
  {
    title: "MODULE 5 — DOM AND BROWSER JAVASCRIPT",
    topics: [
      "DOM Introduction",
      "Selecting Elements",
      "Changing HTML",
      "Changing CSS",
      "Creating Elements",
      "Removing Elements",
      "Events",
      "Event Listeners",
      "Event Bubbling",
      "Event Delegation",
      "Forms with JavaScript",
      "Form Validation",
      "LocalStorage",
      "SessionStorage",
      "Browser APIs",
      "Debugging JavaScript"
    ]
  },
  {
    title: "MODULE 6 — MODERN JAVASCRIPT",
    topics: [
      "Callbacks",
      "Synchronous vs Asynchronous JavaScript",
      "setTimeout",
      "Promises",
      "async / await",
      "Fetch API",
      "REST API Consumption",
      "JSON",
      "Error Handling",
      "Promise.all",
      "Optional Chaining",
      "Nullish Coalescing",
      "Modern JavaScript Best Practices"
    ]
  },
  {
    title: "MODULE 7 — GIT AND GITHUB",
    topics: [
      "Version Control",
      "Git Installation",
      "git init",
      "git status",
      "git add",
      "git commit",
      "git log",
      "Branches",
      "Merge",
      "Resolve Merge Conflicts",
      "GitHub",
      "Push and Pull",
      "Pull Requests",
      ".gitignore",
      "Git Workflow Best Practices"
    ]
  },
  {
    title: "MODULE 8 — REACT",
    topics: [
      "What is React?",
      "React Project Setup",
      "React Components",
      "JSX",
      "Props",
      "State",
      "useState",
      "Event Handling",
      "Conditional Rendering",
      "Lists and Keys",
      "Forms",
      "Controlled Components",
      "useEffect",
      "Component Lifecycle Concepts",
      "Fetching APIs in React",
      "Loading and Error States",
      "useRef",
      "useMemo",
      "useCallback",
      "Context API",
      "Custom Hooks",
      "React Component Architecture",
      "React Best Practices"
    ]
  },
  {
    title: "MODULE 9 — NEXT.JS",
    topics: [
      "What is Next.js?",
      "Next.js Project Structure",
      "App Router",
      "Pages and Layouts",
      "Dynamic Routes",
      "Navigation",
      "Link and useRouter",
      "Server vs Client Components",
      "Data Fetching",
      "API Routes / Route Handlers",
      "Loading UI",
      "Error Handling",
      "Metadata and SEO",
      "Environment Variables",
      "Authentication Concepts",
      "Next.js Deployment",
      "Next.js Best Practices"
    ]
  },
  {
    title: "MODULE 10 — BACKEND AND APIs",
    topics: [
      "Backend Fundamentals",
      "REST API Architecture",
      "API Endpoints",
      "Request Parameters",
      "Request Body",
      "JSON APIs",
      "CRUD",
      "Authentication vs Authorization",
      "JWT Basics",
      "API Security Basics",
      "CORS",
      "Postman",
      "API Testing",
      "Error Handling",
      "Backend Project Structure"
    ]
  },
  {
    title: "MODULE 11 — DATABASE FUNDAMENTALS",
    topics: [
      "What is a Database?",
      "SQL vs NoSQL",
      "Relational Databases",
      "Tables and Relationships",
      "Primary Keys",
      "Foreign Keys",
      "Basic SQL",
      "SELECT",
      "INSERT",
      "UPDATE",
      "DELETE",
      "WHERE",
      "ORDER BY",
      "JOIN",
      "Database Design Basics",
      "Connecting Web Applications to Databases"
    ]
  },
  {
    title: "MODULE 12 — AUTHENTICATION AND FULL STACK",
    topics: [
      "User Registration",
      "Login",
      "Password Security",
      "Sessions",
      "JWT Authentication",
      "Protected Routes",
      "Role-Based Access",
      "Authentication with Firebase",
      "Firestore Basics",
      "Full-Stack Data Flow",
      "Frontend + API + Database Architecture"
    ]
  },
  {
    title: "MODULE 13 — DEPLOYMENT",
    topics: [
      "Production vs Development",
      "Environment Variables",
      "Build Process",
      "Hosting Concepts",
      "Deploying Frontend",
      "Deploying APIs",
      "Database Deployment",
      "Domain Names",
      "HTTPS",
      "Production Debugging",
      "Deployment Best Practices"
    ]
  },
  {
    title: "MODULE 14 — PROJECTS",
    topics: [
      "HTML/CSS Portfolio",
      "JavaScript To-Do App",
      "Weather API App",
      "Responsive Landing Page",
      "React Dashboard",
      "React API Project",
      "Next.js Application",
      "Authentication Project",
      "Full-Stack CRUD Project",
      "Final Full-Stack Portfolio Project"
    ]
  }
];

let globalLessonCounter = 1;

function generateQuizQuestions(quizId: string, topicName: string) {
  const questions = [];
  const questionTypes = [
    { type: "Concept", q: "What is the primary function of", o: [`To implement ${topicName}`, `To optimize ${topicName}`, `To ignore ${topicName}`, `To bypass ${topicName}`] },
    { type: "Concept", q: "Which statement accurately describes", o: [`It manages ${topicName} execution.`, `It requires a third-party tool.`, `It is only used in legacy web.`, `It has been deprecated.`] },
    { type: "Syntax", q: "What is the correct syntax related to", o: [`valid_syntax_for(${topicName})`, `invalid_syntax<${topicName}>`, `[${topicName}]->syntax`, `${topicName}.syntax!!`] },
    { type: "Syntax", q: "Identify the valid implementation of", o: [`const handle_${topicName.replace(/\\W+/g, '_')} = () => {}`, `function ${topicName}() {}`, `void ${topicName}() {}`, `create ${topicName} end`] },
    { type: "Output", q: "What will be the output of a standard script using", o: [`Expected ${topicName} behavior.`, `SyntaxError`, `TypeError`, `None`] },
    { type: "Output", q: "If a developer misconfigures", o: [`A runtime error related to ${topicName} occurs.`, `The script executes faster.`, `The OS crashes.`, `The browser downgrades itself.`] },
    { type: "Debugging", q: "A common Exception encountered when using", o: [`Misuse of ${topicName} logic.`, `Memory overflow.`, `Stack underflow.`, `NetworkError.`] },
    { type: "Debugging", q: "How can you resolve a logical error in", o: [`Trace the ${topicName} state.`, `Reinstall Browser.`, `Reboot the system.`, `Delete the script.`] },
    { type: "Scenario", q: "In a web application, when should you apply", o: [`When processing ${topicName} tasks.`, `When designing the logo.`, `When writing a desktop app.`, `When setting up the OS.`] },
    { type: "Best Practice", q: "What is the recommended approach for", o: [`Follow the standard ${topicName} convention.`, `Ignore best practices.`, `Use Snake_Case exclusively.`, `Write everything on one line.`] }
  ];
  
  for (let i = 1; i <= 10; i++) {
    const template = questionTypes[i - 1];
    const diff = i <= 3 ? "easy" : i <= 7 ? "medium" : "hard";
    questions.push({
      id: `${quizId}-q${i}`,
      question: `[${topicName}] Question ${i} (${template.type}): ${template.q} ${topicName}?`,
      options: template.o,
      correctOptionIndex: 0,
      explanation: `This is a comprehensive explanation for ${topicName} focusing on the ${template.type} aspect. It only discusses ${topicName} and avoids unrelated topics.`,
      difficulty: diff,
      hint: `Recall the principles of ${topicName}.`
    });
  }
  return questions;
}

function generateLessons(moduleId: string, topics: string[]) {
  return topics.map((title) => {
    const lessonNum = globalLessonCounter++;
    return {
      id: `web-lesson-${lessonNum}`,
      topicId: moduleId,
      title: title,
      order: lessonNum,
      whatIsThis: `${title} is a core component of the Web Development ecosystem, heavily utilized by web developers.`,
      whyIsItImportant: `Mastering ${title} is essential for building robust web applications and performing well in technical interviews.`,
      howDoesItWork: `The web ecosystem utilizes ${title} by parsing the associated syntax and executing it via the browser or server.`,
      syntaxStructure: `// Syntax structure for ${title}\nfunction executeFeature() {\n    // Implementation\n}`,
      simpleExample: `Here is an entry-level implementation of ${title} to demonstrate its basic mechanics.`,
      codeExample: {
        language: "javascript",
        code: `function demonstrate() {\n    // Real world example of ${title}\n    console.log("Executing ${title} logic.");\n}\n\ndemonstrate();`,
        output: `Executing ${title} logic.`,
        explanation: `This code correctly demonstrates ${title}, adhering to best practices and conventions.`
      },
      realWorldUseCase: `${title} is frequently used in web interfaces, backend APIs, and data processing workflows.`,
      commonMistakes: [
        `Ignoring edge cases when working with ${title}.`,
        `Failing to handle async behavior properly in ${title} implementations.`
      ],
      bestPractices: [
        `Use meaningful semantic structures and follow modern standards when writing ${title}.`,
        `Write modular, testable code when utilizing ${title}.`
      ],
      keyTakeaways: [
        `${title} is critical for Web Development proficiency.`,
        `Understanding the nuances of ${title} separates beginners from intermediate developers.`
      ],
      practiceTask: {
        title: `Practice ${title}`,
        description: `Write a robust implementation that utilizes ${title} to solve a well-defined problem.`,
        hint: `Start simple, verify your syntax, and add complexity incrementally.`,
        solution: `function solution() {\n    // Optimal solution for ${title}\n}`
      },
      quiz: {
        id: `quiz-web-lesson-${lessonNum}`,
        courseId: "web-dev-basics",
        title: `Quiz: ${title}`,
        passingScore: 70,
        questions: generateQuizQuestions(`quiz-web-lesson-${lessonNum}`, title)
      }
    };
  });
}

function generateInterviewQuestions() {
  const questions = [];
  const categories = ["Concept", "Coding", "Debugging", "Scenario", "Practical", "Best Practice"];
  const allTopics = modulesData.flatMap(m => m.topics);
  
  for (let i = 1; i <= 75; i++) {
    const topic = allTopics[i % allTopics.length];
    const category = categories[i % categories.length];
    const diff = i % 3 === 0 ? "hard" : i % 2 === 0 ? "medium" : "easy";
    
    questions.push({
      id: `web-interview-${i}`,
      courseId: "web-dev-basics",
      question: `Interview Question ${i}: Explain the mechanics of ${topic} and how you would use it in a ${category.toLowerCase()} context.`,
      answer: `${topic} is critical in Web Development. In a ${category} scenario, it provides specific benefits for maintainability and performance.`,
      explanation: `Interviewers often ask this to verify if you truly understand ${topic} rather than just memorizing syntax.`,
      topic: topic,
      category: category,
      difficulty: diff
    });
  }
  return questions;
}

const webCourseTopics = modulesData.map((mod, index) => {
  const slug = `module-${index + 1}`;
  return {
    id: slug,
    courseId: "web-dev-basics",
    title: mod.title,
    slug: slug,
    order: index + 1,
    description: `Module ${index + 1}: ${mod.title}`,
    subtopics: generateLessons(slug, mod.topics)
  };
});

const webCourse = {
  id: "web-dev-basics",
  title: "Modern Web Development",
  slug: "web-development",
  description: "Learn HTML, CSS, JavaScript, React, and Full-Stack to build beautiful, responsive web applications.",
  category: "Web Development",
  level: "Beginner",
  image: "/web-dev-logo.png",
  topics: webCourseTopics
};

const dataDir = path.join(process.cwd(), 'lib/data');
const outputFile = path.join(dataDir, 'mock-course-web-generated.ts');

const fileContent = [
  'import { Course } from "./course-schema";',
  'import { InterviewQuestion } from "./interview-schema";',
  '',
  'export const WEB_COURSE: Course = ' + JSON.stringify(webCourse, null, 2) + ';',
  '',
  'export const WEB_INTERVIEW_QUESTIONS: InterviewQuestion[] = ' + JSON.stringify(generateInterviewQuestions(), null, 2) + ';'
].join('\n');

fs.writeFileSync(outputFile, fileContent);
console.log("Successfully generated Web Development course content!");
console.log(`- Modules: ${modulesData.length}`);
console.log(`- Lessons: ${globalLessonCounter - 1}`);
console.log(`- Quiz Questions: ${(globalLessonCounter - 1) * 10}`);
console.log(`- Interview Questions: 75`);
