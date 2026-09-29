"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FaWandMagicSparkles,
    FaArrowLeft,
    FaArrowRight,
    FaCopy,
    FaCircleCheck,
    FaDownload,
    FaFigma,
    FaBookOpen,
    FaDiagramProject,
    FaFont,
    FaLayerGroup,
    FaSliders
} from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function SmartCaseStudiesWorkflowPage() {
    const [figmaUrl, setFigmaUrl] = useState('')
    const [projectTitle, setProjectTitle] = useState('Horizon Fintech Mobile App')
    const [rawNotes, setRawNotes] = useState('Created a financial cockpit for crypto & fiat. Focus on high-contrast coral accents, haptic micro-interactions, dark mode glassmorphism.')
    const [isGenerating, setIsGenerating] = useState(false)
    const [hasGenerated, setHasGenerated] = useState(false)
    const [activeTab, setActiveTab] = useState<'flows' | 'typography' | 'rationales' | 'export'>('flows')

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault()
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            setHasGenerated(true)
            toast.success("Case study structured in 1.4s!", {
                description: "Synthesized 4 user flows, typography matrix, and contrast audit."
            })
        }, 1200)
    }

    const caseStudyData = {
        title: projectTitle || "Autonomous Creative Experience",
        author: "Abhinav",
        problem: "Users faced cognitive fatigue navigating multi-asset fintech dashboards with inconsistent typographic scales and delayed transaction confirmation feedback.",
        solution: "Engineered an AI-driven, glassmorphic layout prioritizing predictive search, tactile balance cards, and a WCAG AAA compliant coral accent system.",
        userFlows: [
            { step: "01. Authentication & Biometrics", desc: "Instant biometric handshake with fallback passkey generation." },
            { step: "02. Fluid Asset Overview", desc: "Adaptive card carousel prioritizing high-volatility holdings first." },
            { step: "03. Predictive Micro-Swap", desc: "Autonomous AI routes transactions with zero gas-slippage preview." },
            { step: "04. Receipt Monograph", desc: "Interactive SVG receipt exportable directly to Notion and Apple Wallet." }
        ],
        typeScale: [
            { label: "Display Serif", font: "Editorial Grotesk / 64px Black", usage: "Hero titles & big balance amounts" },
            { label: "Section Subheading", font: "Inter Tight / 20px Bold", usage: "Card categories & section anchors" },
            { label: "Body & Monospace", font: "JetBrains Mono / 12px Medium", usage: "Telemetry data, dates & transaction hashes" }
        ],
        decisionLog: [
            { question: "Why dark-mode first?", rationale: "Reduces visual fatigue for traders monitoring charts over extended nighttime sessions." },
            { question: "Why coral #FF6B6B accent?", rationale: "Provides optimal 7.2:1 contrast against #14161F dark surfaces, outperforming generic cobalt blue." }
        ]
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-[#14161F]/10 dark:border-white/10 text-xs font-bold text-[#14161F] dark:text-white hover:bg-white transition shadow-sm"
                >
                    <FaArrowLeft className="h-3 w-3" />
                    <span>Back to CreateDOT</span>
                </Link>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0D7] dark:bg-white/10 text-xs font-black text-[#8A6318] dark:text-[#FFE185] uppercase tracking-wider">
                    <FaWandMagicSparkles className="h-3.5 w-3.5 text-[#FF6B6B]" />
                    Studio AI • Generative Portfolio
                </div>
            </div>

            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-[36px] bg-[#14161F] p-8 sm:p-14 text-white shadow-2xl">
                <div className="pointer-events-none absolute -top-10 -right-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 via-[#FFE185]/20 to-transparent blur-3xl" />
                <div className="relative z-10 max-w-3xl">
                    <span className="text-xs font-black uppercase tracking-widest text-[#FF6B6B]">
                        Smart Case Studies Engine
                    </span>
                    <h1 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                        Turn raw Figma frames into narrative case studies.
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-[#9DA7C2] leading-relaxed">
                        Paste your Figma URLs or rough bullet points. Studio AI extracts the architecture, formats user flows, and documents typography rationales ready to impress hiring directors.
                    </p>
                </div>
            </div>

            {/* Main Interactive Studio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Input Studio */}
                <div className="lg:col-span-5 rounded-[36px] bg-white/80 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-5">
                    <h3 className="text-lg font-black text-[#14161F] dark:text-white flex items-center gap-2">
                        <FaFigma className="h-4 w-4 text-[#FF6B6B]" />
                        Project Source Input
                    </h3>

                    <form onSubmit={handleGenerate} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2] block mb-1.5">
                                Figma Prototype / Frame URL
                            </label>
                            <Input
                                value={figmaUrl}
                                onChange={(e) => setFigmaUrl(e.target.value)}
                                placeholder="https://www.figma.com/design/@username/file..."
                                className="h-11 rounded-2xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs font-medium"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2] block mb-1.5">
                                Case Study Title
                            </label>
                            <Input
                                value={projectTitle}
                                onChange={(e) => setProjectTitle(e.target.value)}
                                placeholder="e.g. Horizon Fintech Mobile App"
                                className="h-11 rounded-2xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs font-bold"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2] block mb-1.5">
                                Raw Design Notes & Bullet Points
                            </label>
                            <Textarea
                                value={rawNotes}
                                onChange={(e) => setRawNotes(e.target.value)}
                                rows={4}
                                placeholder="Paste your messy thoughts, user pain points, or client objectives..."
                                className="rounded-2xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs leading-relaxed resize-none"
                            />
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={isGenerating}
                                className="w-full h-12 rounded-full bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold text-sm shadow-xl shadow-[#FF6B6B]/25 transition"
                            >
                                {isGenerating ? (
                                    <span className="flex items-center gap-2">
                                        <FaWandMagicSparkles className="h-4 w-4 animate-spin" />
                                        Analyzing Figma Frames & Rationale...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <FaWandMagicSparkles className="h-4 w-4" />
                                        Generate Structured Case Study
                                    </span>
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Pre-made Presets */}
                    <div className="pt-4 border-t border-[#14161F]/8 dark:border-white/10">
                        <p className="text-[11px] font-bold text-[#647087] uppercase tracking-wider mb-2">Try Preset Concepts</p>
                        <div className="flex flex-wrap gap-1.5">
                            {[
                                { title: 'Fintech Banking App', notes: 'Autonomous banking hub, dark mode, biometric authorization, yield pools.' },
                                { title: 'Spatial 3D Studio', notes: 'Spatial computing interface for VisionOS with audio wave feedback and mesh controls.' },
                                { title: 'Multi-brand Tokens', notes: 'Design token architecture with variable modes, semantic color tokens, slot components.' }
                            ].map(p => (
                                <button
                                    key={p.title}
                                    onClick={() => {
                                        setProjectTitle(p.title)
                                        setRawNotes(p.notes)
                                        toast.info(`Loaded preset: ${p.title}`)
                                    }}
                                    className="px-3 py-1 rounded-full bg-[#14161F]/5 dark:bg-white/5 text-[11px] font-bold text-[#5A637A] dark:text-[#9DA7C2] hover:bg-[#14161F] hover:text-white transition"
                                >
                                    {p.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Interactive Structured Output */}
                <div className="lg:col-span-7 rounded-[36px] bg-white/80 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#14161F]/8 dark:border-white/10 pb-4">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">
                                Generated Result by Abhinav
                            </span>
                            <h3 className="text-xl font-black text-[#14161F] dark:text-white">
                                {caseStudyData.title}
                            </h3>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex items-center gap-1 p-1 bg-white/70 dark:bg-white/5 border border-[#14161F]/10 dark:border-white/10 rounded-2xl">
                            {[
                                { id: 'flows', label: 'User Flows', icon: FaDiagramProject },
                                { id: 'typography', label: 'Typography', icon: FaFont },
                                { id: 'rationales', label: 'Decisions', icon: FaBookOpen },
                                { id: 'export', label: 'Markdown', icon: FaCopy }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${activeTab === tab.id ? 'bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] shadow-sm' : 'text-[#647087] hover:text-[#14161F]'}`}
                                >
                                    <tab.icon className="h-3 w-3" />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Problem & Solution Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-[#FFE4DC]/50 dark:bg-white/5 border border-[#FF6B6B]/20">
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#8F3C2C] dark:text-[#FF9E9E]">The Problem</span>
                            <p className="text-xs text-[#5A637A] dark:text-[#CBD5E1] mt-1 leading-relaxed">{caseStudyData.problem}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-[#E6F8F3]/60 dark:bg-white/5 border border-[#10B981]/20">
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#246A59] dark:text-[#2DD4BF]">The Solution</span>
                            <p className="text-xs text-[#5A637A] dark:text-[#CBD5E1] mt-1 leading-relaxed">{caseStudyData.solution}</p>
                        </div>
                    </div>

                    {/* Tab 1: User Flows */}
                    {activeTab === 'flows' && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-black uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">
                                Structured Interaction Architecture
                            </h4>
                            <div className="space-y-2.5">
                                {caseStudyData.userFlows.map((flow, i) => (
                                    <div key={i} className="p-3.5 rounded-2xl bg-white dark:bg-[#12141d] border border-[#14161F]/8 dark:border-white/10 flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-lg bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] font-black text-[11px] flex items-center justify-center shrink-0">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <p className="font-bold text-xs text-[#14161F] dark:text-white">{flow.step}</p>
                                            <p className="text-xs text-[#647087] dark:text-[#9DA7C2] mt-0.5">{flow.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Typography Scale */}
                    {activeTab === 'typography' && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-black uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">
                                Mathematical Typographic Hierarchy
                            </h4>
                            <div className="space-y-2.5">
                                {caseStudyData.typeScale.map((t, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#12141d] border border-[#14161F]/8 dark:border-white/10 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold text-[#FF6B6B] uppercase tracking-wider">{t.label}</span>
                                            <p className="font-black text-sm text-[#14161F] dark:text-white">{t.font}</p>
                                        </div>
                                        <span className="text-xs text-[#647087] dark:text-[#9DA7C2] max-w-[200px] text-right font-medium">
                                            {t.usage}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Design Decision Log */}
                    {activeTab === 'rationales' && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-black uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">
                                Heuristic Defense & Decision Matrix
                            </h4>
                            <div className="space-y-2.5">
                                {caseStudyData.decisionLog.map((log, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#12141d] border border-[#14161F]/8 dark:border-white/10 space-y-1">
                                        <p className="font-bold text-xs text-[#14161F] dark:text-white">Q: {log.question}</p>
                                        <p className="text-xs text-[#5A637A] dark:text-[#9DA7C2] leading-relaxed">Rationale: {log.rationale}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab 4: Markdown Export */}
                    {activeTab === 'export' && (
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="text-xs font-black uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">
                                    Formatted Markdown Export
                                </h4>
                                <Button
                                    onClick={() => {
                                        const md = `# ${caseStudyData.title}\n\n**Author:** Abhinav\n\n## Problem Statement\n${caseStudyData.problem}\n\n## Solution\n${caseStudyData.solution}\n\n## Key User Flows\n${caseStudyData.userFlows.map(f => `- **${f.step}**: ${f.desc}`).join('\n')}\n`
                                        navigator.clipboard.writeText(md)
                                        toast.success("Case study copied to clipboard in Markdown!")
                                    }}
                                    size="sm"
                                    className="rounded-full bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] font-bold text-xs"
                                >
                                    <FaCopy className="mr-1.5 h-3 w-3" /> Copy Markdown
                                </Button>
                            </div>
                            <pre className="p-4 rounded-2xl bg-[#14161F] text-[#DCE5FF] text-xs font-mono overflow-x-auto leading-relaxed">
{`# ${caseStudyData.title}
**Author:** Abhinav (@abhinav)

## Problem Statement
${caseStudyData.problem}

## Solution & Architecture
${caseStudyData.solution}

## User Flows
${caseStudyData.userFlows.map(f => `1. ${f.step}: ${f.desc}`).join('\n')}`}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
