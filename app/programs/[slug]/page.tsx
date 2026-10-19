import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function ProgramDetail({ params }: { params: { slug: string } }) {
  // In a real app, fetch data from Spring Boot API based on params.slug
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/programs">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Programs
          </Link>
        </Button>
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">Beginner</Badge>
            <span className="text-muted-foreground text-sm">String Manipulation</span>
          </div>
          <h1 className="text-3xl font-bold mb-4 capitalize">{params.slug.replace(/-/g, ' ')}</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to solve this common programming problem step by step.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden mb-8 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
            <span className="text-sm font-mono text-muted-foreground">Solution.java</span>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <Copy className="w-3 h-3 mr-2" />
              Copy Code
            </Button>
          </div>
          <div className="p-6 overflow-x-auto bg-[#0d1117]">
            <pre className="text-sm font-mono leading-relaxed text-gray-300">
              <code className="text-blue-400">public class</code> <code className="text-yellow-300">Solution</code> {"{"}
              {"\n    "}<code className="text-blue-400">public static void</code> <code className="text-yellow-300">main</code>(String[] args) {"{"}
              {"\n        "}<code className="text-gray-500">// Code implementation here</code>
              {"\n        "}System.out.println(<code className="text-green-400">"Hello World!"</code>);
              {"\n    }"}
              {"\n}"}
            </pre>
          </div>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <h3>Expected Output</h3>
          <pre className="bg-muted p-4 rounded-lg"><code>Hello World!</code></pre>
          
          <h3>Step-by-step Explanation</h3>
          <p>
            1. First we define the class name which must match the filename.<br/>
            2. We declare the main method which is the entry point.<br/>
            3. We use System.out.println to print to the console.
          </p>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
