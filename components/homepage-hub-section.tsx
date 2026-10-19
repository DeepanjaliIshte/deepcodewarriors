"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Terminal,
  Flame,
  Briefcase,
  Newspaper,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function HomepageHubSection() {
  const { user } = useAuth();

  const hubs = [
    {
      title: user ? "Continue Learning" : "Explore Courses",
      subtitle: user ? "Pick up where you left off" : "6 complete engineering curricula",
      href: user ? "/dashboard" : "/courses",
      icon: BookOpen,
      color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400",
      btnText: user ? "Resume" : "Explore",
    },
    {
      title: "Coding Practice",
      subtitle: "Arrays, Trees, Graphs & DP challenges",
      href: "/coding-practice",
      icon: Terminal,
      color: "from-cyan-500/20 to-teal-500/10 border-cyan-500/30 text-cyan-400",
      btnText: "Start Practice",
    },
    {
      title: "Today's Challenge",
      subtitle: "Daily problem streak & solutions",
      href: "/coding-practice",
      icon: Flame,
      color: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-400",
      btnText: "Solve Now",
    },
    {
      title: "Interview Prep",
      subtitle: "200+ FAANG technical questions",
      href: "/interview-prep",
      icon: Briefcase,
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400",
      btnText: "Prepare",
    },
    {
      title: "Developer News",
      subtitle: "Frameworks, AI tools, and releases",
      href: "/news",
      icon: Newspaper,
      color: "from-indigo-500/20 to-blue-500/10 border-indigo-500/30 text-indigo-400",
      btnText: "Read Updates",
    },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {hubs.map((hub) => (
          <Link
            key={hub.title}
            href={hub.href}
            className={`group rounded-xl border bg-gradient-to-br ${hub.color} p-4 backdrop-blur-xl hover:scale-[1.02] transition-all flex flex-col justify-between`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center">
                  <hub.icon className="w-4 h-4" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {hub.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-snug line-clamp-1">
                  {hub.subtitle}
                </p>
              </div>
            </div>

            <div className="pt-3 mt-2 border-t border-slate-800/60 text-[11px] font-semibold flex items-center justify-between">
              <span className="text-slate-300">{hub.btnText}</span>
              <span className="text-[10px] uppercase font-mono tracking-wider opacity-60">Go</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
