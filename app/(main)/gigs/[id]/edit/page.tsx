"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, Eye, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function EditGigPage() {
  const params = useParams();
  const router = useRouter();
  const gigId = (params?.id as string) || "g-1";

  const [title, setTitle] = useState("I will design an ultra-modern SaaS design system in Figma");
  const [description, setDescription] = useState("High-end, production-oriented UI/UX design crafted with atomic component methodology, strict auto-layout, and WCAG accessibility standards.");
  const [basicPrice, setBasicPrice] = useState("350");
  const [standardPrice, setStandardPrice] = useState("680");
  const [premiumPrice, setPremiumPrice] = useState("1250");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Gig updated successfully! 🚀");
    }, 600);
  };

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/gigs/my" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> My Gigs
            </Link>
            <span>/</span>
            <span>Edit Gig</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Edit Gig & Pricing Packages</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/gigs/${gigId}/analytics`}>
              <BarChart3 className="h-4 w-4 mr-1.5 text-blue-500" /> Analytics
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/gigs/${gigId}`}>
              <Eye className="h-4 w-4 mr-1.5" /> Public View
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-1.5">
            <Save className="h-4 w-4" /> Save Gig
          </Button>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-6">
        <div>
          <label className="text-xs font-semibold mb-1 block">Gig Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-xl text-sm" />
        </div>

        <div>
          <label className="text-xs font-semibold mb-1 block">Description</label>
          <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-xl text-sm" />
        </div>

        <div>
          <label className="text-xs font-semibold mb-3 block">Pricing Tiers ($ USD)</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-black/5 dark:border-white/10">
              <p className="text-xs font-bold text-muted-foreground mb-1">Basic Tier</p>
              <Input value={basicPrice} onChange={(e) => setBasicPrice(e.target.value)} className="rounded-xl text-sm" />
            </div>
            <div className="p-4 rounded-xl border border-[#FF6B6B]/40 bg-[#FF6B6B]/5">
              <p className="text-xs font-bold text-[#FF6B6B] mb-1">Standard Tier</p>
              <Input value={standardPrice} onChange={(e) => setStandardPrice(e.target.value)} className="rounded-xl text-sm" />
            </div>
            <div className="p-4 rounded-xl border border-black/5 dark:border-white/10">
              <p className="text-xs font-bold text-muted-foreground mb-1">Premium Tier</p>
              <Input value={premiumPrice} onChange={(e) => setPremiumPrice(e.target.value)} className="rounded-xl text-sm" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
          <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600 text-xs">
            <Trash2 className="h-4 w-4 mr-1" /> Pause or Delete Gig
          </Button>
        </div>
      </div>
    </div>
  );
}
