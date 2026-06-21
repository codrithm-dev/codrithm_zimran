import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/PageTransition";
import { TEAM } from "@/data/team";
import { Github, Linkedin, Twitter } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";
import { useTheme } from "@/components/theme-provider";

export default function Team() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = gridRef.current.children;

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        scale: 0.95,
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
              Meet the Team
            </GsapTextReveal>
            <p className="text-lg text-muted-foreground max-w-2xl">
              The engineers, designers, and dreamers behind Codrithm.
            </p>
          </div>
        </section>

        <section className="py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {TEAM.map((member) => (
                <div
                  key={member.id}
                  className="rounded-xl p-8 text-center hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: isDark ? '#0D1B2A' : '#EEF4FF', border: isDark ? '1px solid rgba(43,100,217,0.2)' : '1px solid rgba(43,100,217,0.3)', transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = isDark ? '#112240' : '#DCE8FF'; (e.currentTarget as HTMLDivElement).style.border = isDark ? '1px solid rgba(43,100,217,0.6)' : '1px solid rgba(43,100,217,0.7)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = isDark ? '#0D1B2A' : '#EEF4FF'; (e.currentTarget as HTMLDivElement).style.border = isDark ? '1px solid rgba(43,100,217,0.2)' : '1px solid rgba(43,100,217,0.3)'; }}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 bg-muted"
                  />
                  <h3 className="font-semibold text-lg" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{member.name}</h3>
                  <div className="text-sm text-primary font-medium mb-3">{member.role}</div>
                  <p className="text-sm mb-4" style={{ color: isDark ? '#FFFFFF' : '#1a2a4a' }}>{member.bio}</p>
                  {member.social && (
                    <div className="flex items-center justify-center gap-2">
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
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
