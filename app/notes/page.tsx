import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, Eye, Play } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

const noteCategories = [
  {
    title: "Data Structures & Algorithms",
    description: "Comprehensive notes covering fundamental DSA concepts",
    resources: [
      {
        title: "Arrays & Linked Lists Complete Guide",
        description: "Memory allocation, traversal, and common operations",
        type: "Web Guide",
        previewUrl: "/notes/arrays-linked-lists",
      },
      {
        title: "Trees and Graphs",
        description: "BST, AVL, Traversal algorithms, and shortest paths",
        type: "Web Guide",
        previewUrl: "/notes/trees-graphs",
      },
      {
        title: "Dynamic Programming Guide",
        description: "Memoization, tabulation, and state transitions",
        type: "Web Guide",
        previewUrl: "/notes/dynamic-programming",
      },
      {
        title: "Sorting and Searching",
        description: "Quick sort, merge sort, binary search and their complexities",
        type: "Web Guide",
        previewUrl: "/notes/sorting-searching",
      },
    ],
  },
  {
    title: "Web Development",
    description: "Modern frontend and backend development notes",
    resources: [
      {
        title: "React & Next.js Ecosystem",
        description: "Hooks, Server Components, Routing, and State Management",
        type: "Web Guide",
        previewUrl: "/notes/react-nextjs",
      },
      {
        title: "Node.js and Express",
        description: "REST APIs, Middleware, and asynchronous programming",
        type: "Web Guide",
        previewUrl: "/notes/nodejs-express",
      },
      {
        title: "CSS Architecture",
        description: "Tailwind, CSS Modules, and responsive design patterns",
        type: "Web Guide",
        previewUrl: "/notes/css-architecture",
      },
      {
        title: "Database Management Systems",
        description: "SQL vs NoSQL, indexing, normalization, and ACID properties",
        type: "Web Guide",
        previewUrl: "/notes/dbms",
      },
    ],
  },
  {
    title: "Quick Reference",
    description: "Handy reference materials and cheat sheets",
    resources: [
      {
        title: "Git & GitHub Cheat Sheet",
        description: "Quick reference for branching, merging, and collaboration",
        type: "Web Guide",
        previewUrl: "/notes/git-cheat-sheet",
      },
      {
        title: "Linux Command Line",
        description: "Commonly used bash commands and shell scripting basics",
        type: "Web Guide",
        previewUrl: "/notes/linux-commands",
      },
      {
        title: "System Design Basics",
        description: "Load balancing, caching, microservices, and scalability",
        type: "Web Guide",
        previewUrl: "/notes/system-design",
      },
    ],
  },
]

const externalResources = [
  {
    title: "MDN Web Docs",
    description: "The most comprehensive resource for web developers",
    url: "https://developer.mozilla.org/",
    type: "External Link",
  },
  {
    title: "LeetCode Patterns",
    description: "Categorized algorithmic patterns for interview prep",
    url: "https://leetcode.com/",
    type: "External Link",
  },
  {
    title: "System Design Primer",
    description: "Learn how to design large-scale systems",
    url: "https://github.com/donnemartin/system-design-primer",
    type: "External Link",
  },
  {
    title: "roadmap.sh",
    description: "Step by step guides and paths to learn different tools",
    url: "https://roadmap.sh/",
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
              Developer <span className="text-primary">Notes & Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Comprehensive study materials, reference guides, and external resources for mastering software engineering
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
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <Link href={resource.previewUrl}>
                            <Eye className="mr-2 w-4 h-4" />
                            Read Online
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

