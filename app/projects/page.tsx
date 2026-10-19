import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Construction } from "lucide-react"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Projects Directory</h1>
          <p className="text-muted-foreground text-lg mb-8">
            We are curating the best hands-on projects for you to build your portfolio. Check back soon!
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
