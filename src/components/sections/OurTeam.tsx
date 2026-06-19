import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";
import { GsapReveal } from "@/components/gsap/GsapReveal";

/* ── Team members — Unsplash portrait photos ── */
const MEMBERS = [
  {
    id: 1,
    name: "Arif Khan",
    role: "Founder & CEO",
    university: "NUST",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    github: "#",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    role: "CTO",
    university: "LUMS",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    github: "#",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Muhammad Bilal",
    role: "Lead Engineer",
    university: "UET",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
    github: "#",
    linkedin: "#",
  },
  {
    id: 4,
    name: "Hira Rizvi",
    role: "Design Lead",
    university: "IBA",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
    github: "#",
    linkedin: "#",
  },
  {
    id: 5,
    name: "Omar Farooq",
    role: "AI / ML Lead",
    university: "GIKI",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    github: "#",
    linkedin: "#",
  },
  {
    id: 6,
    name: "Zain Hassan",
    role: "Product Manager",
    university: "NED",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop&crop=face",
    github: "#",
    linkedin: "#",
  },
  {
    id: 7,
    name: "Mina Ali",
    role: "Backend Engineer",
    university: "FAST",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face",
    github: "#",
    linkedin: "#",
  },
];

/* ── Fan layout helpers ── */
const VISIBLE = 7; // cards shown at once
const CENTER = Math.floor(VISIBLE / 2); // index 3 is center

function getCardTransform(offset: number) {
  // offset: -3 … +3 from center
  const absOffset = Math.abs(offset);
  const sign = Math.sign(offset);

  const rotateY = offset * 18;           // tilt each card
  const translateX = offset * 110;       // spread horizontally
  const translateZ = -absOffset * 60;    // push non-center cards back
  const scale = 1 - absOffset * 0.09;   // shrink side cards
  const zIndex = VISIBLE - absOffset;

  return { rotateY, translateX, translateZ, scale, zIndex };
}

export function OurTeam() {
  const [activeIndex, setActiveIndex] = useState(CENTER);

  const visibleMembers = MEMBERS.slice(0, VISIBLE);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <GsapTextReveal as="h2" className="text-4xl sm:text-5xl font-black mb-4">
            Our <span className="text-gradient">Team</span>
          </GsapTextReveal>
          <GsapReveal delay={0.15}>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              The engineers, designers, and dreamers behind Codrithm.
            </p>
          </GsapReveal>
        </div>

        {/* 3-D Fan carousel */}
        <GsapReveal delay={0.2}>
          <div
            className="relative flex items-end justify-center"
            style={{
              perspective: "1200px",
              height: 420,
            }}
          >
            {visibleMembers.map((member, i) => {
              const offset = i - activeIndex;
              const { rotateY, translateX, translateZ, scale, zIndex } =
                getCardTransform(offset);
              const isCenter = offset === 0;

              return (
                <motion.div
                  key={member.id}
                  className="absolute bottom-0 cursor-pointer select-none"
                  style={{ zIndex }}
                  animate={{
                    rotateY,
                    x: translateX,
                    z: translateZ,
                    scale,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  onClick={() => setActiveIndex(i)}
                  whileHover={!isCenter ? { scale: scale + 0.04 } : {}}
                >
                  <div
                    className={`relative rounded-2xl overflow-hidden transition-shadow duration-300 ${
                      isCenter
                        ? "shadow-2xl shadow-primary/20 ring-2 ring-primary/30"
                        : "shadow-lg"
                    }`}
                    style={{ width: isCenter ? 200 : 160, height: isCenter ? 320 : 260 }}
                  >
                    {/* Photo */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className={`font-bold text-white leading-tight ${isCenter ? "text-sm" : "text-xs"}`}>
                        {member.name}
                      </p>
                      <p className={`text-primary font-medium ${isCenter ? "text-xs" : "text-[10px]"}`}>
                        {member.university}
                      </p>

                      {/* Social links — only on center card */}
                      {isCenter && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-2 mt-2"
                        >
                          <a
                            href={member.github}
                            onClick={(e) => e.stopPropagation()}
                            className="w-6 h-6 rounded-md bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary/70 transition-colors"
                          >
                            <Github className="w-3 h-3" />
                          </a>
                          <a
                            href={member.linkedin}
                            onClick={(e) => e.stopPropagation()}
                            className="w-6 h-6 rounded-md bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary/70 transition-colors"
                          >
                            <Linkedin className="w-3 h-3" />
                          </a>
                        </motion.div>
                      )}
                    </div>

                    {/* Glare highlight on center */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-transparent pointer-events-none rounded-2xl" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GsapReveal>

        {/* Center member detail */}
        <GsapReveal delay={0.3}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mt-10"
          >
            <h3 className="text-xl font-bold">{visibleMembers[activeIndex]?.name}</h3>
            <p className="text-primary font-medium text-sm mt-1">
              {visibleMembers[activeIndex]?.role}
            </p>
          </motion.div>
        </GsapReveal>

        {/* Dot nav */}
        <div className="flex justify-center gap-2 mt-6">
          {visibleMembers.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
