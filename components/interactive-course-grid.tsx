"use client";

import { useState } from "react";
import { Course } from "@/lib/data/course-schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Layers, Sparkles, CheckCircle2, Flame, Award } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface InteractiveCourseGridProps {
  courses: Course[];
}

export function InteractiveCourseGrid({ courses }: InteractiveCourseGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Computer Science", "Programming Languages", "Mobile Development", "Web Development"];

  const filteredCourses = activeCategory === "All"
    ? courses
    : courses.filter((c) => {
        if (activeCategory === "Computer Science") return c.slug === "dsa";
        if (activeCategory === "Programming Languages") return c.slug === "java" || c.slug === "advanced-java" || c.slug === "python";
        if (activeCategory === "Mobile Development") return c.slug === "flutter";
        if (activeCategory === "Web Development") return c.slug === "web-development";
        return true;
      });

  const getCourseGlow = (slug: string) => {
    switch (slug) {
      case "dsa":
        return {
          badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
          glow: "group-hover:border-cyan-500/60 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]",
          accent: "from-cyan-500 to-blue-600",
          tag: "⚡ 110 Lessons • 1,100 MCQs",
        };
      case "java":
      case "advanced-java":
        return {
          badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          glow: "group-hover:border-amber-500/60 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
          accent: "from-amber-500 to-orange-600",
          tag: "☕ Enterprise Backend",
        };
      case "python":
        return {
          badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
          glow: "group-hover:border-blue-500/60 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
          accent: "from-blue-500 to-indigo-600",
          tag: "🐍 Automation & Scripting",
        };
      case "flutter":
        return {
          badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
          glow: "group-hover:border-purple-500/60 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
          accent: "from-purple-500 to-pink-600",
          tag: "📱 Cross-Platform UI",
        };
      default:
        return {
          badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
          glow: "group-hover:border-emerald-500/60 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
          accent: "from-emerald-500 to-teal-600",
          tag: "🌐 Full-Stack Modern Web",
        };
    }
  };

  return (
    <section className="py-24 bg-[#080d1a] relative z-10 border-t border-cyan-500/10">
      {/* Background cyber lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Structured Learning Paths
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Curriculums</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mt-2 font-normal">
              Step-by-step interactive paths with genuine quizzes, hands-on tasks, and coding challenges.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-white/10 hover:border-cyan-500/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => {
            const styling = getCourseGlow(course.slug);
            const totalSubtopics = course.topics.reduce((acc, t) => acc + t.subtopics.length, 0);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative"
              >
                {/* Glow Border Gradient */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-md" />

                <Card className={`relative h-full flex flex-col rounded-2xl bg-[#0c1222]/90 border border-slate-800 backdrop-blur-xl transition-all duration-300 ${styling.glow} overflow-hidden`}>
                  
                  {/* Top Header */}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md ${styling.badge}`}>
                        {course.level}
                      </Badge>
                      <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-white/5">
                        {styling.tag}
                      </span>
                    </div>

                    <CardTitle className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {course.title}
                    </CardTitle>

                    <CardDescription className="text-slate-400 text-sm line-clamp-2 mt-1 leading-relaxed">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  {/* Body Content */}
                  <CardContent className="mt-auto pt-4 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-5">
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{course.topics.length} Modules</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                        <span>{totalSubtopics} Lessons</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full h-11 rounded-xl bg-slate-900/90 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-slate-200 hover:text-slate-950 font-semibold border border-cyan-500/30 hover:border-transparent transition-all shadow-sm group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                    >
                      <Link href={`/courses/${course.slug}`}>
                        <span>Start Learning</span>
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 text-center">
          <Button
            asChild
            variant="ghost"
            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 font-mono text-sm"
          >
            <Link href="/courses">
              View All 6 Curriculum Catalogs & Syllabi <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
