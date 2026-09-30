"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Printer, Download, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function OrderInvoicePage() {
  const params = useParams();
  const orderId = (params?.id as string) || "ORD-8921";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container max-w-3xl py-8 px-4 sm:px-6">
      <div className="flex items-center justify-between gap-4 mb-8 print:hidden">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href={`/orders/${orderId}`} className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Order
          </Link>
          <span>/</span>
          <span>Invoice & Receipt</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="rounded-xl gap-1.5 text-xs">
            <Printer className="h-3.5 w-3.5" /> Print
          </Button>
          <Button size="sm" onClick={handlePrint} className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl gap-1.5 text-xs font-bold">
            <Download className="h-3.5 w-3.5" /> Download PDF Receipt
          </Button>
        </div>
      </div>

      {/* Official Invoice Sheet */}
      <div className="p-8 sm:p-12 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl font-black text-[#FF6B6B] tracking-tight">CreateDOT.io</div>
            <p className="text-xs text-muted-foreground mt-1">Creative Network & Talent Escrow Services</p>
            <p className="text-xs text-muted-foreground">500 Howard Street, San Francisco, CA 94105</p>
          </div>
          <div className="text-right">
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold mb-1">
              PAID IN FULL
            </Badge>
            <p className="text-xl font-black font-mono mt-1">INV-{orderId.replace("ORD-", "")}</p>
            <p className="text-xs text-muted-foreground">Issued: Sep 28, 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-black/5 dark:border-white/10 text-xs">
          <div>
            <p className="text-muted-foreground font-bold uppercase tracking-wider mb-1">Billed To (Client)</p>
            <p className="font-extrabold text-sm">Stripe Venture Studio</p>
            <p className="text-muted-foreground">studio@stripe.com</p>
            <p className="text-muted-foreground">San Francisco, CA</p>
          </div>
          <div>
            <p className="text-muted-foreground font-bold uppercase tracking-wider mb-1">Service Provider (Freelancer)</p>
            <p className="font-extrabold text-sm">Sarah Chen Studio</p>
            <p className="text-muted-foreground">sarah@createdot.io</p>
            <p className="text-muted-foreground">Verified Creator Pro</p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-black/[0.02] dark:bg-white/[0.02] px-4 py-3 flex justify-between text-xs font-bold text-muted-foreground border-b border-black/5 dark:border-white/10">
            <span>Description</span>
            <span>Amount (USD)</span>
          </div>
          <div className="px-4 py-4 flex justify-between items-center text-sm border-b border-black/5 dark:border-white/10">
            <div>
              <p className="font-bold">Ultra-Modern SaaS UI/UX Design System</p>
              <p className="text-xs text-muted-foreground">Premium Milestone Package (Figma, Tokens, React prototypes)</p>
            </div>
            <span className="font-bold">$1,250.00</span>
          </div>
          <div className="px-4 py-3 flex justify-between items-center text-xs border-b border-black/5 dark:border-white/10 text-muted-foreground">
            <span>Platform Escrow Protection & Processing (5%)</span>
            <span>$62.50</span>
          </div>
          <div className="bg-black/[0.01] dark:bg-white/[0.01] px-4 py-4 flex justify-between items-center text-base font-black">
            <span>Total Paid</span>
            <span className="text-[#FF6B6B]">$1,312.50 USD</span>
          </div>
        </div>

        <div className="pt-6 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs text-muted-foreground">
          <span>Payment Transaction ID: tx_9824_escrow_sec</span>
          <span className="flex items-center gap-1 font-semibold text-emerald-500">
            <ShieldCheck className="h-4 w-4" /> Escrow Verified Receipt
          </span>
        </div>
      </div>
    </div>
  );
}
