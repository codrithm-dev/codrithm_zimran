import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
  delay?: number;
}

const TYPE_COLORS: Record<string, string> = {
  Workshop: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Hackathon: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Competition: "bg-red-500/10 text-red-400 border-red-500/20",
  Sprint: "bg-green-500/10 text-green-400 border-green-500/20",
  Bootcamp: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export function EventCard({ event, delay = 0 }: EventCardProps) {
  const date = new Date(event.date);
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const timeStr = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const fillPct = Math.round((event.attendees / event.maxAttendees) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ x: 4 }}
      style={{ background: "#0D1B2A", border: "1px solid rgba(43,100,217,0.2)", transition: "all 0.3s ease" }}
      className="rounded-xl p-4 group hover:shadow-lg"
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#112240"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.6)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#0D1B2A"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.2)"; }}
      data-testid={`card-event-${event.id}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-primary flex-shrink-0">
          <span className="text-xs font-bold">{dateStr.split(" ")[0]}</span>
          <span className="text-lg font-bold leading-none">{dateStr.split(" ")[1]}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-sm leading-snug" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {event.title}
            </h4>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${
                TYPE_COLORS[event.type] ?? "bg-muted text-muted-foreground border-transparent"
              }`}
            >
              {event.type}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs" style={{ color: "#FFFFFF" }}>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {timeStr}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {event.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {event.attendees}/{event.maxAttendees}
            </span>
          </div>

          <div className="mt-2 h-1 rounded-full bg-muted/50 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${fillPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: delay + 0.3 }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
