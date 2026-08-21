import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Loader2, AlertCircle, CheckCircle2, Lock, Mail } from "lucide-react";
import { loginUser, getCurrentUser, onAuthChange } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login | Gallery Management | Rotary H P S English, Hubballi" },
      {
        name: "description",
        content: "Login to manage gallery images at Rotary H P S English, Hubballi.",
      },
      { property: "og:title", content: "Login | Gallery Management" },
      {
        property: "og:description",
        content: "Secure access to gallery editing and deletion features.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Check if already logged in
  const currentUser = getCurrentUser();
  if (currentUser) {
    // Redirect to gallery management
    navigate({ to: "/gallery-manage" });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setStatus({ type: "error", message: "Please enter both email and password." });
      return;
    }

    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const result = await loginUser(email.trim(), password.trim());

      if (result.success && result.user) {
        setStatus({
          type: "success",
          message: "Login successful! Redirecting to gallery management...",
        });

        setTimeout(() => {
          navigate({ to: "/gallery-manage" });
        }, 1000);
      } else {
        setStatus({
          type: "error",
          message: result.error || "Login failed. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <SiteHeader />
      <PageHero
        eyebrow="Secure Access"
        title="Gallery Management"
        subtitle="Login to manage and organize your school gallery images."
      />

      <section className="mx-auto max-w-[90vw] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-md">
          <Card className="border-2 border-gold/20 shadow-elegant">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-display text-2xl text-primary">
                Administrator Login
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in with your registered email to manage gallery content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@rotaryschool.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Status Messages */}
                {status.type && (
                  <div
                    className={`flex items-center gap-2 rounded-md p-3 ${
                      status.type === "success"
                        ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span className="text-sm">{status.message}</span>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !email.trim() || !password.trim()}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>

                {/* Help Text */}
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Existing registered users only. Contact administrator if you need access.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 border-2 border-gold/10 bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Login Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong>Registered users only</strong> - No new user registration</p>
              <p>• <strong>Use your school email</strong> - Provided by administrator</p>
              <p>• <strong>Contact admin</strong> - If you've forgotten your password</p>
              <p>• <strong>Secure access</strong> - Protect your gallery management</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
