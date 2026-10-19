import { Course } from "./course-schema";

export const JAVA_COURSE: Course = {
  id: "java-basics",
  title: "Java Fundamentals",
  slug: "java",
  description: "Learn the fundamentals of Java programming from scratch with deep dives into variables, data types, and core concepts.",
  category: "Programming Languages",
  level: "Beginner",
  image: "/java-logo.png",
  topics: [
    {
      id: "java-intro",
      courseId: "java-basics",
      title: "1. Introduction to Java",
      slug: "introduction-to-java",
      order: 1,
      description: "Overview of Java and its history.",
      subtopics: [
        {
          id: "what-is-java",
          topicId: "java-intro",
          title: "What is Java?",
          order: 1,
          explanation: "Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Developed by James Gosling at Sun Microsystems and released in 1995, it follows the philosophy of 'Write Once, Run Anywhere' (WORA). This means compiled Java code can run on all platforms that support Java without the need for recompilation.",
          importantPoints: [
            "Java is platform-independent thanks to the Java Virtual Machine (JVM).",
            "It is strongly typed, meaning every variable must be declared with a data type.",
            "Everything in Java is associated with classes and objects (Object-Oriented).",
            "Used heavily in enterprise software, Android development, and big data."
          ],
          codeExamples: [
            {
              title: "Basic Java Class Structure",
              language: "java",
              code: "public class Main {\n    // The main method is the entry point of any Java application\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
              output: "Hello, World!",
              explanation: "Every Java program requires a class (here, Main) and a main method. The System.out.println command prints text to the console."
            }
          ],
          commonMistakes: [
            "Confusing Java with JavaScript. They are completely different languages with different use cases.",
            "Forgetting that Java is strictly case-sensitive. 'String' is not the same as 'string'."
          ],
          interviewQuestions: [
            { question: "What does 'Write Once, Run Anywhere' mean?", answer: "It means that Java source code is compiled into bytecode, which can be executed by any JVM on any operating system without modification." }
          ],
          practiceQuestions: [],
          practiceTask: {
            title: "Your First Java Method",
            description: "Modify the Hello World program to print your name instead.",
            hint: "Change the text inside the System.out.println() parentheses.",
            solution: "System.out.println(\"Hello, Alex!\");"
          }
        }
      ]
    },
    {
      id: "java-variables",
      courseId: "java-basics",
      title: "2. Variables and Data Types",
      slug: "variables-and-data-types",
      order: 2,
      description: "Storing data in memory using primitive and reference types.",
      subtopics: [
        {
          id: "declaring-variables",
          topicId: "java-variables",
          title: "Declaring Variables",
          order: 1,
          explanation: "A variable is a container that holds data in memory. In Java, because it is statically typed, you must declare the type of a variable before you can use it. The syntax is `dataType variableName = value;`. There are two main categories of data types: Primitives (like int, double, boolean) which hold simple values, and Reference Types (like String, Arrays, Objects) which hold references to memory locations.",
          importantPoints: [
            "int (Integer): Used for whole numbers (e.g., 5, -10).",
            "double: Used for floating-point numbers (decimals).",
            "boolean: Stores true or false.",
            "String: A reference type used for text.",
            "Variable names should use camelCase (e.g., myVariableName)."
          ],
          codeExamples: [
            {
              title: "Variable Declarations",
              language: "java",
              code: "int age = 25;\ndouble price = 19.99;\nboolean isOnline = true;\nString username = \"AlexDev\";\n\nSystem.out.println(username + \" is \" + age + \" years old.\");",
              output: "AlexDev is 25 years old.",
              explanation: "We declare four variables of different types. Then we use the '+' operator to concatenate (join) the variables with strings in the print statement."
            }
          ],
          commonMistakes: [
            "Forgetting the semicolon (;) at the end of the declaration.",
            "Trying to assign a decimal value to an int variable (e.g., int age = 25.5; will cause a compilation error).",
            "Using uninitialized variables. Java requires local variables to be initialized before use."
          ],
          interviewQuestions: [
            { question: "What is the difference between primitive and reference types?", answer: "Primitive types store the actual value directly in memory (stack), whereas reference types store a reference (memory address) pointing to the object data (heap)." }
          ],
          practiceQuestions: [],
          practiceTask: {
            title: "Store Product Info",
            description: "Declare variables for a product's name (String), price (double), and whether it is in stock (boolean). Print a sentence summarizing the product.",
            hint: "Use camelCase for your variables: productName, productPrice, isAvailable.",
            solution: "String productName = \"Laptop\";\ndouble productPrice = 999.99;\nboolean isAvailable = true;\nSystem.out.println(productName + \" costs $\" + productPrice + \". In stock: \" + isAvailable);"
          }
        }
      ]
    },
    {
      id: "java-control-flow",
      courseId: "java-basics",
      title: "3. Control Flow (If/Else & Loops)",
      slug: "control-flow",
      order: 3,
      description: "Controlling the execution path of your programs.",
      subtopics: [
        {
          id: "if-else-loops",
          topicId: "java-control-flow",
          title: "Conditionals and Loops",
          order: 1,
          explanation: "Control flow statements change the order in which code executes. `if/else` statements allow you to run specific code only when a condition evaluates to true. Loops (`for`, `while`) allow you to repeat a block of code multiple times. A `for` loop is typically used when you know exactly how many times to iterate, whereas a `while` loop is used when the number of iterations depends on a dynamic condition.",
          importantPoints: [
            "The condition in an if statement MUST result in a boolean (true or false).",
            "for loop syntax: for (initialization; condition; increment) { ... }",
            "Use 'break' to exit a loop early, and 'continue' to skip the current iteration."
          ],
          codeExamples: [
            {
              title: "Using If/Else and For Loops",
              language: "java",
              code: "int score = 85;\n\n// Conditional\nif (score >= 90) {\n    System.out.println(\"Grade: A\");\n} else if (score >= 80) {\n    System.out.println(\"Grade: B\");\n} else {\n    System.out.println(\"Grade: C\");\n}\n\n// Loop\nfor (int i = 1; i <= 3; i++) {\n    System.out.println(\"Attempt \" + i);\n}",
              output: "Grade: B\nAttempt 1\nAttempt 2\nAttempt 3",
              explanation: "The if-else block evaluates the score and prints B. The for loop initializes i to 1, checks if i <= 3, and increments i after each cycle."
            }
          ],
          commonMistakes: [
            "Infinite loops: Forgetting to increment the loop variable inside a while loop, causing it to run forever.",
            "Using a single '=' for comparison. Use '==' to compare values (e.g., if (x == 5))."
          ],
          interviewQuestions: [
            { question: "When would you use a do-while loop over a while loop?", answer: "Use a do-while loop when you want to guarantee that the loop body executes at least once, because the condition is checked at the end of the loop." }
          ],
          practiceQuestions: [],
          practiceTask: {
            title: "Even Number Printer",
            description: "Write a for loop that prints all even numbers from 2 to 10.",
            hint: "You can either increment by 2 in the loop definition (i += 2), or check if (i % 2 == 0) inside the loop.",
            solution: "for (int i = 2; i <= 10; i += 2) {\n    System.out.println(i);\n}"
          }
        }
      ]
    }
  ],
  quiz: {
    id: "java-quiz-1",
    courseId: "java-basics",
    title: "Java Fundamentals Final Quiz",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "Which component is responsible for executing Java bytecode?",
        options: ["Java Development Kit (JDK)", "Java Runtime Environment (JRE)", "Java Virtual Machine (JVM)", "Just-In-Time Compiler (JIT)"],
        correctOptionIndex: 2,
        explanation: "The JVM (Java Virtual Machine) acts as the engine that executes the bytecode generated by the Java compiler.",
        difficulty: "easy"
      },
      {
        id: "q2",
        question: "Which of the following is NOT a primitive data type in Java?",
        options: ["int", "String", "boolean", "double"],
        correctOptionIndex: 1,
        explanation: "String is an Object (reference type) in Java. Primitives include int, double, boolean, char, byte, short, long, and float.",
        difficulty: "easy"
      },
      {
        id: "q3",
        question: "What is the output of the following code: `int x = 5; System.out.println(x == 5);`?",
        options: ["5", "true", "false", "Compilation Error"],
        correctOptionIndex: 1,
        explanation: "The `==` operator performs a comparison. Since x is 5, the expression `5 == 5` evaluates to the boolean value `true`.",
        difficulty: "easy"
      },
      {
        id: "q4",
        question: "What happens if you omit the `public static void main(String[] args)` method in a Java application?",
        options: ["The program compiles but throws a runtime error when executed.", "The compiler automatically generates a main method.", "The program runs successfully without it.", "It depends on the IDE used."],
        correctOptionIndex: 0,
        explanation: "The Java compiler will successfully compile the class into a .class file, but the JVM will throw a NoSuchMethodError at runtime because it cannot find the entry point.",
        difficulty: "medium"
      },
      {
        id: "q5",
        question: "Which loop is guaranteed to execute at least one time regardless of the condition?",
        options: ["for loop", "while loop", "do-while loop", "enhanced for loop"],
        correctOptionIndex: 2,
        explanation: "A do-while loop executes its body first, and then evaluates the condition at the bottom, ensuring at least one execution.",
        difficulty: "easy"
      },
      {
        id: "q6",
        question: "Identify the error in this code: `int age = 25.5;`",
        options: ["Variables cannot start with lowercase letters.", "You must use the 'float' keyword instead of 'int'.", "An 'int' type can only store whole numbers.", "You cannot assign a value during declaration."],
        correctOptionIndex: 2,
        explanation: "The `int` primitive type only stores integers (whole numbers). To store a decimal like 25.5, you must use `double` or `float`.",
        difficulty: "medium"
      },
      {
        id: "q7",
        question: "What does the 'break' statement do when used inside a loop?",
        options: ["Skips the current iteration and moves to the next one.", "Immediately terminates the loop completely.", "Restarts the loop from the beginning.", "Pauses the loop execution."],
        correctOptionIndex: 1,
        explanation: "The `break` statement instantly exits the innermost loop it resides in, transferring control to the statement immediately following the loop.",
        difficulty: "easy"
      },
      {
        id: "q8",
        question: "How do you correctly compare the text content of two String variables, `str1` and `str2`?",
        options: ["str1 == str2", "str1.equals(str2)", "str1 = str2", "str1.compare(str2)"],
        correctOptionIndex: 1,
        explanation: "In Java, `==` compares object references (memory addresses). To compare the actual characters inside Strings, you must use the `.equals()` method.",
        difficulty: "hard"
      },
      {
        id: "q9",
        question: "What is the primary purpose of the 'Write Once, Run Anywhere' philosophy?",
        options: ["To prevent memory leaks.", "To ensure Java programs can run on any OS without recompiling.", "To make code execute faster than C++.", "To enforce object-oriented programming rules."],
        correctOptionIndex: 1,
        explanation: "WORA means Java is compiled into cross-platform bytecode. Any device with a JVM can execute this bytecode, making Java OS-independent.",
        difficulty: "medium"
      },
      {
        id: "q10",
        question: "Predict the output: `for(int i=0; i<3; i++) { System.out.print(i); }`",
        options: ["123", "012", "0 1 2", "1 2 3"],
        correctOptionIndex: 1,
        explanation: "The loop starts at 0, prints it, increments to 1, prints it, increments to 2, prints it. When i becomes 3, the condition `i<3` fails. System.out.print does not add newlines, resulting in `012`.",
        difficulty: "medium"
      }
    ]
  }
};
