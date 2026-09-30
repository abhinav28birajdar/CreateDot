"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, UserPlus, Check, Sparkles, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SuggestedCreatorsPage() {
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  const creators = [
    {
      id: "u-1",
      name: "Marcus Vance",
      username: "marcusv",
      role: "Creative Director & 3D Artist",
      location: "Berlin, Germany",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop",
      followers: "42.8K",
      topWorks: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=200&fit=crop",
      ],
    },
    {
      id: "u-2",
      name: "Elena Rostova",
      username: "elenar",
      role: "Staff Product Designer @ Stripe",
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop",
      followers: "68.2K",
      topWorks: [
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=200&h=200&fit=crop",
      ],
    },
    {
      id: "u-3",
      name: "Sophia Tanaka",
      username: "sophiat",
      role: "Spatial UX & Design System Architect",
      location: "Tokyo, Japan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop",
      followers: "31.4K",
      topWorks: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop",
      ],
    },
  ];

  const toggleFollow = (id: string) => {
    setFollowed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/feed" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Feed
        </Link>
        <span>/</span>
        <span>Creators</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Suggested Creators to Follow</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Top innovators, art directors, and product designers shaping the future of digital craft.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creators.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden bg-muted shrink-0">
                  <Image src={c.avatar} alt={c.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">
                    <Link href={`/${c.username}`} className="hover:underline">{c.name}</Link>
                  </h3>
                  <p className="text-xs text-muted-foreground">@{c.username}</p>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {c.location}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mb-3">{c.role}</p>

              {/* Work preview thumbnails */}
              <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden mb-4">
                {c.topWorks.map((w, idx) => (
                  <div key={idx} className="relative aspect-square bg-muted">
                    <Image src={w} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-semibold">{c.followers} followers</span>
              <Button
                size="sm"
                onClick={() => toggleFollow(c.id)}
                className={`rounded-xl text-xs font-bold gap-1 ${
                  followed[c.id]
                    ? "bg-muted text-foreground hover:bg-muted/80"
                    : "bg-[#FF6B6B] hover:bg-[#FF5252] text-white"
                }`}
              >
                {followed[c.id] ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-3.5 w-3.5" /> Follow
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
