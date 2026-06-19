export interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  status: "live" | "beta" | "coming-soon";
  url?: string;
  image?: string;
}

export const PRODUCTS: Product[] = [];
