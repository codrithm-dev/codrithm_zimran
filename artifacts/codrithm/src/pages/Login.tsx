import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginData = z.infer<typeof loginSchema>;
type SignupData = z.infer<typeof signupSchema>;

export default function Login() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [showPw, setShowPw] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const handleLogin = (data: LoginData) => {
    if (data.email === "admin@codrithm.dev") {
      toast({ title: "Welcome back, Admin!" });
      setLocation("/admin/dashboard");
    } else {
      toast({ title: "Welcome back!", description: "You're signed in to Codrithm." });
      setLocation("/home");
    }
  };

  const handleSignup = () => {
    toast({ title: "Account created!", description: "Welcome to Codrithm!" });
    setLocation("/confirmation");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-secondary/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-6">
          <Link href="/">
            <div className="flex items-center gap-2 mb-4 cursor-pointer">
              <img src="/codrithm-logo.svg" alt="Codrithm" className="w-9 h-9 object-contain" />
              <span className="font-bold text-xl text-gradient">Codrithm</span>
            </div>
          </Link>
          <h2 className="text-2xl font-bold">
            {tab === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {tab === "login" ? "Sign in to your account" : "Join the community today"}
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg">
          <div className="flex rounded-xl bg-muted/50 p-1 mb-6">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                data-testid={`button-tab-${t}`}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize ${
                  tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === "login" ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="flex flex-col gap-4"
              >
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="demo@codrithm.dev"
                    data-testid="input-email"
                    className="mt-1"
                    {...loginForm.register("email")}
                  />
                  {loginForm.formState.errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-xs mt-1"
                    >
                      {loginForm.formState.errors.email.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPw ? "text" : "password"}
                      placeholder="password123"
                      data-testid="input-password"
                      {...loginForm.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-xs mt-1"
                    >
                      {loginForm.formState.errors.password.message}
                    </motion.p>
                  )}
                </div>

                <div className="bg-muted/30 rounded-lg p-3 text-xs text-muted-foreground">
                  Demo: <span className="text-foreground font-mono">demo@codrithm.dev</span> / <span className="text-foreground font-mono">password123</span>
                  <br />
                  Admin: <span className="text-foreground font-mono">admin@codrithm.dev</span> / <span className="text-foreground font-mono">admin123</span>
                </div>

                <Button type="submit" className="w-full glow-primary" data-testid="button-submit-login">
                  Sign In <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={signupForm.handleSubmit(handleSignup)}
                className="flex flex-col gap-4"
              >
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Alex Rivera"
                    data-testid="input-name"
                    className="mt-1"
                    {...signupForm.register("name")}
                  />
                  {signupForm.formState.errors.name && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-xs mt-1">
                      {signupForm.formState.errors.name.message}
                    </motion.p>
                  )}
                </div>
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="you@university.edu" data-testid="input-signup-email" className="mt-1" {...signupForm.register("email")} />
                  {signupForm.formState.errors.email && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-xs mt-1">
                      {signupForm.formState.errors.email.message}
                    </motion.p>
                  )}
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="signup-password"
                      type={showPw ? "text" : "password"}
                      placeholder="min 8 characters"
                      data-testid="input-signup-password"
                      {...signupForm.register("password")}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {signupForm.formState.errors.password && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-xs mt-1">
                      {signupForm.formState.errors.password.message}
                    </motion.p>
                  )}
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="repeat password" data-testid="input-confirm-password" className="mt-1" {...signupForm.register("confirmPassword")} />
                  {signupForm.formState.errors.confirmPassword && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-xs mt-1">
                      {signupForm.formState.errors.confirmPassword.message}
                    </motion.p>
                  )}
                </div>
                <Button type="submit" className="w-full glow-primary" data-testid="button-submit-signup">
                  Create Account <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
