import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechStack } from "@/components/sections/TechStack";
import { OurTeam } from "@/components/sections/OurTeam";
import { PageTransition } from "@/components/PageTransition";
import { gsap, useGSAP } from "@/lib/gsap";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";
import { GsapReveal } from "@/components/gsap/GsapReveal";
import { GsapStagger } from "@/components/gsap/GsapStagger";

export default function About() {
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
                <div key={stat.label} className="bg-card border border-card-border rounded-xl p-6">
                  <div className="text-3xl font-black text-gradient mb-1">{stat.number}</div>
                  <div className="font-semibold text-sm mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.desc}</div>
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
              <GsapReveal delay={0.4}>
                <div className="flex flex-wrap justify-center gap-6 mt-10">
                  {[
                    { label: "Real Projects", desc: "Production-grade work from day one" },
                    { label: "Expert Mentors", desc: "Guided by industry professionals" },
                    { label: "Community First", desc: "Learn better, build together" },
                  ].map((item) => (
                    <div key={item.label} className="bg-card border border-card-border rounded-xl px-6 py-4 text-left min-w-[160px]">
                      <div className="text-sm font-semibold text-primary mb-1">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  ))}
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
