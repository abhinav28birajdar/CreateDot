"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaArrowLeft,
  FaWandMagicSparkles,
  FaShieldHalved,
  FaCircleCheck,
  FaTriangleExclamation,
  FaCircleExclamation,
  FaSliders,
  FaEye,
  FaDesktop,
  FaMobileScreen,
  FaPalette,
  FaTextHeight,
  FaRotate,
  FaShareNodes,
  FaDownload,
  FaArrowRight,
  FaCompass,
  FaCode,
  FaLayerGroup,
  FaThumbsUp,
} from "react-icons/fa6"

type HeuristicItem = {
  id: string
  title: string
  category: "contrast" | "typography" | "layout" | "accessibility"
  score: number
  status: "pass" | "warning" | "fail"
  metric: string
  recommendation: string
  fixAction: string
}

const INITIAL_HEURISTICS: HeuristicItem[] = [
  {
    id: "h1",
    title: "Primary Button Contrast Ratio",
    category: "contrast",
    score: 98,
    status: "pass",
    metric: "7.4:1 (WCAG AAA)",
    recommendation: "Coral CTA on dark slate exceeds AAA contrast requirement for normal text readability.",
    fixAction: "Optimal — no change required",
  },
  {
    id: "h2",
    title: "Secondary Subtitle Readability",
    category: "contrast",
    score: 74,
    status: "warning",
    metric: "3.8:1 (WCAG AA Fail for <18pt)",
    recommendation: "Muted gray #64748B against dark card background lacks sufficient luminance for mobile sunlight view.",
    fixAction: "Bump tint to #94A3B8 (+28% luminance)",
  },
  {
    id: "h3",
    title: "Typographic Scale Hierarchy",
    category: "typography",
    score: 95,
    status: "pass",
    metric: "1.250 Major Third scale",
    recommendation: "Display (36px) -> H2 (24px) -> Body (15px) maintains clear focal depth and cognitive rhythm.",
    fixAction: "Consistent across breakpoints",
  },
  {
    id: "h4",
    title: "Interactive Touch Targets",
    category: "accessibility",
    score: 82,
    status: "warning",
    metric: "38x38px on small icons",
    recommendation: "Icon toggle triggers under 44px create tap fatigue on touch devices.",
    fixAction: "Add p-2 padding envelope to hit minimum 48px hit box",
  },
  {
    id: "h5",
    title: "Responsive Column Stacking",
    category: "layout",
    score: 92,
    status: "pass",
    metric: "Auto-fit minmax(280px, 1fr)",
    recommendation: "Gracefully flows from 3-col desktop grid to single column on viewports <= 640px.",
    fixAction: "Breakpoints verified at 375px & 768px",
  },
  {
    id: "h6",
    title: "Focus Rings & Keyboard Nav",
    category: "accessibility",
    score: 68,
    status: "warning",
    metric: "Missing focus-visible ring",
    recommendation: "Custom tab navigation lacks visible focus indicator for screen reader and keyboard power users.",
    fixAction: "Inject focus-visible:ring-2 ring-primary ring-offset-2",
  },
]

export default function CritiqueCopilotPage() {
  const [activeTab, setActiveTab] = useState<"all" | "contrast" | "typography" | "layout" | "accessibility">("all")
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop")
  const [isScanning, setIsScanning] = useState(false)
  const [overallScore, setOverallScore] = useState(86)
  const [appliedFixes, setAppliedFixes] = useState<string[]>([])
  const [activeContrastPair, setActiveContrastPair] = useState({
    fg: "#F43F5E",
    bg: "#0B0F19",
    name: "Primary Accent on Surface",
  })

  const runReaudit = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setOverallScore(Math.min(99, overallScore + 4))
    }, 1200)
  }

  const toggleFix = (id: string) => {
    if (appliedFixes.includes(id)) {
      setAppliedFixes(appliedFixes.filter((f) => f !== id))
    } else {
      setAppliedFixes([...appliedFixes, id])
    }
  }

  const filteredHeuristics = INITIAL_HEURISTICS.filter((h) =>
    activeTab === "all" ? true : h.category === activeTab
  )

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-rose-500 selection:text-white pt-24 pb-20">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-10 w-[420px] h-[420px] bg-indigo-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
          >
            <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
            Back to CreateDOT
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <FaWandMagicSparkles className="text-xs" />
              Critique Copilot AI v2.4
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              <FaShieldHalved className="text-xs" /> Real-time Heuristics
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
            Critique Copilot
            <span className="text-sm font-semibold tracking-normal px-2.5 py-0.5 rounded-md bg-slate-800 text-rose-400 border border-slate-700">
              Heuristic Review
            </span>
          </h1>
          <p className="text-slate-400 max-w-3xl text-base sm:text-lg">
            Receive instant, objective feedback on contrast ratios, typographic hierarchy, responsive flow, and visual balance. Calibrated against Nielsen Norman heuristics and WCAG 2.2 AAA standards.
          </p>
        </div>

        {/* Scorecard Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0D121F]/90 border border-slate-800/80 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Overall Heuristic Score</span>
              <FaWandMagicSparkles className="text-rose-400 text-sm" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white">{overallScore}</span>
              <span className="text-xs text-emerald-400 font-bold">/ 100 Grade A</span>
            </div>
            <div className="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-indigo-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${overallScore}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D121F]/90 border border-slate-800/80 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>WCAG Contrast Status</span>
              <FaPalette className="text-indigo-400 text-sm" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">96.2%</span>
              <span className="text-xs text-slate-400 font-medium">Pass Ratio</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">0 critical failures detected</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D121F]/90 border border-slate-800/80 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Type Scale Rhythm</span>
              <FaTextHeight className="text-amber-400 text-sm" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white">4:3</span>
              <span className="text-xs text-amber-400 font-bold">Harmonic Ratio</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">Optimal baseline vertical grid</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D121F]/90 border border-slate-800/80 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Applied Quick Fixes</span>
              <FaCircleCheck className="text-emerald-400 text-sm" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-rose-400">{appliedFixes.length}</span>
              <span className="text-xs text-slate-400 font-medium">of {INITIAL_HEURISTICS.length} solved</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">Auto-injects Tailwind classes</p>
          </div>
        </div>

        {/* Live Interactive Canvas & Heuristic Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas Preview (Interactive UI being audited) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between bg-[#0D121F] p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDeviceMode("desktop")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    deviceMode === "desktop"
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <FaDesktop className="text-xs" /> Desktop (1440px)
                </button>
                <button
                  onClick={() => setDeviceMode("mobile")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    deviceMode === "mobile"
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <FaMobileScreen className="text-xs" /> Mobile (390px)
                </button>
              </div>

              <button
                onClick={runReaudit}
                disabled={isScanning}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <FaRotate className={`text-xs ${isScanning ? "animate-spin text-rose-400" : ""}`} />
                {isScanning ? "Evaluating DOM..." : "Re-evaluate Frame"}
              </button>
            </div>

            {/* Target UI Frame with Overlay Hotspots */}
            <div
              className={`mx-auto transition-all duration-300 rounded-2xl bg-[#090D16] border border-slate-800 shadow-2xl p-6 relative overflow-hidden ${
                deviceMode === "mobile" ? "max-w-sm" : "w-full"
              }`}
            >
              {/* Scanline effect when analyzing */}
              {isScanning && (
                <motion.div
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent z-30 pointer-events-none shadow-[0_0_15px_#f43f5e]"
                />
              )}

              {/* Sample Target UI with Annotations */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center font-black text-white text-sm shadow-md shadow-rose-500/20">
                      C.
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">CreateDOT Studio</h4>
                      <p className="text-[11px] text-slate-400">Design System Spec v4</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    Live Audit Ready
                  </span>
                </div>

                {/* Card Element With Detected Issues */}
                <div className="p-5 rounded-xl bg-gradient-to-b from-[#111625] to-[#0D121F] border border-slate-800 space-y-4 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      Smart Liquidity Pool
                    </span>
                    <span className="text-xs font-mono text-slate-400">APY 14.8%</span>
                  </div>

                  <h3 className="text-2xl font-black text-white leading-tight">
                    Instant Yield Routing Engine
                  </h3>

                  {/* Subtitle with fix applied/unapplied */}
                  <p
                    className={`text-sm transition-colors ${
                      appliedFixes.includes("h2") ? "text-slate-300 font-medium" : "text-slate-500"
                    }`}
                  >
                    Autonomous treasury arbitrage across decentralized protocol bridges with zero manual slippage adjustments.
                    {appliedFixes.includes("h2") && (
                      <span className="ml-2 text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        Fix active (#94A3B8)
                      </span>
                    )}
                  </p>

                  {/* Button with focus ring fix */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        appliedFixes.includes("h6")
                          ? "bg-rose-500 text-white ring-2 ring-rose-400 ring-offset-2 ring-offset-[#090D16] shadow-lg shadow-rose-500/30"
                          : "bg-rose-500 text-white hover:bg-rose-600"
                      }`}
                    >
                      Deploy Automated Vault
                    </button>
                    <button className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 text-slate-300 border border-slate-700 hover:text-white">
                      Inspect Audit Proof
                    </button>
                  </div>
                </div>

                {/* Live Color Contrast Tester Widget */}
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <FaPalette className="text-rose-400" />
                      Live Contrast Matrix Check
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">7.4:1 AAA</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 font-medium">
                      Normal Text: <strong className="text-white block">PASS AAA</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                      Large Text: <strong className="text-white block">PASS AAA</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium">
                      UI Components: <strong className="text-white block">PASS 3:1+</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Heuristic Findings & Action Checklist */}
          <div className="lg:col-span-6 space-y-5">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#0D121F] rounded-xl border border-slate-800 overflow-x-auto">
              {(["all", "contrast", "typography", "layout", "accessibility"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Heuristics List */}
            <div className="space-y-3.5">
              {filteredHeuristics.map((item) => {
                const isFixed = appliedFixes.includes(item.id)
                return (
                  <motion.div
                    layout
                    key={item.id}
                    className={`p-4 rounded-xl border transition-all ${
                      item.status === "pass"
                        ? "bg-[#0D121F]/80 border-slate-800"
                        : item.status === "warning"
                        ? isFixed
                          ? "bg-[#0D121F]/80 border-emerald-500/40"
                          : "bg-amber-950/20 border-amber-500/30"
                        : "bg-rose-950/20 border-rose-500/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {item.status === "pass" || isFixed ? (
                            <FaCircleCheck className="text-emerald-400 text-sm flex-shrink-0" />
                          ) : (
                            <FaTriangleExclamation className="text-amber-400 text-sm flex-shrink-0" />
                          )}
                          <h4 className="text-sm font-bold text-white">{item.title}</h4>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pl-5">
                          {item.recommendation}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span
                          className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                            item.score >= 90
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {item.metric}
                        </span>
                      </div>
                    </div>

                    {/* Actionable One-click Fix Bar */}
                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <FaSliders className="text-rose-400 text-xs" />
                        <span className="font-mono text-slate-300">{item.fixAction}</span>
                      </span>

                      {item.status !== "pass" && (
                        <button
                          onClick={() => toggleFix(item.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            isFixed
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30"
                          }`}
                        >
                          {isFixed ? "Fix Applied ✓" : "Apply Auto-Fix"}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Quick Export Summary */}
            <div className="p-4 rounded-xl bg-[#0D121F] border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Generate Heuristic Audit Report</p>
                <p className="text-[11px] text-slate-400">PDF, Figma Tokens JSON, and Tailwind config</p>
              </div>
              <button
                onClick={() => alert("Audit report compiled with 0 critical WCAG blockers!")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-rose-500/20 hover:opacity-95 transition-opacity"
              >
                <FaDownload className="text-xs" /> Export Audit Log
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Workflow Switcher */}
        <div className="pt-10 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Other AI Design Workflows</h3>
            <span className="text-xs text-slate-400">CreateDOT Suite</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/workflows/smart-case-studies"
              className="p-4 rounded-xl bg-[#0D121F] border border-slate-800 hover:border-rose-500/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                  <FaWandMagicSparkles />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
                    Generative Portfolio
                  </h4>
                  <p className="text-xs text-slate-400">Smart case studies from Figma frames</p>
                </div>
              </div>
              <FaArrowRight className="text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/workflows/instant-code"
              className="p-4 rounded-xl bg-[#0D121F] border border-slate-800 hover:border-emerald-500/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <FaCode />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Production Ready
                  </h4>
                  <p className="text-xs text-slate-400">Instant React & Tailwind component code</p>
                </div>
              </div>
              <FaArrowRight className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
