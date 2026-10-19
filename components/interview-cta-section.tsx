"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Trophy, CheckCircle2, ShieldCheck, Flame, BrainCircuit, Sparkles } from "lucide-react";
import Link from "next/link";

export function InterviewCtaSection() {
  return (
    <section className="py-24 bg-[#060a14] relative z-10 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#0c1326] via-[#090e1c] to-[#120f26] border border-cyan-500/30 shadow-[0_0_50px_rgba(56,189,248,0.15)] overflow-hidden">
          
          {/* Cyber light flare */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                <BrainCircuit className="w-3.5 h-3.5" /> Technical Interview Engine
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ace Coding Interviews with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Confidence
                </span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Practice verified FAANG interview questions covering Arrays, Two Pointers, Trees, Graphs, Dijkstra, Dynamic Programming, and Spring Microservices. Every problem includes full Java solutions, asymptotic analysis, and interviewer expectations.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                {[
                  { value: "112+", label: "Curated DSA Problems" },
                  { value: "1,100+", label: "Verified MCQs" },
                  { value: "100%", label: "Solution Walkthroughs" },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                    <p className="text-2xl font-bold text-cyan-300 font-mono">{stat.value}</p>
                    <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold shadow-[0_0_25px_rgba(56,189,248,0.35)]"
                >
                  <Link href="/interview-prep">
                    Start Interview Prep <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-500/10"
                >
                  <Link href="/interview">
                    Interactive Mock Q&A
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Interactive Problem Card Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl p-6 bg-[#080d1a] border border-cyan-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" /> FAANG Featured Question
                  </span>
                  <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-300 bg-amber-500/10">
                    Medium
                  </Badge>
                </div>

                <h4 className="text-base font-bold text-white">
                  Two Sum II — Input Array is Sorted
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Given a 1-indexed sorted integer array, find two numbers that add up to a target using optimal $O(n)$ time and $O(1)$ space.
                </p>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300">
                  <span className="text-slate-500 block mb-1">// Two-Pointer Approach</span>
                  <code>{`int l = 0, r = nums.length - 1;
while (l < r) {
    int sum = nums[l] + nums[r];
    if (sum == target) return new int[]{l + 1, r + 1};
    else if (sum < target) l++;
    else r--;
}`}</code>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span>Time: <strong className="text-emerald-400">O(n)</strong></span>
                  <span>Space: <strong className="text-emerald-400">O(1)</strong></span>
                  <span className="text-cyan-400">Verified Java</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
