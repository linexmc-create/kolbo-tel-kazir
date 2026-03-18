"use client";

import { useMemo, useState } from "react";
import { useAdminStore } from "@/store/admin";
import { useProductsStore } from "@/store/products";
import { CATEGORIES, type Category } from "@/types/category";
import { formatIls } from "@/lib/money";

export default function AdminPage() {
  const isAdmin = useAdminStore((s) => s.isAdmin);
  const login = useAdminStore((s) => s.login);
  const logout = useAdminStore((s) => s.logout);

  const products = useProductsStore((s) => s.products);
  const addProduct = useProductsStore((s) => s.addProduct);
  const deleteProduct = useProductsStore((s) => s.deleteProduct);

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [image, setImage] = useState("");

  const [toast, setToast] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      image.trim().length > 0 &&
      Number(price) > 0 &&
      Number.isFinite(Number(price))
    );
  }, [name, image, price]);

  function showToast(msg: string) {
    setToast(msg);
    window.clearTimeout((showToast as any)._t);
    (showToast as any)._t = window.setTimeout(() => setToast(null), 2200);
  }

  if (!isAdmin) {
    return (
      <main className="mx-auto w-full max-w-[520px] px-4 py-10 md:px-6">
        <div className="rounded-xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
          <div className="text-lg font-bold text-zinc-900">כניסת מנהל</div>
          <div className="mt-1 text-sm leading-6 text-zinc-600">
            הדף הזה מוסתר. הכניסו סיסמה כדי לגשת לניהול מוצרים.
          </div>

          <div className="mt-5 grid gap-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="סיסמה"
              type="password"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm outline-none placeholder:text-zinc-400 focus:border-[#6BAF92]/40 focus:ring-2 focus:ring-[#6BAF92]/20"
            />
            {loginError ? (
              <div className="text-sm text-red-600">{loginError}</div>
            ) : null}
            <button
              type="button"
              onClick={() => {
                const ok = login(password);
                if (!ok) {
                  setLoginError("סיסמה שגויה");
                  return;
                }
                setLoginError(null);
                setPassword("");
                showToast("התחברת בהצלחה");
              }}
              className="rounded-xl bg-[#6BAF92] px-4 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-[#5aa684] active:bg-[#539a7b]"
            >
              התחברות
            </button>
          </div>
        </div>

        {toast ? (
          <div className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
            {toast}
          </div>
        ) : null}
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="text-xl font-bold text-zinc-900">ניהול מוצרים</div>
          <div className="mt-1 text-sm text-zinc-600">
            הוספה/מחיקה של מוצרים שמופיעים בחנות.
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            logout();
            showToast("התנתקת");
          }}
          className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5 hover:bg-black/[0.02]"
        >
          התנתקות
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <section className="rounded-xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
          <div className="text-base font-bold text-zinc-900">הוספת מוצר</div>
          <div className="mt-4 grid gap-3">
            <div className="grid gap-1">
              <div className="text-sm font-medium text-zinc-700">שם מוצר</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-black/10 px-3 py-3 text-sm outline-none focus:border-[#6BAF92]/40 focus:ring-2 focus:ring-[#6BAF92]/20"
                placeholder="לדוגמה: קולה"
              />
            </div>

            <div className="grid gap-1">
              <div className="text-sm font-medium text-zinc-700">מחיר</div>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputMode="decimal"
                className="w-full rounded-xl border border-black/10 px-3 py-3 text-sm outline-none focus:border-[#6BAF92]/40 focus:ring-2 focus:ring-[#6BAF92]/20"
                placeholder="לדוגמה: 8.90"
              />
            </div>

            <div className="grid gap-1">
              <div className="text-sm font-medium text-zinc-700">קטגוריה</div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-[#6BAF92]/40 focus:ring-2 focus:ring-[#6BAF92]/20"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1">
              <div className="text-sm font-medium text-zinc-700">תמונה (URL)</div>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-xl border border-black/10 px-3 py-3 text-sm outline-none focus:border-[#6BAF92]/40 focus:ring-2 focus:ring-[#6BAF92]/20"
                placeholder="https://..."
              />
            </div>

            {formError ? (
              <div className="text-sm text-red-600">{formError}</div>
            ) : null}

            <button
              type="button"
              disabled={!canSubmit}
              onClick={() => {
                setFormError(null);
                const res = addProduct({
                  name,
                  price: Number(price),
                  category,
                  image,
                });
                if (!res.ok) {
                  setFormError(res.error);
                  return;
                }
                setName("");
                setPrice("");
                setCategory(CATEGORIES[0]);
                setImage("");
                showToast("המוצר נוסף בהצלחה");
              }}
              className={`rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
                canSubmit
                  ? "bg-[#6BAF92] hover:bg-[#5aa684] active:bg-[#539a7b]"
                  : "bg-zinc-300"
              }`}
            >
              הוסף מוצר
            </button>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-base font-bold text-zinc-900">
                כל המוצרים ({products.length})
              </div>
              <div className="mt-1 text-sm text-zinc-600">
                למחיקה לחצו על כפתור "מחק מוצר".
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {products.length ? (
              products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3 rounded-xl bg-[#F7F7F2] p-3 ring-1 ring-black/5"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-zinc-900">
                      {p.name}
                    </div>
                    <div className="text-xs text-zinc-600">
                      {p.category} • {formatIls(p.price)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      deleteProduct(p.id);
                      showToast("המוצר נמחק");
                    }}
                    className="shrink-0 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5 hover:bg-black/[0.02]"
                  >
                    מחק מוצר
                  </button>
                </div>
              ))
            ) : (
              <div className="rounded-xl bg-[#F7F7F2] p-6 text-sm text-zinc-700 ring-1 ring-black/5">
                אין מוצרים. הוסיפו מוצר ראשון מהטופס.
              </div>
            )}
          </div>
        </section>
      </div>

      {toast ? (
        <div className="fixed bottom-4 left-4 z-50 rounded-xl bg-white px-4 py-3 text-sm text-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
          {toast}
        </div>
      ) : null}
    </main>
  );
}

