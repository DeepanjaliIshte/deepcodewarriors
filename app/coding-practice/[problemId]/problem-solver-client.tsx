"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CodingProblem } from "@/lib/data/coding-challenges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Play,
  Send,
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Terminal,
  ShieldAlert,
  Loader2,
  Code2,
  Settings,
  Sparkles,
  Info,
  Clock,
  Check,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ExecutionResponse } from "@/lib/services/code-runner";
import {
  saveCodingProblemProgress,
  getProblemUserProgress,
} from "@/lib/data/coding-practice-service";

interface Props {
  problem: CodingProblem;
}

export function ProblemSolverClient({ problem }: Props) {
  const { user } = useAuth();
  const [language, setLanguage] = useState<"java" | "python">("java");
  const [code, setCode] = useState<string>(problem.starterCode.java);
  const [activeTab, setActiveTab] = useState<"description" | "hints">("description");
  const [consoleTab, setConsoleTab] = useState<"testcases" | "output">("testcases");
  const [selectedTestCase, setSelectedTestCase] = useState<number>(0);

  // Execution status states
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResponse | null>(null);
  const [savedStatus, setSavedStatus] = useState<"unattempted" | "attempted" | "solved">("unattempted");
  const [isSavedInCloud, setIsSavedInCloud] = useState(false);

  // Load previous solution / saved status
  useEffect(() => {
    let isMounted = true;
    async function loadSavedData() {
      if (user) {
        try {
          const prev = await getProblemUserProgress(user.uid, problem.id);
          if (prev && isMounted) {
            setSavedStatus(prev.status);
            setIsSavedInCloud(true);
            if (prev.lastSubmittedCode && prev.language === language) {
              setCode(prev.lastSubmittedCode);
            }
          }
        } catch (e) {
          console.warn("Could not load previous progress:", e);
        }
      } else {
        // Check localStorage for guest
        try {
          const stored = localStorage.getItem("dw_practice_guest");
          if (stored && isMounted) {
            const parsed = JSON.parse(stored);
            if (parsed.solved?.includes(problem.id)) {
              setSavedStatus("solved");
            } else if (parsed.attempted?.includes(problem.id)) {
              setSavedStatus("attempted");
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    loadSavedData();
    return () => {
      isMounted = false;
    };
  }, [user, problem.id, language]);

  // Sync starter code when language switches (only if unmodified or explicit switch)
  const handleLanguageChange = (newLang: "java" | "python") => {
    setLanguage(newLang);
    setCode(problem.starterCode[newLang]);
    setExecutionResult(null);
  };

  const handleReset = () => {
    setCode(problem.starterCode[language]);
    setExecutionResult(null);
  };

  const handleRun = async (isSubmission = false) => {
    setIsRunning(true);
    setConsoleTab("output");
    setExecutionResult(null);

    // Track attempt locally for instant UI update
    if (savedStatus === "unattempted") {
      setSavedStatus("attempted");
    }

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: problem.id,
          language,
          code,
          isSubmission,
        }),
      });

      const data: ExecutionResponse = await res.json();
      setExecutionResult(data);

      const isAccepted = data.overallStatus === "ACCEPTED";
      const statusToSave = isAccepted && isSubmission ? "solved" : "attempted";

      if (isAccepted && isSubmission) {
        setSavedStatus("solved");
      }

      // Persist to Firebase Firestore if logged in
      if (user) {
        try {
          await saveCodingProblemProgress(user.uid, problem.id, {
            status: statusToSave,
            language,
            code,
            runtimeMs: data.runtimeMs,
          });
          setIsSavedInCloud(true);
        } catch (fbErr) {
          console.error("Failed to persist to Firestore:", fbErr);
        }
      } else {
        // Persist to Guest LocalStorage
        try {
          const storageKey = "dw_practice_guest";
          const stored = localStorage.getItem(storageKey);
          const parsed = stored ? JSON.parse(stored) : { solved: [], attempted: [] };
          if (!parsed.attempted.includes(problem.id)) {
            parsed.attempted.push(problem.id);
          }
          if (isAccepted && isSubmission && !parsed.solved.includes(problem.id)) {
            parsed.solved.push(problem.id);
          }
          localStorage.setItem(storageKey, JSON.stringify(parsed));
        } catch (lsErr) {
          console.error("Local storage error:", lsErr);
        }
      }
    } catch (err: any) {
      setExecutionResult({
        isConfiguredBackend: false,
        success: false,
        overallStatus: "RUNTIME_ERROR",
        runtimeMs: 0,
        message: err?.message || "Execution request failed to reach the server.",
        testCaseResults: [],
      });
    } finally {
      setIsRunning(false);
    }
  };

  const difficultyColors = {
    Easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    Medium: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    Hard: "text-rose-400 bg-rose-500/10 border-rose-500/30",
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {/* Top Action Bar */}
      <div className="h-14 border-b border-slate-800 bg-slate-950/90 px-4 flex items-center justify-between shrink-0 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <Link href="/coding-practice">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Problem List
            </Link>
          </Button>
          <div className="h-4 w-px bg-slate-800" />
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            {problem.title}
            <Badge
              variant="outline"
              className={`text-[10px] px-2 py-0.5 ${difficultyColors[problem.difficulty]}`}
            >
              {problem.difficulty}
            </Badge>
            {savedStatus === "solved" && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <Check className="w-3 h-3" /> Solved
              </span>
            )}
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => handleLanguageChange("java")}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                language === "java"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Java
            </button>
            <button
              onClick={() => handleLanguageChange("python")}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                language === "python"
                  ? "bg-cyan-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Python
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-slate-400 hover:text-white text-xs h-8"
            title="Reset to starter code"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRun(false)}
            disabled={isRunning}
            className="border-slate-700 bg-slate-900 text-slate-200 hover:text-white text-xs h-8"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin text-cyan-400" />
            ) : (
              <Play className="w-3.5 h-3.5 mr-1 text-cyan-400 fill-cyan-400" />
            )}
            Run Code
          </Button>

          <Button
            size="sm"
            onClick={() => handleRun(true)}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold h-8 shadow-md shadow-emerald-950"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5 mr-1" />
            )}
            Submit Solution
          </Button>
        </div>
      </div>

      {/* Main Split Body: Left Pane Problem Info, Right Pane Editor & Output */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Pane: Problem Description (col-span-5) */}
        <div className="lg:col-span-5 border-r border-slate-800 bg-slate-950/40 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-4 px-6 border-b border-slate-800/80 bg-slate-950/60 shrink-0">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-3 text-xs font-medium border-b-2 transition-all ${
                activeTab === "description"
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`py-3 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === "hints"
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Hints ({problem.hints.length})
            </button>
          </div>

          {/* Pane Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
            {activeTab === "description" ? (
              <>
                {/* Meta details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-white">{problem.title}</h1>
                    {isSavedInCloud && (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        Cloud synced
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs px-2.5 py-0.5 ${difficultyColors[problem.difficulty]}`}
                    >
                      {problem.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                      {problem.topicLabel}
                    </Badge>
                  </div>
                </div>

                {/* Description Body */}
                <div className="whitespace-pre-line leading-relaxed text-slate-300">
                  {problem.description}
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Examples
                  </h4>
                  {problem.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg bg-slate-900/80 border border-slate-800/80 p-3.5 space-y-1.5 font-mono text-xs"
                    >
                      <div className="text-slate-400">
                        <span className="text-slate-500 font-semibold">Input: </span>
                        {ex.input}
                      </div>
                      <div className="text-slate-400">
                        <span className="text-slate-500 font-semibold">Output: </span>
                        <span className="text-emerald-400">{ex.output}</span>
                      </div>
                      {ex.explanation && (
                        <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-800 font-sans">
                          {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Constraints
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 font-mono">
                    {problem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Target Complexity */}
                <div className="rounded-lg bg-cyan-950/20 border border-cyan-800/30 p-3 text-xs space-y-1">
                  <div className="font-semibold text-cyan-300">Expected Complexity:</div>
                  <div className="text-slate-400 flex gap-4">
                    <span>
                      Time: <strong className="text-white">{problem.expectedComplexity.time}</strong>
                    </span>
                    <span>
                      Space: <strong className="text-white">{problem.expectedComplexity.space}</strong>
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Problem Hints</h3>
                {problem.hints.map((hint, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-xs leading-relaxed text-slate-300 space-y-1"
                  >
                    <div className="font-semibold text-orange-400">Hint {i + 1}</div>
                    <p>{hint}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Code Editor + Output Drawer (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col overflow-hidden bg-[#0a0f1d]">
          {/* Editor Header */}
          <div className="h-10 px-4 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
            <span className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              Solution.{language === "java" ? "java" : "py"}
            </span>
            <span className="text-[11px] text-slate-500">
              {user ? "Cloud Sync Enabled" : "Guest Mode (Local)"}
            </span>
          </div>

          {/* Monospace Code Editor Area */}
          <div className="flex-1 relative overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-4 font-mono text-sm bg-transparent text-slate-100 placeholder:text-slate-600 resize-none outline-none focus:ring-0 leading-relaxed overflow-y-auto selection:bg-cyan-500/30"
              placeholder="Write your solution here..."
            />
          </div>

          {/* Bottom Output Console */}
          <div className="h-64 border-t border-slate-800 bg-slate-950 flex flex-col shrink-0">
            {/* Console Tabs */}
            <div className="flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950/80 shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setConsoleTab("testcases")}
                  className={`py-2 text-xs font-semibold transition-all ${
                    consoleTab === "testcases"
                      ? "text-cyan-400 border-b-2 border-cyan-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Sample Test Cases
                </button>
                <button
                  onClick={() => setConsoleTab("output")}
                  className={`py-2 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    consoleTab === "output"
                      ? "text-cyan-400 border-b-2 border-cyan-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Execution Console
                  {executionResult && (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        executionResult.overallStatus === "ACCEPTED"
                          ? "bg-emerald-400"
                          : executionResult.overallStatus === "BACKEND_NOT_CONFIGURED"
                          ? "bg-amber-400"
                          : "bg-rose-400"
                      }`}
                    />
                  )}
                </button>
              </div>

              {executionResult && (
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  {executionResult.runtimeMs > 0 && (
                    <span className="text-slate-500">{executionResult.runtimeMs}ms</span>
                  )}
                  <span>Status:</span>
                  <span
                    className={
                      executionResult.overallStatus === "ACCEPTED"
                        ? "text-emerald-400 font-semibold"
                        : executionResult.overallStatus === "BACKEND_NOT_CONFIGURED"
                        ? "text-amber-400 font-semibold"
                        : "text-rose-400 font-semibold"
                    }
                  >
                    {executionResult.overallStatus}
                  </span>
                </div>
              )}
            </div>

            {/* Console Body */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
              {consoleTab === "testcases" ? (
                <div className="space-y-3">
                  {/* Test case buttons */}
                  <div className="flex items-center gap-2">
                    {problem.testCases
                      .filter((t) => !t.isHidden)
                      .map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedTestCase(i)}
                          className={`px-3 py-1 rounded text-xs transition-all ${
                            selectedTestCase === i
                              ? "bg-slate-800 text-white font-semibold border border-cyan-500/30"
                              : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/60"
                          }`}
                        >
                          Case {i + 1}
                        </button>
                      ))}
                  </div>

                  {/* Selected Test Case Details */}
                  {problem.testCases[selectedTestCase] && (
                    <div className="space-y-2 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      <div>
                        <div className="text-slate-500 text-[10px] uppercase font-bold">
                          Input:
                        </div>
                        <div className="text-slate-200 mt-0.5">
                          {problem.testCases[selectedTestCase].input}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-[10px] uppercase font-bold">
                          Expected Output:
                        </div>
                        <div className="text-emerald-400 mt-0.5">
                          {problem.testCases[selectedTestCase].expectedOutput}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {isRunning ? (
                    <div className="flex items-center gap-2 text-cyan-400 py-4">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Validating code AST and sending to execution container...</span>
                    </div>
                  ) : !executionResult ? (
                    <div className="text-slate-500 py-4">
                      Click <strong>&quot;Run Code&quot;</strong> to test your solution against sample cases, or <strong>&quot;Submit Solution&quot;</strong> to evaluate against all test cases.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Honest Backend Configuration Notice */}
                      {!executionResult.isConfiguredBackend && (
                        <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3.5 text-amber-200 space-y-2 font-sans">
                          <div className="flex items-center gap-2 font-semibold text-xs text-amber-400">
                            <ShieldAlert className="w-4 h-4 shrink-0" />
                            Sandboxed Execution Backend Notice
                          </div>
                          <p className="text-xs text-amber-200/90 leading-relaxed">
                            {executionResult.message}
                          </p>
                          {executionResult.configHelp && (
                            <div className="pt-2 border-t border-amber-500/20 text-[11px] space-y-1.5 text-slate-300">
                              <p className="font-medium text-amber-300">
                                {executionResult.configHelp.setupDocs}
                              </p>
                              <div className="font-mono text-[10px] text-slate-400 bg-slate-950/70 p-2 rounded border border-slate-800">
                                {executionResult.configHelp.requiredVars.map((v, i) => (
                                  <div key={i}>• {v}</div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Compilation or Static Check Error Display */}
                      {executionResult.compileError && (
                        <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-rose-300 space-y-1">
                          <div className="font-semibold text-rose-400 flex items-center gap-1.5 text-xs">
                            <XCircle className="w-4 h-4" /> Compilation / Static Check Error
                          </div>
                          <pre className="text-xs whitespace-pre-wrap font-mono">
                            {executionResult.compileError}
                          </pre>
                        </div>
                      )}

                      {/* General Output / Message */}
                      {executionResult.output && (
                        <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-3 space-y-1">
                          <div className="text-[11px] text-slate-400 font-semibold uppercase">
                            Runner Stdout:
                          </div>
                          <pre className="text-xs text-slate-200 whitespace-pre-wrap font-mono">
                            {executionResult.output}
                          </pre>
                        </div>
                      )}

                      {/* When Sandbox is Configured and Returned Test Case Results */}
                      {executionResult.testCaseResults && executionResult.testCaseResults.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-slate-300">
                            Test Results:
                          </div>
                          {executionResult.testCaseResults.map((tc, idx) => (
                            <div
                              key={idx}
                              className={`p-2.5 rounded border text-xs flex items-center justify-between ${
                                tc.status === "passed"
                                  ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-300"
                                  : "bg-rose-950/20 border-rose-800/40 text-rose-300"
                              }`}
                            >
                              <span>Case {tc.testIndex + 1}</span>
                              <span className="font-semibold uppercase">{tc.status}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
