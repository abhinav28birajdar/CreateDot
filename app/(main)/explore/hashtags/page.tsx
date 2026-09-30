"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Hash, TrendingUp, Sparkles, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ExploreHashtagsPage() {
  const [search, setSearch] = useState("");

  const tags = [
    { tag: "ui-design", count: "128.4K posts", change: "+14%", category: "Craft" },
    { tag: "fintech", count: "84.2K posts", change: "+28%", category: "Industry" },
    { tag: "spatial-computing", count: "62.1K posts", change: "+45%", category: "Emerging Tech" },
    { tag: "threejs", count: "51.8K posts", change: "+32%", category: "Development" },
    { tag: "design-systems", count: "94.6K posts", change: "+18%", category: "Architecture" },
    { tag: "generative-ai", count: "112.5K posts", change: "+64%", category: "AI & Innovation" },
    { tag: "mobile-ux", count: "78.9K posts", change: "+12%", category: "Platforms" },
    { tag: "glassmorphism", count: "44.3K posts", change: "+9%", category: "Aesthetics" },
  ];

  const filtered = tags.filter((t) => t.tag.includes(search.toLowerCase()));

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/explore" className="hover:text-foreground">Explore</Link>
            <span>/</span>
            <span>Tags & Topics</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Trending Hashtags & Topics</h1>
          <p className="text-muted-foreground text-sm">Discover what creators worldwide are tagging and discussing.</p>
        </div>

        <div className="w-full sm:w-64">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hashtags..."
            className="rounded-xl text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((t) => (
          <Link
            key={t.tag}
            href={`/search?q=${t.tag}`}
            className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-lg hover:border-[#FF6B6B]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <Badge variant="outline" className="text-[10px] text-muted-foreground mb-2">
                {t.category}
              </Badge>
              <h3 className="font-extrabold text-base flex items-center gap-1 text-[#FF6B6B]">
                <Hash className="h-4 w-4" /> {t.tag}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{t.count}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs text-emerald-500 font-bold">
              <span>Velocity</span>
              <span className="flex items-center gap-0.5"><TrendingUp className="h-3 w-3" /> {t.change}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
