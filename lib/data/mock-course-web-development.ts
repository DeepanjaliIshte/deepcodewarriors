import { Course } from "./course-schema";

export const WEB_DEV_COURSE: Course = {
  id: "web-dev-basics",
  title: "Modern Web Development",
  slug: "web-development",
  description: "Learn HTML, CSS, and JavaScript to build beautiful, responsive web applications.",
  category: "Web Development",
  level: "Beginner",
  image: "/web-dev-logo.png",
  topics: [
    {
      id: "web-intro",
      courseId: "web-dev-basics",
      title: "1. The Internet and Web",
      slug: "web-intro",
      order: 1,
      description: "How the web actually works.",
      subtopics: [
        {
          id: "how-web-works",
          topicId: "web-intro",
          title: "How the Web Works",
          order: 1,
          explanation: "The World Wide Web is a collection of interconnected documents (web pages) and other web resources, linked by hyperlinks and URLs. When you type a URL into a browser, it acts as a client, sending an HTTP request to a server. The server processes this request and returns an HTTP response, typically containing the HTML, CSS, and JavaScript needed to render the page.",
          importantPoints: [
            "Client: Your web browser (Chrome, Firefox, Safari).",
            "Server: A computer running software that serves web pages.",
            "HTTP/HTTPS: The protocol used to transfer data over the web.",
            "DNS: The Domain Name System translates human-readable URLs (like google.com) into IP addresses."
          ],
          codeExamples: [],
          commonMistakes: [
            "Confusing the Internet (the physical network of computers) with the World Wide Web (a service running on top of the Internet)."
          ],
          interviewQuestions: [
            { question: "What happens when you type a URL into your browser?", answer: "The browser resolves the domain via DNS, establishes a TCP connection with the server, sends an HTTP request, and the server returns an HTTP response which the browser renders." }
          ],
          practiceQuestions: [],
          practiceTask: {
            title: "Inspect a Web Page",
            description: "Open your browser's Developer Tools (F12 or Right Click -> Inspect) and view the Network tab.",
            hint: "Reload the page to see the initial HTML request, followed by CSS and JS requests.",
            solution: "You should see Status 200 OK for successful requests."
          }
        }
      ]
    },
    {
      id: "html-basics",
      courseId: "web-dev-basics",
      title: "2. HTML Foundation",
      slug: "html",
      order: 2,
      description: "Structuring web content with HTML5.",
      subtopics: [
        {
          id: "html-tags",
          topicId: "html-basics",
          title: "HTML Tags and Structure",
          order: 1,
          explanation: "HTML (HyperText Markup Language) provides the fundamental structure for web pages. It uses a system of tags to denote different types of content. Most tags have an opening `<tag>` and a closing `</tag>`. An HTML document starts with a `<!DOCTYPE html>` declaration, followed by an `<html>` tag containing `<head>` (metadata) and `<body>` (visible content).",
          importantPoints: [
            "Always include the DOCTYPE to ensure the browser uses standards mode.",
            "Use semantic tags like <header>, <main>, <article>, and <footer> for better accessibility and SEO.",
            "Tags can have attributes (e.g., <img src='image.jpg' alt='Description'>)."
          ],
          codeExamples: [
            {
              title: "Basic HTML Structure",
              language: "html",
              code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Welcome to Web Dev!</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>",
              output: "Welcome to Web Dev!\nThis is a paragraph.",
              explanation: "The head contains non-visible metadata. The body contains exactly what the user sees."
            }
          ],
          commonMistakes: [
            "Forgetting to close tags (e.g., leaving a <p> open).",
            "Using <div> for everything instead of semantic HTML5 tags."
          ],
          interviewQuestions: [
            { question: "What is semantic HTML?", answer: "Semantic HTML introduces meaning to the web page rather than just presentation (e.g., using <nav> for navigation instead of a plain <div>)." }
          ],
          practiceQuestions: [],
          practiceTask: {
            title: "Create a Profile Structure",
            description: "Write HTML that displays an h1 with your name, and an h2 with your title.",
            hint: "Use <h1> and <h2> tags inside a <body> tag.",
            solution: "<body>\n  <h1>Alice Developer</h1>\n  <h2>Frontend Engineer</h2>\n</body>"
          }
        }
      ]
    }
  ],
  quiz: {
    id: "web-quiz",
    courseId: "web-dev-basics",
    title: "Web Development Final Quiz",
    passingScore: 70,
    questions: [
      {
        id: "wq1",
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"],
        correctOptionIndex: 0,
        explanation: "HTML stands for HyperText Markup Language.",
        difficulty: "easy"
      },
      {
        id: "wq2",
        question: "Who is making the Web standards?",
        options: ["Mozilla", "Google", "The World Wide Web Consortium (W3C)", "Microsoft"],
        correctOptionIndex: 2,
        explanation: "The W3C is the main international standards organization for the World Wide Web.",
        difficulty: "medium"
      },
      {
        id: "wq3",
        question: "Choose the correct HTML element for the largest heading:",
        options: ["<h6>", "<head>", "<heading>", "<h1>"],
        correctOptionIndex: 3,
        explanation: "<h1> defines the most important (and visually largest by default) heading.",
        difficulty: "easy"
      },
      {
        id: "wq4",
        question: "Which of these tags are all <table> tags?",
        options: ["<table><head><tfoot>", "<table><tr><td>", "<thead><body><tr>", "<table><tr><tt>"],
        correctOptionIndex: 1,
        explanation: "<tr> stands for table row, and <td> stands for table data (cell).",
        difficulty: "medium"
      },
      {
        id: "wq5",
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Sheets"],
        correctOptionIndex: 1,
        explanation: "CSS stands for Cascading Style Sheets, used to style HTML elements.",
        difficulty: "easy"
      },
      {
        id: "wq6",
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        options: ["In the <body> section", "At the end of the document", "In the <head> section", "In a <css> tag"],
        correctOptionIndex: 2,
        explanation: "Metadata, including links to external CSS files, should be placed in the <head> section.",
        difficulty: "easy"
      },
      {
        id: "wq7",
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<script>", "<js>", "<javascript>", "<scripting>"],
        correctOptionIndex: 0,
        explanation: "The <script> tag is used to embed or reference executable code; typically JavaScript.",
        difficulty: "easy"
      },
      {
        id: "wq8",
        question: "Which CSS property controls the text size?",
        options: ["text-style", "font-style", "font-size", "text-size"],
        correctOptionIndex: 2,
        explanation: "The font-size property sets the size of the font.",
        difficulty: "easy"
      },
      {
        id: "wq9",
        question: "How do you select an element with id 'demo' in CSS?",
        options: [".demo", "#demo", "*demo", "demo"],
        correctOptionIndex: 1,
        explanation: "The hashtag `#` is used in CSS selectors to target an element by its ID.",
        difficulty: "easy"
      },
      {
        id: "wq10",
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        options: ["<script href=\"xxx.js\">", "<script src=\"xxx.js\">", "<script name=\"xxx.js\">", "<link src=\"xxx.js\">"],
        correctOptionIndex: 1,
        explanation: "The `src` attribute is used within a `<script>` tag to link external JavaScript files.",
        difficulty: "medium"
      }
    ]
  }
};
