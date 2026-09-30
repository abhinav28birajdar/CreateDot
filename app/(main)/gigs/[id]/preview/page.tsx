"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Star, ShieldCheck, Clock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function GigPreviewPage() {
  const params = useParams();
  const gigId = (params?.id as string) || "g-1";

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href={`/gigs/${gigId}/edit`} className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Gig Editor
            </Link>
            <span>/</span>
            <span>Client Preview</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Gig Client Preview</h1>
        </div>

        <Button asChild size="sm" className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl gap-1.5 font-bold">
          <Link href={`/gigs/${gigId}`}>
            Open Live View <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      <div className="rounded-3xl border border-black/10 dark:border-white/10 p-6 md:p-8 bg-white dark:bg-[#141824] shadow-sm">
        <Badge className="bg-[#FF6B6B] text-white text-xs mb-3">UI/UX & Product Design</Badge>
        <h2 className="text-2xl md:text-3xl font-black mb-4">
          I will design an ultra-modern SaaS design system in Figma
        </h2>

        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted mb-6">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop"
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-bold text-lg">About This Gig</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Atomic components with strict auto-layout 5.0, dark mode tokens, and WCAG accessibility compliance.
              Includes high-fidelity prototyping, micro-interactions, and design token exports.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">Standard Tier</span>
              <span className="text-2xl font-black text-[#FF6B6B]">$680</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 5 Days Delivery</p>
              <p className="flex items-center gap-1.5"><RotateCcw className="h-3.5 w-3.5" /> Unlimited Revisions</p>
            </div>
            <Button className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl font-bold text-xs">
              Continue ($680)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
