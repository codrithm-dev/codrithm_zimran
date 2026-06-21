import { useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TechStack } from "@/components/sections/TechStack";
import { OurTeam } from "@/components/sections/OurTeam";
import { ContactForm } from "@/components/sections/ContactForm";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticButton } from "@/components/MagneticButton";
import { CardTilt } from "@/components/CardTilt";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";
import { GsapReveal } from "@/components/gsap/GsapReveal";
import { PROJECTS } from "@/data/projects";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Home() {
  const projectGridRef = useRef<HTMLDivElement>(null);
  const aboutStatsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!projectGridRef.current) return;
    gsap.from(projectGridRef.current.children, {
      opacity: 0, y: 40, duration: 0.5, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: projectGridRef.current, start: "top 85%", toggleActions: "play none none none" },
    });
  }, { scope: projectGridRef });

  useGSAP(() => {
    if (aboutStatsRef.current) {
      const cards = aboutStatsRef.current.children;
      gsap.from(cards, {
        opacity: 0, y: 30, duration: 0.5, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: aboutStatsRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
    }
  }, { scope: aboutStatsRef });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <ServiceGrid />

      {/* ── Projects ── */}
      <section id="projects" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GsapTextReveal as="h2" className="text-3xl font-bold mb-3 text-center">
            Our Projects
          </GsapTextReveal>
          <div className="text-center mb-12">
            <p className="text-muted-foreground max-w-xl mx-auto">
              Open-source projects and community-driven initiatives built by Codrithm.
            </p>
          </div>

          <div ref={projectGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <CardTilt key={project.id}>
                <div className="bg-card border border-card-border rounded-xl p-6 h-full flex flex-col hover:-translate-y-1 transition-transform">
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
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
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
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>
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
              </CardTilt>
            ))}
          </div>
        </div>
      </section>

      <TechStack />

      {/* ── Team ── */}
      <section id="team">
        <OurTeam />
      </section>

      {/* ── Contact ── */}
      <section id="contact">
        <ContactForm />
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-muted/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-12">
              <ScrollReveal>
                <h2 className="text-4xl font-black mb-4">
                  Ready to <span className="text-gradient">build something?</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-muted-foreground mb-8 text-lg">
                  Whether you need a software partner or want to join our learning community.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="flex flex-wrap gap-3 justify-center">
                  <MagneticButton pullDistance={12}>
                    <a href="#contact">
                      <Button
                        size="lg"
                        className="glow-primary text-base px-8 cursor-pointer font-semibold"
                      >
                        Start a Project <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </MagneticButton>
                  <MagneticButton pullDistance={12}>
                    <a href="#about">
                      <Button size="lg" variant="outline" className="text-base px-8 cursor-pointer">
                        Learn About Us
                      </Button>
                    </a>
                  </MagneticButton>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── About (last before footer) ── */}
      <section id="about" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <GsapReveal>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              About <span className="text-gradient">Codrithm</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              We're a team of engineers, designers, and educators on a mission to bridge the gap
              between academic learning and industry-ready software development.
            </p>
          </GsapReveal>

          <div ref={aboutStatsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: "2023", label: "Founded", desc: "Started with a vision to transform tech education" },
              { number: "30+", label: "Team Members", desc: "Engineers, designers, and educators worldwide" },
              { number: "50+", label: "Projects Shipped", desc: "From startups to enterprise solutions" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-card-border rounded-xl p-6">
                <div className="text-3xl font-black text-gradient mb-1">{stat.number}</div>
                <div className="font-semibold text-sm mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
