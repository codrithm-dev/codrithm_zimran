import { useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";
import { FloatingParticles } from "@/components/FloatingParticles";
import { HeroStatCounter } from "@/components/HeroStatCounter";
import SoftAurora from "@/components/SoftAurora";
import { useTheme } from "@/components/theme-provider";
import { gsap, useGSAP } from "@/lib/gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, { opacity: 0, scale: 0.8, duration: 0.5 })
        .from(headingRef.current, { opacity: 0, y: 40, duration: 0.7 }, "-=0.2")
        .from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.5 }, "-=0.3")
        .from(buttonsRef.current, { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(statsRef.current, { opacity: 0, y: 20, duration: 0.5 }, "-=0.2");
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Aurora background */}
      <div className="absolute inset-0">
        <SoftAurora
          speed={0.4}
          scale={1.8}
          brightness={isDark ? 0.6 : 0.35}
          color1={isDark ? "#7C3AED" : "#9F67FF"}
          color2={isDark ? "#00E5FF" : "#00B8D4"}
          bandHeight={0.45}
          bandSpread={1.2}
        />
      </div>

      {/* Floating particles */}
      <FloatingParticles count={35} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div ref={badgeRef} className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
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
                background: isDark
                  ? "linear-gradient(to right, #7C3AED, #00E5FF)"
                  : "linear-gradient(to right, #5B21B6, #0891B2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Where Coders Make History
            </span>
            <span style={{ display: "block", color: isDark ? "#FFFFFF" : "#1a1a2e" }}>
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
