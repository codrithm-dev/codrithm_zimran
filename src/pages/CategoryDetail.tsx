import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Users, BookOpen, Code2, Star, ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageTransition } from "@/components/PageTransition";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { ParallaxSection } from "@/components/ParallaxSection";
import { CATEGORIES } from "@/data/categories";

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Intermediate: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  Advanced: "text-rose-400 border-rose-400/30 bg-rose-400/10",
};

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>();
  const category = CATEGORIES.find((c) => c.id === id);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Category not found</h2>
          <Link href="/categories">
            <Button variant="outline">Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent =
    ((LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>) [category.icon]) ||
    LucideIcons.Code2;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 0%, ${category.color}15 0%, transparent 70%)` }} />
          <div className="absolute inset-0 grid-bg opacity-20" />
          <ParallaxBackground count={2} showParticles={true} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Link href="/categories">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
                </Button>
              </Link>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  <IconComponent className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-black">{category.name}</h1>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[category.difficulty]}`}>
                    {category.difficulty}
                  </span>
                </div>
                <p className="text-muted-foreground text-lg max-w-xl">{category.description}</p>

                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {category.memberCount.toLocaleString()} members
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    {category.resources.length} resources
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" />
                    {category.projects.length} sample projects
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/join">
                  <Button size="lg" className="glow-primary" data-testid="button-join-category">
                    Join Community <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ParallaxSection speed={0.15}>
              <ScrollReveal>
                <div className="bg-card border border-card-border rounded-xl p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Learning Resources
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {category.resources.map((res, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors cursor-pointer"
                      >
                        <span className="text-sm font-medium">{res}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              </ParallaxSection>

              <ParallaxSection speed={0.1}>
                <ScrollReveal delay={0.1}>
                  <div className="bg-card border border-card-border rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-secondary" />
                      Sample Projects
                    </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {category.projects.map((proj, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-lg border border-border bg-gradient-to-br from-card to-muted/20"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                          style={{ backgroundColor: `${category.color}20`, color: category.color }}
                        >
                          <Code2 className="w-4 h-4" />
                        </div>
                        <p className="font-medium text-sm">{proj}</p>
                        <div className="flex gap-1 mt-2">
                          {[...Array(Math.floor(Math.random() * 3) + 3)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              </ParallaxSection>
            </div>

            <div className="space-y-6">
              <ParallaxSection speed={-0.1}>
              <ScrollReveal delay={0.2}>
                <div className="bg-card border border-card-border rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Community Stats</h3>
                  {[
                    { label: "Active Members", value: category.memberCount.toLocaleString(), color: "bg-primary" },
                    { label: "Projects Shared", value: Math.floor(category.memberCount * 0.4).toLocaleString(), color: "bg-secondary" },
                    { label: "This Month", value: `+${Math.floor(category.memberCount * 0.05)}`, color: "bg-chart-3" },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="text-sm font-semibold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              </ParallaxSection>

              <ParallaxSection speed={-0.15}>
              <ScrollReveal delay={0.3}>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 text-center">
                  <h3 className="font-semibold mb-2">Ready to join?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with {category.memberCount.toLocaleString()}+ members learning {category.name}.
                  </p>
                  <Link href="/join">
                    <Button className="w-full glow-primary" data-testid="button-cta-join">
                      Join Community
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
              </ParallaxSection>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
