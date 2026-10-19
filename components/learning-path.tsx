"use client";

import { useEffect, useState } from "react";
import { Course } from "@/lib/data/course-schema";
import { mapCourseToLearningPath } from "@/lib/data/course-service";
import { useProgress } from "@/context/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Lock, CheckCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";

export function LearningPath({ course }: { course: Course }) {
  const { progressData, loadCourseProgress, loading } = useProgress();
  const [learningSteps, setLearningSteps] = useState(mapCourseToLearningPath(course, null));

  useEffect(() => {
    loadCourseProgress(course.id).then(progress => {
      setLearningSteps(mapCourseToLearningPath(course, progress));
    });
  }, [course.id, loadCourseProgress]);

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground animate-pulse">Loading your learning path...</div>;
  }

  return (
    <div className="space-y-8 relative">
      <h2 className="text-2xl font-bold border-b border-border pb-4">Your Learning Path</h2>
      
      {/* Visual connection line */}
      <div className="absolute left-6 top-24 bottom-0 w-0.5 bg-border -z-10 hidden sm:block"></div>

      <div className="space-y-6 relative z-10">
        {learningSteps.map((step, index) => {
          
          let StepIcon = Lock;
          let stepColor = "text-muted-foreground bg-muted";
          let borderColor = "border-border/50";
          
          if (step.status === "completed") {
            StepIcon = CheckCircle;
            stepColor = "text-green-500 bg-green-500/10";
            borderColor = "border-green-500/30";
          } else if (step.status === "in_progress") {
            StepIcon = RefreshCcw;
            stepColor = "text-primary bg-primary/10";
            borderColor = "border-primary/50 ring-1 ring-primary/20";
          } else if (step.status === "available") {
            StepIcon = PlayCircle;
            stepColor = "text-primary bg-primary/10";
            borderColor = "border-primary/50";
          }

          return (
            <div key={step.id} className="flex gap-4 sm:gap-6">
              <div className="hidden sm:flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stepColor} border-4 border-background shadow-sm`}>
                  <StepIcon className="w-5 h-5" />
                </div>
              </div>
              
              <Card className={`flex-1 shadow-sm transition-all duration-200 ${borderColor} ${step.status === 'locked' ? 'opacity-70' : 'hover:shadow-md'}`}>
                <CardHeader className="pb-3 flex flex-row justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Step {step.stepNumber}
                      </span>
                      {step.status === "completed" && <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full font-medium">Completed</span>}
                      {step.status === "locked" && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">Locked</span>}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                    <CardDescription className="mt-1">{step.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                    <div className="text-sm text-muted-foreground">
                      {step.lessons.length} Lessons • 1 Practice • 1 Quiz
                    </div>
                    
                    {step.status !== "locked" ? (
                      <Button asChild className="w-full sm:w-auto">
                        <Link href={`/courses/${course.slug}/${step.slug}`}>
                          {step.status === 'completed' ? 'Review' : 'Start Learning'} <PlayCircle className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button disabled variant="outline" className="w-full sm:w-auto">
                        Locked <Lock className="ml-2 w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
