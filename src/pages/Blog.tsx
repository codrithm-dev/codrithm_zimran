import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageTransition } from "@/components/PageTransition";
import { BLOGS } from "@/data/blogs";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/MagneticButton";

export default function Blog() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal>
              <h1 className="text-4xl sm:text-5xl font-black mb-4">
                Our <span className="text-gradient">Blog</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Insights, tutorials, and perspectives from our engineering and design teams.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BLOGS.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.08}>
                  <motion.article
                    whileHover={{ y: -4 }}
                    className="bg-card border border-card-border rounded-xl overflow-hidden h-full flex flex-col"
                  >
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="font-semibold mb-2">{post.title}</h2>
                      <p className="text-sm text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{post.author}</span>
                      </div>
                    </div>
                  </motion.article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-12">
                <h2 className="text-3xl font-black mb-4">
                  Want to <span className="text-gradient">contribute?</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  We welcome guest posts from developers and educators. Share your knowledge with our community.
                </p>
                <MagneticButton pullDistance={10}>
                  <Button variant="outline">
                    Write for Us <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
