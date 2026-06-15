import { Code2, Cloud, Shield, Smartphone, Brain, Rocket, Database, Palette } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: typeof Code2;
  features: string[];
}

export const SERVICES: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Modern, responsive web applications built with cutting-edge frameworks and best practices.",
    icon: Code2,
    features: ["React & Next.js", "TypeScript", "API Design", "Performance Optimization"],
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment solutions for businesses of all sizes.",
    icon: Cloud,
    features: ["AWS & Azure", "Docker & K8s", "CI/CD Pipelines", "Cost Optimization"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Comprehensive security audits, penetration testing, and robust protection strategies.",
    icon: Shield,
    features: ["Security Audits", "Penetration Testing", "Compliance", "Incident Response"],
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    icon: Smartphone,
    features: ["React Native", "Flutter", "iOS & Android", "App Store Optimization"],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Intelligent solutions powered by machine learning, NLP, and computer vision.",
    icon: Brain,
    features: ["Custom Models", "NLP Solutions", "Computer Vision", "MLOps"],
  },
  {
    id: "devops",
    title: "DevOps & Automation",
    description: "Streamlined development workflows and infrastructure automation for faster delivery.",
    icon: Rocket,
    features: ["Infrastructure as Code", "Monitoring", "Automation", "Site Reliability"],
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    description: "Robust data pipelines and architectures that turn raw data into actionable insights.",
    icon: Database,
    features: ["Data Pipelines", "Warehousing", "ETL Processes", "Real-time Analytics"],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "User-centered design that transforms complex problems into intuitive interfaces.",
    icon: Palette,
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
];
