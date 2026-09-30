"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Plus, Share2, Eye, Heart, Bookmark, Trash2, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function CollectionDetailPage() {
  const params = useParams();
  const collectionId = (params?.id as string) || "c-1";

  const [items, setItems] = useState([
    {
      id: "p1",
      title: "QuantumPay AI Banking OS",
      author: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      views: "24.5K",
      likes: "3.2K",
    },
    {
      id: "p2",
      title: "CyberMotion 3D Spatial Canvas",
      author: "Marcus Vance",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      views: "19.1K",
      likes: "2.8K",
    },
    {
      id: "p3",
      title: "HyperSystem Multi-Brand Tokens",
      author: "Elena Rostova",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      views: "15.8K",
      likes: "1.9K",
    },
  ]);

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
    toast.info("Item removed from collection");
  };

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/collections" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Collections
            </Link>
            <span>/</span>
            <span>Anthology</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">FinTech & Banking Masterpieces</h1>
          <p className="text-muted-foreground text-sm">
            Curated collection of 18 high-fidelity financial apps, payment gateways, and banking OS projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl gap-1.5">
            <Link href={`/collections/${collectionId}/edit`}>
              <Edit className="h-4 w-4 text-[#FF6B6B]" /> Edit Collection
            </Link>
          </Button>
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-1.5">
            <Link href="/explore">
              <Plus className="h-4 w-4" /> Add Item
            </Link>
          </Button>
        </div>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-xl transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="p-5">
              <Link href={`/project/${item.id}`} className="font-extrabold text-base hover:underline line-clamp-1 block mb-1">
                {item.title}
              </Link>
              <p className="text-xs text-muted-foreground mb-4">by {item.author}</p>

              <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10 text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {item.views}</span>
                  <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-rose-500" /> {item.likes}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="h-7 w-7 text-rose-500 hover:text-rose-600">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
