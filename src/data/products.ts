export interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  status: "live" | "beta" | "coming-soon";
  url?: string;
  image?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "codrithm-learn",
    name: "Codrithm Learn",
    description: "An adaptive learning platform that personalizes coding education based on each student's pace and style.",
    features: [
      "AI-powered personalized learning paths",
      "Interactive coding challenges",
      "Real-time progress tracking",
      "Peer review system",
    ],
    status: "live",
    url: "#",
  },
  {
    id: "codrithm-connect",
    name: "Codrithm Connect",
    description: "A developer networking platform that matches students with mentors, collaborators, and opportunities.",
    features: [
      "Smart mentor matching",
      "Project collaboration boards",
      "Skill-based connections",
      "Event recommendations",
    ],
    status: "live",
    url: "#",
  },
  {
    id: "codrithm-deploy",
    name: "Codrithm Deploy",
    description: "Zero-config deployment platform designed for student projects, from prototype to production.",
    features: [
      "One-click deployments",
      "Automatic SSL & CDN",
      "Preview environments",
      "Built-in analytics",
    ],
    status: "beta",
  },
  {
    id: "codrithm-ai",
    name: "Codrithm AI",
    description: "AI-powered code review and learning assistant that helps students write better code faster.",
    features: [
      "Intelligent code review",
      "Natural language explanations",
      "Bug detection & fixes",
      "Learning recommendations",
    ],
    status: "coming-soon",
  },
];
