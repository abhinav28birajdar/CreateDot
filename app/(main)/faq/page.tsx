"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaCircleQuestion,
  FaMagnifyingGlass,
  FaChevronDown,
  FaShieldHalved,
  FaMessage,
  FaArrowRight
} from "react-icons/fa6"

interface FaqItem {
  category: string
  q: string
  a: string
}

const faqData: FaqItem[] = [
  {
    category: "General & Account",
    q: "What is CreateDOT?",
    a: "CreateDOT is the AI-powered creative engine and freelance marketplace where elite digital designers, engineers, and creators build, monetize, and commission world-class digital products with built-in escrow."
  },
  {
    category: "General & Account",
    q: "Can I be both a Creator and a Client with one account?",
    a: "Yes! CreateDOT features real-time role switching. You can publish gigs and take freelance commissions as a Creator, while also commissioning services or posting jobs as a Client using the 1-click role switcher in your user menu."
  },
  {
    category: "Orders & Escrow",
    q: "How does the CreateDOT Smart Escrow protect my payments?",
    a: "When a client places an order, funds are safely secured in CreateDOT Escrow. The freelancer only receives the funds after the client inspects and approves the delivered work. If deliverables do not match the agreed brief, clients can request revisions or trigger dispute resolution."
  },
  {
    category: "Orders & Escrow",
    q: "What happens if a freelancer misses a delivery deadline?",
    a: "If an order is overdue, clients can cancel the order instantly for a 100% full refund from escrow, or extend the delivery timeline directly in the order workspace."
  },
  {
    category: "AI Tools & Studio",
    q: "Who owns the intellectual property of designs created with CreateDOT AI tools?",
    a: "You retain 100% commercial ownership of all assets generated or edited through CreateDOT workflows (Smart Case Studies, Critique Copilot, and Instant React Code)."
  },
  {
    category: "AI Tools & Studio",
    q: "How does the Critique Copilot work?",
    a: "Critique Copilot analyzes your layout, color palette, typography hierarchy, and WCAG contrast ratios to provide real-time objective heuristic feedback and design system optimizations."
  },
  {
    category: "Creator Earnings & Payouts",
    q: "What platform fees does CreateDOT charge creators?",
    a: "Approved members of the CreateDOT Creator Program keep up to 95% of their gig earnings. Standard seller accounts enjoy transparent 5% platform fees with zero hidden processing charges."
  },
  {
    category: "Creator Earnings & Payouts",
    q: "How fast are creator payouts processed?",
    a: "Top Rated Plus sellers receive instant 0-day clearance. Standard sellers have a 7-day clearance window, with direct withdrawals available via Bank ACH wire, USDC crypto, or PayPal."
  }
]

export default function FaqPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const categories = ["All", "General & Account", "Orders & Escrow", "AI Tools & Studio", "Creator Earnings & Payouts"]

  const filteredFaqs = faqData.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch =
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Banner */}
      <div className="border-b border-white/10 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-400">
            <FaCircleQuestion />
            <span>CreateDOT Help & Knowledge Base</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
            Frequently Asked <span className="bg-gradient-to-r from-pink-500 to-amber-300 bg-clip-text text-transparent">Questions</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Everything you need to know about commissioning gigs, escrow protection, AI workflows, and creator payouts.
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto pt-2">
            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search answers (e.g. escrow, payouts, AI, figma)..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-xs text-white placeholder-slate-500 backdrop-blur-md focus:border-[#ff4b6e] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[#ff4b6e] text-white shadow-md shadow-pink-500/20"
                  : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-pink-400"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-pink-400/80 font-mono">0{idx + 1}</span>
                    <span>{faq.q}</span>
                  </div>
                  <FaChevronDown
                    className={`text-xs transition-transform ${
                      isOpen ? "rotate-180 text-pink-400" : "text-slate-500"
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 p-5 text-xs text-slate-300 leading-relaxed bg-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-base font-bold text-white">Still have questions?</h3>
            <p className="text-xs text-slate-400 mt-1">Our support team and community managers are available 24/7.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110"
          >
            <FaMessage className="text-xs" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
