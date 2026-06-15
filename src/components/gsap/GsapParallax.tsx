import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface GsapParallaxProps {
  children: ReactNode;
  speed?: number;
  axis?: "y" | "x";
  className?: string;
}

export function GsapParallax({
  children,
  speed = 0.5,
  axis = "y",
  className = "",
}: GsapParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const prop = axis === "y" ? "y" : "x";

      gsap.to(ref.current, {
        [prop]: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref, dependencies: [speed, axis] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
