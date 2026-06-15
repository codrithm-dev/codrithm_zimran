export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const TEAM: TeamMember[] = [
  {
    id: "arif-khan",
    name: "Arif Khan",
    role: "Founder & CEO",
    bio: "Full-stack engineer with 10+ years of experience building scalable platforms. Passionate about democratizing tech education.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arif",
    social: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    id: "sara-ahmed",
    name: "Sara Ahmed",
    role: "CTO",
    bio: "Cloud architect and DevOps specialist. Previously led infrastructure at two Y Combinator startups.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "zain-hassan",
    name: "Zain Hassan",
    role: "Head of Product",
    bio: "Product thinker with a design background. Obsessed with building tools that developers actually love to use.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zain",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "mina-ali",
    name: "Mina Ali",
    role: "Lead Engineer",
    bio: "Systems engineer specializing in high-performance applications and distributed systems.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mina",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "omar-farooq",
    name: "Omar Farooq",
    role: "AI/ML Lead",
    bio: "Machine learning researcher turned engineer. Building the AI features that power Codrithm's platform.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    social: { github: "#", linkedin: "#" },
  },
  {
    id: "hira-rizvi",
    name: "Hira Rizvi",
    role: "Design Lead",
    bio: "UX designer focused on accessibility and delightful experiences. Former design lead at a Series B startup.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hira",
    social: { linkedin: "#", twitter: "#" },
  },
];
