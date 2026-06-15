import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";
import { CardTilt } from "@/components/CardTilt";
import { SERVICES } from "@/data/services";

export function ServiceGrid() {
  const cardsRef = useRef<HTMLDivElement>(null);

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
              <div className="group bg-card border border-card-border rounded-xl p-6 h-full hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-1">
                  {service.features.map((f) => (
                    <li key={f} className="text-xs text-muted-foreground flex items-center gap-1.5">
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
