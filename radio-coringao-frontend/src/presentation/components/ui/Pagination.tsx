"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface transition-colors hover:bg-surface-container disabled:opacity-30 disabled:hover:bg-surface"
      >
        <ChevronLeft size={16} className="text-on-surface" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-9 w-9 items-center justify-center rounded-full font-label-sm text-label-sm font-bold transition-colors ${
            currentPage === page
              ? "bg-primary text-on-primary"
              : "border border-outline-variant bg-surface text-on-surface hover:bg-surface-container"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface transition-colors hover:bg-surface-container disabled:opacity-30 disabled:hover:bg-surface"
      >
        <ChevronRight size={16} className="text-on-surface" />
      </button>
    </div>
  );
}
