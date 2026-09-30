"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, ArrowRight, ShieldCheck, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = (params?.id as string) || "ORD-9021";

  return (
    <div className="container max-w-2xl py-16 px-4 text-center">
      <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-500 mb-6">
        <CheckCircle2 className="h-12 w-12" />
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Order Confirmed & Escrow Active!</h1>
      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
        Your payment has been securely deposited into CreateDOT escrow. The designer has been notified and the project workspace has been created.
      </p>

      <div className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm text-left max-w-md mx-auto mb-8 space-y-3 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Order Reference</span>
          <span className="font-mono font-bold">{orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Estimated Delivery</span>
          <span className="font-bold text-foreground">5 Days from kickoff</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Escrow Amount</span>
          <span className="font-bold text-emerald-500">$714.00 USD</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button variant="outline" asChild className="w-full sm:w-auto rounded-xl">
          <Link href={`/orders/${orderId}/invoice`}>
            <FileText className="h-4 w-4 mr-2" /> View Invoice
          </Link>
        </Button>
        <Button asChild className="w-full sm:w-auto bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl font-bold">
          <Link href={`/orders/${orderId}`}>
            Open Order Workspace <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
