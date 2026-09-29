"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaCompass,
  FaMagnifyingGlass,
  FaWandMagicSparkles,
  FaComments,
  FaCode,
  FaHeart,
  FaStar,
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaBriefcase,
  FaCheck,
  FaLayerGroup,
  FaPalette,
  FaBolt,
  FaCube,
  FaShieldHalved,
  FaCircleCheck,
  FaClock,
} from "react-icons/fa6"

// --- Mock Data ---
const projects = [
  {
    id: "proj-demo-1",
    title: "QuantumPay — NextGen AI Banking App",
    desc: "Autonomous financial assistant with dark mode glassmorphism interface and micro-interactions.",
    date: "9/29/2026",
    status: "completed",
    author: "Abhinav",
    handle: "@abhinav",
    avatar: "/images/profile-image-4.png",
    likes: 1840,
    tags: ["Fintech", "Glassmorphism"],
    gradient: "from-[#0F172A] via-[#1E293B] to-[#334155]",
    art: "quantumpay",
  },
  {
    id: "proj-demo-2",
    title: "Sphere 3D — Geometric Spatial Studio",
    desc: "Interactive 3D geometry engine built for web experiences and AR/VR spatial devices.",
    date: "9/29/2026",
    status: "in_progress",
    author: "Abhinav",
    handle: "@abhinav",
    avatar: "/images/profile-image-4.png",
    likes: 1420,
    tags: ["3D Spatial", "AR/VR WebXR"],
    gradient: "from-[#1E1B4B] via-[#4338CA] to-[#6366F1]",
    art: "sphere3d",
  },
  {
    id: "proj-demo-3",
    title: "Nova Design System — Tokens & Multi-brand",
    desc: "Component architecture with variable color modes, semantic tokens, and React parity.",
    date: "9/29/2026",
    status: "completed",
    author: "Abhinav",
    handle: "@abhinav",
    avatar: "/images/profile-image-4.png",
    likes: 2150,
    tags: ["Design System", "Tokens & React"],
    gradient: "from-[#111827] via-[#0F766E] to-[#14B8A6]",
    art: "novasystem",
  },
]

const categories = [
  { name: "UI/UX Design", count: "14.2k projects", color: "bg-[#EBF0FF] hover:bg-[#DCE5FF] text-[#2F4478]", symbol: "✦" },
  { name: "Brand Identity", count: "9.6k projects", color: "bg-[#FFF0E6] hover:bg-[#FFE3D1] text-[#9A4C22]", symbol: "✳" },
  { name: "3D & Motion", count: "7.8k projects", color: "bg-[#F3EDFF] hover:bg-[#E8DCFF] text-[#5C458A]", symbol: "◒" },
  { name: "Typography", count: "5.1k projects", color: "bg-[#FFF7D6] hover:bg-[#FFEFAD] text-[#7A6318]", symbol: "⌘" },
  { name: "Illustration", count: "11.3k projects", color: "bg-[#E6F8F3] hover:bg-[#CEF2E7] text-[#246A59]", symbol: "◉" },
  { name: "Design Systems", count: "4.7k projects", color: "bg-[#FBEBF3] hover:bg-[#F7D8E7] text-[#86375F]", symbol: "▰" },
]

const stats = [
  { value: "54,000+", label: "Active Creators" },
  { value: "320,000+", label: "Works Showcased" },
  { value: "94", label: "Countries Represented" },
  { value: "$3.2M+", label: "Client Contracts Won" },
]

// --- Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function ModernHomePage() {
  const [likedProjects, setLikedProjects] = useState<string[]>([])

  const toggleLike = (id: string) => {
    setLikedProjects((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAF7F0] text-[#14161F] selection:bg-[#FF6B6B]/20 selection:text-[#FF6B6B]">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-40 -top-20 h-[580px] w-[580px] rounded-full bg-gradient-to-tr from-[#B6C2F7]/40 to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[15%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-[#FF9E9E]/30 via-[#FFE194]/25 to-transparent blur-[140px]" />

      {/* --- Sticky Glass Header --- */}
      <header className="sticky top-0 z-50 border-b border-[#14161F]/5 bg-[#FAF7F0]/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#14161F] text-white shadow-md shadow-[#14161F]/15"
            >
              <FaCompass className="h-5 w-5 text-[#FF6B6B]" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-[#14161F]">
                CreateDOT<span className="text-[#FF6B6B]">.</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#69728B]">
                Curated Guild
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 rounded-full border border-[#14161F]/6 bg-white/70 px-6 py-2 shadow-sm shadow-[#14161F]/5 backdrop-blur-md md:flex">
            <Link href="/feed" className="text-sm font-semibold text-[#576075] transition hover:text-[#14161F]">
              Feed
            </Link>
            <Link href="/explore" className="text-sm font-semibold text-[#576075] transition hover:text-[#14161F]">
              Discover
            </Link>
            <Link href="/workflows/smart-case-studies" className="flex items-center gap-1.5 text-sm font-semibold text-[#576075] transition hover:text-[#14161F]">
              <FaWandMagicSparkles className="text-xs text-[#FF6B6B]" />
              Studio AI
            </Link>
            <Link href="/jobs" className="flex items-center gap-1.5 text-sm font-semibold text-[#576075] transition hover:text-[#14161F]">
              Hiring
              <span className="rounded-full bg-[#10B981]/15 px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                Live
              </span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-bold text-[#14161F] transition hover:text-[#FF6B6B] sm:block"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#14161F] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#14161F]/15 transition hover:bg-[#2A3147] hover:shadow-lg"
            >
              <span>Join CreateDOT</span>
              <FaArrowRight className="h-3 w-3 text-[#FF6B6B]" />
            </Link>
          </div>
        </div>
      </header>

      {/* --- Main Hero Section --- */}
      <main>
        <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-10 lg:pt-24 lg:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            
            {/* Left Narrative Pitch */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="lg:col-span-7"
            >
              {/* Guild Tag */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full border border-[#14161F]/10 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-[#FF6B6B] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A5568]">
                  Spring Showcase 2026 · Live Submissions
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={fadeInUp}
                className="mt-6 text-4xl font-black tracking-tight text-[#14161F] sm:text-6xl sm:leading-[1.08] lg:text-7xl"
              >
                Where visionary craft finds its{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#FF6B6B] via-[#E25C80] to-[#7057BD] bg-clip-text text-transparent">
                    universe.
                  </span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute bottom-2 left-0 -z-0 h-3 bg-[#FFE185]/40 rounded-full"
                  />
                </span>
              </motion.h1>

              {/* Supporting Value Proposition */}
              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-2xl text-base leading-relaxed text-[#5A637A] sm:text-xl"
              >
                The modern home for designers, directors, and creative technologists. Showcase high-fidelity work, discover curated taste, and build client relationships without algorithm fatigue.
              </motion.p>

              {/* Dual Action CTAs */}
              <motion.div variants={fadeInUp} className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/signup"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#FF6B6B] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#FF6B6B]/25 transition hover:bg-[#F05555] hover:shadow-2xl hover:shadow-[#FF6B6B]/35 active:scale-95"
                >
                  <span>Claim Your Portfolio</span>
                  <FaArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </Link>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 rounded-full border border-[#14161F]/10 bg-white/70 px-7 py-4 text-sm font-bold text-[#14161F] shadow-sm backdrop-blur-md transition hover:bg-white hover:shadow-md"
                  >
                    <FaMagnifyingGlass className="h-3.5 w-3.5 text-[#7A839E]" />
                    <span>Explore Curated Archive</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Creator Avatars & Proof */}
              <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-4 pt-6 border-t border-[#14161F]/8">
                <div className="flex -space-x-3">
                  <img
                    src="/images/profile-image-4.png"
                    alt="Abhinav"
                    className="h-10 w-10 rounded-full border-2 border-[#FAF7F0] object-cover shadow-sm ring-1 ring-black/5"
                  />
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces",
                  ].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Creator"
                      className="h-10 w-10 rounded-full border-2 border-[#FAF7F0] object-cover shadow-sm ring-1 ring-black/5"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="h-3 w-3 text-[#FFB800]" />
                    ))}
                    <span className="text-xs font-bold text-[#14161F]">4.98/5</span>
                  </div>
                  <p className="text-xs font-medium text-[#647087]">
                    Featuring creator <span className="font-bold text-[#14161F]">Abhinav</span> & top builders
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual Bento Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:col-span-5"
            >
              {/* Floating Accents */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute -top-6 -right-3 z-20 flex items-center gap-2 rounded-2xl border border-white/80 bg-white/90 px-4 py-2.5 shadow-xl shadow-black/10 backdrop-blur-md"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#10B981] text-white">
                  <FaCheck className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#14161F]">New Contract Offer</p>
                  <p className="text-[10px] text-[#64748B]">$18,500 · Design System</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-4 z-20 flex items-center gap-2 rounded-full border border-white/80 bg-[#14161F] px-4 py-2 text-white shadow-xl shadow-[#14161F]/20"
              >
                <FaWandMagicSparkles className="h-3.5 w-3.5 text-[#FFE185]" />
                <span className="text-xs font-bold">Featured on CreateDOT Index</span>
              </motion.div>

              {/* Bento Card Grid */}
              <div className="grid grid-cols-12 gap-3.5 rounded-[36px] border border-white/60 bg-white/40 p-4 shadow-2xl shadow-[#384566]/10 backdrop-blur-xl sm:gap-4 sm:p-5">
                
                {/* Hero Tile 1: Studio Card */}
                <div className="group relative col-span-7 flex h-64 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#121829] to-[#252E4B] p-5 text-white shadow-md transition-all hover:shadow-lg">
                  <div className="flex items-center justify-between text-xs font-medium text-white/60">
                    <span className="tracking-wider">ABHINAV STUDIO</span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/90">2026</span>
                  </div>
                  <div className="my-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#8DA6FA]">Concept 08</span>
                    <h3 className="mt-1 text-3xl font-black leading-none tracking-tight">
                      KINETIC<br />
                      <span className="bg-gradient-to-r from-[#D7E2FF] to-[#FFB7B1] bg-clip-text text-transparent">
                        IDENTITY.
                      </span>
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-white/50">
                    <span>Art Direction</span>
                    <div className="h-6 w-6 rounded-full border-2 border-[#FF6B6B] flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-[#FF6B6B]" />
                    </div>
                  </div>
                </div>

                {/* Hero Tile 2: Typography Accent */}
                <div className="col-span-5 flex h-64 flex-col justify-between rounded-2xl bg-[#E8E4FF] p-5 text-[#352A68] shadow-sm">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6355A4]">Curated</span>
                  <div className="text-3xl font-black leading-[1.05] tracking-tight">
                    Shape<br />
                    ideas<br />
                    <span className="text-[#FF6B6B]">faster.</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span>42 Assets</span>
                    <span className="text-2xl">✳</span>
                  </div>
                </div>

                {/* Hero Tile 3: Sound study visualizer */}
                <div className="col-span-5 flex h-36 flex-col justify-between rounded-2xl bg-[#D2EFEB] p-4 text-[#1E5249]">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Spatial Audio</span>
                  <div className="flex h-12 items-end gap-1.5">
                    {[45, 90, 60, 100, 75, 40, 65, 80].map((h, idx) => (
                      <motion.span
                        key={idx}
                        animate={{ height: [`${h}%`, `${Math.max(20, (h + 30) % 100)}%`, `${h}%`] }}
                        transition={{ repeat: Infinity, duration: 1.2 + idx * 0.15, ease: "easeInOut" }}
                        className="w-full rounded-full bg-[#1F6B5F]"
                      />
                    ))}
                  </div>
                </div>

                {/* Hero Tile 4: Note Card */}
                <div className="col-span-7 flex h-36 flex-col justify-between rounded-2xl bg-[#FFE4DC] p-5 text-[#8F3C2C]">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Designer Note</span>
                    <FaWandMagicSparkles className="h-3.5 w-3.5 text-[#FF6B6B]" />
                  </div>
                  <p className="text-xl font-black leading-snug tracking-tight">
                    "Craft is in the invisible decisions."
                  </p>
                  <p className="text-xs font-medium text-[#AA5645]">— Abhinav</p>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Metric Counters Bar --- */}
        <section className="border-y border-[#14161F]/6 bg-white/50 backdrop-blur-md py-9">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center md:text-left"
                >
                  <p className="text-3xl font-black tracking-tight text-[#14161F] sm:text-4xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#677087]">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Curated Projects Grid (Real-time Abhinav Showcases) --- */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#FF6B6B]">
                Curator's Choice
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#14161F] sm:text-5xl">
                Real-Time Projects by Abhinav
              </h2>
            </div>
            <Link
              href="/feed"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#14161F] hover:text-[#FF6B6B] transition"
            >
              <span>Explore curated feed</span>
              <FaArrowUpRightFromSquare className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => {
              const isLiked = likedProjects.includes(project.id)
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="group relative flex flex-col bg-white rounded-3xl p-5 border border-[#14161F]/8 shadow-sm hover:shadow-2xl transition-all"
                >
                  {/* Card Image Art Canvas */}
                  <div
                    className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient} p-5 shadow-lg shadow-[#14161F]/5 transition-all duration-300 group-hover:-translate-y-1.5`}
                  >
                    {/* Art Simulation */}
                    <ProjectArtPreview type={project.art} />

                    {/* Top Action Tags */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                        {project.tags[0]}
                      </span>

                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          toggleLike(project.id)
                        }}
                        className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all active:scale-90 ${
                          isLiked ? "bg-[#FF6B6B] text-white" : "bg-white/80 text-[#14161F] hover:bg-white"
                        }`}
                      >
                        <FaHeart className={`h-3.5 w-3.5 ${isLiked ? "text-white" : "text-slate-800"}`} />
                      </button>
                    </div>

                    {/* Status Pill on Bottom Right */}
                    <div className="absolute bottom-3 right-3 z-10">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md ${
                          project.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}
                      >
                        {project.status === "completed" ? "✓ Completed" : "⚡ In Progress"}
                      </span>
                    </div>

                    {/* Hover Link */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="absolute inset-0 z-0"
                      aria-label={project.title}
                    />
                  </div>

                  {/* Card Details */}
                  <div className="mt-4 flex flex-col justify-between flex-1">
                    <div>
                      <Link href={`/projects/${project.id}`}>
                        <h3 className="font-bold text-base tracking-tight text-[#14161F] group-hover:text-[#FF6B6B] transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="mt-1 text-xs text-[#6B758E] line-clamp-2">
                        {project.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={project.avatar}
                          alt={project.author}
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#14161F]">{project.author}</p>
                          <p className="text-[10px] text-[#A2A9BD]">{project.date}</p>
                        </div>
                      </div>

                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 group-hover:bg-[#FF6B6B] group-hover:text-white transition-all"
                      >
                        <span>Demo</span>
                        <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>

        {/* --- AI Creative Suite (The 3 Workflows User Requested) --- */}
        <section className="relative overflow-hidden bg-[#111420] px-6 py-24 text-white lg:px-10 lg:py-32">
          {/* Background Ambient Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#7057BD]/25 blur-[120px]" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-[#FF6B6B]/20 blur-[130px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#A5B4FC]">
                <FaWandMagicSparkles className="h-3.5 w-3.5 text-[#FF6B6B]" />
                Intelligence for Craft
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
                More time creating. <br />Zero time wrestling layout.
              </h2>
              <p className="mt-4 text-base text-[#9DA7C2] sm:text-lg">
                Studio AI assists your visual storytelling without flattening your creative fingerprint.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: FaWandMagicSparkles,
                  badge: "Generative Portfolio",
                  title: "Smart Case Studies",
                  desc: "Paste your raw Figma frames or Dribbble shots; AI structures readable user flows and typography rationales in seconds.",
                  href: "/workflows/smart-case-studies",
                  accent: "from-[#FF6B6B] to-[#7057BD]",
                },
                {
                  icon: FaShieldHalved,
                  badge: "Critique Copilot",
                  title: "Heuristic Design Review",
                  desc: "Receive instant objective feedback on contrast ratios, typographic hierarchy, responsive flow, and visual balance.",
                  href: "/workflows/critique-copilot",
                  accent: "from-[#6366F1] to-[#EC4899]",
                },
                {
                  icon: FaCode,
                  badge: "Production Ready",
                  title: "Instant React & Tailwind",
                  desc: "Turn approved design mockups directly into clean, componentized React code with zero bloat.",
                  href: "/workflows/instant-code",
                  accent: "from-[#10B981] to-[#3B82F6]",
                },
              ].map((tool, idx) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-lg transition-all hover:border-[#FF6B6B]/40 hover:bg-white/[0.07]"
                >
                  <div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${tool.accent} text-white shadow-lg`}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <span className="mt-6 inline-block text-[11px] font-black uppercase tracking-wider text-[#A5B4FC]">
                      {tool.badge}
                    </span>
                    <h3 className="mt-1 text-xl font-bold text-white tracking-tight">{tool.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#94A0BF]">{tool.desc}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#FF6B6B] group-hover:text-white transition-colors">
                    <span>Explore Workflow</span>
                    <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --- Category Matrix --- */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-black uppercase tracking-widest text-[#FF6B6B]">
                Discover Your Domain
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#14161F] sm:text-5xl">
                Every medium. Every discipline.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5F6882]">
                Explore specialized collections curated weekly by our editorial panel. From micro-interactions to branding bibles.
              </p>
              <div className="mt-8">
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 rounded-full bg-[#14161F] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#2A3147] transition"
                >
                  <FaLayerGroup className="h-4 w-4" />
                  <span>Browse All Guilds</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-7">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`/explore?category=${encodeURIComponent(cat.name)}`}
                    className={`flex h-44 flex-col justify-between rounded-3xl p-5 transition-all shadow-sm ${cat.color}`}
                  >
                    <span className="text-2xl font-black">{cat.symbol}</span>
                    <div>
                      <p className="text-base font-bold tracking-tight">{cat.name}</p>
                      <p className="mt-0.5 text-xs font-semibold opacity-75">{cat.count}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Hiring & Career Spotlight --- */}
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div className="overflow-hidden rounded-[36px] bg-[#14161F] text-white shadow-2xl">
            <div className="grid lg:grid-cols-12 items-stretch">
              {/* Left Pitch */}
              <div className="p-8 sm:p-14 lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2DD4BF] text-[#14161F]">
                    <FaBriefcase className="h-5 w-5" />
                  </div>
                  <span className="mt-6 inline-block text-xs font-black uppercase tracking-widest text-[#2DD4BF]">
                    Direct Opportunities
                  </span>
                  <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">
                    Skip standard applications. Let top teams find you.
                  </h2>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-[#9DA7C2]">
                    High-growth startups and award-winning agencies hire directly from CreateDOT profiles with pre-verified skill metrics.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 rounded-full bg-[#FF6B6B] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#F05555] transition"
                  >
                    <span>Browse Creative Roles</span>
                    <FaArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/post-a-job"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition"
                  >
                    <span>Post a Role ($299)</span>
                  </Link>
                </div>
              </div>

              {/* Right Mock Job Cards */}
              <div className="bg-[#1C2237] p-6 sm:p-10 lg:col-span-5 flex flex-col justify-center gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#2DD4BF]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2DD4BF]">
                      Remote · Global
                    </span>
                    <span className="text-xs font-medium text-white/50">2h ago</span>
                  </div>
                  <h4 className="mt-3 text-lg font-bold">Principal Design Systems Lead</h4>
                  <p className="text-xs text-[#A2AECB]">Linear • San Francisco / Remote</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {["Figma Tokens", "React", "Architecture"].map((t) => (
                      <span key={t} className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                    <span className="font-bold text-[#FF6B6B]">$190k – $240k + Equity</span>
                    <span className="flex items-center gap-1.5 font-semibold text-white hover:underline">
                      Apply <FaArrowUpRightFromSquare className="h-3 w-3" />
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md opacity-80">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#FFB800]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FFB800]">
                      Contract · 3 Months
                    </span>
                    <span className="text-xs font-medium text-white/50">1d ago</span>
                  </div>
                  <h4 className="mt-3 text-lg font-bold">3D Brand Motion Director</h4>
                  <p className="text-xs text-[#A2AECB]">Stripe Press • New York</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                    <span className="font-bold text-white">$120/hr</span>
                    <span className="flex items-center gap-1.5 font-semibold text-white hover:underline">
                      Apply <FaArrowUpRightFromSquare className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Global CTA Banner --- */}
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#FF6B6B] via-[#FA5252] to-[#7950F2] p-10 text-center text-white shadow-2xl sm:p-20">
            <div className="relative z-10 mx-auto max-w-2xl">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#FF6B6B] shadow-lg"
              >
                <FaPalette className="h-6 w-6" />
              </motion.div>
              <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
                Ready to show the world what you make?
              </h2>
              <p className="mt-4 text-base text-white/90 sm:text-xl">
                Join over 54,000 creative leaders building their legacy on CreateDOT. Free forever for individuals.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="rounded-full bg-white px-8 py-4 text-base font-bold text-[#14161F] shadow-xl hover:bg-[#F3F4F6] transition"
                >
                  Create Your Free Profile
                </Link>
                <Link
                  href="/explore"
                  className="rounded-full border border-white/30 bg-black/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md hover:bg-black/20 transition"
                >
                  Explore Showcase
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="border-t border-[#14161F]/8 bg-[#FAF7F0] px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#14161F] text-xs font-black text-white">
              CD
            </div>
            <span className="font-extrabold text-[#14161F]">CreateDOT</span>
            <span className="text-xs text-[#7A839E]">© 2026 CreateDOT Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#5A637A]">
            <Link href="/about" className="hover:text-[#14161F] transition">About</Link>
            <Link href="/guidelines" className="hover:text-[#14161F] transition">Manifesto</Link>
            <Link href="/privacy" className="hover:text-[#14161F] transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#14161F] transition">Terms of Service</Link>
            <Link href="/brand" className="hover:text-[#14161F] transition">Brand Kit</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// --- Dynamic Visual Simulation for Cards ---
function ProjectArtPreview({ type }: { type: string }) {
  if (type === "quantumpay") {
    return (
      <div className="absolute inset-4 top-10 rounded-2xl border border-white/20 bg-slate-900/80 p-4 shadow-xl backdrop-blur-md">
        <div className="mb-2 flex justify-between items-center">
          <div className="h-2 w-14 rounded bg-rose-500/80" />
          <FaBolt className="h-3 w-3 text-rose-400" />
        </div>
        <p className="text-[10px] font-mono text-slate-400">Yield Treasury</p>
        <p className="text-lg font-black text-white mt-0.5">$128,450.80</p>
        <div className="mt-3 flex h-8 items-end gap-1.5 rounded-lg bg-slate-950/60 p-1.5">
          {[40, 70, 50, 95, 60, 85, 45, 90].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className="w-full rounded-t bg-rose-500" />
          ))}
        </div>
      </div>
    )
  }

  if (type === "sphere3d") {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="w-20 h-20 rounded-2xl border-2 border-indigo-400 bg-indigo-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.5)] rotate-45 flex items-center justify-center">
          <FaCube className="text-xl text-indigo-300" />
        </div>
        <span className="absolute bottom-3 left-4 text-[10px] font-mono text-indigo-200">
          WebGL 2.0 / 60 FPS
        </span>
      </div>
    )
  }

  if (type === "novasystem") {
    return (
      <div className="absolute inset-4 top-10 rounded-2xl border border-teal-500/30 bg-teal-950/40 p-4 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-teal-300">Nova Tokens v4.2</span>
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
        </div>
        <div className="grid grid-cols-3 gap-1.5 my-2">
          <div className="h-6 rounded bg-teal-500/30 border border-teal-500/40" />
          <div className="h-6 rounded bg-cyan-500/30 border border-cyan-500/40" />
          <div className="h-6 rounded bg-emerald-500/30 border border-emerald-500/40" />
        </div>
        <span className="text-[10px] font-mono text-slate-300">React + CSS Var Parity</span>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      <span className="absolute left-4 top-3 text-5xl font-black italic tracking-tighter text-[#FFF0DE]">C</span>
      <span className="absolute right-4 top-4 text-xs font-bold uppercase tracking-widest text-[#FFF2DF]">DOT</span>
      <div className="absolute bottom-3 left-4 h-16 w-16 rounded-full border-[8px] border-[#FFC8A3]" />
    </div>
  )
}