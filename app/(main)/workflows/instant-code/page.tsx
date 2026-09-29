"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaArrowLeft,
  FaCode,
  FaWandMagicSparkles,
  FaCopy,
  FaCheck,
  FaDownload,
  FaDesktop,
  FaMobileScreen,
  FaPlay,
  FaTerminal,
  FaReact,
  FaArrowRight,
  FaSliders,
  FaLayerGroup,
  FaShareNodes,
  FaShieldHalved,
  FaCircleCheck,
} from "react-icons/fa6"

const CODE_TEMPLATES = {
  bankingCard: {
    title: "QuantumPay Glassmorphism Card",
    desc: "Autonomous AI financial assistant with dark mode glassmorphism interface and micro-interactions.",
    code: `import React, { useState } from 'react';
import { FaArrowUpRightFromSquare, FaBolt, FaShieldHalved } from 'react-icons/fa6';

export function QuantumPayCard() {
  const [balance, setBalance] = useState(128450.80);
  const [isCopilotActive, setIsCopilotActive] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/25">
            <FaBolt className="text-sm" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">Autonomous Treasury</span>
            <h4 className="text-sm font-bold text-white">QuantumPay Global Vault</h4>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Yield
        </span>
      </div>

      <div className="my-6">
        <p className="text-xs text-slate-400 font-medium">Aggregated Liquid Value</p>
        <h2 className="text-3xl font-black tracking-tight text-white mt-1">
          \${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={() => setBalance(prev => prev + 2500)}
          className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all"
        >
          Quick Deposit
        </button>
        <button
          onClick={() => setIsCopilotActive(!isCopilotActive)}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
        >
          <FaShieldHalved className="text-xs text-indigo-400" />
          {isCopilotActive ? "AI Copilot: ON" : "AI Copilot: OFF"}
        </button>
      </div>
    </div>
  );
}`,
  },
  spatialEngine: {
    title: "Sphere 3D Spatial Canvas Wrapper",
    desc: "Interactive geometry canvas with viewport coordinates, orbit damping, and AR/VR hooks.",
    code: `import React, { useState, useEffect } from 'react';
import { FaCube, FaSliders } from 'react-icons/fa6';

export function SpatialStudioWidget() {
  const [rotationSpeed, setRotationSpeed] = useState(1.5);
  const [wireframe, setWireframe] = useState(false);

  return (
    <div className="rounded-3xl bg-[#090D16] border border-slate-800 p-6 shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <FaCube className="text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Sphere 3D Spatial Canvas</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">WebGL 2.0 / WebXR Ready</span>
      </div>

      <div className="relative h-44 my-4 rounded-2xl bg-gradient-to-tr from-indigo-950/40 via-purple-950/30 to-slate-900 border border-slate-800/80 flex items-center justify-center overflow-hidden">
        <div 
          className="w-24 h-24 rounded-2xl border-2 border-indigo-400/80 bg-indigo-500/10 backdrop-blur-sm shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-transform duration-300"
          style={{ transform: \`rotateX(45deg) rotateZ(\${rotationSpeed * 30}deg)\` }}
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Orbit Speed:</span>
          <input
            type="range"
            min="0.5"
            max="4"
            step="0.5"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            className="w-24 accent-indigo-500"
          />
        </div>
        <button
          onClick={() => setWireframe(!wireframe)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:text-white"
        >
          {wireframe ? "Solid Mesh" : "Wireframe Mode"}
        </button>
      </div>
    </div>
  );
}`,
  },
  novaTokens: {
    title: "Nova Design System Token Pill Matrix",
    desc: "Dynamic color modes, typography tokens, and responsive multi-brand CSS parity.",
    code: `import React, { useState } from 'react';
import { FaPalette, FaSliders } from 'react-icons/fa6';

export function NovaTokensSpec() {
  const [themeMode, setThemeMode] = useState<'neon' | 'neutral' | 'cyber'>('neon');

  const themes = {
    neon: { accent: '#F43F5E', surface: '#0D121F', border: '#F43F5E33' },
    neutral: { accent: '#64748B', surface: '#0F172A', border: '#334155' },
    cyber: { accent: '#10B981', surface: '#022C22', border: '#10B98133' },
  };

  const current = themes[themeMode];

  return (
    <div 
      className="p-6 rounded-3xl border transition-all duration-300"
      style={{ backgroundColor: current.surface, borderColor: current.border }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaPalette style={{ color: current.accent }} />
          <h4 className="text-sm font-bold text-white">Nova Token Runtime</h4>
        </div>
        <div className="flex gap-1.5">
          {(['neon', 'neutral', 'cyber'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setThemeMode(mode)}
              className={\`px-2.5 py-1 rounded text-xs font-mono uppercase transition-all \${
                themeMode === mode ? 'bg-white text-slate-900 font-bold' : 'text-slate-400 bg-slate-800'
              }\`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-300">
        Semantic token variables compiled to native Tailwind classes with zero runtime overhead.
      </p>
    </div>
  );
}`,
  },
}

export default function InstantCodeWorkflowPage() {
  const [selectedKey, setSelectedKey] = useState<keyof typeof CODE_TEMPLATES>("bankingCard")
  const [copied, setCopied] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const active = CODE_TEMPLATES[selectedKey]

  const handleCopy = () => {
    navigator.clipboard.writeText(active.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    setIsExporting(true)
    const blob = new Blob([active.code], { type: "text/typescript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${selectedKey}.tsx`
    a.click()
    URL.revokeObjectURL(url)
    setTimeout(() => setIsExporting(false), 800)
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-rose-500 selection:text-white pt-24 pb-20">
      {/* Glow aura */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 right-10 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[130px]" />
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FaCode className="text-xs" />
              React + Tailwind Engine
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
              Zero Bloat
            </span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
            Production Ready
            <span className="text-sm font-semibold tracking-normal px-2.5 py-0.5 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
              Instant React & Tailwind
            </span>
          </h1>
          <p className="text-slate-400 max-w-3xl text-base sm:text-lg">
            Turn approved design mockups directly into clean, componentized React code with zero bloat. Fully accessible, typed with TypeScript, and styled with utility-first Tailwind CSS.
          </p>
        </div>

        {/* Template Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(CODE_TEMPLATES) as Array<keyof typeof CODE_TEMPLATES>).map((key) => {
            const item = CODE_TEMPLATES[key]
            const isSelected = selectedKey === key
            return (
              <button
                key={key}
                onClick={() => setSelectedKey(key)}
                className={`text-left p-5 rounded-2xl border transition-all ${
                  isSelected
                    ? "bg-[#0D121F] border-emerald-500/50 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/30"
                    : "bg-[#090D16]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#0D121F]/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <FaReact className="text-sm" />
                    React Component
                  </span>
                  {isSelected && <FaCircleCheck className="text-emerald-400 text-sm" />}
                </div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">{item.desc}</p>
              </button>
            )
          })}
        </div>

        {/* Code & Live Preview Split Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Code Viewer */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0D121F] border border-slate-800 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-[#090D16]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  {selectedKey}.tsx
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  {copied ? <FaCheck className="text-emerald-400 text-xs" /> : <FaCopy className="text-xs" />}
                  {copied ? "Copied!" : "Copy TSX"}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 transition-all"
                >
                  <FaDownload className="text-xs" />
                  {isExporting ? "Downloading..." : "Download File"}
                </button>
              </div>
            </div>

            <div className="p-5 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed text-slate-300">
              <pre>
                <code>{active.code}</code>
              </pre>
            </div>
          </div>

          {/* Right: Live Interactive Sandbox Container */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-[#0D121F] border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaPlay className="text-emerald-400 text-xs" />
                <span className="text-xs font-bold text-white">Live Hydrated Sandbox</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Next.js 14 + Tailwind v3
              </span>
            </div>

            {/* Sandbox Rendered Result */}
            <div className="p-6 rounded-2xl bg-[#090D16] border border-slate-800/90 shadow-2xl">
              {selectedKey === "bankingCard" && (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800 p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-rose-500/20">
                        QP
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-rose-400 font-semibold block">
                          AI Autonomous
                        </span>
                        <h4 className="text-xs font-bold text-white">QuantumPay Treasury</h4>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Live Sandbox
                    </span>
                  </div>

                  <div className="my-4">
                    <p className="text-[11px] text-slate-400">Total Liquid Vault</p>
                    <h3 className="text-2xl font-black text-white">$128,450.80</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => alert("Simulated deposit triggered in live sandbox!")}
                      className="px-3 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-colors shadow-md shadow-rose-500/20"
                    >
                      Instant Deposit
                    </button>
                    <button
                      onClick={() => alert("Copilot rebalancing live risk tolerance.")}
                      className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 hover:text-white transition-colors"
                    >
                      AI Copilot Rebalance
                    </button>
                  </div>
                </div>
              )}

              {selectedKey === "spatialEngine" && (
                <div className="rounded-2xl bg-[#0B0F19] border border-slate-800 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">Sphere 3D Visualizer</h4>
                    <span className="text-[10px] font-mono text-indigo-400">60 FPS</span>
                  </div>
                  <div className="h-36 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 rounded-xl border-2 border-indigo-400 bg-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                    />
                  </div>
                  <p className="text-xs text-slate-400">
                    WebGL orbital controller mounted with hardware acceleration.
                  </p>
                </div>
              )}

              {selectedKey === "novaTokens" && (
                <div className="rounded-2xl bg-[#0B0F19] border border-rose-500/30 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">Nova Token Runtime</h4>
                    <span className="text-[10px] font-mono text-rose-400">Active Theme</span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 font-mono">
                    --color-accent: #F43F5E;
                    <br />
                    --radius-component: 1.25rem;
                  </div>
                  <p className="text-xs text-slate-400">
                    Zero-runtime CSS variables synchronized with Tailwind design tokens.
                  </p>
                </div>
              )}
            </div>

            {/* Feature Badges */}
            <div className="p-4 rounded-xl bg-[#0D121F] border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <FaShieldHalved className="text-emerald-400" />
                Production Ready Assurances
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 pl-5 list-disc">
                <li>Strict TypeScript type interfaces with no <code>any</code> types</li>
                <li>Accessible ARIA attributes and keyboard tab navigation built-in</li>
                <li>Tailwind CSS classes with arbitrary value minimization</li>
                <li>Compatible with Next.js App Router (Client & Server Components)</li>
              </ul>
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
              href="/workflows/critique-copilot"
              className="p-4 rounded-xl bg-[#0D121F] border border-slate-800 hover:border-indigo-500/40 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                  <FaShieldHalved />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                    Critique Copilot
                  </h4>
                  <p className="text-xs text-slate-400">Heuristic review & WCAG contrast audit</p>
                </div>
              </div>
              <FaArrowRight className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
