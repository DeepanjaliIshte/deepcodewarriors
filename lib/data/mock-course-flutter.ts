import { Course } from "./course-schema";

export const FLUTTER_COURSE: Course = {
  id: "flutter-basics",
  title: "Flutter Mobile Development",
  slug: "flutter",
  description: "Build beautiful, natively compiled, multi-platform applications from a single codebase using Flutter and Dart.",
  category: "Mobile Development",
  level: "Beginner",
  image: "/flutter-logo.png",
  topics: [
    {
      id: "flutter-intro",
      courseId: "flutter-basics",
      title: "1. Getting Started with Flutter",
      slug: "intro",
      order: 1,
      description: "Understand the framework and Dart language.",
      subtopics: [
        {
          id: "what-is-flutter",
          topicId: "flutter-intro",
          title: "What is Flutter?",
          order: 1,
          explanation: "Flutter is Google's open-source UI software development kit (SDK) for building compiled applications for mobile, web, and desktop from a single codebase. It uses the Dart programming language. The core philosophy of Flutter is that 'Everything is a Widget'.",
          importantPoints: [
            "Flutter compiles to native ARM code, offering superior performance compared to web-view wrappers.",
            "Dart is an object-oriented, strongly typed language created by Google.",
            "Widgets are the building blocks of a Flutter app's user interface."
          ],
          codeExamples: [
            {
              title: "Hello World in Flutter",
              language: "dart",
              code: "import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(\n    Center(\n      child: Text(\n        'Hello, world!',\n        textDirection: TextDirection.ltr,\n      ),\n    ),\n  );\n}",
              explanation: "The runApp() function takes a given Widget and makes it the root of the widget tree. We use a Center widget to center the Text widget."
            }
          ],
          commonMistakes: [
            "Forgetting to import 'package:flutter/material.dart', which causes standard widgets like Text and Center to be unrecognized."
          ],
          interviewQuestions: [
            { question: "What is the difference between Hot Reload and Hot Restart?", answer: "Hot Reload updates the UI while preserving the app's state. Hot Restart resets the app state completely." }
          ],
          practiceQuestions: [],
          practiceTask: {
            title: "Your First Widget",
            description: "Change the 'Hello, world!' text to your name.",
            hint: "Find the Text widget inside the code and modify its string argument.",
            solution: "Text('Hello, Alex!', textDirection: TextDirection.ltr,)"
          }
        }
      ]
    },
    {
      id: "flutter-widgets",
      courseId: "flutter-basics",
      title: "2. Stateless vs Stateful Widgets",
      slug: "widgets",
      order: 2,
      description: "Managing UI state in Flutter.",
      subtopics: [
        {
          id: "state-management",
          topicId: "flutter-widgets",
          title: "Understanding State",
          order: 1,
          explanation: "In Flutter, widgets can either be Stateless or Stateful. A StatelessWidget describes part of the user interface which can depend only upon the configuration information in the object itself. A StatefulWidget can change dynamically; for example, if a user clicks a button, the widget can redraw itself.",
          importantPoints: [
            "StatelessWidgets are immutable. Once built, their properties cannot change.",
            "StatefulWidgets have a mutable State object attached to them.",
            "Call `setState()` inside a StatefulWidget to trigger a UI rebuild."
          ],
          codeExamples: [
            {
              title: "Stateful Counter Example",
              language: "dart",
              code: "class Counter extends StatefulWidget {\n  @override\n  _CounterState createState() => _CounterState();\n}\n\nclass _CounterState extends State<Counter> {\n  int count = 0;\n\n  void increment() {\n    setState(() {\n      count++;\n    });\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return ElevatedButton(\n      onPressed: increment,\n      child: Text('Count: $count'),\n    );\n  }\n}",
              explanation: "When increment() is called, setState() tells Flutter that the state has changed, causing it to run the build() method again."
            }
          ],
          commonMistakes: [
            "Modifying a state variable directly (e.g., count++) without wrapping it in setState(). The UI will not update!"
          ],
          interviewQuestions: [
            { question: "Why do we use setState()?", answer: "It notifies the framework that the internal state of the object has changed, triggering a rebuild of the widget." }
          ],
          practiceQuestions: [],
          practiceTask: {
            title: "Build a Decrement Button",
            description: "Write a function inside a StatefulWidget that decreases a counter by 1 when called, and updates the UI.",
            hint: "Don't forget to use setState().",
            solution: "void decrement() {\n  setState(() {\n    count--;\n  });\n}"
          }
        }
      ]
    }
  ],
  quiz: {
    id: "flutter-quiz",
    courseId: "flutter-basics",
    title: "Flutter Final Quiz",
    passingScore: 70,
    questions: [
      {
        id: "fq1",
        question: "What programming language is used to write Flutter applications?",
        options: ["Java", "Kotlin", "Swift", "Dart"],
        correctOptionIndex: 3,
        explanation: "Flutter uses Dart, an object-oriented language developed by Google.",
        difficulty: "easy"
      },
      {
        id: "fq2",
        question: "Which function serves as the entry point for a Flutter application?",
        options: ["startApp()", "main()", "init()", "build()"],
        correctOptionIndex: 1,
        explanation: "Like Java and C, Dart applications begin execution at the top-level main() function.",
        difficulty: "easy"
      },
      {
        id: "fq3",
        question: "What is the core philosophy of Flutter's architecture?",
        options: ["Everything is a View", "Everything is a Component", "Everything is a Widget", "Everything is an Activity"],
        correctOptionIndex: 2,
        explanation: "In Flutter, almost everything—from layout structures to UI elements to animations—is a Widget.",
        difficulty: "easy"
      },
      {
        id: "fq4",
        question: "If a widget's appearance depends on data that changes over time, what type of widget should you use?",
        options: ["StatelessWidget", "StatefulWidget", "DynamicWidget", "InheritedWidget"],
        correctOptionIndex: 1,
        explanation: "A StatefulWidget maintains a State object that can change over the lifecycle of the widget.",
        difficulty: "medium"
      },
      {
        id: "fq5",
        question: "What method must you call to trigger a UI rebuild when state changes in a StatefulWidget?",
        options: ["updateUI()", "refresh()", "setState()", "build()"],
        correctOptionIndex: 2,
        explanation: "The setState() method notifies the framework to rerun the build method and update the UI.",
        difficulty: "medium"
      },
      {
        id: "fq6",
        question: "Which of the following is an advantage of Flutter's 'Hot Reload'?",
        options: ["It compiles the app faster for production.", "It injects updated source code into the running Dart Virtual Machine while preserving state.", "It restarts the entire app instantly.", "It translates Dart into Java instantly."],
        correctOptionIndex: 1,
        explanation: "Hot Reload allows developers to see changes instantly without losing the current state of the app.",
        difficulty: "medium"
      },
      {
        id: "fq7",
        question: "What widget is typically used as a structural root for Material Design apps, providing drawers, app bars, and bottom sheets?",
        options: ["MaterialApp", "Container", "Scaffold", "SafeArea"],
        correctOptionIndex: 2,
        explanation: "The Scaffold widget implements the basic material design visual layout structure.",
        difficulty: "hard"
      },
      {
        id: "fq8",
        question: "How do you arrange widgets vertically in a column?",
        options: ["Use a Row widget", "Use a Stack widget", "Use a VerticalBox widget", "Use a Column widget"],
        correctOptionIndex: 3,
        explanation: "The Column widget displays its children in a vertical array.",
        difficulty: "easy"
      },
      {
        id: "fq9",
        question: "What is the purpose of the `pubspec.yaml` file in a Flutter project?",
        options: ["To write Dart code.", "To define Android permissions.", "To manage project dependencies, assets, and configuration.", "To configure the iOS build settings."],
        correctOptionIndex: 2,
        explanation: "The pubspec.yaml file is used by the Dart package manager (Pub) to handle dependencies and project metadata.",
        difficulty: "medium"
      },
      {
        id: "fq10",
        question: "What widget would you use to add padding around a child widget?",
        options: ["Margin", "Padding", "Space", "SizedBox"],
        correctOptionIndex: 1,
        explanation: "The Padding widget adds empty space around its child.",
        difficulty: "easy"
      }
    ]
  }
};
