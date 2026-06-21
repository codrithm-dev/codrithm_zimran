import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Moon, Sun, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/branding/Logo";
import { MagneticButton } from "@/components/MagneticButton";
import { gsap, useGSAP } from "@/lib/gsap";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (navRef.current) {
        gsap.from(navRef.current, {
          y: -80,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      if (linksContainerRef.current) {
        const links = linksContainerRef.current.querySelectorAll("a, button");
        gsap.from(links, {
          opacity: 0,
          y: -10,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.3,
          ease: "power3.out",
        });
      }
    },
    { scope: navRef },
  );

  // Sliding underline indicator
  useEffect(() => {
    if (!linksContainerRef.current || !indicatorRef.current) return;

    const container = linksContainerRef.current;
    const activeLink = container.querySelector(`[data-href="${location}"]`) as HTMLElement;

    if (activeLink) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      gsap.to(indicatorRef.current, {
        x: linkRect.left - containerRect.left,
        width: linkRect.width,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(indicatorRef.current, {
        width: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <MagneticButton pullDistance={8}>
            <Logo size="sm" heightPx={48} />
          </MagneticButton>

          <div ref={linksContainerRef} className="hidden lg:flex items-center gap-1 relative">
            {/* Sliding underline indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-[2px] rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))",
              }}
            />

            {navLinks.map((link) => (
              <MagneticButton key={link.href} pullDistance={6}>
                <Link href={link.href}>
                  <span
                    data-href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      location === link.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              </MagneticButton>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <MagneticButton pullDistance={6}>
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </MagneticButton>

            <Link href="/contact">
              <Button size="sm" className="hidden lg:flex glow-primary">
                Get in Touch
              </Button>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      location === link.href
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <Button
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
