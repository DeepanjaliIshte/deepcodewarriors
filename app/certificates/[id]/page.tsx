"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useAuth } from "@/context/AuthContext";
import { getCertificates } from "@/lib/data/student-service";
import { getCourseBySlug } from "@/lib/data/course-service"; // Note: courses in mock data use id and slug. The cert uses courseId.
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Award, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_COURSES } from "@/lib/data/mock-courses";

export default function CertificatePage({ params }: { params: { id: string } }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [cert, setCert] = useState<any>(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/certificates/${params.id}`);
    }
  }, [user, loading, router, params.id]);

  useEffect(() => {
    const loadCert = async () => {
      if (user) {
        const certs = await getCertificates(user.uid);
        const myCert = certs.find((c) => c.courseId === params.id);
        
        if (myCert) {
          setCert(myCert);
          // Find course title
          const course = MOCK_COURSES.find(c => c.id === params.id);
          if (course) setCourseTitle(course.title);
        }
      }
      setLoadingData(false);
    };
    if (user) loadCert();
  }, [user, params.id]);

  if (loading || loadingData || (!user && !loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!cert) {
    return (
      <main className="min-h-screen bg-muted/20 flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center p-8">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Certificate Not Found</h2>
            <p className="text-muted-foreground mb-6">You have not earned a certificate for this course yet, or you are logged into the wrong account.</p>
            <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          </Card>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-muted/20">
      <Navigation />

      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col items-center">
        
        <div className="w-full flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            &larr; Back to Dashboard
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => alert("PDF download will be implemented in the future!")}>
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>

        {/* Certificate Rendering */}
        <div className="w-full aspect-[1.414/1] sm:aspect-auto sm:h-[600px] bg-background border-8 border-double border-muted-foreground shadow-2xl p-8 sm:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden">
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-primary m-4 opacity-50 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-primary m-4 opacity-50 rounded-br-3xl"></div>
          
          <Award className="w-20 h-20 text-primary mb-6" />
          
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-2">Certificate of Completion</h1>
          <p className="text-lg text-muted-foreground uppercase tracking-widest mb-12">This is to certify that</p>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-12 border-b-2 border-primary/20 pb-2 px-12 inline-block">
            {profile?.displayName || user?.email?.split('@')[0]}
          </h2>
          
          <p className="text-lg text-muted-foreground mb-2">has successfully completed the course</p>
          <h3 className="text-2xl font-bold text-foreground mb-12">{courseTitle || params.id}</h3>
          
          <div className="w-full flex justify-between items-end mt-auto pt-8 px-8 sm:px-16">
            <div className="text-center">
              <div className="border-b border-muted-foreground/40 w-32 mb-2"></div>
              <p className="text-sm font-semibold text-muted-foreground">Deep Code Warriors</p>
            </div>
            
            <div className="text-center flex flex-col items-center">
              <div className="w-24 h-24 border-4 border-amber-500 rounded-full flex items-center justify-center bg-amber-500/10 mb-2 rotate-12 relative">
                <div className="absolute inset-2 border border-amber-500/50 rounded-full border-dashed"></div>
                <span className="font-bold text-amber-600 text-xs text-center leading-tight">OFFICIAL<br/>SEAL</span>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {cert.issuedAt?.toDate ? cert.issuedAt.toDate().toLocaleDateString() : "Date Issued"}
              </p>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
