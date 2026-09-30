"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Pin,
  Plus,
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  Edit,
  BarChart3,
  ExternalLink,
  Sparkles,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyPinsPage() {
  const [tab, setTab] = useState<"created" | "drafts" | "saved">("created");

  const pins = [
    {
      id: "pin-1",
      title: "Minimalist Mobile Checkout Component",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=800&fit=crop",
      board: "UI Inspiration",
      likes: 840,
      saves: 320,
      status: "published",
    },
    {
      id: "pin-2",
      title: "Neumorphic Glassmorphic Weather App Widget",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop",
      board: "Widgets & Micro-UX",
      likes: 1250,
      saves: 540,
      status: "published",
    },
    {
      id: "pin-draft-1",
      title: "3D Isometric Dashboard Layout",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=800&fit=crop",
      board: "3D Visuals",
      likes: 0,
      saves: 0,
      status: "draft",
    },
  ];

  const filtered = tab === "drafts" ? pins.filter((p) => p.status === "draft") : pins.filter((p) => p.status === "published");

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/pins" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Pins Feed
            </Link>
            <span>/</span>
            <span>My Pins</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Pins Studio</h1>
          <p className="text-muted-foreground text-sm">Organize your uploaded visual pins, drafts, and curated inspirations.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl gap-1.5">
            <Link href="/visual-search">
              <Search className="h-4 w-4 text-purple-500" /> Visual Search
            </Link>
          </Button>
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-1.5">
            <Link href="/pins/new">
              <Plus className="h-4 w-4" /> Create Pin
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-1 text-xs font-semibold mb-8 w-fit">
        {[
          { id: "created", label: "Published Pins" },
          { id: "drafts", label: "Draft Pins" },
          { id: "saved", label: "Saved to Boards" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              tab === t.id
                ? "bg-white dark:bg-[#1a1f33] text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((pin) => (
          <motion.div
            key={pin.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-xl transition-all"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              <Image src={pin.image} alt={pin.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2.5 left-2.5">
                <Badge className="bg-black/60 backdrop-blur-md text-white text-[10px] border-none font-bold">
                  {pin.board}
                </Badge>
              </div>
            </div>

            <div className="p-4">
              <Link href={`/pins/${pin.id}`} className="font-bold text-sm hover:underline line-clamp-1 block mb-2">
                {pin.title}
              </Link>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5"><Heart className="h-3 w-3 text-rose-500" /> {pin.likes}</span>
                  <span className="flex items-center gap-0.5"><Bookmark className="h-3 w-3" /> {pin.saves}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" asChild className="h-7 w-7 rounded-lg">
                    <Link href={`/pins/${pin.id}/analytics`}>
                      <BarChart3 className="h-3.5 w-3.5 text-blue-500" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="h-7 w-7 rounded-lg">
                    <Link href={`/pins/${pin.id}/edit`}>
                      <Edit className="h-3.5 w-3.5 text-[#FF6B6B]" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
