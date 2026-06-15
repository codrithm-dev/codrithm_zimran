import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface GsapRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export function GsapReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 40,
  className = "",
  once = true,
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: distance };
      case "down": return { opacity: 0, y: -distance };
      case "left": return { opacity: 0, x: -distance };
      case "right": return { opacity: 0, x: distance };
    }
  };

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.from(ref.current, {
        ...getInitial(),
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
