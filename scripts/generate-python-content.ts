import * as fs from 'fs';
import * as path from 'path';

const modulesData = [
  {
    title: "MODULE 1 - Python Introduction",
    topics: [
      "Python Basics and Use Cases",
      "Python vs Others and Installation",
      "Running Python and IDEs",
      "Python Comments and PEP 8",
      "First Python Program"
    ]
  },
  {
    title: "MODULE 2 - Variables and Data Types",
    topics: [
      "Variables and Dynamic Typing",
      "Numbers in Python",
      "Booleans and None Type",
      "Strings Overview",
      "Type Checking and Conversion",
      "Mutable vs Immutable Objects"
    ]
  },
  {
    title: "MODULE 3 - Operators",
    topics: [
      "Arithmetic and Assignment Operators",
      "Comparison and Logical Operators",
      "Identity and Membership Operators",
      "Bitwise Operators",
      "Operator Precedence"
    ]
  },
  {
    title: "MODULE 4 - Input and Output",
    topics: [
      "print() and Formatting",
      "f-Strings and String Formatting",
      "input() and Data Types",
      "Basic User Input Programs"
    ]
  },
  {
    title: "MODULE 5 - Conditional Statements",
    topics: [
      "if, if-else, elif Statements",
      "Nested and Multiple Conditions",
      "Conditional Expressions",
      "Practical Decision-Making"
    ]
  },
  {
    title: "MODULE 6 - Loops",
    topics: [
      "for Loop and range()",
      "while Loop",
      "Nested Loops",
      "break, continue, pass",
      "Loop else Clause",
      "Iterating Over Collections"
    ]
  },
  {
    title: "MODULE 7 - Strings",
    topics: [
      "String Indexing and Slicing",
      "String Methods and Searching",
      "String Splitting and Joining",
      "String Immutability and Replacement",
      "String Practice Problems"
    ]
  },
  {
    title: "MODULE 8 - Lists",
    topics: [
      "Creating, Accessing, and Slicing Lists",
      "Adding, Removing, and Updating Elements",
      "List Methods and Iteration",
      "Nested Lists and Copying",
      "List Comprehensions",
      "List Practice Problems"
    ]
  },
  {
    title: "MODULE 9 - Tuples, Sets and Dictionaries",
    topics: [
      "Tuples and Unpacking",
      "Sets and Set Operations",
      "Dictionary Keys, Values, and Methods",
      "Iterating and Nested Dictionaries",
      "Dictionary Comprehensions",
      "Choosing List vs Tuple vs Set vs Dictionary"
    ]
  },
  {
    title: "MODULE 10 - Functions",
    topics: [
      "Defining Functions and Return Values",
      "Parameters and Arguments",
      "args and kwargs",
      "Variable Scope (Local vs Global)",
      "Lambda Functions",
      "Higher-Order Functions",
      "map, filter, and reduce",
      "Recursion"
    ]
  },
  {
    title: "MODULE 11 - Modules and Packages",
    topics: [
      "Modules and Imports",
      "Built-in vs Custom Modules",
      "Packages and dunder name",
      "Python Package Management (pip)",
      "Virtual Environments"
    ]
  },
  {
    title: "MODULE 12 - Exception Handling",
    topics: [
      "Errors vs Exceptions",
      "try, except, and Multiple Exceptions",
      "else, finally, and raise",
      "Custom Exceptions",
      "Exception Best Practices"
    ]
  },
  {
    title: "MODULE 13 - File Handling",
    topics: [
      "File Handling Basics and Modes",
      "Reading, Writing, and Appending",
      "The with Statement",
      "Working with CSV and JSON",
      "File Handling Errors"
    ]
  },
  {
    title: "MODULE 14 - Object-Oriented Programming",
    topics: [
      "Classes, Objects, and init",
      "Instance, Class, and Static Methods",
      "Encapsulation",
      "Inheritance and super",
      "Method Overriding and Polymorphism",
      "Abstraction and Abstract Base Classes",
      "Magic and Special Methods",
      "OOP Best Practices"
    ]
  },
  {
    title: "MODULE 15 - Advanced Python Fundamentals",
    topics: [
      "Iterables and Iterators",
      "Generators and yield",
      "Decorators",
      "Closures",
      "Context Managers",
      "enumerate, zip, any, all",
      "Advanced Comprehension Techniques"
    ]
  },
  {
    title: "MODULE 16 - Python Standard Library",
    topics: [
      "datetime, math, and random",
      "os, sys, and pathlib",
      "collections module",
      "itertools and functools",
      "Regular Expressions (re)"
    ]
  },
  {
    title: "MODULE 17 - Practical Python",
    topics: [
      "Debugging and Tracebacks",
      "Clean Code and Code Organization",
      "Working with APIs and JSON",
      "Environment Variables",
      "Python Project Structure"
    ]
  },
  {
    title: "MODULE 18 - Python Practice & Projects",
    topics: [
      "Beginner Coding Problems",
      "Data Structure Practice",
      "File Handling Project",
      "CLI-Based Python Project",
      "API-Based Final Project"
    ]
  }
];

let globalLessonCounter = 1;

function generateQuizQuestions(quizId: string, topicName: string) {
  const questions = [];
  const questionTypes = [
    { type: "Concept", q: "What is the primary function of", o: [`To implement ${topicName}`, `To optimize ${topicName}`, `To ignore ${topicName}`, `To bypass ${topicName}`] },
    { type: "Concept", q: "Which statement accurately describes", o: [`It manages ${topicName} execution.`, `It requires a third-party tool.`, `It is only used in legacy Python.`, `It has been deprecated in Python 3.`] },
    { type: "Syntax", q: "What is the correct syntax related to", o: [`valid_syntax_for(${topicName})`, `invalid_syntax<${topicName}>`, `[${topicName}]->syntax`, `${topicName}.syntax!!`] },
    { type: "Syntax", q: "Identify the valid implementation of", o: [`def handle_${topicName.replace(/ /g, '_')}(): pass`, `function ${topicName}() {}`, `void ${topicName}() {}`, `create ${topicName} end`] },
    { type: "Output", q: "What will be the output of a standard script using", o: [`Expected ${topicName} behavior.`, `SyntaxError`, `TypeError`, `None`] },
    { type: "Output", q: "If a developer misconfigures", o: [`A runtime error related to ${topicName} occurs.`, `The script executes faster.`, `The OS crashes.`, `Python downgrades itself.`] },
    { type: "Debugging", q: "A common Exception encountered when using", o: [`Misuse of ${topicName} logic.`, `Memory overflow.`, `Stack underflow.`, `KeyboardInterrupt.`] },
    { type: "Debugging", q: "How can you resolve a logical error in", o: [`Trace the ${topicName} state.`, `Reinstall Python.`, `Reboot the system.`, `Delete the script.`] },
    { type: "Scenario", q: "In a web backend, when should you apply", o: [`When processing ${topicName} tasks.`, `When designing the frontend.`, `When writing CSS.`, `When setting up the database schema.`] },
    { type: "Best Practice", q: "What is the recommended PEP 8 approach for", o: [`Follow the standard ${topicName} convention.`, `Ignore PEP 8.`, `Use CamelCase exclusively.`, `Write everything on one line.`] }
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
      id: `python-lesson-${lessonNum}`,
      topicId: moduleId,
      title: title,
      order: lessonNum,
      whatIsThis: `${title} is a core component of the Python ecosystem, heavily utilized by software developers.`,
      whyIsItImportant: `Mastering ${title} is essential for writing efficient, idiomatic Python code and performing well in technical interviews.`,
      howDoesItWork: `Python evaluates ${title} by parsing the associated syntax and executing it via the Python interpreter.`,
      syntaxStructure: `# Syntax structure for ${title}\ndef execute_feature():\n    pass`,
      simpleExample: `Here is an entry-level implementation of ${title} to demonstrate its basic mechanics.`,
      codeExample: {
        language: "python",
        code: `def demonstrate():\n    # Real world example of ${title}\n    print("Executing ${title} logic.")\n\nif __name__ == "__main__":\n    demonstrate()`,
        output: `Executing ${title} logic.`,
        explanation: `This code correctly demonstrates ${title}, adhering to Python best practices and conventions.`
      },
      realWorldUseCase: `${title} is frequently used in automation scripts, backend APIs, and data processing workflows.`,
      commonMistakes: [
        `Ignoring edge cases when working with ${title}.`,
        `Failing to handle exceptions properly in ${title} implementations.`
      ],
      bestPractices: [
        `Use meaningful variable names and follow PEP 8 when writing ${title}.`,
        `Write modular, testable code when utilizing ${title}.`
      ],
      keyTakeaways: [
        `${title} is critical for Python proficiency.`,
        `Understanding the nuances of ${title} separates beginners from intermediate developers.`
      ],
      practiceTask: {
        title: `Practice ${title}`,
        description: `Write a robust Python script that utilizes ${title} to solve a well-defined problem.`,
        hint: `Start simple, verify your syntax, and add complexity incrementally.`,
        solution: `def solution():\n    # Optimal solution for ${title}\n    pass`
      },
      quiz: {
        id: `quiz-python-lesson-${lessonNum}`,
        courseId: "python-basics",
        title: `Quiz: ${title}`,
        passingScore: 70,
        questions: generateQuizQuestions(`quiz-python-lesson-${lessonNum}`, title)
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
      id: `python-interview-${i}`,
      courseId: "python-basics",
      question: `Interview Question ${i}: Explain the mechanics of ${topic} and how you would use it in a ${category.toLowerCase()} context.`,
      answer: `${topic} is critical in Python. In a ${category} scenario, it provides specific benefits for maintainability and performance.`,
      explanation: `Interviewers often ask this to verify if you truly understand ${topic} rather than just memorizing syntax.`,
      topic: topic,
      category: category,
      difficulty: diff
    });
  }
  return questions;
}

const pythonCourseTopics = modulesData.map((mod, index) => {
  const slug = `module-${index + 1}`;
  return {
    id: slug,
    courseId: "python-basics",
    title: mod.title,
    slug: slug,
    order: index + 1,
    description: `Module ${index + 1}: ${mod.title}`,
    subtopics: generateLessons(slug, mod.topics)
  };
});

const pythonCourse = {
  id: "python-basics",
  title: "Python Basics",
  slug: "python",
  description: "Master Python from absolute basics to intermediate concepts suitable for developer interviews.",
  category: "Programming Languages",
  level: "Beginner",
  image: "/python-logo.png", // Assuming a generic logo path
  topics: pythonCourseTopics
};

const dataDir = path.join(process.cwd(), 'lib/data');
const outputFile = path.join(dataDir, 'mock-course-python-generated.ts');

const fileContent = [
  'import { Course } from "./course-schema";',
  'import { InterviewQuestion } from "./interview-schema";',
  '',
  'export const PYTHON_COURSE: Course = ' + JSON.stringify(pythonCourse, null, 2) + ';',
  '',
  'export const PYTHON_INTERVIEW_QUESTIONS: InterviewQuestion[] = ' + JSON.stringify(generateInterviewQuestions(), null, 2) + ';'
].join('\n');

fs.writeFileSync(outputFile, fileContent);
console.log("Successfully generated Python Basics course content!");
console.log(`- Modules: ${modulesData.length}`);
console.log(`- Lessons: ${globalLessonCounter - 1}`);
console.log(`- Quiz Questions: ${(globalLessonCounter - 1) * 10}`);
console.log(`- Interview Questions: 75`);
