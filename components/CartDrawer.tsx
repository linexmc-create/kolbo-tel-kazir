"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/ui";
import { CartPanel } from "@/components/CartPanel";

export function CartDrawer() {
  const isOpen = useUiStore((s) => s.isCartOpen);
  const close = useUiStore((s) => s.closeCart);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (!isOpen) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/20 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute left-0 top-0 h-full w-[92vw] max-w-[420px] bg-[#F7F7F2] shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="סל קניות"
      >
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-4">
          <div className="text-base font-semibold text-zinc-900">הסל שלך</div>
          <button
            type="button"
            onClick={close}
            className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition hover:-translate-y-0.5 active:translate-y-0"
          >
            סגור
          </button>
        </div>

        <div className="h-[calc(100%-72px)] overflow-auto p-4">
          <CartPanel compact />
        </div>
      </aside>
    </div>
  );
}

