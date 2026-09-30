"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Download,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectAnalyticsPage() {
  const params = useParams();
  const projectId = (params?.id as string) || "proj-1";

  const stats = [
    { label: "Total Views", value: "24,580", change: "+14.2%", icon: Eye, color: "text-blue-500 bg-blue-500/10" },
    { label: "Appreciations / Likes", value: "3,210", change: "+8.9%", icon: Heart, color: "text-rose-500 bg-rose-500/10" },
    { label: "Comments", value: "142", change: "+24.0%", icon: MessageCircle, color: "text-purple-500 bg-purple-500/10" },
    { label: "Shares & Reposts", value: "420", change: "+12.5%", icon: Share2, color: "text-amber-500 bg-amber-500/10" },
    { label: "Saves & Collections", value: "850", change: "+31.2%", icon: Bookmark, color: "text-emerald-500 bg-emerald-500/10" },
  ];

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/projects/my" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> My Projects
            </Link>
            <span>/</span>
            <span>Project #{projectId}</span>
            <span>/</span>
            <span>Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Project Analytics & Impact</h1>
          <p className="text-muted-foreground text-sm">
            Detailed views, appreciations, saves, and conversion analytics for this project.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/projects/${projectId}/edit`}>Edit Project</Link>
          </Button>
          <Button variant="outline" className="rounded-xl gap-1.5">
            <Download className="h-4 w-4" /> Export Data
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="p-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm">
              <div className={`p-2 rounded-xl w-fit ${s.color} mb-3`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-xl font-black mt-0.5">{s.value}</p>
              <p className="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> {s.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Engagement Visualization */}
      <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Daily Views & Saves Velocity</h2>
          <Badge variant="outline" className="text-xs font-semibold">
            Last 30 Days
          </Badge>
        </div>

        <div className="h-48 flex items-end gap-2 pt-6 border-b border-black/5 dark:border-white/10">
          {[30, 45, 60, 50, 70, 85, 90, 75, 80, 95, 100, 92, 88, 70].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
              <div
                style={{ height: `${val}%` }}
                className="w-full bg-[#FF6B6B] rounded-t-md opacity-80 group-hover:opacity-100 transition-all cursor-pointer relative"
              />
              <span className="text-[9px] text-muted-foreground mt-1">D{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
