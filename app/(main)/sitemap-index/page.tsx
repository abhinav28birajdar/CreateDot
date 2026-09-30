"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaCompass,
  FaShieldHalved,
  FaUserAstronaut,
  FaHouse,
  FaIdCard,
  FaFolderTree,
  FaPalette,
  FaThumbtack,
  FaRss,
  FaStore,
  FaPlus,
  FaBoxArchive,
  FaBriefcase,
  FaMessage,
  FaMagnifyingGlass,
  FaHandshake,
  FaAward,
  FaCreditCard,
  FaWandMagicSparkles,
  FaChartLine,
  FaArrowRight,
  FaCheck,
  FaBell,
  FaGear,
  FaCrown,
  FaUserShield,
  FaIdBadge,
  FaBan,
  FaBuilding,
  FaServer,
  FaUsers
} from "react-icons/fa6"

interface CategorySection {
  id: number
  title: string
  icon: any
  color: string
  description: string
  pages: { name: string; path: string; status: "Live" | "Role-Aware" | "Escrow" | "Interactive" }[]
}

const masterCategories: CategorySection[] = [
  {
    id: 1,
    title: "1. Public / Marketing Pages",
    icon: FaHouse,
    color: "from-pink-500 to-rose-500",
    description: "Brand landing, public exploration feeds, categorized guilds, and company policies.",
    pages: [
      { name: "Home", path: "/", status: "Live" },
      { name: "Explore", path: "/explore", status: "Live" },
      { name: "Trending", path: "/trending", status: "Live" },
      { name: "Creative Categories", path: "/categories", status: "Live" },
      { name: "Services Catalog", path: "/services", status: "Live" },
      { name: "Freelancers Directory", path: "/freelancers", status: "Live" },
      { name: "Developers Guild", path: "/developers", status: "Live" },
      { name: "Agencies & Studios", path: "/agencies", status: "Live" },
      { name: "Marketplace Hub", path: "/marketplace", status: "Live" },
      { name: "Visual Inspiration", path: "/inspiration", status: "Live" },
      { name: "Community", path: "/community", status: "Live" },
      { name: "About CreateDOT", path: "/about", status: "Live" },
      { name: "Pricing & Memberships", path: "/pricing", status: "Live" },
      { name: "Creator Program", path: "/creator-program", status: "Live" },
      { name: "Seller Program", path: "/seller-program", status: "Live" },
      { name: "Buyer Program", path: "/buyer-program", status: "Live" },
      { name: "Enterprise Solutions", path: "/enterprise", status: "Live" },
      { name: "Contact Support", path: "/contact", status: "Live" },
      { name: "Help Center", path: "/help", status: "Live" },
      { name: "FAQ", path: "/faq", status: "Live" },
      { name: "Terms of Service", path: "/terms", status: "Live" },
      { name: "Privacy Policy", path: "/privacy", status: "Live" },
      { name: "Cookie Policy", path: "/cookies", status: "Live" },
      { name: "Community Guidelines", path: "/guidelines", status: "Live" }
    ]
  },
  {
    id: 2,
    title: "2. Authentication Pages",
    icon: FaShieldHalved,
    color: "from-purple-500 to-indigo-500",
    description: "Role-aware onboarding credentials, two-factor token gateways, and account security.",
    pages: [
      { name: "Sign Up (Creator vs Consumer)", path: "/signup", status: "Role-Aware" },
      { name: "Sign In", path: "/login", status: "Role-Aware" },
      { name: "Email Verification", path: "/verify-email", status: "Live" },
      { name: "Phone Verification", path: "/verify-phone", status: "Live" },
      { name: "OTP Verification", path: "/verify-otp", status: "Live" },
      { name: "Forgot Password", path: "/forgot-password", status: "Live" },
      { name: "Reset Password", path: "/reset-password", status: "Live" },
      { name: "Two-Factor Authentication", path: "/two-factor", status: "Live" },
      { name: "Account Suspended Notice", path: "/account-suspended", status: "Live" },
      { name: "Account Deactivated Notice", path: "/account-deactivated", status: "Live" }
    ]
  },
  {
    id: 3,
    title: "3. Onboarding Pages",
    icon: FaUserAstronaut,
    color: "from-cyan-500 to-blue-500",
    description: "Multi-role step wizard: Creator, Freelancer, Client & Agency tailored paths.",
    pages: [
      { name: "Welcome & Role Selection", path: "/onboarding", status: "Role-Aware" },
      { name: "Select Creative Interests & Skills", path: "/interest", status: "Interactive" },
      { name: "Get Started Guide", path: "/get-started", status: "Live" }
    ]
  },
  {
    id: 4,
    title: "4. Main User Pages",
    icon: FaCompass,
    color: "from-emerald-500 to-teal-500",
    description: "Central activity hubs, algorithm feeds, notifications, bookmarks, and search.",
    pages: [
      { name: "Dashboard (Creator / Client)", path: "/dashboard", status: "Role-Aware" },
      { name: "Personalized Home Feed", path: "/feed", status: "Live" },
      { name: "Saved Bookmarks", path: "/bookmarks", status: "Live" },
      { name: "Activity Timeline", path: "/activity", status: "Live" },
      { name: "Notifications Center", path: "/notifications", status: "Live" },
      { name: "Search & Deep Filter", path: "/search", status: "Interactive" }
    ]
  },
  {
    id: 5,
    title: "5. User Profile Pages",
    icon: FaIdCard,
    color: "from-pink-500 to-purple-500",
    description: "Rich creator profiles, portfolios, skill matrices, reviews, and client previews.",
    pages: [
      { name: "My Studio Profile", path: "/profile", status: "Live" },
      { name: "Public Creator Profile Preview", path: "/abhinav", status: "Live" },
      { name: "Account & Profile Settings", path: "/settings", status: "Live" }
    ]
  },
  {
    id: 6,
    title: "6. Project / Portfolio Pages",
    icon: FaFolderTree,
    color: "from-amber-500 to-orange-500",
    description: "Curated work showcases, interactive WebGL sandboxes, and project playgrounds.",
    pages: [
      { name: "Projects Directory", path: "/projects", status: "Live" },
      { name: "QuantumPay Interactive Sandbox", path: "/projects/proj-demo-1", status: "Interactive" },
      { name: "Sphere 3D Audio Visualizer", path: "/projects/proj-demo-2", status: "Interactive" },
      { name: "Nova Design System Sandbox", path: "/projects/proj-demo-3", status: "Interactive" },
      { name: "Curated Collections", path: "/collections", status: "Live" },
      { name: "Public Showcase", path: "/showcase", status: "Live" }
    ]
  },
  {
    id: 7,
    title: "7. Project Creation Pages",
    icon: FaPlus,
    color: "from-rose-500 to-pink-500",
    description: "Asset manager, media arrangement, licensing, and multi-file project publisher.",
    pages: [
      { name: "Upload New Project", path: "/upload", status: "Interactive" },
      { name: "Add Work Studio", path: "/add-work", status: "Interactive" }
    ]
  },
  {
    id: 8,
    title: "8. Pinterest-Style Content Pages",
    icon: FaThumbtack,
    color: "from-red-500 to-rose-500",
    description: "Visual Pinboard masonry gallery, pin details, inspiration boards, and collage studio.",
    pages: [
      { name: "Visual Pins Feed", path: "/pins", status: "Interactive" },
      { name: "Pin Details & Color Tokens", path: "/pins/pin-1", status: "Interactive" },
      { name: "Inspiration Boards Collection", path: "/boards", status: "Interactive" },
      { name: "Board Details & Sections", path: "/boards/board-1", status: "Interactive" },
      { name: "Moodboards & Collage Canvas Studio", path: "/moodboards", status: "Interactive" }
    ]
  },
  {
    id: 9,
    title: "9. Feed & Social Pages",
    icon: FaRss,
    color: "from-indigo-500 to-blue-500",
    description: "Creator network social feeds, appreciations, comments, and discussions.",
    pages: [
      { name: "Feed Stream", path: "/feed", status: "Live" },
      { name: "Community Discussions", path: "/community", status: "Live" },
      { name: "Weekly Design Challenges", path: "/challenges", status: "Live" }
    ]
  },
  {
    id: 10,
    title: "10. Fiverr-Style Marketplace Pages",
    icon: FaStore,
    color: "from-emerald-500 to-teal-500",
    description: "Commission on-demand gigs, filter by delivery speed, and compare packages.",
    pages: [
      { name: "On-Demand Gigs Catalog", path: "/gigs", status: "Interactive" },
      { name: "Gig Detail (3-Tier Packages)", path: "/gigs/gig-1", status: "Interactive" },
      { name: "Marketplace Landing", path: "/marketplace", status: "Live" },
      { name: "Services Catalog", path: "/services", status: "Live" }
    ]
  },
  {
    id: 11,
    title: "11. Gig Creation Pages",
    icon: FaPlus,
    color: "from-pink-500 to-rose-500",
    description: "5-Step wizard: Title, 3-tier pricing, client requirements, gallery and publishing.",
    pages: [
      { name: "Create a New Gig Wizard", path: "/gigs/new", status: "Interactive" }
    ]
  },
  {
    id: 12,
    title: "12. Order Pages",
    icon: FaBoxArchive,
    color: "from-blue-500 to-indigo-500",
    description: "Escrow order management, active deliverables, revision requests and invoices.",
    pages: [
      { name: "Orders Dashboard (Buyer & Seller)", path: "/orders", status: "Role-Aware" },
      { name: "Order Workspace & Deliverables", path: "/orders/ORD-8921", status: "Escrow" },
      { name: "Secure Checkout", path: "/checkout", status: "Escrow" }
    ]
  },
  {
    id: 13,
    title: "13. Freelance Workspace Pages",
    icon: FaBriefcase,
    color: "from-cyan-500 to-teal-500",
    description: "Task boards, milestone deliverables, project files, and time tracking.",
    pages: [
      { name: "Freelance Project Workspace", path: "/workspace", status: "Interactive" }
    ]
  },
  {
    id: 14,
    title: "14. Messaging Pages",
    icon: FaMessage,
    color: "from-violet-500 to-purple-500",
    description: "Real-time client/creator chat, group discussions, and file attachments.",
    pages: [
      { name: "Messages & Chat Inbox", path: "/messages", status: "Interactive" }
    ]
  },
  {
    id: 15,
    title: "15. Jobs Pages",
    icon: FaMagnifyingGlass,
    color: "from-amber-500 to-yellow-500",
    description: "High-paying creative jobs, project brief posting, and candidate search.",
    pages: [
      { name: "Creative Jobs Board", path: "/jobs", status: "Live" },
      { name: "Post a Job / Project Brief", path: "/post-a-job", status: "Interactive" }
    ]
  },
  {
    id: 16,
    title: "16. Client Pages",
    icon: FaHandshake,
    color: "from-blue-500 to-cyan-500",
    description: "Client hiring portal, talent proposals, active contracts, and order analytics.",
    pages: [
      { name: "Client Dashboard View", path: "/dashboard", status: "Role-Aware" },
      { name: "Hire Verified Creators", path: "/hire", status: "Live" },
      { name: "Post a Brief", path: "/post-a-job", status: "Interactive" }
    ]
  },
  {
    id: 17,
    title: "17. Freelancer Pages",
    icon: FaAward,
    color: "from-rose-500 to-pink-500",
    description: "Freelancer performance, gig management, active milestones, and reputation score.",
    pages: [
      { name: "Freelancer Dashboard View", path: "/dashboard", status: "Role-Aware" },
      { name: "Freelance Workspace", path: "/workspace", status: "Interactive" },
      { name: "Seller Program Levels", path: "/seller-program", status: "Live" }
    ]
  },
  {
    id: 18,
    title: "18. Payments & Escrow Pages",
    icon: FaCreditCard,
    color: "from-emerald-500 to-green-500",
    description: "Studio financial wallet, balance withdrawals, escrow guarantees, and tax statements.",
    pages: [
      { name: "Studio Financial Wallet", path: "/wallet", status: "Interactive" },
      { name: "Escrow Checkout", path: "/checkout", status: "Escrow" },
      { name: "Order Invoices & Receipts", path: "/orders", status: "Live" }
    ]
  },
  {
    id: 19,
    title: "19. Creator Pages & AI Studio",
    icon: FaWandMagicSparkles,
    color: "from-pink-500 to-purple-500",
    description: "AI-powered creative workflows: Smart Case Studies, Critique Copilot, and Instant Code.",
    pages: [
      { name: "Smart Case Studies Generator", path: "/workflows/smart-case-studies", status: "Interactive" },
      { name: "Critique Copilot Heuristic Review", path: "/workflows/critique-copilot", status: "Interactive" },
      { name: "Instant React & Tailwind Code", path: "/workflows/instant-code", status: "Interactive" },
      { name: "Monetize Studio", path: "/monetize", status: "Live" }
    ]
  },
  {
    id: 20,
    title: "20. Analytics Pages",
    icon: FaChartLine,
    color: "from-blue-500 to-indigo-500",
    description: "Comprehensive performance metrics: project views, follower growth, revenue analytics.",
    pages: [
      { name: "Analytics Dashboard", path: "/analytics", status: "Interactive" }
    ]
  },
  {
    id: 21,
    title: "21. Notifications Pages",
    icon: FaBell,
    color: "from-amber-500 to-yellow-500",
    description: "Multi-channel notifications: Likes, Comments, Mentions, Orders, Escrow, and System alerts.",
    pages: [
      { name: "Notifications Hub", path: "/notifications", status: "Interactive" },
      { name: "Notification Settings", path: "/settings", status: "Live" }
    ]
  },
  {
    id: 22,
    title: "22. Settings Pages",
    icon: FaGear,
    color: "from-slate-500 to-zinc-500",
    description: "Account, Profile, Security, 2FA, Socials, Preferences, Billing, and Data Download.",
    pages: [
      { name: "Account & Profile Settings", path: "/settings", status: "Live" },
      { name: "Security & Password", path: "/two-factor", status: "Live" },
      { name: "Theme & Appearance", path: "/settings", status: "Live" },
      { name: "Financial & Billing Settings", path: "/wallet", status: "Live" }
    ]
  },
  {
    id: 23,
    title: "23. Premium / Subscription Pages",
    icon: FaCrown,
    color: "from-amber-400 to-orange-500",
    description: "Pricing tiers, Creator Pro, Freelancer Pro, Team Plan, and subscription management.",
    pages: [
      { name: "Pricing & Plans", path: "/pricing", status: "Live" },
      { name: "Premium Member Portal", path: "/premium", status: "Role-Aware" },
      { name: "Subscription Checkout", path: "/checkout", status: "Escrow" }
    ]
  },
  {
    id: 24,
    title: "24. Community Pages",
    icon: FaUsers,
    color: "from-purple-500 to-pink-500",
    description: "Community Feed, Specialized Guilds, Design Challenges, Hackathons, and Leaderboards.",
    pages: [
      { name: "Community Feed", path: "/community", status: "Live" },
      { name: "Community Groups & Guilds", path: "/community/groups", status: "Interactive" },
      { name: "Weekly Design Challenges", path: "/challenges", status: "Interactive" },
      { name: "Leaderboard", path: "/leaderboard", status: "Live" },
      { name: "Community Guidelines", path: "/guidelines", status: "Live" }
    ]
  },
  {
    id: 25,
    title: "25. Admin Pages",
    icon: FaUserShield,
    color: "from-red-600 to-rose-600",
    description: "Admin dashboard, User management, Moderation queue, DMCA reports, Revenue analytics.",
    pages: [
      { name: "Admin Dashboard", path: "/admin", status: "Role-Aware" }
    ]
  },
  {
    id: 26,
    title: "26. Verification Pages",
    icon: FaIdBadge,
    color: "from-indigo-500 to-cyan-500",
    description: "Identity, Creator, Freelancer, and Agency document verification with audit logs.",
    pages: [
      { name: "Verification Center", path: "/verification", status: "Interactive" },
      { name: "Email Verification", path: "/verify-email", status: "Live" },
      { name: "Phone Verification", path: "/verify-phone", status: "Live" }
    ]
  },
  {
    id: 27,
    title: "27. Safety & Moderation Pages",
    icon: FaBan,
    color: "from-rose-500 to-red-600",
    description: "Incident reporting, DMCA copyright notices, dispute arbitration, and account appeals.",
    pages: [
      { name: "Safety & Moderation Center", path: "/safety", status: "Interactive" },
      { name: "Account Suspension Appeal", path: "/account-suspended", status: "Live" },
      { name: "Order Escrow Dispute", path: "/orders", status: "Escrow" }
    ]
  },
  {
    id: 28,
    title: "28. Agency Pages",
    icon: FaBuilding,
    color: "from-cyan-500 to-blue-600",
    description: "Agency dashboard, team seat allocation, multi-client retainers, and agency analytics.",
    pages: [
      { name: "Agency Dashboard & Team", path: "/agencies/dashboard", status: "Interactive" },
      { name: "Agency Directory", path: "/agencies", status: "Live" }
    ]
  },
  {
    id: 29,
    title: "29. Search & Discovery Pages",
    icon: FaMagnifyingGlass,
    color: "from-pink-500 to-purple-600",
    description: "Universal search across projects, creators, services, gigs, jobs, and collections.",
    pages: [
      { name: "Universal Search", path: "/search", status: "Interactive" },
      { name: "Visual Pins Search", path: "/pins", status: "Interactive" },
      { name: "Marketplace Search", path: "/gigs", status: "Interactive" }
    ]
  },
  {
    id: 30,
    title: "30. System Pages",
    icon: FaServer,
    color: "from-emerald-500 to-teal-600",
    description: "System health status, 404 Not Found, 403 Forbidden, 401 Unauthorized, and Maintenance.",
    pages: [
      { name: "System Status & Error Sandbox", path: "/system-status", status: "Interactive" },
      { name: "Platform Maintenance", path: "/maintenance", status: "Live" },
      { name: "Account Deactivated Notice", path: "/account-deactivated", status: "Live" }
    ]
  }
]

export default function MasterSitemapPage() {
  const [filterQuery, setFilterQuery] = useState("")

  const filteredCategories = masterCategories
    .map((cat) => {
      const filteredPages = cat.pages.filter(
        (p) =>
          p.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
          p.path.toLowerCase().includes(filterQuery.toLowerCase()) ||
          cat.title.toLowerCase().includes(filterQuery.toLowerCase())
      )
      return { ...cat, pages: filteredPages }
    })
    .filter((cat) => cat.pages.length > 0)

  const totalPagesCount = masterCategories.reduce((acc, cat) => acc + cat.pages.length, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Role-Aware":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20"
      case "Escrow":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "Interactive":
        return "bg-pink-500/10 text-pink-400 border-pink-500/20"
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-28">
      {/* Hero Header */}
      <div className="border-b border-white/10 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1 text-xs font-bold text-pink-400">
            <FaCompass />
            <span>Master Application Architecture</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
            CreateDOT <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">30-Category Master Directory</span>
          </h1>

          <p className="mx-auto max-w-2xl text-slate-300 text-xs sm:text-sm leading-relaxed">
            Explore and jump directly into every single connected page, workflow engine, role portal, and escrow marketplace module across the CreateDOT platform ({totalPagesCount} connected routes).
          </p>

          {/* Quick Search filter */}
          <div className="pt-4 max-w-md mx-auto">
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search across all 20 modules and pages..."
              className="w-full rounded-2xl border border-white/15 bg-white/5 py-3.5 px-4 text-xs text-white placeholder-slate-500 backdrop-blur-md focus:border-[#ff4b6e] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {filteredCategories.map((category) => {
            const Icon = category.icon
            return (
              <div
                key={category.id}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl"
              >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg text-lg`}>
                      <Icon />
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold text-white">{category.title}</h2>
                      <p className="text-xs text-slate-400">{category.description}</p>
                    </div>
                  </div>

                  <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300 self-start sm:self-auto">
                    {category.pages.length} Pages
                  </span>
                </div>

                {/* Subpages Grid */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {category.pages.map((page, idx) => (
                    <Link
                      key={idx}
                      href={page.path}
                      className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-[#ff4b6e]/50 hover:bg-white/10"
                    >
                      <div className="pr-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">
                            {page.name}
                          </span>
                          <span className={`rounded px-1.5 py-0.2 text-[9px] font-semibold border ${getStatusBadge(page.status)}`}>
                            {page.status}
                          </span>
                        </div>
                        <p className="font-mono text-[10px] text-slate-500">{page.path}</p>
                      </div>

                      <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/5 text-slate-400 group-hover:bg-[#ff4b6e] group-hover:text-white transition-all shrink-0">
                        <FaArrowRight className="text-[10px]" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
