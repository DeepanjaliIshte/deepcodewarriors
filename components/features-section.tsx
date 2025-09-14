import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Code, FileText, Users, Download, MessageCircle } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Tutorials",
      description:
        "Step-by-step Java tutorials from basics to advanced topics including OOP, Collections, and Frameworks.",
    },
    {
      icon: Code,
      title: "Hands-on Programs",
      description: "Practical Java programs with detailed explanations and output examples to reinforce learning.",
    },
    {
      icon: FileText,
      title: "Detailed Notes",
      description: "Well-structured notes and PDFs covering all Java concepts for easy reference and study.",
    },
    {
      icon: Users,
      title: "Interview Preparation",
      description: "Extensive collection of Java interview questions and answers to help you ace your interviews.",
    },
    {
      icon: Download,
      title: "Free Resources",
      description: "All educational materials are freely available for download and personal use.",
    },
    {
      icon: MessageCircle,
      title: "Community Support",
      description: "Join our WhatsApp channel and connect with fellow Java learners and get help.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Everything You Need to Learn Java</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Comprehensive resources designed to take you from beginner to advanced Java developer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
