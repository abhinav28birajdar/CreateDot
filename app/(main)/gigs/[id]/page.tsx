"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  FaStar,
  FaCheck,
  FaClock,
  FaArrowRotateLeft,
  FaShieldHalved,
  FaBolt,
  FaMessage,
  FaShareNodes,
  FaHeart,
  FaRegHeart,
  FaChevronDown,
  FaGem,
  FaArrowRight
} from "react-icons/fa6"

interface PackageTier {
  id: "basic" | "standard" | "premium"
  name: string
  price: number
  deliveryDays: number
  revisions: number | "Unlimited"
  description: string
  features: string[]
}

const packages: Record<"basic" | "standard" | "premium", PackageTier> = {
  basic: {
    id: "basic",
    name: "Starter Essential",
    price: 350,
    deliveryDays: 3,
    revisions: 2,
    description: "Core UI/UX flow for 3 responsive screens + design tokens & component specs.",
    features: [
      "3 High-Fidelity App Screens",
      "Figma Source File (.fig)",
      "Basic Typography & Color Tokens",
      "Exported SVG & PNG Assets",
      "2 Revision Cycles"
    ]
  },
  standard: {
    id: "standard",
    name: "Pro Product System",
    price: 680,
    deliveryDays: 5,
    revisions: 5,
    description: "Complete 8-screen responsive prototype + comprehensive auto-layout design system.",
    features: [
      "8 Interactive High-Fidelity Screens",
      "Full Figma Component Library with Variants",
      "Interactive Clickable Prototype",
      "Tailwind Color & Spacing Token Spec",
      "Heuristic Accessibility Audit",
      "5 Revision Cycles"
    ]
  },
  premium: {
    id: "premium",
    name: "Enterprise Studio Package",
    price: 1250,
    deliveryDays: 8,
    revisions: "Unlimited",
    description: "Turnkey enterprise multi-page design system, 15+ screens, micro-interactions, and React TSX export.",
    features: [
      "15+ High-Fidelity Responsive Screens",
      "Production-Ready React & Tailwind Components",
      "Interactive Micro-Interactions & Transitions",
      "Complete Figma Design System (Dark/Light)",
      "Developer Handoff Documentation",
      "Unlimited Revisions",
      "Priority VIP Slack Channel Access"
    ]
  }
}

const faqs = [
  {
    q: "What do I need to provide to get started?",
    a: "A brief description of your product, any wireframes or references you like, target audience details, and your preferred branding (logo/colors if available)."
  },
  {
    q: "Do you supply the raw editable Figma source files?",
    a: "Yes! All packages include the fully structured, auto-layout Figma source file with organized styles, components, and variables."
  },
  {
    q: "How does the CreateDOT Escrow protection work?",
    a: "Your payment is held safely in CreateDOT Escrow until you inspect and approve the final delivery milestone. If not satisfied, revisions or refunds are protected."
  },
  {
    q: "Can you provide production code implementation?",
    a: "The Premium package includes production-ready React TSX and Tailwind components. You can also commission custom fullstack builds via our custom offer feature."
  }
]

export default function GigDetailPage() {
  const params = useParams()
  const gigId = params?.id as string || "gig-1"

  const [selectedTier, setSelectedTier] = useState<"basic" | "standard" | "premium">("standard")
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [isSaved, setIsSaved] = useState(false)

  const currentPkg = packages[selectedTier] || packages.standard

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Breadcrumb / Top Bar */}
      <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Link href="/gigs" className="hover:text-pink-400 transition-colors">
              Gigs
            </Link>
            <span>/</span>
            <span className="text-slate-300">Design & Development</span>
            <span>/</span>
            <span className="truncate max-w-[200px] text-pink-400">{gigId}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs hover:bg-white/10"
            >
              {isSaved ? <FaHeart className="text-[#ff4b6e]" /> : <FaRegHeart />}
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs hover:bg-white/10">
              <FaShareNodes />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Left Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title & Seller Headline */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-400 mb-3">
                <FaGem className="text-[10px]" />
                <span>CreateDOT Verified Gig</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">
                Ultra-Modern SaaS UI/UX Design System & Interactive Prototype in Figma
              </h1>

              {/* Creator details row */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
                    <Image
                      src="/images/profile-image-4.png"
                      alt="Abhinav Birajdar"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm">Abhinav Birajdar</span>
                      <span className="rounded bg-pink-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-pink-400 border border-pink-500/20">
                        Top Rated Plus
                      </span>
                    </div>
                    <span>Design Engineer & Creative Technologist</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    <FaStar />
                    <span className="font-bold text-white">5.0</span>
                    <span className="text-slate-400">(142 reviews)</span>
                  </div>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">3 Orders in Queue</span>
                </div>
              </div>
            </div>

            {/* Gallery / Cover Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80"
                alt="Gig Showcase Gallery"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-slate-950/80 p-3 backdrop-blur-md border border-white/10">
                <span className="text-xs text-slate-300">Preview: QuantumPay Design System & Dark Mode Spec</span>
                <span className="text-xs font-semibold text-pink-400">Figma + React Tokens</span>
              </div>
            </div>

            {/* About This Gig */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
              <h2 className="text-lg font-bold text-white mb-4">About This Gig</h2>
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  Are you looking for a high-end, world-class UI/UX design that captivates users and drives conversions? 
                  With over 6+ years specializing in complex fintech, web3, and SaaS product design, I design 
                  state-of-the-art digital interfaces grounded in user psychology and modern aesthetic engineering.
                </p>
                <p>
                  Every deliverable is crafted from scratch using Figma auto-layout, atomic component architectures, 
                  and WCAG AAA accessibility contrast guidelines.
                </p>

                <h3 className="font-semibold text-white pt-2">What you receive:</h3>
                <ul className="grid gap-2 sm:grid-cols-2 text-xs">
                  {[
                    "Custom high-converting UI components",
                    "Atomic design system with variants",
                    "Fully clickable dynamic Figma prototype",
                    "Color tokens & typography hierarchy",
                    "Adaptive dark & light modes",
                    "Full developer handoff with CSS/Tailwind tokens"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FaCheck className="text-pink-400 text-xs shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
              <h2 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-white hover:text-pink-400"
                    >
                      <span>{faq.q}</span>
                      <FaChevronDown
                        className={`text-xs transition-transform ${openFaq === index ? "rotate-180 text-pink-400" : "text-slate-400"}`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="border-t border-white/10 p-4 text-xs text-slate-300 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Seller Bio Box */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 backdrop-blur-md">
              <h2 className="text-lg font-bold text-white mb-4">About The Creator</h2>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-pink-500/40 shrink-0">
                  <Image
                    src="/images/profile-image-4.png"
                    alt="Abhinav Birajdar"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">Abhinav Birajdar</h3>
                    <span className="text-xs text-pink-400 font-semibold">@abhinav_design</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Lead Product Designer & Design Systems Architect at CreateDOT. Former product design advisor for 14+ venture-backed tech startups.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
                    <div>From: <span className="font-semibold text-white">Bengaluru, India</span></div>
                    <div>Avg Response: <span className="font-semibold text-emerald-400">1 Hour</span></div>
                    <div>Member since: <span className="font-semibold text-white">2023</span></div>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/messages"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
                    >
                      <FaMessage className="text-pink-400" />
                      <span>Contact Creator</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3-Tier Package Pricing Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 rounded-2xl border border-white/15 bg-slate-900/90 p-6 backdrop-blur-xl shadow-2xl">
              {/* Tier Switcher Tabs */}
              <div className="grid grid-cols-3 rounded-xl border border-white/10 bg-white/5 p-1 mb-6">
                {(["basic", "standard", "premium"] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      selectedTier === tier
                        ? "bg-[#ff4b6e] text-white shadow-md shadow-pink-500/20"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              {/* Package Details */}
              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold text-white">{currentPkg.name}</h3>
                  <span className="text-2xl font-extrabold text-white">${currentPkg.price}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed min-h-[40px]">
                  {currentPkg.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400 border-y border-white/10 py-3">
                  <div className="flex items-center gap-1.5">
                    <FaClock className="text-pink-400" />
                    <span>{currentPkg.deliveryDays} Days Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaArrowRotateLeft className="text-pink-400" />
                    <span>
                      {typeof currentPkg.revisions === "number"
                        ? `${currentPkg.revisions} Revisions`
                        : "Unlimited Revisions"}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Included Deliverables:
                  </span>
                  {currentPkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <FaCheck className="text-emerald-400 text-xs shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Order CTA Buttons */}
                <div className="space-y-3 pt-6">
                  <Link
                    href={`/checkout?gig=${gigId}&tier=${selectedTier}&price=${currentPkg.price}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 py-3.5 font-bold text-white shadow-lg shadow-pink-500/25 transition-all hover:brightness-110"
                  >
                    <span>Continue (${currentPkg.price})</span>
                    <FaArrowRight className="text-xs" />
                  </Link>

                  <Link
                    href={`/messages?creator=abhinav&subject=CustomOffer`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                  >
                    <span>Request Custom Offer</span>
                  </Link>
                </div>

                {/* Escrow Guarantee Badge */}
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-[11px] text-emerald-400">
                  <FaShieldHalved className="text-sm shrink-0" />
                  <span>CreateDOT Escrow: Funds released only after you approve delivery.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
