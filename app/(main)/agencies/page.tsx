"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaBuilding,
  FaLocationDot,
  FaStar,
  FaAward,
  FaArrowRight,
  FaCircleCheck,
} from "react-icons/fa6"
import { toast } from "sonner"

const AGENCIES = [
  {
    id: "agency-monolith",
    name: "Monolith Interactive",
    location: "New York & San Francisco",
    tagline: "High-conviction product design and design engineering studio.",
    focus: ["SaaS & Fintech", "Enterprise Systems", "WebXR Experience"],
    teamSize: "12-25 people",
    rating: 5.0,
    awards: "9x Awwwards",
    minBudget: "$25,000+",
  },
  {
    id: "agency-aura",
    name: "Aura Creative Lab",
    location: "London & Berlin",
    tagline: "Bespoke brand identities and spatial web experiences for venture-backed founders.",
    focus: ["Brand Direction", "3D Motion", "Micro-interactions"],
    teamSize: "8-15 people",
    rating: 4.95,
    awards: "6x FWA",
    minBudget: "$18,000+",
  },
  {
    id: "agency-quantum",
    name: "Quantum Craft Studio",
    location: "Tokyo / Remote",
    tagline: "Crafting tactile design tokens and modern React UI engines.",
    focus: ["Design Systems", "Component Libraries", "Mobile Apps"],
    teamSize: "5-10 people",
    rating: 4.98,
    awards: "Staff Pick Guild",
    minBudget: "$15,000+",
  },
]

export default function AgenciesPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-rose-500 selection:text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FaBuilding className="text-xs" />
              Boutique Studios
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Design Agencies & Studios
            </h1>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
              Partner with award-winning creative agencies for end-to-end product development, multi-platform design systems, and brand launches.
            </p>
          </div>

          <Link
            href="/enterprise"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 transition font-semibold"
          >
            <span>Enterprise Agency Briefing</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Agencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AGENCIES.map((agency, idx) => (
            <motion.div
              key={agency.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="p-6 rounded-3xl bg-[#0D121F] border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-amber-400 font-bold flex items-center gap-1.5">
                    <FaAward className="text-xs" /> {agency.awards}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <FaStar className="text-xs" /> {agency.rating}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{agency.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <FaLocationDot className="text-[10px]" /> {agency.location}
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {agency.tagline}
                </p>

                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Core Disciplines</p>
                  <div className="flex flex-wrap gap-1.5">
                    {agency.focus.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded-md text-[10px] bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">Min. Engagement</span>
                  <span className="text-xs font-bold text-white">{agency.minBudget}</span>
                </div>

                <button
                  onClick={() => toast.success(`Studio inquiry dispatched to ${agency.name}!`)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all"
                >
                  Request Pitch
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
