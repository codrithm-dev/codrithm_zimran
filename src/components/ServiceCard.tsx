import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  color?: string;
  delay?: number;
  cta?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  items,
  color = "text-primary",
  delay = 0,
  cta = "Learn More",
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      style={{ background: "#0D1B2A", border: "1px solid rgba(43,100,217,0.2)", transition: "all 0.3s ease" }}
      className="rounded-xl p-6 group hover:shadow-lg"
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#112240"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.6)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#0D1B2A"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.2)"; }}
    >
      <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 ${color}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{title}</h3>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#FFFFFF" }}>{description}</p>
      <ul className="space-y-2 mb-5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "#FFFFFF" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <MagneticButton pullDistance={6}>
        <Button variant="ghost" size="sm" className="group/btn cursor-pointer">
          {cta}
          <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </MagneticButton>
    </motion.div>
  );
}
