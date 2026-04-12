import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ChevronRight, ChevronLeft, User, Code2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

const SKILLS = ["JavaScript", "Python", "React", "Node.js", "TypeScript", "Java", "C++", "Go", "Swift", "Figma"];
const INTERESTS = ["Web Dev", "Mobile", "AI/ML", "Cybersecurity", "Game Dev", "DevOps", "Data Science", "UI/UX", "Blockchain", "Open Source"];
const GOALS = ["Find community", "Get mentored", "Land an internship", "Build projects", "Contribute to OSS", "Learn new skills", "Mentor others"];

const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  university: z.string().min(2, "University name is required"),
});

const step2Schema = z.object({
  experience: z.enum(["Beginner", "Intermediate", "Advanced"], { required_error: "Select your experience level" }),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

const STEPS = [
  { title: "Personal Info", icon: User },
  { title: "Skills & Interests", icon: Code2 },
  { title: "Your Goals", icon: Target },
];

export default function Join() {
  const [step, setStep] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [, setLocation] = useLocation();

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { name: "", email: "", university: "" },
  });

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { experience: undefined, bio: "" },
  });

  const toggleItem = (item: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleNext = async () => {
    if (step === 0) {
      const valid = await form1.trigger();
      if (valid) setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else {
      setLocation("/confirmation");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="relative pt-24 pb-12 flex-1">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-primary/5 blur-3xl" />

          <div className="max-w-xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-black mb-2">
                Join <span className="text-gradient">Codrithm</span>
              </h1>
              <p className="text-muted-foreground">Complete your profile and find your community.</p>
            </motion.div>

            <div className="flex items-center justify-between mb-8">
              {STEPS.map((s, i) => (
                <div key={i} className="flex items-center flex-1">
                  <motion.div
                    animate={{
                      backgroundColor: i <= step ? "hsl(var(--primary))" : "hsl(var(--muted))",
                      scale: i === step ? 1.1 : 1,
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative"
                  >
                    {i < step ? (
                      <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <s.icon className={`w-4 h-4 ${i === step ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    )}
                  </motion.div>
                  <div className="ml-2 hidden sm:block">
                    <p className={`text-xs font-medium ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.title}
                    </p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-0.5 mx-3 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        animate={{ width: i < step ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="bg-card border border-card-border rounded-2xl p-6"
                >
                  <h2 className="text-lg font-semibold mb-4">Tell us about yourself</h2>
                  <div className="flex flex-col gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input className="mt-1" placeholder="Alex Rivera" data-testid="input-join-name" {...form1.register("name")} />
                      {form1.formState.errors.name && <p className="text-destructive text-xs mt-1">{form1.formState.errors.name.message}</p>}
                    </div>
                    <div>
                      <Label>Email Address</Label>
                      <Input className="mt-1" type="email" placeholder="alex@university.edu" data-testid="input-join-email" {...form1.register("email")} />
                      {form1.formState.errors.email && <p className="text-destructive text-xs mt-1">{form1.formState.errors.email.message}</p>}
                    </div>
                    <div>
                      <Label>University / Institution</Label>
                      <Input className="mt-1" placeholder="State University" data-testid="input-join-university" {...form1.register("university")} />
                      {form1.formState.errors.university && <p className="text-destructive text-xs mt-1">{form1.formState.errors.university.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="bg-card border border-card-border rounded-2xl p-6"
                >
                  <h2 className="text-lg font-semibold mb-4">Skills & Interests</h2>
                  <div className="flex flex-col gap-4">
                    <div>
                      <Label className="text-sm mb-2 block">Your Skills (select all that apply)</Label>
                      <div className="flex flex-wrap gap-2">
                        {SKILLS.map((skill) => (
                          <motion.button
                            key={skill}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleItem(skill, selectedSkills, setSelectedSkills)}
                            data-testid={`button-skill-${skill.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-')}`}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                              selectedSkills.includes(skill)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted/50 text-muted-foreground border-transparent hover:border-primary/30"
                            }`}
                          >
                            {skill}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm mb-2 block">Tech Interests</Label>
                      <div className="flex flex-wrap gap-2">
                        {INTERESTS.map((interest) => (
                          <motion.button
                            key={interest}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleItem(interest, selectedInterests, setSelectedInterests)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                              selectedInterests.includes(interest)
                                ? "bg-secondary text-secondary-foreground border-secondary"
                                : "bg-muted/50 text-muted-foreground border-transparent hover:border-secondary/30"
                            }`}
                          >
                            {interest}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm mb-1 block">Experience Level</Label>
                      <div className="flex gap-2">
                        {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => form2.setValue("experience", level)}
                            className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                              form2.watch("experience") === level
                                ? "bg-primary/15 border-primary text-primary"
                                : "border-border text-muted-foreground hover:border-primary/30"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="bg-card border border-card-border rounded-2xl p-6"
                >
                  <h2 className="text-lg font-semibold mb-4">What are your goals?</h2>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {GOALS.map((goal) => (
                      <motion.button
                        key={goal}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleItem(goal, selectedGoals, setSelectedGoals)}
                        className={`p-3 rounded-xl text-xs font-medium border text-left transition-all ${
                          selectedGoals.includes(goal)
                            ? "bg-primary/15 border-primary text-primary"
                            : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                        }`}
                      >
                        {selectedGoals.includes(goal) && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                        {goal}
                      </motion.button>
                    ))}
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      You're joining <strong className="text-foreground">3,250+</strong> students already building on Codrithm.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 mt-4">
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} data-testid="button-back-step">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
              )}
              <Button
                className="flex-1 glow-primary"
                onClick={handleNext}
                data-testid="button-next-step"
              >
                {step === 2 ? (
                  <>Submit <CheckCircle2 className="w-4 h-4 ml-2" /></>
                ) : (
                  <>Next <ChevronRight className="w-4 h-4 ml-1" /></>
                )}
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
