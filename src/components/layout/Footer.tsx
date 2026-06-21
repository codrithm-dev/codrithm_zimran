import { useRef } from "react";
import { Link } from "wouter";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { gsap, useGSAP } from "@/lib/gsap";

const footerLinks = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  Services: [
    { href: "/services", label: "Web Development" },
    { href: "/services", label: "Cloud Solutions" },
    { href: "/services", label: "AI & ML" },
    { href: "/services", label: "Mobile Development" },
  ],
  Products: [
    { href: "/products", label: "Codrithm Learn" },
    { href: "/products", label: "Codrithm Connect" },
    { href: "/products", label: "Codrithm Deploy" },
    { href: "/products", label: "Codrithm AI" },
  ],
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.from(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      const columns = contentRef.current.querySelectorAll(".footer-col");
      gsap.from(columns, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} className="mt-auto" style={{ background: "linear-gradient(to right, rgba(43,100,217,0.18), rgba(255,255,255,0.18))", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderTop: "1px solid rgba(43,100,217,0.25)" }}>
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 footer-col">
            <div className="mb-3">
              <Logo size="sm" heightPx={48} />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs mb-4">
              Where Coders Make History — coding the logic, crafting the flow.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{ border: "1px solid rgba(43,100,217,0.3)", color: "#2B64D9" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(43,100,217,0.4), 0 0 40px rgba(43,100,217,0.2)"; (e.currentTarget as HTMLAnchorElement).style.border = "1px solid rgba(43,100,217,0.7)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; (e.currentTarget as HTMLAnchorElement).style.border = "1px solid rgba(43,100,217,0.3)"; }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer-col">
              <h4 className="text-sm font-semibold mb-3" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <span className="text-sm text-muted-foreground cursor-pointer transition-colors" onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "#2B64D9"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = ""; }}>
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2" style={{ borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, #2B64D9, #8BECAE) 1" }}>
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Codrithm. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
