"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Code2, Cpu, Rocket, Terminal, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ROADMAP_STEPS = [
  {
    phase: "Phase 01",
    title: "Programming Core Foundations",
    description: "Build deep language fluency in Core Java, Python, or Dart. Master object-oriented programming, memory paradigms, and syntax.",
    badge: "Step 1",
    color: "from-blue-500 to-cyan-400",
    border: "border-cyan-500/30",
    glow: "shadow-[0_0_20px_rgba(56,189,248,0.2)]",
    icon: Code2,
    link: "/courses/java",
    skills: ["OOP Principles", "JVM / Bytecode", "Exceptions", "Collections"],
  },
  {
    phase: "Phase 02",
    title: "Data Structures & Algorithms",
    description: "Master our comprehensive 110-lesson curriculum covering Big O, Linked Lists, Trees, Heaps, Graphs, and Dynamic Programming.",
    badge: "Step 2",
    color: "from-cyan-400 to-emerald-400",
    border: "border-cyan-400/40",
    glow: "shadow-[0_0_25px_rgba(0,229,255,0.25)]",
    icon: Cpu,
    link: "/courses/dsa",
    skills: ["110 Lessons", "1,100 MCQs", "Two Pointers & Graphs", "DP Optimization"],
  },
  {
    phase: "Phase 03",
    title: "Architecture & Frameworks",
    description: "Advance into enterprise application development with Spring Boot microservices, Next.js 14 full-stack platforms, and Flutter mobile apps.",
    badge: "Step 3",
    color: "from-purple-500 to-indigo-400",
    border: "border-purple-500/30",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    icon: Rocket,
    link: "/courses/advanced-java",
    skills: ["Spring Boot", "REST & GraphQL", "Next.js App Router", "State Management"],
  },
  {
    phase: "Phase 04",
    title: "Production Projects & Portfolios",
    description: "Construct end-to-end applications from scratch with database persistence, authentication, and continuous deployment workflows.",
    badge: "Step 4",
    color: "from-amber-400 to-orange-500",
    border: "border-amber-500/30",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.2)]",
    icon: Terminal,
    link: "/projects",
    skills: ["Employee Management", "API Gateway", "Database Design", "Clean Architecture"],
  },
  {
    phase: "Phase 05",
    title: "Technical Interview Mastery",
    description: "Refine your problem-solving under real technical interview conditions with 112+ curated FAANG questions and complexity reviews.",
    badge: "Step 5",
    color: "from-rose-500 to-purple-500",
    border: "border-rose-500/30",
    glow: "shadow-[0_0_25px_rgba(244,63,94,0.25)]",
    icon: Trophy,
    link: "/interview-prep",
    skills: ["Mock Assessments", "Live Coding Drills", "System Design", "Behavioral Insights"],
  },
];

export function RoadmapSection() {
  return (
    <section className="py-24 bg-[#060a14] relative z-10 overflow-hidden">
      {/* Ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.03),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Career Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The Engineer's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Roadmap</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3 font-normal">
            A battle-tested progression taking you from beginner fundamentals to job-ready software engineer.
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="relative">
          {/* Vertical connecting line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500/40 via-purple-500/40 to-rose-500/40" />

          <div className="space-y-12">
            {ROADMAP_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;

              return (
                <div key={idx} className="relative flex flex-col lg:flex-row items-center gap-8">
                  
                  {/* Left or Right Content */}
                  <div className={`w-full lg:w-1/2 ${isEven ? "lg:pr-12 lg:text-right" : "lg:order-2 lg:pl-12 lg:text-left"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className={`p-6 sm:p-8 rounded-2xl bg-[#0c1222]/90 border ${step.border} backdrop-blur-xl ${step.glow} group hover:border-cyan-400/60 transition-all`}
                    >
                      <div className={`flex items-center gap-2 mb-2 ${isEven ? "lg:justify-end" : "justify-start"}`}>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                          {step.phase}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs font-mono text-slate-400">
                          {step.badge}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                        {step.title}
                      </h3>

                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Skills Tags */}
                      <div className={`flex flex-wrap gap-2 mb-6 ${isEven ? "lg:justify-end" : "justify-start"}`}>
                        {step.skills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-xs px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-lg border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-300"
                      >
                        <Link href={step.link}>
                          Explore {step.title.split(" ")[0]} <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a0f1d] border-2 border-cyan-400 items-center justify-center z-10 shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>

                  {/* Empty Spacer Column */}
                  <div className={`hidden lg:block w-1/2 ${isEven ? "lg:order-2" : "lg:order-1"}`} />

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
