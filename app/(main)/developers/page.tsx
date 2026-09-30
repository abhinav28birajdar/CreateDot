"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaCode,
  FaTerminal,
  FaGithub,
  FaStar,
  FaCircleCheck,
  FaArrowRight,
  FaLaptopCode,
} from "react-icons/fa6"
import { toast } from "sonner"

const DEVELOPERS = [
  {
    id: "dev-abhinav",
    name: "Abhinav",
    handle: "@abhinav",
    avatar: "/images/profile-image-4.png",
    stack: "Full-Stack Design Engineer & Next.js Architect",
    skills: ["React 19", "Next.js 15", "TypeScript", "TailwindCSS", "WebGL", "Supabase"],
    projectsBuilt: "48+ Web Apps",
    githubStars: "1.8k",
    rate: "$140 / hr",
    bio: "Bridging tactile Figma aesthetics into ultra-fast React TSX components, zero-runtime tokens, and realtime web apps.",
  },
  {
    id: "dev-kai",
    name: "Kai Tanaka",
    handle: "@kai_webgl",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    stack: "Creative Technologist & Shader Engineer",
    skills: ["Three.js", "GLSL Shaders", "WebXR", "WebGPU", "Canvas API"],
    projectsBuilt: "34+ Spatial Sites",
    githubStars: "3.2k",
    rate: "$130 / hr",
    bio: "Crafting bespoke 3D browser worlds, kinetic typography shaders, and spatial interactive experiences.",
  },
  {
    id: "dev-sophia",
    name: "Sophia Zhang",
    handle: "@sophia_ui",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    stack: "Design System Engineer & Micro-interactions",
    skills: ["Framer Motion", "TailwindCSS", "Radix UI", "CSS Architecture"],
    projectsBuilt: "26+ Systems",
    githubStars: "940",
    rate: "$120 / hr",
    bio: "Obsessed with accessibility, buttery 60 FPS transitions, spring physics, and keyboard navigation parity.",
  },
]

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-rose-500 selection:text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FaLaptopCode className="text-xs" />
              Creative Developers
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Design Engineers & Developers
            </h1>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
              Engineers who understand visual craft. Hire developers who execute Figma prototypes into clean React code without loss of fidelity.
            </p>
          </div>

          <Link
            href="/workflows/instant-code"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 transition"
          >
            <span>Try Instant Code Engine</span>
            <FaCode className="text-xs" />
          </Link>
        </div>

        {/* Developers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEVELOPERS.map((dev, idx) => (
            <motion.div
              key={dev.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="p-6 rounded-3xl bg-[#0D121F] border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={dev.avatar}
                    alt={dev.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-white">{dev.name}</h3>
                      <FaCircleCheck className="text-xs text-indigo-400" />
                    </div>
                    <p className="text-xs text-slate-400 font-mono">{dev.handle}</p>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5">{dev.rate}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-indigo-300">{dev.stack}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{dev.bio}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dev.skills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  {dev.projectsBuilt}
                </span>

                <button
                  onClick={() => toast.success(`Contacting ${dev.name} for technical collaboration!`)}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-500 hover:bg-indigo-600 text-white shadow-md shadow-indigo-500/20 transition-all"
                >
                  Contact Dev
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
