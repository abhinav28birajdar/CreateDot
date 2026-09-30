"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Folder, Plus, ArrowLeft, Lock, Globe, Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyCollectionsPage() {
  const collections = [
    {
      id: "c-1",
      title: "FinTech & Banking Masterpieces",
      description: "Carefully selected design systems, dashboards, and high-frequency trading interfaces.",
      itemCount: 18,
      privacy: "public",
      cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    },
    {
      id: "c-2",
      title: "Spatial & 3D Web Experiences",
      description: "WebXR, Three.js shaders, and spatial canvas interactions.",
      itemCount: 12,
      privacy: "public",
      cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    },
    {
      id: "c-3",
      title: "Client Pitch Archive 2026",
      description: "Private references and design prototypes for enterprise client tenders.",
      itemCount: 8,
      privacy: "private",
      cover: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    },
  ];

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/collections" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> All Collections
            </Link>
            <span>/</span>
            <span>My Collections</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Collections</h1>
          <p className="text-muted-foreground text-sm">Organized anthologies of designs, assets, and case studies.</p>
        </div>

        <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2">
          <Link href="/collections/new">
            <Plus className="h-4 w-4" /> Create Collection
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-xl transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image src={col.cover} alt={col.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3">
                <Badge className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border-none capitalize">
                  {col.privacy}
                </Badge>
              </div>
            </div>

            <div className="p-5">
              <Link href={`/collections/${col.id}`} className="font-extrabold text-base hover:underline line-clamp-1 block mb-1">
                {col.title}
              </Link>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{col.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10 text-xs">
                <span className="text-muted-foreground font-semibold">{col.itemCount} items</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild className="rounded-xl text-xs gap-1">
                    <Link href={`/collections/${col.id}/edit`}>
                      <Edit className="h-3.5 w-3.5 text-[#FF6B6B]" /> Edit
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="rounded-xl text-xs">
                    <Link href={`/collections/${col.id}`}>View</Link>
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
