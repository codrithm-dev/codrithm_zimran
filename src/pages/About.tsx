import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechStack } from "@/components/sections/TechStack";
import { OurTeam } from "@/components/sections/OurTeam";
import { PageTransition } from "@/components/PageTransition";
import { gsap, useGSAP } from "@/lib/gsap";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";
import { GsapReveal } from "@/components/gsap/GsapReveal";
import { useTheme } from '@/components/theme-provider';

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const cardBg = isDark ? '#0D1B2A' : '#EEF4FF';
  const cardBgHover = isDark ? '#112240' : '#DCE8FF';
  const cardBorder = isDark ? '1px solid rgba(43,100,217,0.2)' : '1px solid rgba(43,100,217,0.3)';
  const cardBorderHover = isDark ? '1px solid rgba(43,100,217,0.6)' : '1px solid rgba(43,100,217,0.7)';
  const cardText = isDark ? '#FFFFFF' : '#1a2a4a';

  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (statsRef.current) {
        const cards = statsRef.current.children;
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: statsRef },
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <GsapReveal>
              <h1 className="text-4xl sm:text-5xl font-black mb-4">
                About <span className="text-gradient">Codrithm</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                We're a team of engineers, designers, and educators on a mission to bridge the gap
                between academic learning and industry-ready software development.
              </p>
            </GsapReveal>

            <div
              ref={statsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
            >
              {[
                { number: "2023", label: "Founded", desc: "Started with a vision to transform tech education" },
                { number: "30+", label: "Team Members", desc: "Engineers, designers, and educators worldwide" },
                { number: "50+", label: "Projects Shipped", desc: "From startups to enterprise solutions" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-6 hover:shadow-lg"
                  style={{ background: cardBg, border: cardBorder, transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = cardBgHover; (e.currentTarget as HTMLDivElement).style.border = cardBorderHover; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = cardBg; (e.currentTarget as HTMLDivElement).style.border = cardBorder; }}
                >
                  <div className="text-3xl font-black text-gradient mb-1">{stat.number}</div>
                  <div className="font-semibold text-sm mb-1" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{stat.label}</div>
                  <div className="text-xs" style={{ color: cardText }}>{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GsapTextReveal as="h2" className="text-3xl font-bold mb-3 text-center">
              Our Mission
            </GsapTextReveal>
            <div className="max-w-3xl mx-auto text-center">
              <GsapReveal delay={0.1}>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Codrithm was founded on the belief that every student developer deserves access to
                  real-world engineering experience. We combine enterprise software development with
                  community-driven learning to create a platform where students don't just learn to
                  code — they learn to build products that matter.
                </p>
              </GsapReveal>
              <GsapReveal delay={0.25}>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our dual focus on delivering professional software solutions and nurturing talent
                  means our students work on real projects, solve real problems, and graduate with
                  portfolios that stand out. We're not just teaching code — we're engineering the
                  future of technology, one developer at a time.
                </p>
              </GsapReveal>
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GsapTextReveal as="h2" className="text-3xl font-bold mb-3 text-center">
              Leadership Team
            </GsapTextReveal>
            <p className="text-muted-foreground max-w-xl mx-auto text-center mb-12">
              The people building Codrithm and shaping the future of developer education.
            </p>

            <div
              ref={teamRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {TEAM.map((member) => (
                <div
                  key={member.id}
                  className="rounded-xl p-6 text-center hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: cardBg, border: cardBorder, transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = cardBgHover; (e.currentTarget as HTMLDivElement).style.border = cardBorderHover; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = cardBg; (e.currentTarget as HTMLDivElement).style.border = cardBorder; }}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 bg-muted"
                  />
                  <h3 className="font-semibold" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{member.name}</h3>
                  <div className="text-xs text-primary font-medium mb-2">{member.role}</div>
                  <p className="text-sm" style={{ color: cardText }}>{member.bio}</p>
                </div>
              </GsapReveal>
            </div>
          </div>
        </section>

        <OurTeam />

        <TechStack />
        <Footer />
      </div>
    </PageTransition>
  );
}
