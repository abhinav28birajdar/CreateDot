"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  FaBriefcase,
  FaArrowLeft,
  FaCheck,
  FaDollarSign,
  FaClock,
  FaTag,
  FaBolt,
  FaShieldHalved
} from "react-icons/fa6"

export default function PostAJobPage() {
  const router = useRouter()
  const [jobTitle, setJobTitle] = useState("")
  const [category, setCategory] = useState("UI/UX & Product Design")
  const [budgetType, setBudgetType] = useState<"fixed" | "hourly">("fixed")
  const [budgetAmount, setBudgetAmount] = useState(2500)
  const [timeline, setTimeline] = useState("2 to 4 weeks")
  const [description, setDescription] = useState("")
  const [skills, setSkills] = useState(["Figma", "Design System", "TailwindCSS", "Next.js"])
  const [skillInput, setSkillInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Header */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/jobs"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white"
            >
              <FaArrowLeft className="text-xs" />
            </Link>
            <h1 className="text-base font-bold text-white">Post a Project Brief or Job</h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-pink-400">
            <FaBolt />
            <span>Matched to top 1% creators within 2 hours</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:px-8">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-emerald-500/30 bg-slate-900/80 p-10 text-center backdrop-blur-2xl shadow-2xl"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 text-2xl mb-4">
              <FaCheck />
            </div>
            <h2 className="text-2xl font-bold text-white">Project Brief Published!</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              "{jobTitle || "Lead UI/UX Redesign"}" has been broadcast to verified talent guilds. You will receive tailored proposals in your CreateDOT inbox.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/jobs"
                className="rounded-xl bg-[#ff4b6e] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110"
              >
                Browse Job Board
              </Link>
              <Link
                href="/dashboard"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs text-slate-300 hover:bg-white/10"
              >
                Go to Dashboard
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Job / Project Title
                </label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Lead Product Designer for AI Financial Dashboard"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs sm:text-sm text-white focus:border-[#ff4b6e] focus:outline-none"
                />
              </div>

              {/* Category */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Creative Field
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 p-3.5 text-xs text-white focus:outline-none"
                  >
                    <option>UI/UX & Product Design</option>
                    <option>Frontend & React / Next.js Development</option>
                    <option>3D & Spline Motion Design</option>
                    <option>Generative AI & Agent Architectures</option>
                    <option>Brand Identity & Design Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Estimated Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 p-3.5 text-xs text-white focus:outline-none"
                  >
                    <option>Less than 1 week (Rapid Sprint)</option>
                    <option>2 to 4 weeks (Standard Project)</option>
                    <option>1 to 3 months (Comprehensive)</option>
                    <option>Ongoing / Full-Time Retainer</option>
                  </select>
                </div>
              </div>

              {/* Budget Type & Amount */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Budget Structure</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setBudgetType("fixed")}
                      className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                        budgetType === "fixed" ? "bg-[#ff4b6e] text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Fixed Price
                    </button>
                    <button
                      type="button"
                      onClick={() => setBudgetType("hourly")}
                      className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                        budgetType === "hourly" ? "bg-[#ff4b6e] text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Hourly Rate
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {budgetType === "fixed" ? "Total Target Budget ($ USD)" : "Target Hourly Rate ($ / hour)"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                    <input
                      type="number"
                      required
                      value={budgetAmount}
                      onChange={(e) => setBudgetAmount(Number(e.target.value))}
                      className="w-full rounded-xl border border-white/10 bg-slate-900 py-3 pl-8 pr-4 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Detailed Project Brief
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline the core problem, user personas, desired deliverables, and tech stack expectations..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff4b6e]"
                />
              </div>

              {/* Skills Tags */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Required Skills & Tools
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                    placeholder="e.g. Figma, Three.js, Tailwind..."
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 px-2.5 py-1 text-xs text-pink-300"
                    >
                      <span>{skill}</span>
                      <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-white">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Escrow assurance */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-emerald-400 flex items-center gap-3">
                <FaShieldHalved className="text-lg shrink-0" />
                <span>Posting is free. Escrow deposit is only required when you contract a freelancer.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 py-4 font-bold text-white shadow-xl shadow-pink-500/25 hover:brightness-110 disabled:opacity-50"
              >
                {isSubmitting ? "Publishing Brief..." : "Broadcast Project Brief Now"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
