import { type ReactNode } from "react";

interface GradientPulseProps {
  children: ReactNode;
  className?: string;
}

export function GradientPulse({ children, className = "" }: GradientPulseProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
          backgroundSize: "200% 200%",
          animation: "gradientShift 3s ease infinite",
        }}
      />
      {/* Inner content */}
      <div className="relative rounded-2xl">
        {children}
      </div>
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
