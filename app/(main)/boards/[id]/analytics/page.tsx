"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Eye, Bookmark, Users, Heart, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BoardAnalyticsPage() {
  const params = useParams();
  const boardId = (params?.id as string) || "board-1";

  const stats = [
    { label: "Board Views", value: "32,450", change: "+22.4%", icon: Eye, color: "text-blue-500 bg-blue-500/10" },
    { label: "Board Followers", value: "4,180", change: "+35.2%", icon: Users, color: "text-purple-500 bg-purple-500/10" },
    { label: "Total Re-pins & Saves", value: "6,920", change: "+18.0%", icon: Bookmark, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Total Appreciations", value: "2,840", change: "+11.7%", icon: Heart, color: "text-rose-500 bg-rose-500/10" },
  ];

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/boards/my" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> My Boards
            </Link>
            <span>/</span>
            <span>Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Board Engagement Analytics</h1>
          <p className="text-muted-foreground text-sm">Follower growth, weekly impressions, and repin analytics.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/boards/${boardId}/edit`}>Edit Board</Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/boards/${boardId}`}>View Board</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm">
              <div className={`p-2.5 rounded-xl w-fit ${s.color} mb-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-black mt-1 tracking-tight">{s.value}</p>
              <p className="text-xs font-bold text-emerald-500 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> {s.change}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
