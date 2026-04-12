import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

function FloatingOrb({ x, y, size, color, delay }: {
  x: string; y: string; size: number; color: string; delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-xl pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.15,
      }}
      animate={{
        y: [0, -20, 0],
        scale: [1, 1.1, 1],
        opacity: [0.12, 0.2, 0.12],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function GeometricShape({ x, y, delay, color }: {
  x: string; y: string; delay: number; color: string;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none border-2 rounded-lg"
      style={{
        left: x,
        top: y,
        width: 40 + Math.random() * 30,
        height: 40 + Math.random() * 30,
        borderColor: `${color}40`,
        backgroundColor: `${color}08`,
      }}
      animate={{
        rotate: [0, 180, 360],
        y: [0, -15, 0],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 6 + delay * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <FloatingOrb x="10%" y="15%" size={300} color="#8b5cf6" delay={0} />
      <FloatingOrb x="70%" y="60%" size={250} color="#06b6d4" delay={1.5} />
      <FloatingOrb x="50%" y="10%" size={200} color="#6366f1" delay={0.8} />
      <FloatingOrb x="85%" y="20%" size={180} color="#a78bfa" delay={2} />
      <FloatingOrb x="20%" y="70%" size={220} color="#0891b2" delay={1} />

      <GeometricShape x="15%" y="25%" delay={0} color="#8b5cf6" />
      <GeometricShape x="75%" y="15%" delay={1} color="#06b6d4" />
      <GeometricShape x="60%" y="70%" delay={0.5} color="#6366f1" />
      <GeometricShape x="5%" y="60%" delay={2} color="#a78bfa" />
      <GeometricShape x="85%" y="55%" delay={1.5} color="#8b5cf6" />
      <GeometricShape x="40%" y="80%" delay={0.8} color="#06b6d4" />

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
