"use client";

import { useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";
import { formatIls } from "@/lib/money";
import { CartIcon } from "@/components/icons/CartIcon";

export function CartFab() {
  const totalItems = useCartStore((s) => s.totalItems());
  const totalPrice = useCartStore((s) => s.totalPrice());
  const openCart = useUiStore((s) => s.openCart);

  return (
    <button
      type="button"
      onClick={openCart}
      className="fixed bottom-4 left-4 z-40 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition hover:-translate-y-0.5 active:translate-y-0"
      aria-label="פתח סל קניות"
    >
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#6BAF92] text-white">
        <CartIcon className="h-5 w-5" />
      </div>
      <div className="text-right leading-tight">
        <div className="text-sm font-semibold text-zinc-900">סל קניות</div>
        <div className="text-xs text-zinc-600 leading-5">
          {formatIls(totalPrice)} • {totalItems} פריטים
        </div>
      </div>
      <div className="mr-2 rounded-lg bg-[#E8AFAF]/55 px-2.5 py-1 text-xs font-semibold text-zinc-900">
        {totalItems}
      </div>
    </button>
  );
}

