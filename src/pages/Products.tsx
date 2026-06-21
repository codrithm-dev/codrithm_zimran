import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/PageTransition";
import { PRODUCTS } from "@/data/products";
import { ExternalLink } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";
import { CardTilt } from "@/components/CardTilt";
import { useTheme } from '@/components/theme-provider';

export default function Products() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const cardBg = isDark ? '#0D1B2A' : '#EEF4FF';
  const cardBgHover = isDark ? '#112240' : '#DCE8FF';
  const cardBorder = isDark ? '1px solid rgba(43,100,217,0.2)' : '1px solid rgba(43,100,217,0.3)';
  const cardBorderHover = isDark ? '1px solid rgba(43,100,217,0.6)' : '1px solid rgba(43,100,217,0.7)';
  const cardText = isDark ? '#FFFFFF' : '#1a2a4a';

  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = gridRef.current.children;

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: gridRef },
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <GsapTextReveal as="h1" className="text-4xl sm:text-5xl font-black mb-4">
              Our Products
            </GsapTextReveal>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Tools and platforms designed to empower developers and streamline workflows.
            </p>
          </div>
        </section>

        <section className="py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRODUCTS.map((product) => (
                <CardTilt key={product.id}>
                  <div
                      className="rounded-xl p-8 h-full flex flex-col hover:shadow-lg"
                      style={{ background: cardBg, border: cardBorder, transition: "all 0.3s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = cardBgHover; (e.currentTarget as HTMLDivElement).style.border = cardBorderHover; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = cardBg; (e.currentTarget as HTMLDivElement).style.border = cardBorder; }}
                    >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            product.status === "live"
                              ? "bg-green-500/10 text-green-500"
                              : product.status === "beta"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {product.status}
                        </span>
                        {product.url && (
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-sm mb-6" style={{ color: cardText }}>{product.description}</p>
                    <ul className="space-y-2 mt-auto">
                      {product.features.map((f) => (
                        <li key={f} className="text-sm flex items-center gap-2" style={{ color: cardText }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardTilt>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
