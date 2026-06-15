import { useRef, type ElementType } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface GsapTextRevealProps {
  children: string;
  as?: ElementType;
  split?: "chars" | "words";
  stagger?: number;
  delay?: number;
  className?: string;
}

export function GsapTextReveal({
  children,
  as: Tag = "h1",
  split = "words",
  stagger = 0.04,
  delay = 0,
  className = "",
}: GsapTextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const text = ref.current;
      const originalHTML = text.innerHTML;
      const textContent = text.textContent || "";

      const parts = split === "words"
        ? textContent.split(/\s+/).filter(Boolean)
        : textContent.split("").filter((c) => c !== " ");

      text.innerHTML = parts
        .map((p) => `<span style="display:inline-block;overflow:hidden"><span style="display:inline-block">${p}</span></span>`)
        .join(split === "words" ? " " : "");

      const spans = text.querySelectorAll("span > span");

      gsap.from(spans, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          text.innerHTML = originalHTML;
        },
      });
    },
    { scope: ref, dependencies: [split, stagger, delay] },
  );

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
