import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface GsapStaggerProps {
  children: ReactNode;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  className?: string;
}

export function GsapStagger({
  children,
  stagger = 0.08,
  direction = "up",
  distance = 30,
  className = "",
}: GsapStaggerProps) {
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

      const children = ref.current.children;
      if (!children.length) return;

      gsap.from(children, {
        ...getInitial(),
        duration: 0.5,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
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
