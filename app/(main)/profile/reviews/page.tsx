"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  Award,
  Sparkles,
  ArrowLeft,
  Plus,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfileReviewsPage() {
  const [filter, setFilter] = useState<"all" | "reviews" | "recommendations" | "testimonials">("all");

  const testimonials = [
    {
      id: "t1",
      type: "review",
      author: "Alex Morgan",
      role: "VP of Product at Stripe",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
      rating: 5,
      date: "2 weeks ago",
      project: "Stripe Billing 2.0 UI Revamp",
      content:
        "One of the most talented product designers I have ever collaborated with. Outstanding visual hierarchy, proactive system thinking, and lightning-fast execution.",
      verified: true,
    },
    {
      id: "t2",
      type: "recommendation",
      author: "David Kim",
      role: "Founder & CEO, NeuralScale",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
      rating: 5,
      date: "1 month ago",
      project: "Autonomous AI Studio Branding",
      content:
        "Transformed our high-tech enterprise vision into a friendly, world-class design language. Increased our seed round conversion by over 300%.",
      verified: true,
    },
    {
      id: "t3",
      type: "testimonials",
      author: "Elena Rostova",
      role: "Head of Design, FinCorp Global",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
      rating: 5,
      date: "2 months ago",
      project: "Mobile Crypto & Forex App",
      content:
        "Deep understanding of modern mobile design gestures, micro-animations, and tokenized design systems. Highly recommend for any high-stakes project!",
      verified: true,
    },
  ];

  const filtered = filter === "all" ? testimonials : testimonials.filter((t) => t.type === filter);

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/profile" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Profile
            </Link>
            <span>/</span>
            <span>Reputation</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Reviews & Recommendations</h1>
          <p className="text-muted-foreground text-sm">Client ratings, peer endorsements, and project testimonials.</p>
        </div>

        <Button className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white gap-2 rounded-xl">
          <Plus className="h-4 w-4" /> Request Recommendation
        </Button>
      </div>

      {/* Aggregate Score Bar */}
      <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="text-center md:border-r border-black/5 dark:border-white/10 md:pr-6">
            <p className="text-4xl font-black text-[#FF6B6B]">4.98</p>
            <div className="flex items-center justify-center gap-1 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">38 verified reviews</p>
          </div>

          <div className="space-y-1.5 flex-1 min-w-[200px]">
            <div className="flex items-center justify-between text-xs font-medium">
              <span>Quality of Work</span>
              <span className="font-bold">5.0 / 5.0</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium">
              <span>Communication</span>
              <span className="font-bold">4.9 / 5.0</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium">
              <span>Deadline Adherence</span>
              <span className="font-bold">5.0 / 5.0</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-1 text-xs font-semibold self-start md:self-center">
          {(["all", "reviews", "recommendations", "testimonials"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                filter === tab
                  ? "bg-white dark:bg-[#1a1f33] text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image src={item.avatar} alt={item.author} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm">{item.author}</h3>
                    {item.verified && (
                      <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/20 py-0 h-4">
                        <CheckCircle2 className="h-2.5 w-2.5 mr-1" /> Verified Client
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic mb-4">
              &ldquo;{item.content}&rdquo;
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10 text-xs text-muted-foreground">
              <span>Project: <strong className="text-foreground">{item.project}</strong></span>
              <span>{item.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
