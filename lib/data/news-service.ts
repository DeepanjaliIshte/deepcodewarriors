export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  author: string;
  publishedDate: string;
  readTime: string;
  category:
    | "AI & Developer Tools"
    | "Java & JVM"
    | "Python"
    | "Flutter & Mobile"
    | "Web Development"
    | "Open Source";
  tags: string[];
  externalUrl?: string;
  isFeatured?: boolean;
}

export const NEWS_CATEGORIES = [
  "All",
  "AI & Developer Tools",
  "Java & JVM",
  "Python",
  "Flutter & Mobile",
  "Web Development",
  "Open Source",
] as const;

export const SAMPLE_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "java-23-released",
    slug: "java-23-general-availability",
    title: "Java 23 Reaches General Availability: Markdown Comments, Vector API, and Generational ZGC",
    summary:
      "Oracle has officially released Java 23 (JDK 23), bringing 12 JEPs including markdown documentation comments, primitive types in patterns, module import declarations, and enhanced vector computation.",
    content: `Java 23 (Oracle JDK 23) has achieved General Availability, continuing the six-month cadence for Java feature releases.

Key Highlights of JDK 23:
- JEP 467: Markdown Documentation Comments, allowing Javadoc comments to be authored in Markdown rather than raw HTML.
- JEP 455: Primitive Types in Patterns, instanceof, and switch (Preview).
- JEP 476: Module Import Declarations, allowing developers to import entire modular ecosystems concisely.
- JEP 474: Generational ZGC is now the default mode for ZGC, drastically improving pause times for throughput-heavy applications.

Java developers in enterprise and cloud microservices can already test the early releases with Spring Boot 3.3 and Quarkus.`,
    source: "Oracle OpenJDK & InfoQ",
    author: "Java Platform Group",
    publishedDate: "September 17, 2024",
    readTime: "4 min read",
    category: "Java & JVM",
    tags: ["Java 23", "OpenJDK", "JVM", "ZGC", "Backend"],
    externalUrl: "https://openjdk.org/projects/jdk/23/",
    isFeatured: true,
  },
  {
    id: "python-3-13-free-threading",
    slug: "python-3-13-free-threaded-gil",
    title: "Python 3.13 Released with Experimental Free-Threaded Mode (No-GIL)",
    summary:
      "Python 3.13 introduces experimental free-threading, allowing threads to run concurrently without the Global Interpreter Lock (GIL), an interactive REPL upgrade, and an experimental JIT compiler.",
    content: `Python 3.13 is now officially available from the Python Software Foundation.

Headline Improvements:
- Experimental Free-Threaded Mode (PEP 703): Allows multiple threads to execute Python bytecode concurrently on multiple CPU cores without lock contention from the GIL.
- Upgraded Interactive REPL: Featuring multiline editing, colorized tracebacks, and interactive help based on PyPy's terminal improvements.
- Preliminary JIT Compiler (PEP 744): Groundwork for Tier 2 bytecode execution optimizing numerical and long-running routines.
- Improved Error Messages: More accurate syntax hints and type introspection.`,
    source: "Python Software Foundation",
    author: "Python Release Team",
    publishedDate: "October 7, 2024",
    readTime: "5 min read",
    category: "Python",
    tags: ["Python 3.13", "GIL", "Concurrency", "Performance"],
    externalUrl: "https://docs.python.org/3.13/whatsnew/3.13.html",
    isFeatured: true,
  },
  {
    id: "react-19-server-actions",
    slug: "react-19-stable-release",
    title: "React 19 Stable Release: Actions, useActionState, Server Functions, and Document Metadata",
    summary:
      "The React team publishes React 19 stable, delivering native async actions, enhanced hooks for form transitions, simplified ref properties, and asset preloading directly in components.",
    content: `React 19 is here. This landmark release standardizes async data handling with Actions, making optimistic updates and form states significantly easier to write.

Core Features:
- Actions: Automated transition handling for pending states, errors, and optimistic UI updates.
- useActionState and useFormStatus: First-class hooks for HTML form mutations.
- Ref as a Prop: Function components now accept ref directly without requiring forwardRef wrappers.
- Document Metadata: Native support for <title>, <meta>, and <link> tags anywhere in the component tree.`,
    source: "React Team & Vercel",
    author: "React Core",
    publishedDate: "December 5, 2024",
    readTime: "6 min read",
    category: "Web Development",
    tags: ["React 19", "JavaScript", "Frontend", "Next.js"],
    externalUrl: "https://react.dev/blog/2024/12/05/react-19",
  },
  {
    id: "flutter-3-27-impeller",
    slug: "flutter-3-27-cross-platform-impeller",
    title: "Flutter 3.27 Delivers Impeller Stability on Android and Multi-Window Desktop",
    summary:
      "Google's Flutter 3.27 brings Impeller rendering engine to full production default on modern Android devices, eliminating shader compilation jank, alongside enhanced Swift Package Manager integration on iOS.",
    content: `Flutter 3.27 has been released, focusing on graphics performance, ecosystem modernizations, and desktop fidelity.

What's New:
- Impeller on Android: Vulcan-based Impeller is now enabled by default across major Android devices, completely eliminating raster shader stutter.
- Multi-Window Desktop: Enhanced support for multi-window applications on macOS and Windows.
- Swift Package Manager: Gradual rollout as default package manager for iOS plugins.`,
    source: "Google Flutter Team",
    author: "Flutter Engineering",
    publishedDate: "December 11, 2024",
    readTime: "3 min read",
    category: "Flutter & Mobile",
    tags: ["Flutter", "Dart", "Mobile", "Impeller", "Android", "iOS"],
    externalUrl: "https://medium.com/flutter",
  },
  {
    id: "claude-3-7-sonnet-hybrid-reasoning",
    slug: "claude-3-7-sonnet-hybrid-reasoning",
    title: "Anthropic Releases Claude 3.7 Sonnet: Hybrid Reasoning and Extended Thinking for Code Generation",
    summary:
      "Anthropic introduces Claude 3.7 Sonnet, the first hybrid AI model combining instantaneous responses with configurable extended thinking tokens for complex multi-file engineering problems.",
    content: `Anthropic has launched Claude 3.7 Sonnet, introducing unified fast-response and deep reasoning modes into a single model architecture.

Highlights for Developers:
- Dynamically adjustable reasoning budget from 0 to 64k tokens.
- Exceptional scores on SWE-bench Verified for autonomous bug fixes in large real-world repositories.
- Integrated full terminal tool execution in the new Claude Code CLI workflow.`,
    source: "Anthropic Research",
    author: "Anthropic AI",
    publishedDate: "February 24, 2025",
    readTime: "4 min read",
    category: "AI & Developer Tools",
    tags: ["AI", "Claude", "LLMs", "DevTools", "Coding Agents"],
    externalUrl: "https://www.anthropic.com/news/claude-3-7-sonnet",
  },
  {
    id: "tailwind-v4-lightning-css",
    slug: "tailwind-css-v4-engine",
    title: "Tailwind CSS v4.0 Released: Powered by Rust, 10x Faster Builds, and Zero-Config Engine",
    summary:
      "Tailwind CSS v4 introduces a completely redesigned engine written from scratch in Rust, native CSS variables, container queries, and seamless modern CSS imports without tailwind.config.js.",
    content: `Tailwind CSS v4.0 is now generally available. Built on top of LightningCSS, it is up to 10x faster and requires no external configuration file by default.

Key Features:
- CSS-First Configuration using standard @theme directives.
- Automatic content detection without glob path arrays.
- Full 3D transforms, color-mix utilities, and modern CSS color spaces including OKLCH.`,
    source: "Tailwind Labs",
    author: "Adam Wathan",
    publishedDate: "January 23, 2025",
    readTime: "4 min read",
    category: "Web Development",
    tags: ["TailwindCSS", "CSS", "Frontend", "Rust"],
    externalUrl: "https://tailwindcss.com/blog/tailwindcss-v4",
  },
  {
    id: "github-copilot-workspace-agent",
    slug: "github-copilot-workspace-evolution",
    title: "GitHub Expands Copilot Multi-Model Support with Anthropic Claude and Google Gemini",
    summary:
      "GitHub announced multi-model choice for Copilot Chat and Copilot Workspace, enabling developers to switch between Anthropic Claude 3.5/3.7, OpenAI GPT-4o, and Google Gemini 1.5 Pro.",
    content: `GitHub has unlocked multi-model flexibility for GitHub Copilot in Visual Studio Code and GitHub.com. Developers can now choose the AI model best suited for their specific language, project scale, and algorithmic task.`,
    source: "GitHub Blog",
    author: "GitHub Product Team",
    publishedDate: "October 29, 2024",
    readTime: "3 min read",
    category: "AI & Developer Tools",
    tags: ["GitHub", "Copilot", "AI", "DevTools"],
    externalUrl: "https://github.blog",
  },
];

export async function getNewsArticles(category?: string, query?: string): Promise<NewsArticle[]> {
  // If an external news provider (e.g. NewsAPI / Dev.to) is configured via NEWS_API_KEY
  const apiKey = process.env.NEWS_API_KEY;
  if (apiKey) {
    try {
      // Future remote API integration hook
    } catch (e) {
      console.error("External news provider fetch failed:", e);
    }
  }

  let articles = [...SAMPLE_NEWS_ARTICLES];

  if (category && category !== "All") {
    articles = articles.filter((a) => a.category === category);
  }

  if (query && query.trim().length > 0) {
    const q = query.toLowerCase();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return articles;
}
