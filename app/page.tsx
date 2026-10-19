import { Navigation } from "@/components/navigation";
import { Hero3DSection } from "@/components/hero-3d-section";
import { HomepageHubSection } from "@/components/homepage-hub-section";
import { InteractiveCourseGrid } from "@/components/interactive-course-grid";
import { RoadmapSection } from "@/components/roadmap-section";
import { ProjectsPreviewSection } from "@/components/projects-preview-section";
import { InterviewCtaSection } from "@/components/interview-cta-section";
import { FinalCtaSection } from "@/components/final-cta-section";
import { Footer } from "@/components/footer";
import { getCourses } from "@/lib/data/course-service";

export default async function HomePage() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen bg-[#060913] text-foreground selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navigation />
      <Hero3DSection />
      <HomepageHubSection />
      <InteractiveCourseGrid courses={courses} />
      <RoadmapSection />
      <ProjectsPreviewSection />
      <InterviewCtaSection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
