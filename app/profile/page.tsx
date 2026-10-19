"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Github, Linkedin, Globe, Edit2, Check, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, profile, loading, updateUserProfile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [github, setGithub] = useState(profile?.githubUrl || "");
  const [linkedin, setLinkedin] = useState(profile?.linkedinUrl || "");
  const [portfolio, setPortfolio] = useState(profile?.portfolioUrl || "");
  const [saving, setSaving] = useState(false);

  if (loading || (!user && !loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    await updateUserProfile({
      githubUrl: github,
      linkedinUrl: linkedin,
      portfolioUrl: portfolio
    });
    setSaving(false);
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-8 border-b border-border pb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">👩‍💻 {profile?.displayName || user?.email?.split('@')[0]}</h1>
            <p className="text-xl text-muted-foreground">{profile?.goal || "Developer"}</p>
          </div>
          <Button variant={isEditing ? "default" : "outline"} onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            {isEditing ? <>{saving ? "Saving..." : <><Check className="w-4 h-4 mr-2" /> Save Profile</>}</> : <><Edit2 className="w-4 h-4 mr-2" /> Edit Links</>}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center"><Github className="w-4 h-4 mr-2"/> GitHub URL</label>
                      <Input value={github} onChange={e => setGithub(e.target.value)} placeholder="https://github.com/..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center"><Linkedin className="w-4 h-4 mr-2"/> LinkedIn URL</label>
                      <Input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center"><Globe className="w-4 h-4 mr-2"/> Portfolio URL</label>
                      <Input value={portfolio} onChange={e => setPortfolio(e.target.value)} placeholder="https://..." />
                    </div>
                  </>
                ) : (
                  <>
                    {profile?.githubUrl && (
                      <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm hover:text-primary transition-colors">
                        <Github className="w-4 h-4 mr-3" /> {profile.githubUrl.replace('https://github.com/', '')}
                      </a>
                    )}
                    {profile?.linkedinUrl && (
                      <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm hover:text-primary transition-colors">
                        <Linkedin className="w-4 h-4 mr-3" /> LinkedIn Profile
                      </a>
                    )}
                    {profile?.portfolioUrl && (
                      <a href={profile.portfolioUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm hover:text-primary transition-colors">
                        <Globe className="w-4 h-4 mr-3" /> Personal Website
                      </a>
                    )}
                    {!profile?.githubUrl && !profile?.linkedinUrl && !profile?.portfolioUrl && (
                      <p className="text-sm text-muted-foreground italic">No links added yet.</p>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Experience</span>
                  <span className="font-mono font-medium">{profile?.xp || 0} XP</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Current Streak</span>
                  <span className="font-mono font-medium">{profile?.streak || 0} Days</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Current Level</h4>
                    <p>{profile?.currentLevel || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Career Goal</h4>
                    <p>{profile?.careerGoal || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Study Commitment</h4>
                    <p>{profile?.studyTime || "Not specified"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
