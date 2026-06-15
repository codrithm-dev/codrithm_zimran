import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

const TECH_CATEGORIES = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    label: "AI & Data",
    items: ["TensorFlow", "PyTorch", "OpenAI", "Apache Spark", "Redis"],
  },
];

export function TechStack() {
  return (
    <section className="py-20 bg-muted/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Our Tech Stack</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We work with the technologies that power modern software.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.label} delay={i * 0.1}>
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-semibold text-sm text-primary mb-4 uppercase tracking-wider">
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted/50 text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground transition-colors cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
