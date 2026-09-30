"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle, Reply, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ActivityCommentsPage() {
  const comments = [
    {
      id: "c-1",
      user: "Liam Thorne",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      text: "The micro-animations between the modal states are buttery smooth! How did you optimize frame drops on WebGL?",
      project: "CyberMotion 3D Spatial Canvas",
      time: "42 minutes ago",
    },
    {
      id: "c-2",
      user: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      text: "Stunning color palette and token structure. Would love to feature this in our upcoming design systems roundtable.",
      project: "QuantumPay AI Banking OS",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/activity" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Activity Feed
        </Link>
        <span>/</span>
        <span>Comments & Discussion</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Comments & Peer Feedback</h1>
      <p className="text-muted-foreground text-sm mb-8">Discussions on your case studies, pins, and portfolio works.</p>

      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src={c.avatar} alt={c.user} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{c.user}</h3>
                  <p className="text-xs text-muted-foreground">on <strong className="text-foreground">{c.project}</strong> • {c.time}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="text-xs text-[#FF6B6B] gap-1">
                <Reply className="h-3.5 w-3.5" /> Reply
              </Button>
            </div>
            <p className="text-sm leading-relaxed pl-13 text-slate-800 dark:text-slate-200">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
