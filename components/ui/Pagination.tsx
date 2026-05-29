"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = [];
  const maxVisible = 5;
  const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center gap-2 justify-center py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg border border-slate-200 dark:border-[#2A2A2A] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-[#111111] transition-colors"
      >
        ← Prev
      </button>

      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#111111]">
            1
          </button>
          {start > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg transition-colors ${
            page === currentPage
              ? "bg-[#8B5DFF] text-white"
              : "border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#111111]"
          }`}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2">...</span>}
          <button onClick={() => onPageChange(totalPages)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#111111]">
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg border border-slate-200 dark:border-[#2A2A2A] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-[#111111] transition-colors"
      >
        Next →
      </button>
    </div>
  );
}

