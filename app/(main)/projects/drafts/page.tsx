"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Plus, Edit, Trash2, ArrowLeft, ArrowRight, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DraftProjectsPage() {
  const drafts = [
    {
      id: "draft-1",
      title: "HyperBrand Neo Design System (V2 Release)",
      category: "Design System",
      lastSaved: "Saved 40 minutes ago",
      completion: 75,
      cover: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    },
    {
      id: "draft-2",
      title: "Zero-Gravity 3D Spatial Audio Controller",
      category: "Hardware UX",
      lastSaved: "Saved yesterday at 11:24 PM",
      completion: 40,
      cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop",
    },
    {
      id: "draft-3",
      title: "AI Canvas Prompt-to-Component Benchmark",
      category: "Generative AI",
      lastSaved: "Saved 4 days ago",
      completion: 90,
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
            <span>Drafts</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Draft Projects</h1>
          <p className="text-muted-foreground text-sm">
            Unpublished creative manuscripts and work in progress.
          </p>
        </div>

        <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2">
          <Link href="/projects/new">
            <Plus className="h-4 w-4" /> Create New Project
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drafts.map((draft) => (
          <motion.div
            key={draft.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image src={draft.cover} alt={draft.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-amber-500 text-white font-bold text-[10px] border-none">
                    <Clock className="h-3 w-3 mr-1" /> Draft ({draft.completion}% ready)
                  </Badge>
                </div>
              </div>

              <div className="p-5">
                <Badge variant="outline" className="text-[10px] mb-2 font-medium">
                  {draft.category}
                </Badge>
                <h3 className="font-extrabold text-base line-clamp-1 mb-1">
                  {draft.title}
                </h3>
                <p className="text-xs text-muted-foreground">{draft.lastSaved}</p>

                {/* Progress bar */}
                <div className="w-full bg-black/5 dark:bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div
                    style={{ width: `${draft.completion}%` }}
                    className="h-full bg-amber-500 rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-black/5 dark:border-white/10 mt-2">
              <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600 text-xs">
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Discard
              </Button>
              <Button asChild size="sm" className="bg-[#14161F] dark:bg-white dark:text-[#14161F] text-white rounded-xl text-xs font-bold gap-1">
                <Link href={`/projects/${draft.id}/edit`}>
                  Resume Editing <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
