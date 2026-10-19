import { getCodingProblem } from "@/lib/data/coding-challenges";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { ProblemSolverClient } from "./problem-solver-client";

interface Props {
  params: {
    problemId: string;
  };
}

export function generateMetadata({ params }: Props) {
  const problem = getCodingProblem(params.problemId);
  if (!problem) return { title: "Problem Not Found | DeepCodeWarriors" };
  return {
    title: `${problem.title} (${problem.difficulty}) | Coding Practice | DeepCodeWarriors`,
    description: problem.description.slice(0, 160),
  };
}

export default function ProblemDetailPage({ params }: Props) {
  const problem = getCodingProblem(params.problemId);

  if (!problem) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#060913] text-foreground flex flex-col">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <ProblemSolverClient problem={problem} />
      </div>
    </main>
  );
}
