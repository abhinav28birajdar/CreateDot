"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, Clock, CheckCircle2, XCircle, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FreelancerProposalsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "shortlisted" | "won">("all");

  const proposals = [
    {
      id: "prop-1",
      jobTitle: "Design Lead for Autonomous AI Financial Copilot App",
      client: "Quantum Financial Inc.",
      bidAmount: "$4,500",
      submittedAt: "2 days ago",
      status: "shortlisted",
      interviews: "Interview scheduled for tomorrow at 2 PM",
    },
    {
      id: "prop-2",
      jobTitle: "Spatial 3D Vision Canvas Developer (Next.js + Three.js)",
      client: "Aura Spatial",
      bidAmount: "$6,200",
      submittedAt: "4 days ago",
      status: "active",
      interviews: "Client viewed proposal 3 times",
    },
    {
      id: "prop-3",
      jobTitle: "Multi-Brand Design Tokens Architecture Audit",
      client: "Stripe Venture Studio",
      bidAmount: "$3,800",
      submittedAt: "1 week ago",
      status: "won",
      interviews: "Contract converted to active order",
    },
  ];

  const filtered = filter === "all" ? proposals : proposals.filter((p) => p.status === filter);

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/freelancer/dashboard" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Dashboard
            </Link>
            <span>/</span>
            <span>Proposals</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Proposals & Applications</h1>
          <p className="text-muted-foreground text-sm">Track bids submitted for client briefs, client interviews, and contract conversions.</p>
        </div>

        <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2">
          <Link href="/jobs">
            <Send className="h-4 w-4" /> Find New Jobs
          </Link>
        </Button>
      </div>

      <div className="flex rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-1 text-xs font-semibold mb-8 w-fit">
        {[
          { id: "all", label: "All Proposals" },
          { id: "shortlisted", label: "Shortlisted & Interviews" },
          { id: "active", label: "Active Review" },
          { id: "won", label: "Won / Contracts" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id as any)}
            className={`px-3.5 py-1.5 rounded-lg capitalize transition-all ${
              filter === t.id
                ? "bg-white dark:bg-[#1a1f33] text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((prop) => (
          <div
            key={prop.id}
            className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`text-[10px] font-bold capitalize ${
                    prop.status === "shortlisted"
                      ? "text-purple-500 border-purple-500/20"
                      : prop.status === "won"
                      ? "text-emerald-500 border-emerald-500/20"
                      : "text-blue-500 border-blue-500/20"
                  }`}
                >
                  {prop.status}
                </Badge>
                <span className="text-xs text-muted-foreground">Submitted {prop.submittedAt}</span>
              </div>
              <h3 className="font-extrabold text-base leading-tight">{prop.jobTitle}</h3>
              <p className="text-xs text-muted-foreground">Client: <strong className="text-foreground">{prop.client}</strong></p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{prop.interviews}</p>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-black/5 dark:border-white/10">
              <div className="text-left md:text-right">
                <p className="text-xl font-black text-foreground">{prop.bidAmount}</p>
                <p className="text-[10px] text-muted-foreground">Proposed Milestone</p>
              </div>
              <Button asChild size="sm" variant="outline" className="rounded-xl text-xs gap-1">
                <Link href="/messages">
                  Messages <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
