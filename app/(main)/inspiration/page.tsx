"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaHeart,
  FaBookmark,
  FaShareNodes,
  FaCompass,
  FaEye,
  FaWandMagicSparkles,
} from "react-icons/fa6"
import { toast } from "sonner"

const INSPIRATION_SHOTS = [
  {
    id: "insp-1",
    title: "Quantum Glassmorphism Card Interface",
    creator: "Abhinav",
    avatar: "/images/profile-image-4.png",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    category: "Fintech UI",
    likes: 1840,
    saves: 420,
    aspect: "aspect-[4/5]",
  },
  {
    id: "insp-2",
    title: "Sphere 3D Spatial Geometry Canvas",
    creator: "Abhinav",
    avatar: "/images/profile-image-4.png",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    category: "3D Spatial",
    likes: 1420,
    saves: 380,
    aspect: "aspect-square",
  },
  {
    id: "insp-3",
    title: "Editorial Japanese Tea Typography",
    creator: "Aria Takahashi",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    category: "Branding",
    likes: 2150,
    saves: 610,
    aspect: "aspect-[3/4]",
  },
  {
    id: "insp-4",
    title: "Nova Token Mode Runtime Inspector",
    creator: "Abhinav",
    avatar: "/images/profile-image-4.png",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    category: "Design System",
    likes: 980,
    saves: 310,
    aspect: "aspect-[4/3]",
  },
  {
    id: "insp-5",
    title: "Spatial Dark Room Lighting Setup",
    creator: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    category: "3D Lighting",
    likes: 1650,
    saves: 490,
    aspect: "aspect-[4/5]",
  },
  {
    id: "insp-6",
    title: "Kinetic Swiss Poster Specimen",
    creator: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
    category: "Typography",
    likes: 1290,
    saves: 340,
    aspect: "aspect-[3/4]",
  },
]

export default function InspirationPage() {
  const [liked, setLiked] = useState<string[]>([])
  const [saved, setSaved] = useState<string[]>([])

  const toggleLike = (id: string) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const exists = prev.includes(id)
      if (exists) {
        toast.info("Removed from saved inspiration")
        return prev.filter((i) => i !== id)
      } else {
        toast.success("Saved to Moodboard Collection!")
        return [...prev, id]
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-rose-500 selection:text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <FaCompass className="text-xs" />
              Daily Visual Inspiration
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Design Inspiration Archive
            </h1>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
              A continuous stream of breakthrough user flows, spatial 3D frames, typographic studies, and UI prototypes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/moodboards"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <FaBookmark className="text-xs text-rose-400" />
              <span>View Saved Moodboards ({saved.length})</span>
            </Link>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {INSPIRATION_SHOTS.map((shot, idx) => {
            const isLiked = liked.includes(shot.id)
            const isSaved = saved.includes(shot.id)
            return (
              <motion.div
                key={shot.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="group relative rounded-3xl overflow-hidden bg-[#0D121F] border border-slate-800 break-inside-avoid shadow-xl hover:border-slate-700 transition-all"
              >
                <div className={`relative ${shot.aspect} w-full overflow-hidden bg-slate-900`}>
                  <img
                    src={shot.image}
                    alt={shot.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {shot.category}
                      </span>
                      <button
                        onClick={() => toggleSave(shot.id)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all ${
                          isSaved
                            ? "bg-rose-500 text-white"
                            : "bg-white/80 hover:bg-white text-slate-900"
                        }`}
                      >
                        <FaBookmark className="text-xs" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={shot.avatar}
                          alt={shot.creator}
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-white/40"
                        />
                        <span className="text-xs font-bold text-white drop-shadow">
                          {shot.creator}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleLike(shot.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all ${
                          isLiked
                            ? "bg-rose-500 text-white"
                            : "bg-white/80 hover:bg-white text-slate-900"
                        }`}
                      >
                        <FaHeart className="text-xs" />
                        <span>{shot.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="text-xs font-bold text-white hover:text-rose-400 transition-colors line-clamp-1">
                    {shot.title}
                  </h4>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
