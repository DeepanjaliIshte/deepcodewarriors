import { getNewsArticles } from "@/lib/data/news-service";
import { NewsPortalClient } from "./news-portal-client";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Developer News & Updates | DeepCodeWarriors",
  description:
    "Curated software engineering updates covering Java, Python, Flutter, React, Next.js, AI tooling, and open-source releases.",
};

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <main className="min-h-screen bg-[#060913] text-foreground flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navigation />
      <div className="flex-1">
        <NewsPortalClient initialArticles={articles} />
      </div>
      <Footer />
    </main>
  );
}
