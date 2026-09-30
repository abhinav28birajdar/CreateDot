"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaBriefcase,
  FaShieldHalved,
  FaFileContract,
  FaBuilding,
  FaCreditCard,
  FaCheck,
  FaArrowRight
} from "react-icons/fa6"

export default function BuyerProgramPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Hero */}
      <div className="border-b border-white/10 bg-gradient-to-b from-blue-950/40 via-slate-950 to-slate-950 px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-bold text-blue-400">
            <FaBuilding />
            <span>CreateDOT Buyer & Client Program</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
            Hire Top Tier Creators with <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Total Confidence</span>
          </h1>

          <p className="mx-auto max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
            Protect your investments with smart contract escrow, turnkey standard NDAs, net-30 invoicing, and dedicated white-glove talent scouts.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/post-a-job"
              className="rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-6 py-3 font-bold text-white shadow-xl shadow-pink-500/25 hover:brightness-110"
            >
              Post Project Brief
            </Link>
            <Link
              href="/freelancers"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Browse Top Creators
            </Link>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: FaShieldHalved,
              title: "100% Escrow Protection",
              desc: "Funds are released in defined milestones only after your team reviews and approves source files and test builds."
            },
            {
              icon: FaFileContract,
              title: "Standard Turnkey NDAs",
              desc: "All verified creators agree to CreateDOT's enterprise intellectual property assignment and confidentiality clauses."
            },
            {
              icon: FaCreditCard,
              title: "Flexible Payment Terms",
              desc: "Pay via corporate credit card, ACH wire transfer, Net-30 invoice, or multi-currency Web3 wallets."
            }
          ].map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 text-xl mb-4">
                  <Icon />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
