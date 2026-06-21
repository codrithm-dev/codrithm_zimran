import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
  /** If provided, forces logo height in pixels */
  heightPx?: number;
}

const sizes = {
  sm: { icon: "w-6 h-6", iconInner: "w-3 h-3", text: "text-xl" },
  md: { icon: "w-8 h-8", iconInner: "w-4 h-4", text: "text-2xl" },
  lg: { icon: "w-10 h-10", iconInner: "w-5 h-5", text: "text-3xl" },
};

export function Logo({ size = "md", showText = true, href = "/", heightPx }: LogoProps) {
  const s = sizes[size];
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const imgStyle: React.CSSProperties = heightPx
    ? { height: `${heightPx}px`, width: "auto" }
    : { height: "1.2em", width: "auto" };

  return (
    <Link href={href}>
      <motion.div
        className="flex items-center gap-3 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="inline-flex items-center justify-center rounded-lg">
          <img
            src="/codrithm-logo.svg"
            alt="Codrithm"
            className="object-contain"
            style={imgStyle}
          />
        </div>
        {showText && (
          <span
            className={`font-bold ${s.text}`}
            style={{
              fontFamily: "'Orenza', sans-serif",
              fontWeight: 700,
              color: isDark ? "#fff" : "#1a1a2e",
            }}
          >
            Codrithm
          </span>
        )}
      </motion.div>
    </Link>
  );
}
