"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, Star, Sparkles, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ServiceComparePage() {
  const tiers = [
    {
      name: "Starter Prototype",
      price: "$450",
      delivery: "3 Days Delivery",
      revisions: "2 Revisions",
      features: [
        "Up to 5 Mobile Screens",
        "Figma Native Components",
        "Interactive Click-through Prototype",
        "Basic Color & Font Tokens",
        "Source File Included",
      ],
      notIncluded: ["Design System Documentation", "3D / Motion Assets", "Design-to-Code HTML/CSS"],
    },
    {
      name: "Full Product MVP",
      price: "$980",
      featured: true,
      delivery: "6 Days Delivery",
      revisions: "Unlimited Revisions",
      features: [
        "Up to 15 Screens (Web + Mobile)",
        "Atomic Auto-Layout 5.0 System",
        "Micro-Interactions & Transitions",
        "Design System Token Sync",
        "Developer Handover Guide",
        "Source File Included",
      ],
      notIncluded: ["Custom 3D Shaders"],
    },
    {
      name: "Enterprise Studio Suite",
      price: "$2,400",
      delivery: "12 Days Delivery",
      revisions: "Dedicated SLA & Revisions",
      features: [
        "Unlimited Screens & Flows",
        "Full Multi-Brand Design System",
        "Custom 3D Spline / Three.js Visuals",
        "Interactive Protopie / Framer Build",
        "Production Tailwind / React Codebase",
        "1-Month Post-Launch Support",
      ],
      notIncluded: [],
    },
  ];

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/services" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Services
        </Link>
        <span>/</span>
        <span>Service Comparison</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Compare Deliverable Tiers</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Review package inclusions, turnarounds, revision policies, and enterprise add-ons.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`p-6 rounded-3xl border ${
              tier.featured
                ? "border-[#FF6B6B] bg-white dark:bg-[#141824] shadow-xl relative"
                : "border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm"
            } flex flex-col justify-between`}
          >
            {tier.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-[#FF6B6B] text-white text-[10px] font-bold border-none shadow-sm">
                  Most Popular for Funded Startups
                </Badge>
              </div>
            )}

            <div>
              <h2 className="font-extrabold text-xl mb-1">{tier.name}</h2>
              <div className="my-4">
                <span className="text-3xl font-black">{tier.price}</span>
                <span className="text-xs text-muted-foreground ml-1">/ milestone</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 pb-4 border-b border-black/5 dark:border-white/10 font-semibold">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {tier.delivery}</span>
                <span>• {tier.revisions}</span>
              </div>

              <div className="space-y-2.5 mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">What&apos;s Included:</p>
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
                {tier.notIncluded.map((nf) => (
                  <div key={nf} className="flex items-start gap-2 text-xs text-muted-foreground/60 line-through">
                    <X className="h-4 w-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                    <span>{nf}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              asChild
              className={`w-full rounded-xl font-bold text-xs ${
                tier.featured
                  ? "bg-[#FF6B6B] hover:bg-[#FF5252] text-white shadow-sm"
                  : "bg-black/[0.05] dark:bg-white/[0.08] text-foreground hover:bg-black/10"
              }`}
            >
              <Link href={`/orders/checkout?tier=${encodeURIComponent(tier.name)}`}>
                Select {tier.name}
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
