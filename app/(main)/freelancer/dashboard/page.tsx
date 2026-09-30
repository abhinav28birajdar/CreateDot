"use client";

import React from "react";
import Link from "next/link";
import { DollarSign, Briefcase, Clock, Star, TrendingUp, Calendar, ArrowRight, ShieldCheck, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FreelancerDashboardPage() {
  const metrics = [
    { label: "Net Earnings (Month)", value: "$9,420", change: "+24.5%", icon: DollarSign, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Active Client Orders", value: "4 Orders", change: "2 Due this week", icon: Briefcase, color: "text-blue-500 bg-blue-500/10" },
    { label: "Job Success Score", value: "100%", change: "Top Rated Plus", icon: Star, color: "text-amber-500 bg-amber-500/10" },
    { label: "Active Proposals", value: "7 Submitted", change: "3 Shortlisted", icon: Sparkles, color: "text-purple-500 bg-purple-500/10" },
  ];

  return (
    <div className="container max-w-7xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Freelancer Studio Dashboard</h1>
          <p className="text-muted-foreground text-sm">Track milestones, pending reviews, client proposals, and cash flow.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href="/freelancer/calendar">
              <Calendar className="h-4 w-4 mr-2 text-purple-500" /> Availability Calendar
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link href="/freelancer/proposals">Proposals (7)</Link>
          </Button>
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2">
            <Link href="/gigs/new">
              <Plus className="h-4 w-4" /> Create New Gig
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm">
              <div className={`p-2.5 rounded-xl w-fit ${m.color} mb-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-2xl font-black mt-1">{m.value}</p>
              <p className="text-[11px] text-muted-foreground mt-1 font-semibold">{m.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/orders?status=active"
          className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-lg hover:border-[#FF6B6B]/40 transition-all"
        >
          <h3 className="font-extrabold text-base mb-1">Active Client Orders</h3>
          <p className="text-xs text-muted-foreground mb-4">View countdown timers, delivery scopes, and revision threads.</p>
          <span className="text-xs font-bold text-[#FF6B6B] flex items-center gap-1">
            Go to Orders <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href="/freelancer/contracts"
          className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-lg hover:border-[#FF6B6B]/40 transition-all"
        >
          <h3 className="font-extrabold text-base mb-1">Contracts & Retainers</h3>
          <p className="text-xs text-muted-foreground mb-4">Ongoing agreements, hourly telemetry, and active NDAs.</p>
          <span className="text-xs font-bold text-[#FF6B6B] flex items-center gap-1">
            View Contracts <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href="/wallet"
          className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-lg hover:border-[#FF6B6B]/40 transition-all"
        >
          <h3 className="font-extrabold text-base mb-1">Earnings & Withdrawals</h3>
          <p className="text-xs text-muted-foreground mb-4">Manage Stripe Express, PayPal, bank payouts, and tax receipts.</p>
          <span className="text-xs font-bold text-[#FF6B6B] flex items-center gap-1">
            Manage Payouts <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
