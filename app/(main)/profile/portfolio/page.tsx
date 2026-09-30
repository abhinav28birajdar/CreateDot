"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Folder,
  Sparkles,
  ArrowLeft,
  ExternalLink,
  Eye,
  Heart,
  Share2,
  Filter,
  CheckCircle2,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfilePortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "UI/UX Design", "Spatial & 3D", "Design Systems", "Mobile Apps", "Brand Identity"];

  const projects = [
    {
      id: "1",
      title: "QuantumPay AI Banking OS",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      views: "18.4K",
      likes: "2.3K",
      tools: ["Figma", "Next.js", "TailwindCSS"],
      client: "Quantum Financial Group",
      featured: true,
    },
    {
      id: "2",
      title: "CyberMotion 3D Spatial Canvas",
      category: "Spatial & 3D",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      views: "14.2K",
      likes: "1.9K",
      tools: ["Three.js", "Blender", "Framer"],
      client: "Aura Spatial Labs",
      featured: true,
    },
    {
      id: "3",
      title: "HyperSystem Enterprise Tokens",
      category: "Design Systems",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      views: "11.6K",
      likes: "1.5K",
      tools: ["Storybook", "TypeScript", "Figma"],
      client: "CloudCore Inc",
      featured: false,
    },
    {
      id: "4",
      title: "Pulse Health AI Patient Portal",
      category: "Mobile Apps",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
      views: "9.8K",
      likes: "1.2K",
      tools: ["React Native", "Figma"],
      client: "Pulse Health",
      featured: false,
    },
  ];

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/profile" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Profile
            </Link>
            <span>/</span>
            <span>Portfolio</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Portfolio & Featured Works</h1>
          <p className="text-muted-foreground text-sm">Curated case studies, design deliverables, and production work.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl gap-2">
            <Link href="/projects/new">
              <Sparkles className="h-4 w-4 text-[#FF6B6B]" /> Add New Project
            </Link>
          </Button>
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl gap-2">
            <Link href="/hire">
              Hire Me
            </Link>
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === c
                ? "bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] shadow-sm"
                : "bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="group rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-xl transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {item.featured && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-[#FF6B6B] text-white text-[10px] font-bold border-none">
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="outline" className="text-[11px] font-semibold">
                  {item.category}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">Client: {item.client}</span>
              </div>

              <Link href={`/project/${item.id}`} className="font-extrabold text-xl hover:underline line-clamp-1 block mb-3">
                {item.title}
              </Link>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {item.tools.map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.06] font-medium text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/10">
                <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> {item.views}</span>
                  <span className="flex items-center gap-1.5"><Heart className="h-4 w-4 text-rose-500" /> {item.likes}</span>
                </div>
                <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs font-bold text-[#FF6B6B]">
                  <Link href={`/project/${item.id}`}>
                    View Case Study <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
