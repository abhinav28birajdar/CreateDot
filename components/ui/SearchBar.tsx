"use client";

import React, { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function SearchBar({ placeholder = "Search...", onSearch, onFocus, onBlur }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#111111] focus-within:ring-2 focus-within:ring-[#8B5DFF]">
        <span className="text-slate-400">🔍</span>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-500"
        />
        {query && (
          <button onClick={handleClear} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

