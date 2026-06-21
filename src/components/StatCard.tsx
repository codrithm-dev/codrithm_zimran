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
      style={{ background: "#0D1B2A", border: "1px solid rgba(43,100,217,0.2)", transition: "all 0.3s ease" }}
      className="rounded-xl p-6 flex flex-col gap-3 hover:shadow-lg"
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#112240"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.6)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#0D1B2A"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.2)"; }}
      data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <div className={`text-3xl font-bold font-mono ${color}`}>
          <AnimatedCounter value={value} suffix={suffix} prefix={prefix} />
        </div>
        <p className="text-sm mt-1" style={{ color: "#FFFFFF" }}>{label}</p>
      </div>
    </motion.div>
  );
}
