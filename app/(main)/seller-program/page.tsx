"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaStore,
  FaShieldHalved,
  FaStar,
  FaArrowRight,
  FaCheck,
  FaGem,
  FaPercent,
  FaHeadset
} from "react-icons/fa6"

export default function SellerProgramPage() {
  const tiers = [
    {
      level: "Level 1: Emerging Seller",
      req: "5 completed orders • 4.7+ rating",
      benefits: ["Up to 10 active gig listings", "Standard 14-day clearance", "Community forum access"]
    },
    {
      level: "Level 2: Professional Seller",
      req: "50 completed orders • $5,000+ volume • 4.8+ rating",
      benefits: ["Up to 25 active gig listings", "7-day fast fund clearance", "Priority search ranking", "Custom offer limit up to $10,000"]
    },
    {
      level: "Top Rated Plus / Studio Pro",
      req: "Manual review by CreateDOT Quality Board",
      benefits: [
        "Unlimited active gig listings",
        "Instant fund clearance (0-day)",
        "Dedicated VIP Account Manager",
        "Direct client RFP introductions",
        "Zero platform fee on first $10,000"
      ],
      highlight: true
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Hero */}
      <div className="border-b border-white/10 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1 text-xs font-bold text-pink-400">
            <FaStore />
            <span>CreateDOT Seller Tier Architecture</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
            Level Up Your <span className="bg-gradient-to-r from-pink-500 to-amber-300 bg-clip-text text-transparent">Seller Status</span>
          </h1>

          <p className="mx-auto max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
            Transparent milestones, faster clearance windows, lower commission rates, and bespoke VIP client support as your studio grows.
          </p>

          <div className="pt-4">
            <Link
              href="/gigs/new"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-6 py-3 font-bold text-white shadow-xl shadow-pink-500/25 hover:brightness-110"
            >
              <span>Publish Your First Gig</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </div>

      {/* Seller Levels Comparison */}
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`rounded-3xl border p-6 flex flex-col justify-between backdrop-blur-xl ${
                tier.highlight
                  ? "border-pink-500/50 bg-gradient-to-b from-pink-950/30 via-slate-900 to-slate-900 shadow-2xl shadow-pink-500/10 relative"
                  : "border-white/10 bg-slate-900/60"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#ff4b6e] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                  Elite Guild
                </div>
              )}

              <div>
                <h3 className="text-base font-bold text-white mb-2">{tier.level}</h3>
                <p className="text-xs text-pink-400 font-medium mb-4">{tier.req}</p>

                <div className="space-y-2.5 border-t border-white/10 pt-4">
                  {tier.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <FaCheck className="text-emerald-400 text-xs shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <Link
                  href="/dashboard"
                  className="block w-full text-center rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
                >
                  View My Level Progress
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
