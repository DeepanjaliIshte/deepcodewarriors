import { Course } from "./course-schema";

export const ADVANCED_JAVA_COURSE: Course = {
  id: "java-advanced",
  title: "Advanced Java",
  slug: "advanced-java",
  description: "Take your Java skills to the next level with Object-Oriented Programming, Generics, Collections, and Streams.",
  category: "Programming Languages",
  level: "Advanced",
  image: "/java-logo.png",
  topics: [
    {
      id: "adv-oop",
      courseId: "java-advanced",
      title: "1. Advanced OOP Concepts",
      slug: "oop",
      order: 1,
      description: "Deep dive into Object-Oriented Programming.",
      subtopics: [
        {
          id: "polymorphism-inheritance",
          topicId: "adv-oop",
          title: "Inheritance and Polymorphism",
          order: 1,
          explanation: "Inheritance allows a new class to inherit properties and methods from an existing class. Polymorphism allows methods to do different things based on the object that it is acting upon. In Java, this is achieved through Method Overriding (runtime polymorphism) and Method Overloading (compile-time polymorphism).",
          importantPoints: [
            "Use the `extends` keyword for inheritance.",
            "Use the `@Override` annotation when overriding a method from a superclass.",
            "A superclass reference variable can hold a subclass object (Upcasting)."
          ],
          codeExamples: [
            {
              title: "Polymorphism Example",
              language: "java",
              code: "class Animal {\n    public void makeSound() {\n        System.out.println(\"Some sound\");\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    public void makeSound() {\n        System.out.println(\"Bark\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal myDog = new Dog();\n        myDog.makeSound(); // Prints 'Bark'\n    }\n}",
              output: "Bark",
              explanation: "Even though myDog is declared as type Animal, the JVM calls the overridden method in Dog at runtime."
            }
          ],
          commonMistakes: [
            "Trying to override a static method. Static methods are bound at compile time and cannot be overridden (they are 'hidden').",
            "Forgetting to use the `super` keyword to call the parent class constructor."
          ],
          interviewQuestions: [
            { question: "What is the difference between Overloading and Overriding?", answer: "Overloading happens at compile-time within the same class (same method name, different parameters). Overriding happens at runtime between parent and child classes (same method signature)." }
          ],
          practiceQuestions: [],
          practiceTask: {
            title: "Create a Subclass",
            description: "Create a class `Vehicle` with a `startEngine()` method, and a subclass `Car` that overrides it.",
            hint: "Don't forget the @Override annotation.",
            solution: "class Vehicle {\n  public void startEngine() { System.out.println(\"Vroom\"); }\n}\nclass Car extends Vehicle {\n  @Override\n  public void startEngine() { System.out.println(\"Car Vroom\"); }\n}"
          }
        }
      ]
    },
    {
      id: "adv-collections",
      courseId: "java-advanced",
      title: "2. The Collections Framework",
      slug: "collections",
      order: 2,
      description: "Managing groups of objects.",
      subtopics: [
        {
          id: "lists-sets-maps",
          topicId: "adv-collections",
          title: "Lists, Sets, and Maps",
          order: 1,
          explanation: "The Java Collections Framework provides an architecture to store and manipulate groups of objects. The core interfaces are List (ordered, allows duplicates), Set (unordered, no duplicates), and Map (key-value pairs, keys must be unique).",
          importantPoints: [
            "ArrayList is the most common List implementation (fast iteration, slow insertion/deletion in middle).",
            "HashSet is the most common Set implementation (O(1) lookups).",
            "HashMap is the most common Map implementation (stores key-value pairs)."
          ],
          codeExamples: [
            {
              title: "Using HashMap",
              language: "java",
              code: "import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> scores = new HashMap<>();\n        scores.put(\"Alice\", 95);\n        scores.put(\"Bob\", 82);\n        \n        System.out.println(\"Alice's score: \" + scores.get(\"Alice\"));\n    }\n}",
              output: "Alice's score: 95",
              explanation: "HashMap maps String keys to Integer values. We use .put() to insert and .get() to retrieve."
            }
          ],
          commonMistakes: [
            "Modifying a collection while iterating over it with a standard for-each loop, which throws a ConcurrentModificationException. Use an Iterator instead."
          ],
          interviewQuestions: [
            { question: "What is the difference between ArrayList and LinkedList?", answer: "ArrayList uses a dynamic array (fast access, slow inserts), while LinkedList uses a doubly linked list (slow access, fast inserts/removals)." }
          ],
          practiceQuestions: [],
          practiceTask: {
            title: "Unique Items Only",
            description: "If you have an array with duplicate names, what Collection should you use to easily remove duplicates?",
            hint: "It's an interface that does not allow duplicates.",
            solution: "You should use a Set, specifically a HashSet."
          }
        }
      ]
    }
  ],
  quiz: {
    id: "java-advanced-quiz",
    courseId: "java-advanced",
    title: "Advanced Java Final Quiz",
    passingScore: 70,
    questions: [
      {
        id: "ajq1",
        question: "Which keyword is used by a class to inherit from another class in Java?",
        options: ["implements", "extends", "inherits", "super"],
        correctOptionIndex: 1,
        explanation: "The `extends` keyword is used for class inheritance in Java.",
        difficulty: "easy"
      },
      {
        id: "ajq2",
        question: "What is method overloading?",
        options: ["Overwriting a method in a subclass.", "Having multiple methods with the same name but different parameters in the same class.", "Hiding a parent class method.", "Calling a method too many times."],
        correctOptionIndex: 1,
        explanation: "Method Overloading is compile-time polymorphism where methods share a name but differ in parameter type or count.",
        difficulty: "medium"
      },
      {
        id: "ajq3",
        question: "Can you override a static method in Java?",
        options: ["Yes, just like instance methods.", "No, static methods are hidden, not overridden.", "Yes, if the parent class is abstract.", "No, static methods cannot be inherited."],
        correctOptionIndex: 1,
        explanation: "Static methods belong to the class, not the instance. If a child class defines a static method with the same signature, it 'hides' the parent method; it does not override it.",
        difficulty: "hard"
      },
      {
        id: "ajq4",
        question: "Which Collection interface does NOT extend the `Collection` interface?",
        options: ["List", "Set", "Queue", "Map"],
        correctOptionIndex: 3,
        explanation: "The Map interface is part of the Collections Framework, but it does NOT extend the `Collection` interface because it stores key-value pairs, not single elements.",
        difficulty: "hard"
      },
      {
        id: "ajq5",
        question: "Which class should you use if you need a list that is very fast at inserting and deleting elements in the middle?",
        options: ["ArrayList", "Vector", "LinkedList", "Stack"],
        correctOptionIndex: 2,
        explanation: "LinkedList provides O(1) insertions and deletions (if you have the node reference) because it just updates pointers, unlike ArrayList which must shift elements.",
        difficulty: "medium"
      },
      {
        id: "ajq6",
        question: "What happens if you try to add a duplicate element to a HashSet?",
        options: ["It throws an Exception.", "It adds the duplicate element successfully.", "The add() method returns false and the duplicate is ignored.", "It replaces all existing elements."],
        correctOptionIndex: 2,
        explanation: "Sets do not allow duplicates. The `add()` method will simply return false and leave the Set unchanged.",
        difficulty: "medium"
      },
      {
        id: "ajq7",
        question: "What exception is commonly thrown if you modify an ArrayList while looping through it with a for-each loop?",
        options: ["IndexOutOfBoundsException", "ConcurrentModificationException", "IllegalStateException", "NullPointerException"],
        correctOptionIndex: 1,
        explanation: "Java's for-each loop relies on iterators that throw ConcurrentModificationException if the underlying collection is modified during iteration.",
        difficulty: "hard"
      },
      {
        id: "ajq8",
        question: "Which keyword prevents a class from being subclassed?",
        options: ["static", "private", "final", "abstract"],
        correctOptionIndex: 2,
        explanation: "Declaring a class as `final` strictly prevents any other class from extending it (e.g., the `String` class).",
        difficulty: "easy"
      },
      {
        id: "ajq9",
        question: "In a HashMap, what happens if two keys produce the same hashcode?",
        options: ["The program crashes.", "The old value is overwritten.", "A Hash Collision occurs and both are stored in a linked list or tree at that index.", "The new key is rejected."],
        correctOptionIndex: 2,
        explanation: "This is known as a collision. Java HashMaps handle this by chaining the entries using a linked list (or a balanced tree if the list gets too long).",
        difficulty: "hard"
      },
      {
        id: "ajq10",
        question: "Which of the following is an example of Upcasting?",
        options: ["Dog d = new Animal();", "Animal a = new Dog();", "Animal a = (Animal) new Dog();", "Dog d = (Dog) new Animal();"],
        correctOptionIndex: 1,
        explanation: "Upcasting is casting a subtype to a supertype. It happens implicitly, so `Animal a = new Dog();` is valid upcasting.",
        difficulty: "medium"
      }
    ]
  }
};
