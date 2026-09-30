"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  FaBriefcase,
  FaStar,
  FaFilter,
  FaMagnifyingGlass,
  FaBolt,
  FaCheck,
  FaHeart,
  FaRegHeart,
  FaPlus,
  FaArrowRight,
  FaShieldHalved,
  FaClock,
  FaGem,
  FaSliders,
  FaLayerGroup
} from "react-icons/fa6"

interface Gig {
  id: string
  title: string
  seller: {
    name: string
    avatar: string
    badge: string
    level: string
  }
  category: string
  rating: number
  reviewCount: number
  price: number
  deliveryDays: number
  coverImage: string
  featured?: boolean
  tags: string[]
}

const initialGigs: Gig[] = [
  {
    id: "gig-1",
    title: "I will design an ultra-modern SaaS UI/UX design system in Figma",
    seller: {
      name: "Abhinav Birajdar",
      avatar: "/images/profile-image-4.png",
      badge: "Top Rated Plus",
      level: "Studio Pro"
    },
    category: "Design",
    rating: 5.0,
    reviewCount: 142,
    price: 350,
    deliveryDays: 3,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    featured: true,
    tags: ["Figma", "UI/UX", "Design System", "NextGen"]
  },
  {
    id: "gig-2",
    title: "I will build a high-performance Next.js 15 web app with TailwindCSS and Motion",
    seller: {
      name: "Abhinav Birajdar",
      avatar: "/images/profile-image-4.png",
      badge: "Verified Engineer",
      level: "Level 2"
    },
    category: "Development",
    rating: 4.9,
    reviewCount: 98,
    price: 490,
    deliveryDays: 5,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    featured: true,
    tags: ["Next.js", "React", "TypeScript", "Tailwind"]
  },
  {
    id: "gig-3",
    title: "I will create a 3D animated hero scene with Three.js and Spline",
    seller: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      badge: "Rising Star",
      level: "Level 1"
    },
    category: "3D & Motion",
    rating: 4.9,
    reviewCount: 47,
    price: 280,
    deliveryDays: 4,
    coverImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
    tags: ["3D", "Spline", "Web3", "Animation"]
  },
  {
    id: "gig-4",
    title: "I will engineer a generative AI prompt pipeline and autonomous agent API",
    seller: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      badge: "AI Specialist",
      level: "Pro Creator"
    },
    category: "AI & Data",
    rating: 5.0,
    reviewCount: 63,
    price: 600,
    deliveryDays: 7,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    tags: ["OpenAI", "Gemini", "Agents", "Python"]
  },
  {
    id: "gig-5",
    title: "I will design an unforgettable luxury brand identity and typography guide",
    seller: {
      name: "Sophie Chen",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
      badge: "Top Rated",
      level: "Studio Pro"
    },
    category: "Branding",
    rating: 4.9,
    reviewCount: 112,
    price: 420,
    deliveryDays: 4,
    coverImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80",
    tags: ["Branding", "Logo", "Typography", "Packaging"]
  },
  {
    id: "gig-6",
    title: "I will conduct comprehensive WCAG heuristic audits and usability testing",
    seller: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      badge: "Certified UX",
      level: "Level 2"
    },
    category: "Design",
    rating: 4.8,
    reviewCount: 39,
    price: 190,
    deliveryDays: 2,
    coverImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    tags: ["UX Audit", "Accessibility", "Research"]
  }
]

const categories = ["All Categories", "Design", "Development", "3D & Motion", "AI & Data", "Branding"]

export default function GigsCatalogPage() {
  const [activeCategory, setActiveCategory] = useState("All Categories")
  const [searchQuery, setSearchQuery] = useState("")
  const [maxPrice, setMaxPrice] = useState<number>(1000)
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({})

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredGigs = initialGigs.filter((gig) => {
    const matchesCategory = activeCategory === "All Categories" || gig.category === activeCategory
    const matchesSearch =
      gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesPrice = gig.price <= maxPrice
    return matchesCategory && matchesSearch && matchesPrice
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Banner */}
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#ff4b6e]/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-pink-400 backdrop-blur-md">
                <FaBolt className="text-pink-400" />
                <span>CreateDOT Verified Gigs & Services</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                On-Demand <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">Creative Gigs</span>
              </h1>
              <p className="max-w-2xl text-slate-400 text-sm sm:text-base">
                Commission pre-packaged creative services from elite verified designers, engineers, and creators. Clear deliverables, instant escrow protection, and rapid turnaround.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/gigs/new"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-5 py-3 font-semibold text-white shadow-lg shadow-[#ff4b6e]/20 transition-all hover:brightness-110 hover:shadow-pink-500/30"
              >
                <FaPlus className="text-sm" />
                <span>Create a Gig</span>
              </Link>
              <Link
                href="/orders"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
              >
                <FaBriefcase className="text-sm text-pink-400" />
                <span>My Orders</span>
              </Link>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 grid gap-4 md:grid-cols-12">
            <div className="relative md:col-span-8">
              <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gigs by service, keyword, or creator (e.g. Figma, Next.js, 3D)..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-all focus:border-[#ff4b6e] focus:bg-white/10 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 md:col-span-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
              <FaSliders className="text-pink-400" />
              <div className="flex-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Max Budget</span>
                  <span className="font-semibold text-white">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#ff4b6e] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#ff4b6e] text-white shadow-md shadow-[#ff4b6e]/20"
                    : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-400">
            Showing <span className="font-semibold text-white">{filteredGigs.length}</span> curated gigs
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <FaShieldHalved className="text-emerald-400" />
            <span>Escrow Protected & Money-back Guarantee</span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGigs.map((gig) => (
            <motion.div
              key={gig.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl transition-all hover:border-[#ff4b6e]/40 hover:shadow-xl hover:shadow-[#ff4b6e]/10"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <Image
                  src={gig.coverImage}
                  alt={gig.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                
                {gig.featured && (
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black shadow-md">
                    <FaGem className="text-[9px]" />
                    Featured
                  </div>
                )}

                <button
                  onClick={(e) => toggleBookmark(gig.id, e)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-[#ff4b6e] hover:text-white"
                >
                  {bookmarked[gig.id] ? <FaHeart className="text-[#ff4b6e]" /> : <FaRegHeart />}
                </button>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                {/* Creator info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/15">
                    <Image
                      src={gig.seller.avatar}
                      alt={gig.seller.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-xs font-semibold text-white">{gig.seller.name}</p>
                      <span className="rounded bg-pink-500/10 px-1.5 py-0.2 text-[9px] font-medium text-pink-400 border border-pink-500/20">
                        {gig.seller.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{gig.seller.badge}</p>
                  </div>
                </div>

                {/* Gig Title */}
                <Link href={`/gigs/${gig.id}`} className="group-hover:text-pink-400 transition-colors">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                    {gig.title}
                  </h3>
                </Link>

                {/* Rating & Reviews */}
                <div className="mt-3 flex items-center gap-1.5 text-xs">
                  <FaStar className="text-amber-400" />
                  <span className="font-bold text-white">{gig.rating.toFixed(1)}</span>
                  <span className="text-slate-500">({gig.reviewCount})</span>
                  <span className="mx-2 text-slate-700">•</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <FaClock className="text-slate-500 text-[10px]" />
                    <span>{gig.deliveryDays}d delivery</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {gig.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price & Action footer */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">Starting at</span>
                    <p className="text-lg font-extrabold text-white">${gig.price}</p>
                  </div>
                  <Link
                    href={`/gigs/${gig.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-pink-500/40 bg-pink-500/10 px-3 py-1.5 text-xs font-semibold text-pink-400 transition-all hover:bg-[#ff4b6e] hover:text-white"
                  >
                    <span>View Gig</span>
                    <FaArrowRight className="text-[10px]" />
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
