"use client";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="חיפוש מוצרים…"
        className="w-full rounded-xl border border-black/10 bg-white px-10 py-3 text-sm font-normal leading-6 text-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.06)] outline-none placeholder:text-zinc-400 focus:border-[#6BAF92]/40 focus:ring-2 focus:ring-[#6BAF92]/20"
      />
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M16.5 16.5 21 21"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

