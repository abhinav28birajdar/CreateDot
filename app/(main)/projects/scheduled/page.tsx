"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Plus, Clock, Edit, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ScheduledProjectsPage() {
  const scheduled = [
    {
      id: "sched-1",
      title: "Pulse Mobile Health Telemetry UI",
      category: "Healthcare UX",
      publishDate: "October 12, 2026",
      publishTime: "09:00 AM PST",
      status: "Ready for Auto-Publish",
      cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
    },
    {
      id: "sched-2",
      title: "OmniChannel E-Commerce Design Token Standard",
      category: "Enterprise System",
      publishDate: "October 18, 2026",
      publishTime: "12:00 PM PST",
      status: "Queued",
      cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    },
  ];

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/projects" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Projects
            </Link>
            <span>/</span>
            <span>Scheduled</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Scheduled Projects</h1>
          <p className="text-muted-foreground text-sm">
            Content scheduled for automatic publication and social release.
          </p>
        </div>

        <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2">
          <Link href="/projects/new">
            <Plus className="h-4 w-4" /> Schedule New Release
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scheduled.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm flex flex-col sm:flex-row items-start gap-4"
          >
            <div className="relative h-28 w-40 rounded-xl overflow-hidden bg-muted shrink-0">
              <Image src={item.cover} alt={item.title} fill className="object-cover" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[10px] font-bold">
                  <Calendar className="h-3 w-3 mr-1" /> {item.publishDate}
                </Badge>
                <span className="text-xs text-muted-foreground">{item.publishTime}</span>
              </div>

              <h3 className="font-extrabold text-base line-clamp-1 mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{item.category}</p>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild className="rounded-xl text-xs">
                  <Link href={`/projects/${item.id}/edit`}>
                    <Edit className="h-3.5 w-3.5 mr-1 text-[#FF6B6B]" /> Reschedule or Edit
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
