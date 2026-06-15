import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Github } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";

export default function Projects() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = PROJECTS.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
                Our <span className="text-gradient">Projects</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Real solutions built by our community. From enterprise platforms to open source tools.
              </p>
            </ScrollReveal>

            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search projects or technologies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-card border border-card-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              {PROJECT_CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "bg-card border border-card-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${search}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card border border-card-border rounded-xl overflow-hidden h-full flex flex-col hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm text-foreground">
                        {project.category}
                      </span>
                      <span className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full ${
                        project.status === "Active"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : project.status === "Completed"
                          ? "bg-blue-400/10 text-blue-400"
                          : "bg-amber-400/10 text-amber-400"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                        >
                          <Github className="w-3.5 h-3.5" />
                          View Source
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">No projects found</p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
