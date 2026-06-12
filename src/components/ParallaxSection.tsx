import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  /** Speed of parallax effect. 0 = no movement, 0.5 = half speed, 1 = same speed, -0.5 = opposite direction */
  speed?: number;
  className?: string;
  /** Offset from center of viewport where effect starts (in pixels) */
  offset?: number;
  /** Axis of parallax movement */
  axis?: "y" | "x";
}

export function ParallaxSection({
  children,
  speed = 0.3,
  className,
  offset = 200,
  axis = "y",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const movement = useTransform(
    scrollYProgress,
    [0, 1],
    [offset * speed, -offset * speed]
  );

  const smoothMovement = useSpring(movement, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return (
    <div ref={ref} className={className}>
      <motion.div style={axis === "y" ? { y: smoothMovement } : { x: smoothMovement }}>
        {children}
      </motion.div>
    </div>
  );
}
