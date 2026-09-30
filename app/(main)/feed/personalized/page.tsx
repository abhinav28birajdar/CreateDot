"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Heart, MessageCircle, Share2, Bookmark, ArrowRight, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PersonalizedFeedPage() {
  const recommendations = [
    {
      id: "rec-1",
      title: "Generative AI Node Graph for Spatial 3D",
      author: "Kai Takahashi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
      reason: "Because you liked Three.js and Spatial UI works",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&h=600&fit=crop",
      likes: 890,
      comments: 64,
    },
    {
      id: "rec-2",
      title: "HyperDesign Tokens for Enterprise FinTech",
      author: "Sophia Tanaka",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
      reason: "Popular among designers you follow",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&h=600&fit=crop",
      likes: 1320,
      comments: 92,
    },
  ];

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/feed" className="hover:text-foreground">Feed</Link>
            <span>/</span>
            <span>Personalized</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            For You <Wand2 className="h-6 w-6 text-[#FF6B6B]" />
          </h1>
          <p className="text-muted-foreground text-sm">Algorithmic suggestions tailored to your craft, saves, and interactions.</p>
        </div>

        <div className="flex rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-1 text-xs font-semibold">
          <Link href="/feed" className="px-3.5 py-1.5 rounded-lg text-muted-foreground hover:text-foreground">
            Explore All
          </Link>
          <Link href="/feed/following" className="px-3.5 py-1.5 rounded-lg text-muted-foreground hover:text-foreground">
            Following
          </Link>
          <Link href="/feed/personalized" className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#1a1f33] text-foreground shadow-sm">
            For You
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {recommendations.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src={item.avatar} alt={item.author} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{item.author}</h3>
                  <Badge variant="outline" className="text-[10px] text-[#FF6B6B] border-[#FF6B6B]/20 py-0 font-medium">
                    <Sparkles className="h-2.5 w-2.5 mr-1" /> {item.reason}
                  </Badge>
                </div>
              </div>
              <Button size="sm" variant="outline" className="rounded-xl text-xs font-semibold">
                Follow
              </Button>
            </div>

            <Link href={`/project/${item.id}`} className="font-extrabold text-lg hover:underline block">
              {item.title}
            </Link>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
              <Image src={item.image} alt="" fill className="object-cover" />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/10 text-xs text-muted-foreground font-semibold">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-1.5 hover:text-rose-500">
                  <Heart className="h-4 w-4" /> {item.likes}
                </button>
                <button className="flex items-center gap-1.5 hover:text-[#FF6B6B]">
                  <MessageCircle className="h-4 w-4" /> {item.comments}
                </button>
              </div>
              <button className="hover:text-amber-500">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
