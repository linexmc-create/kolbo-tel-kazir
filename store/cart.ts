"use client";

import { create } from "zustand";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

type CartState = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  quantityFor: (productId: number) => number;
  clear: () => void;
  totalPrice: () => number;
  totalItems: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  add: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),
  remove: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),
  setQuantity: (productId, quantity) =>
    set((state) => {
      const q = Math.max(0, Math.floor(quantity || 0));
      if (q === 0) {
        return { items: state.items.filter((i) => i.product.id !== productId) };
      }
      const existing = state.items.find((i) => i.product.id === productId);
      if (!existing) {
        return state;
      }
      return {
        items: state.items.map((i) =>
          i.product.id === productId ? { ...i, quantity: q } : i,
        ),
      };
    }),
  quantityFor: (productId) =>
    get().items.find((i) => i.product.id === productId)?.quantity ?? 0,
  clear: () => set({ items: [] }),
  totalPrice: () =>
    get().items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0,
    ),
  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));

