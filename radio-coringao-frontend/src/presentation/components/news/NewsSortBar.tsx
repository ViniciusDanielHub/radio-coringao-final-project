"use client";

import { useEffect, useRef } from "react";

export function NewsSortBar({ currentSort }: { currentSort: string }) {
  const ref = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.value = currentSort;
  }, [currentSort]);

  return (
    <select
      ref={ref}
      name="sort"
      defaultValue={currentSort}
      onChange={(e) => {
        const url = new URL(window.location.href);
        url.searchParams.set("sort", e.target.value);
        url.searchParams.delete("page");
        window.location.href = url.toString();
      }}
      className="rounded-md border border-outline-variant bg-surface px-3 py-1.5 text-[12px] font-bold text-on-surface outline-none focus:border-primary"
    >
      <option value="recent">Mais recentes</option>
      <option value="oldest">Mais antigas</option>
      <option value="popular">Mais lidas</option>
      <option value="az">A — Z</option>
      <option value="za">Z — A</option>
    </select>
  );
}
