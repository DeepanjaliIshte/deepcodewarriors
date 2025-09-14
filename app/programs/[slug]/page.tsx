import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy, Download, Play } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Sample program content
const programContent = {
  "hello-world": {
    title: "Hello World Program",
    difficulty: "Easy",
    description: "Your first Java program that prints 'Hello, World!' to the console",
    code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    output: `Hello, World!`,
    explanation: `
This is the most basic Java program that demonstrates:

1. **Class Declaration**: Every Java program must have at least one class. Here we declare a class named 'HelloWorld'.

2. **Main Method**: The main method is the entry point of any Java program. It has the signature:
   - public: accessible from anywhere
   - static: can be called without creating an object
   - void: doesn't return any value
   - String[] args: command line arguments

3. **System.out.println()**: This method prints the text to the console and moves to the next line.

**Key Points:**
- Class name must match the filename (HelloWorld.java)
- Java is case-sensitive
- Every statement ends with a semicolon (;)
- Curly braces {} define code blocks
    `,
    tags: ["basics", "output"],
  },
  calculator: {
    title: "Simple Calculator",
    difficulty: "Easy",
    description: "A basic calculator that performs arithmetic operations",
    code: `import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();
        
        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();
        
        System.out.print("Enter operator (+, -, *, /): ");
        char operator = scanner.next().charAt(0);
        
        double result = 0;
        boolean validOperation = true;
        
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                } else {
                    System.out.println("Error: Division by zero!");
                    validOperation = false;
                }
                break;
            default:
                System.out.println("Error: Invalid operator!");
                validOperation = false;
        }
        
        if (validOperation) {
            System.out.println("Result: " + num1 + " " + operator + " " + num2 + " = " + result);
        }
        
        scanner.close();
    }
}`,
    output: `Enter first number: 10
Enter second number: 5
Enter operator (+, -, *, /): +
Result: 10.0 + 5.0 = 15.0`,
    explanation: `
This calculator program demonstrates several important Java concepts:

1. **Scanner Class**: Used to read input from the user
   - nextDouble(): reads a double value
   - next().charAt(0): reads the first character of input

2. **Switch Statement**: Efficient way to handle multiple conditions
   - Each case handles a different operator
   - break statements prevent fall-through
   - default case handles invalid input

3. **Error Handling**: 
   - Checks for division by zero
   - Validates operator input
   - Uses boolean flag to control output

4. **Data Types**: Uses double for decimal number support

**Key Learning Points:**
- Always close Scanner objects to prevent resource leaks
- Handle edge cases like division by zero
- Use meaningful variable names for better code readability
    `,
    tags: ["arithmetic", "input", "switch"],
  },
}

interface ProgramPageProps {
  params: {
    slug: string
  }
}

export default function ProgramPage({ params }: ProgramPageProps) {
  const program = programContent[params.slug as keyof typeof programContent]

  if (!program) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/programs">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Programs
          </Link>
        </Button>

        {/* Program Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl mb-4">{program.title}</CardTitle>
                <p className="text-lg text-muted-foreground mb-4">{program.description}</p>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      program.difficulty === "Easy"
                        ? "secondary"
                        : program.difficulty === "Medium"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {program.difficulty}
                  </Badge>
                  {program.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 w-4 h-4" />
                  Download
                </Button>
                <Button>
                  <Play className="mr-2 w-4 h-4" />
                  Run Online
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Source Code */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Source Code</CardTitle>
                <Button variant="outline" size="sm">
                  <Copy className="mr-2 w-4 h-4" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                <code>{program.code}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Output</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                <code>{program.output}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Explanation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-lg max-w-none text-foreground"
              dangerouslySetInnerHTML={{
                __html: program.explanation
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                  .replace(
                    /^(\d+\.\s\*\*.*?\*\*:)/gm,
                    '<h3 class="text-lg font-semibold mb-2 mt-4 text-foreground">$1</h3>',
                  )
                  .replace(
                    /^\*\*(.*?)\*\*:/gm,
                    '<h4 class="text-base font-semibold mb-2 mt-3 text-foreground">$1:</h4>',
                  )
                  .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-foreground">')
                  .replace(/^(?!<[h|p])(.+)$/gm, '<p class="mb-4 leading-relaxed text-foreground">$1</p>'),
              }}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
