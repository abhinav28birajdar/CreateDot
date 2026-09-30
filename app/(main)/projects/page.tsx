"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Plus,
  Folder,
  Layers,
  Sparkles,
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle2,
  Eye,
  Heart,
  Share2,
  Filter,
  Search,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "featured" | "trending" | "recent">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const projects = [
    {
      id: "proj-1",
      title: "QuantumPay — Autonomous AI Banking",
      author: "Sarah Chen",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      category: "Fintech",
      tags: ["AI", "UI/UX", "Mobile"],
      views: "24.5K",
      likes: "3.2K",
      publishedAt: "2 days ago",
      status: "published",
    },
    {
      id: "proj-2",
      title: "Aura Spatial 3D OS Canvas",
      author: "Marcus Vance",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      category: "Spatial Computing",
      tags: ["Three.js", "Spatial UI", "WebXR"],
      views: "19.1K",
      likes: "2.8K",
      publishedAt: "4 days ago",
      status: "published",
    },
    {
      id: "proj-3",
      title: "HyperSystem Multi-Brand Tokens",
      author: "Elena Rostova",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      cover: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
      category: "Design System",
      tags: ["Design System", "Tokens", "Figma"],
      views: "15.8K",
      likes: "1.9K",
      publishedAt: "1 week ago",
      status: "published",
    },
    {
      id: "proj-4",
      title: "Nebula Generative Sound Experience",
      author: "Liam Thorne",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop",
      category: "Interactive Audio",
      tags: ["WebAudio", "Generative", "Motion"],
      views: "12.3K",
      likes: "1.6K",
      publishedAt: "2 weeks ago",
      status: "published",
    },
  ];

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-7xl py-8 px-4 sm:px-6">
      {/* Top Banner & Quick Sub-Nav */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Creative Projects</h1>
          <p className="text-muted-foreground text-sm">
            Discover peer-reviewed case studies, client commissions, and generative prototypes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href="/projects/my">
              <Folder className="h-4 w-4 mr-2 text-blue-500" /> My Projects
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link href="/projects/drafts">
              <Clock className="h-4 w-4 mr-2 text-amber-500" /> Drafts
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link href="/projects/scheduled">
              <Calendar className="h-4 w-4 mr-2 text-purple-500" /> Scheduled
            </Link>
          </Button>
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm">
            <Link href="/projects/new">
              <Plus className="h-4 w-4 mr-2" /> Create Project
            </Link>
          </Button>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-1 text-xs font-semibold self-start">
          {[
            { id: "all", label: "All Works" },
            { id: "featured", label: "Featured & Staff Picks" },
            { id: "trending", label: "Trending This Week" },
            { id: "recent", label: "Recently Published" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-white dark:bg-[#1a1f33] text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title or tag..."
            className="pl-9 rounded-xl text-xs bg-white dark:bg-[#141824]"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="group rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-xl transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-black/60 backdrop-blur-md text-white text-[10px] border-none font-bold">
                  {project.category}
                </Badge>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="relative h-6 w-6 rounded-full overflow-hidden">
                  <Image src={project.authorAvatar} alt={project.author} fill className="object-cover" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{project.author}</span>
                <span className="text-xs text-muted-foreground/60">• {project.publishedAt}</span>
              </div>

              <Link href={`/project/${project.id}`} className="font-extrabold text-base hover:underline line-clamp-1 block mb-2">
                {project.title}
              </Link>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10 text-xs text-muted-foreground font-medium">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {project.views}</span>
                  <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-rose-500" /> {project.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild className="h-7 text-xs font-bold text-[#FF6B6B]">
                    <Link href={`/project/${project.id}`}>
                      View <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
