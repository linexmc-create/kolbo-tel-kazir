"use client";

import { CATEGORIES, type Category } from "@/types/category";

const ALL = "הכל" as const;
export type CategoryFilter = Category | typeof ALL;

export function CategoryFilters({
  value,
  onChange,
}: {
  value: CategoryFilter;
  onChange: (next: CategoryFilter) => void;
}) {
  const categories: CategoryFilter[] = [ALL, ...CATEGORIES];

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((c) => {
        const active = c === value;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition ${
              active
                ? "bg-[#6BAF92] text-white"
                : "bg-white text-zinc-800 hover:bg-black/[0.02]"
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

