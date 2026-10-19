"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  const codeSnippet = `public class DeepCodeWarriors {
    public static void main(String[] args) {
        System.out.println("Master Java.");
        System.out.println("Build Real Skills.");
        
        Developer you = new Developer();
        you.learn("Spring Boot");
        you.getHired();
    }
}`

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-3xl opacity-50 mix-blend-screen" />
        {/* Subtle developer grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance mb-6 leading-tight">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Coding</span>.<br/>Build Real Skills.
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mb-8 leading-relaxed">
              Learn software engineering from fundamentals to advanced development through practical programs, structured tutorials, and interview preparation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="text-lg px-8 shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_25px_rgba(255,107,0,0.5)] transition-shadow">
                <Link href="/tutorials">
                  Start Learning <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 border-primary/50 hover:bg-primary/10">
                <Link href="/jobs">
                  Explore Latest Jobs
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "200+", label: "Coding Programs" },
                { number: "100+", label: "Tutorials" },
                { number: "500+", label: "Interview Qs" },
                { number: "Free", label: "Resources" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-left"
                >
                  <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Animated Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block relative group perspective-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-50" />
            <div className="relative bg-[#0d1117] border border-border/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
              <div className="flex items-center px-4 py-3 border-b border-white/10 bg-[#161b22]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center flex items-center justify-center space-x-2">
                  <Terminal className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-mono">index.ts</span>
                </div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                  <code className="text-purple-400">const</code> <code className="text-yellow-300">platform</code> = <code className="text-green-400">"DeepCodeWarriors"</code>;
                  {"\n"}
                  {"\n"}
                  <code className="text-purple-400">async function</code> <code className="text-blue-400">masterCoding</code>() {"{"}
                  {"\n"}
                  {"    "}console.<code className="text-blue-400">log</code>(<code className="text-green-400">"Learn Software Engineering"</code>);
                  {"\n"}
                  {"    "}console.<code className="text-blue-400">log</code>(<code className="text-green-400">"Build Real Skills"</code>);
                  {"\n\n"}
                  {"    "}<code className="text-purple-400">const</code> you = <code className="text-purple-400">new</code> <code className="text-yellow-300">Developer</code>();
                  {"\n"}
                  {"    "}<code className="text-purple-400">await</code> you.<code className="text-blue-400">learn</code>([<code className="text-green-400">"React"</code>, <code className="text-green-400">"Node.js"</code>, <code className="text-green-400">"Python"</code>, <code className="text-green-400">"Java"</code>]);
                  {"\n"}
                  {"    "}<code className="text-purple-400">await</code> you.<code className="text-blue-400">getHired</code>();
                  {"\n"}
                  {"}"}
                </pre>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
