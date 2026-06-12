import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Orb {
  x: string;
  y: string;
  size: number;
  color: string;
  speed: number;
  delay: number;
}

const ORBS: Orb[] = [
  { x: "5%", y: "10%", size: 300, color: "#8b5cf6", speed: 0.15, delay: 0 },
  { x: "80%", y: "20%", size: 250, color: "#06b6d4", speed: 0.25, delay: 0.5 },
  { x: "60%", y: "70%", size: 200, color: "#6366f1", speed: 0.2, delay: 1 },
  { x: "15%", y: "65%", size: 220, color: "#a78bfa", speed: 0.35, delay: 0.3 },
  { x: "85%", y: "75%", size: 180, color: "#0891b2", speed: 0.18, delay: 0.8 },
  { x: "35%", y: "5%", size: 160, color: "#7c3aed", speed: 0.3, delay: 1.2 },
];

function ParallaxOrb({ orb }: { orb: Orb }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yMovement = useTransform(
    scrollYProgress,
    [0, 1],
    [orb.size * orb.speed * -0.5, orb.size * orb.speed * 0.5]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.06, 0.12, 0.12, 0.06]
  );

  const smoothY = useSpring(yMovement, { stiffness: 50, damping: 20 });
  const smoothOpacity = useSpring(opacity, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{
        left: orb.x,
        top: orb.y,
        width: orb.size,
        height: orb.size,
        backgroundColor: orb.color,
        y: smoothY,
        opacity: smoothOpacity,
      }}
    />
  );
}

interface ParallaxBackgroundProps {
  /** Number of orbs to show (max 6) */
  count?: number;
  /** Extra layer of floating particles */
  showParticles?: boolean;
}

export function ParallaxBackground({
  count = 4,
  showParticles = true,
}: ParallaxBackgroundProps) {
  const visibleOrbs = ORBS.slice(0, Math.min(count, ORBS.length));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {visibleOrbs.map((orb, i) => (
        <ParallaxOrb key={i} orb={orb} />
      ))}

      {showParticles && (
        <ParallaxParticles />
      )}
    </div>
  );
}

function ParallaxParticles() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 12 }).map((_, i) => (
        <ParallaxParticle key={i} index={i} />
      ))}
    </div>
  );
}

function ParallaxParticle({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const direction = index % 2 === 0 ? 1 : -1;
  const amplitude = 20 + (index % 5) * 15;
  const x = 5 + (index * 8) % 90;
  const y = 10 + (index * 13) % 80;

  const movement = useTransform(
    scrollYProgress,
    [0, 1],
    [-amplitude * direction, amplitude * direction]
  );

  const particleOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.6, 0.6, 0]
  );

  const smoothMovement = useSpring(movement, { stiffness: 40, damping: 15 });
  const smoothOpacity = useSpring(particleOpacity, { stiffness: 40, damping: 15 });

  return (
    <motion.div
      ref={ref}
      className="absolute w-1 h-1 rounded-full bg-primary/40"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        x: smoothMovement,
        opacity: smoothOpacity,
      }}
    />
  );
}
