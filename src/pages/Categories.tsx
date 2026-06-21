import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { ParallaxSection } from "@/components/ParallaxSection";
import { CATEGORIES } from "@/data/categories";

const FILTERS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Categories() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = CATEGORIES.filter((c) => {
    const matchesDifficulty = filter === "All" || c.difficulty === filter;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="relative pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <ParallaxBackground count={3} showParticles={true} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-black mb-3">
                Find Your <span className="text-gradient">Tech Path</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                10 specializations, endless opportunities. Pick a track and start building.
              </p>
            </ScrollReveal>

            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  data-testid="input-category-search"
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-card border border-card-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {FILTERS.map((f) => (
                <motion.button
                  key={f}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(f)}
                  data-testid={`button-filter-${f.toLowerCase()}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filter === f
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "bg-card border border-card-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-4">
            <ParallaxSection speed={-0.1}>
              <p className="text-sm text-muted-foreground">
                Showing <span className="text-foreground font-medium">{filtered.length}</span> categories
              </p>
            </ParallaxSection>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${search}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filtered.map((cat, i) => (
                <CategoryCard key={cat.id} category={cat} delay={i * 0.05} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">No categories found</p>
              <p className="text-sm mt-1">Try a different search or filter</p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
