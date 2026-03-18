"use client";

import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cart";
import { CartItemRow } from "@/components/CartItemRow";
import { formatIls } from "@/lib/money";
import { buildWhatsAppOrderText, getWhatsAppUrl } from "@/lib/whatsapp";

const WHATSAPP_PHONE = "972509333650";

export function CartPanel({ compact }: { compact?: boolean }) {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const totalPrice = useCartStore((s) => s.totalPrice());

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const waUrl = useMemo(() => {
    const text = buildWhatsAppOrderText({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items,
      totalPrice,
    });
    return getWhatsAppUrl(WHATSAPP_PHONE, text);
  }, [items, totalPrice, name, phone, address]);

  return (
    <section className="rounded-xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-bold leading-6 text-zinc-900">
            הסל שלך
          </div>
          <div className="text-xs leading-5 text-zinc-500">
            {items.length ? `${items.length} סוגי מוצרים` : "הסל ריק"}
          </div>
        </div>
        {items.length ? (
          <button
            type="button"
            onClick={clear}
            className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-black/[0.02]"
          >
            ניקוי
          </button>
        ) : null}
      </div>

      <div className="mt-4 space-y-2">
        {items.length ? (
          items.map((item) => <CartItemRow key={item.product.id} item={item} />)
        ) : (
          <div className="rounded-xl border border-dashed border-black/10 bg-[#F7F7F2] p-6 text-sm leading-6 text-zinc-600">
            הוסיפו מוצרים כדי להתחיל הזמנה.
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F7F7F2] px-4 py-3 ring-1 ring-black/5">
        <div className="text-sm font-bold text-zinc-900">סה״כ</div>
        <div className="text-sm font-semibold text-zinc-900">
          {formatIls(totalPrice)}
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <div className="text-sm font-bold text-zinc-900">פרטי משלוח</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="שם"
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm font-normal leading-6 outline-none placeholder:text-zinc-400 focus:border-[#6BAF92]/40 focus:ring-2 focus:ring-[#6BAF92]/20"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="טלפון"
          inputMode="tel"
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm font-normal leading-6 outline-none placeholder:text-zinc-400 focus:border-[#6BAF92]/40 focus:ring-2 focus:ring-[#6BAF92]/20"
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="כתובת"
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm font-normal leading-6 outline-none placeholder:text-zinc-400 focus:border-[#6BAF92]/40 focus:ring-2 focus:ring-[#6BAF92]/20"
        />
      </div>

      <div className="mt-3 flex gap-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex flex-1 items-center justify-center rounded-xl bg-[#6BAF92] px-4 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:bg-[#5aa684] active:translate-y-0 active:bg-[#539a7b] ${
            items.length ? "" : "pointer-events-none opacity-50"
          }`}
        >
          הזמן עכשיו בוואטסאפ
        </a>
        {compact ? null : (
          <div className="hidden w-1 sm:block" />
        )}
      </div>

      <div className="mt-2 text-xs leading-5 text-zinc-500">
        השליחה תיפתח בווטסאפ למספר החנות.
      </div>
    </section>
  );
}

