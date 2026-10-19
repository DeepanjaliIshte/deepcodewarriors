import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, Users, Clock, Target } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

const interviewCategories = [
  {
    title: "Core Java Questions",
    description: "Fundamental Java concepts frequently asked in interviews",
    icon: Target,
    questionCount: 50,
    difficulty: "Beginner to Intermediate",
    topics: ["OOP Concepts", "Data Types", "Exception Handling", "Collections"],
    slug: "core-java",
  },
  {
    title: "Advanced Java Topics",
    description: "Complex Java topics for senior developer positions",
    icon: Users,
    questionCount: 35,
    difficulty: "Intermediate to Advanced",
    topics: ["Multithreading", "JVM Internals", "Design Patterns", "Performance"],
    slug: "advanced-java",
  },
  {
    title: "Framework Questions",
    description: "Spring, Hibernate, and other popular Java frameworks",
    icon: Clock,
    questionCount: 40,
    difficulty: "Intermediate to Advanced",
    topics: ["Spring Boot", "Hibernate", "REST APIs", "Microservices"],
    slug: "frameworks",
  },
  {
    title: "Coding Challenges",
    description: "Programming problems commonly asked in technical interviews",
    icon: Target,
    questionCount: 30,
    difficulty: "All Levels",
    topics: ["Algorithms", "Data Structures", "Problem Solving", "Optimization"],
    slug: "coding-challenges",
  },
]

const quickStats = [
  { label: "Total Questions", value: "200+" },
  { label: "Topics Covered", value: "25+" },
  { label: "Difficulty Levels", value: "3" },
  { label: "Success Rate", value: "95%" },
]

export default function InterviewPrepPage() {
  return (
    <main className="min-h-screen bg-[#060913] text-foreground flex flex-col selection:bg-orange-500/30 selection:text-orange-200">
      <Navigation />

      {/* Header */}
      <section className="py-16 relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-blue-950/20 via-slate-950/40 to-[#060913]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wider uppercase mb-4">
              FAANG & High-Growth Tech Interview Hub
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Technical <span className="text-orange-500">Interview Preparation</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Master the core data structures, system design fundamentals, concurrency, and OOP interview problems
              asked by premier engineering employers.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {quickStats.map((stat, index) => (
                <div key={index} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center backdrop-blur-md">
                  <div className="text-2xl font-bold text-orange-400">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interview Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {interviewCategories.map((category, index) => (
              <Card key={index} className="hover:border-cyan-500/40 transition-all border-slate-800/80 bg-slate-900/50 backdrop-blur-sm overflow-hidden flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{category.description}</CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <Badge variant="outline">{category.questionCount} Questions</Badge>
                    <Badge variant="secondary">{category.difficulty}</Badge>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Topics covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={`/interview-prep/${category.slug}`}>
                      Start Practice
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Interview Success Tips</h2>
            <p className="text-lg text-muted-foreground">Essential strategies to excel in Java technical interviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Understand the Basics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Master fundamental concepts like OOP principles, data types, and basic syntax. These form the
                  foundation for more complex questions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Practice Coding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Write code regularly and practice solving problems on paper or whiteboard. Focus on clean, readable
                  code with proper error handling.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Think Out Loud</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explain your thought process while solving problems. Interviewers want to understand how you approach
                  and break down complex problems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
