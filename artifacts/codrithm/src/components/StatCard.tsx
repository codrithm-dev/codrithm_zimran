import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  color?: string;
  delay?: number;
}

export function StatCard({
  icon,
  label,
  value,
  suffix = "",
  prefix = "",
  color = "text-primary",
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-card border border-card-border rounded-xl p-6 flex flex-col gap-3"
      data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <div className={`text-3xl font-bold font-mono ${color}`}>
          <AnimatedCounter value={value} suffix={suffix} prefix={prefix} />
        </div>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </div>
    </motion.div>
  );
}
