"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Filter, SlidersHorizontal, Sparkles, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AdvancedSearchPage() {
  const [query, setQuery] = useState("");
  const [entityType, setEntityType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTool, setSelectedTool] = useState<string[]>([]);
  const [minRating, setMinRating] = useState("4.5");
  const [dateRange, setDateRange] = useState("all");
  const [licensing, setLicensing] = useState("all");

  const tools = ["Figma", "Three.js", "Blender", "Framer", "React / Next.js", "Principle", "After Effects", "Spline"];
  const categories = ["All Categories", "UI/UX Design", "Spatial Computing", "Design Systems", "Mobile Apps", "Brand Identity", "Motion Design"];

  const toggleTool = (tool: string) => {
    setSelectedTool(prev => prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]);
  };

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/search" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Simple Search
        </Link>
        <span>/</span>
        <span>Advanced Multi-Filter Search</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Advanced Search & Filtering</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Precision search across creators, case studies, pins, services, jobs, and design tokens.
      </p>

      {/* Main Search Panel */}
      <div className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-6">
        <div>
          <label className="text-xs font-semibold mb-1 block">Keywords or Expressions</label>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'dark mode' AND 'fintech' OR 'visionOS'..."
              className="pl-10 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Entity Type Picker */}
        <div>
          <label className="text-xs font-semibold mb-2 block">Search Across Entity</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Types" },
              { id: "projects", label: "Projects & Case Studies" },
              { id: "creators", label: "Creators & Freelancers" },
              { id: "services", label: "Services & Gigs" },
              { id: "jobs", label: "Job Postings" },
              { id: "pins", label: "Pins & Visuals" },
              { id: "boards", label: "Boards & Collections" },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setEntityType(type.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  entityType === type.id
                    ? "bg-[#FF6B6B] text-white shadow-sm"
                    : "bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground hover:text-foreground"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold mb-1 block">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-xs font-medium"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block">Date Added</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-xs font-medium"
            >
              <option value="all">Anytime</option>
              <option value="today">Past 24 Hours</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block">Licensing</label>
            <select
              value={licensing}
              onChange={(e) => setLicensing(e.target.value)}
              className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-xs font-medium"
            >
              <option value="all">Any License</option>
              <option value="creative-commons">Creative Commons (Remixable)</option>
              <option value="commercial">Commercial Allowed</option>
            </select>
          </div>
        </div>

        {/* Tools Multi-Select */}
        <div>
          <label className="text-xs font-semibold mb-2 block">Required Tools & Software</label>
          <div className="flex flex-wrap gap-2">
            {tools.map((t) => {
              const active = selectedTool.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTool(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                    active
                      ? "border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#FF6B6B] font-bold"
                      : "border-black/10 dark:border-white/10 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t} {active && "✓"}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="text-xs text-muted-foreground">
            <Link href="/search/saved">View Saved Searches & History</Link>
          </Button>

          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2">
            <Link href={`/search?q=${encodeURIComponent(query)}&type=${entityType}`}>
              <Search className="h-4 w-4" /> Apply Filters & Search
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
