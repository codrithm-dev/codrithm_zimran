import { Brain, Code2, Cloud, Lightbulb, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { ServiceCard } from "@/components/ServiceCard";
import { MagneticButton } from "@/components/MagneticButton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const SERVICES = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI & Machine Learning",
    description: "Harness the power of artificial intelligence to build intelligent systems that learn, adapt, and solve real-world problems.",
    items: ["Model Development", "AI Integration", "Chatbots", "Predictive Analytics"],
    color: "text-cyan-500",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Full Stack Development",
    description: "End-to-end web application development with modern frameworks, scalable architectures, and pixel-perfect UIs.",
    items: ["Frontend Applications", "Backend APIs", "Database Design", "Performance Optimization"],
    color: "text-indigo-500",
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Cloud & DevOps",
    description: "Deploy, scale, and manage your applications with industry-standard cloud infrastructure and DevOps practices.",
    items: ["AWS Solutions", "CI/CD Pipelines", "Docker & Kubernetes", "Infrastructure Automation"],
    color: "text-orange-500",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Consulting",
    description: "Strategic technical guidance to help your team make informed decisions, optimize processes, and ship faster.",
    items: ["Technical Consulting", "Architecture Design", "Product Strategy", "Code Review"],
    color: "text-pink-500",
  },
];

export default function Services() {
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
                Our <span className="text-gradient">Services</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From AI development to cloud infrastructure, we provide comprehensive tech solutions powered by talented student developers.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-muted/20 relative overflow-hidden">
          <ParallaxBackground count={2} showParticles={false} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid sm:grid-cols-2 gap-6">
              {SERVICES.map((service, i) => (
                <ServiceCard
                  key={service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  items={service.items}
                  color={service.color}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <ParallaxBackground count={2} showParticles={false} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ParallaxSection speed={0.15}>
                <ScrollReveal>
                  <h2 className="text-3xl font-bold mb-4">Why Choose Codrithm?</h2>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-sm">01</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Fresh Perspectives</h4>
                        <p className="text-sm text-muted-foreground">Student developers bring innovative approaches and cutting-edge knowledge.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-sm">02</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Cost-Effective</h4>
                        <p className="text-sm text-muted-foreground">High-quality work at competitive rates, with flexible engagement models.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-sm">03</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Mentorship-Driven</h4>
                        <p className="text-sm text-muted-foreground">Every project is guided by experienced industry mentors.</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </ParallaxSection>

              <ParallaxSection speed={-0.1}>
                <ScrollReveal delay={0.2}>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold mb-3">Ready to work with us?</h3>
                    <p className="text-muted-foreground mb-6">Get in touch to discuss your project needs.</p>
                    <MagneticButton pullDistance={10}>
                      <Link href="/contact">
                        <Button size="lg" className="glow-primary cursor-pointer">
                          Start a Project <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </MagneticButton>
                  </div>
                </ScrollReveal>
              </ParallaxSection>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
