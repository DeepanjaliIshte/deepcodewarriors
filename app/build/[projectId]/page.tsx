"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Lock, ArrowLeft, Loader2, PlayCircle } from "lucide-react";
import Link from "next/link";
import { MOCK_PROJECTS, Project, ProjectTask } from "@/lib/data/mock-projects";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const proj = MOCK_PROJECTS.find(p => p.id === params.projectId);
    setProject(proj || null);

    const loadProgress = async () => {
      if (user && proj) {
        try {
          const docRef = doc(db, `users/${user.uid}/projects`, proj.id);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setCompletedTasks(snap.data().completedTasks || []);
          } else {
            await setDoc(docRef, {
              completedTasks: [],
              updatedAt: serverTimestamp()
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
      setLoading(false);
    };
    loadProgress();
  }, [params.projectId, user]);

  const markTaskComplete = async (taskId: string) => {
    if (!user || !project) return;
    const newCompleted = [...new Set([...completedTasks, taskId])];
    setCompletedTasks(newCompleted);
    try {
      const docRef = doc(db, `users/${user.uid}/projects`, project.id);
      await setDoc(docRef, { completedTasks: newCompleted, updatedAt: serverTimestamp() }, { merge: true });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return <div className="min-h-screen p-8 text-center">Project not found</div>;
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/build">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Build Mode
          </Link>
        </Button>
        
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">{project.level}</Badge>
          <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
          <p className="text-xl text-muted-foreground">{project.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all"
                style={{ width: `${(completedTasks.length / project.tasks.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">
              {completedTasks.length} / {project.tasks.length} Tasks
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {project.tasks.map((task, index) => {
            const isCompleted = completedTasks.includes(task.id);
            const isAvailable = index === 0 || completedTasks.includes(project.tasks[index - 1].id);
            const isLocked = !isCompleted && !isAvailable;

            return (
              <Card key={task.id} className={`transition-all ${isLocked ? 'opacity-60 bg-muted/50' : 'hover:shadow-md border-primary/20'}`}>
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="mt-1">
                    {isCompleted ? <CheckCircle2 className="w-6 h-6 text-green-500" /> :
                     isLocked ? <Lock className="w-6 h-6 text-muted-foreground" /> :
                     <Circle className="w-6 h-6 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Task {index + 1}: {task.title}</span>
                      {isCompleted && <Badge variant="outline" className="text-green-500 border-green-500 bg-green-500/10">Completed</Badge>}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">{task.description}</CardDescription>
                  </div>
                </CardHeader>
                {!isLocked && (
                  <CardContent className="ml-10">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Concepts Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {task.concepts.map(c => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
                      </div>
                    </div>
                    {task.hints.length > 0 && (
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="text-sm font-semibold mb-1">Hints:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {task.hints.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                )}
                {!isLocked && !isCompleted && (
                  <CardFooter className="ml-10 pt-0">
                    <Button onClick={() => markTaskComplete(task.id)}>
                      Mark as Complete <CheckCircle2 className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                )}
              </Card>
            );
          })}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
