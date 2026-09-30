"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import {
  FaArrowLeft,
  FaPlus,
  FaShareNodes,
  FaLock,
  FaGlobe,
  FaUsers,
  FaEllipsis,
  FaThumbtack,
  FaTrashCan
} from "react-icons/fa6"

export default function BoardDetailPage() {
  const params = useParams()
  const boardId = (params?.id as string) || "board-1"

  const [activeSection, setActiveSection] = useState("All Sections")
  const sections = ["All Sections", "Mobile Flows", "Design Tokens", "Typography Specimens", "Iconography"]

  const [pins, setPins] = useState([
    {
      id: "pin-1",
      title: "QuantumPay AI Banking Terminal — Glassmorphism HUD",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
      section: "Mobile Flows"
    },
    {
      id: "pin-2",
      title: "Organic 3D Fluid Typography & Kinetic Specimen",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=80",
      section: "Typography Specimens"
    },
    {
      id: "pin-3",
      title: "Nova Design System Component Architecture & Auto-layout",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80",
      section: "Design Tokens"
    },
    {
      id: "pin-4",
      title: "Cyberpunk Holographic Interface & Spatial Layout",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80",
      section: "Mobile Flows"
    }
  ])

  const filteredPins = pins.filter((p) => activeSection === "All Sections" || p.section === activeSection)

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Header */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/boards"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-4 transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to All Boards</span>
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] text-slate-400">
                  Public Board
                </span>
                <span className="text-xs text-pink-400 font-bold">{pins.length} Pins</span>
              </div>
              <h1 className="text-2xl font-extrabold sm:text-4xl text-white">
                Futuristic Fintech & HUDs
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Glassmorphism user interfaces, autonomous banking flows, and neon terminal designs curated by Abhinav Birajdar.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/pins"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110"
              >
                <FaPlus className="text-xs" />
                <span>Add Pins</span>
              </Link>
            </div>
          </div>

          {/* Section filter tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeSection === sec
                    ? "bg-[#ff4b6e] text-white shadow-md shadow-pink-500/20"
                    : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pins in Board Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPins.map((pin) => (
            <div
              key={pin.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all hover:border-[#ff4b6e]/50"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950">
                <Image
                  src={pin.image}
                  alt={pin.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center">
                  <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] text-white backdrop-blur-md">
                    {pin.section}
                  </span>
                  <Link
                    href={`/pins/${pin.id}`}
                    className="rounded bg-[#ff4b6e] px-2.5 py-1 text-[11px] font-bold text-white hover:brightness-110"
                  >
                    View
                  </Link>
                </div>
              </div>
              <div className="p-3">
                <h3 className="line-clamp-1 text-xs font-semibold text-white">{pin.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
