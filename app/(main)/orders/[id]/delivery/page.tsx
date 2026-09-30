"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, RotateCcw, Download, FileText, Upload, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function OrderDeliveryPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = (params?.id as string) || "ORD-8921";

  const [revisionNotes, setRevisionNotes] = useState("");
  const [showRevisionModal, setShowRevisionModal] = useState(false);

  const handleApprove = () => {
    toast.success("Delivery approved! Escrow payment released to the freelancer. 🌟");
    router.push(`/orders/${orderId}`);
  };

  const handleRequestRevision = () => {
    if (!revisionNotes.trim()) {
      toast.error("Please explain what revisions are needed");
      return;
    }
    toast.info("Revision requested! Freelancer has been notified.");
    setShowRevisionModal(false);
  };

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href={`/orders/${orderId}`} className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Order #{orderId}
        </Link>
        <span>/</span>
        <span>Review Delivery</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Deliverables & Review</h1>
          <p className="text-muted-foreground text-sm">Inspect submitted production files, review source assets, and authorize release.</p>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold py-1 px-3">
          Delivered on Schedule
        </Badge>
      </div>

      <div className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm mb-6 space-y-6">
        <div>
          <h2 className="text-base font-bold mb-2">Designer&apos;s Delivery Note</h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-black/[0.02] dark:bg-white/[0.02] p-4 rounded-xl border border-black/5 dark:border-white/10">
            &ldquo;Hey! The complete design system v1.0 has been finalized. All 15 screens are linked in the interactive Figma file,
            with design tokens exported to JSON. Full color palettes and dark mode variants are verified against WCAG AAA standards.&rdquo;
          </p>
        </div>

        {/* Deliverable Files */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Attached Deliverables (3 Files)</h3>
          <div className="space-y-2">
            {[
              { name: "QuantumPay_Design_System_v1.0.fig", size: "48.2 MB", type: "Figma Source" },
              { name: "Design_Tokens_JSON_Exports.zip", size: "4.1 MB", type: "Code Tokens" },
              { name: "Prototype_Walkthrough_Showreel.mp4", size: "112.5 MB", type: "Video Preview" },
            ].map((file) => (
              <div key={file.name} className="p-3.5 rounded-xl border border-black/5 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#FF6B6B]/10 text-[#FF6B6B]">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-xs">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground">{file.size} • {file.type}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1.5">
                  <Download className="h-3.5 w-3.5" /> Download
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => setShowRevisionModal(!showRevisionModal)}
            className="w-full sm:w-auto rounded-xl gap-2 text-xs font-bold"
          >
            <RotateCcw className="h-4 w-4 text-amber-500" /> Request Revision
          </Button>

          <Button
            onClick={handleApprove}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 text-xs font-bold shadow-sm"
          >
            <CheckCircle2 className="h-4 w-4" /> Approve & Release Escrow Payment
          </Button>
        </div>

        {/* Revision Box */}
        {showRevisionModal && (
          <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-3">
            <h4 className="text-xs font-bold flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" /> Describe changes required
            </h4>
            <Textarea
              rows={3}
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              placeholder="e.g. Please increase the contrast on the secondary modal button..."
              className="text-xs rounded-xl"
            />
            <Button size="sm" onClick={handleRequestRevision} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs">
              Submit Revision Request
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
