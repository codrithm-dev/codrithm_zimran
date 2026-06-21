import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";

const TECH_CATEGORIES = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    label: "AI & Data",
    items: ["TensorFlow", "PyTorch", "OpenAI", "Apache Spark", "Redis"],
  },
];

export function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardsRef.current) return;

      const cards = cardsRef.current.children;

      gsap.set(cards, { opacity: 1 })
      gsap.from(cards, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Stagger tags inside each card
      Array.from(cards).forEach((card) => {
        const tags = card.querySelectorAll("span");
        gsap.from(tags, {
          scale: 0.7,
          opacity: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card as Element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GsapTextReveal
          as="h2"
          className="text-3xl font-bold mb-3 text-center"
        >
          Our Tech Stack
        </GsapTextReveal>
        <div className="text-center mb-12">
          <p className="text-muted-foreground max-w-xl mx-auto">
            We work with the technologies that power modern software.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TECH_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="rounded-xl p-6 hover:shadow-lg"
              style={{ background: "#0D1B2A", border: "1px solid rgba(43,100,217,0.2)", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#112240"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.6)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#0D1B2A"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.2)"; }}
            >
              <h3 className="font-semibold text-sm text-primary mb-4 uppercase tracking-wider" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted/50 text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
