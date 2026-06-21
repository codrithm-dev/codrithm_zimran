import { useState, useEffect, useRef, useCallback } from "react";
import { Moon, Sun, Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Logo } from "@/components/branding/Logo";

const navLinks = [
  { href: "#home", label: "Home", icon: "home" },
  { href: "#services", label: "Services", icon: "briefcase" },
  { href: "#projects", label: "Projects", icon: "package" },
  { href: "#team", label: "Team", icon: "users" },
  { href: "#contact", label: "Contact", icon: "mail" },
  { href: "#about", label: "About", icon: "info" },
];

function NavIcon({ name, className }: { name: string; className?: string }) {
  const size = 14;
  switch (name) {
    case "home":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      );
    case "info":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );
    case "briefcase":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
      );
    case "package":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
          <path d="M12 22V12" />
          <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" />
          <circle cx="12" cy="9" r="2" />
        </svg>
      );
    case "users":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "mail":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!linksRef.current || !indicatorRef.current) return;
    const container = linksRef.current;
    const activeEl = container.querySelector(`[data-href="${activeSection}"]`) as HTMLElement;
    if (activeEl) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = activeEl.getBoundingClientRect();
      indicatorRef.current.style.left = `${linkRect.left - containerRect.left}px`;
      indicatorRef.current.style.width = `${linkRect.width}px`;
      indicatorRef.current.style.opacity = "1";
    } else {
      indicatorRef.current.style.opacity = "0";
    }
  }, [activeSection]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const pillStyle = {
    background: scrolled
      ? "rgba(10, 10, 20, 0.88)"
      : "rgba(10, 10, 20, 0.70)",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: scrolled
      ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"
      : "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    minHeight: "44px",
  };

  return (
    <>
      <style>{`
        @keyframes navbarSlideIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ctaGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.1); }
          50% { box-shadow: 0 0 30px rgba(124,58,237,0.6), 0 0 60px rgba(124,58,237,0.2); }
        }
      `}</style>

      <nav
        ref={navRef}
        className="fixed top-3 left-0 right-0 z-50 flex items-center justify-center gap-3 px-4 lg:px-8"
        style={{ animation: "navbarSlideIn 0.5s ease-out forwards" }}
      >
        {/* Desktop: pill nav */}
        <div
          className="hidden lg:flex items-center gap-1 rounded-full px-2.5 py-2"
          style={pillStyle}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center pr-3 pl-2 border-r border-white/10 mr-1 h-full cursor-pointer"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/95 backdrop-blur-sm shadow-sm">
              <Logo heightPx={20} showText={false} />
            </div>
          </button>

          {/* Nav links with sliding indicator */}
          <div ref={linksRef} className="relative flex items-center h-full gap-0.5">
            <div
              ref={indicatorRef}
              className="absolute h-[calc(100%-8px)] rounded-full transition-all duration-300 ease-out pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(99,102,241,0.2))",
                border: "1px solid rgba(139,92,246,0.3)",
                boxShadow: "0 0 20px rgba(124,58,237,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
                top: "4px",
                opacity: 0,
              }}
            />

            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  data-href={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative z-10 flex flex-col items-center justify-center gap-[3px] px-3.5 py-1.5 rounded-full cursor-pointer transition-all duration-200 h-full border-0 bg-transparent ${
                    isActive ? "text-white" : "text-white/60 hover:text-white/85"
                  }`}
                >
                  <NavIcon name={link.icon} />
                  <span className="text-[8.5px] font-semibold leading-none tracking-wider uppercase">{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Get in Touch CTA — separate from the pill, on the right */}
        <button
          onClick={() => scrollTo("#contact")}
          className="hidden lg:flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white text-xs font-semibold cursor-pointer border-0 overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #6366F1)",
            animation: "ctaGlow 3s ease-in-out infinite",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.animation = "ctaGlow 1.5s ease-in-out infinite";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.animation = "ctaGlow 3s ease-in-out infinite";
          }}
        >
          <span className="relative z-10 flex items-center gap-1.5">
            Get in Touch
            <motion.span
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-3 h-3" />
            </motion.span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>

        {/* Theme toggle — separate from the pill, far right */}
        <button
          onClick={toggleTheme}
          className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full text-white/60 hover:text-white/90 hover:bg-white/5 transition-all duration-200"
          style={pillStyle}
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

        {/* Mobile layout */}
        <div className="lg:hidden w-full max-w-lg">
          <div
            className="flex items-center justify-between rounded-xl px-4 py-2.5"
            style={{
              background: "rgba(10, 10, 20, 0.88)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
              minHeight: "52px",
            }}
          >
            <button
              onClick={() => scrollTo("#home")}
              className="flex items-center cursor-pointer bg-transparent border-0 p-0"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/95 backdrop-blur-sm shadow-sm">
                <Logo heightPx={22} showText={false} />
              </div>
            </button>

            <div className="flex items-center gap-2.5">
              {/* Mobile CTA button */}
              <motion.button
                onClick={() => {
                  scrollTo("#contact");
                  setIsOpen(false);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-xs font-semibold cursor-pointer border-0"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #6366F1)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
                <ArrowRight className="w-3 h-3" />
              </motion.button>

              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white/90 hover:bg-white/5 transition-all"
              >
                {theme === "dark" ? <Sun className="w-[16px] h-[16px]" /> : <Moon className="w-[16px] h-[16px]" />}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white/90 hover:bg-white/5 transition-all"
              >
                {isOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="mt-2 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(10, 10, 20, 0.92)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
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
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border-0 text-left ${
                          isActive
                            ? "bg-primary/20 text-primary border border-primary/20"
                            : "text-white/60 hover:text-white hover:bg-white/6 bg-transparent"
                        }`}
                      >
                        <NavIcon name={link.icon} />
                        {link.label}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => {
                      scrollTo("#contact");
                      setIsOpen(false);
                    }}
                    className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer border-0"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED, #6366F1)",
                    }}
                  >
                    Get in Touch <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
