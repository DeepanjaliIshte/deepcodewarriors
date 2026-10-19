import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Download } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Sample tutorial content - in a real app, this would come from a CMS or database
const tutorialContent = {
  "introduction-to-java": {
    title: "Introduction to Java",
    level: "Beginner",
    duration: "15 min",
    content: `
# Introduction to Java

## What is Java?

Java is a high-level, object-oriented programming language developed by Sun Microsystems (now owned by Oracle) in 1995. It was designed to be platform-independent, secure, and easy to use.

## Key Features of Java

### 1. Platform Independence
- **Write Once, Run Anywhere (WORA)**: Java code is compiled into bytecode that can run on any platform with a Java Virtual Machine (JVM).
- This makes Java applications highly portable across different operating systems.

### 2. Object-Oriented Programming
- Java follows OOP principles: Encapsulation, Inheritance, Polymorphism, and Abstraction.
- Everything in Java is an object (except primitive data types).

### 3. Simple and Easy to Learn
- Java syntax is similar to C++ but removes complex features like pointers and multiple inheritance.
- Automatic memory management through garbage collection.

### 4. Robust and Secure
- Strong memory management and exception handling.
- Built-in security features to prevent malicious code execution.

## Java Architecture

### JVM (Java Virtual Machine)
- Runtime environment that executes Java bytecode
- Provides platform independence

### JRE (Java Runtime Environment)
- Includes JVM + libraries needed to run Java applications
- Required to run Java programs

### JDK (Java Development Kit)
- Includes JRE + development tools (compiler, debugger, etc.)
- Required to develop Java applications

## Why Choose Java?

1. **Large Community**: Extensive community support and resources
2. **Enterprise Applications**: Widely used in enterprise software development
3. **Rich API**: Comprehensive standard library
4. **Performance**: Good performance with JIT compilation
5. **Career Opportunities**: High demand in the job market

## Next Steps

Now that you understand what Java is, let's move on to setting up your development environment in the next tutorial.
    `,
  },
  "java-environment-setup": {
    title: "Setting up Java Environment",
    level: "Beginner",
    duration: "20 min",
    content: `
# Setting up Java Development Environment

## Step 1: Install Java Development Kit (JDK)

### Download JDK
1. Visit [Oracle's official website](https://www.oracle.com/java/technologies/downloads/)
2. Download the latest JDK version for your operating system
3. Choose the appropriate installer (Windows .exe, macOS .dmg, Linux .tar.gz)

### Installation Process
- **Windows**: Run the .exe file and follow the installation wizard
- **macOS**: Open the .dmg file and follow the instructions
- **Linux**: Extract the tar.gz file and set up environment variables

## Step 2: Set Environment Variables

### Windows
1. Right-click "This PC" → Properties → Advanced System Settings
2. Click "Environment Variables"
3. Add JAVA_HOME pointing to JDK installation directory
4. Add JDK bin directory to PATH variable

### macOS/Linux
Add these lines to your ~/.bashrc or ~/.zshrc:
\`\`\`bash
export JAVA_HOME=/path/to/jdk
export PATH=$JAVA_HOME/bin:$PATH
\`\`\`

## Step 3: Verify Installation

Open terminal/command prompt and run:
\`\`\`bash
java -version
javac -version
\`\`\`

You should see version information for both commands.

## Step 4: Choose an IDE

### Popular Java IDEs:
1. **IntelliJ IDEA** (Recommended)
   - Excellent code completion and debugging
   - Free Community Edition available

2. **Eclipse**
   - Free and open-source
   - Large plugin ecosystem

3. **Visual Studio Code**
   - Lightweight with Java extensions
   - Good for beginners

## Step 5: Write Your First Java Program

Create a file named \`HelloWorld.java\`:

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

### Compile and Run:
\`\`\`bash
javac HelloWorld.java
java HelloWorld
\`\`\`

Output: \`Hello, World!\`

## Troubleshooting Common Issues

1. **"java is not recognized"**: Check PATH variable
2. **"Could not find or load main class"**: Check class name and file name match
3. **Permission denied**: Check file permissions on Linux/macOS

Congratulations! You've successfully set up your Java development environment.
    `,
  },
}

interface TutorialPageProps {
  params: {
    slug: string
  }
}

export default function TutorialPage({ params }: TutorialPageProps) {
  const tutorial = tutorialContent[params.slug as keyof typeof tutorialContent]

  if (!tutorial) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/tutorials">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Tutorials
          </Link>
        </Button>

        {/* Tutorial Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl mb-4">{tutorial.title}</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {tutorial.duration}
                  </div>
                  <Badge variant={tutorial.level === "Beginner" ? "secondary" : "default"}>{tutorial.level}</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tutorial Content */}
        <Card>
          <CardContent className="prose prose-lg max-w-none p-8">
            <div
              className="text-foreground"
              dangerouslySetInnerHTML={{
                __html: tutorial.content
                  .replace(/^# /gm, '<h1 class="text-3xl font-bold mb-6 text-foreground">')
                  .replace(/^## /gm, '<h2 class="text-2xl font-semibold mb-4 mt-8 text-foreground">')
                  .replace(/^### /gm, '<h3 class="text-xl font-semibold mb-3 mt-6 text-foreground">')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                  .replace(
                    /```(\w+)?\n([\s\S]*?)```/g,
                    '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm font-mono">$2</code></pre>',
                  )
                  .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>')
                  .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-foreground">')
                  .replace(/^(?!<[h|p|u|o|c|d])(.+)$/gm, '<p class="mb-4 leading-relaxed text-foreground">$1</p>'),
              }}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
