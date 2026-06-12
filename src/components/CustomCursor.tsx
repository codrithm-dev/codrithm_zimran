import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };
const hoverSelector =
  "a, button, [role='button'], input, select, textarea, label, [data-cursor-hover]";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorRingX = useMotionValue(-100);
  const cursorRingY = useMotionValue(-100);

  const ringX = useSpring(cursorRingX, springConfig);
  const ringY = useSpring(cursorRingY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorRingX.set(e.clientX);
      cursorRingY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveDocument = () => setIsVisible(false);

    // Event delegation for hover state — no MutationObserver needed
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.matches(hoverSelector) || target.closest(hoverSelector)) {
        setIsHovering(true);
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related || !related.closest(hoverSelector)) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveDocument);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveDocument);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
    // useState setters and useMotionValue objects are stable — safe with empty deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 8 : 6,
            height: isHovering ? 8 : 6,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full bg-white"
        />
      </motion.div>

      {/* Ring — follows with spring animation */}
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
            width: isHovering ? 40 : 28,
            height: isHovering ? 40 : 28,
            opacity: isVisible ? 1 : 0,
            borderColor: isHovering
              ? "hsl(var(--primary))"
              : "hsl(var(--foreground) / 0.3)",
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border"
          style={{ borderWidth: 1.5 }}
        />
      </motion.div>
    </>
  );
}
