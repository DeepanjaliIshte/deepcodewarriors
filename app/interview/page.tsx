"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { INTERVIEW_QUESTIONS, saveInterviewResponse } from "@/lib/data/interview-service";
import { Loader2, Send, MessageSquare, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function InterviewPage() {
  const { user, loading } = useAuth();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("Java");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (loading || (!user && !loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const categories = Array.from(new Set(INTERVIEW_QUESTIONS.map(q => q.category)));
  const categoryQuestions = INTERVIEW_QUESTIONS.filter(q => q.category === selectedCategory);
  const currentQuestion = categoryQuestions[currentQuestionIndex];

  const handleSubmit = async () => {
    if (!answer.trim() || !user) return;
    setSaving(true);
    await saveInterviewResponse(user.uid, selectedCategory, currentQuestion.question, answer);
    setSaving(false);
    setSaved(true);
  };

  const handleNext = () => {
    setAnswer("");
    setSaved(false);
    if (currentQuestionIndex < categoryQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0); // Loop back for demo
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 border-b border-border pb-8">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <MessageSquare className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Mock Interviews</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Practice answering real interview questions. Your responses are saved for future review and AI evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-1 space-y-2">
            <h3 className="font-semibold mb-4 text-muted-foreground uppercase tracking-wider text-sm">Categories</h3>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentQuestionIndex(0);
                  setAnswer("");
                  setSaved(false);
                }}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="md:col-span-3">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge>{selectedCategory}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {categoryQuestions.length}
                  </span>
                </div>
                <CardTitle className="text-2xl leading-relaxed">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your answer here..."
                    className="min-h-[200px] text-base resize-y"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    disabled={saved || saving}
                  />
                  {saved && (
                    <div className="flex items-center text-green-500 bg-green-500/10 p-3 rounded-md">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Response saved successfully. AI evaluation coming soon!
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-border pt-4">
                <Button variant="ghost" asChild>
                  <Link href="/profile">View Saved Answers</Link>
                </Button>
                
                {saved ? (
                  <Button onClick={handleNext}>Next Question</Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={!answer.trim() || saving}>
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                    Submit Answer
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
