import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

const tutorialCategories = [
  {
    title: "Web Development",
    description: "Start your journey in building modern web applications",
    tutorials: [
      {
        title: "Introduction to HTML & CSS",
        description: "Learn the foundational building blocks of the web",
        duration: "15 min",
        level: "Beginner",
        slug: "introduction-to-html-css",
      },
      {
        title: "JavaScript Fundamentals",
        description: "Variables, functions, and DOM manipulation",
        duration: "20 min",
        level: "Beginner",
        slug: "javascript-fundamentals",
      },
      {
        title: "React Basics",
        description: "Components, state, and props in React",
        duration: "25 min",
        level: "Beginner",
        slug: "react-basics",
      },
    ],
  },
  {
    title: "Software Engineering Core",
    description: "Master foundational programming and systems concepts",
    tutorials: [
      {
        title: "Object-Oriented Programming",
        description: "Classes, inheritance, and polymorphism in Python and Java",
        duration: "35 min",
        level: "Intermediate",
        slug: "oop-concepts",
      },
      {
        title: "Database Design",
        description: "SQL, normalization, and relational models",
        duration: "40 min",
        level: "Intermediate",
        slug: "database-design",
      },
      {
        title: "System Architecture",
        description: "Monoliths vs microservices, APIs, and networking",
        duration: "45 min",
        level: "Intermediate",
        slug: "system-architecture",
      },
    ],
  },
  {
    title: "Advanced Topics",
    description: "Dive into advanced frameworks and scaling",
    tutorials: [
      {
        title: "Next.js App Router",
        description: "Server components, routing, and data fetching",
        duration: "60 min",
        level: "Advanced",
        slug: "nextjs-app-router",
      },
      {
        title: "Docker & Containerization",
        description: "Building images, Docker compose, and orchestration",
        duration: "45 min",
        level: "Advanced",
        slug: "docker-basics",
      },
      {
        title: "System Design for Interviews",
        description: "Load balancers, caching, and database scaling",
        duration: "70 min",
        level: "Advanced",
        slug: "system-design-interviews",
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
              Coding <span className="text-primary">Tutorials</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Comprehensive step-by-step tutorials to master software engineering from basics to advanced concepts
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
