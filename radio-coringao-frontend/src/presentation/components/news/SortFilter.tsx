"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { value: "recent", label: "Mais recentes" },
  { value: "oldest", label: "Mais antigas" },
  { value: "popular", label: "Mais lidas" },
  { value: "az", label: "A — Z" },
  { value: "za", label: "Z — A" },
];

export function SortFilter({ sort }: { sort: string }) {
  const [open, setOpen] = useState(false);
  const current = SORT_OPTIONS.find((o) => o.value === sort) || SORT_OPTIONS[0];

  function handleSelect(value: string) {
    setOpen(false);
    if (value !== sort) {
      window.location.href = "/news?sort=" + value;
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-2 text-xs font-bold text-on-surface transition-all hover:border-primary hover:bg-surface-container-low"
      >
        <span>{current.label}</span>
        <ChevronDown
          size={14}
          className={`text-on-surface-variant transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-lg">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`flex w-full items-center px-4 py-3 text-left text-xs font-medium transition-colors ${
                  opt.value === sort
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-on-surface hover:bg-surface-container-low"
                }`}
              >
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
