import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { MemberCard } from "@/components/MemberCard";
import { TEAM_MEMBERS, TEAM_DEPARTMENTS } from "@/data/team";

export default function Team() {
  const [activeDepartment, setActiveDepartment] = useState("All");

  const filtered = TEAM_MEMBERS.filter(
    (member) => activeDepartment === "All" || member.department === activeDepartment
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="relative pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <ParallaxBackground count={3} showParticles={true} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-black mb-3">
                Meet the <span className="text-gradient">Team</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                The passionate people behind Codrithm — builders, mentors, and community leaders.
              </p>
            </ScrollReveal>

            <div className="flex justify-center gap-2 flex-wrap">
              {TEAM_DEPARTMENTS.map((dept) => (
                <motion.button
                  key={dept}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveDepartment(dept)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeDepartment === dept
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "bg-card border border-card-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {dept}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDepartment}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((member, i) => (
                <MemberCard key={member.id} member={member} delay={i * 0.08} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">No team members found</p>
              <p className="text-sm mt-1">Try a different department</p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
