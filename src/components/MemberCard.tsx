import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import type { TeamMember } from "@/data/team";

interface MemberCardProps {
  member: TeamMember;
  delay?: number;
}

export function MemberCard({ member, delay = 0 }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -6 }}
      style={{ background: "#0D1B2A", border: "1px solid rgba(43,100,217,0.2)", transition: "all 0.3s ease" }}
      className="rounded-xl p-6 text-center group hover:shadow-lg"
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#112240"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.6)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#0D1B2A"; (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(43,100,217,0.2)"; }}
    >
      <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-border group-hover:border-primary/40 transition-colors">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="font-bold text-base mb-1" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        {member.name}
      </h3>
      <p className="text-sm text-primary font-medium mb-2">{member.position}</p>
      <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: "#FFFFFF" }}>
        {member.bio}
      </p>
      <div className="flex justify-center gap-3">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        )}
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
