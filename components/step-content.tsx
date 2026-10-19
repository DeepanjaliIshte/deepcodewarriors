"use client";

import { useState, useEffect } from "react";
import { Course, LearningStep } from "@/lib/data/course-schema";
import { mapCourseToLearningPath } from "@/lib/data/course-service";
import { useProgress } from "@/context/ProgressContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Lock, PlayCircle, BookOpen, PenTool, BrainCircuit, AlertTriangle, Lightbulb, Clock, Database, Code, ChevronDown, ChevronUp, Sparkles, Check, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { Quiz } from "@/components/quiz";

export function StepContent({ course, step, nextStep }: { course: Course, step: LearningStep, nextStep: LearningStep | null }) {
  const { progressData, loadCourseProgress, markLessonComplete, submitQuiz, loading } = useProgress();
  const router = useRouter();
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [init, setInit] = useState(false);
  const [activeLessonQuiz, setActiveLessonQuiz] = useState<string | null>(null);
  const [showExerciseSolutions, setShowExerciseSolutions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadCourseProgress(course.id).then(() => setInit(true));
  }, [course.id, loadCourseProgress]);

  if (loading || !init) {
    return <div className="flex-1 p-8 text-center animate-pulse">Loading step details...</div>;
  }

  const progress = progressData[course.id];
  const completedLessons = progress?.completedLessons || [];
  
  // Re-map the specific step with the loaded progress to accurately know its status
  const learningPath = mapCourseToLearningPath(course, progress);
  const currentStep = learningPath.find(s => s.id === step.id) || step;
  
  const isLocked = currentStep.status === "locked";
  const isCompleted = currentStep.status === "completed";

  if (isLocked) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full min-h-[500px]">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <Lock className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Step Locked</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          You need to complete the previous steps in this learning path before unlocking this content.
        </p>
        <Button asChild>
          <Link href={`/courses/${course.slug}`}>Return to Learning Path</Link>
        </Button>
      </div>
    );
  }

  if (quizPassed) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full min-h-[500px] animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-bold mb-4">🎉 Congratulations!</h2>
        <p className="text-xl text-muted-foreground max-w-md mb-8">
          You cleared Step {step.stepNumber}. You are ready to move to the next step!
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
             <Link href={`/courses/${course.slug}`}>View Path</Link>
          </Button>
          {nextStep && (
            <Button asChild>
              <Link href={`/courses/${course.slug}/${nextStep.slug}`}>Continue to Step {nextStep.stepNumber}</Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  const handleLessonComplete = async (lessonId: string) => {
    await markLessonComplete(course.id, step.id, lessonId);
  };

  const handleLessonQuizComplete = async (lessonId: string, score: number, passed: boolean) => {
    if (passed) {
      await markLessonComplete(course.id, step.id, lessonId);
    }
  };

  const handleQuizComplete = async (score: number, passed: boolean) => {
    const success = await submitQuiz(course.id, step.id, score, step.passingScore, nextStep?.id);
    if (success) {
      setQuizPassed(true);
    } else {
      setShowQuiz(false);
      alert(`Keep practicing 💪! You scored ${score}%. Review the lessons and try the quiz again.`);
    }
  };

  // Calculate Progress
  const totalLessons = step.lessons.length;
  const completedCount = step.lessons.filter(l => completedLessons.includes(l.id)).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 100;

  return (
    <div className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto w-full pb-32 relative">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground">
            <Link href={`/courses/${course.slug}`}>
              <ArrowLeft className="w-4 h-4 mr-1" /> All Modules
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Step {step.stepNumber}: {step.title}</h1>
        <p className="text-lg text-muted-foreground">{step.description}</p>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border flex items-center gap-4">
           <div className="flex-1">
             <div className="flex justify-between text-sm font-medium mb-2">
               <span>Step Mastery</span>
               <span>{progressPercent}%</span>
             </div>
             <div className="w-full bg-muted-foreground/20 h-2.5 rounded-full overflow-hidden">
               <div className="bg-primary h-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
             </div>
           </div>
           <div className="text-sm font-medium text-muted-foreground whitespace-nowrap">
             {completedCount} / {totalLessons} lessons completed
           </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* LEARN SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold">Lessons ({step.lessons.length})</h2>
          </div>
          
          <div className="space-y-8">
            {step.lessons.map((lesson, lessonIdx) => {
              const isDone = completedLessons.includes(lesson.id);
              const examples = lesson.codeExamples && lesson.codeExamples.length > 0 
                ? lesson.codeExamples 
                : lesson.codeExample ? [lesson.codeExample] : [];
              const isQuizOpen = activeLessonQuiz === lesson.id;
              const hasExerciseSolution = showExerciseSolutions[lesson.id] || false;

              return (
                <Card key={lesson.id} className={`${isDone ? 'border-green-500/30 bg-green-500/5' : 'border-border'} border transition-all shadow-sm`}>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                          {lessonIdx + 1}
                        </span>
                        <CardTitle className="text-xl">
                          {lesson.title}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.timeComplexity && (
                          <Badge variant="outline" className="flex items-center gap-1 font-mono text-xs">
                            <Clock className="w-3 h-3 text-primary" /> {lesson.timeComplexity}
                          </Badge>
                        )}
                        {lesson.spaceComplexity && (
                          <Badge variant="outline" className="flex items-center gap-1 font-mono text-xs">
                            <Database className="w-3 h-3 text-secondary-foreground" /> {lesson.spaceComplexity}
                          </Badge>
                        )}
                        {isDone && (
                          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-0 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Learning Objectives */}
                    {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
                      <div className="bg-muted/40 p-3.5 rounded-lg border border-border/60">
                        <h4 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-primary" /> Learning Objectives
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-1.5 text-xs text-foreground/80">
                          {lesson.learningObjectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-primary font-bold mt-0.5">•</span>
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Detailed Explanation */}
                    <div className="prose prose-invert max-w-none text-muted-foreground text-sm leading-relaxed">
                        {String(lesson.explanation || lesson.whatIsThis || "").split('\\n').map((para, i) => (
                          <p key={i} className="mb-2">{para}</p>
                        ))}
                    </div>

                    {/* Walkthrough */}
                    {lesson.walkthrough && (
                      <div className="bg-card border border-border/80 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                          <Code className="w-4 h-4 text-primary" /> Algorithmic Walkthrough & Tracing
                        </h4>
                        <div className="text-xs text-muted-foreground whitespace-pre-line font-mono bg-muted/50 p-3 rounded">
                          {lesson.walkthrough}
                        </div>
                      </div>
                    )}

                    {/* Code Examples */}
                    {examples.length > 0 && (
                      <div className="space-y-4 pt-2">
                        <h4 className="font-semibold text-foreground text-sm">Java Implementation & Examples</h4>
                        {examples.map((ex, i) => (
                           <div key={i} className="mb-4">
                             {ex.title && <h5 className="font-medium text-xs text-primary mb-2">{ex.title}</h5>}
                             <CodeBlock language={ex.language || "java"} code={ex.code} />
                             {ex.output && (
                               <div className="mt-2 bg-muted/60 p-2.5 rounded border border-border text-xs font-mono">
                                 <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-wider mb-1">Expected Output:</span>
                                 <pre className="text-foreground whitespace-pre-wrap">{ex.output}</pre>
                                </div>
                             )}
                             {ex.explanation && (
                               <p className="text-xs mt-2 text-muted-foreground bg-muted/30 p-2.5 rounded-md border-l-2 border-primary">
                                 {ex.explanation}
                               </p>
                             )}
                           </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Key Takeaways */}
                    {((lesson.importantPoints && lesson.importantPoints.length > 0) || (lesson.keyTakeaways && lesson.keyTakeaways.length > 0)) && (
                      <div className="bg-primary/5 border border-primary/20 p-4 rounded-md">
                        <h4 className="font-semibold mb-2 flex items-center text-primary text-sm"><Lightbulb className="w-4 h-4 mr-2"/> Key Takeaways</h4>
                        <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                          {(lesson.importantPoints || lesson.keyTakeaways || []).map((pt, i) => <li key={i}>{pt}</li>)}
                        </ul>
                      </div>
                    )}

                    {/* Common Mistakes */}
                    {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                      <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-md">
                        <h4 className="font-semibold mb-2 flex items-center text-destructive text-sm"><AlertTriangle className="w-4 h-4 mr-2"/> Common Mistakes</h4>
                        <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                          {lesson.commonMistakes.map((pt, i) => <li key={i}>{pt}</li>)}
                        </ul>
                      </div>
                    )}

                    {/* Coding Exercise */}
                    {lesson.codingExercise && (
                      <div className="border border-border/80 rounded-lg p-4 bg-muted/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <PenTool className="w-4 h-4 text-orange-500" /> Coding Exercise: {lesson.codingExercise.title}
                          </h4>
                          <Badge variant="secondary" className="text-[10px]">Java</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{lesson.codingExercise.problemStatement}</p>
                        
                        {lesson.codingExercise.constraints && lesson.codingExercise.constraints.length > 0 && (
                          <div className="mb-3 text-[11px] text-muted-foreground bg-muted/40 p-2 rounded">
                            <span className="font-semibold text-foreground">Constraints: </span>
                            {lesson.codingExercise.constraints.join(" • ")}
                          </div>
                        )}

                        {lesson.codingExercise.starterCode && (
                          <div className="mb-3">
                            <span className="text-[11px] font-semibold text-muted-foreground block mb-1">Starter Template:</span>
                            <CodeBlock language="java" code={lesson.codingExercise.starterCode} />
                          </div>
                        )}

                        <div className="mt-2 flex items-center justify-between pt-2 border-t border-border/40">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs text-primary"
                            onClick={() => setShowExerciseSolutions(prev => ({ ...prev, [lesson.id]: !prev[lesson.id] }))}
                          >
                            {hasExerciseSolution ? <ChevronUp className="w-3.5 h-3.5 mr-1" /> : <ChevronDown className="w-3.5 h-3.5 mr-1" />}
                            {hasExerciseSolution ? "Hide Verified Solution" : "View Verified Solution"}
                          </Button>
                        </div>

                        {hasExerciseSolution && lesson.codingExercise.solution && (
                          <div className="mt-3 animate-in fade-in duration-200">
                            <CodeBlock language="java" code={lesson.codingExercise.solution} />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Lesson-specific Quiz (10 MCQs) */}
                    {lesson.quiz && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg border border-primary/20">
                          <div className="flex items-center gap-2">
                            <BrainCircuit className="w-4 h-4 text-primary" />
                            <div>
                              <p className="text-xs font-semibold">Lesson Quiz: {lesson.title}</p>
                              <p className="text-[11px] text-muted-foreground">{lesson.quiz.questions.length} questions • Passing score 70%</p>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant={isQuizOpen ? "outline" : "default"}
                            onClick={() => setActiveLessonQuiz(isQuizOpen ? null : lesson.id)}
                          >
                            {isQuizOpen ? "Close Quiz" : "Take Lesson Quiz (10 MCQs)"}
                          </Button>
                        </div>

                        {isQuizOpen && (
                          <div className="mt-4 p-4 border border-border rounded-xl bg-card shadow-sm animate-in fade-in duration-200">
                            <Quiz 
                              course={course}
                              quiz={lesson.quiz}
                              onComplete={(score, passed) => handleLessonQuizComplete(lesson.id, score, passed)}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="pt-4 flex justify-end gap-3 border-t border-border/40">
                      {!isDone ? (
                        <Button onClick={() => handleLessonComplete(lesson.id)}>
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Mark Lesson Complete
                        </Button>
                      ) : (
                        <Button variant="secondary" disabled>
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Completed
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* PRACTICE SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold">Practice</h2>
          </div>
          
          <div className="grid gap-6">
             {step.lessons.filter(l => l.practiceTask).map((lesson, i) => (
               <Card key={`task-${i}`} className="bg-muted/30 border-primary/20">
                 <CardHeader>
                   <CardTitle className="text-lg flex items-center"><PenTool className="w-4 h-4 mr-2 text-orange-500" /> {lesson.practiceTask?.title}</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <p className="text-muted-foreground">{lesson.practiceTask?.description}</p>
                   {lesson.practiceTask?.hint && (
                     <p className="text-sm bg-orange-500/10 text-orange-600 dark:text-orange-400 p-3 rounded border border-orange-500/20">
                       <span className="font-bold block mb-1">Hint:</span> {lesson.practiceTask.hint}
                     </p>
                   )}
                   {lesson.practiceTask?.solution && (
                     <div className="mt-4">
                       <h5 className="text-sm font-semibold mb-2 text-muted-foreground">Solution:</h5>
                       <CodeBlock language="java" code={lesson.practiceTask.solution} />
                     </div>
                   )}
                 </CardContent>
               </Card>
             ))}
             {step.practiceQuestions.length > 0 && (
               <div className="grid gap-4 sm:grid-cols-2 mt-4">
                 {step.practiceQuestions.map((q, i) => (
                   <Card key={`q-${i}`} className="bg-muted/10">
                     <CardContent className="p-6">
                       <div className="flex items-start gap-4">
                         <span className="font-mono text-muted-foreground mt-1">{(i+1).toString().padStart(2, '0')}</span>
                         <p className="text-sm font-medium">{q}</p>
                       </div>
                     </CardContent>
                   </Card>
                 ))}
               </div>
             )}
          </div>
        </section>

        {/* TEST YOUR KNOWLEDGE SECTION */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <div className="w-10 h-10 bg-purple-500/10 text-purple-500 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold">Test Your Knowledge</h2>
          </div>
          
          {!showQuiz ? (
            <Card className="text-center p-8 bg-gradient-to-br from-muted/50 to-muted">
              <h3 className="text-xl font-bold mb-2">Ready to prove your skills?</h3>
              <p className="text-muted-foreground mb-6">Pass the quiz with a score of {step.passingScore}% or higher to unlock the next step.</p>
              <Button size="lg" onClick={() => setShowQuiz(true)} className="w-full sm:w-auto">
                <PlayCircle className="w-5 h-5 mr-2" /> Start Quiz
              </Button>
            </Card>
          ) : (
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
               {step.quiz ? (
                 <Quiz quiz={step.quiz} onComplete={handleQuizComplete} />
               ) : (
                 <div className="text-center py-8">
                   <p className="mb-4">No quiz available for this step.</p>
                   <Button onClick={() => handleQuizComplete(100, true)}>Skip Quiz</Button>
                 </div>
               )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
