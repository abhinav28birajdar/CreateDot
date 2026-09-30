"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Sparkles,
  Users,
  TrendingUp,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FollowingFeedPage() {
  const posts = [
    {
      id: "f-1",
      author: "Elena Rostova",
      role: "Head of Design @ FinCorp",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
      time: "1 hour ago",
      text: "Just released a deep-dive case study on spatial audio widgets for VisionOS. Feedback and remix ideas are very welcome!",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=600&fit=crop",
      likes: 420,
      comments: 38,
      shares: 14,
    },
    {
      id: "f-2",
      author: "Marcus Vance",
      role: "Creative Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
      time: "3 hours ago",
      text: "Exploring generative shader transitions with Three.js r165. The frame rate stability on mobile WebGL has improved remarkably.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=600&fit=crop",
      likes: 610,
      comments: 52,
      shares: 28,
    },
  ];

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/feed" className="hover:text-foreground">Feed</Link>
            <span>/</span>
            <span>Following</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Following Feed</h1>
          <p className="text-muted-foreground text-sm">Updates exclusively from designers, creators, and studios you follow.</p>
        </div>

        <div className="flex rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-1 text-xs font-semibold">
          <Link href="/feed" className="px-3.5 py-1.5 rounded-lg text-muted-foreground hover:text-foreground">
            Explore All
          </Link>
          <Link href="/feed/following" className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#1a1f33] text-foreground shadow-sm">
            Following
          </Link>
          <Link href="/feed/personalized" className="px-3.5 py-1.5 rounded-lg text-muted-foreground hover:text-foreground">
            For You
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 rounded-full overflow-hidden bg-muted">
                  <Image src={post.avatar} alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm hover:underline cursor-pointer">{post.author}</h3>
                  <p className="text-xs text-muted-foreground">{post.role} • {post.time}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="text-xs text-muted-foreground">
                Following
              </Button>
            </div>

            <p className="text-sm leading-relaxed">{post.text}</p>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
              <Image src={post.image} alt="" fill className="object-cover" />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/10 text-xs text-muted-foreground font-semibold">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                  <Heart className="h-4 w-4" /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 hover:text-[#FF6B6B] transition-colors">
                  <MessageCircle className="h-4 w-4" /> {post.comments}
                </button>
                <button className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors">
                  <Share2 className="h-4 w-4" /> {post.shares}
                </button>
              </div>
              <button className="hover:text-amber-500 transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
