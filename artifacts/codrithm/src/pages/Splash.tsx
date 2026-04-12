import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";

export default function Splash() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2.5;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setLocation("/home"), 500);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [progress, setLocation]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-background flex flex-col items-center justify-center overflow-hidden z-[100]"
        >
          <div className="absolute inset-0 grid-bg opacity-20" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[600px] h-[600px] rounded-full border border-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] rounded-full border border-secondary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-2xl pointer-events-none"
              style={{
                left: `${10 + i * 16}%`,
                top: `${15 + (i % 3) * 25}%`,
                width: 120 + i * 20,
                height: 120 + i * 20,
                backgroundColor: ["#8b5cf6", "#06b6d4", "#6366f1", "#a78bfa", "#0891b2", "#7c3aed"][i],
                opacity: 0.08,
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center gap-6 px-8">
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.9, delay: 0.1 }}
              className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center glow-primary"
            >
              <Code2 className="w-10 h-10 text-primary" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl sm:text-6xl font-black text-gradient mb-2">Codrithm</h1>
              <p className="text-muted-foreground text-lg font-medium tracking-widest uppercase text-sm">
                Build. Learn. Grow Together.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="w-64"
            >
              <div className="h-1 rounded-full bg-muted/40 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.06 }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center tracking-wide">
                Loading experience...
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
