"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "@/lib/firebase";

type EmailFlow = "login" | "register";

export default function LoginPage() {
  const { user, loginWithGoogle, saveUserProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [emailFlow, setEmailFlow] = useState<EmailFlow>("login");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  const mapAuthError = (errCode: string, defaultMsg: string = "An error occurred. Please try again.") => {
    if (!errCode) return defaultMsg;
    switch (errCode) {
      case "auth/invalid-email":
        return "Invalid email address format.";
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Incorrect email or password.";
      case "auth/email-already-in-use":
        return "Email is already in use by another account.";
      case "auth/popup-closed-by-user":
        return "Login popup was closed.";
      case "auth/weak-password":
        return "Password is too weak. Please use at least 6 characters.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";
      case "auth/too-many-requests":
        return "Too many unsuccessful attempts. Please try again later.";
      case "auth/operation-not-allowed":
        return "This sign-in method is not enabled.";
      default:
        return defaultMsg;
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(mapAuthError(err.code));
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (emailFlow === "register") {
        if (!name.trim()) {
          throw new Error("Name is required");
        }
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        // The result.user object isn't immediately updated with the new displayName in the same tick,
        // so we pass it explicitly or just re-fetch, but mutating for the saveUserProfile works.
        const updatedUser = Object.assign(result.user, { displayName: name });
        await saveUserProfile(updatedUser, "password");
      } else if (emailFlow === "login") {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await saveUserProfile(result.user, "password");
      }
    } catch (err: any) {
      const explicitErrors = ["Passwords do not match", "Name is required"];
      if (explicitErrors.includes(err.message)) {
        setError(err.message);
      } else {
        setError(mapAuthError(err.code, err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-muted/20">
      <Navigation />

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Login or create an account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="p-3 mb-4 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">{error}</div>}
            {message && <div className="p-3 mb-4 text-sm text-green-600 bg-green-500/10 border border-green-500/20 rounded-md">{message}</div>}

            <form onSubmit={handleEmailAuth} className="space-y-4">
                {emailFlow === "register" && (
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {emailFlow === "register" && (
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : emailFlow === "login" ? "Login" : "Register"}
                </Button>

                <div className="flex justify-between text-sm">
                  {emailFlow === "login" ? (
                    <>
                      <Link href="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
                      <button type="button" onClick={() => setEmailFlow("register")} className="text-primary hover:underline">Create account</button>
                    </>
                  ) : (
                    <button type="button" onClick={() => setEmailFlow("login")} className="text-primary hover:underline w-full text-center">Back to Login</button>
                  )}
                </div>
              </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </main>
  );
}

