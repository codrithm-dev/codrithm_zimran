import { useRef, useMemo } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export function FloatingParticles({ count = 30, className = "" }: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, [count]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const dots = containerRef.current.querySelectorAll(".particle");

      dots.forEach((dot) => {
        const el = dot as HTMLElement;
        const dur = parseFloat(el.dataset.duration || "8");
        const del = parseFloat(el.dataset.delay || "0");

        gsap.to(el, {
          y: `${-20 + Math.random() * 40}`,
          x: `${-15 + Math.random() * 30}`,
          duration: dur,
          delay: del,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(el, {
          opacity: parseFloat(el.dataset.opacity || "0.2") * 1.5,
          duration: dur * 0.6,
          delay: del,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle absolute rounded-full bg-primary"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          data-duration={p.duration}
          data-delay={p.delay}
          data-opacity={p.opacity}
        />
      ))}
    </div>
  );
}
