import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/Footer";

function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"][Math.floor(Math.random() * 5)],
    delay: Math.random() * 0.8,
    duration: 1.5 + Math.random() * 1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{ left: `${p.x}%`, top: -10, backgroundColor: p.color }}
          initial={{ y: -10, opacity: 1, rotate: 0, scale: 1 }}
          animate={{ y: window.innerHeight + 20, opacity: 0, rotate: 720, scale: 0.5 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

export default function Confirmation() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AnimatePresence>
        {showConfetti && <Confetti key="confetti" />}
      </AnimatePresence>

      <div className="flex-1 flex items-center justify-center px-4 relative">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative z-10 text-center max-w-md"
          data-testid="confirmation-container"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <motion.div
                className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center glow-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, duration: 0.8 }}
              >
                <svg viewBox="0 0 50 50" className="w-12 h-12">
                  <motion.path
                    d="M 10 25 L 22 37 L 40 15"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  />
                </svg>
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{ scale: [1, 1.4, 1.6], opacity: [0.6, 0.3, 0] }}
                transition={{ duration: 1.5, delay: 0.8, repeat: 2 }}
              />
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-black mb-3"
          >
            Welcome to <span className="text-gradient">Codrithm</span>!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground mb-8 text-lg"
          >
            Your application has been submitted. You're now part of a community of 3,250+ student developers building the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/categories">
              <Button size="lg" className="glow-primary" data-testid="button-explore-categories">
                Explore Categories <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button size="lg" variant="outline" data-testid="button-view-profile">
                View Profile
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
