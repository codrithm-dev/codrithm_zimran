import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GsapReveal } from "@/components/gsap/GsapReveal";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";

// Live screenshot preview via WordPress's public mshots service.
// Swap for your own screenshots later if you want more control/reliability.
const shot = (url: string, w = 900) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${w}`;

interface Project {
  name: string;
  cat: string;
  desc: string;
  url: string;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    name: "Copperline",
    cat: "Real Estate",
    desc: "A listings site rebuilt around neighborhoods, not zip codes.",
    url: "https://www.zillow.com",
  },
  {
    name: "Fathom",
    cat: "Marine Research",
    desc: "A public dashboard tracking coral reef health in near real-time.",
    url: "https://www.nationalgeographic.com",
  },
  {
    name: "Meridian",
    cat: "Airline Loyalty",
    desc: "A rewards portal simplified into three screens instead of nine.",
    url: "https://www.delta.com",
  },
  {
    name: "Hearth",
    cat: "Home Insurance",
    desc: "A claims flow that tells you where your claim actually is.",
    url: "https://www.airbnb.com",
  },
  {
    name: "Tallgrass",
    cat: "Agriculture Tech",
    desc: "Field-level crop data for growers who don't want a login screen.",
    url: "https://www.tesla.com",
  },
  {
    name: "Northlight",
    cat: "Architecture",
    desc: "A portfolio site for a firm that mostly builds with daylight.",
    url: "https://www.apple.com",
  },
];

interface ProjectShowcaseProps {
  projects?: Project[];
  eyebrow?: string;
  heading?: string;
}

export default function ProjectShowcase({
  projects = DEFAULT_PROJECTS,
  eyebrow = "Selected Work",
  heading = "A few things we've shipped.",
}: ProjectShowcaseProps) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <GsapReveal>
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary block mb-3">
            {eyebrow}
          </span>
          <GsapTextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-black max-w-xl leading-tight"
          >
            {heading}
          </GsapTextReveal>
        </GsapReveal>
      </div>

      {/* Marquee */}
      <div
        className="w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="flex gap-7 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...projects, ...projects].map((p, i) => (
            <button
              key={`${p.name}-${i}`}
              onClick={() => setActive(p)}
              aria-label={`Open ${p.name} case study`}
              type="button"
              className="relative w-[420px] h-[290px] flex-shrink-0 rounded-xl overflow-hidden bg-card border border-card-border text-left cursor-pointer transition-colors duration-200 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* Screenshot */}
              <img
                className="absolute inset-0 w-full h-full object-cover object-top"
                src={shot(p.url)}
                alt={`${p.name} preview`}
                loading="lazy"
              />

              {/* External link — opens URL directly, does not open modal */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${p.name}`}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/60 border border-card-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Overlay gradient + label */}
              <span
                className="absolute inset-0 flex flex-col justify-end p-5"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, hsl(var(--background) / 0.88) 100%)",
                }}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-primary mb-1">
                  {p.cat}
                </span>
                <span className="text-lg font-black text-foreground leading-tight">
                  {p.name}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* "See all projects" — scrolls to the #projects grid already on this page.
          TODO: swap href="#projects" for a real route once a dedicated projects/work
          page is approved and built. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex justify-center">
        <a href="#projects">
          <Button variant="outline" size="sm" className="cursor-pointer">
            See all projects
            <ExternalLink className="w-3.5 h-3.5 ml-2" />
          </Button>
        </a>
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
          active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
      >
        <div
          className={`w-[min(880px,90vw)] bg-card border border-card-border rounded-xl overflow-hidden transition-transform duration-300 ${
            active ? "scale-100" : "scale-95"
          }`}
        >
          {/* Hero image */}
          <div className="relative h-[360px] bg-background">
            {active && (
              <img
                className="absolute inset-0 w-full h-full object-cover object-top"
                src={shot(active.url, 1300)}
                alt=""
              />
            )}
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/60 border border-card-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setActive(null)}
              aria-label="Close"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary block mb-3">
              {active?.cat}
            </span>
            <h3 className="text-2xl font-black mb-3 text-foreground">{active?.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mb-5">
              {active?.desc}
            </p>
            {/* Visit site link */}
            <a
              href={active?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="cursor-pointer">
                Visit site
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
