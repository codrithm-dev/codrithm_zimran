import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Briefcase, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { CAREERS, CAREER_TYPES } from "@/data/careers";
import type { Career } from "@/data/careers";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  portfolio: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  message: z.string().min(20, "Please tell us a bit more about yourself (min 20 characters)"),
});

type ApplicationData = z.infer<typeof applicationSchema>;

export default function Careers() {
  const [activeType, setActiveType] = useState("All");
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);

  const filtered = CAREERS.filter(
    (career) => activeType === "All" || career.employmentType === activeType
  );

  const form = useForm<ApplicationData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { name: "", email: "", linkedin: "", portfolio: "", message: "" },
  });

  const onSubmit = (data: ApplicationData) => {
    console.log("Application submitted:", { ...data, jobId: selectedJob?.id });
    toast.success("Application submitted successfully!", {
      description: "We'll review your application and get back to you soon.",
    });
    form.reset();
    setSelectedJob(null);
  };

  const TYPE_COLORS: Record<string, string> = {
    "Full-time": "bg-emerald-400/10 text-emerald-400",
    Internship: "bg-blue-400/10 text-blue-400",
    Volunteer: "bg-purple-400/10 text-purple-400",
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="relative pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <ParallaxBackground count={3} showParticles={true} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-black mb-3">
                Join Our <span className="text-gradient">Team</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Build the future of tech education. We're looking for passionate people to join our mission.
              </p>
            </ScrollReveal>

            <div className="flex justify-center gap-2 flex-wrap" role="group" aria-label="Filter by employment type">
              {CAREER_TYPES.map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveType(type)}
                  aria-pressed={activeType === type}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                    activeType === type
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "bg-card border border-card-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-xl font-bold mb-6">Open Positions</h2>
              </ScrollReveal>
              <div className="flex flex-col gap-4">
                {filtered.map((career, i) => (
                  <ScrollReveal key={career.id} delay={i * 0.05}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      onClick={() => setSelectedJob(career)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedJob(career);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selectedJob?.id === career.id}
                      aria-label={`Apply for ${career.title}`}
                      className={`rounded-xl p-5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 hover:shadow-lg ${
                        selectedJob?.id === career.id
                          ? "shadow-lg"
                          : ""
                      }`}
                      style={{
                        background: selectedJob?.id === career.id ? "#112240" : "#0D1B2A",
                        border: selectedJob?.id === career.id ? "1px solid rgba(43,100,217,0.6)" : "1px solid rgba(43,100,217,0.2)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => { if (selectedJob?.id !== career.id) { (e.currentTarget as HTMLDivElement).style.background = "#112240"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.6)"; } }}
                      onMouseLeave={(e) => { if (selectedJob?.id !== career.id) { (e.currentTarget as HTMLDivElement).style.background = "#0D1B2A"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.2)"; } }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{career.title}</h3>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_COLORS[career.employmentType]}`}>
                          {career.employmentType}
                        </span>
                      </div>
                      <p className="text-sm mb-3 line-clamp-2" style={{ color: "#FFFFFF" }}>{career.description}</p>
                      <div className="flex items-center gap-4 text-xs" style={{ color: "#FFFFFF" }}>
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{career.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{career.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Posted {career.postedDate}</span>
                      </div>
                      {career.requirements && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {career.requirements.map((req) => (
                            <span key={req} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                              {req}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg font-medium">No positions available</p>
                  <p className="text-sm mt-1">Check back later or join as a volunteer</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <ScrollReveal delay={0.2}>
                <div
                    className="rounded-xl p-6 sticky top-24"
                    style={{ background: "#0D1B2A", border: "1px solid rgba(43,100,217,0.2)", transition: "all 0.3s ease" }}
                  >
                  <h2 className="text-lg font-bold mb-4" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {selectedJob ? `Apply for ${selectedJob.title}` : "Quick Application"}
                  </h2>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div>
                      <Label htmlFor="career-name">Full Name</Label>
                      <Input
                        id="career-name"
                        className="mt-1"
                        placeholder="Your name"
                        {...form.register("name")}
                        aria-invalid={!!form.formState.errors.name}
                        aria-describedby={form.formState.errors.name ? "career-name-error" : undefined}
                      />
                      {form.formState.errors.name && (
                        <p id="career-name-error" className="text-destructive text-xs mt-1">{form.formState.errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="career-email">Email</Label>
                      <Input
                        id="career-email"
                        className="mt-1"
                        type="email"
                        placeholder="you@example.com"
                        {...form.register("email")}
                        aria-invalid={!!form.formState.errors.email}
                        aria-describedby={form.formState.errors.email ? "career-email-error" : undefined}
                      />
                      {form.formState.errors.email && (
                        <p id="career-email-error" className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="career-linkedin">LinkedIn URL (optional)</Label>
                      <Input id="career-linkedin" className="mt-1" placeholder="https://linkedin.com/in/you" {...form.register("linkedin")} />
                    </div>
                    <div>
                      <Label htmlFor="career-portfolio">Portfolio URL (optional)</Label>
                      <Input id="career-portfolio" className="mt-1" placeholder="https://yoursite.com" {...form.register("portfolio")} />
                    </div>
                    <div>
                      <Label htmlFor="career-message">Why should we hire you?</Label>
                      <textarea
                        id="career-message"
                        className="mt-1 w-full min-h-[100px] px-3 py-2 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                        placeholder="Tell us about yourself and why you'd be a great fit..."
                        {...form.register("message")}
                        aria-invalid={!!form.formState.errors.message}
                        aria-describedby={form.formState.errors.message ? "career-message-error" : undefined}
                      />
                      {form.formState.errors.message && (
                        <p id="career-message-error" className="text-destructive text-xs mt-1">{form.formState.errors.message.message}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full glow-primary" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
