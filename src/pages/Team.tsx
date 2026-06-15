import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageTransition } from "@/components/PageTransition";
import { TEAM } from "@/data/team";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Team() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal>
              <h1 className="text-4xl sm:text-5xl font-black mb-4">
                Meet the <span className="text-gradient">Team</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                The engineers, designers, and dreamers behind Codrithm.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM.map((member, i) => (
                <ScrollReveal key={member.id} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card border border-card-border rounded-xl p-8 text-center"
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 bg-muted"
                    />
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <div className="text-sm text-primary font-medium mb-3">{member.role}</div>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
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
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
