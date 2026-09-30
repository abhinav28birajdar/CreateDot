"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaLayerGroup,
  FaArrowRight,
  FaWandMagicSparkles,
  FaStar,
  FaFire,
  FaArrowUpRightFromSquare,
  FaCompass,
} from "react-icons/fa6"

const CATEGORY_ITEMS = [
  {
    id: "ui-ux",
    title: "UI/UX & Product Design",
    description: "Web apps, mobile interfaces, design systems, and responsive wireframes.",
    count: "14,200+ Projects",
    creators: "3,800 Designers",
    color: "from-blue-500/20 via-indigo-500/10 to-transparent",
    accent: "text-blue-400",
    border: "hover:border-blue-500/50",
    tags: ["Figma", "Design Systems", "Mobile", "SaaS", "Dashboard"],
  },
  {
    id: "3d-spatial",
    title: "3D Spatial & Motion",
    description: "Spline interactive scenes, Three.js shaders, AR/VR spatial models, and Cinema4D.",
    count: "7,800+ Projects",
    creators: "1,950 Artists",
    color: "from-purple-500/20 via-pink-500/10 to-transparent",
    accent: "text-purple-400",
    border: "hover:border-purple-500/50",
    tags: ["Blender", "Three.js", "WebXR", "Spline", "Animation"],
  },
  {
    id: "branding",
    title: "Brand Identity & Typography",
    description: "Visual systems, logomarks, editorial packaging, and bespoke typefaces.",
    count: "9,600+ Projects",
    creators: "2,400 Directors",
    color: "from-rose-500/20 via-amber-500/10 to-transparent",
    accent: "text-rose-400",
    border: "hover:border-rose-500/50",
    tags: ["Typography", "Guidelines", "Packaging", "Art Direction"],
  },
  {
    id: "dev-engineering",
    title: "Design Engineering & React",
    description: "Pixel-perfect Tailwind UI, Next.js templates, micro-interactions, and code tokens.",
    count: "6,400+ Projects",
    creators: "1,700 Engineers",
    color: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accent: "text-emerald-400",
    border: "hover:border-emerald-500/50",
    tags: ["React", "TailwindCSS", "Next.js", "TypeScript", "Framer Motion"],
  },
  {
    id: "illustration",
    title: "Digital Art & Illustration",
    description: "Vector iconography, narrative scenes, editorial graphics, and 2D character craft.",
    count: "11,300+ Projects",
    creators: "3,100 Illustrators",
    color: "from-amber-500/20 via-orange-500/10 to-transparent",
    accent: "text-amber-400",
    border: "hover:border-amber-500/50",
    tags: ["Procreate", "Vector", "Editorial", "Characters"],
  },
  {
    id: "ai-workflows",
    title: "AI Creative & Generative",
    description: "Autonomous prompt pipelines, AI case studies, synthetic models, and copilot flows.",
    count: "4,100+ Projects",
    creators: "980 Technologists",
    color: "from-teal-500/20 via-cyan-500/10 to-transparent",
    accent: "text-teal-400",
    border: "hover:border-teal-500/50",
    tags: ["Prompt Engine", "Midjourney", "ComfyUI", "Studio AI"],
  },
]

export default function CategoriesPage() {
  const [selectedTag, setSelectedTag] = useState("All")

  const allTags = ["All", "Figma", "React", "Design Systems", "WebXR", "Three.js", "Typography"]

  const filteredCategories = CATEGORY_ITEMS.filter((cat) =>
    selectedTag === "All" ? true : cat.tags.includes(selectedTag)
  )

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-rose-500 selection:text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <FaLayerGroup className="text-xs" />
              Creative Guilds
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Explore Creative Categories
            </h1>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
              Discover curated projects, elite specialists, and creative benchmarks classified across top creative domains.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <FaCompass className="text-xs text-rose-400" />
              Explore All Works
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedTag === tag
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className={`group relative rounded-3xl bg-[#0D121F] border border-slate-800/80 p-6 flex flex-col justify-between transition-all duration-300 ${cat.border} hover:-translate-y-1 shadow-xl`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${cat.accent}`}>
                    {cat.count}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {cat.creators}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white group-hover:text-rose-400 transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {cat.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cat.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800/60 text-slate-300 border border-slate-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <Link
                  href={`/explore?category=${encodeURIComponent(cat.title)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 group-hover:text-white transition-colors"
                >
                  <span>Browse Showcase</span>
                  <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/hire?domain=${encodeURIComponent(cat.title)}`}
                  className="text-[11px] text-slate-400 hover:text-white font-medium"
                >
                  Hire Talent
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
