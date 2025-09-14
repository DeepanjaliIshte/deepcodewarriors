import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

const tutorialCategories = [
  {
    title: "Java Basics",
    description: "Start your Java journey with fundamental concepts",
    tutorials: [
      {
        title: "Introduction to Java",
        description: "History, features, and why choose Java",
        duration: "15 min",
        level: "Beginner",
        slug: "introduction-to-java",
      },
      {
        title: "Setting up Java Environment",
        description: "Install JDK, IDE setup, and first program",
        duration: "20 min",
        level: "Beginner",
        slug: "java-environment-setup",
      },
      {
        title: "Java Syntax and Structure",
        description: "Basic syntax, keywords, and program structure",
        duration: "25 min",
        level: "Beginner",
        slug: "java-syntax-structure",
      },
      {
        title: "Variables and Data Types",
        description: "Primitive types, variables, and type conversion",
        duration: "30 min",
        level: "Beginner",
        slug: "variables-data-types",
      },
    ],
  },
  {
    title: "Object-Oriented Programming",
    description: "Master OOP concepts in Java",
    tutorials: [
      {
        title: "Classes and Objects",
        description: "Creating classes, objects, and understanding instances",
        duration: "35 min",
        level: "Intermediate",
        slug: "classes-objects",
      },
      {
        title: "Inheritance",
        description: "Extending classes and method overriding",
        duration: "40 min",
        level: "Intermediate",
        slug: "inheritance",
      },
      {
        title: "Polymorphism",
        description: "Method overloading and runtime polymorphism",
        duration: "45 min",
        level: "Intermediate",
        slug: "polymorphism",
      },
      {
        title: "Encapsulation and Abstraction",
        description: "Data hiding and abstract classes/interfaces",
        duration: "50 min",
        level: "Intermediate",
        slug: "encapsulation-abstraction",
      },
    ],
  },
  {
    title: "Advanced Java",
    description: "Dive into advanced Java concepts and frameworks",
    tutorials: [
      {
        title: "Collections Framework",
        description: "List, Set, Map, and their implementations",
        duration: "60 min",
        level: "Advanced",
        slug: "collections-framework",
      },
      {
        title: "Exception Handling",
        description: "Try-catch, custom exceptions, and best practices",
        duration: "45 min",
        level: "Advanced",
        slug: "exception-handling",
      },
      {
        title: "Multithreading",
        description: "Thread creation, synchronization, and concurrency",
        duration: "70 min",
        level: "Advanced",
        slug: "multithreading",
      },
      {
        title: "JDBC and Database Connectivity",
        description: "Connecting to databases and executing queries",
        duration: "55 min",
        level: "Advanced",
        slug: "jdbc-database",
      },
    ],
  },
]

export default function TutorialsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-6">
              Java <span className="text-primary">Tutorials</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Comprehensive step-by-step tutorials to master Java programming from basics to advanced concepts
            </p>
          </div>
        </div>
      </section>

      {/* Tutorial Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tutorialCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
                <p className="text-lg text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.tutorials.map((tutorial, tutorialIndex) => (
                  <Card key={tutorialIndex} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{tutorial.title}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {tutorial.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {tutorial.duration}
                        </div>
                        <Badge
                          variant={
                            tutorial.level === "Beginner"
                              ? "secondary"
                              : tutorial.level === "Intermediate"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {tutorial.level}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link href={`/tutorials/${tutorial.slug}`}>
                          <BookOpen className="mr-2 w-4 h-4" />
                          Start Tutorial
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
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
