"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Send, Upload, Calendar, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function RequestQuotePage() {
  const router = useRouter();
  const [projectTitle, setProjectTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [budget, setBudget] = useState("$2,500 - $5,000");
  const [deadline, setDeadline] = useState("Within 2-3 Weeks");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Quote request sent directly to top-tier verified creators! 🎯");
      router.push("/client/dashboard");
    }, 800);
  };

  return (
    <div className="container max-w-2xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/services" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Services
        </Link>
        <span>/</span>
        <span>Custom Quote</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Request a Custom Quote</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Describe your project requirements to receive tailored milestone offers from verified designers.
      </p>

      <form onSubmit={handleSubmit} className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-6">
        <div>
          <label className="text-xs font-semibold mb-1 block">Project Name *</label>
          <Input
            required
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="e.g. NextGen Web3 Mobile App & Design System"
            className="rounded-xl text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold mb-1 block">Scope & Deliverable Brief *</label>
          <Textarea
            required
            rows={5}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Detail your goals, target audience, reference apps, and expected deliverables..."
            className="rounded-xl text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold mb-1 block">Estimated Budget</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-xs font-medium"
            >
              <option value="Under $1,000">Under $1,000</option>
              <option value="$1,000 - $2,500">$1,000 - $2,500</option>
              <option value="$2,500 - $5,000">$2,500 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000+">$10,000+</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block">Expected Delivery Timeline</label>
            <select
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-xs font-medium"
            >
              <option value="Urgent (< 1 Week)">Urgent (&lt; 1 Week)</option>
              <option value="Within 2-3 Weeks">Within 2-3 Weeks</option>
              <option value="Within 1 Month">Within 1 Month</option>
              <option value="Flexible / Ongoing">Flexible / Ongoing</option>
            </select>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-dashed border-black/10 dark:border-white/10 text-center">
          <Upload className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
          <p className="text-xs font-bold">Attach project brief or assets (optional)</p>
          <p className="text-[10px] text-muted-foreground">PDF, Figma links, sketches up to 25MB</p>
        </div>

        <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>Protected by CreateDOT Escrow & Milestone Verification Guarantee.</span>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2 font-bold"
        >
          <Send className="h-4 w-4" /> Send Request for Quote
        </Button>
      </form>
    </div>
  );
}
