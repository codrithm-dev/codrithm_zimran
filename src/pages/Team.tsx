import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/PageTransition";
import { OurTeam } from "@/components/sections/OurTeam";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";
import { GsapReveal } from "@/components/gsap/GsapReveal";

export default function Team() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="pt-32 pb-4 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <GsapTextReveal as="h1" className="text-4xl sm:text-5xl font-black mb-4">
              Meet the Team
            </GsapTextReveal>
            <GsapReveal delay={0.15}>
              <p className="text-lg text-muted-foreground max-w-2xl">
                The engineers, designers, and dreamers behind Codrithm.
              </p>
            </GsapReveal>
          </div>
        </section>

        <OurTeam />

        <Footer />
      </div>
    </PageTransition>
  );
}
