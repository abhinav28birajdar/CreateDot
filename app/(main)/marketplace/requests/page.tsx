"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Clock, DollarSign, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BuyerRequestsPage() {
  const requests = [
    {
      id: "req-1",
      buyer: "QuantEdge Labs",
      title: "Need senior product designer to revamp high-frequency crypto trading app",
      budget: "$3,500 - $6,000",
      duration: "3 Weeks",
      offers: 8,
      posted: "3 hours ago",
      skills: ["Fintech", "Mobile UX", "Dark Mode", "Figma"],
    },
    {
      id: "req-2",
      buyer: "Aura Spatial",
      title: "Interactive WebGL Spatial UI component for landing page header",
      budget: "$1,800",
      duration: "10 Days",
      offers: 12,
      posted: "6 hours ago",
      skills: ["Three.js", "WebGL", "Shader Art"],
    },
    {
      id: "req-3",
      buyer: "DesignDot Enterprise",
      title: "Enterprise Multi-Brand Figma Design System with strict tokens schema",
      budget: "$4,200",
      duration: "1 Month",
      offers: 5,
      posted: "1 day ago",
      skills: ["Design Systems", "Tokens Studio", "Style Dictionary"],
    },
  ];

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/marketplace" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Marketplace
            </Link>
            <span>/</span>
            <span>Buyer Requests</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Open Buyer Requests</h1>
          <p className="text-muted-foreground text-sm">Submit custom offers to clients looking for immediate talent.</p>
        </div>

        <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2">
          <Link href="/services/quote">
            <Plus className="h-4 w-4" /> Post a Request
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {requests.map((r) => (
          <div key={r.id} className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#FF6B6B]">{r.buyer}</span>
                <span className="text-xs text-muted-foreground">• Posted {r.posted}</span>
              </div>
              <h3 className="font-extrabold text-base leading-tight">{r.title}</h3>
              <div className="flex flex-wrap gap-1 pt-1">
                {r.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-black/5 dark:border-white/10">
              <div className="text-left md:text-right">
                <p className="text-lg font-black text-foreground">{r.budget}</p>
                <p className="text-xs text-muted-foreground">{r.duration} • {r.offers} offers</p>
              </div>
              <Button asChild size="sm" className="bg-[#14161F] dark:bg-white dark:text-[#14161F] text-white rounded-xl text-xs font-bold">
                <Link href={`/messages?customOffer=${r.id}`}>Send Custom Offer</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
