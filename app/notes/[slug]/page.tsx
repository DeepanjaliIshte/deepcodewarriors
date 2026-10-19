import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, FileText } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Sample note content
const noteContent = {
  "java-basics": {
    title: "Java Basics Complete Guide",
    description: "Variables, data types, operators, and control structures",
    content: `
# Java Basics Complete Guide

## Table of Contents
1. Introduction to Java
2. Variables and Data Types
3. Operators
4. Control Structures
5. Methods
6. Arrays

## 1. Introduction to Java

Java is a high-level, object-oriented programming language that is designed to be platform-independent. It was developed by Sun Microsystems (now Oracle) and released in 1995.

### Key Features:
- **Platform Independent**: Write once, run anywhere (WORA)
- **Object-Oriented**: Everything is an object
- **Simple**: Easy to learn and use
- **Secure**: Built-in security features
- **Robust**: Strong memory management

## 2. Variables and Data Types

### Primitive Data Types

Java has 8 primitive data types:

#### Numeric Types:
- **byte**: 8-bit signed integer (-128 to 127)
- **short**: 16-bit signed integer (-32,768 to 32,767)
- **int**: 32-bit signed integer (-2^31 to 2^31-1)
- **long**: 64-bit signed integer (-2^63 to 2^63-1)
- **float**: 32-bit floating point
- **double**: 64-bit floating point

#### Other Types:
- **char**: 16-bit Unicode character
- **boolean**: true or false

### Variable Declaration

\`\`\`java
// Integer variables
int age = 25;
long population = 7800000000L;

// Floating point variables
float price = 19.99f;
double pi = 3.14159265359;

// Character and boolean
char grade = 'A';
boolean isActive = true;
\`\`\`

## 3. Operators

### Arithmetic Operators
- **+** Addition
- **-** Subtraction
- ***** Multiplication
- **/** Division
- **%** Modulus (remainder)

### Comparison Operators
- **==** Equal to
- **!=** Not equal to
- **>** Greater than
- **<** Less than
- **>=** Greater than or equal to
- **<=** Less than or equal to

### Logical Operators
- **&&** Logical AND
- **||** Logical OR
- **!** Logical NOT

### Example:
\`\`\`java
int a = 10, b = 5;
int sum = a + b;        // 15
boolean result = a > b; // true
boolean combined = (a > b) && (sum > 10); // true
\`\`\`

## 4. Control Structures

### If-Else Statement
\`\`\`java
if (condition) {
    // code to execute if condition is true
} else if (anotherCondition) {
    // code to execute if anotherCondition is true
} else {
    // code to execute if all conditions are false
}
\`\`\`

### Switch Statement
\`\`\`java
switch (variable) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // default code
}
\`\`\`

### Loops

#### For Loop
\`\`\`java
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
\`\`\`

#### While Loop
\`\`\`java
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;
}
\`\`\`

#### Do-While Loop
\`\`\`java
int i = 0;
do {
    System.out.println(i);
    i++;
} while (i < 10);
\`\`\`

## 5. Methods

Methods are blocks of code that perform specific tasks.

### Method Syntax:
\`\`\`java
accessModifier returnType methodName(parameters) {
    // method body
    return value; // if returnType is not void
}
\`\`\`

### Example:
\`\`\`java
public static int add(int a, int b) {
    return a + b;
}

public static void printMessage(String message) {
    System.out.println(message);
}
\`\`\`

## 6. Arrays

Arrays store multiple values of the same type.

### Array Declaration and Initialization:
\`\`\`java
// Declaration
int[] numbers;

// Initialization
numbers = new int[5]; // Array of 5 integers

// Declaration and initialization
int[] scores = {85, 92, 78, 96, 88};

// Using array elements
scores[0] = 90; // Set first element
int firstScore = scores[0]; // Get first element
\`\`\`

### Array Length:
\`\`\`java
int length = scores.length; // Get array length
\`\`\`

### Iterating through Arrays:
\`\`\`java
// Traditional for loop
for (int i = 0; i < scores.length; i++) {
    System.out.println(scores[i]);
}

// Enhanced for loop (for-each)
for (int score : scores) {
    System.out.println(score);
}
\`\`\`

## Summary

This guide covers the fundamental concepts of Java programming:
- Variables and data types for storing information
- Operators for performing calculations and comparisons
- Control structures for program flow control
- Methods for code organization and reusability
- Arrays for storing multiple values

These basics form the foundation for more advanced Java programming concepts.
    `,
  },
}

interface NotePageProps {
  params: {
    slug: string
  }
}

export default function NotePage({ params }: NotePageProps) {
  const note = noteContent[params.slug as keyof typeof noteContent]

  if (!note) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/notes">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Notes
          </Link>
        </Button>

        {/* Note Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl mb-4">{note.title}</CardTitle>
                <p className="text-lg text-muted-foreground">{note.description}</p>
              </div>
              <div className="flex gap-2">
                <Button>
                  <FileText className="mr-2 w-4 h-4" />
                  Print
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Note Content */}
        <Card>
          <CardContent className="prose prose-lg max-w-none p-8">
            <div
              className="text-foreground"
              dangerouslySetInnerHTML={{
                __html: note.content
                  .replace(/^# /gm, '<h1 class="text-3xl font-bold mb-6 text-foreground">')
                  .replace(/^## /gm, '<h2 class="text-2xl font-semibold mb-4 mt-8 text-foreground">')
                  .replace(/^### /gm, '<h3 class="text-xl font-semibold mb-3 mt-6 text-foreground">')
                  .replace(/^#### /gm, '<h4 class="text-lg font-semibold mb-2 mt-4 text-foreground">')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                  .replace(
                    /```(\w+)?\n([\s\S]*?)```/g,
                    '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm font-mono">$2</code></pre>',
                  )
                  .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>')
                  .replace(/^- (.*)/gm, '<li class="mb-1 text-foreground">$1</li>')
                  .replace(/(<li[\s\S]*<\/li>)/, '<ul class="list-disc list-inside mb-4 space-y-1">$1</ul>')
                  .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-foreground">')
                  .replace(/^(?!<[h|p|u|l|c|d])(.+)$/gm, '<p class="mb-4 leading-relaxed text-foreground">$1</p>'),
              }}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
