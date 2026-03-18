import type { Category } from "./category";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: Category;
  image: string;
  created_at: string;
};

