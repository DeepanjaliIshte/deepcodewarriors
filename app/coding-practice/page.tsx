import { CODING_PROBLEMS, getDailyChallenge } from "@/lib/data/coding-challenges";
import { CodingPracticeClient } from "./coding-practice-client";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Coding Practice & Challenges | DeepCodeWarriors",
  description:
    "Solve curated algorithmic problems in Java and Python. Filter by difficulty, data structure, and algorithms to prepare for FAANG interviews.",
};

export default function CodingPracticePage() {
  const daily = getDailyChallenge();

  return (
    <main className="min-h-screen bg-[#060913] text-foreground flex flex-col selection:bg-orange-500/30 selection:text-orange-200">
      <Navigation />
      <div className="flex-1">
        <CodingPracticeClient problems={CODING_PROBLEMS} dailyChallenge={daily} />
      </div>
      <Footer />
    </main>
  );
}
