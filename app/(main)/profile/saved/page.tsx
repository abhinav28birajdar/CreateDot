"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Bookmark,
  Heart,
  Eye,
  FolderPlus,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfileSavedPage() {
  const [activeTab, setActiveTab] = useState<"saved" | "liked" | "appreciations">("saved");

  const items = [
    {
      id: "p1",
      title: "FinTech Quantum Banking Dashboard",
      category: "UI/UX",
      author: "Elena Rostova",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      likes: 2430,
      views: 18400,
      savedAt: "Saved 2 days ago",
    },
    {
      id: "p2",
      title: "Aura Spatial 3D Vision OS",
      category: "Spatial UI",
      author: "Marcus Vance",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      likes: 3120,
      views: 22100,
      savedAt: "Saved 4 days ago",
    },
    {
      id: "p3",
      title: "HyperBrand Neo Design System",
      category: "Brand & Identity",
      author: "Sophia Tanaka",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
      likes: 1980,
      views: 14500,
      savedAt: "Saved 1 week ago",
    },
    {
      id: "p4",
      title: "Minimalist E-Commerce Commerce Engine",
      category: "Web Design",
      author: "Liam Thorne",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop",
      likes: 1540,
      views: 11200,
      savedAt: "Saved 2 weeks ago",
    },
  ];

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/profile" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Profile
            </Link>
            <span>/</span>
            <span>Saved & Liked</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Saved Items & Liked Work</h1>
          <p className="text-muted-foreground text-sm">Your private archive of bookmarked designs, appreciations, and inspiration.</p>
        </div>

        <div className="flex rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-1 text-xs font-semibold">
          {[
            { id: "saved", label: "Saved Items", icon: Bookmark },
            { id: "liked", label: "Liked Work", icon: Heart },
            { id: "appreciations", label: "Appreciations", icon: Sparkles },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === t.id
                    ? "bg-white dark:bg-[#1a1f33] text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-lg transition-all"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md">
                  <Bookmark className="h-4 w-4 fill-current text-[#FF6B6B]" />
                </Button>
              </div>
              <div className="absolute bottom-2.5 left-2.5">
                <Badge className="bg-black/60 backdrop-blur-md text-white text-[10px] border-none font-bold">
                  {item.category}
                </Badge>
              </div>
            </div>

            <div className="p-4">
              <Link href={`/project/${item.id}`} className="font-bold text-sm hover:underline line-clamp-1">
                {item.title}
              </Link>
              <p className="text-xs text-muted-foreground mt-0.5">by {item.author}</p>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5 dark:border-white/10 text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> {item.views}
                  </span>
                </div>
                <span className="text-[10px]">{item.savedAt}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
