import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShieldCheck, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});
type FormData = z.infer<typeof schema>;

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [showPw, setShowPw] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: FormData) => {
    if (data.email === "admin@codrithm.dev") {
      toast({ title: "Admin access granted" });
      setLocation("/admin/dashboard");
    } else {
      toast({ title: "Access denied", description: "Invalid admin credentials.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-3 glow-primary">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Admin Portal</h2>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage Codrithm</p>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-6 shadow-lg">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <Label>Admin Email</Label>
              <Input className="mt-1" type="email" placeholder="admin@codrithm.dev" data-testid="input-admin-email" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative mt-1">
                <Input type={showPw ? "text" : "password"} placeholder="admin123" data-testid="input-admin-password" {...form.register("password")} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-destructive text-xs mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>
            <div className="bg-muted/30 rounded-lg p-3 text-xs text-muted-foreground">
              Hint: <span className="font-mono text-foreground">admin@codrithm.dev</span> / <span className="font-mono text-foreground">admin123</span>
            </div>
            <Button type="submit" className="w-full glow-primary" data-testid="button-admin-login">
              Access Dashboard <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
