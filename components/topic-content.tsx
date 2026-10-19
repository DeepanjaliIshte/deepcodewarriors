"use client"

import { useState } from "react"
import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, ChevronRight, CheckCircle2, AlertTriangle, Lightbulb, Search, Bookmark } from "lucide-react"
import Link from "next/link"

import { Quiz } from "@/components/quiz"
import { useAuth } from "@/context/AuthContext"
import { markLessonCompleted, getLessonProgress, toggleBookmark, checkBookmark } from "@/lib/data/student-service"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function TopicContent({ course, topic, topicIndex, prevTopic, nextTopic }: any) {
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(false)
  const [marking, setMarking] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarking, setBookmarking] = useState(false)

  useEffect(() => {
    const checkProgress = async () => {
      if (user) {
        const progress = await getLessonProgress(user.uid, course.id, topic.id)
        if (progress?.status === "completed") {
          setIsCompleted(true)
        }
        
        const bookmarked = await checkBookmark(user.uid, topic.id)
        setIsBookmarked(bookmarked)
      }
    }
    checkProgress()
  }, [user, course.id, topic.id])

  const filteredSubtopics = topic.subtopics.filter((subtopic: any) => {
    const query = searchQuery.toLowerCase()
    return (
      subtopic.title.toLowerCase().includes(query) ||
      subtopic.explanation.toLowerCase().includes(query) ||
      subtopic.importantPoints.some((p: string) => p.toLowerCase().includes(query))
    )
  })

  const handleMarkCompleted = async () => {
    if (!user) {
      router.push(`/login?redirect=/courses/${course.slug}/${topic.slug}`)
      return
    }
    setMarking(true)
    const success = await markLessonCompleted(user.uid, course.id, topic.id)
    if (success) {
      setIsCompleted(true)
    }
    setMarking(false)
  }

  const handleBookmark = async () => {
    if (!user) {
      router.push(`/login?redirect=/courses/${course.slug}/${topic.slug}`)
      return
    }
    setBookmarking(true)
    try {
      const result = await toggleBookmark(user.uid, topic.id, { 
        title: topic.title, 
        url: `/courses/${course.slug}/${topic.slug}`,
        courseId: course.id
      })
      setIsBookmarked(result)
    } catch (e) {
      console.error(e)
    } finally {
      setBookmarking(false)
    }
  }

  return (
    <>
      <div className="flex-1 min-w-0 pb-20">
        {/* Mobile Sidebar Toggle (Optional enhancement) */}
        <div className="lg:hidden p-4 border-b border-border flex items-center bg-muted/10">
          <Link href={`/courses/${course.slug}`} className="flex items-center text-sm font-medium text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Course Overview
          </Link>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-primary font-medium mb-3">
              <span className="flex items-center">
                {course.title} <ChevronRight className="w-4 h-4 mx-1" /> Module {topicIndex + 1}
              </span>
              {isCompleted && (
                <span className="flex items-center text-green-600 bg-green-500/10 px-2 py-1 rounded-full text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                </span>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{topic.title}</h1>
            <p className="text-xl text-muted-foreground">{topic.description}</p>
          </div>

          {/* Search Input */}
          <div className="relative mb-12">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search within these notes..." 
              className="pl-10 h-12 text-lg bg-muted/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {filteredSubtopics.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No results found for "{searchQuery}" in this module.
            </div>
          ) : (
            <div className="space-y-16">
              {filteredSubtopics.map((subtopic: any) => (
                <section key={subtopic.id} id={subtopic.id} className="scroll-mt-24">
                  <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-border">{subtopic.title}</h2>
                  
                  {/* Explanation */}
                  <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                    <p className="leading-relaxed text-foreground/90">{subtopic.explanation}</p>
                  </div>

                  {/* Important Points Callout */}
                  {subtopic.importantPoints.length > 0 && (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                      <h4 className="flex items-center font-semibold text-primary mb-4 text-lg">
                        <Lightbulb className="w-5 h-5 mr-2" /> Key Takeaways
                      </h4>
                      <ul className="space-y-2">
                        {subtopic.importantPoints.map((point: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 mr-3 text-primary shrink-0 mt-0.5" />
                            <span className="text-foreground/90">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Code Examples */}
                  {subtopic.codeExamples.length > 0 && (
                    <div className="mb-8">
                      <h4 className="font-semibold text-lg mb-4">Examples</h4>
                      {subtopic.codeExamples.map((example: any, idx: number) => (
                        <CodeBlock 
                          key={idx} 
                          language={example.language} 
                          code={example.code} 
                          output={example.output} 
                        />
                      ))}
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {subtopic.commonMistakes.length > 0 && (
                    <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 mb-8">
                      <h4 className="flex items-center font-semibold text-destructive mb-3">
                        <AlertTriangle className="w-5 h-5 mr-2" /> Common Mistakes
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                        {subtopic.commonMistakes.map((mistake: string, idx: number) => (
                          <li key={idx}>{mistake}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Practice & Interview */}
                  <div className="grid md:grid-cols-2 gap-6 mt-10">
                    {subtopic.practiceQuestions.length > 0 && (
                      <div className="border border-border rounded-xl p-6 bg-muted/20">
                        <h4 className="font-semibold mb-3">Practice Questions</h4>
                        <ul className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
                          {subtopic.practiceQuestions.map((q: string, idx: number) => (
                            <li key={idx}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {subtopic.interviewQuestions.length > 0 && (
                      <div className="border border-border rounded-xl p-6 bg-muted/20">
                        <h4 className="font-semibold mb-3">Interview Prep</h4>
                        <div className="space-y-4">
                          {subtopic.interviewQuestions.map((iq: any, idx: number) => (
                            <div key={idx}>
                              <div className="font-medium text-sm mb-1">Q: {iq.question}</div>
                              <div className="text-sm text-muted-foreground">A: {iq.answer}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </div>
          )}
          
          {/* Progress Tracking Action */}
          <div className="mt-16 bg-muted/30 p-6 rounded-xl border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold mb-1">Module Completion</h3>
              <p className="text-sm text-muted-foreground">Mark this module as completed to track your progress.</p>
            </div>
            <Button 
              onClick={handleMarkCompleted} 
              variant={isCompleted ? "outline" : "default"}
              disabled={marking || isCompleted}
              className={isCompleted ? "border-green-500 text-green-500" : ""}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {marking ? "Saving..." : isCompleted ? "Completed" : user ? "Mark as Completed" : "Login to Track Progress"}
            </Button>
            <Button 
              onClick={handleBookmark} 
              variant={isBookmarked ? "default" : "outline"}
              disabled={bookmarking}
              className={isBookmarked ? "bg-primary text-primary-foreground" : ""}
            >
              <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
              {bookmarking ? "Saving..." : isBookmarked ? "Bookmarked" : "Save for Later"}
            </Button>
          </div>

          {/* Render Quiz if it's the last topic and quiz exists */}
          {!nextTopic && course.quiz && (
             <Quiz course={course} quiz={course.quiz} />
          )}

          {/* Next/Prev Navigation */}
          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevTopic ? (
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href={`/courses/${course.slug}/${prevTopic.slug}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: {prevTopic.title}
                </Link>
              </Button>
            ) : (
              <div /> // Spacer
            )}
            
            {nextTopic ? (
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/courses/${course.slug}/${nextTopic.slug}`}>
                  Next: {nextTopic.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <Button asChild variant="default" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                <Link href={`/courses/${course.slug}`}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Back to Course
                </Link>
              </Button>
            )}
          </div>
        </article>
      </div>

      {/* Right Sidebar (On this page) - Hidden on smaller screens */}
      <aside className="w-64 hidden xl:block border-l border-border bg-background shrink-0 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto">
        <div className="h-full py-8 px-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">On this page</h4>
          <ul className="space-y-3 text-sm">
            {topic.subtopics.map((subtopic: any) => (
              <li key={subtopic.id}>
                <Link href={`#${subtopic.id}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {subtopic.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}
