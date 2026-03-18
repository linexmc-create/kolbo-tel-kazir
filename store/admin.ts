"use client";

import { create } from "zustand";

type AdminState = {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

const ADMIN_PASSWORD = "admin123";

export const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  login: (password) => {
    const ok = password === ADMIN_PASSWORD;
    if (ok) set({ isAdmin: true });
    return ok;
  },
  logout: () => set({ isAdmin: false }),
}));

