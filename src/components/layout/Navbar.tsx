import { useState, useEffect, useRef, useCallback } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Logo } from "@/components/branding/Logo";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const navRef = useRef<HTMLElement>(null);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="flex items-center cursor-pointer bg-transparent border-0 p-0 shrink-0"
        >
          <Logo heightPx={32} showText={true} />
        </button>

        {/* Desktop: centered pill nav */}
        <div
          className="hidden lg:flex items-center gap-1 rounded-full px-2 py-1.5"
          style={{
            background: isDark
              ? "rgba(255, 255, 255, 0.06)"
              : "rgba(255, 255, 255, 0.55)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.06)",
            boxShadow: isDark
              ? "inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium cursor-pointer border-0 bg-transparent transition-all duration-300 ${
                  isActive
                    ? isDark
                      ? "text-white"
                      : "text-[#1a1a2e]"
                    : isDark
                      ? "text-white/50 hover:text-white/80"
                      : "text-[#1a1a2e]/50 hover:text-[#1a1a2e]/80"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.06)",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right side: CTA + Theme toggle */}
        <div className="hidden lg:flex items-center gap-3">
          {/* CTA button */}
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}>
            <button
              className="px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer border-0 transition-all duration-300"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.06)",
                color: isDark ? "#fff" : "#1a1a2e",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.08)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark
                  ? "rgba(124,58,237,0.3)"
                  : "rgba(124,58,237,0.1)";
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.08)";
              }}
            >
              Work with us
            </button>
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer border-0 transition-all duration-300"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.04)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.06)",
              color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
            }}
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="w-[16px] h-[16px]" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="w-[16px] h-[16px]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer border-0 transition-all"
            style={{
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
              color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
            }}
          >
            {theme === "dark" ? <Sun className="w-[16px] h-[16px]" /> : <Moon className="w-[16px] h-[16px]" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer border-0 transition-all"
            style={{
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
              color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
            }}
          >
            {isOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl overflow-hidden"
              style={{
                background: isDark
                  ? "rgba(15, 15, 25, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.08)",
                boxShadow: isDark
                  ? "0 8px 32px rgba(0,0,0,0.5)"
                  : "0 8px 32px rgba(0,0,0,0.12)",
              }}
            >
              <div className="px-3 py-3 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <button
                      key={link.href}
                      onClick={() => {
                        scrollTo(link.href);
                        setIsOpen(false);
                      }}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border-0 text-left ${
                        isActive
                          ? isDark
                            ? "bg-white/10 text-white"
                            : "bg-black/5 text-[#1a1a2e]"
                          : isDark
                            ? "text-white/50 hover:text-white hover:bg-white/5"
                            : "text-[#1a1a2e]/50 hover:text-[#1a1a2e] hover:bg-black/3"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("#contact"); setIsOpen(false); }}>
                  <button
                    className="w-full mt-2 flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-0"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED, #6366F1)",
                      color: "#fff",
                    }}
                  >
                    Work with us
                  </button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
