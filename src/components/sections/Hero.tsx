import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";
import { FloatingParticles } from "@/components/FloatingParticles";
import { HeroStatCounter } from "@/components/HeroStatCounter";
import { gsap, useGSAP } from "@/lib/gsap";
import { useTheme } from "@/components/theme-provider";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const blobLeftRef = useRef<HTMLDivElement>(null);
  const blobRightRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, { opacity: 0, scale: 0.8, duration: 0.5 })
        .from(headingRef.current, { opacity: 0, y: 40, duration: 0.7 }, "-=0.2")
        .from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.5 }, "-=0.3")
        .from(buttonsRef.current, { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(statsRef.current, { opacity: 0, y: 20, duration: 0.5 }, "-=0.2");

      // Floating blob animation
      if (blobLeftRef.current) {
        gsap.to(blobLeftRef.current, {
          y: 30,
          x: 15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (blobRightRef.current) {
        gsap.to(blobRightRef.current, {
          y: -25,
          x: -20,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative z-0 min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Floating particles */}
      <FloatingParticles count={35} />

      <div ref={blobLeftRef} className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div ref={blobRightRef} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div ref={badgeRef} className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium" style={{ color: isDark ? '#FFFFFF' : '#0A0F1E' }}>
              <Sparkles className="w-3 h-3" />
              Software Solutions & Tech Education
            </div>
          </div>

          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6"
          >
            <span
              style={{
                display: "block",
                background: "linear-gradient(to right, #2B64D9, #8BECAE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Where Coders Make History
            </span>
            <span style={{ display: "block", color: isDark ? '#FFFFFF' : '#0A0F1E' }}>
              coding the logic, crafting the flow
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl"
          >
            Codrithm delivers enterprise software solutions and cultivates the next generation
            of developers through hands-on, project-based learning.
          </p>

          <div ref={buttonsRef} className="flex flex-wrap gap-3">
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

          <div ref={statsRef} className="flex items-center gap-8 mt-12 text-sm text-muted-foreground">
            <HeroStatCounter value={50} suffix="+" label="Projects Delivered" duration={2} />
            <div className="w-px h-10 bg-border" />
            <HeroStatCounter value={3} suffix="K+" label="Students Trained" duration={1.8} delay={0.2} />
            <div className="w-px h-10 bg-border" />
            <HeroStatCounter value={99} suffix="%" label="Client Satisfaction" duration={2.2} delay={0.4} />
          </div>
        </div>
      </div>
    </section>
  );
}
