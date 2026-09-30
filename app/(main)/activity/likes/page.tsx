"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Sparkles, MessageCircle, UserPlus, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ActivityLikesPage() {
  const likes = [
    {
      id: "l-1",
      user: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      target: "QuantumPay AI Banking OS",
      time: "15 minutes ago",
    },
    {
      id: "l-2",
      user: "Sophia Tanaka",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      target: "Aura Spatial 3D Vision App",
      time: "2 hours ago",
    },
    {
      id: "l-3",
      user: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      target: "HyperSystem Multi-Brand Tokens",
      time: "5 hours ago",
    },
  ];

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/activity" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Activity Feed
        </Link>
        <span>/</span>
        <span>Appreciations & Likes</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Recent Likes & Reactions</h1>
      <p className="text-muted-foreground text-sm mb-8">Community members who appreciated your work.</p>

      <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm divide-y divide-black/5 dark:divide-white/10">
        {likes.map((like) => (
          <div key={like.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image src={like.avatar} alt={like.user} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm">
                  <strong className="font-bold">{like.user}</strong> liked your project{" "}
                  <span className="font-semibold text-[#FF6B6B]">{like.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{like.time}</p>
              </div>
            </div>
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
