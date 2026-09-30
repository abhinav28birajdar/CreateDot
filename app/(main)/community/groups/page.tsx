"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  FaUsers,
  FaPlus,
  FaLock,
  FaGlobe,
  FaComments,
  FaCalendarDays,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
  FaMagnifyingGlass,
  FaFire,
  FaShieldHalved
} from "react-icons/fa6"

interface CommunityGroup {
  id: string
  name: string
  category: string
  description: string
  membersCount: number
  postsCount: number
  privacy: "public" | "private"
  coverImage: string
  isJoined?: boolean
  tags: string[]
}

const initialGroups: CommunityGroup[] = [
  {
    id: "group-1",
    name: "Design Systems & Token Architecture",
    category: "UI/UX & Engineering",
    description: "Atomic components, Tailwind variables, Figma Tokens, and enterprise WCAG accessible system engineering.",
    membersCount: 4280,
    postsCount: 1420,
    privacy: "public",
    coverImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    isJoined: true,
    tags: ["Figma", "Design Tokens", "React", "Storybook"]
  },
  {
    id: "group-2",
    name: "Autonomous AI Agents & Creative Interfaces",
    category: "AI & Future Tech",
    description: "Designing the interaction patterns, feedback loops, and dynamic canvases for LLMs and multi-agent systems.",
    membersCount: 3120,
    postsCount: 980,
    privacy: "public",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    tags: ["Generative AI", "Agents", "Python", "UI/UX"]
  },
  {
    id: "group-3",
    name: "3D Spatial Web & WebGL Audio Labs",
    category: "3D & Motion",
    description: "Three.js, Spline, shaders, and real-time audio reactive spatial experiences for the next-generation web.",
    membersCount: 2650,
    postsCount: 710,
    privacy: "public",
    coverImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
    tags: ["Three.js", "Spline", "Shaders", "WebGL"]
  },
  {
    id: "group-4",
    name: "Fintech & High-Volume Trading Terminals",
    category: "Product Design",
    description: "Dark mode glassmorphism HUDs, liquidity charts, rapid trading workflows, and institutional banking.",
    membersCount: 1890,
    postsCount: 540,
    privacy: "private",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    tags: ["Fintech", "Crypto", "Data Viz", "Trading"]
  },
  {
    id: "group-5",
    name: "Boutique Creative Agency Founders",
    category: "Business & Retainers",
    description: "Contract negotiation, pricing strategies, client proposals, and scaling 6-figure remote design agencies.",
    membersCount: 1450,
    postsCount: 680,
    privacy: "private",
    coverImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80",
    tags: ["Agency", "Pricing", "Contracts", "Hiring"]
  }
]

export default function CommunityGroupsPage() {
  const [groups, setGroups] = useState<CommunityGroup[]>(initialGroups)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDesc, setNewGroupDesc] = useState("")
  const [newGroupPrivacy, setNewGroupPrivacy] = useState<"public" | "private">("public")

  const categories = ["All", "UI/UX & Engineering", "AI & Future Tech", "3D & Motion", "Product Design", "Business & Retainers"]

  const toggleJoin = (groupId: string) => {
    setGroups(
      groups.map((g) => {
        if (g.id === groupId) {
          const isNowJoined = !g.isJoined
          return {
            ...g,
            isJoined: isNowJoined,
            membersCount: isNowJoined ? g.membersCount + 1 : g.membersCount - 1
          }
        }
        return g
      })
    )
  }

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGroupName.trim()) {
      const newGroup: CommunityGroup = {
        id: `group-${Date.now()}`,
        name: newGroupName.trim(),
        category: "UI/UX & Engineering",
        description: newGroupDesc.trim() || "Creative community guild exploring modern design craft.",
        membersCount: 1,
        postsCount: 0,
        privacy: newGroupPrivacy,
        coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
        isJoined: true,
        tags: ["Community", "CreativeDOT"]
      }
      setGroups([newGroup, ...groups])
      setNewGroupName("")
      setNewGroupDesc("")
      setShowCreateModal(false)
    }
  }

  const filteredGroups = groups.filter((g) => {
    const matchesCategory = selectedCategory === "All" || g.category === selectedCategory
    const matchesSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase()) ||
      g.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Banner */}
      <div className="border-b border-white/10 bg-gradient-to-b from-purple-950/40 via-slate-950 to-slate-950 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-4 transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Community Feed</span>
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-400 mb-2">
                <FaUsers className="text-pink-400" />
                <span>Creative Guilds & Masterminds</span>
              </div>
              <h1 className="text-2xl font-extrabold sm:text-4xl text-white">Community Groups</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Collaborate with specialized peer groups, participate in design sprints, share critique, and attend private live sessions.
              </p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110 self-start sm:self-auto"
            >
              <FaPlus className="text-xs" />
              <span>Create a Group</span>
            </button>
          </div>

          {/* Search bar & filter pills */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guilds by name, tool, or topic..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-xs text-white placeholder-slate-500 backdrop-blur-md focus:border-[#ff4b6e] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-[#ff4b6e] text-white shadow-md shadow-pink-500/20"
                      : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGroups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl transition-all hover:border-[#ff4b6e]/40 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/8] w-full overflow-hidden bg-slate-950">
                  <Image
                    src={group.coverImage}
                    alt={group.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                      {group.privacy === "private" ? <FaLock className="text-[9px]" /> : <FaGlobe className="text-[9px]" />}
                      <span className="capitalize">{group.privacy}</span>
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-pink-400">
                    {group.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-pink-400 transition-colors">
                    {group.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {group.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {group.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 p-5 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <FaUsers className="text-slate-500" />
                    <strong>{group.membersCount.toLocaleString()}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaComments className="text-slate-500" />
                    <span>{group.postsCount} posts</span>
                  </span>
                </div>

                <button
                  onClick={() => toggleJoin(group.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                    group.isJoined
                      ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "bg-[#ff4b6e] text-white shadow-md shadow-pink-500/20 hover:brightness-110"
                  }`}
                >
                  {group.isJoined ? <FaCheck /> : <FaPlus className="text-[10px]" />}
                  <span>{group.isJoined ? "Joined" : "Join"}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-4">Create New Guild / Group</h2>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Guild Name</label>
                <input
                  type="text"
                  required
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="e.g. Generative UI Architects"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ff4b6e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newGroupDesc}
                  onChange={(e) => setNewGroupDesc(e.target.value)}
                  placeholder="What is this guild focused on?"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ff4b6e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Privacy</label>
                <select
                  value={newGroupPrivacy}
                  onChange={(e) => setNewGroupPrivacy(e.target.value as any)}
                  className="w-full rounded-xl border border-white/10 bg-slate-800 p-3 text-xs text-white focus:outline-none"
                >
                  <option value="public">Public (Open for anyone to join)</option>
                  <option value="private">Private (Application required)</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#ff4b6e] px-5 py-2 text-xs font-bold text-white hover:brightness-110"
                >
                  Launch Guild
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
