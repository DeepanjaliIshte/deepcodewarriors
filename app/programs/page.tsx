import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

const programs = [
  {
    title: "Reverse a String",
    description: "Learn how to reverse a string using different approaches",
    difficulty: "Beginner",
    slug: "reverse-string",
  },
  {
    title: "Palindrome Program",
    description: "Check if a given string or number is a palindrome",
    difficulty: "Beginner",
    slug: "palindrome",
  },
  {
    title: "Fibonacci Series",
    description: "Generate the Fibonacci series up to n terms",
    difficulty: "Beginner",
    slug: "fibonacci",
  },
  {
    title: "Binary Search",
    description: "Implement binary search on a sorted array",
    difficulty: "Intermediate",
    slug: "binary-search",
  }
]

export default function ProgramsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-6">
              Coding <span className="text-primary">Programs</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Practical coding examples to improve your programming logic and skills
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={prog.difficulty === "Beginner" ? "secondary" : "default"}>
                      {prog.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{prog.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {prog.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="outline">
                    <Link href={`/programs/${prog.slug}`}>
                      <Play className="mr-2 w-4 h-4" />
                      View Code
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
