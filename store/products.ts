"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

type NewProductInput = {
  name: string;
  price: number;
  category: Category;
  image: string;
};

type ProductsState = {
  products: Product[];
  addProduct: (input: NewProductInput) => { ok: true } | { ok: false; error: string };
  deleteProduct: (id: number) => void;
  clearAll: () => void;
};

function normalizePrice(n: number) {
  if (!Number.isFinite(n)) return NaN;
  return Math.round(n * 100) / 100;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (input) => {
        const name = input.name.trim();
        const image = input.image.trim();
        const price = normalizePrice(input.price);

        if (!name) return { ok: false, error: "נא להזין שם מוצר" };
        if (!image) return { ok: false, error: "נא להזין קישור לתמונה" };
        if (!Number.isFinite(price) || price <= 0)
          return { ok: false, error: "נא להזין מחיר תקין" };

        const now = new Date().toISOString();
        const nextId = (get().products.at(0)?.id ?? 0) + 1;

        const product: Product = {
          id: nextId,
          name,
          price,
          category: input.category,
          image,
          created_at: now,
        };

        set((state) => ({ products: [product, ...state.products] }));
        return { ok: true };
      },
      deleteProduct: (id) =>
        set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
      clearAll: () => set({ products: [] }),
    }),
    { name: "ktk-products-v1" },
  ),
);

