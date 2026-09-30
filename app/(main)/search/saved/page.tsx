"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Bookmark, Search, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function SavedSearchesPage() {
  const [saved, setSaved] = useState([
    { id: "s-1", query: "spatial computing dark mode", category: "Spatial", savedAt: "Saved 2 days ago" },
    { id: "s-2", query: "fintech mobile dashboard tokens", category: "UI/UX", savedAt: "Saved 1 week ago" },
    { id: "s-3", query: "senior product designer visionOS", category: "Jobs", savedAt: "Saved 2 weeks ago" },
  ]);

  const [history, setHistory] = useState([
    { query: "threejs shaders webgl", time: "1 hour ago" },
    { query: "stripe checkout redesign 2026", time: "Yesterday" },
    { query: "design token json schema", time: "3 days ago" },
  ]);

  const removeSaved = (id: string) => {
    setSaved(saved.filter((s) => s.id !== id));
    toast.info("Saved search removed");
  };

  const clearHistory = () => {
    setHistory([]);
    toast.info("Search history cleared");
  };

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/search" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Search
        </Link>
        <span>/</span>
        <span>Saved & History</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Saved Searches & Query History</h1>
      <p className="text-muted-foreground text-sm mb-8">Access previous queries and receive alerts when new works match your criteria.</p>

      {/* Saved Searches */}
      <div className="mb-10">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Bookmark className="h-4 w-4 text-[#FF6B6B]" /> Saved Searches
        </h2>

        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm divide-y divide-black/5 dark:divide-white/10">
          {saved.map((item) => (
            <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
              <div>
                <Link href={`/search?q=${encodeURIComponent(item.query)}`} className="font-bold text-sm hover:underline text-[#FF6B6B]">
                  &ldquo;{item.query}&rdquo;
                </Link>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-[10px]">{item.category}</Badge>
                  <span>• {item.savedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className="h-8 rounded-xl text-xs gap-1">
                  <Link href={`/search?q=${encodeURIComponent(item.query)}`}>
                    Run Search <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removeSaved(item.id)} className="h-8 w-8 text-rose-500">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" /> Search History
          </h2>
          {history.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearHistory} className="text-xs text-muted-foreground">
              Clear All
            </Button>
          )}
        </div>

        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm divide-y divide-black/5 dark:divide-white/10">
          {history.map((h, i) => (
            <div key={i} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
              <Link href={`/search?q=${encodeURIComponent(h.query)}`} className="text-sm font-medium hover:underline flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-muted-foreground" /> {h.query}
              </Link>
              <span className="text-xs text-muted-foreground">{h.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
