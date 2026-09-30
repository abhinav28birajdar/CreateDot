"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Eye, Heart, Bookmark, Share2, ExternalLink, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PinAnalyticsPage() {
  const params = useParams();
  const pinId = (params?.id as string) || "pin-1";

  const stats = [
    { label: "Total Impressions", value: "18,420", change: "+19.4%", icon: Eye, color: "text-blue-500 bg-blue-500/10" },
    { label: "Pin Saves", value: "1,240", change: "+28.1%", icon: Bookmark, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Likes / Hearts", value: "840", change: "+14.6%", icon: Heart, color: "text-rose-500 bg-rose-500/10" },
    { label: "Outbound Clicks", value: "492", change: "+34.2%", icon: ExternalLink, color: "text-purple-500 bg-purple-500/10" },
  ];

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/pins/my" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> My Pins
            </Link>
            <span>/</span>
            <span>Pin #{pinId}</span>
            <span>/</span>
            <span>Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Pin Performance & Analytics</h1>
          <p className="text-muted-foreground text-sm">Audience discovery, re-pins, saves, and link conversion.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/pins/${pinId}/edit`}>Edit Pin</Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/pins/${pinId}`}>View Public Pin</Link>
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
