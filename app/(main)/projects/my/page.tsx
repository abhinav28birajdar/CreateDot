"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Folder,
  Plus,
  Edit,
  Eye,
  Heart,
  BarChart3,
  History,
  MoreVertical,
  CheckCircle2,
  Clock,
  Calendar,
  Share2,
  Trash2,
  ExternalLink,
  ArrowLeft,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MyProjectsPage() {
  const [filter, setFilter] = useState<"all" | "published" | "draft" | "scheduled">("all");

  const myProjects = [
    {
      id: "proj-1",
      title: "QuantumPay — Autonomous AI Banking",
      cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      category: "Fintech",
      status: "published",
      updatedAt: "2 hours ago",
      views: "24.5K",
      likes: "3.2K",
      comments: "142",
      shares: "420",
      saves: "850",
    },
    {
      id: "proj-2",
      title: "CyberMotion 3D Spatial Canvas",
      cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      category: "Spatial UI",
      status: "published",
      updatedAt: "1 day ago",
      views: "14.2K",
      likes: "1.9K",
      comments: "88",
      shares: "210",
      saves: "490",
    },
    {
      id: "proj-draft-1",
      title: "HyperBrand Neo Design System (V2 Release)",
      cover: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
      category: "Design System",
      status: "draft",
      updatedAt: "3 days ago",
      views: "0",
      likes: "0",
      comments: "0",
      shares: "0",
      saves: "0",
    },
    {
      id: "proj-sched-1",
      title: "Pulse Mobile Health Telemetry UI",
      cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
      category: "Healthcare",
      status: "scheduled",
      updatedAt: "Scheduled for Oct 12, 2026",
      views: "0",
      likes: "0",
      comments: "0",
      shares: "0",
      saves: "0",
    },
  ];

  const filtered = filter === "all" ? myProjects : myProjects.filter((p) => p.status === filter);

  return (
    <div className="container max-w-7xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/projects" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> All Projects
            </Link>
            <span>/</span>
            <span>My Projects</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Projects Workspace</h1>
          <p className="text-muted-foreground text-sm">
            Manage your published work, drafts, analytics, and version checkpoints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2">
            <Link href="/projects/new">
              <Plus className="h-4 w-4" /> New Project
            </Link>
          </Button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-1 text-xs font-semibold mb-8 self-start w-fit">
        {[
          { id: "all", label: "All Projects" },
          { id: "published", label: "Published" },
          { id: "draft", label: "Drafts" },
          { id: "scheduled", label: "Scheduled" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg capitalize transition-all ${
              filter === tab.id
                ? "bg-white dark:bg-[#1a1f33] text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filtered.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-32 rounded-xl overflow-hidden bg-muted shrink-0">
                <Image src={project.cover} alt={project.title} fill className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-bold capitalize ${
                      project.status === "published"
                        ? "text-emerald-500 border-emerald-500/20"
                        : project.status === "draft"
                        ? "text-amber-500 border-amber-500/20"
                        : "text-purple-500 border-purple-500/20"
                    }`}
                  >
                    {project.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">• {project.category}</span>
                </div>
                <h3 className="font-extrabold text-base hover:underline">
                  <Link href={`/projects/${project.id}/edit`}>{project.title}</Link>
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Updated {project.updatedAt}</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <div className="text-center">
                <p className="font-bold text-foreground">{project.views}</p>
                <p className="text-[10px]">Views</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-foreground">{project.likes}</p>
                <p className="text-[10px]">Likes</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-foreground">{project.comments}</p>
                <p className="text-[10px]">Comments</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-foreground">{project.saves}</p>
                <p className="text-[10px]">Saves</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <Button variant="outline" size="sm" asChild className="rounded-xl gap-1.5 text-xs font-semibold">
                <Link href={`/projects/${project.id}/analytics`}>
                  <BarChart3 className="h-3.5 w-3.5 text-blue-500" /> Analytics
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="rounded-xl gap-1.5 text-xs font-semibold">
                <Link href={`/projects/${project.id}/edit`}>
                  <Edit className="h-3.5 w-3.5 text-[#FF6B6B]" /> Edit
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/project/${project.id}`} className="cursor-pointer">
                      <Eye className="h-3.5 w-3.5 mr-2" /> View Public Page
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/projects/${project.id}/versions`} className="cursor-pointer">
                      <History className="h-3.5 w-3.5 mr-2" /> Version History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/projects/${project.id}/preview`} className="cursor-pointer">
                      <ExternalLink className="h-3.5 w-3.5 mr-2" /> Live Preview
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-rose-500 cursor-pointer">
                    <Trash2 className="h-3.5 w-3.5 mr-2" /> Unpublish / Archive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
