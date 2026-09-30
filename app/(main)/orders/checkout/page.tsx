"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, CheckCircle2, Lock, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function OrderCheckoutPage() {
  const router = useRouter();
  const [tier, setTier] = useState("Standard Deliverable Suite");
  const [requirements, setRequirements] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const price = 680;
  const serviceFee = 34;
  const total = price + serviceFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment authorized and held securely in escrow! 🎉");
      router.push("/orders/ORD-9021/confirmation");
    }, 1000);
  };

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/orders" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Orders
        </Link>
        <span>/</span>
        <span>Secure Checkout</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Order Checkout & Escrow Setup</h1>
      <p className="text-muted-foreground text-sm mb-8">Funds are held in neutral escrow until you approve the final delivery.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleCheckout} className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4">
            <h2 className="text-base font-bold">1. Project Kickoff Requirements</h2>
            <p className="text-xs text-muted-foreground">Provide instructions, branding links, or wireframes to help the designer start immediately.</p>
            <Textarea
              rows={4}
              required
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g. Target audience is seed-stage fintech startups. Please incorporate Figma auto-layout 5.0 and dark mode..."
              className="rounded-xl text-sm"
            />
          </div>

          <div className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4">
            <h2 className="text-base font-bold flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#FF6B6B]" /> 2. Payment Method
            </h2>
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-12 rounded bg-black/10 dark:bg-white/10 flex items-center justify-center font-bold text-xs">
                  VISA
                </div>
                <div>
                  <p className="text-xs font-bold">Visa ending in 4242</p>
                  <p className="text-[10px] text-muted-foreground">Expires 12/28 • Default Payment Method</p>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px] text-emerald-500">Selected</Badge>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl py-6 font-bold shadow-md gap-2"
          >
            <Lock className="h-4 w-4" /> Place Order & Deposit to Escrow (${total})
          </Button>
        </form>

        {/* Order Summary Sidebar */}
        <div className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm h-fit space-y-4">
          <h3 className="font-bold text-sm">Order Summary</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Package</span>
              <span className="font-bold">${price}.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">CreateDOT Escrow Protection (5%)</span>
              <span className="font-bold">${serviceFee}.00</span>
            </div>
            <div className="pt-3 border-t border-black/5 dark:border-white/10 flex justify-between text-sm">
              <span className="font-extrabold">Total Due</span>
              <span className="font-black text-[#FF6B6B]">${total}.00</span>
            </div>
          </div>

          <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>100% Money-back Escrow Guarantee if deliverables do not match specs.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
