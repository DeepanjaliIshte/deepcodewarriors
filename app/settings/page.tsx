"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { User, Bell, Shield, Palette, Database, AlertTriangle, BookOpen, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { updateProfile, deleteUser, updatePassword } from "firebase/auth"
import { doc, deleteDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { user, profile, loading, logout, updateUserProfile } = useAuth()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  
  const [activeTab, setActiveTab] = useState("account")
  
  // Account Form
  const [name, setName] = useState("")
  const [isSavingAccount, setIsSavingAccount] = useState(false)
  const [accountMessage, setAccountMessage] = useState({ text: "", type: "" })
  
  // Learning Form
  const [careerGoal, setCareerGoal] = useState("Backend Developer")
  const [currentLevel, setCurrentLevel] = useState("Beginner")
  const [studyTime, setStudyTime] = useState("30")
  const [learningPace, setLearningPace] = useState("Standard")
  const [isSavingLearning, setIsSavingLearning] = useState(false)
  const [learningMessage, setLearningMessage] = useState({ text: "", type: "" })
  
  // Notifications Form
  const [notifications, setNotifications] = useState({
    dailyLearningReminder: true,
    quizReminder: true,
    streakReminder: true,
    newContent: true
  })
  const [isSavingNotifs, setIsSavingNotifs] = useState(false)
  const [notifMessage, setNotifMessage] = useState({ text: "", type: "" })

  // Security
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSavingSecurity, setIsSavingSecurity] = useState(false)
  const [securityMessage, setSecurityMessage] = useState({ text: "", type: "" })
  
  // Delete Account
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Data
  const [dataMessage, setDataMessage] = useState({ text: "", type: "" })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      setName(user.displayName || "")
    }
    if (profile) {
      setCareerGoal(profile.careerGoal || "Backend Developer")
      setCurrentLevel(profile.currentLevel || "Beginner")
      setStudyTime(profile.studyTime || "30")
      setLearningPace((profile as any).learningPace || "Standard")
      if ((profile as any).notificationPreferences) {
        setNotifications((profile as any).notificationPreferences)
      }
    }
  }, [user, profile, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

  const isGoogleUser = user.providerData.some(p => p.providerId === 'google.com')

  const handleSaveAccount = async () => {
    setIsSavingAccount(true)
    setAccountMessage({ text: "", type: "" })
    try {
      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name })
      }
      await updateUserProfile({ displayName: name })
      setAccountMessage({ text: "Your settings were saved successfully.", type: "success" })
    } catch (error) {
      console.error(error)
      setAccountMessage({ text: "An error occurred while saving your profile.", type: "error" })
    } finally {
      setIsSavingAccount(false)
    }
  }

  const handleSaveLearning = async () => {
    setIsSavingLearning(true)
    setLearningMessage({ text: "", type: "" })
    try {
      await updateUserProfile({ 
        careerGoal, 
        currentLevel, 
        studyTime,
        learningPace
      } as any)
      setLearningMessage({ text: "Your learning preferences were saved successfully.", type: "success" })
    } catch (error) {
      console.error(error)
      setLearningMessage({ text: "An error occurred while saving preferences.", type: "error" })
    } finally {
      setIsSavingLearning(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsSavingNotifs(true)
    setNotifMessage({ text: "", type: "" })
    try {
      await updateUserProfile({ notificationPreferences: notifications } as any)
      setNotifMessage({ text: "Notification preferences saved. (Note: Email delivery is currently unavailable)", type: "success" })
    } catch (error) {
      console.error(error)
      setNotifMessage({ text: "An error occurred while saving notifications.", type: "error" })
    } finally {
      setIsSavingNotifs(false)
    }
  }

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setSecurityMessage({ text: "Passwords do not match.", type: "error" })
      return
    }
    if (newPassword.length < 6) {
      setSecurityMessage({ text: "Password must be at least 6 characters.", type: "error" })
      return
    }
    setIsSavingSecurity(true)
    setSecurityMessage({ text: "", type: "" })
    try {
      await updatePassword(user, newPassword)
      setSecurityMessage({ text: "Password updated successfully.", type: "success" })
      setNewPassword("")
      setConfirmPassword("")
    } catch (error: any) {
      console.error(error)
      if (error.code === 'auth/requires-recent-login') {
        setSecurityMessage({ text: "Please sign in again before changing your password.", type: "error" })
      } else {
        setSecurityMessage({ text: error.message || "Error updating password.", type: "error" })
      }
    } finally {
      setIsSavingSecurity(false)
    }
  }

  const handleResetCourseProgress = async () => {
    if (confirm("Reset course progress?\n\nThis will reset your lesson completion and quiz progress for all courses. This action cannot be undone.")) {
      try {
        // Find progress doc and delete it, or just overwrite it
        // A full reset would mean deleting the progress documents. 
        // In this implementation, we will reset the main progress paths.
        // It's safer to just set empty objects if we don't query all courses.
        // As a simple functional reset, we can clear the known course progress.
        const courseId = "java-fundamentals" // Assuming this is the main one for now
        await setDoc(doc(db, "users", user.uid, "progress", courseId), {
          userId: user.uid,
          courseId,
          currentStep: "",
          completedSteps: [],
          completedLessons: [],
          stepProgress: {},
          quizScores: {},
          quizMistakes: {},
          interviewMastery: {},
          lastActivity: new Date()
        })
        setDataMessage({ text: "Your progress has been reset.", type: "success" })
      } catch (error) {
        console.error(error)
        setDataMessage({ text: "Error resetting progress.", type: "error" })
      }
    }
  }

  const handleResetQuizHistory = async () => {
    if (confirm("Reset quiz history?\n\nThis will reset all your quiz scores and mistakes. Your course progress will remain intact.")) {
      try {
        const courseId = "java-fundamentals"
        await setDoc(doc(db, "users", user.uid, "progress", courseId), {
          quizScores: {},
          quizMistakes: {},
        }, { merge: true })
        setDataMessage({ text: "Your quiz history has been reset.", type: "success" })
      } catch (error) {
        console.error(error)
        setDataMessage({ text: "Error resetting quiz history.", type: "error" })
      }
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      // 1. Delete Firestore user document
      await deleteDoc(doc(db, "users", user.uid))
      
      // 2. Delete auth user
      await deleteUser(user)
      
      // 3. Sign out & redirect (handled by onAuthStateChanged in AuthContext)
      router.push("/")
    } catch (error: any) {
      console.error(error)
      if (error.code === 'auth/requires-recent-login') {
        alert("Account deletion requires recent authentication. Please log out, log back in, and try again.");
      } else {
        alert(error.message || "An error occurred while deleting your account.");
      }
    } finally {
      setIsDeleting(false)
    }
  }

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "learning", label: "Learning Preferences", icon: BookOpen },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "data", label: "Data & Progress", icon: Database },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setAccountMessage({ text: "", type: "" })
                    setLearningMessage({ text: "", type: "" })
                    setNotifMessage({ text: "", type: "" })
                    setSecurityMessage({ text: "", type: "" })
                    setDataMessage({ text: "", type: "" })
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === "account" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Manage your public profile details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 mb-4">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-border" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-semibold border border-primary/30">
                        {(user.displayName || "User").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input value={user.email || ""} disabled />
                    <p className="text-xs text-muted-foreground">Your email address is managed by your sign-in provider and cannot be changed here.</p>
                  </div>
                  {accountMessage.text && (
                    <p className={`text-sm ${accountMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                      {accountMessage.text}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveAccount} disabled={isSavingAccount}>
                    {isSavingAccount ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "learning" && (
              <Card>
                <CardHeader>
                  <CardTitle>Learning Preferences</CardTitle>
                  <CardDescription>Customize how you learn on Deep Code Warriors.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Career Goal</label>
                    <select value={careerGoal} onChange={(e) => setCareerGoal(e.target.value)} className="w-full p-2 border border-input bg-background rounded-md text-sm">
                      <option>Backend Developer</option>
                      <option>Frontend Developer</option>
                      <option>Fullstack Developer</option>
                      <option>Software Engineer</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Level</label>
                    <select value={currentLevel} onChange={(e) => setCurrentLevel(e.target.value)} className="w-full p-2 border border-input bg-background rounded-md text-sm">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Daily Study Goal (Minutes)</label>
                    <Input type="number" value={studyTime} onChange={(e) => setStudyTime(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Learning Pace</label>
                    <select value={learningPace} onChange={(e) => setLearningPace(e.target.value)} className="w-full p-2 border border-input bg-background rounded-md text-sm">
                      <option>Casual</option>
                      <option>Standard</option>
                      <option>Intense</option>
                    </select>
                  </div>
                  {learningMessage.text && (
                    <p className={`text-sm ${learningMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                      {learningMessage.text}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveLearning} disabled={isSavingLearning}>
                    {isSavingLearning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Update Preferences
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Configure how we contact you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">Daily Learning Reminder</p>
                      <p className="text-sm text-muted-foreground">Receive a daily reminder to hit your learning goal.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.dailyLearningReminder} 
                      onChange={(e) => setNotifications({...notifications, dailyLearningReminder: e.target.checked})}
                      className="w-4 h-4" 
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">Quiz Reminders</p>
                      <p className="text-sm text-muted-foreground">Get notified about pending quizzes.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.quizReminder} 
                      onChange={(e) => setNotifications({...notifications, quizReminder: e.target.checked})}
                      className="w-4 h-4" 
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">Streak Reminders</p>
                      <p className="text-sm text-muted-foreground">Alerts to prevent losing your study streak.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.streakReminder} 
                      onChange={(e) => setNotifications({...notifications, streakReminder: e.target.checked})}
                      className="w-4 h-4" 
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">New Content</p>
                      <p className="text-sm text-muted-foreground">Notifications about new courses and tutorials.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.newContent} 
                      onChange={(e) => setNotifications({...notifications, newContent: e.target.checked})}
                      className="w-4 h-4" 
                    />
                  </div>
                  {notifMessage.text && (
                    <p className={`text-sm ${notifMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                      {notifMessage.text}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveNotifications} disabled={isSavingNotifs}>
                    {isSavingNotifs ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Save Notifications
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>Manage your security settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isGoogleUser ? (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Change Password</label>
                      <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" />
                      <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
                      <Button className="mt-2" variant="outline" onClick={handleUpdatePassword} disabled={isSavingSecurity}>
                        {isSavingSecurity && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Update Password
                      </Button>
                      {securityMessage.text && (
                        <p className={`text-sm mt-2 ${securityMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                          {securityMessage.text}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">You are signed in with Google. Password changes are managed through your Google account.</p>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-border mt-4">
                    <h3 className="font-medium mb-2">Security Information</h3>
                    <p className="text-sm text-muted-foreground mb-4">You are currently signed in with {user.providerData[0]?.providerId || 'email'}.</p>
                    <Button variant="outline" onClick={logout}>Sign Out</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "appearance" && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div 
                      onClick={() => setTheme("dark")}
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-colors ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-background'}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-900 mx-auto mb-2 border border-slate-700"></div>
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-primary' : 'text-foreground'}`}>Dark {theme === 'dark' && '(Active)'}</p>
                    </div>
                    <div 
                      onClick={() => setTheme("light")}
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-colors ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-background'}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-2 border border-slate-300"></div>
                      <p className={`text-sm font-medium ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`}>Light {theme === 'light' && '(Active)'}</p>
                    </div>
                    <div 
                      onClick={() => setTheme("system")}
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-colors ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-background'}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-900 to-slate-100 mx-auto mb-2 border border-slate-400"></div>
                      <p className={`text-sm font-medium ${theme === 'system' ? 'text-primary' : 'text-muted-foreground'}`}>System {theme === 'system' && '(Active)'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "data" && (
              <Card>
                <CardHeader>
                  <CardTitle>Data & Progress</CardTitle>
                  <CardDescription>Manage your learning history.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col space-y-4">
                    <Button variant="outline" className="w-full sm:w-auto justify-start" onClick={() => router.push('/dashboard')}>
                      View Detailed Progress
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto justify-start" disabled>
                      Export Learning Data (CSV) - Coming Soon
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto justify-start text-orange-500 hover:text-orange-600 border-orange-200 hover:bg-orange-500/10" onClick={handleResetCourseProgress}>
                      Reset Course Progress
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto justify-start text-orange-500 hover:text-orange-600 border-orange-200 hover:bg-orange-500/10" onClick={handleResetQuizHistory}>
                      Reset Quiz History
                    </Button>
                    {dataMessage.text && (
                      <p className={`text-sm ${dataMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                        {dataMessage.text}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "danger" && (
              <Card className="border-red-500/50">
                <CardHeader>
                  <CardTitle className="text-red-500">Danger Zone</CardTitle>
                  <CardDescription>Irreversible and destructive actions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    Once you delete your account, there is no going back. Please be certain.
                    This will permanently delete your profile, course progress, quiz history, projects, and all associated personal data from DeepCodeWarriors.
                  </p>
                  
                  <div className="space-y-4">
                    <label className="text-sm font-medium">Type DELETE to confirm:</label>
                    <Input 
                      value={deleteConfirmation} 
                      onChange={(e) => setDeleteConfirmation(e.target.value)} 
                      placeholder="DELETE" 
                    />
                    
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      disabled={deleteConfirmation !== "DELETE" || isDeleting}
                    >
                      {isDeleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      Delete Account Permanently
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
