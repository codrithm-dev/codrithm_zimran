import { useRef } from "react";
import { Link } from "wouter";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Users, ChevronRight } from "lucide-react";
import type { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
  delay?: number;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "text-emerald-400 bg-emerald-400/10",
  Intermediate: "text-amber-400 bg-amber-400/10",
  Advanced: "text-rose-400 bg-rose-400/10",
};

export function CategoryCard({ category, delay = 0 }: CategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const IconComponent =
    ((LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>) [category.icon]) ||
    LucideIcons.Code2;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={`card-category-${category.id}`}
    >
      <Link href={`/categories/${category.id}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-card border border-card-border rounded-xl p-5 cursor-pointer group transition-all duration-300 hover:border-primary/40 hover:shadow-lg h-full"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                DIFFICULTY_COLORS[category.difficulty] ?? "text-muted-foreground bg-muted/50"
              }`}
            >
              {category.difficulty}
            </span>
          </div>

          <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {category.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{category.memberCount.toLocaleString()} members</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-0.5" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
