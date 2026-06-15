import { motion } from "framer-motion";
import { Rocket, Zap, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { MagneticButton } from "@/components/MagneticButton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const CURRENT_PRODUCTS = [
  {
    name: "Codrithm Learning Platform",
    description: "A comprehensive learning management system with real-time collaboration, progress tracking, and AI-powered course recommendations.",
    status: "Live",
    features: ["AI Study Recommendations", "Real-time Collaboration", "Progress Analytics", "Community Forums"],
    icon: <Rocket className="w-6 h-6" />,
    color: "text-emerald-500",
  },
  {
    name: "AI Study Buddy",
    description: "An intelligent chatbot that helps students with coding questions, concept explanations, and personalized study plans.",
    status: "Live",
    features: ["Code Review", "Concept Explanations", "Study Plan Generation", "24/7 Availability"],
    icon: <Zap className="w-6 h-6" />,
    color: "text-cyan-500",
  },
];

const UPCOMING_PRODUCTS = [
  {
    name: "Codrithm IDE",
    description: "A browser-based development environment with collaborative coding, AI code completion, and instant deployment.",
    status: "In Development",
    eta: "Q3 2026",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    name: "Mentorship Marketplace",
    description: "Connect students with industry professionals for 1-on-1 mentorship sessions, career guidance, and code reviews.",
    status: "Planning",
    eta: "Q4 2026",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    name: "Certification Engine",
    description: "Earn industry-recognized certifications by completing hands-on projects and passing skill assessments.",
    status: "Planning",
    eta: "Q1 2027",
    icon: <Clock className="w-6 h-6" />,
  },
];

const ROADMAP = [
  { quarter: "Q2 2026", items: ["AI Study Buddy v2", "Mobile App Launch", "Community Forums"] },
  { quarter: "Q3 2026", items: ["Codrithm IDE Beta", "API Public Release", "Certification Pilot"] },
  { quarter: "Q4 2026", items: ["Mentorship Marketplace", "Enterprise Features", "Global Partnerships"] },
  { quarter: "Q1 2027", items: ["Certification Engine", "Codrithm IDE GA", "10K Member Milestone"] },
];

export default function Products() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <ParallaxBackground count={3} showParticles={true} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-black mb-3">
                Our <span className="text-gradient">Products</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Tools and platforms built by students, for students. Powered by AI, designed for learning.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-muted/20 relative overflow-hidden">
          <ParallaxBackground count={2} showParticles={false} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="mb-8">
              <h2 className="text-2xl font-bold">Current Products</h2>
              <p className="text-muted-foreground text-sm mt-1">Available now for all community members.</p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-6">
              {CURRENT_PRODUCTS.map((product, i) => (
                <ScrollReveal key={product.name} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card border border-card-border rounded-xl p-6 h-full hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${product.color}`}>
                        {product.icon}
                      </div>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400">
                        {product.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <ParallaxBackground count={2} showParticles={false} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="mb-8">
              <h2 className="text-2xl font-bold">Coming Soon</h2>
              <p className="text-muted-foreground text-sm mt-1">Next-generation tools in development.</p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-6">
              {UPCOMING_PRODUCTS.map((product, i) => (
                <ScrollReveal key={product.name} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card border border-card-border rounded-xl p-5 h-full hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground">
                        {product.icon}
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400">
                        {product.status}
                      </span>
                    </div>
                    <h3 className="font-bold mb-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{product.description}</p>
                    <span className="text-xs text-primary font-mono">ETA: {product.eta}</span>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/20 relative overflow-hidden">
          <ParallaxBackground count={3} showParticles={true} />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Product Roadmap</h2>
              <p className="text-muted-foreground">Our vision for the next year.</p>
            </ScrollReveal>
            <ParallaxSection speed={0.15}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ROADMAP.map((phase, i) => (
                  <ScrollReveal key={phase.quarter} delay={i * 0.1}>
                    <div className="bg-card border border-card-border rounded-xl p-5 h-full">
                      <span className="text-xs font-mono text-primary font-bold">{phase.quarter}</span>
                      <ul className="mt-3 space-y-2">
                        {phase.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ParallaxSection>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <ParallaxBackground count={2} showParticles={false} />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <ParallaxSection speed={0.2}>
              <ScrollReveal>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-12">
                  <h2 className="text-3xl font-black mb-4">
                    Want early <span className="text-gradient">access?</span>
                  </h2>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Join our community to get early access to all new products and features.
                  </p>
                  <MagneticButton pullDistance={12}>
                    <Link href="/join">
                      <Button size="lg" className="glow-primary text-base px-8 cursor-pointer">
                        Join Beta Program <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </MagneticButton>
                </div>
              </ScrollReveal>
            </ParallaxSection>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
