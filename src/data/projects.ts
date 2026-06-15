export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: string;
  image?: string;
  url?: string;
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "open-contrib",
    title: "OpenContrib",
    description: "An open-source contribution tracker that helps students discover beginner-friendly issues across GitHub repositories.",
    techStack: ["React", "Node.js", "PostgreSQL", "GitHub API"],
    category: "Developer Tools",
    github: "#",
  },
  {
    id: "campus-connect",
    title: "Campus Connect",
    description: "A real-time campus event and study group coordination platform built by and for university students.",
    techStack: ["Next.js", "Socket.io", "MongoDB", "Tailwind CSS"],
    category: "Community",
    url: "#",
  },
  {
    id: "algo-visualizer",
    title: "Algo Visualizer",
    description: "Interactive visualization of sorting, searching, and graph algorithms with step-by-step explanations.",
    techStack: ["TypeScript", "Canvas API", "React", "Framer Motion"],
    category: "Education",
    url: "#",
    github: "#",
  },
  {
    id: "devmetrics",
    title: "DevMetrics",
    description: "A developer productivity dashboard that aggregates GitHub activity, coding streaks, and project health metrics.",
    techStack: ["Vue.js", "Python", "FastAPI", "Redis"],
    category: "Analytics",
    github: "#",
  },
  {
    id: "green-code",
    title: "Green Code",
    description: "A carbon-aware CI/CD tool that schedules builds during low-carbon-intensity periods on the power grid.",
    techStack: ["Go", "Docker", "GitHub Actions", "Carbon API"],
    category: "Sustainability",
    github: "#",
  },
  {
    id: "skillforge",
    title: "SkillForge",
    description: "An AI-driven skill assessment platform that generates personalized roadmaps for aspiring developers.",
    techStack: ["Python", "React", "OpenAI", "Supabase"],
    category: "Education",
    url: "#",
  },
];
