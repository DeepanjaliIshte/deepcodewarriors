import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getCourses } from "@/lib/data/course-service"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <main className="min-h-screen bg-[#060913] text-foreground flex flex-col selection:bg-orange-500/30 selection:text-orange-200">
      <Navigation />

      <section className="py-16 relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-blue-950/20 via-slate-950/40 to-[#060913]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wider uppercase mb-4">
              Comprehensive Developer Curricula
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Explore Our <span className="text-orange-500">Courses</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Step-by-step masteries designed for ambitious engineers. Deep theory, interactive quizzes, and coding challenges.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={course.level === "Beginner" ? "secondary" : "default"}>
                      {course.level}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      {course.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-base">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-6 border-t border-border/50">
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {course.topics.length} Modules
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/courses/${course.slug}`}>
                      View Course Content
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
