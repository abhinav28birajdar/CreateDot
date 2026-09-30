"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles, Star, ArrowRight, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SuggestedProjectsAndServicesPage() {
  const [tab, setTab] = useState<"projects" | "services">("projects");

  const projects = [
    {
      id: "s-1",
      title: "QuantumPay AI Banking OS",
      author: "Sarah Chen",
      cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      views: "24.5K",
      likes: "3.2K",
      category: "Fintech",
    },
    {
      id: "s-2",
      title: "Aura Spatial 3D OS Canvas",
      author: "Marcus Vance",
      cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      views: "19.1K",
      likes: "2.8K",
      category: "Spatial",
    },
  ];

  const services = [
    {
      id: "g-1",
      title: "I will design an autonomous AI banking application and design tokens",
      seller: "Sarah Chen",
      rating: 5.0,
      reviews: 142,
      price: "$1,200",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    },
    {
      id: "g-2",
      title: "I will build interactive WebGL spatial 3D canvas micro-interactions",
      seller: "Marcus Vance",
      rating: 4.9,
      reviews: 89,
      price: "$1,850",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop",
    },
  ];

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/explore" className="hover:text-foreground">Explore</Link>
            <span>/</span>
            <span>Suggested</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Suggested for You</h1>
          <p className="text-muted-foreground text-sm">Hand-picked case studies and high-demand design services.</p>
        </div>

        <div className="flex rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-1 text-xs font-semibold">
          <button
            onClick={() => setTab("projects")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              tab === "projects" ? "bg-white dark:bg-[#1a1f33] text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Suggested Projects
          </button>
          <button
            onClick={() => setTab("services")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              tab === "services" ? "bg-white dark:bg-[#1a1f33] text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Suggested Services
          </button>
        </div>
      </div>

      {tab === "projects" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm">
              <div className="relative aspect-[16/10] bg-muted">
                <Image src={p.cover} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <Badge variant="outline" className="text-[10px] mb-2">{p.category}</Badge>
                <h3 className="font-extrabold text-base hover:underline mb-1">
                  <Link href={`/project/${p.id}`}>{p.title}</Link>
                </h3>
                <p className="text-xs text-muted-foreground mb-4">by {p.author}</p>
                <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10 text-xs">
                  <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {p.views}</span>
                  <Button variant="ghost" size="sm" asChild className="text-xs font-bold text-[#FF6B6B]">
                    <Link href={`/project/${p.id}`}>View Case Study</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.id} className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm">
              <div className="relative aspect-[16/10] bg-muted">
                <Image src={s.image} alt={s.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-2">
                  <Star className="h-3.5 w-3.5 fill-current" /> {s.rating} ({s.reviews} reviews)
                </div>
                <h3 className="font-extrabold text-base hover:underline mb-1">
                  <Link href={`/gigs/${s.id}`}>{s.title}</Link>
                </h3>
                <p className="text-xs text-muted-foreground mb-4">by {s.seller}</p>
                <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10 text-xs font-bold">
                  <span>Starting at <strong className="text-base text-foreground">{s.price}</strong></span>
                  <Button asChild size="sm" className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl">
                    <Link href={`/gigs/${s.id}`}>Hire Service</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
