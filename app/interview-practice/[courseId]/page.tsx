"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, PlayCircle, BookOpen, ChevronRight, Eye } from "lucide-react";
// In a real scenario, this would load dynamically based on courseId
// We will mock an empty array for now since the massive content generation is pending
import { InterviewQuestion } from "@/lib/data/interview-schema";

const MOCK_QUESTIONS: InterviewQuestion[] = []; // Will be populated by the content generator

export default function InterviewPracticePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { progressData, loading, updateInterviewMastery, loadCourseProgress } = useProgress();
  const courseId = params.courseId as string;

  const [questions, setQuestions] = useState<InterviewQuestion[]>(MOCK_QUESTIONS);
  const [activeQuestion, setActiveQuestion] = useState<InterviewQuestion | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=/interview-practice/${courseId}`);
      return;
    }
    loadCourseProgress(courseId).then(() => setInit(true));
  }, [user, courseId, loadCourseProgress, router]);

  if (loading || !init) {
    return <div className="min-h-screen flex items-center justify-center animate-pulse">Loading Interview Dashboard...</div>;
  }

  const progress = progressData[courseId];
  const mastery = progress?.interviewMastery || {};

  const totalQuestions = questions.length || 70; // Mocking 70 for UI display since actual array is empty
  const masteredCount = Object.values(mastery).filter(m => m === "mastered").length;
  const needsPracticeCount = Object.values(mastery).filter(m => m === "needs_practice").length;
  const attemptedCount = masteredCount + needsPracticeCount;
  const overallReadiness = totalQuestions > 0 ? Math.round((masteredCount / totalQuestions) * 100) : 0;

  const handleMastery = async (level: "mastered" | "needs_practice") => {
    if (!activeQuestion) return;
    await updateInterviewMastery(courseId, activeQuestion.id, level);
    setActiveQuestion(null);
    setShowAnswer(false);
  };

  return (
    <main className="min-h-screen flex flex-col bg-muted/20">
      <Navigation />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {!activeQuestion ? (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 capitalize">🎤 {courseId.replace("-", " ")} Interview Prep</h1>
              <p className="text-lg text-muted-foreground">Master {totalQuestions} highly-curated questions to crush your technical interviews.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2 border-primary/20 shadow-md">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Interview Readiness</span>
                    <span className="text-2xl text-primary">{overallReadiness}%</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Progress value={overallReadiness} className="h-3" />
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{attemptedCount} / {totalQuestions}</p>
                      <p className="text-sm text-muted-foreground">Attempted</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{masteredCount}</p>
                      <p className="text-sm text-green-600/80">Mastered</p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-amber-600">{needsPracticeCount}</p>
                      <p className="text-sm text-amber-600/80">Needs Practice</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {needsPracticeCount > 0 && (
                     <div className="flex items-start gap-3 text-sm p-3 bg-destructive/10 text-destructive rounded-md">
                       <AlertCircle className="w-5 h-5 shrink-0" />
                       <p>You have {needsPracticeCount} questions marked as "Needs Practice". Focus on these first.</p>
                     </div>
                  )}
                  {overallReadiness < 100 ? (
                    <Button className="w-full h-12 text-md" onClick={() => {
                       // Logic to pick next question goes here
                       if(questions.length > 0) setActiveQuestion(questions[0]);
                       else alert("Content generation pending...");
                    }}>
                      <PlayCircle className="w-5 h-5 mr-2" /> Start Practice
                    </Button>
                  ) : (
                    <div className="flex items-start gap-3 text-sm p-3 bg-green-500/10 text-green-600 rounded-md">
                       <CheckCircle2 className="w-5 h-5 shrink-0" />
                       <p>You are fully prepared! Great job!</p>
                     </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Category Breakdown would be rendered here based on data */}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <Button variant="ghost" onClick={() => setActiveQuestion(null)} className="mb-4">
              <ChevronRight className="w-4 h-4 mr-2 rotate-180" /> Back to Dashboard
            </Button>
            
            <Card className="shadow-lg border-primary/20">
              <CardHeader className="bg-muted/30 border-b pb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                    {activeQuestion.category}
                  </span>
                  <span className={`text-xs font-bold uppercase ${
                    activeQuestion.difficulty === 'hard' ? 'text-destructive' : 
                    activeQuestion.difficulty === 'medium' ? 'text-amber-500' : 'text-green-500'
                  }`}>
                    {activeQuestion.difficulty}
                  </span>
                </div>
                <CardTitle className="text-2xl leading-relaxed">{activeQuestion.question}</CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                {!showAnswer ? (
                  <div className="text-center py-12 space-y-4">
                    <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto" />
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">Think about your answer carefully before revealing the solution.</p>
                    <Button size="lg" className="mt-4" onClick={() => setShowAnswer(true)}>
                      <Eye className="w-5 h-5 mr-2" /> Reveal Answer
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div>
                      <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Answer</h4>
                      <div className="prose prose-invert max-w-none text-foreground text-lg leading-relaxed">
                        {activeQuestion.answer}
                      </div>
                    </div>
                    
                    {activeQuestion.explanation && (
                      <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-md">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Detailed Explanation</h4>
                        <p className="text-muted-foreground">{activeQuestion.explanation}</p>
                      </div>
                    )}
                    
                    <div className="border-t pt-6 flex flex-col sm:flex-row justify-center gap-4">
                      <Button size="lg" variant="destructive" className="sm:flex-1" onClick={() => handleMastery("needs_practice")}>
                        <AlertCircle className="w-5 h-5 mr-2" /> Need More Practice
                      </Button>
                      <Button size="lg" className="sm:flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={() => handleMastery("mastered")}>
                        <CheckCircle2 className="w-5 h-5 mr-2" /> I Know This
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
