import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/branding/Logo";

const navLinks = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/about", label: "About", icon: "info" },
  { href: "/services", label: "Services", icon: "briefcase" },
  { href: "/products", label: "Products", icon: "package" },
  { href: "/blog", label: "Blog", icon: "filetext" },
  { href: "/team", label: "Team", icon: "users" },
  { href: "/contact", label: "Contact", icon: "mail" },
];

function NavIcon({ name, className }: { name: string; className?: string }) {
  const size = 18;
  switch (name) {
    case "home":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      );
    case "info":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      );
    case "briefcase":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
      );
    case "package":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
          <path d="M12 22V12" />
          <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" />
          <circle cx="12" cy="9" r="2" />
        </svg>
      );
    case "filetext":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </svg>
      );
    case "users":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "mail":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
}

export function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!linksRef.current || !indicatorRef.current) return;

    const container = linksRef.current;
    const activeEl = container.querySelector(`[data-href="${location}"]`) as HTMLElement;

    if (activeEl) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = activeEl.getBoundingClientRect();

      indicatorRef.current.style.left = `${linkRect.left - containerRect.left}px`;
      indicatorRef.current.style.width = `${linkRect.width}px`;
      indicatorRef.current.style.opacity = "1";
    } else {
      indicatorRef.current.style.opacity = "0";
    }
  }, [location]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <style>{`
        @keyframes navbarSlideIn {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <nav
        ref={navRef}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        style={{ animation: "navbarSlideIn 0.5s ease-out forwards" }}
      >
        {/* Desktop floating pill */}
        <div
          className="hidden lg:flex items-center gap-1 rounded-full px-2 py-1.5"
          style={{
            background: scrolled
              ? "linear-gradient(135deg, rgba(15,15,30,0.85) 0%, rgba(20,15,35,0.8) 50%, rgba(15,15,30,0.85) 100%)"
              : "linear-gradient(135deg, rgba(15,15,30,0.65) 0%, rgba(20,15,35,0.6) 50%, rgba(15,15,30,0.65) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)",
            transition: "box-shadow 0.3s ease, background 0.3s ease",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center pr-3 pl-2 border-r border-white/10 mr-1">
            <Logo heightPx={32} />
          </Link>

          {/* Nav links with sliding indicator */}
          <div ref={linksRef} className="relative flex items-center">
            <div
              ref={indicatorRef}
              className="absolute h-[calc(100%-4px)] rounded-full transition-all duration-300 ease-out"
              style={{
                background: "linear-gradient(135deg, hsl(262 90% 55% / 0.2), hsl(270 80% 45% / 0.15))",
                border: "1px solid hsl(262 90% 55% / 0.25)",
                top: "2px",
                opacity: 0,
              }}
            />

            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <span
                    data-href={link.href}
                    className={`relative z-10 flex flex-col items-center gap-0.5 px-3.5 py-1.5 rounded-full cursor-pointer transition-colors duration-200 ${
                      isActive ? "text-white" : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    <NavIcon name={link.icon} />
                    <span className="text-[10px] font-medium leading-none">{link.label}</span>
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-all duration-200 ml-1"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden mx-4">
          <div
            className="flex items-center justify-between rounded-2xl px-4 py-3"
            style={{
              background: "linear-gradient(135deg, rgba(15,15,30,0.85) 0%, rgba(20,15,35,0.8) 50%, rgba(15,15,30,0.85) 100%)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            }}
          >
            <Link href="/" className="flex items-center">
              <Logo heightPx={28} />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-all"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-all"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                  background: "linear-gradient(135deg, rgba(15,15,30,0.92) 0%, rgba(20,15,35,0.88) 50%, rgba(15,15,30,0.92) 100%)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <div className="px-3 py-3 flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = location === link.href;
                    return (
                      <Link key={link.href} href={link.href}>
                        <span
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "bg-primary/20 text-primary border border-primary/20"
                              : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                          }`}
                        >
                          <NavIcon name={link.icon} />
                          {link.label}
                        </span>
                      </Link>
                    );
                  })}
                  <Link href="/login">
                    <Button
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
