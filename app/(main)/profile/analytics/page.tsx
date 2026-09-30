"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  Users,
  Share2,
  Calendar,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Globe,
  Download,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfileAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  const metrics = [
    { label: "Profile Views", value: "48,250", change: "+24.8%", up: true, icon: Eye, color: "text-blue-500 bg-blue-500/10" },
    { label: "Total Appreciations", value: "12,840", change: "+18.2%", up: true, icon: Heart, color: "text-rose-500 bg-rose-500/10" },
    { label: "New Followers", value: "+1,420", change: "+32.1%", up: true, icon: Users, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Project Shares", value: "3,190", change: "-4.5%", up: false, icon: Share2, color: "text-amber-500 bg-amber-500/10" },
  ];

  const topProjects = [
    { id: "1", title: "QuantumPay AI Banking OS", views: "18.4K", likes: "2.3K", shares: "420", conversion: "4.8%" },
    { id: "2", title: "CyberMotion 3D Design System", views: "14.2K", likes: "1.9K", shares: "380", conversion: "5.2%" },
    { id: "3", title: "Aura Spatial Vision App", views: "9.8K", likes: "1.4K", shares: "210", conversion: "3.9%" },
    { id: "4", title: "NeuroForm Generative UI", views: "5.8K", likes: "890", shares: "150", conversion: "6.1%" },
  ];

  const trafficSources = [
    { source: "Direct & Profile Link", percent: 42, count: "20,265" },
    { source: "Explore & Feed Discovery", percent: 28, count: "13,510" },
    { source: "External (Twitter, LinkedIn)", percent: 18, count: "8,685" },
    { source: "Search Engine & Direct URL", percent: 12, count: "5,790" },
  ];

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/profile" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Profile
            </Link>
            <span>/</span>
            <span>Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Profile Analytics</h1>
          <p className="text-muted-foreground text-sm">Real-time performance metrics, audience reach, and engagement.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-1 text-xs font-semibold">
            {["7d", "30d", "90d", "1y"].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeRange === r
                    ? "bg-white dark:bg-[#1a1f33] text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2 rounded-xl">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${m.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center text-xs font-bold gap-1 ${m.up ? "text-emerald-500" : "text-rose-500"}`}>
                  {m.up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {m.change}
                </div>
              </div>
              <p className="text-xs font-medium text-muted-foreground">{m.label}</p>
              <p className="text-2xl font-black mt-1 tracking-tight">{m.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Analytics Chart Visualization Box */}
      <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold">Impressions & Interaction Trends</h2>
            <p className="text-xs text-muted-foreground">Aggregated across all published projects and showcase pins</p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3 text-amber-500" /> AI Growth Projection: +34%
          </Badge>
        </div>

        {/* Visual Bar chart mock */}
        <div className="h-52 flex items-end gap-2 pt-8 pb-2 border-b border-black/5 dark:border-white/10">
          {[45, 62, 58, 75, 80, 65, 92, 88, 95, 78, 85, 100].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <div
                style={{ height: `${h}%` }}
                className="w-full rounded-t-lg bg-gradient-to-t from-[#FF6B6B] to-[#FFA07A] opacity-80 group-hover:opacity-100 transition-all cursor-pointer relative"
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold py-1 px-2 rounded pointer-events-none whitespace-nowrap transition-opacity">
                  {h * 480} views
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground">W{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Projects */}
        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm">
          <h2 className="text-lg font-bold mb-4">Top Performing Projects</h2>
          <div className="divide-y divide-black/5 dark:divide-white/10">
            {topProjects.map((p) => (
              <div key={p.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <Link href={`/project/${p.id}`} className="font-semibold text-sm hover:underline truncate block">
                    {p.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{p.views} views • {p.likes} likes • {p.shares} shares</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="font-bold text-xs text-emerald-500 border-emerald-500/30">
                    {p.conversion} CTR
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm">
          <h2 className="text-lg font-bold mb-4">Traffic & Referral Sources</h2>
          <div className="space-y-4">
            {trafficSources.map((t) => (
              <div key={t.source}>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span>{t.source}</span>
                  <span className="text-muted-foreground">{t.count} ({t.percent}%)</span>
                </div>
                <div className="h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                  <div
                    style={{ width: `${t.percent}%` }}
                    className="h-full rounded-full bg-[#FF6B6B]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
