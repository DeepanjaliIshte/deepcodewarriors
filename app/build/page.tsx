"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hammer, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { MOCK_PROJECTS } from "@/lib/data/mock-projects";
import { useAuth } from "@/context/AuthContext";

export default function BuildModePage() {
  const { user } = useAuth();
  
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 border-b border-border pb-8">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Hammer className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Build Mode</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Learn by building real-world projects. Tasks unlock progressively as you complete them, guiding you through the development process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROJECTS.map((project, index) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={project.level === "Beginner" ? "secondary" : "default"}>
                    {project.level}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">{project.tasks.length} tasks</span>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border">
                <Button asChild className="w-full">
                  <Link href={`/build/${project.id}`}>
                    Start Project <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {/* Coming Soon Project */}
          <Card className="flex flex-col opacity-60">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline">Advanced</Badge>
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-xl">Full Stack E-Commerce App</CardTitle>
              <CardDescription className="mt-2">Build a complete React + Spring Boot application.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">React</Badge>
                <Badge variant="outline" className="text-xs">Spring Boot</Badge>
                <Badge variant="outline" className="text-xs">PostgreSQL</Badge>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-border">
              <Button disabled variant="secondary" className="w-full">Coming Soon</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
