import { Link } from "wouter";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
}

const sizes = {
  sm: { icon: "w-6 h-6", iconInner: "w-3 h-3", text: "text-base" },
  md: { icon: "w-8 h-8", iconInner: "w-4 h-4", text: "text-lg" },
  lg: { icon: "w-10 h-10", iconInner: "w-5 h-5", text: "text-xl" },
};

export function Logo({ size = "md", showText = true, href = "/" }: LogoProps) {
  const s = sizes[size];

  return (
    <Link href={href}>
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className={`${s.icon} rounded-lg bg-primary flex items-center justify-center`}>
          <Code2 className={`${s.iconInner} text-primary-foreground`} />
        </div>
        {showText && (
          <span className={`font-bold ${s.text} text-gradient`}>Codrithm</span>
        )}
      </motion.div>
    </Link>
  );
}
