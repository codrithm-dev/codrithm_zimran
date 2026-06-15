import { motion } from "framer-motion";
import { Target, Eye, Heart, Rocket, Users, Code2, Lightbulb, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { StatCard } from "@/components/StatCard";
import { MagneticButton } from "@/components/MagneticButton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const VALUES = [
  { icon: <Lightbulb className="w-5 h-5" />, title: "Innovation", description: "We encourage creative problem-solving and experimentation with emerging technologies." },
  { icon: <Users className="w-5 h-5" />, title: "Community", description: "We believe in the power of collaboration and peer-to-peer learning." },
  { icon: <Code2 className="w-5 h-5" />, title: "Excellence", description: "We strive for high-quality code, designs, and learning experiences." },
  { icon: <Globe className="w-5 h-5" />, title: "Inclusivity", description: "Every student, regardless of background, deserves access to tech education." },
];

const TIMELINE = [
  { year: "2024", title: "Founded", description: "Codrithm started as a small study group of 20 students at a university campus." },
  { year: "2024", title: "First Hackathon", description: "Hosted our first hackathon with 200 participants from 15 universities." },
  { year: "2025", title: "Platform Launch", description: "Launched the online learning platform with 5 tech categories and 1,000 members." },
  { year: "2025", title: "Community Growth", description: "Reached 3,000+ active members across 10 specializations." },
  { year: "2026", title: "AI Integration", description: "Introduced AI-powered learning recommendations and study tools." },
  { year: "2027", title: "Global Expansion", description: "Target: 10,000+ members, partnerships with 50 universities worldwide." },
];

export default function About() {
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
                About <span className="text-gradient">Codrithm</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We're on a mission to make tech education accessible, collaborative, and impactful for every student developer.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={<Users className="w-5 h-5" />} label="Active Members" value={3250} suffix="+" delay={0} />
              <StatCard icon={<Globe className="w-5 h-5" />} label="Universities" value={50} delay={0.1} color="text-secondary" />
              <StatCard icon={<Rocket className="w-5 h-5" />} label="Projects Built" value={890} suffix="+" delay={0.2} color="text-chart-3" />
              <StatCard icon={<Code2 className="w-5 h-5" />} label="Open Source Repos" value={120} suffix="+" delay={0.3} color="text-chart-4" />
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/20 relative overflow-hidden">
          <ParallaxBackground count={2} showParticles={false} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ParallaxSection speed={0.15}>
                <ScrollReveal>
                  <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Codrithm was born from a simple observation: student developers often learn best when they learn together. What started as a small study group of 20 passionate students quickly grew into a thriving community of thousands.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, Codrithm connects student developers across 50+ universities, providing them with hands-on learning experiences, mentorship, project collaboration opportunities, and a supportive community that lasts beyond graduation.
                  </p>
                </ScrollReveal>
              </ParallaxSection>

              <ParallaxSection speed={-0.1}>
                <ScrollReveal delay={0.2}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card border border-card-border rounded-xl p-5 text-center">
                      <Eye className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h3 className="font-bold text-sm mb-1">Our Vision</h3>
                      <p className="text-xs text-muted-foreground">A world where every student developer has the resources, community, and confidence to build amazing things.</p>
                    </div>
                    <div className="bg-card border border-card-border rounded-xl p-5 text-center">
                      <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h3 className="font-bold text-sm mb-1">Our Mission</h3>
                      <p className="text-xs text-muted-foreground">To empower student developers through collaborative learning, hands-on projects, and a vibrant global community.</p>
                    </div>
                  </div>
                </ScrollReveal>
              </ParallaxSection>
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <ParallaxBackground count={2} showParticles={false} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Core Values</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">The principles that guide everything we do.</p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {VALUES.map((value, i) => (
                <ScrollReveal key={value.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card border border-card-border rounded-xl p-6 text-center h-full hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                      {value.icon}
                    </div>
                    <h3 className="font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/20 relative overflow-hidden">
          <ParallaxBackground count={3} showParticles={true} />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Our Journey</h2>
              <p className="text-muted-foreground">From a small study group to a global community.</p>
            </ScrollReveal>
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-border" />
              {TIMELINE.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className={`relative flex items-center mb-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    <div className="w-1/2 flex justify-end pr-8">
                      {i % 2 === 0 && (
                        <div className="bg-card border border-card-border rounded-xl p-4 max-w-sm">
                          <span className="text-xs font-mono text-primary">{item.year}</span>
                          <h4 className="font-bold text-sm mt-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      )}
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10" />
                    <div className="w-1/2 flex justify-start pl-8">
                      {i % 2 !== 0 && (
                        <div className="bg-card border border-card-border rounded-xl p-4 max-w-sm">
                          <span className="text-xs font-mono text-primary">{item.year}</span>
                          <h4 className="font-bold text-sm mt-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <ParallaxBackground count={2} showParticles={false} />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <ParallaxSection speed={0.2}>
              <ScrollReveal>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-12">
                  <h2 className="text-4xl font-black mb-4">
                    Ready to <span className="text-gradient">join us?</span>
                  </h2>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Be part of a community that's shaping the future of tech education.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <MagneticButton pullDistance={12}>
                      <Link href="/join">
                        <Button size="lg" className="glow-primary text-base px-8 cursor-pointer">
                          Join the Community
                        </Button>
                      </Link>
                    </MagneticButton>
                    <MagneticButton pullDistance={12}>
                      <Link href="/services">
                        <Button size="lg" variant="outline" className="text-base px-8 cursor-pointer">
                          Our Services
                        </Button>
                      </Link>
                    </MagneticButton>
                  </div>
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
