"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShieldAlert, Scale, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function OrderDisputePage() {
  const params = useParams();
  const router = useRouter();
  const orderId = (params?.id as string) || "ORD-8921";

  const [reason, setReason] = useState("seller-unresponsive");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.warning("Dispute opened. CreateDOT Resolution Center mediator assigned within 24h.");
      router.push(`/orders/${orderId}`);
    }, 800);
  };

  return (
    <div className="container max-w-2xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href={`/orders/${orderId}`} className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Order #{orderId}
        </Link>
        <span>/</span>
        <span>Resolution Center</span>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
          <Scale className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Order Resolution & Dispute</h1>
      </div>
      <p className="text-muted-foreground text-sm mb-8">
        If you are experiencing issues with deliverable deadlines or specifications, our neutral arbitration team is here to help.
      </p>

      <form onSubmit={handleSubmit} className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-6">
        <div>
          <label className="text-xs font-semibold mb-1 block">What issue are you facing?</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-xs font-medium"
          >
            <option value="seller-unresponsive">Freelancer is unresponsive or missed delivery deadline</option>
            <option value="scope-mismatch">Deliverable does not meet documented requirements</option>
            <option value="mutual-cancellation">Mutual agreement to cancel and refund escrow</option>
            <option value="quality-issue">Severe quality or copyright concern</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold mb-1 block">Detailed Explanation & Evidence *</label>
          <Textarea
            required
            rows={5}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Provide context on attempts to resolve this with the other party..."
            className="rounded-xl text-sm"
          />
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4" /> Escrow Protection Notice
          </p>
          <p>
            Opening a dispute temporarily freezes the escrow release. Both parties will have 48 hours to negotiate or request binding CreateDOT moderator adjudication.
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/10">
          <Button variant="outline" asChild className="rounded-xl text-xs">
            <Link href={`/orders/${orderId}`}>Return to Order</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm">
            Open Formal Dispute
          </Button>
        </div>
      </form>
    </div>
  );
}
