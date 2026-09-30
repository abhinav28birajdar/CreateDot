"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaBriefcase,
  FaStar,
  FaClock,
  FaShieldHalved,
  FaArrowRight,
  FaCheck,
  FaWandMagicSparkles,
} from "react-icons/fa6"

const SERVICES = [
  {
    id: "srv-design-system",
    title: "Multi-Brand Design System & Token Parity",
    creator: "Abhinav",
    avatar: "/images/profile-image-4.png",
    rating: 5.0,
    reviews: 42,
    startingPrice: "$3,800",
    deliveryTime: "10-14 days",
    description: "Production-ready token architecture across Figma and Tailwind/React with zero visual debt.",
    deliverables: ["Figma Component Library", "Tailwind Token Export", "React Component Parity", "Interactive Storybook"],
    category: "Design Systems",
  },
  {
    id: "srv-spatial-3d",
    title: "Interactive 3D WebGL & Spline Spatial Hero",
    creator: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4.9,
    reviews: 31,
    startingPrice: "$2,900",
    deliveryTime: "7-10 days",
    description: "Hardware-accelerated 3D spatial scenes with orbit damping, custom shaders, and WebXR hooks.",
    deliverables: ["Three.js / Spline Canvas", "Shader Optimization", "Responsive Viewport Hooks", "60 FPS Guarantee"],
    category: "3D Spatial",
  },
  {
    id: "srv-fintech-ai",
    title: "Autonomous AI Banking & SaaS Product UI",
    creator: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: 4.98,
    reviews: 58,
    startingPrice: "$4,500",
    deliveryTime: "14 days",
    description: "High-conversion financial dashboard with glassmorphism, accessibility contrast, and micro-interactions.",
    deliverables: ["Complete User Flows", "WCAG AAA Compliance", "Interactive Prototype", "Developer Handoff"],
    category: "UI/UX Design",
  },
  {
    id: "srv-brand-bible",
    title: "Full Brand Identity System & Guidelines Bible",
    creator: "Aria Takahashi",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 4.95,
    reviews: 29,
    startingPrice: "$3,200",
    deliveryTime: "10 days",
    description: "Distinct visual language, custom typography pairings, iconography library, and comprehensive brand guide.",
    deliverables: ["Vector Logo Suite", "Typography Matrix", "Color Token Scales", "80-Page Brand Bible PDF"],
    category: "Branding",
  },
]

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", "Design Systems", "3D Spatial", "UI/UX Design", "Branding"]

  const filtered = SERVICES.filter((s) =>
    activeCategory === "All" ? true : s.category === activeCategory
  )

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-rose-500 selection:text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FaBriefcase className="text-xs" />
              Creative Services
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Pre-Packaged Creative Services
            </h1>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
              Work with verified design engineers and creative technologists with upfront pricing, milestones, and escrow protection.
            </p>
          </div>

          <Link
            href="/post-a-job"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#FF6B6B] hover:bg-[#F05555] text-white shadow-lg shadow-[#FF6B6B]/25 transition"
          >
            <span>Custom Project Brief</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === c
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="rounded-3xl bg-[#0D121F] border border-slate-800 p-6 flex flex-col justify-between space-y-6 hover:border-emerald-500/40 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <FaStar className="text-xs" />
                    <span>{service.rating}</span>
                    <span className="text-slate-500 font-normal">({service.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Scope & Deliverables:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    {service.deliverables.map((del) => (
                      <span key={del} className="flex items-center gap-1.5">
                        <FaCheck className="text-emerald-400 text-[10px] flex-shrink-0" />
                        <span className="truncate">{del}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Creator bar & Price */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={service.avatar}
                    alt={service.creator}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{service.creator}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1">
                      <FaClock className="text-[9px]" /> {service.deliveryTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Starting at</span>
                    <span className="text-lg font-black text-white">{service.startingPrice}</span>
                  </div>

                  <Link
                    href={`/checkout?service=${service.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 transition-all"
                  >
                    Order Service
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
