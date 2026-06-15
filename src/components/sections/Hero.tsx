import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticButton } from "@/components/MagneticButton";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                <Sparkles className="w-3 h-3" />
                Software Solutions & Tech Education
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6">
              <span className="text-gradient">Engineering</span>{" "}
              the Future of{" "}
              <span className="text-gradient">Technology</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Codrithm delivers enterprise software solutions and cultivates the next generation
              of developers through hands-on, project-based learning.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <MagneticButton pullDistance={10}>
                <Link href="/contact">
                  <Button size="lg" className="glow-primary text-base px-6 cursor-pointer">
                    Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton pullDistance={10}>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="text-base px-6 cursor-pointer">
                    Our Services
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex items-center gap-8 mt-12 text-sm text-muted-foreground">
              <div>
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div>Projects Delivered</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">3K+</div>
                <div>Students Trained</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">99%</div>
                <div>Client Satisfaction</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
