"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { CodingProblem, TOPIC_OPTIONS } from "@/lib/data/coding-challenges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  Code2,
  Trophy,
  Sparkles,
  Lock,
  Layers,
  Filter,
  Check,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getUserPracticeStats } from "@/lib/data/coding-practice-service";

interface Props {
  problems: CodingProblem[];
  dailyChallenge: CodingProblem;
}

export function CodingPracticeClient({ problems, dailyChallenge }: Props) {
  const { user, loginWithGoogle } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"all" | "solved">("all");
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Solved and attempted problems (synced from Firestore when authenticated, or guest localStorage)
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [attemptedIds, setAttemptedIds] = useState<string[]>([]);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      setIsLoadingStats(true);
      if (user) {
        try {
          const stats = await getUserPracticeStats(user.uid);
          if (isMounted) {
            setSolvedIds(stats.solvedProblemIds);
            setAttemptedIds(stats.attemptedProblemIds);
            setCurrentStreak(stats.currentStreak);
          }
        } catch (err) {
          console.error("Error loading user practice stats from Firestore:", err);
          // Fallback to local storage if network fails
          const stored = localStorage.getItem(`dw_practice_${user.uid}`);
          if (stored && isMounted) {
            const parsed = JSON.parse(stored);
            setSolvedIds(parsed.solved || []);
            setAttemptedIds(parsed.attempted || []);
          }
        }
      } else {
        // Guest mode fallback
        try {
          const stored = localStorage.getItem("dw_practice_guest");
          if (stored && isMounted) {
            const parsed = JSON.parse(stored);
            setSolvedIds(parsed.solved || []);
            setAttemptedIds(parsed.attempted || []);
            setCurrentStreak(parsed.solved?.length > 0 ? 1 : 0);
          } else if (isMounted) {
            setSolvedIds([]);
            setAttemptedIds([]);
            setCurrentStreak(0);
          }
        } catch (e) {
          console.error(e);
        }
      }
      if (isMounted) setIsLoadingStats(false);
    }

    loadStats();
    return () => {
      isMounted = false;
    };
  }, [user]);

  const filteredProblems = useMemo(() => {
    return problems.filter((prob) => {
      const matchesSearch =
        prob.title.toLowerCase().includes(search.toLowerCase()) ||
        prob.topicLabel.toLowerCase().includes(search.toLowerCase());
      const matchesDiff =
        selectedDifficulty === "all" ||
        prob.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      const matchesTopic =
        selectedTopic === "all" || prob.topic === selectedTopic;
      const matchesTab =
        activeTab === "all" || (activeTab === "solved" && solvedIds.includes(prob.id));

      return matchesSearch && matchesDiff && matchesTopic && matchesTab;
    });
  }, [problems, search, selectedDifficulty, selectedTopic, activeTab, solvedIds]);

  const difficultyColors = {
    Easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    Medium: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    Hard: "text-rose-400 bg-rose-500/10 border-rose-500/30",
  };

  const solvedCount = solvedIds.length;
  const attemptedCount = attemptedIds.length;
  const totalCount = problems.length;
  const completionPercentage = Math.round((solvedCount / (totalCount || 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-purple-950/40 p-6 sm:p-8 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Algorithmic Practice Arena
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Coding Practice & Challenges
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Master Data Structures & Algorithms with curated starter problems in Java
              and Python. Test edge cases, analyze time/space bounds, and track verified
              progress across your personal developer roadmap.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-center min-w-[95px] shadow-sm">
              <div className="flex items-center justify-center text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-white">
                {isLoadingStats ? "..." : solvedCount}
                <span className="text-xs text-slate-500 font-normal">/{totalCount}</span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Solved</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-center min-w-[95px] shadow-sm">
              <div className="flex items-center justify-center text-orange-400 mb-1">
                <Flame className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-white">
                {isLoadingStats ? "..." : `${currentStreak}d`}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Streak</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-center min-w-[95px] shadow-sm">
              <div className="flex items-center justify-center text-cyan-400 mb-1">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-white">
                {isLoadingStats ? "..." : `${completionPercentage}%`}
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Progress</div>
            </div>
          </div>
        </div>

        {/* Guest Progress Alert */}
        {!user && (
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>
                Browsing as <strong>Guest</strong>. Your practice solutions will only be stored locally in this browser.
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => loginWithGoogle()}
              className="text-xs h-7 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              <UserCheck className="w-3.5 h-3.5 mr-1.5" />
              Sign in to sync with Firestore
            </Button>
          </div>
        )}
      </div>

      {/* Daily Challenge Spotlight */}
      {dailyChallenge && (
        <div className="relative rounded-xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-slate-900/70 to-slate-900/70 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg shadow-orange-950/20">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-orange-400 text-orange-400" />
              Daily Coding Challenge
            </div>
            <h3 className="text-xl font-bold text-white flex flex-wrap items-center gap-2.5">
              {dailyChallenge.title}
              <Badge
                variant="outline"
                className={`text-xs font-medium px-2 py-0.5 ${difficultyColors[dailyChallenge.difficulty]}`}
              >
                {dailyChallenge.difficulty}
              </Badge>
              <Badge
                variant="secondary"
                className="text-xs bg-slate-800 text-slate-300"
              >
                {dailyChallenge.topicLabel}
              </Badge>
              {solvedIds.includes(dailyChallenge.id) && (
                <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <Check className="w-3 h-3" /> Solved
                </span>
              )}
            </h3>
            <p className="text-slate-400 text-sm line-clamp-2 max-w-2xl">
              {dailyChallenge.description.slice(0, 160)}...
            </p>
          </div>
          <Button
            asChild
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium shrink-0 shadow-md shadow-orange-950"
          >
            <Link href={`/coding-practice/${dailyChallenge.slug}`}>
              Solve Daily Challenge
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      )}

      {/* Navigation Tabs (All Problems vs Solved Problems) */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 text-sm font-semibold transition-all relative flex items-center gap-2 ${
            activeTab === "all"
              ? "text-cyan-400 border-b-2 border-cyan-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          All Problems
          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full ml-1 font-mono">
            {problems.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("solved")}
          className={`pb-3 text-sm font-semibold transition-all relative flex items-center gap-2 ${
            activeTab === "solved"
              ? "text-cyan-400 border-b-2 border-cyan-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Solved Problems
          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full ml-1 font-mono">
            {solvedCount}
          </span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search problems by name or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-900/80 border-slate-800 text-white placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {["all", "Easy", "Medium", "Hard"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? "bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20"
                    : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
                }`}
              >
                {diff === "all" ? "All Levels" : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {TOPIC_OPTIONS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-all ${
                selectedTopic === topic.id
                  ? "bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-sm"
                  : "bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-slate-800/60"
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Table / List */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 backdrop-blur-md overflow-hidden shadow-xl">
        <div className="grid grid-cols-12 px-6 py-3.5 bg-slate-900/80 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <div className="col-span-1">Status</div>
          <div className="col-span-6 sm:col-span-5">Title</div>
          <div className="col-span-2 hidden sm:block">Topic</div>
          <div className="col-span-2">Difficulty</div>
          <div className="col-span-3 sm:col-span-2 text-right">Action</div>
        </div>

        {filteredProblems.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Code2 className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-base font-semibold text-slate-300">
              {activeTab === "solved" ? "No solved problems yet" : "No problems found"}
            </h4>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              {activeTab === "solved"
                ? "Start solving starter challenges in Java or Python to build your portfolio."
                : "Try adjusting your search criteria or topic filters to view available coding challenges."}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setSelectedDifficulty("all");
                setSelectedTopic("all");
                setActiveTab("all");
              }}
              className="mt-2 text-xs border-slate-700 text-slate-300"
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {filteredProblems.map((prob) => {
              const isSolved = solvedIds.includes(prob.id);
              const isAttempted = attemptedIds.includes(prob.id);

              return (
                <div
                  key={prob.id}
                  className="grid grid-cols-12 px-6 py-4 items-center hover:bg-slate-900/40 transition-colors group"
                >
                  {/* Status Indicator */}
                  <div className="col-span-1">
                    {isSolved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isAttempted ? (
                      <Clock className="w-4 h-4 text-amber-400" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full border border-slate-600 bg-slate-800" />
                    )}
                  </div>

                  {/* Title & Daily Badge */}
                  <div className="col-span-6 sm:col-span-5 pr-2">
                    <Link
                      href={`/coding-practice/${prob.slug}`}
                      className="font-medium text-slate-200 group-hover:text-cyan-400 transition-colors inline-flex items-center gap-2 text-sm"
                    >
                      {prob.title}
                      {prob.isDaily && (
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          Daily
                        </span>
                      )}
                    </Link>
                  </div>

                  {/* Topic */}
                  <div className="col-span-2 hidden sm:block">
                    <span className="text-xs text-slate-400 font-mono">
                      {prob.topicLabel}
                    </span>
                  </div>

                  {/* Difficulty */}
                  <div className="col-span-2">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium inline-block border ${difficultyColors[prob.difficulty]}`}
                    >
                      {prob.difficulty}
                    </span>
                  </div>

                  {/* Action Link */}
                  <div className="col-span-3 sm:col-span-2 text-right">
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      className="text-xs text-cyan-400 hover:text-white hover:bg-cyan-500/20 group-hover:translate-x-1 transition-all"
                    >
                      <Link href={`/coding-practice/${prob.slug}`}>
                        {isSolved ? "Review" : "Solve"}
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
