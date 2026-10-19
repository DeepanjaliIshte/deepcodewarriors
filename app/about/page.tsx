import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Code2 } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#060913] text-foreground flex flex-col selection:bg-orange-500/30 selection:text-orange-200">
      <Navigation />
      
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About <span className="text-primary">Deep Code Warriors</span></h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Deep Code Warriors is a premier platform dedicated to empowering developers of all skill levels. Whether you are starting your journey with Python, diving into Mobile App Development with Flutter, or preparing for top tech interviews, we have the resources you need.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mission is to provide high-quality, step-by-step learning materials, interactive code examples, and real-world project guides to help you build a successful career in software engineering.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
              <Code2 className="w-32 h-32 text-primary" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
