"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar as CalendarIcon, Clock, CheckCircle2, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FreelancerCalendarPage() {
  const [availability, setAvailability] = useState("available");

  const milestones = [
    { date: "Oct 04, 2026", title: "QuantumPay Milestone 1 Delivery", client: "Stripe Studio", type: "Deadline", color: "bg-rose-500/10 text-rose-500" },
    { date: "Oct 07, 2026", title: "Aura Spatial Design Review Call", client: "Aura Spatial", type: "Client Meeting", color: "bg-blue-500/10 text-blue-500" },
    { date: "Oct 12, 2026", title: "Design Tokens v1.0 Handover", client: "CloudCore", type: "Release", color: "bg-emerald-500/10 text-emerald-500" },
  ];

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/freelancer/dashboard" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Dashboard
            </Link>
            <span>/</span>
            <span>Calendar</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Availability & Delivery Calendar</h1>
          <p className="text-muted-foreground text-sm">Schedule milestone deadlines, sync with client Google Calendars, and set capacity.</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 py-1 px-3 text-xs font-bold">
            Available for Select Projects (20 hrs/wk)
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Box */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">October 2026</h2>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-lg"><ChevronLeft className="h-4 w-4" /></Button>
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-lg"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-muted-foreground mb-3">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>

          {/* Simple calendar days grid */}
          <div className="grid grid-cols-7 gap-2">
            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              const hasEvent = [4, 7, 12].includes(day);
              return (
                <div
                  key={i}
                  className={`h-14 p-1.5 rounded-xl border border-black/5 dark:border-white/10 text-left text-xs font-semibold relative transition-all ${
                    hasEvent ? "bg-[#FF6B6B]/5 border-[#FF6B6B]/30" : "bg-black/[0.01] dark:bg-white/[0.01]"
                  }`}
                >
                  <span>{day}</span>
                  {hasEvent && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] absolute bottom-2 right-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Milestones Sidebar */}
        <div className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4">
          <h3 className="font-bold text-base">Upcoming Deliverables</h3>
          <div className="space-y-3">
            {milestones.map((m) => (
              <div key={m.title} className="p-3.5 rounded-2xl border border-black/5 dark:border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground">{m.date}</span>
                  <Badge variant="outline" className={`text-[10px] py-0 ${m.color}`}>{m.type}</Badge>
                </div>
                <h4 className="font-bold text-xs">{m.title}</h4>
                <p className="text-[11px] text-muted-foreground">Client: {m.client}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
