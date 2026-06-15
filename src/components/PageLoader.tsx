import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Code2 } from "lucide-react";

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
        },
      });

      // Logo icon entrance — scale + rotate bounce
      tl.from(logoRef.current, {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

      // Logo text characters stagger in
      if (textRef.current) {
        const chars = textRef.current.querySelectorAll("span");
        tl.from(
          chars,
          {
            opacity: 0,
            y: 20,
            rotateX: -90,
            duration: 0.4,
            stagger: 0.03,
            ease: "power3.out",
          },
          "-=0.2",
        );
      }

      // Glow pulse behind logo
      tl.from(
        glowRef.current,
        {
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6",
      );

      // Progress bar fill
      tl.to(
        progressRef.current,
        {
          width: "100%",
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.6",
      );

      // Everything slides up and fades out
      tl.to(containerRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
        delay: 0.15,
      });
    },
    { scope: containerRef },
  );

  if (!isVisible) return null;

  const logoText = "Codrithm";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
        }}
      />

      {/* Logo icon */}
      <div ref={logoRef} className="relative z-10 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
          <Code2 className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>

      {/* Logo text — character by character */}
      <div ref={textRef} className="relative z-10 flex mb-8">
        {logoText.split("").map((char, i) => (
          <span
            key={i}
            className="text-3xl font-black text-gradient"
            style={{ display: "inline-block" }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-48 h-1 rounded-full bg-muted overflow-hidden">
        <div
          ref={progressRef}
          className="h-full rounded-full"
          style={{
            width: "0%",
            background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))",
          }}
        />
      </div>
    </div>
  );
}
