import { Course } from "./course-schema";

export const PYTHON_COURSE: Course = {
  id: "python-basics",
  title: "Python for Beginners",
  slug: "python",
  description: "Learn Python programming, from basic syntax to object-oriented programming, with hands-on practice.",
  category: "Programming Languages",
  level: "Beginner",
  image: "/python-logo.png",
  topics: [
    {
      id: "python-intro",
      courseId: "python-basics",
      title: "1. Python Introduction",
      slug: "intro",
      order: 1,
      description: "Getting started with Python.",
      subtopics: [
        {
          id: "what-is-python",
          topicId: "python-intro",
          title: "What is Python?",
          order: 1,
          explanation: "Python is a popular, high-level, dynamically typed programming language created by Guido van Rossum and released in 1991. It emphasizes code readability and relies on significant indentation. Python is widely used in Web Development, Data Science, Artificial Intelligence, and Automation.",
          importantPoints: [
            "Python is interpreted, meaning code is executed line-by-line.",
            "It is dynamically typed (you don't declare variable types explicitly).",
            "Indentation is mandatory. It replaces the curly braces `{}` used in Java and C++."
          ],
          codeExamples: [
            {
              title: "Your First Python Script",
              language: "python",
              code: "def greet(name):\n    print(f\"Hello, {name}!\")\n\ngreet(\"Alice\")",
              output: "Hello, Alice!",
              explanation: "We define a function using 'def', indent the body, and use an f-string to easily inject the variable into the string."
            }
          ],
          commonMistakes: [
            "Mixing spaces and tabs for indentation. Python 3 strictly forbids this and will throw an IndentationError.",
            "Forgetting the colon (:) at the end of def, if, for, and while statements."
          ],
          interviewQuestions: [
            { question: "What does it mean that Python is dynamically typed?", answer: "Variable types are determined at runtime, and a variable can change its type throughout the program's execution." }
          ],
          practiceQuestions: [],
          practiceTask: {
            title: "Print Statement",
            description: "Write a Python script that prints 'Python is awesome!' to the console.",
            hint: "Use the print() function.",
            solution: "print('Python is awesome!')"
          }
        }
      ]
    },
    {
      id: "python-collections",
      courseId: "python-basics",
      title: "2. Lists and Dictionaries",
      slug: "collections",
      order: 2,
      description: "Data structures in Python.",
      subtopics: [
        {
          id: "lists-dicts",
          topicId: "python-collections",
          title: "Working with Collections",
          order: 1,
          explanation: "Python provides several built-in data structures. The most commonly used are Lists and Dictionaries. A List is an ordered, mutable sequence of items. A Dictionary is an unordered collection of key-value pairs, similar to a JSON object.",
          importantPoints: [
            "Lists use square brackets: `[1, 2, 3]`",
            "Dictionaries use curly braces with colons: `{'name': 'Alice', 'age': 25}`",
            "Lists are indexed starting from 0, while Dictionaries are accessed via their keys."
          ],
          codeExamples: [
            {
              title: "Lists vs Dictionaries",
              language: "python",
              code: "# List\nfruits = ['apple', 'banana', 'cherry']\nfruits.append('orange')\nprint(fruits[1])\n\n# Dictionary\nuser = {'name': 'John', 'age': 30}\nprint(user['name'])\nuser['location'] = 'New York'",
              output: "banana\nJohn",
              explanation: "Lists are modified with methods like append(). Dictionaries are modified by directly assigning to a key."
            }
          ],
          commonMistakes: [
            "Trying to access a dictionary key that doesn't exist raises a KeyError. Use the .get() method to safely access keys.",
            "IndexError in lists when trying to access an index out of range."
          ],
          interviewQuestions: [
            { question: "What is the difference between a List and a Tuple in Python?", answer: "Lists are mutable (can be changed after creation), whereas Tuples are immutable." }
          ],
          practiceQuestions: [],
          practiceTask: {
            title: "Dictionary Extraction",
            description: "Create a dictionary containing the keys 'title' and 'year', and print the title.",
            hint: "Use square brackets to extract the value by key.",
            solution: "movie = {'title': 'Inception', 'year': 2010}\nprint(movie['title'])"
          }
        }
      ]
    }
  ],
  quiz: {
    id: "python-quiz",
    courseId: "python-basics",
    title: "Python Final Quiz",
    passingScore: 70,
    questions: [
      {
        id: "pq1",
        question: "Who created Python?",
        options: ["James Gosling", "Guido van Rossum", "Brendan Eich", "Dennis Ritchie"],
        correctOptionIndex: 1,
        explanation: "Python was created by Guido van Rossum and first released in 1991.",
        difficulty: "easy"
      },
      {
        id: "pq2",
        question: "How do you indicate a block of code in Python?",
        options: ["Curly braces {}", "Parentheses ()", "Indentation", "Square brackets []"],
        correctOptionIndex: 2,
        explanation: "Python strictly relies on whitespace (indentation) at the beginning of a line to define scope in the code.",
        difficulty: "easy"
      },
      {
        id: "pq3",
        question: "Which collection is ordered and mutable?",
        options: ["Tuple", "List", "Set", "Dictionary"],
        correctOptionIndex: 1,
        explanation: "Lists are ordered, mutable collections defined with square brackets.",
        difficulty: "easy"
      },
      {
        id: "pq4",
        question: "What is the output of `print(type([]))`?",
        options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"],
        correctOptionIndex: 0,
        explanation: "Empty square brackets `[]` initialize a List object in Python.",
        difficulty: "medium"
      },
      {
        id: "pq5",
        question: "How do you safely fetch a value from a dictionary without risking a KeyError?",
        options: ["dict['key']", "dict.fetch('key')", "dict.get('key')", "dict.find('key')"],
        correctOptionIndex: 2,
        explanation: "The `.get()` method returns None (or a default value) if the key does not exist, whereas bracket notation throws an error.",
        difficulty: "medium"
      },
      {
        id: "pq6",
        question: "Identify the incorrect variable name in Python.",
        options: ["my_var", "_privateVar", "2ndValue", "camelCaseVar"],
        correctOptionIndex: 2,
        explanation: "Variable names cannot begin with a number.",
        difficulty: "easy"
      },
      {
        id: "pq7",
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "func", "define"],
        correctOptionIndex: 1,
        explanation: "Functions in Python are defined using the 'def' keyword.",
        difficulty: "easy"
      },
      {
        id: "pq8",
        question: "What does the `pass` statement do?",
        options: ["Exits a loop.", "It is a null operation; nothing happens when it executes.", "Throws an exception.", "Continues to the next loop iteration."],
        correctOptionIndex: 1,
        explanation: "The `pass` statement is used as a placeholder in empty functions or loops to prevent IndentationErrors.",
        difficulty: "medium"
      },
      {
        id: "pq9",
        question: "What will `print([1, 2, 3] + [4, 5])` output?",
        options: ["Error", "[5, 7, 3]", "[1, 2, 3, 4, 5]", "[[1,2,3], [4,5]]"],
        correctOptionIndex: 2,
        explanation: "The `+` operator concatenates two lists into a single larger list.",
        difficulty: "hard"
      },
      {
        id: "pq10",
        question: "Which of these is used for a single line comment in Python?",
        options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
        correctOptionIndex: 2,
        explanation: "Python uses the hash character `#` for single-line comments.",
        difficulty: "easy"
      }
    ]
  }
};
