"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { CartIcon } from "@/components/icons/CartIcon";
import Image from "next/image";

export function Header() {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <a
            href="tel:0509333650"
            className="hidden text-sm font-medium text-zinc-700 hover:text-zinc-900 sm:inline-flex"
          >
            050-9333650
          </a>
          <div className="hidden h-4 w-px bg-black/10 sm:block" />
          <div className="hidden text-sm text-zinc-600 sm:block">
            מוצרים טריים עד הבית
          </div>
        </div>

        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white ring-1 ring-black/5">
            <Image src="/logo.png" alt="כלבו תל קציר" fill className="object-cover" />
          </div>
          <div className="leading-tight text-right">
            <div className="text-sm font-bold tracking-tight text-zinc-900">
              כלבו תל קציר
            </div>
            <div className="text-xs text-zinc-600">חנות אונליין</div>
          </div>
        </Link>

        <Link
          href="/cart"
          className="inline-flex items-center gap-2 rounded-xl bg-[#6BAF92] px-3 py-2 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-[#5aa684] active:bg-[#539a7b]"
        >
          <CartIcon className="h-5 w-5" />
          סל
          <span className="rounded-lg bg-white/15 px-2 py-0.5 text-xs font-semibold">
            {totalItems}
          </span>
        </Link>
      </div>
    </header>
  );
}

