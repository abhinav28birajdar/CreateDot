"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layers, Palette, Code, Video, Sparkles, Briefcase, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ServiceCategoriesPage() {
  const [search, setSearch] = useState("");

  const categories = [
    {
      name: "UI/UX & Product Design",
      icon: Palette,
      subcategories: ["Mobile App UI", "Web & SaaS Apps", "Design Systems & Tokens", "Wireframing & Prototyping", "User Research & Audits"],
      gigCount: "1,420 Services",
      color: "from-blue-500/10 to-indigo-500/10 text-blue-500",
    },
    {
      name: "Spatial & 3D Web",
      icon: Layers,
      subcategories: ["Three.js & WebGL Canvas", "visionOS Concepts", "Spline Interactive 3D", "Blender Modeling & Shaders", "AR/VR Interfaces"],
      gigCount: "840 Services",
      color: "from-purple-500/10 to-pink-500/10 text-purple-500",
    },
    {
      name: "Brand & Visual Identity",
      icon: Sparkles,
      subcategories: ["Logo & Brand Guidelines", "Typography Standards", "Pitch Deck Design", "Iconography Sets", "Social Design Kits"],
      gigCount: "980 Services",
      color: "from-amber-500/10 to-rose-500/10 text-amber-500",
    },
    {
      name: "Creative Front-End Development",
      icon: Code,
      subcategories: ["Next.js & Tailwind Apps", "Framer Motion Animations", "Custom Webflow Experiences", "Shopify Hydrogen Themes", "Design-to-Code Implementation"],
      gigCount: "1,150 Services",
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-500",
    },
  ];

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/services" className="hover:text-foreground">Services</Link>
            <span>/</span>
            <span>Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Service Categories & Disciplines</h1>
          <p className="text-muted-foreground text-sm">Browse specialized freelance offerings across all creative verticals.</p>
        </div>

        <div className="w-full sm:w-64">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search disciplines..."
            className="rounded-xl text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.name}
              className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${cat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-xs font-semibold">
                    {cat.gigCount}
                  </Badge>
                </div>

                <h2 className="text-xl font-extrabold mb-3">{cat.name}</h2>

                <div className="space-y-2 mb-6">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub}
                      href={`/services?category=${encodeURIComponent(sub)}`}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.04] text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <span>{sub}</span>
                      <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                <Link href={`/services?category=${encodeURIComponent(cat.name)}`} className="text-xs font-bold text-[#FF6B6B] hover:underline flex items-center gap-1">
                  Browse All {cat.name} <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
