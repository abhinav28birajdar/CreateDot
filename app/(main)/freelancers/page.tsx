"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaUserCheck,
  FaStar,
  FaLocationDot,
  FaCircleCheck,
  FaArrowRight,
  FaSliders,
  FaShieldHalved,
  FaComments,
} from "react-icons/fa6"
import { toast } from "sonner"

const FREELANCERS = [
  {
    id: "f-abhinav",
    name: "Abhinav",
    handle: "@abhinav",
    avatar: "/images/profile-image-4.png",
    role: "Principal Creative Technologist & Product Architect",
    rate: "$140 / hr",
    rating: 5.0,
    reviews: 64,
    location: "San Francisco, CA",
    availability: "Available Next Week",
    skills: ["UI/UX Design", "3D Spatial Engine", "Design Systems", "React", "TailwindCSS"],
    bio: "Specializing in zero-bloat component architectures, autonomous AI banking workflows, and interactive 3D spatial experiences.",
    verified: true,
  },
  {
    id: "f-elena",
    name: "Elena Rostova",
    handle: "@elenarostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    role: "Senior Fintech & Web3 Product Designer",
    rate: "$125 / hr",
    rating: 4.96,
    reviews: 48,
    location: "London, UK",
    availability: "Available Now",
    skills: ["Figma", "User Flows", "Prototyping", "Design Ops"],
    bio: "Designing high-trust crypto treasuries, cross-border payment flows, and responsive desktop applications.",
    verified: true,
  },
  {
    id: "f-marcus",
    name: "Marcus Chen",
    handle: "@marcus_3d",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    role: "3D Motion & WebXR Specialist",
    rate: "$110 / hr",
    rating: 4.92,
    reviews: 36,
    location: "Vancouver, Canada",
    availability: "Part-time Available",
    skills: ["Three.js", "Spline", "Blender", "Shader Programming"],
    bio: "Translating static brand aesthetics into tactile, interactive 3D geometry engine experiences for web and AR/VR.",
    verified: true,
  },
  {
    id: "f-aria",
    name: "Aria Takahashi",
    handle: "@ariatakahashi",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    role: "Brand Identity Director & Type Specialist",
    rate: "$130 / hr",
    rating: 4.98,
    reviews: 52,
    location: "Tokyo / Remote",
    availability: "Available in 2 Weeks",
    skills: ["Brand Systems", "Custom Typography", "Packaging", "Art Direction"],
    bio: "Crafting iconic visual languages for next-generation hardware and software brands globally.",
    verified: true,
  },
]

export default function FreelancersPage() {
  const [skillFilter, setSkillFilter] = useState("All")

  const skills = ["All", "UI/UX Design", "3D Spatial Engine", "Design Systems", "React", "Three.js", "Brand Systems"]

  const filtered = FREELANCERS.filter((f) =>
    skillFilter === "All" ? true : f.skills.includes(skillFilter)
  )

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-rose-500 selection:text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <FaUserCheck className="text-xs" />
              Verified Freelancers
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Hire Elite Independent Talent
            </h1>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
              Pre-vetted freelance designers, 3D artists, and creative technologists ready to plug directly into your roadmap.
            </p>
          </div>

          <Link
            href="/post-a-job"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#FF6B6B] hover:bg-[#F05555] text-white shadow-lg shadow-[#FF6B6B]/25 transition"
          >
            <span>Post a Hiring Brief</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Skill Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {skills.map((s) => (
            <button
              key={s}
              onClick={() => setSkillFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                skillFilter === s
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Freelancers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((freelancer, idx) => (
            <motion.div
              key={freelancer.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="p-6 rounded-3xl bg-[#0D121F] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-rose-500/40"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-lg font-bold text-white">{freelancer.name}</h3>
                        {freelancer.verified && (
                          <FaCircleCheck className="text-xs text-rose-500" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-mono">{freelancer.handle}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <FaLocationDot className="text-[10px]" /> {freelancer.location}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-emerald-400">{freelancer.rate}</span>
                    <div className="flex items-center gap-1 text-xs text-amber-400 justify-end mt-0.5">
                      <FaStar className="text-[10px]" />
                      <span className="font-bold">{freelancer.rating}</span>
                      <span className="text-slate-500">({freelancer.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-rose-400">{freelancer.role}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{freelancer.bio}</p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {freelancer.skills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {freelancer.availability}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/profile/${freelancer.handle.replace('@', '')}`}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  >
                    View Portfolio
                  </Link>

                  <button
                    onClick={() => toast.success(`Inquiry sent to ${freelancer.name}! We'll connect you directly.`)}
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#FF6B6B] hover:bg-[#F05555] text-white shadow-md shadow-[#FF6B6B]/20 transition-all"
                  >
                    Hire Specialist
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
