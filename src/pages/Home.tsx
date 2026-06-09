import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Users, BookOpen, Calendar, Star, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { EventCard } from "@/components/EventCard";
import { StatCard } from "@/components/StatCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroScene } from "@/components/HeroScene";
import { PageTransition } from "@/components/PageTransition";
import { CATEGORIES } from "@/data/categories";
import { EVENTS } from "@/data/events";

const TESTIMONIALS = [
  { name: "Priya K.", role: "AI/ML Student", text: "Codrithm helped me go from zero to landing my first internship in 6 months. The community is everything." },
  { name: "Marcus T.", role: "Web Dev Learner", text: "I shipped my first real project after joining the Web Dev community here. The mentors are incredible." },
  { name: "Zara L.", role: "Open Source Contributor", text: "Made my first open source contribution through a Codrithm sprint. Completely changed how I approach coding." },
];

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0">
            <HeroScene />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                  <Zap className="w-3 h-3" />
                  Student Tech Community
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-4"
              >
                <span className="text-gradient">Build.</span>{" "}
                <span className="text-gradient">Learn.</span>{" "}
                <span className="text-gradient">Grow</span>{" "}
                <span>Together.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground mb-8 leading-relaxed"
              >
                The platform where ambitious student developers discover tech, build real projects,
                and find their community. 10 specializations, unlimited potential.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                <Link href="/join">
                  <Button size="lg" className="glow-primary text-base px-6" data-testid="button-join-hero">
                    Join Free <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button size="lg" variant="outline" className="text-base px-6" data-testid="button-explore-hero">
                    Explore Categories
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4 mt-8 text-sm text-muted-foreground"
              >
                <div className="flex -space-x-2">
                  {["A","B","C","D"].map((l, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-primary text-xs font-bold`}>
                      {l}
                    </div>
                  ))}
                </div>
                <span>Join <strong className="text-foreground">3,250+</strong> student developers</span>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={<Users className="w-5 h-5" />} label="Active Members" value={3250} suffix="+" delay={0} />
              <StatCard icon={<BookOpen className="w-5 h-5" />} label="Categories" value={10} delay={0.1} color="text-secondary" />
              <StatCard icon={<Calendar className="w-5 h-5" />} label="Events Hosted" value={142} suffix="+" delay={0.2} color="text-chart-3" />
              <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Projects Built" value={890} suffix="+" delay={0.3} color="text-chart-4" />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Explore Tech Categories</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From beginner-friendly web development to advanced blockchain — find your path and start building.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {CATEGORIES.map((cat, i) => (
                <CategoryCard key={cat.id} category={cat} delay={i * 0.06} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/categories">
                <Button variant="outline" data-testid="button-view-all-categories">
                  View All Categories <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <ScrollReveal>
                  <h2 className="text-3xl font-bold mb-3">Upcoming Events</h2>
                  <p className="text-muted-foreground mb-8">Workshops, hackathons, and sprints — always something happening.</p>
                </ScrollReveal>
                <div className="flex flex-col gap-3">
                  {EVENTS.map((event, i) => (
                    <EventCard key={event.id} event={event} delay={i * 0.1} />
                  ))}
                </div>
              </div>

              <div>
                <ScrollReveal delay={0.2}>
                  <h2 className="text-3xl font-bold mb-3">What Members Say</h2>
                  <p className="text-muted-foreground mb-8">Real stories from students who found their path here.</p>
                </ScrollReveal>
                <div className="flex flex-col gap-4">
                  {TESTIMONIALS.map((t, i) => (
                    <ScrollReveal key={i} delay={0.1 * i} direction="right">
                      <div className="bg-card border border-card-border rounded-xl p-5">
                        <div className="flex mb-3 gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground italic mb-3">"{t.text}"</p>
                        <div>
                          <div className="font-semibold text-sm">{t.name}</div>
                          <div className="text-xs text-muted-foreground">{t.role}</div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-12">
                <h2 className="text-4xl font-black mb-4">
                  Ready to <span className="text-gradient">level up?</span>
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Join thousands of student developers already building their future on Codrithm.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link href="/join">
                    <Button size="lg" className="glow-primary text-base px-8" data-testid="button-join-cta">
                      Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="text-base px-8" data-testid="button-signin-cta">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
