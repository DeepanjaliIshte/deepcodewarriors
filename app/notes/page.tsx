import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText, ExternalLink, Eye } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

const noteCategories = [
  {
    title: "Core Java Notes",
    description: "Comprehensive notes covering fundamental Java concepts",
    resources: [
      {
        title: "Java Basics Complete Guide",
        description: "Variables, data types, operators, and control structures",
        type: "PDF",
        size: "2.5 MB",
        pages: 45,
        downloadUrl: "#",
        previewUrl: "/notes/java-basics",
      },
      {
        title: "Object-Oriented Programming in Java",
        description: "Classes, objects, inheritance, polymorphism, and encapsulation",
        type: "PDF",
        size: "3.2 MB",
        pages: 62,
        downloadUrl: "#",
        previewUrl: "/notes/oop-java",
      },
      {
        title: "Exception Handling Guide",
        description: "Try-catch blocks, custom exceptions, and best practices",
        type: "PDF",
        size: "1.8 MB",
        pages: 28,
        downloadUrl: "#",
        previewUrl: "/notes/exception-handling",
      },
      {
        title: "Java Collections Framework",
        description: "List, Set, Map interfaces and their implementations",
        type: "PDF",
        size: "4.1 MB",
        pages: 78,
        downloadUrl: "#",
        previewUrl: "/notes/collections",
      },
    ],
  },
  {
    title: "Advanced Java",
    description: "Advanced topics and enterprise Java development",
    resources: [
      {
        title: "Multithreading and Concurrency",
        description: "Thread creation, synchronization, and concurrent programming",
        type: "PDF",
        size: "3.5 MB",
        pages: 56,
        downloadUrl: "#",
        previewUrl: "/notes/multithreading",
      },
      {
        title: "JDBC and Database Programming",
        description: "Database connectivity, prepared statements, and transactions",
        type: "PDF",
        size: "2.9 MB",
        pages: 42,
        downloadUrl: "#",
        previewUrl: "/notes/jdbc",
      },
      {
        title: "Java Servlets and JSP",
        description: "Web development with Java servlets and JavaServer Pages",
        type: "PDF",
        size: "4.8 MB",
        pages: 89,
        downloadUrl: "#",
        previewUrl: "/notes/servlets-jsp",
      },
      {
        title: "Spring Framework Basics",
        description: "Introduction to Spring IoC, DI, and MVC architecture",
        type: "PDF",
        size: "5.2 MB",
        pages: 95,
        downloadUrl: "#",
        previewUrl: "/notes/spring-basics",
      },
    ],
  },
  {
    title: "Quick Reference",
    description: "Handy reference materials and cheat sheets",
    resources: [
      {
        title: "Java Syntax Cheat Sheet",
        description: "Quick reference for Java syntax and common patterns",
        type: "PDF",
        size: "0.8 MB",
        pages: 12,
        downloadUrl: "#",
        previewUrl: "/notes/syntax-cheat-sheet",
      },
      {
        title: "Java API Reference",
        description: "Commonly used classes and methods from Java API",
        type: "PDF",
        size: "1.5 MB",
        pages: 24,
        downloadUrl: "#",
        previewUrl: "/notes/api-reference",
      },
      {
        title: "Design Patterns in Java",
        description: "Implementation of common design patterns with examples",
        type: "PDF",
        size: "3.8 MB",
        pages: 67,
        downloadUrl: "#",
        previewUrl: "/notes/design-patterns",
      },
    ],
  },
]

const externalResources = [
  {
    title: "Oracle Java Documentation",
    description: "Official Java documentation and API reference",
    url: "https://docs.oracle.com/javase/",
    type: "External Link",
  },
  {
    title: "Java Code Geeks",
    description: "Java tutorials, examples, and best practices",
    url: "https://www.javacodegeeks.com/",
    type: "External Link",
  },
  {
    title: "Baeldung Java Tutorials",
    description: "In-depth Java tutorials and guides",
    url: "https://www.baeldung.com/",
    type: "External Link",
  },
  {
    title: "GitHub Java Projects",
    description: "Open source Java projects for learning",
    url: "https://github.com/topics/java",
    type: "External Link",
  },
]

export default function NotesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-6">
              Java <span className="text-primary">Notes & Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Comprehensive study materials, reference guides, and external resources for Java learning
            </p>
          </div>
        </div>
      </section>

      {/* Notes Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {noteCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
                <p className="text-lg text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.resources.map((resource, resourceIndex) => (
                  <Card key={resourceIndex} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {resource.description}
                          </CardDescription>
                        </div>
                        <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <Badge variant="outline">{resource.type}</Badge>
                        <span className="text-sm text-muted-foreground">{resource.size}</span>
                        <span className="text-sm text-muted-foreground">{resource.pages} pages</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <Link href={resource.downloadUrl}>
                            <Download className="mr-2 w-4 h-4" />
                            Download
                          </Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link href={resource.previewUrl}>
                            <Eye className="mr-2 w-4 h-4" />
                            Preview
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* External Resources */}
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">External Resources</h2>
              <p className="text-lg text-muted-foreground">Helpful external links and references</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {externalResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">{resource.description}</CardDescription>
                      </div>
                      <ExternalLink className="w-6 h-6 text-primary flex-shrink-0" />
                    </div>
                    <Badge variant="secondary" className="w-fit mt-4">
                      {resource.type}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 w-4 h-4" />
                        Visit Resource
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
