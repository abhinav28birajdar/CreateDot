"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  FaWandMagicSparkles,
  FaImage,
  FaPalette,
  FaDownload,
  FaPlus,
  FaTrashCan,
  FaShareNodes,
  FaArrowsRotate,
  FaFolderOpen
} from "react-icons/fa6"

interface MoodCard {
  id: string
  title: string
  image: string
  color: string
  x: number
  y: number
  rotation: number
}

const sampleAssets = [
  { id: "a1", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80", color: "#FF4B6E", title: "Glass Neon Spec" },
  { id: "a2", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&auto=format&fit=crop&q=80", color: "#6366F1", title: "Fluid 3D Wave" },
  { id: "a3", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80", color: "#10B981", title: "Dark IDE Terminal" },
  { id: "a4", image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&auto=format&fit=crop&q=80", color: "#F59E0B", title: "Editorial Minimal" }
]

export default function MoodboardsStudioPage() {
  const [moodboardTitle, setMoodboardTitle] = useState("Quantum Kinetic Aesthetics 2026")
  const [boardItems, setBoardItems] = useState<MoodCard[]>([
    {
      id: "card-1",
      title: "Neon Interface HUD",
      image: sampleAssets[0]?.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
      color: "#FF4B6E",
      x: 30,
      y: 40,
      rotation: -3
    },
    {
      id: "card-2",
      title: "Three.js Waveform",
      image: sampleAssets[1]?.image || "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&auto=format&fit=crop&q=80",
      color: "#6366F1",
      x: 340,
      y: 20,
      rotation: 2
    },
    {
      id: "card-3",
      title: "Code Architecture",
      image: sampleAssets[2]?.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80",
      color: "#10B981",
      x: 160,
      y: 240,
      rotation: -1
    }
  ])

  const [activePalette, setActivePalette] = useState(["#0F172A", "#FF4B6E", "#6366F1", "#10B981", "#F59E0B"])

  const addAssetToCanvas = (asset: { id: string; image: string; color: string; title: string }) => {
    const newItem: MoodCard = {
      id: `card-${Date.now()}`,
      title: asset.title,
      image: asset.image,
      color: asset.color,
      x: Math.floor(Math.random() * 200) + 40,
      y: Math.floor(Math.random() * 150) + 40,
      rotation: Math.floor(Math.random() * 8) - 4
    }
    setBoardItems([...boardItems, newItem])
  }

  const removeItem = (id: string) => {
    setBoardItems(boardItems.filter((i) => i.id !== id))
  }

  const exportCanvas = () => {
    alert("Exporting high-resolution moodboard collage (PNG / 300 DPI)!")
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Studio Controls */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff4b6e]/20 text-[#ff4b6e]">
              <FaWandMagicSparkles />
            </div>
            <div>
              <input
                type="text"
                value={moodboardTitle}
                onChange={(e) => setMoodboardTitle(e.target.value)}
                className="bg-transparent text-sm font-bold text-white focus:outline-none focus:border-b border-[#ff4b6e]"
              />
              <p className="text-[11px] text-slate-400">Interactive Collage & Moodboard Canvas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCanvas}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110"
            >
              <FaDownload className="text-xs" />
              <span>Export Collage (PNG)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Asset Drawer (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <FaImage className="text-pink-400" />
                <span>Asset Staging Library</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">Click any visual snippet to spawn onto your active moodboard canvas.</p>

              <div className="grid grid-cols-2 gap-3">
                {sampleAssets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => addAssetToCanvas(asset)}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 text-left transition-all hover:border-[#ff4b6e]"
                  >
                    <Image src={asset.image} alt={asset.title} fill sizes="160px" className="object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-white truncate">
                      {asset.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatch palette generator */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <FaPalette className="text-pink-400" />
                <span>Palette Tokens</span>
              </h3>
              <div className="flex gap-2">
                {activePalette.map((color, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className="h-10 rounded-lg border border-white/15 shadow-inner" style={{ backgroundColor: color }} />
                    <span className="block mt-1 font-mono text-[9px] text-slate-400">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Freeform Canvas (Right 8 cols) */}
          <div className="lg:col-span-8">
            <div className="relative min-h-[580px] w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900/50 p-6 backdrop-blur-2xl shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <span className="text-xs font-medium text-slate-400">
                  Canvas: {boardItems.length} Element{boardItems.length > 1 ? "s" : ""} Placed
                </span>
                <span className="text-[11px] text-pink-400 font-semibold">Live Composition</span>
              </div>

              {/* Placed Elements */}
              <div className="relative h-[480px] w-full">
                {boardItems.map((item) => (
                  <motion.div
                    key={item.id}
                    drag
                    dragConstraints={{ left: 0, top: 0, right: 350, bottom: 250 }}
                    style={{
                      left: `${item.x}px`,
                      top: `${item.y}px`,
                      rotate: item.rotation
                    }}
                    className="absolute cursor-grab active:cursor-grabbing group overflow-hidden rounded-2xl border-2 border-white/20 bg-slate-950 p-2 shadow-2xl backdrop-blur-md w-56"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-2">
                      <Image src={item.image} alt={item.title} fill sizes="224px" className="object-cover" />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-slate-300 hover:bg-rose-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrashCan className="text-[10px]" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] font-bold text-white truncate max-w-[130px]">{item.title}</span>
                      <div className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: item.color }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
