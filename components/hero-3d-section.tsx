"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Terminal, Code2, Play, CheckCircle2, Flame, Layers } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Hero3DCanvas } from "@/components/hero-3d-canvas";

const CODE_SNIPPETS = {
  dsa: {
    language: "Java • DSA",
    filename: "BinarySearchTree.java",
    code: `public class BinarySearchTree {
    // Verified O(log n) Search & Insert
    public TreeNode insert(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        if (val < root.val) root.left = insert(root.left, val);
        else root.right = insert(root.right, val);
        return root;
    }
    // Master 110 lessons & 1,100 MCQs
}`,
    output: "✓ BST balanced & verified. Runtime: 0ms (100% faster)",
  },
  java: {
    language: "Core Java",
    filename: "EnterpriseService.java",
    code: `@RestController
@RequestMapping("/api/v1/warriors")
public class DeveloperController {
    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getSkills() {
        return ResponseEntity.ok(
            List.of("Spring Boot", "Microservices", "Kafka")
        );
    }
}`,
    output: "✓ Spring Boot container started on port 8080 (JVM active)",
  },
  python: {
    language: "Python",
    filename: "neural_pipeline.py",
    code: `import numpy as np

def train_engineer(skills: list[str]) -> dict:
    """Master Python, Automation, and Machine Learning."""
    readiness = sum([1.0 for s in skills if s != "naive"])
    return {
        "status": "Production Ready",
        "accuracy": f"{min(100, readiness * 25)}%"
    }`,
    output: "✓ Model evaluation: 99.8% precision across test cases",
  },
  flutter: {
    language: "Flutter • Dart",
    filename: "portfolio_app.dart",
    code: `Widget build(BuildContext context) {
  return Scaffold(
    backgroundColor: const Color(0xFF060913),
    body: Center(
      child: ElectricCard(
        title: "Cross-Platform Mastery",
        subtitle: "iOS • Android • Web • Desktop",
      ),
    ),
  );
}`,
    output: "✓ Flutter Engine running at 120 FPS on all targets",
  },
  web: {
    language: "Modern Web",
    filename: "FullStackApp.tsx",
    code: `export function FutureDeveloper() {
  const [mastery, setMastery] = useState(100);
  return (
    <div className="bg-navy-950 text-cyan-400">
      <h1>Next.js 14 + TailwindCSS + Three.js</h1>
      <p>Building scalable enterprise web platforms</p>
    </div>
  );
}`,
    output: "✓ Next.js App Router static bundle compiled successfully",
  },
};

type LanguageKey = keyof typeof CODE_SNIPPETS;

export function Hero3DSection() {
  const [activeTab, setActiveTab] = useState<LanguageKey>("dsa");
  const snippet = CODE_SNIPPETS[activeTab];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#060913] text-foreground pt-12 pb-20">
      {/* Three.js 3D Interactive WebGL Canvas */}
      <Hero3DCanvas />

      {/* Cybernetic ambient radial glows & subtle grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.18),rgba(168,85,247,0.12),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf808_1px,transparent_1px),linear-gradient(to_bottom,#38bdf808_1px,transparent_1px)] bg-[size:36px_36px] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Value Proposition & Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 text-left space-y-6"
          >
            {/* High-tech Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.15)]">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-cyan-300">
                Next-Gen Developer Platform
              </span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-white">Master Coding.</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
                Build Your Future.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Step into an immersive, interactive learning universe. Master{" "}
              <span className="text-cyan-300 font-semibold">Java</span>,{" "}
              <span className="text-blue-300 font-semibold">Python</span>,{" "}
              <span className="text-purple-300 font-semibold">Flutter</span>,{" "}
              <span className="text-emerald-300 font-semibold">Web Development</span>, and a complete{" "}
              <span className="text-amber-300 font-semibold">110-Lesson DSA Path</span> designed for technical coding interviews.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="text-base font-semibold px-8 h-13 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:shadow-[0_0_35px_rgba(56,189,248,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Link href="/courses">
                  Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base font-semibold px-8 h-13 rounded-xl border-cyan-500/40 bg-slate-900/60 hover:bg-cyan-500/10 text-cyan-200 hover:text-white backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:border-cyan-400 transition-all"
              >
                <Link href="/courses/dsa">
                  <Flame className="w-4 h-4 mr-2 text-amber-400" /> Start DSA Path
                </Link>
              </Button>
            </div>

            {/* Key Value Pills */}
            <div className="pt-4 flex flex-wrap gap-2.5">
              {[
                { label: "110 DSA Lessons", color: "border-cyan-500/30 text-cyan-300" },
                { label: "1,100+ Real MCQs", color: "border-purple-500/30 text-purple-300" },
                { label: "Interactive Coding", color: "border-blue-500/30 text-blue-300" },
                { label: "112 FAANG Questions", color: "border-amber-500/30 text-amber-300" },
                { label: "100% Free Forever", color: "border-emerald-500/30 text-emerald-300" },
              ].map((pill, i) => (
                <div
                  key={i}
                  className={`text-xs px-3 py-1.5 rounded-lg bg-slate-900/70 backdrop-blur-md border ${pill.color} font-mono flex items-center gap-1.5`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 opacity-80" />
                  <span>{pill.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Code Hologram Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Glowing Backdrop Mesh */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-purple-600/30 to-blue-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

            {/* Floating Terminal Card */}
            <div className="relative rounded-2xl border border-cyan-500/30 bg-[#0a0f1d]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              
              {/* Terminal Titlebar with Language Tabs */}
              <div className="px-4 py-3 bg-[#0f172a]/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    {snippet.filename}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-cyan-300 font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                  {snippet.language}
                </div>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center px-3 py-2 bg-[#090d16] border-b border-white/5 gap-1.5 overflow-x-auto text-xs">
                {(["dsa", "java", "python", "flutter", "web"] as LanguageKey[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-md font-mono text-[11px] font-medium transition-all uppercase tracking-wider ${
                      activeTab === tab
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                  >
                    {tab === "dsa" ? "⚡ DSA" : tab}
                  </button>
                ))}
              </div>

              {/* Code Display Area */}
              <div className="p-5 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 bg-[#080d1a]/95">
                <pre className="whitespace-pre">
                  <code>{snippet.code}</code>
                </pre>
              </div>

              {/* Output Status Bar */}
              <div className="px-4 py-2.5 bg-[#0b1222] border-t border-cyan-500/20 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 flex items-center gap-1.5 truncate">
                  <Play className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                  {snippet.output}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest pl-2">
                  Live Engine
                </span>
              </div>
            </div>

            {/* Floating Glass Stats Badge */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/90 border border-purple-500/40 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-wide">6 Complete Paths</p>
                <p className="text-[11px] text-slate-400">Beginner to Senior Engineer</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
