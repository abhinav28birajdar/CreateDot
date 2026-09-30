"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Edit, ExternalLink, Globe, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectPreviewPage() {
  const params = useParams();
  const projectId = (params?.id as string) || "proj-1";

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href={`/projects/${projectId}/edit`} className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Editor
            </Link>
            <span>/</span>
            <span>Live Interactive Preview</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Project Live Preview</h1>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs text-amber-500 border-amber-500/20">
            Preview Mode • Draft State
          </Badge>
          <Button asChild size="sm" className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl gap-1.5">
            <Link href={`/project/${projectId}`}>
              Open Public <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Embedded Simulated Viewframe */}
      <div className="rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl bg-white dark:bg-[#111420]">
        <div className="h-10 bg-slate-100 dark:bg-[#1a1f33] border-b border-black/5 dark:border-white/10 px-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">https://createdot.io/project/{projectId}</span>
          <div className="w-12" />
        </div>

        <div className="p-8 sm:p-12 max-w-4xl mx-auto space-y-8">
          <div>
            <Badge className="bg-[#FF6B6B] text-white text-xs mb-2">Fintech • Case Study</Badge>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
              QuantumPay — Autonomous AI Banking Platform
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Autonomous financial assistant with dark mode glassmorphism interface and micro-interactions.
            </p>
          </div>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop"
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-4">
            <h3 className="text-xl font-bold">Problem Statement</h3>
            <p className="text-muted-foreground">
              Modern banking applications overwhelm high-velocity users with excessive menus, tabular data, and opaque reconciliation.
              QuantumPay simplifies wealth allocation into a single conversational neural interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
