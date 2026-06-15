import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface HeroStatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  delay?: number;
}

export function HeroStatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 2,
  delay = 0,
}: HeroStatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useGSAP(
    () => {
      if (!ref.current) return;

      const obj = { val: 0 };

      gsap.to(obj, {
        val: value,
        duration,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          setDisplayValue(Math.round(obj.val));
        },
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [value, duration, delay] },
  );

  return (
    <div ref={ref}>
      <div className="text-2xl font-bold text-foreground">
        {prefix}{displayValue}{suffix}
      </div>
      <div>{label}</div>
    </div>
  );
}
