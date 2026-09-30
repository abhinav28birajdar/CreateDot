"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  FaRocket,
  FaGem,
  FaDollarSign,
  FaHandshake,
  FaCheck,
  FaArrowRight,
  FaBolt,
  FaAward,
  FaUsers
} from "react-icons/fa6"

export default function CreatorProgramPage() {
  const [applied, setApplied] = useState(false)
  const [portfolioUrl, setPortfolioUrl] = useState("")
  const [discipline, setDiscipline] = useState("UI/UX & Product Design")

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    setApplied(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-purple-950/40 via-slate-950 to-slate-950 px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ff4b6e]/15 via-transparent to-transparent pointer-events-none" />

        <div className="mx-auto max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1 text-xs font-bold text-pink-400">
            <FaGem />
            <span>CreateDOT Creator Fellowship & Fund</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
            Monetize Your Craft at <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">Scale</span>
          </h1>

          <p className="mx-auto max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
            Join the top 1% of digital designers, 3D artists, and creative technologists. Keep up to 95% of your earnings, access $500,000 in creator grants, and collaborate with enterprise clients.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <a
              href="#apply"
              className="rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-6 py-3 font-bold text-white shadow-xl shadow-pink-500/25 hover:brightness-110"
            >
              Apply for Creator Program
            </a>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Compare Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Perks Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold sm:text-3xl text-white">Creator Fellowship Benefits</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">Engineered exclusively to empower independent creative studios.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: FaDollarSign,
              title: "95% Revenue Share",
              desc: "Industry-leading payouts. Keep up to 95% of every gig, digital asset download, and custom client contract."
            },
            {
              icon: FaRocket,
              title: "$500,000 Grant Fund",
              desc: "Direct non-dilutive creative grants up to $25,000 per project to fund bold experimental tools and design systems."
            },
            {
              icon: FaHandshake,
              title: "Enterprise Client Matching",
              desc: "Get introduced directly to venture-backed startups and Fortune 500 product leaders seeking elite contract talent."
            },
            {
              icon: FaBolt,
              title: "Early AI Studio Access",
              desc: "Free unlimited compute for CreateDOT Critique Copilot, Smart Case Studies generator, and React code exports."
            },
            {
              icon: FaAward,
              title: "Verified Pro Badge",
              desc: "Exclusive purple Verified Creator checkmark to boost ranking on search and featured marketplace listings."
            },
            {
              icon: FaUsers,
              title: "Private Discord Guild",
              desc: "Access the private mastermind of 350+ world-class founders, creative directors, and senior design technologists."
            }
          ].map((perk, i) => {
            const Icon = perk.icon
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all hover:border-[#ff4b6e]/40 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 text-xl mb-4">
                  <Icon />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{perk.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{perk.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Application Form */}
      <div id="apply" className="mx-auto max-w-2xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-slate-900/80 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Join the Fellowship</h3>
            <p className="text-xs text-slate-400 mt-1">Applications reviewed within 48 business hours.</p>
          </div>

          {applied ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center text-emerald-400">
              <FaCheck className="mx-auto text-2xl mb-2" />
              <h4 className="font-bold text-white">Application Received!</h4>
              <p className="text-xs text-emerald-300 mt-1">
                Our creator council will review your portfolio and send onboarding credentials via email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Portfolio or Website URL</label>
                <input
                  type="url"
                  required
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://yourportfolio.com or Figma profile"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ff4b6e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Discipline</label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-xs text-white focus:outline-none"
                >
                  <option>UI/UX & Product Design</option>
                  <option>Full-Stack Creative Development</option>
                  <option>3D Animation & Three.js</option>
                  <option>AI Model Tuning & Autonomous Systems</option>
                  <option>Brand Identity & Typography</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 py-3.5 font-bold text-white shadow-lg shadow-pink-500/25 hover:brightness-110"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
