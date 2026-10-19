"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const { user, profile, loading, updateUserProfile } = useAuth();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/onboarding");
    } else if (!loading && profile?.onboardingCompleted) {
      router.push("/dashboard");
    }
  }, [user, profile, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleComplete = async () => {
    setSaving(true);
    await updateUserProfile({
      goal,
      currentLevel,
      studyTime,
      careerGoal,
      onboardingCompleted: true,
    });
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex flex-col bg-muted/20">
      <Navigation />

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`h-2 flex-1 mx-1 rounded-full ${s <= step ? "bg-primary" : "bg-border"}`} 
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Step {step} of 4
          </p>
        </div>

        <Card className="w-full max-w-2xl shadow-lg border-primary/20">
          
          {step === 1 && (
            <>
              <CardHeader className="text-center space-y-4 pb-8">
                <CardTitle className="text-3xl font-bold">What do you want to become?</CardTitle>
                <CardDescription className="text-lg">Select a developer path to personalize your journey.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Java Developer",
                  "Full Stack Developer",
                  "Python Developer",
                  "Android Developer",
                  "Data / AI Developer",
                  "I just want to learn coding"
                ].map((option) => (
                  <Button
                    key={option}
                    variant={goal === option ? "default" : "outline"}
                    className="h-auto py-6 text-lg justify-start px-6"
                    onClick={() => { setGoal(option); handleNext(); }}
                  >
                    {option}
                  </Button>
                ))}
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader className="text-center space-y-4 pb-8">
                <CardTitle className="text-3xl font-bold">What is your current level?</CardTitle>
                <CardDescription className="text-lg">This helps us recommend the right starting point.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                {[
                  "Complete Beginner",
                  "I know the basics",
                  "I can build small projects",
                  "Preparing for interviews"
                ].map((option) => (
                  <Button
                    key={option}
                    variant={currentLevel === option ? "default" : "outline"}
                    className="h-auto py-4 text-lg justify-start px-6"
                    onClick={() => { setCurrentLevel(option); handleNext(); }}
                  >
                    {option}
                  </Button>
                ))}
                <div className="flex justify-start mt-4">
                  <Button variant="ghost" onClick={handleBack}>Back</Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader className="text-center space-y-4 pb-8">
                <CardTitle className="text-3xl font-bold">How much time can you study?</CardTitle>
                <CardDescription className="text-lg">We'll adjust your daily missions accordingly.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                {[
                  "20 minutes/day",
                  "1 hour/day",
                  "2+ hours/day"
                ].map((option) => (
                  <Button
                    key={option}
                    variant={studyTime === option ? "default" : "outline"}
                    className="h-auto py-4 text-lg justify-start px-6"
                    onClick={() => { setStudyTime(option); handleNext(); }}
                  >
                    {option}
                  </Button>
                ))}
                <div className="flex justify-start mt-4">
                  <Button variant="ghost" onClick={handleBack}>Back</Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 4 && (
            <>
              <CardHeader className="text-center space-y-4 pb-8">
                <CardTitle className="text-3xl font-bold">What's your ultimate goal?</CardTitle>
                <CardDescription className="text-lg">Choose what you want to achieve with us.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                {[
                  "Learn programming",
                  "Build projects",
                  "Build my portfolio",
                  "Prepare for interviews",
                  "Become job ready"
                ].map((option) => (
                  <Button
                    key={option}
                    variant={careerGoal === option ? "default" : "outline"}
                    className="h-auto py-4 text-lg justify-start px-6"
                    onClick={() => { setCareerGoal(option); }}
                  >
                    {option}
                  </Button>
                ))}
                
                <div className="flex justify-between mt-8">
                  <Button variant="ghost" onClick={handleBack}>Back</Button>
                  <Button 
                    size="lg" 
                    onClick={handleComplete} 
                    disabled={!careerGoal || saving}
                    className="px-8"
                  >
                    {saving ? "Setting up..." : "Complete Setup"}
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>

      <Footer />
    </main>
  );
}
