export interface Project {
  id: string;
  title: string;
  name: string;
  description: string;
  techStack: string[];
  technologies: string[];
  category: string;
  image?: string;
  url?: string;
  github?: string;
  status: "Active" | "Beta" | "Completed";
  featured?: boolean;
}

export const PROJECTS: Project[] = [];
