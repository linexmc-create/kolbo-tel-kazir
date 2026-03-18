"use client";

import Link from "next/link";
import { CartPanel } from "@/components/CartPanel";

export default function CartPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-2xl font-extrabold tracking-tight">הסל</div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            בדקו פריטים ושלחו הזמנה בווטסאפ.
          </div>
        </div>
        <Link
          href="/"
          className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/[0.03] dark:border-white/15 dark:hover:bg-white/10"
        >
          חזרה לקניות
        </Link>
      </div>

      <CartPanel compact />
    </main>
  );
}

