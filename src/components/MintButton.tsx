import { useTheme } from "@/components/theme-provider";
import type { ReactNode } from "react";

interface MintButtonProps {
  children: ReactNode;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function useMintStyle() {
  const { theme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const color = isDark ? "#8BECAE" : "#5BAF7A";
  const hoverText = isDark ? "#0A0F1E" : "#FFFFFF";

  return {
    style: {
      border: `2px solid ${color}`,
      color,
      background: "transparent",
      transition: "all 0.3s ease",
    } as React.CSSProperties,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      (e.currentTarget as HTMLElement).style.background = color;
      (e.currentTarget as HTMLElement).style.color = hoverText;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      (e.currentTarget as HTMLElement).style.background = "transparent";
      (e.currentTarget as HTMLElement).style.color = color;
    },
  };
}
