import { Link } from "wouter";
import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
  /** If provided, forces logo height in pixels */
  heightPx?: number;
}

const sizes = {
  sm: { icon: "w-6 h-6", iconInner: "w-3 h-3", text: "text-base" },
  md: { icon: "w-8 h-8", iconInner: "w-4 h-4", text: "text-lg" },
  lg: { icon: "w-10 h-10", iconInner: "w-5 h-5", text: "text-xl" },
};

export function Logo({ size = "md", showText = true, href = "/", heightPx }: LogoProps) {
  const s = sizes[size];
  const imgStyle: React.CSSProperties = heightPx
    ? { height: `${heightPx}px`, width: "auto" }
    : { height: "1em", width: "auto" };

  return (
    <Link href={href}>
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="inline-flex items-center justify-center rounded-lg">
          <img
            src="/assets/codrithm-logo.svg"
            alt="Codrithm"
            className="object-contain"
            style={imgStyle}
          />
        </div>
        {showText && (
          <span
            className={`font-bold ${s.text}`}
            style={{ fontFamily: "'Comfortaa', cursive", fontWeight: 700, color: "#2B64D9" }}
          >
            Codrithm
          </span>
        )}
      </motion.div>
    </Link>
  );
}
