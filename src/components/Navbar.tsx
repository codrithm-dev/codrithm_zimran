import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Code2, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Services",
    children: [
      { href: "/services", label: "Our Services" },
      { href: "/products", label: "Products" },
      { href: "/projects", label: "Projects" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/team", label: "Team" },
  { href: "/categories", label: "Categories" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/join", label: "Join" },
];

export function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const isActive = (href: string) => location === href;
  const isDropdownActive = (children: { href: string }[]) =>
    children.some((child) => location === child.href);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
      style={{
        backgroundImage: "linear-gradient(to right, rgba(43,100,217,0.18), rgba(255,255,255,0.18))",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(43, 100, 217, 0.25)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <MagneticButton pullDistance={8}>
            <Link href="/home">
              <motion.div
                className="flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                data-testid="logo-link"
              >
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg text-gradient">Codrithm</span>
              </motion.div>
            </Link>
          </MagneticButton>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <MagneticButton pullDistance={6}>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                        isDropdownActive(link.children)
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                  </MagneticButton>
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-48 bg-card border border-card-border rounded-xl shadow-lg overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link key={child.href} href={child.href}>
                            <span
                              className={`block px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                                isActive(child.href)
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              }`}
                            >
                              {child.label}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <MagneticButton key={link.href} pullDistance={6}>
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      data-testid={`nav-link-${link.label.toLowerCase()}`}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        isActive(link.href)
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </MagneticButton>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <MagneticButton pullDistance={6}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
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
              </motion.button>
            </MagneticButton>

            <Link href="/login">
              <Button size="sm" className="hidden lg:flex glow-primary" data-testid="button-login">
                Sign In
              </Button>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
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
            className="lg:hidden border-b"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(43,100,217,0.18), rgba(255,255,255,0.18))",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(43, 100, 217, 0.25)",
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <span
                          onClick={() => setIsOpen(false)}
                          className={`block px-6 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                            isActive(child.href)
                              ? "bg-primary/15 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          {child.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={link.href} href={link.href}>
                    <span
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        isActive(link.href)
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                )
              )}
              <Link href="/login">
                <Button size="sm" className="w-full mt-2" onClick={() => setIsOpen(false)}>
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
