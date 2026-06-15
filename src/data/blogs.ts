export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  slug: string;
}

export const BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable Microservices with Node.js",
    excerpt: "A deep dive into designing and deploying microservices architecture that scales with your business needs.",
    date: "2026-06-10",
    author: "Arif Khan",
    category: "Engineering",
    readTime: "8 min read",
    slug: "scalable-microservices-nodejs",
  },
  {
    id: "2",
    title: "The Future of AI in Software Development",
    excerpt: "How artificial intelligence is transforming the way we write, test, and deploy code.",
    date: "2026-06-05",
    author: "Omar Farooq",
    category: "AI & ML",
    readTime: "6 min read",
    slug: "future-ai-software-development",
  },
  {
    id: "3",
    title: "DevOps Best Practices for 2026",
    excerpt: "Essential DevOps practices and tools every engineering team should adopt this year.",
    date: "2026-05-28",
    author: "Sara Ahmed",
    category: "DevOps",
    readTime: "10 min read",
    slug: "devops-best-practices-2026",
  },
  {
    id: "4",
    title: "Designing Accessible User Interfaces",
    excerpt: "Why accessibility matters and practical techniques for building inclusive digital experiences.",
    date: "2026-05-20",
    author: "Hira Rizvi",
    category: "Design",
    readTime: "7 min read",
    slug: "designing-accessible-uis",
  },
  {
    id: "5",
    title: "Cloud Cost Optimization Strategies",
    excerpt: "Practical strategies to reduce your cloud spend without compromising performance or reliability.",
    date: "2026-05-15",
    author: "Sara Ahmed",
    category: "Cloud",
    readTime: "9 min read",
    slug: "cloud-cost-optimization",
  },
  {
    id: "6",
    title: "Introduction to Prompt Engineering",
    excerpt: "Master the art of crafting effective prompts to get the most out of large language models.",
    date: "2026-05-10",
    author: "Omar Farooq",
    category: "AI & ML",
    readTime: "5 min read",
    slug: "intro-prompt-engineering",
  },
];
