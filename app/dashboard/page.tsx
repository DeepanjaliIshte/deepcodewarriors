"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Target, Flame, Star, PlayCircle, Code2, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { getCourses, mapCourseToLearningPath } from "@/lib/data/course-service";
import { Course } from "@/lib/data/course-schema";
import { getSmartNextStep } from "@/lib/utils/recommendation-engine";

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const { progressData, loadCourseProgress } = useProgress();
  const router = useRouter();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/dashboard");
    } else if (!loading && profile && !profile.onboardingCompleted) {
      router.push("/onboarding");
    }
  }, [user, profile, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (user && profile?.onboardingCompleted) {
        const fetchedCourses = await getCourses();
        setCourses(fetchedCourses);
        // Load progress for all courses
        await Promise.all(fetchedCourses.map(c => loadCourseProgress(c.id)));
        setLoadingData(false);
      }
    };
    fetchData();
  }, [user, profile]);

  if (loading || (!user && !loading) || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // --- Calculate Code DNA (Basic Example) ---
  const calculateSkill = (skillKeywords: string[]) => {
    let score = 0;
    let total = 0;
    Object.values(progressData).forEach(prog => {
      prog.completedSteps?.forEach(stepId => {
        // Simple mapping: if stepId contains keyword, it adds to score
        if (skillKeywords.some(kw => stepId.toLowerCase().includes(kw))) {
          score += 1;
        }
      });
      total += 2; // Arbitrary total for demo
    });
    return Math.min(5, Math.max(1, Math.ceil((score / Math.max(1, total)) * 5)));
  };

  const skills = [
    { name: "Java", score: calculateSkill(["java", "variables", "oop"]) },
    { name: "OOP", score: calculateSkill(["oop", "classes", "inheritance"]) },
    { name: "Collections", score: calculateSkill(["collections", "list", "map"]) },
    { name: "Web Dev", score: calculateSkill(["html", "css", "js", "react"]) },
  ];

  // --- Smart Next Step / Today's Mission ---
  const recommendation = getSmartNextStep(courses, progressData);

  // --- Journey Calculation ---
  const journeyProgress = courses.slice(0, 4).map(course => {
    const prog = progressData[course.id];
    const path = mapCourseToLearningPath(course, prog);
    const completedCount = path.filter(s => s.status === "completed").length;
    const percent = Math.round((completedCount / path.length) * 100) || 0;
    
    // If not started and it's not the first course, maybe locked
    const isLocked = percent === 0 && course.id !== courses[0].id && !prog?.completedSteps?.length;
    
    return {
      title: course.title,
      percent,
      isLocked
    };
  });

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-8 border-b border-border">
          <div>
            <h1 className="text-3xl font-bold">Good morning, {profile?.displayName?.split(' ')[0] || "Developer"} 👋</h1>
            <div className="flex items-center gap-4 mt-3 text-muted-foreground">
              <span className="flex items-center"><Target className="w-4 h-4 mr-1 text-primary"/> {profile?.goal || "Developer"}</span>
              <span className="flex items-center"><Flame className="w-4 h-4 mr-1 text-orange-500"/> {profile?.streak || 0} Day Streak</span>
              <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-500"/> {profile?.xp || 0} XP</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild variant="outline">
              <Link href="/profile">View Profile</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Today's Mission */}
            <Card className="border-primary/20 bg-primary/5 shadow-md">
              <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Today's Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{recommendation.title}</h2>
                    <p className="text-muted-foreground">{recommendation.description}</p>
                  </div>
                  <Button asChild size="lg" className="shrink-0">
                    <Link href={recommendation.url}>{recommendation.actionText} <PlayCircle className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Your Journey */}
            <Card>
              <CardHeader>
                <CardTitle>Your Journey</CardTitle>
                <CardDescription>Track your path to becoming a {profile?.goal || "Developer"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {journeyProgress.map((jp, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-48 truncate font-medium flex items-center">
                      {jp.isLocked ? <Lock className="w-4 h-4 mr-2 text-muted-foreground" /> : 
                       jp.percent === 100 ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> :
                       <div className="w-2 h-2 rounded-full bg-primary mr-3 ml-1" />
                      }
                      <span className={jp.isLocked ? "text-muted-foreground" : ""}>{jp.title}</span>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${jp.percent === 100 ? 'bg-green-500' : 'bg-primary'}`} 
                          style={{ width: `${jp.percent}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm text-muted-foreground">
                      {jp.percent}%
                    </div>
                  </div>
                ))}
                
                {/* Upcoming Journey Items */}
                <div className="flex items-center gap-4 opacity-50 pt-2">
                  <div className="w-48 font-medium flex items-center">
                    <Lock className="w-4 h-4 mr-2" /> Projects
                  </div>
                  <div className="flex-1"><div className="h-2 w-full bg-muted rounded-full" /></div>
                  <div className="w-12 text-right text-sm">Locked</div>
                </div>
                <div className="flex items-center gap-4 opacity-50 pt-2">
                  <div className="w-48 font-medium flex items-center">
                    <Lock className="w-4 h-4 mr-2" /> Mock Interview
                  </div>
                  <div className="flex-1"><div className="h-2 w-full bg-muted rounded-full" /></div>
                  <div className="w-12 text-right text-sm">Locked</div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Code DNA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code2 className="w-5 h-5 mr-2 text-primary" />
                  Your Code DNA
                </CardTitle>
                <CardDescription>Your current skill profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map(skill => (
                    <div key={skill.name} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= skill.score ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} 
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-border text-sm">
                  <p className="text-muted-foreground mb-1">Strongest area:</p>
                  <p className="font-semibold text-primary">{skills.sort((a,b)=>b.score - a.score)[0]?.name || "None yet"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/build">🏗️ Build Mode</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/interview">🎯 Mock Interviews</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/portfolio">👩‍💻 My Portfolio</Link>
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
