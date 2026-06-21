import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// Elements that trigger the "hover" (scale-up ring) state
const interactiveSelector =
  "a, button, [role='button'], input, select, textarea, label, [data-cursor-hover]";

// Elements that trigger the "text" cursor state
const textSelector = "p, h1, h2, h3, h4, h5, h6, span, li, blockquote, [data-cursor-text]";

// Spring configs
const dotSpring   = { stiffness: 800, damping: 30, mass: 0.3 };
const ringSpring  = { stiffness: 180, damping: 22, mass: 0.6 };
const trailSpring = { stiffness: 80,  damping: 20, mass: 1.0 };

type CursorState = "default" | "hover" | "text" | "clicking";

// Trail dot positions
const TRAIL_COUNT = 6;

interface TrailDot {
  id: number;
  x: useMotionValue<number>;
  y: useMotionValue<number>;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
}

export function CustomCursor() {
  const [state, setState]         = useState<CursorState>("default");
  const [visible, setVisible]     = useState(false);
  const [clicks, setClicks]       = useState<number[]>([]);
  const idleTimer                 = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Primary dot (instant follow)
  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);

  // Ring (smooth follow)
  const rawRingX = useMotionValue(-200);
  const rawRingY = useMotionValue(-200);
  const ringX = useSpring(rawRingX, ringSpring);
  const ringY = useSpring(rawRingY, ringSpring);

  // Build trail dots (each one follows the previous with increasing lag)
  const trailDots = useRef<TrailDot[]>(
    Array.from({ length: TRAIL_COUNT }, (_, i) => {
      const x = useMotionValue(-200);
      const y = useMotionValue(-200);
      const lag = { stiffness: Math.max(30, trailSpring.stiffness - i * 18), damping: trailSpring.damping + i * 2, mass: trailSpring.mass + i * 0.15 };
      return { id: i, x, y, sx: useSpring(x, lag), sy: useSpring(y, lag) };
    })
  ).current;

  const resetIdle = useCallback(() => {
    setVisible(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setVisible(false), 3000);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      rawRingX.set(e.clientX);
      rawRingY.set(e.clientY);
      trailDots.forEach((dot) => {
        dot.x.set(e.clientX);
        dot.y.set(e.clientY);
      });
      resetIdle();
    };

    const onLeave = () => setVisible(false);

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.matches(interactiveSelector) || t.closest(interactiveSelector)) {
        setState("hover");
      } else if (t.matches(textSelector) || t.closest(textSelector)) {
        setState("text");
      } else {
        setState("default");
      }
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related || (!related.closest(interactiveSelector) && !related.closest(textSelector))) {
        setState("default");
      }
    };

    const onDown = () => setState("clicking");
    const onUp   = (e: MouseEvent) => {
      // Re-evaluate state on mouseup
      const t = document.elementFromPoint(e.clientX, e.clientY) as Element | null;
      if (t?.matches(interactiveSelector) || t?.closest(interactiveSelector)) {
        setState("hover");
      } else {
        setState("default");
      }
      // Trigger click burst
      setClicks((prev) => [...prev, Date.now()]);
      setTimeout(() => setClicks((prev) => prev.slice(1)), 600);
    };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetIdle]);

  if (isTouchDevice) return null;

  // Derived ring size / color per state
  const ringSize =
    state === "hover"    ? 48 :
    state === "text"     ? 56 :
    state === "clicking" ? 20 :
                            28;

  const ringBorder =
    state === "hover"
      ? "hsl(var(--primary))"
      : state === "text"
      ? "hsl(var(--secondary))"
      : "hsl(var(--foreground) / 0.25)";

  const dotSize =
    state === "clicking" ? 4 :
    state === "hover"    ? 6 :
                            5;

  return (
    <>
      {/* ── Trail dots ─────────────────────────────────────────── */}
      {trailDots.map((dot, i) => (
        <motion.div
          key={dot.id}
          className="fixed top-0 left-0 pointer-events-none z-[9995] rounded-full"
          style={{
            x: dot.sx,
            y: dot.sy,
            translateX: "-50%",
            translateY: "-50%",
            width: Math.max(2, dotSize - 1 - i * 0.4),
            height: Math.max(2, dotSize - 1 - i * 0.4),
            opacity: visible ? (0.35 - i * 0.05) : 0,
            backgroundColor:
              state === "hover"
                ? "hsl(var(--primary))"
                : state === "text"
                ? "hsl(var(--secondary))"
                : "hsl(var(--foreground) / 0.5)",
            transition: "background-color 0.2s, opacity 0.3s",
          }}
        />
      ))}

      {/* ── Ring ───────────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width:   ringSize,
            height:  ringSize,
            opacity: visible ? (state === "clicking" ? 0.5 : 1) : 0,
            borderColor: ringBorder,
            scale: state === "clicking" ? 0.85 : 1,
            rotate: state === "hover" ? 45 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-full border"
          style={{ borderWidth: state === "text" ? 1 : 1.5 }}
        />
      </motion.div>

      {/* ── Primary dot ────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width:   dotSize,
            height:  dotSize,
            opacity: visible ? 1 : 0,
            scale:   state === "clicking" ? 0.6 : 1,
          }}
          transition={{ duration: 0.12 }}
          className="rounded-full bg-white"
        />
      </motion.div>

      {/* ── Click burst rings ──────────────────────────────────── */}
      <AnimatePresence>
        {clicks.map((id) => (
          <motion.div
            key={id}
            className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border"
            style={{
              x: dotX,
              y: dotY,
              translateX: "-50%",
              translateY: "-50%",
              borderColor: "hsl(var(--primary))",
              borderWidth: 1.5,
            }}
            initial={{ width: 10, height: 10, opacity: 0.9 }}
            animate={{ width: 60, height: 60, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
