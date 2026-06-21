import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/PageTransition";
import { PROJECTS } from "@/data/projects";
import { Github, ExternalLink } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";

export default function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = gridRef.current.children;

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.08,
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
              Our Projects
            </GsapTextReveal>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Open-source projects and community-driven initiatives built by Codrithm.
            </p>
          </div>
        </section>

        <section className="py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl p-6 h-full flex flex-col hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "#0D1B2A", border: "1px solid rgba(43,100,217,0.2)", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#112240"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.6)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#0D1B2A"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.2)"; }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{project.title}</h3>
                  <p className="text-sm mb-4 flex-1" style={{ color: "#FFFFFF" }}>{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-muted/50 text-muted-foreground font-medium"
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

        <Footer />
      </div>
    </PageTransition>
  );
}
