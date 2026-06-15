import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { MagneticButton } from "@/components/MagneticButton";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blogs";
import type { BlogPost } from "@/data/blogs";

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = BLOG_POSTS.filter((p) => p.featured);
  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
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
                Tech <span className="text-gradient">Blog</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Insights, tutorials, and stories from our community of developers.
              </p>
            </ScrollReveal>

            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search articles"
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-card border border-card-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4 flex-wrap" role="group" aria-label="Filter by category">
              {BLOG_CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
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
          {featured.length > 0 && activeCategory === "All" && !search && (
            <section className="mb-12">
              <ScrollReveal>
                <h2 className="text-xl font-bold mb-6">Featured Articles</h2>
              </ScrollReveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((post, i) => (
                  <BlogCard key={post.id} post={post} delay={i * 0.1} featured />
                ))}
              </div>
            </section>
          )}

          <section>
            <ScrollReveal>
              <h2 className="text-xl font-bold mb-6">
                {activeCategory === "All" ? "All Articles" : activeCategory}
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {filtered.map((post, i) => (
                  <BlogCard key={post.id} post={post} delay={i * 0.05} />
                ))}
              </AnimatePresence>
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg font-medium">No articles found</p>
                <p className="text-sm mt-1">Try a different search or category</p>
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}

function BlogCard({ post, delay = 0, featured = false }: { post: BlogPost; delay?: number; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="bg-card border border-card-border rounded-xl overflow-hidden group hover:border-primary/40 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {featured && (
          <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
            Featured
          </span>
        )}
        <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm text-foreground">
          {post.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">
              {post.authorAvatar}
            </div>
            <span className="text-xs text-muted-foreground">{post.author}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
