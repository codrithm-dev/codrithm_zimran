import { useRef } from "react";
import { ArrowRight, Code2, Palette, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";
import { HeroStatCounter } from "@/components/HeroStatCounter";
import { useTheme } from "@/components/theme-provider";
import { gsap, useGSAP } from "@/lib/gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(iconsRef.current, { opacity: 0, scale: 0.6, duration: 0.5 })
        .from(headingRef.current, { opacity: 0, y: 30, duration: 0.6 }, "-=0.2")
        .from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.5 }, "-=0.25")
        .from(buttonsRef.current, { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(statsRef.current, { opacity: 0, y: 15, duration: 0.5 }, "-=0.2");
    },
    { scope: containerRef },
  );

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Subtle corner glows using brand colors */}
      {isDark ? (
        <>
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0,229,255,0.10) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </>
      ) : (
        <>
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(91,33,182,0.08) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center">
        {/* Icon badges — professional brand icons */}
        <div ref={iconsRef} className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-secondary/15 border border-secondary/20 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-secondary" />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-primary/70" />
          </div>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6"
          style={{ color: isDark ? "#FFFFFF" : "#1a1a2e" }}
        >
          Design, Build{" "}
          <span className="hero-gradient-text">&amp; Deploy</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}
        >
          From crafting stunning designs to building robust software and deploying
          it seamlessly, we&apos;re here to help your business shine.
        </p>

        {/* CTA Buttons — brand colors */}
        <div ref={buttonsRef} className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton pullDistance={10}>
            <a href="#contact">
              <Button
                size="lg"
                className="glow-primary text-base px-8 cursor-pointer font-semibold"
              >
                Contact Us <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </MagneticButton>
          <MagneticButton pullDistance={10}>
            <a href="#services">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 cursor-pointer font-semibold"
              >
                Explore Our Services
              </Button>
            </a>
          </MagneticButton>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex items-center justify-center gap-8 mt-14 text-sm" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>
          <HeroStatCounter value={50} suffix="+" label="Projects Delivered" duration={2} />
          <div className="w-px h-10" style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
          <HeroStatCounter value={3} suffix="K+" label="Students Trained" duration={1.8} delay={0.2} />
          <div className="w-px h-10" style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
          <HeroStatCounter value={99} suffix="%" label="Client Satisfaction" duration={2.2} delay={0.4} />
        </div>
      </div>
    </section>
  );
}
