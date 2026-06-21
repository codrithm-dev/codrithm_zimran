import { useRef } from "react";
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
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Aurora — only render in dark mode to avoid solid block on light backgrounds */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <SoftAurora
            speed={0.4}
            scale={1.8}
            brightness={0.5}
            color1="#7C3AED"
            color2="#00E5FF"
            bandHeight={0.45}
            bandSpread={1.2}
            noiseFrequency={2.2}
            noiseAmplitude={0.8}
            octaveDecay={0.12}
            className="opacity-80"
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 100% 60% at 50% 0%, transparent 0%, rgba(10,10,20,0.4) 60%, rgba(10,10,20,0.8) 100%)"
            : "radial-gradient(ellipse 100% 60% at 50% 0%, transparent 0%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.7) 100%)",
        }}
      />

      {/* Floating particles */}
      <FloatingParticles count={35} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
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
            <span className="hero-gradient-text" style={{ display: "block" }}>
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
              <a href="#contact">
                <Button size="lg" className="glow-primary text-base px-6 cursor-pointer">
                  Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </MagneticButton>
            <MagneticButton pullDistance={10}>
              <a href="#services">
                <Button size="lg" variant="outline" className="text-base px-6 cursor-pointer">
                  Our Services
                </Button>
              </a>
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
