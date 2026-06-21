import { motion } from "framer-motion";
import { Github, Linkedin } from "@/components/icons";
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
      className="bg-card border border-card-border rounded-xl p-6 text-center group hover:border-primary/40 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-border group-hover:border-primary/40 transition-colors">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
        {member.name}
      </h3>
      <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
        {member.bio}
      </p>
      <div className="flex justify-center gap-3">
        {member.social?.linkedin && (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        )}
        {member.social?.github && (
          <a
            href={member.social.github}
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
