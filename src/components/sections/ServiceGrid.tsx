import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";
import { CardTilt } from "@/components/CardTilt";
import { SERVICES } from "@/data/services";
import { useTheme } from "@/components/theme-provider";

export function ServiceGrid() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const cardBg = isDark ? '#0D1B2A' : '#EEF4FF';
  const cardBgHover = isDark ? '#112240' : '#DCE8FF';
  const cardBorder = isDark ? '1px solid rgba(43,100,217,0.2)' : '1px solid rgba(43,100,217,0.3)';
  const cardBorderHover = isDark ? '1px solid rgba(43,100,217,0.6)' : '1px solid rgba(43,100,217,0.7)';
  const cardText = isDark ? '#FFFFFF' : '#1a2a4a';

  useGSAP(
    () => {
      if (!cardsRef.current) return;
      const cards = cardsRef.current.children;

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: cardsRef },
  );

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GsapTextReveal
          as="h2"
          className="text-3xl font-bold mb-3 text-center"
        >
          Our Services
        </GsapTextReveal>
        <div className="text-center mb-12">
          <p className="text-muted-foreground max-w-xl mx-auto">
            End-to-end technology solutions tailored to your business needs.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {SERVICES.map((service) => (
            <CardTilt key={service.id}>
              <div
              className="group rounded-xl p-6 h-full hover:shadow-lg"
              style={{ background: cardBg, border: cardBorder, transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = cardBgHover; (e.currentTarget as HTMLDivElement).style.border = cardBorderHover; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = cardBg; (e.currentTarget as HTMLDivElement).style.border = cardBorder; }}
            >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{service.title}</h3>
                <p className="text-sm mb-4" style={{ color: cardText }}>{service.description}</p>
                <ul className="space-y-1">
                  {service.features.map((f) => (
                    <li key={f} className="text-xs flex items-center gap-1.5" style={{ color: cardText }}>
                      <div className="w-1 h-1 rounded-full bg-primary/50" />
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
  );
}
