export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  memberCount: number;
  difficulty: string;
  color: string;
  accent: string;
  resources: string[];
  projects: string[];
}

export const CATEGORIES: Category[] = [];
