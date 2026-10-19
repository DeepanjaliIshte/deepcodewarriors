"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { saveQuizScore } from "@/lib/data/student-service";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Quiz({ course, quiz, onComplete }: { course?: any, quiz: any, onComplete?: (score: number, passed: boolean) => Promise<void> | void }) {
  const { user } = useAuth();
  const router = useRouter();

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const handleOptionSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIdx] = optionIdx;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIdx < quiz.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    selectedAnswers.forEach((ans, idx) => {
      if (ans === quiz.questions[idx].correctOptionIndex) {
        calculatedScore++;
      }
    });

    const finalScorePercentage = Math.round((calculatedScore / quiz.questions.length) * 100);
    const passed = finalScorePercentage >= quiz.passingScore;

    setCorrectCount(calculatedScore);
    setScore(finalScorePercentage);
    setIsSubmitted(true);

    // Save score to Firestore if logged in
    if (user && course?.id) {
      await saveQuizScore(user.uid, course.id, quiz.id, finalScorePercentage, passed);
    }
    
    if (onComplete) {
      await onComplete(finalScorePercentage, passed);
    }
  };

  if (isSubmitted) {
    const passed = score >= quiz.passingScore;
    const incorrectCount = quiz.questions.length - correctCount;

    return (
      <Card className="w-full max-w-2xl mx-auto my-12 shadow-lg border-primary/20">
        <CardHeader className="text-center pb-2">
          {passed ? (
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          )}
          <CardTitle className="text-3xl">Quiz Result</CardTitle>
          <CardDescription className="text-lg mt-2">
            You scored <span className={`font-bold ${passed ? "text-green-500" : "text-destructive"}`}>{score}%</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-8 mb-6 border-b pb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{correctCount}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">{incorrectCount}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Incorrect</p>
            </div>
          </div>

          <div className="text-center space-y-6 mb-8">
            {passed ? (
              <>
                <p className="text-lg font-medium">🎉 Congratulations! You passed the {quiz.title}.</p>
                {score === 100 ? (
                  <p className="text-muted-foreground">Flawless victory! You have completely mastered this topic.</p>
                ) : (
                  <p className="text-muted-foreground">Great job! Consider reviewing your mistakes below to achieve perfection.</p>
                )}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  {course?.id && (
                    <Button asChild variant="outline">
                      <Link href={`/certificates/${course.id}`}>View Certificate</Link>
                    </Button>
                  )}
                  <Button asChild>
                    <Link href="/dashboard">Continue Learning <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg font-medium">Almost there! You need at least {quiz.passingScore}% to pass.</p>
                <div className="bg-muted/50 p-4 rounded-lg inline-block text-left">
                  <h4 className="font-semibold mb-2">Recommended Action:</h4>
                  <p className="text-sm text-muted-foreground">Review the lesson content carefully, focusing on the concepts from your incorrect answers, then try again.</p>
                </div>
                <div className="flex justify-center mt-4">
                  <Button size="lg" onClick={() => {
                    setIsSubmitted(false);
                    setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
                    setCurrentQuestionIdx(0);
                  }}>
                    <RotateCcw className="mr-2 w-4 h-4" /> Try Again
                  </Button>
                </div>
              </>
            )}
          </div>

          {incorrectCount > 0 && (
            <div className="mt-8 space-y-6 text-left border-t pt-8">
              <h3 className="text-xl font-bold flex items-center">
                <AlertTriangle className="mr-2 w-5 h-5 text-amber-500" /> Review Your Mistakes
              </h3>
              {quiz.questions.map((q: any, i: number) => {
                const userAnswer = selectedAnswers[i];
                const isCorrect = userAnswer === q.correctOptionIndex;
                if (isCorrect) return null; // Only show mistakes in the review section

                return (
                  <div key={q.id || i} className="p-5 rounded-lg border border-destructive/30 bg-destructive/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-destructive"></div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-lg">{i + 1}. {q.question}</p>
                      <Badge variant="outline" className="ml-2 shrink-0">{q.difficulty || "medium"}</Badge>
                    </div>
                    <ul className="space-y-2 mb-4 mt-4">
                      {q.options.map((opt: string, optIdx: number) => (
                        <li key={optIdx} className={`px-4 py-3 rounded-md text-sm border
                          ${optIdx === q.correctOptionIndex ? "bg-green-500/20 border-green-500/50 font-medium text-green-900 dark:text-green-100" : 
                            optIdx === userAnswer ? "bg-destructive/20 border-destructive/50 text-destructive font-medium" : "bg-background border-border text-muted-foreground"}
                        `}>
                          <div className="flex items-center">
                            {optIdx === q.correctOptionIndex && <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />}
                            {optIdx === userAnswer && <XCircle className="w-4 h-4 mr-2 text-destructive" />}
                            {opt}
                            {optIdx === userAnswer && <span className="ml-auto text-xs opacity-70">Your Answer</span>}
                            {optIdx === q.correctOptionIndex && <span className="ml-auto text-xs opacity-70">Correct Answer</span>}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-background p-4 rounded-md border text-sm">
                      <span className="font-bold text-primary block mb-1">Explanation:</span> 
                      {q.explanation || "No explanation provided for this question."}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto my-12 border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
          <AlertTriangle className="w-12 h-12 mb-4 opacity-20" />
          <p>Quiz data is missing or incomplete.</p>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quiz.questions[currentQuestionIdx];

  return (
    <Card className="w-full max-w-2xl mx-auto my-12 shadow-md border-primary/10">
      <CardHeader className="bg-muted/30 pb-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-md">
              Q {currentQuestionIdx + 1}/{quiz.questions.length}
            </span>
            {currentQ.difficulty && (
              <Badge variant="outline" className="text-xs capitalize">{currentQ.difficulty}</Badge>
            )}
          </div>
          <span className="text-sm font-medium text-muted-foreground">Pass: {quiz.passingScore}%</span>
        </div>
        <CardTitle className="text-xl leading-relaxed">{currentQ.question}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt: string, idx: number) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all flex items-center justify-between
                ${selectedAnswers[currentQuestionIdx] === idx 
                  ? "border-primary bg-primary/5 text-foreground font-medium shadow-sm" 
                  : "border-border hover:border-primary/30 hover:bg-muted/50 text-muted-foreground"}
              `}
            >
              <span>{opt}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${selectedAnswers[currentQuestionIdx] === idx ? "border-primary" : "border-muted-foreground/30"}
              `}>
                {selectedAnswers[currentQuestionIdx] === idx && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Button 
            variant="outline" 
            onClick={handlePrev} 
            disabled={currentQuestionIdx === 0}
            className="w-24"
          >
            Previous
          </Button>
          
          {currentQuestionIdx === quiz.questions.length - 1 ? (
            <Button onClick={handleSubmit} disabled={selectedAnswers.includes(-1)} size="lg" className="px-8 shadow-md">
              Submit Quiz
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={selectedAnswers[currentQuestionIdx] === -1} className="w-24">
              Next
            </Button>
          )}
        </div>
        
        {!user && (
          <div className="mt-6 p-3 bg-muted/40 border border-border/60 rounded-lg flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Playing as Guest. Progress will save in this browser. Sign in to sync across devices.</span>
            </div>
            <Link href="/login" className="text-primary hover:underline font-semibold ml-2 shrink-0">
              Sign In
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
