import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Play } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

const programCategories = [
  {
    title: "Basic Programs",
    description: "Simple programs to get started with Java",
    programs: [
      {
        title: "Hello World",
        description: "Your first Java program",
        difficulty: "Easy",
        slug: "hello-world",
        tags: ["basics", "output"],
      },
      {
        title: "Calculator",
        description: "Simple arithmetic operations",
        difficulty: "Easy",
        slug: "calculator",
        tags: ["arithmetic", "input"],
      },
      {
        title: "Factorial",
        description: "Calculate factorial using recursion",
        difficulty: "Medium",
        slug: "factorial",
        tags: ["recursion", "math"],
      },
      {
        title: "Fibonacci Series",
        description: "Generate Fibonacci sequence",
        difficulty: "Medium",
        slug: "fibonacci",
        tags: ["loops", "series"],
      },
    ],
  },
  {
    title: "Object-Oriented Programs",
    description: "Programs demonstrating OOP concepts",
    programs: [
      {
        title: "Student Management",
        description: "Class and object implementation",
        difficulty: "Medium",
        slug: "student-management",
        tags: ["classes", "objects"],
      },
      {
        title: "Bank Account System",
        description: "Encapsulation and data hiding",
        difficulty: "Medium",
        slug: "bank-account",
        tags: ["encapsulation", "methods"],
      },
      {
        title: "Shape Inheritance",
        description: "Inheritance and method overriding",
        difficulty: "Hard",
        slug: "shape-inheritance",
        tags: ["inheritance", "polymorphism"],
      },
      {
        title: "Animal Interface",
        description: "Interface implementation",
        difficulty: "Hard",
        slug: "animal-interface",
        tags: ["interface", "abstraction"],
      },
    ],
  },
  {
    title: "Data Structures",
    description: "Implementation of common data structures",
    programs: [
      {
        title: "Array Operations",
        description: "Array manipulation and searching",
        difficulty: "Medium",
        slug: "array-operations",
        tags: ["arrays", "searching"],
      },
      {
        title: "Linked List",
        description: "Custom linked list implementation",
        difficulty: "Hard",
        slug: "linked-list",
        tags: ["linked-list", "pointers"],
      },
      {
        title: "Stack Implementation",
        description: "Stack using arrays and linked list",
        difficulty: "Hard",
        slug: "stack-implementation",
        tags: ["stack", "data-structure"],
      },
      {
        title: "Binary Tree",
        description: "Binary tree operations",
        difficulty: "Hard",
        slug: "binary-tree",
        tags: ["tree", "recursion"],
      },
    ],
  },
]

export default function ProgramsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-6">
              Java <span className="text-primary">Programs</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Practical Java programs with detailed explanations, source code, and output examples
            </p>
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {programCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
                <p className="text-lg text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.programs.map((program, programIndex) => (
                  <Card key={programIndex} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">{program.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
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
                        {program.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <Link href={`/programs/${program.slug}`}>
                            <Code className="mr-2 w-4 h-4" />
                            View Code
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
