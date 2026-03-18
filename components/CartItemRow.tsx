"use client";

import { formatIls } from "@/lib/money";
import { useCartStore } from "@/store/cart";
import type { CartItem } from "@/types/cart";

export function CartItemRow({ item }: { item: CartItem }) {
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-zinc-950">
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">{item.product.name}</div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {formatIls(item.product.price)} ליח׳
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setQuantity(item.product.id, item.quantity - 1)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-black/10 hover:bg-black/[0.03] dark:border-white/15 dark:hover:bg-white/10"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input
          inputMode="numeric"
          value={item.quantity}
          onChange={(e) => setQuantity(item.product.id, Number(e.target.value))}
          className="h-9 w-14 rounded-lg border border-black/10 bg-transparent text-center text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500/40 dark:border-white/15"
          aria-label="Quantity"
        />
        <button
          type="button"
          onClick={() => setQuantity(item.product.id, item.quantity + 1)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-black/10 hover:bg-black/[0.03] dark:border-white/15 dark:hover:bg-white/10"
          aria-label="Increase quantity"
        >
          +
        </button>

        <button
          type="button"
          onClick={() => remove(item.product.id)}
          className="ml-1 rounded-lg px-3 py-2 text-sm font-semibold text-zinc-600 hover:bg-black/[0.03] dark:text-zinc-300 dark:hover:bg-white/10"
        >
          הסר
        </button>
      </div>
    </div>
  );
}

