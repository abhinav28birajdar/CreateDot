"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Plus,
  ArrowLeft,
  Lock,
  Globe,
  Users,
  Edit,
  BarChart3,
  MoreVertical,
  Pin,
  FolderPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyBoardsPage() {
  const [filter, setFilter] = useState<"all" | "private" | "shared" | "public">("all");

  const boards = [
    {
      id: "board-1",
      title: "UI / UX NextGen Inspiration",
      description: "Curated collection of innovative interaction design, glassmorphism, and 3D web interfaces.",
      pinCount: 48,
      sectionCount: 4,
      privacy: "public",
      collaborators: 3,
      covers: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=300&fit=crop",
      ],
    },
    {
      id: "board-2",
      title: "QuantumPay Brand Assets & Tokens",
      description: "Private client workspace tokens, iconographies, and release deck graphics.",
      pinCount: 22,
      sectionCount: 3,
      privacy: "private",
      collaborators: 1,
      covers: [
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=300&h=300&fit=crop",
      ],
    },
    {
      id: "board-3",
      title: "Spatial Computing Lab",
      description: "Shared exploration board with team designers on visionOS concepts and hand gestures.",
      pinCount: 35,
      sectionCount: 5,
      privacy: "shared",
      collaborators: 6,
      covers: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop",
      ],
    },
  ];

  const filtered = filter === "all" ? boards : boards.filter((b) => b.privacy === filter);

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/boards" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> All Boards
            </Link>
            <span>/</span>
            <span>My Boards</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Moodboards & Pins</h1>
          <p className="text-muted-foreground text-sm">Organize and share thematic visual boards, sections, and moodboards.</p>
        </div>

        <Button asChild className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2">
          <Link href="/boards/new">
            <Plus className="h-4 w-4" /> Create Board
          </Link>
        </Button>
      </div>

      <div className="flex rounded-xl bg-black/[0.04] dark:bg-white/[0.06] p-1 text-xs font-semibold mb-8 w-fit">
        {[
          { id: "all", label: "All Boards" },
          { id: "public", label: "Public" },
          { id: "private", label: "Private" },
          { id: "shared", label: "Shared with Peers" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id as any)}
            className={`px-3.5 py-1.5 rounded-lg transition-all capitalize ${
              filter === t.id
                ? "bg-white dark:bg-[#1a1f33] text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((board) => (
          <motion.div
            key={board.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm hover:shadow-xl transition-all p-5 flex flex-col justify-between"
          >
            <div>
              {/* Mosaic cover */}
              <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden aspect-[16/9] mb-4 bg-muted">
                {board.covers.map((c, i) => (
                  <div key={i} className="relative h-full w-full">
                    <Image src={c} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant="outline"
                  className={`text-[10px] font-bold capitalize ${
                    board.privacy === "private"
                      ? "text-rose-500 border-rose-500/20"
                      : board.privacy === "shared"
                      ? "text-purple-500 border-purple-500/20"
                      : "text-emerald-500 border-emerald-500/20"
                  }`}
                >
                  {board.privacy === "private" && <Lock className="h-2.5 w-2.5 mr-1" />}
                  {board.privacy === "shared" && <Users className="h-2.5 w-2.5 mr-1" />}
                  {board.privacy === "public" && <Globe className="h-2.5 w-2.5 mr-1" />}
                  {board.privacy} Board
                </Badge>
                <span className="text-xs text-muted-foreground">{board.pinCount} Pins • {board.sectionCount} Sections</span>
              </div>

              <Link href={`/boards/${board.id}`} className="font-extrabold text-base hover:underline block mb-1">
                {board.title}
              </Link>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{board.description}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/10 text-xs font-semibold">
              <Button variant="ghost" size="sm" asChild className="rounded-xl text-xs gap-1">
                <Link href={`/boards/${board.id}/analytics`}>
                  <BarChart3 className="h-3.5 w-3.5 text-blue-500" /> Analytics
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="rounded-xl text-xs gap-1">
                <Link href={`/boards/${board.id}/edit`}>
                  <Edit className="h-3.5 w-3.5 text-[#FF6B6B]" /> Edit Board
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
