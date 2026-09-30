"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, BarChart3, Eye, MoreVertical, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyGigsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "draft" | "paused">("all");

  const gigs = [
    {
      id: "g-1",
      title: "I will design an ultra-modern SaaS design system in Figma",
      orders: 24,
      revenue: "$14,800",
      rating: 5.0,
      reviews: 142,
      status: "active",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    },
    {
      id: "g-2",
      title: "I will build interactive WebGL spatial 3D canvas micro-interactions",
      orders: 12,
      revenue: "$9,400",
      rating: 4.9,
      reviews: 89,
      status: "active",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    },
    {
      id: "g-draft-1",
      title: "I will audit your mobile app UX for WCAG accessibility and conversion bottlenecks",
      orders: 0,
      revenue: "$0",
      rating: 0,
      reviews: 0,
      status: "draft",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    },
  ];

  const filtered = filter === "all" ? gigs : gigs.filter((g) => g.status === filter);

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/gigs" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Gigs
            </Link>
            <span>/</span>
            <span>Seller Workspace</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Service Offerings (Gigs)</h1>
          <p className="text-muted-foreground text-sm">Manage pricing packages, active client orders, and performance analytics.</p>
        </div>

        <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2">
          <Link href="/gigs/new">
            <Plus className="h-4 w-4" /> Create New Gig
          </Link>
        </Button>
      </div>

      <div className="flex rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-1 text-xs font-semibold mb-8 w-fit">
        {[
          { id: "all", label: "All Gigs" },
          { id: "active", label: "Active Services" },
          { id: "draft", label: "Drafts" },
          { id: "paused", label: "Paused" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id as any)}
            className={`px-3.5 py-1.5 rounded-lg capitalize transition-all ${
              filter === t.id
                ? "bg-white dark:bg-[#1a1f33] text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((gig) => (
          <div
            key={gig.id}
            className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-32 rounded-xl overflow-hidden bg-muted shrink-0">
                <Image src={gig.image} alt={gig.title} fill className="object-cover" />
              </div>
              <div>
                <Badge
                  variant="outline"
                  className={`text-[10px] font-bold capitalize mb-1 ${
                    gig.status === "active" ? "text-emerald-500 border-emerald-500/20" : "text-amber-500 border-amber-500/20"
                  }`}
                >
                  {gig.status}
                </Badge>
                <h3 className="font-extrabold text-base hover:underline">
                  <Link href={`/gigs/${gig.id}`}>{gig.title}</Link>
                </h3>
                {gig.status === "active" && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {gig.rating} ({gig.reviews} reviews) • {gig.orders} completed orders
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <div className="text-center">
                <p className="font-bold text-foreground text-sm">{gig.orders}</p>
                <p className="text-[10px]">Orders</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-foreground text-sm">{gig.revenue}</p>
                <p className="text-[10px]">Earned</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <Button variant="outline" size="sm" asChild className="rounded-xl text-xs gap-1">
                <Link href={`/gigs/${gig.id}/analytics`}>
                  <BarChart3 className="h-3.5 w-3.5 text-blue-500" /> Analytics
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="rounded-xl text-xs gap-1">
                <Link href={`/gigs/${gig.id}/edit`}>
                  <Edit className="h-3.5 w-3.5 text-[#FF6B6B]" /> Edit
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
