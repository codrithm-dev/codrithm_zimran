import { Code2, Cloud, Shield, Smartphone, Brain, Rocket, Database, Palette } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: typeof Code2;
  features: string[];
}

export const SERVICES: Service[] = [];
