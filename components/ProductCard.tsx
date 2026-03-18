"use client";

import type { Product } from "@/types/product";
import { formatIls } from "@/lib/money";
import { useCartStore } from "@/store/cart";

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((s) => s.add);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const qty = useCartStore((s) => s.quantityFor(product.id));

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition-transform duration-150 hover:scale-[1.02]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F7F7F2]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <div className="line-clamp-2 text-base font-bold leading-6 text-zinc-900">
            {product.name}
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <div />
            <div className="text-base font-semibold text-zinc-900">
              {formatIls(product.price)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 rounded-xl bg-[#F7F7F2] p-2 ring-1 ring-black/5">
          <button
            type="button"
            onClick={() => setQuantity(product.id, qty - 1)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white text-lg font-semibold text-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition hover:-translate-y-0.5 active:translate-y-0"
            aria-label="הפחת"
          >
            −
          </button>
          <div className="flex flex-1 items-center justify-center text-base font-semibold tabular-nums text-zinc-900">
            {qty}
          </div>
          <button
            type="button"
            onClick={() => (qty ? setQuantity(product.id, qty + 1) : add(product))}
            className="grid h-10 w-10 place-items-center rounded-xl bg-[#6BAF92] text-lg font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:bg-[#5aa684] active:bg-[#539a7b]"
            aria-label="הוסף"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

