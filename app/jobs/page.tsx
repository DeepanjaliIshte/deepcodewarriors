"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Building2, Briefcase, Calendar, Clock, ExternalLink, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

// SAMPLE DATA - To be replaced with Firebase Firestore data
const SAMPLE_JOBS = [
  {
    id: "1",
    title: "Software Engineer (Frontend)",
    company: "TechFlow Solutions",
    location: "Bangalore, India",
    workArrangement: "Hybrid", // Remote, On-site, Hybrid
    experience: "1-3 Years",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    type: "Full-time",
    salary: "₹12L - ₹18L PA",
    postedDate: "2026-09-10",
    deadline: "2026-10-15",
    description: "We are looking for a passionate Frontend Developer to join our core team. You will be building scalable user interfaces using Next.js and React. Strong understanding of web performance and responsive design is required.",
    applicationLink: "#",
    tag: "Experienced"
  },
  {
    id: "2",
    title: "Backend Developer Intern",
    company: "DataSync Systems",
    location: "Remote",
    workArrangement: "Remote",
    experience: "0 Years",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
    type: "Internship",
    salary: "₹25,000 / month",
    postedDate: "2026-09-14",
    deadline: "2026-09-30",
    description: "Exciting 6-month internship opportunity for fresh graduates. You will assist the backend team in designing RESTful APIs and optimizing database queries. Pre-placement offer (PPO) based on performance.",
    applicationLink: "#",
    tag: "Fresher"
  },
  {
    id: "3",
    title: "Senior Full Stack Engineer",
    company: "CloudNative Innovations",
    location: "Pune, India",
    workArrangement: "On-site",
    experience: "5+ Years",
    skills: ["Java", "Spring Boot", "React", "PostgreSQL", "Docker"],
    type: "Full-time",
    salary: "Not Disclosed",
    postedDate: "2026-09-15",
    deadline: "2026-11-01",
    description: "Lead the development of our flagship cloud product. You will be responsible for the end-to-end architecture, mentoring junior developers, and ensuring high code quality.",
    applicationLink: "#",
    tag: "Experienced"
  }
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("All") // All, Full-time, Internship
  
  // Basic filtering
  const filteredJobs = SAMPLE_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
                          
    const matchesType = filterType === "All" || job.type === filterType
    
    return matchesSearch && matchesType
  })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-6">
              Latest <span className="text-primary">Job Updates</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Find your next career opportunity in software engineering, web development, and tech.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 border-b border-border/50 bg-muted/10 sticky top-[64px] z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search by role, company, or skills..." 
                className="pl-10 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <Button 
                variant={filterType === "All" ? "default" : "outline"} 
                onClick={() => setFilterType("All")}
                className="whitespace-nowrap"
              >
                All Jobs
              </Button>
              <Button 
                variant={filterType === "Full-time" ? "default" : "outline"} 
                onClick={() => setFilterType("Full-time")}
                className="whitespace-nowrap"
              >
                Full-time
              </Button>
              <Button 
                variant={filterType === "Internship" ? "default" : "outline"} 
                onClick={() => setFilterType("Internship")}
                className="whitespace-nowrap"
              >
                Internships
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-muted-foreground font-medium text-sm border border-yellow-500/50 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full">
              ⚠️ Note: Showing Sample Data
            </p>
            <p className="text-muted-foreground">Showing {filteredJobs.length} results</p>
          </div>
          
          {filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
              <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
              <Button variant="outline" className="mt-4" onClick={() => {setSearchQuery(""); setFilterType("All")}}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow group border-border/60 overflow-hidden relative">
                  {/* Decorative side accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                    {/* Left: Main Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{job.title}</h2>
                        <Badge variant={job.tag === "Fresher" ? "default" : "secondary"} className="hidden md:flex">
                          {job.tag}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground mb-4">
                        <span className="flex items-center text-foreground font-medium">
                          <Building2 className="w-4 h-4 mr-1.5 opacity-70" />
                          {job.company}
                        </span>
                        <span className="hidden sm:inline text-border">•</span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1.5 opacity-70" />
                          {job.location} ({job.workArrangement})
                        </span>
                        <span className="hidden sm:inline text-border">•</span>
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1.5 opacity-70" />
                          {job.experience}
                        </span>
                      </div>

                      <p className="text-muted-foreground mb-6 line-clamp-2 md:line-clamp-none text-sm md:text-base leading-relaxed">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6 md:mb-0">
                        {job.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="bg-muted/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Right: Meta & Action */}
                    <div className="md:w-[250px] flex flex-col md:items-end justify-between border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-6">
                      <div className="space-y-3 w-full mb-6 md:mb-0">
                        <div className="flex items-center md:justify-end text-sm">
                          <span className="font-medium text-foreground">{job.salary}</span>
                        </div>
                        <div className="flex items-center md:justify-end text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2 opacity-70" />
                          <span>Posted: {job.postedDate}</span>
                        </div>
                        <div className="flex items-center md:justify-end text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2 text-destructive opacity-70" />
                          <span>Apply by: {job.deadline}</span>
                        </div>
                      </div>
                      
                      <Button asChild className="w-full shadow-md" size="lg">
                        <Link href={job.applicationLink} target="_blank">
                          Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
