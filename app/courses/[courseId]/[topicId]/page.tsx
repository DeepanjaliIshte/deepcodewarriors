import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getTopicBySlug } from "@/lib/data/course-service"
import { mapCourseToLearningPath } from "@/lib/data/course-service"
import { notFound } from "next/navigation"

import { StepContent } from "@/components/step-content"

export default async function TopicReaderPage({ params }: { params: { courseId: string, topicId: string } }) {
  const data = await getTopicBySlug(params.courseId, params.topicId)
  
  if (!data) {
    notFound()
  }

  const { course, topic } = data

  // We convert to Learning Path to get the Step and Next Step
  const learningPath = mapCourseToLearningPath(course)
  const currentStep = learningPath.find(s => s.slug === topic.slug) || learningPath[0]
  const nextStep = learningPath.find(s => s.stepNumber === currentStep.stepNumber + 1) || null

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1200px] w-full mx-auto relative">
        <StepContent 
          course={course}
          step={currentStep}
          nextStep={nextStep}
        />
      </div>
      
      <Footer />
    </main>
  )
}

