"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { History, ArrowLeft, RotateCcw, Check, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectVersionsPage() {
  const params = useParams();
  const projectId = (params?.id as string) || "proj-1";

  const versions = [
    {
      version: "v2.1 (Current Live)",
      date: "Today, 02:14 PM",
      author: "Sarah Chen",
      changes: "Refined 3D token variables, updated mobile header assets, and added generative prompt snippets.",
      current: true,
    },
    {
      version: "v2.0",
      date: "Oct 1, 2026",
      author: "Sarah Chen",
      changes: "Major redesign of dark mode glassmorphism UI and updated interactive prototypes.",
      current: false,
    },
    {
      version: "v1.2",
      date: "Sep 20, 2026",
      author: "Sarah Chen",
      changes: "Added client case study metrics and user interview quotes.",
      current: false,
    },
    {
      version: "v1.0",
      date: "Aug 15, 2026",
      author: "Sarah Chen",
      changes: "Initial project launch & public release.",
      current: false,
    },
  ];

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href={`/projects/${projectId}/edit`} className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Project Editor
            </Link>
            <span>/</span>
            <span>Versions</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Project Versions & History</h1>
          <p className="text-muted-foreground text-sm">
            Inspect revision checkpoints and restore earlier states of your case study.
          </p>
        </div>

        <Button variant="outline" asChild className="rounded-xl">
          <Link href={`/project/${projectId}`}>
            <Eye className="h-4 w-4 mr-1.5" /> View Public Page
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {versions.map((ver, idx) => (
          <motion.div
            key={ver.version}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-6 rounded-2xl border ${
              ver.current
                ? "border-[#FF6B6B] bg-[#FF6B6B]/5 dark:bg-[#FF6B6B]/10"
                : "border-black/5 dark:border-white/10 bg-white dark:bg-[#141824]"
            } shadow-sm`}
          >
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base">{ver.version}</h3>
                {ver.current && (
                  <Badge className="bg-[#FF6B6B] text-white text-[10px] font-bold border-none">
                    Active
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{ver.date}</span>
            </div>

            <p className="text-xs text-muted-foreground mb-4">Authored by {ver.author}</p>
            <p className="text-sm leading-relaxed mb-4">{ver.changes}</p>

            <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10">
              <span className="text-xs text-muted-foreground">Snapshot ID: #{ver.version.toLowerCase().replace(/[^a-z0-9]/g, "")}</span>
              {!ver.current && (
                <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5" /> Revert to this Version
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
