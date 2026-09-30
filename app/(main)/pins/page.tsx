"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaThumbtack,
  FaHeart,
  FaRegHeart,
  FaShareNodes,
  FaPlus,
  FaMagnifyingGlass,
  FaCamera,
  FaArrowUpRightFromSquare,
  FaFolderPlus,
  FaCheck,
  FaLayerGroup
} from "react-icons/fa6"

interface Pin {
  id: string
  title: string
  author: {
    name: string
    avatar: string
  }
  board: string
  image: string
  heightClass: string
  likes: number
  saves: number
  tags: string[]
}

const initialPins: Pin[] = [
  {
    id: "pin-1",
    title: "QuantumPay AI Banking Terminal — Glassmorphism HUD",
    author: {
      name: "Abhinav Birajdar",
      avatar: "/images/profile-image-4.png"
    },
    board: "Futuristic Fintech",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=80",
    heightClass: "h-96",
    likes: 1240,
    saves: 480,
    tags: ["UI", "Glassmorphism", "Fintech", "Dark Mode"]
  },
  {
    id: "pin-2",
    title: "Organic 3D Fluid Typography & Kinetic Specimen",
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    board: "3D Aesthetics",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=700&auto=format&fit=crop&q=80",
    heightClass: "h-72",
    likes: 890,
    saves: 310,
    tags: ["3D", "Typography", "Fluid"]
  },
  {
    id: "pin-3",
    title: "Nova Design System Component Architecture & Auto-layout",
    author: {
      name: "Abhinav Birajdar",
      avatar: "/images/profile-image-4.png"
    },
    board: "Design Systems",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&auto=format&fit=crop&q=80",
    heightClass: "h-80",
    likes: 2150,
    saves: 940,
    tags: ["Figma", "Design System", "Tokens"]
  },
  {
    id: "pin-4",
    title: "Cyberpunk Holographic Interface & Spatial Layout",
    author: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    board: "Sci-Fi HUD",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&auto=format&fit=crop&q=80",
    heightClass: "h-64",
    likes: 670,
    saves: 230,
    tags: ["AI", "Cyberpunk", "HUD"]
  },
  {
    id: "pin-5",
    title: "Minimalist Botanical Editorial & Packaging Layout",
    author: {
      name: "Sophie Chen",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
    },
    board: "Branding & Print",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=700&auto=format&fit=crop&q=80",
    heightClass: "h-96",
    likes: 1490,
    saves: 620,
    tags: ["Minimalist", "Editorial", "Print"]
  },
  {
    id: "pin-6",
    title: "Sphere 3D Interactive Spatial Canvas & WebGL Audio Reactor",
    author: {
      name: "Abhinav Birajdar",
      avatar: "/images/profile-image-4.png"
    },
    board: "Creative Tech",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=80",
    heightClass: "h-80",
    likes: 3100,
    saves: 1420,
    tags: ["WebGL", "Three.js", "Audio", "Interactive"]
  }
]

export default function PinsPage() {
  const [pins, setPins] = useState(initialPins)
  const [search, setSearch] = useState("")
  const [savedPins, setSavedPins] = useState<Record<string, boolean>>({})
  const [activeBoardModal, setActiveBoardModal] = useState<string | null>(null)

  const handleSaveToBoard = (pinId: string, e: React.MouseEvent) => {
    e.preventDefault()
    setSavedPins((prev) => ({ ...prev, [pinId]: !prev[pinId] }))
  }

  const filteredPins = pins.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      p.board.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Banner */}
      <div className="border-b border-white/10 bg-slate-900/40 backdrop-blur-md px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-pink-400 mb-2">
                <FaThumbtack className="text-pink-400" />
                <span>Visual Pinboard Feed</span>
              </div>
              <h1 className="text-2xl font-extrabold sm:text-4xl text-white">
                Discover & Collect <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">Creative Pins</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Curate visual references, color palettes, micro-interactions, and moodboards from creators around the globe.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/boards"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <FaLayerGroup className="text-pink-400" />
                <span>My Boards</span>
              </Link>
              <Link
                href="/moodboards"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110"
              >
                <FaPlus className="text-xs" />
                <span>Create Moodboard</span>
              </Link>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-6 relative max-w-xl">
            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search visual pins, color palettes, design aesthetics..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 backdrop-blur-md focus:border-[#ff4b6e] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Masonry Pin Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
          {filteredPins.map((pin) => {
            const isSaved = !!savedPins[pin.id]
            return (
              <div
                key={pin.id}
                className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl transition-all hover:border-[#ff4b6e]/50 hover:shadow-2xl"
              >
                {/* Image & Overlay */}
                <div className={`relative w-full ${pin.heightClass} overflow-hidden`}>
                  <Image
                    src={pin.image}
                    alt={pin.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top action buttons (visible on hover) */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                      {pin.board}
                    </span>

                    <button
                      onClick={(e) => handleSaveToBoard(pin.id, e)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-md transition-all ${
                        isSaved
                          ? "bg-emerald-500 text-white"
                          : "bg-[#ff4b6e] text-white hover:brightness-110"
                      }`}
                    >
                      {isSaved ? <FaCheck /> : <FaThumbtack />}
                      <span>{isSaved ? "Saved" : "Save Pin"}</span>
                    </button>
                  </div>

                  {/* Bottom quick actions */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/pins/${pin.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md hover:bg-white/30"
                    >
                      <span>View Detail</span>
                      <FaArrowUpRightFromSquare className="text-[9px]" />
                    </Link>

                    <div className="flex items-center gap-1 text-[11px] text-white/90">
                      <FaHeart className="text-pink-400 text-xs" />
                      <span>{pin.likes}</span>
                    </div>
                  </div>
                </div>

                {/* Pin Info Below Image */}
                <div className="p-3">
                  <Link href={`/pins/${pin.id}`} className="hover:text-pink-400 transition-colors">
                    <h3 className="line-clamp-2 text-xs font-bold leading-snug text-white">
                      {pin.title}
                    </h3>
                  </Link>

                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative h-6 w-6 rounded-full overflow-hidden border border-white/20">
                        <Image src={pin.author.avatar} alt={pin.author.name} fill sizes="24px" className="object-cover" />
                      </div>
                      <span className="text-[11px] text-slate-300 font-medium truncate max-w-[110px]">
                        {pin.author.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <FaThumbtack className="text-pink-400" />
                      <span>{pin.saves}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
