"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Code2, Search, LogIn, LogOut, ChevronRight, ChevronDown, User, Settings, BarChart2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  
  const pathname = usePathname()
  const { user, loading, loginWithGoogle, logout } = useAuth()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/coding-practice", label: "Coding Practice" },
    { href: "/interview-prep", label: "Interview Preparation" },
    { href: "/news", label: "Developer News" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const courseItems = [
    { href: "/courses/java", label: "Java Fundamentals" },
    { href: "/courses/advanced-java", label: "Advanced Java" },
    { href: "/courses/python", label: "Python" },
    { href: "/courses/flutter", label: "Flutter" },
    { href: "/courses/web-development", label: "Web Development" },
    { href: "/courses/dsa", label: "DSA" },
  ]

  const displayName = user?.displayName || "User"
  const photoURL = user?.photoURL

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Deep Code Warriors</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}>
              Home
            </Link>
            
            {/* Courses Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsCoursesOpen(true)}
              onMouseLeave={() => setIsCoursesOpen(false)}
            >
              <button className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                Courses <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {isCoursesOpen && (
                <div className="absolute top-full left-0 w-48 py-2 bg-popover border border-border rounded-md shadow-lg shadow-black/50">
                  {courseItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Logged In Dashboard Link */}
            {!loading && user && (
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.startsWith("/dashboard") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-2">
            {!loading && (
              user ? (
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="User profile menu"
                    aria-expanded={isProfileOpen}
                  >
                    {photoURL ? (
                      <img src={photoURL} alt={displayName} className="w-8 h-8 rounded-full object-cover border border-border" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold border border-primary/30">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium hidden xl:block">{displayName}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground hidden xl:block" />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-md shadow-lg shadow-black/50 z-50 overflow-hidden">
                      <div className="p-4 border-b border-border">
                        <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <div className="p-2 space-y-1">
                        <Link 
                          href="/profile" 
                          className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4 mr-2" /> My Profile
                        </Link>
                        <Link 
                          href="/dashboard" 
                          className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <BarChart2 className="w-4 h-4 mr-2" /> My Progress
                        </Link>
                        <Link 
                          href="/settings" 
                          className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-2" /> Settings
                        </Link>
                      </div>
                      <div className="p-2 border-t border-border">
                        <button
                          onClick={() => { logout(); setIsProfileOpen(false); }}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-2" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            {!loading && user && (
               <div className="flex items-center">
                 {photoURL ? (
                   <img src={photoURL} alt={displayName} className="w-8 h-8 rounded-full object-cover border border-border" />
                 ) : (
                   <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold border border-primary/30">
                     {displayName.charAt(0).toUpperCase()}
                   </div>
                 )}
               </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 max-h-[80vh] overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              <div className="px-3 py-2 text-base font-medium text-foreground">Courses</div>
              <div className="pl-6 space-y-1 border-l-2 border-border ml-3 mb-2">
                {courseItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {navItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname.startsWith(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {!loading && user && (
                <Link
                  href="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname.startsWith("/dashboard")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              
              {/* Mobile Profile Section */}
              <div className="pt-4 pb-2 border-t border-border mt-4">
                {!loading && (
                  user ? (
                    <div className="space-y-4">
                      <div className="flex items-center px-3 space-x-3">
                        {photoURL ? (
                          <img src={photoURL} alt={displayName} className="w-10 h-10 rounded-full object-cover border border-border" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-lg border border-primary/30">
                            {displayName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="text-base font-medium text-foreground">{displayName}</p>
                          <p className="text-sm font-medium text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Link 
                          href="/profile" 
                          className="flex items-center px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="w-5 h-5 mr-3" /> My Profile
                        </Link>
                        <Link 
                          href="/dashboard" 
                          className="flex items-center px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          <BarChart2 className="w-5 h-5 mr-3" /> My Progress
                        </Link>
                        <Link 
                          href="/settings" 
                          className="flex items-center px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          <Settings className="w-5 h-5 mr-3" /> Settings
                        </Link>
                        <button
                          onClick={() => { logout(); setIsOpen(false); }}
                          className="flex items-center w-full px-3 py-2 text-base font-medium text-red-500 hover:bg-red-500/10 rounded-md"
                        >
                          <LogOut className="w-5 h-5 mr-3" /> Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="px-3">
                      <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                        <Button variant="outline" className="w-full justify-start">
                          <LogIn className="w-4 h-4 mr-2" />
                          Login
                        </Button>
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
