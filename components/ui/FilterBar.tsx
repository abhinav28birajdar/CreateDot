"use client";

import React, { useState } from "react";
import { Dropdown } from "./Dropdown";

export interface FilterOptions {
  category?: string;
  tools?: string[];
  sortBy?: "trending" | "recent" | "popular";
  timeRange?: "day" | "week" | "month" | "all";
}

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const CATEGORIES = ["UI Design", "Illustration", "Photography", "Web Dev", "Branding", "3D Art", "Animation"];
const TOOLS = ["Figma", "Blender", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "React", "Next.js"];
const SORT_OPTIONS = [
  { id: "trending", label: "Trending" },
  { id: "recent", label: "Recent" },
  { id: "popular", label: "Most Popular" },
];
const TIME_RANGES = [
  { id: "day", label: "Past 24 Hours" },
  { id: "week", label: "Past Week" },
  { id: "month", label: "Past Month" },
  { id: "all", label: "All Time" },
];

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    category: undefined,
    tools: [],
    sortBy: "trending",
    timeRange: "week",
  });

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, category: filters.category === category ? undefined : category };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleToolToggle = (tool: string) => {
    const tools = filters.tools || [];
    const newTools = tools.includes(tool) ? tools.filter((t) => t !== tool) : [...tools, tool];
    const newFilters = { ...filters, tools: newTools };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sort: string) => {
    const newFilters = { ...filters, sortBy: sort as "trending" | "recent" | "popular" };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTimeRangeChange = (range: string) => {
    const newFilters = { ...filters, timeRange: range as "day" | "week" | "month" | "all" };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const cleared: FilterOptions = { category: undefined, tools: [], sortBy: "trending", timeRange: "week" };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center p-4 bg-slate-50 dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
      <Dropdown
        trigger={<span className="px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer">Category ▼</span>}
        items={CATEGORIES.map((cat) => ({
          id: cat,
          label: cat,
          onClick: () => handleCategoryChange(cat),
        }))}
      />

      <Dropdown
        trigger={<span className="px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer">Tools ▼</span>}
        items={TOOLS.map((tool) => ({
          id: tool,
          label: `${(filters.tools || []).includes(tool) ? "✓" : ""} ${tool}`,
          onClick: () => handleToolToggle(tool),
        }))}
      />

      <Dropdown
        trigger={<span className="px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer">Sort: {filters.sortBy} ▼</span>}
        items={SORT_OPTIONS.map((opt) => ({
          id: opt.id,
          label: opt.label,
          onClick: () => handleSortChange(opt.id),
        }))}
      />

      <Dropdown
        trigger={<span className="px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 cursor-pointer">Time ▼</span>}
        items={TIME_RANGES.map((range) => ({
          id: range.id,
          label: range.label,
          onClick: () => handleTimeRangeChange(range.id),
        }))}
      />

      {(filters.category || (filters.tools && filters.tools.length > 0)) && (
        <button
          onClick={clearFilters}
          className="ml-auto px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
        >
          Clear All
        </button>
      )}
    </div>
  );
}

