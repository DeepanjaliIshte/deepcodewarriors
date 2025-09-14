"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState } from "react"

// Sample interview questions data
const interviewData = {
  "core-java": {
    title: "Core Java Interview Questions",
    description: "Fundamental Java concepts frequently asked in interviews",
    questions: [
      {
        id: 1,
        question: "What is Java and what are its main features?",
        difficulty: "Beginner",
        category: "Basics",
        answer: `Java is a high-level, object-oriented programming language developed by Sun Microsystems (now Oracle) in 1995.

**Main Features of Java:**

1. **Platform Independent**: Java code is compiled into bytecode that runs on the Java Virtual Machine (JVM), making it platform-independent.

2. **Object-Oriented**: Java follows OOP principles including encapsulation, inheritance, polymorphism, and abstraction.

3. **Simple**: Java syntax is similar to C++ but removes complex features like pointers and multiple inheritance.

4. **Secure**: Java has built-in security features and runs in a secure runtime environment.

5. **Robust**: Strong memory management, exception handling, and type checking make Java programs reliable.

6. **Multithreaded**: Java supports concurrent programming through built-in threading capabilities.

7. **Architecture Neutral**: Java bytecode is not tied to any particular hardware or software platform.

8. **Portable**: Java programs can run on any platform that has a JVM installed.`,
      },
      {
        id: 2,
        question: "Explain the difference between JDK, JRE, and JVM.",
        difficulty: "Beginner",
        category: "Basics",
        answer: `**JVM (Java Virtual Machine):**
- Runtime environment that executes Java bytecode
- Provides platform independence by abstracting the underlying operating system
- Handles memory management and garbage collection

**JRE (Java Runtime Environment):**
- Includes JVM + standard Java libraries and APIs
- Required to run Java applications
- Does not include development tools like compiler

**JDK (Java Development Kit):**
- Includes JRE + development tools (javac compiler, debugger, etc.)
- Required to develop Java applications
- Contains everything needed to compile, debug, and run Java programs

**Relationship:**
JDK ⊃ JRE ⊃ JVM

For development, you need JDK. For running Java applications, JRE is sufficient.`,
      },
      {
        id: 3,
        question: "What are the different types of variables in Java?",
        difficulty: "Beginner",
        category: "Variables",
        answer: `Java has three types of variables based on their scope and lifetime:

**1. Instance Variables (Non-static variables):**
- Declared inside a class but outside any method
- Each object has its own copy
- Initialized with default values if not explicitly initialized
- Accessible throughout the class

\`\`\`java
class Student {
    String name; // Instance variable
    int age;     // Instance variable
}
\`\`\`

**2. Class Variables (Static variables):**
- Declared with static keyword
- Shared among all instances of the class
- Only one copy exists regardless of how many objects are created
- Initialized when class is first loaded

\`\`\`java
class Student {
    static String school = "ABC School"; // Class variable
}
\`\`\`

**3. Local Variables:**
- Declared inside methods, constructors, or blocks
- Must be initialized before use
- Scope is limited to the block where they are declared
- No default values

\`\`\`java
public void method() {
    int count = 0; // Local variable
}
\`\`\``,
      },
    ],
  },
}

interface InterviewPrepDetailPageProps {
  params: {
    slug: string
  }
}

function QuestionCard({ question, index }: { question: any; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">Q{index + 1}</Badge>
              <Badge variant={question.difficulty === "Beginner" ? "secondary" : "default"}>
                {question.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {question.category}
              </Badge>
            </div>
            <CardTitle className="text-lg leading-relaxed">{question.question}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent>
          <div className="border-t pt-4">
            <div
              className="prose prose-sm max-w-none text-foreground"
              dangerouslySetInnerHTML={{
                __html: question.answer
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                  .replace(
                    /```(\w+)?\n([\s\S]*?)```/g,
                    '<pre class="bg-muted p-3 rounded-lg overflow-x-auto my-3"><code class="text-sm font-mono">$2</code></pre>',
                  )
                  .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>')
                  .replace(/^- (.*)/gm, '<li class="mb-1 text-foreground">$1</li>')
                  .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside mb-3 space-y-1">$1</ul>')
                  .replace(/\n\n/g, '</p><p class="mb-3 leading-relaxed text-foreground">')
                  .replace(/^(?!<[h|p|u|l|c|d])(.+)$/gm, '<p class="mb-3 leading-relaxed text-foreground">$1</p>'),
              }}
            />
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default function InterviewPrepDetailPage({ params }: InterviewPrepDetailPageProps) {
  const data = interviewData[params.slug as keyof typeof interviewData]

  if (!data) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/interview-prep">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Interview Prep
          </Link>
        </Button>

        {/* Header */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">{data.title}</CardTitle>
            <p className="text-lg text-muted-foreground">{data.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <Badge variant="outline">{data.questions.length} Questions</Badge>
              <Badge variant="secondary">Practice Mode</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Questions */}
        <div className="space-y-4">
          {data.questions.map((question, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline">Load More Questions</Button>
        </div>
      </div>
    </main>
  )
}
