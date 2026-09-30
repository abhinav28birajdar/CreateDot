"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Upload,
  Camera,
  Sparkles,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Heart,
  Bookmark,
  Palette,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VisualSearchPage() {
  const [selectedImage, setSelectedImage] = useState<string>(
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  );
  const [isSearching, setIsSearching] = useState(false);

  const matchedPins = [
    {
      id: "pin-match-1",
      title: "FinTech Neo Minimalist Cards",
      author: "Alex Morgan",
      similarity: "98% Visual Match",
      colors: ["#14161F", "#FF6B6B", "#4E54C8"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=800&fit=crop",
      likes: 1840,
    },
    {
      id: "pin-match-2",
      title: "Dark Mode Spatial Telemetry Dashboard",
      author: "Elena Rostova",
      similarity: "94% Visual Match",
      colors: ["#0F172A", "#38BDF8", "#818CF8"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop",
      likes: 2190,
    },
    {
      id: "pin-match-3",
      title: "Glassmorphism Analytics Widget",
      author: "Marcus Vance",
      similarity: "89% Visual Match",
      colors: ["#1E1B4B", "#A855F7", "#EC4899"],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=800&fit=crop",
      likes: 950,
    },
    {
      id: "pin-match-4",
      title: "Gradient Mesh Micro-Interactions",
      author: "Sophia Tanaka",
      similarity: "86% Visual Match",
      colors: ["#18181B", "#F43F5E", "#FB923C"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=800&fit=crop",
      likes: 1420,
    },
  ];

  return (
    <div className="container max-w-7xl py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/pins" className="hover:text-foreground">
              Pins
            </Link>
            <span>/</span>
            <span>AI Computer Vision</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">AI Visual Search Engine</h1>
          <p className="text-muted-foreground text-sm">
            Find visually similar UI patterns, color schemes, typography, and layout architectures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href="/search">Text Search</Link>
          </Button>
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2">
            <Link href="/pins/new">
              Upload New Pin
            </Link>
          </Button>
        </div>
      </div>

      {/* Visual Input / Dropzone */}
      <div className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-black/10 dark:border-white/10 group">
            <img src={selectedImage} alt="Search Reference" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button size="sm" variant="secondary" className="rounded-xl text-xs gap-1">
                <Upload className="h-3.5 w-3.5" /> Upload Another Image
              </Button>
            </div>
            <div className="absolute bottom-2.5 left-2.5">
              <Badge className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border-none">
                Active Visual Query
              </Badge>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-[#FF6B6B]" />
                <h3 className="font-bold text-lg">Computer Vision Analysis</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Detected semantic elements: Dark theme, glassmorphic card overlays, neon accent badges, financial metrics, and high-contrast typography.
              </p>
            </div>

            {/* Extracted Colors */}
            <div>
              <p className="text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-purple-500" /> Extracted Dominant Palette
              </p>
              <div className="flex items-center gap-2">
                {["#0B0E17", "#1E293B", "#FF6B6B", "#38BDF8", "#E2E8F0"].map((hex) => (
                  <div key={hex} className="flex items-center gap-1.5 p-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.06]">
                    <div style={{ backgroundColor: hex }} className="h-5 w-5 rounded-md border border-white/20" />
                    <span className="text-[10px] font-mono text-muted-foreground pr-1">{hex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Matches Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">Visually Similar Pins & Designs ({matchedPins.length})</h2>
          <Badge variant="outline" className="text-xs text-emerald-500 border-emerald-500/20 font-bold">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Vector Similarity Index Live
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {matchedPins.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="group rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2.5 left-2.5">
                  <Badge className="bg-emerald-500 text-white text-[10px] font-bold border-none shadow-sm">
                    {item.similarity}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <Link href={`/pins/${item.id}`} className="font-bold text-sm hover:underline line-clamp-1 block mb-1">
                  {item.title}
                </Link>
                <p className="text-xs text-muted-foreground mb-3">by {item.author}</p>

                <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/10 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    {item.colors.map((c, i) => (
                      <div key={i} style={{ backgroundColor: c }} className="h-3 w-3 rounded-full border border-white/20" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 font-semibold">
                    <Heart className="h-3.5 w-3.5 text-rose-500" /> {item.likes}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
