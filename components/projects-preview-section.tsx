"use client";

import { MOCK_PROJECTS } from "@/lib/data/mock-projects";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, CheckCircle2, Terminal, Sparkles, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ProjectsPreviewSection() {
  return (
    <section className="py-24 bg-[#080d1a] relative z-10 border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5" /> Hands-On Engineering
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Build Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Software Projects</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mt-2 font-normal">
              Put theory into practice. Follow structured milestones with real database persistence, APIs, and clean code principles.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="rounded-xl border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-500/10"
          >
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />

              <Card className="relative h-full flex flex-col rounded-2xl bg-[#0c1222]/90 border border-slate-800 backdrop-blur-xl group-hover:border-purple-500/50 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs font-mono bg-purple-500/10 text-purple-300 border-purple-500/30">
                      {project.level}
                    </Badge>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-cyan-400" />
                      {project.tasks.length} Milestone Tasks
                    </span>
                  </div>

                  <CardTitle className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </CardTitle>

                  <CardDescription className="text-slate-400 text-sm mt-1 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-auto pt-4 border-t border-slate-800/80">
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full h-10 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 text-slate-200 hover:text-white font-medium border border-purple-500/30 hover:border-transparent transition-all"
                  >
                    <Link href={`/build/${project.id}`}>
                      <span>Build This Project</span>
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Third Showcase Card for DSA & System Design Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />

            <Card className="relative h-full flex flex-col rounded-2xl bg-[#0c1222]/90 border border-slate-800 backdrop-blur-xl group-hover:border-cyan-500/50 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs font-mono bg-cyan-500/10 text-cyan-300 border-cyan-500/30">
                    Advanced
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    10 Algorithm Drills
                  </span>
                </div>

                <CardTitle className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  High-Throughput LRU Cache & Graph Routing
                </CardTitle>

                <CardDescription className="text-slate-400 text-sm mt-1 leading-relaxed">
                  Design a thread-safe O(1) LRU Cache and implement Dijkstra network routing algorithms in Java.
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-auto pt-4 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["Java", "Doubly Linked List", "HashMap", "Concurrency"].map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button
                  asChild
                  className="w-full h-10 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-slate-200 hover:text-slate-950 font-medium border border-cyan-500/30 hover:border-transparent transition-all"
                >
                  <Link href="/courses/dsa">
                    <span>Explore Algorithm Labs</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
