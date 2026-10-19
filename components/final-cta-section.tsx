"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Code2, Flame } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function FinalCtaSection() {
  return (
    <section className="py-24 bg-[#060913] relative z-10 overflow-hidden border-t border-cyan-500/10">
      {/* Background glow flares */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.2),rgba(168,85,247,0.15),transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf806_1px,transparent_1px),linear-gradient(to_bottom,#38bdf806_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Start Today
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Level Up Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 drop-shadow-[0_0_30px_rgba(56,189,248,0.4)]">
              Engineering Career?
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers mastering DSA, Java, Python, and Full-Stack Engineering with DeepCodeWarriors. 100% free, interactive, and structured for real growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-8 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] transition-all"
            >
              <Link href="/courses/dsa">
                <Flame className="w-4 h-4 mr-2 text-amber-400" /> Start DSA Path Free
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base font-semibold px-8 h-12 rounded-xl border-cyan-500/30 bg-slate-900/80 hover:bg-cyan-500/10 text-cyan-200 hover:text-white"
            >
              <Link href="/courses">
                Explore All Curriculums <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
