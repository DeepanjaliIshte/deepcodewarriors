import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getCourseBySlug } from "@/lib/data/course-service"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PlayCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LearningPath } from "@/components/learning-path"

export default async function CourseOverviewPage({ params }: { params: { courseId: string } }) {
  const course = await getCourseBySlug(params.courseId)

  if (!course) {
    notFound()
  }

  // Calculate total subtopics
  const totalSubtopics = course.topics.reduce((acc, topic) => acc + topic.subtopics.length, 0)

  return (
    <main className="min-h-screen bg-[#060913] text-foreground flex flex-col selection:bg-orange-500/30 selection:text-orange-200">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button asChild variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-foreground">
          <Link href="/courses">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Courses
          </Link>
        </Button>

        {/* Course Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl text-muted-foreground">{course.description}</p>
          
          <div className="flex gap-4 mt-6">
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {course.level}
            </div>
            <div className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">
              {course.topics.length} Modules
            </div>
            <div className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm font-medium">
              {totalSubtopics} Lessons
            </div>
          </div>
        </div>

        {/* Course Curriculum */}
        <LearningPath course={course} />
      </div>

      <Footer />
    </main>
  )
}
