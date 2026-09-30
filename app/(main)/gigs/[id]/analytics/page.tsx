"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Eye, MousePointerClick, ShoppingBag, DollarSign, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GigAnalyticsPage() {
  const params = useParams();
  const gigId = (params?.id as string) || "g-1";

  const stats = [
    { label: "Search Impressions", value: "48,290", change: "+16.2%", icon: Eye, color: "text-blue-500 bg-blue-500/10" },
    { label: "Clicks & Page Views", value: "3,840", change: "+24.8%", icon: MousePointerClick, color: "text-purple-500 bg-purple-500/10" },
    { label: "Orders Placed", value: "24", change: "+8.3%", icon: ShoppingBag, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Total Revenue", value: "$14,800", change: "+32.1%", icon: DollarSign, color: "text-amber-500 bg-amber-500/10" },
  ];

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/gigs/my" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> My Gigs
            </Link>
            <span>/</span>
            <span>Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Gig Performance & Funnel</h1>
          <p className="text-muted-foreground text-sm">Conversion rates, marketplace search ranking, and order revenue.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/gigs/${gigId}/edit`}>Edit Pricing</Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/gigs/${gigId}`}>View Gig</Link>
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
