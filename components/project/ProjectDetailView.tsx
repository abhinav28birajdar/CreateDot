"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FaHeart,
    FaEye,
    FaBookmark,
    FaShareNodes,
    FaArrowLeft,
    FaCircleCheck,
    FaComment,
    FaPaperPlane,
    FaWandMagicSparkles,
    FaCode,
    FaSliders,
    FaPlay,
    FaPause,
    FaRotate,
    FaCopy,
    FaArrowUpRightFromSquare,
    FaShieldHalved,
    FaTerminal,
    FaCube,
    FaPalette,
    FaCoins
} from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export interface ProjectDetailProps {
    id: string
}

export function ProjectDetailView({ id }: ProjectDetailProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(1840)
    const [isSaved, setIsSaved] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState<{ id: string; author: string; avatar: string; text: string; time: string }[]>([
        {
            id: '1',
            author: 'Maya Lin',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
            text: 'The glassmorphic depth and micro-animations feel incredibly tactile. What stack is this built with?',
            time: '2h ago'
        },
        {
            id: '2',
            author: 'Marcus Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
            text: 'Super clean token architecture Abhinav! Love how responsive the live preview is.',
            time: '4h ago'
        }
    ])

    // QuantumPay demo states
    const [balance, setBalance] = useState(42850.50)
    const [showBalance, setShowBalance] = useState(true)
    const [aiQuery, setAiQuery] = useState('')
    const [aiAnswer, setAiAnswer] = useState<string | null>(null)
    const [isAiThinking, setIsAiThinking] = useState(false)

    // Sphere 3D demo states
    const [isWireframe, setIsWireframe] = useState(false)
    const [rotationSpeed, setRotationSpeed] = useState(1.5)
    const [sphereColor, setSphereColor] = useState('#7057BD')
    const [isPlayingSound, setIsPlayingSound] = useState(true)

    // Nova Design System demo states
    const [tokenTheme, setTokenTheme] = useState<'default' | 'neon' | 'swiss' | 'ivory'>('default')
    const [tokenRadius, setTokenRadius] = useState(24)
    const [tokenHue, setTokenHue] = useState('#FF6B6B')
    const [tokenDensity, setTokenDensity] = useState<'compact' | 'normal' | 'relaxed'>('normal')

    const isQuantum = id === 'proj-demo-1' || id.toLowerCase().includes('quantum')
    const isSphere = id === 'proj-demo-2' || id.toLowerCase().includes('sphere')
    const isNova = id === 'proj-demo-3' || id.toLowerCase().includes('nova')

    const projectData = {
        id,
        title: isQuantum
            ? 'QuantumPay — NextGen AI Banking App'
            : isSphere
                ? 'Sphere 3D — Geometric Spatial Studio'
                : isNova
                    ? 'Nova Design System — Tokens & Multi-brand'
                    : 'Marrow — Coffee culture, remixed',
        author: 'Abhinav',
        handle: '@abhinav',
        avatar: '/images/profile-image-4.png',
        role: 'Principal Creative Technologist',
        date: '9/29/2026',
        status: isSphere ? 'in_progress' : 'completed',
        category: isQuantum ? 'Product & Fintech' : isSphere ? '3D & Spatial UI' : 'Design Systems',
        description: isQuantum
            ? 'Autonomous financial assistant with dark mode glassmorphism interface and tactile micro-interactions.'
            : isSphere
                ? 'Interactive 3D geometry engine built for web experiences and AR/VR spatial devices.'
                : 'Component architecture with variable color modes, semantic tokens, and React parity.',
        tags: isQuantum
            ? ['Fintech', 'Autonomous AI', 'Glassmorphism', 'Micro-Interactions']
            : isSphere
                ? ['3D Spatial', 'WebGL', 'Shaders', 'Audio Responsive']
                : ['Design Tokens', 'Figma Variables', 'React Parity', 'Multi-brand'],
        views: '24,800',
        awards: 'FWA of the Day • Awwwards Site of the Day'
    }

    const handleLike = () => {
        setIsLiked(!isLiked)
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
        toast.success(isLiked ? 'Removed from appreciations' : 'Appreciated project!')
    }

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href)
            toast.success('Project link copied to clipboard!')
        }
    }

    const handleAiSubmit = (promptText?: string) => {
        const query = promptText || aiQuery
        if (!query.trim()) return
        setIsAiThinking(true)
        setAiAnswer(null)
        setTimeout(() => {
            setIsAiThinking(false)
            if (query.toLowerCase().includes('burn') || query.toLowerCase().includes('spend')) {
                setAiAnswer('Your average burn rate is $3,420/month with 78% dedicated to infrastructure and tools. You have 14 months of runway at current balance.')
            } else if (query.toLowerCase().includes('send') || query.toLowerCase().includes('pay')) {
                setAiAnswer('Transaction initiated: Sent $500 to Linear Dev Guild via instant zero-fee rollup. New balance: $42,350.50.')
                setBalance(prev => prev - 500)
            } else {
                setAiAnswer(`Autonomous Analysis for "${query}": System optimized asset distribution across yield pools, saving $142 in slippage. All smart contracts verified.`)
            }
        }, 800)
    }

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault()
        if (!commentText.trim()) return
        setComments(prev => [
            {
                id: Date.now().toString(),
                author: 'Abhinav',
                avatar: '/images/profile-image-4.png',
                text: commentText,
                time: 'Just now'
            },
            ...prev
        ])
        setCommentText('')
        toast.success('Comment posted successfully!')
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between gap-4">
                <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-[#14161F]/10 dark:border-white/10 text-xs font-bold text-[#14161F] dark:text-white hover:bg-white transition shadow-sm"
                >
                    <FaArrowLeft className="h-3 w-3" />
                    <span>Back to Explore</span>
                </Link>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleLike}
                        variant="outline"
                        className={`rounded-full px-5 text-xs font-bold gap-2 transition ${isLiked ? 'bg-[#FF6B6B] text-white border-[#FF6B6B] hover:bg-[#F35555]' : 'border-[#14161F]/15 dark:border-white/10'}`}
                    >
                        <FaHeart className={`h-3.5 w-3.5 ${isLiked ? 'fill-current' : 'text-[#FF6B6B]'}`} />
                        <span>{likeCount}</span>
                    </Button>

                    <Button
                        onClick={() => {
                            setIsSaved(!isSaved)
                            toast.success(isSaved ? 'Removed from collection' : 'Saved to your moodboard!')
                        }}
                        variant="outline"
                        className={`rounded-full px-4 text-xs font-bold transition ${isSaved ? 'bg-[#14161F] text-white dark:bg-white dark:text-[#14161F]' : 'border-[#14161F]/15 dark:border-white/10'}`}
                    >
                        <FaBookmark className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                        onClick={handleShare}
                        variant="outline"
                        className="rounded-full px-4 text-xs font-bold border-[#14161F]/15 dark:border-white/10"
                    >
                        <FaShareNodes className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            {/* Project Header Banner */}
            <div className="relative overflow-hidden rounded-[36px] bg-[#14161F] p-8 sm:p-14 text-white shadow-2xl">
                <div className="pointer-events-none absolute -top-10 -right-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 via-[#7057BD]/20 to-[#FFE185]/20 blur-3xl" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                                <FaWandMagicSparkles className="h-3 w-3 text-[#FFE185]" />
                                {projectData.category}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase ${projectData.status === 'completed' ? 'bg-[#10B981]/20 text-[#2DD4BF] border border-[#10B981]/30' : 'bg-[#FAF0D7] text-[#8A6318]'}`}>
                                <FaCircleCheck className="h-3 w-3" />
                                {projectData.status === 'completed' ? 'Completed' : 'In Progress'}
                            </span>
                            <span className="text-xs text-[#9DA7C2] font-semibold">
                                Published: {projectData.date}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                            {projectData.title}
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-[#9DA7C2] leading-relaxed">
                            {projectData.description}
                        </p>

                        {/* Creator Strip with Abhinav's Profile */}
                        <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/10">
                            <img
                                src={projectData.avatar}
                                alt={projectData.author}
                                className="h-14 w-14 rounded-2xl object-cover ring-2 ring-[#FF6B6B] shadow-lg"
                            />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-base text-white">{projectData.author}</h3>
                                    <span className="px-2 py-0.5 rounded-full bg-[#FF6B6B] text-[10px] font-black uppercase text-white">
                                        Author
                                    </span>
                                </div>
                                <p className="text-xs text-[#9DA7C2]">{projectData.role} • {projectData.handle}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                        <Link
                            href="/hire"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold text-sm shadow-xl shadow-[#FF6B6B]/30 transition"
                        >
                            <span>Commission Creator</span>
                            <FaArrowUpRightFromSquare className="h-3 w-3" />
                        </Link>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#9DA7C2] space-y-1">
                            <p className="font-bold text-white flex items-center gap-1.5">
                                <FaEye className="h-3.5 w-3.5 text-[#10B981]" /> {projectData.views} Total Views
                            </p>
                            <p className="text-[11px] text-[#A2AECB]">{projectData.awards}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* REAL-TIME INTERACTIVE CANVAS ENGINE */}
            <div className="rounded-[36px] bg-white/80 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#14161F]/8 dark:border-white/10 pb-5">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0D7] dark:bg-white/10 text-xs font-black text-[#8A6318] dark:text-[#FFE185] uppercase tracking-wider mb-1">
                            <FaTerminal className="h-3 w-3 text-[#FF6B6B]" />
                            Live Real-Time Interactive Playground
                        </div>
                        <h2 className="text-2xl font-black text-[#14161F] dark:text-white">
                            {isQuantum && "Autonomous Banking AI & Micro-Interaction Simulator"}
                            {isSphere && "Spatial 3D Geometry Engine & Audio Visualizer"}
                            {isNova && "Nova Multi-Brand Token Studio (Live React Parity)"}
                            {!isQuantum && !isSphere && !isNova && "Interactive Creative Showcase"}
                        </h2>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#059669] dark:text-[#2DD4BF] text-xs font-bold">
                        <span className="h-2 w-2 rounded-full bg-[#10B981] animate-ping" />
                        Running Live • 60 FPS
                    </span>
                </div>

                {/* PROJECT 1: QUANTUMPAY INTERACTIVE AI BANKING */}
                {isQuantum && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                            {/* Left Widget: Glassmorphic Banking Card */}
                            <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#121829] via-[#1a233d] to-[#252E4B] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
                                <div className="absolute top-0 right-0 -mr-10 -mt-10 h-44 w-44 rounded-full bg-[#FF6B6B]/20 blur-2xl pointer-events-none" />
                                
                                <div>
                                    <div className="flex items-center justify-between text-xs font-semibold text-[#8DA6FA]">
                                        <span>QUANTUMPAY PRIME</span>
                                        <button
                                            onClick={() => setShowBalance(!showBalance)}
                                            className="px-2.5 py-1 rounded-full bg-white/10 text-white hover:bg-white/20 transition text-[11px]"
                                        >
                                            {showBalance ? 'Hide Balance' : 'Show Balance'}
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs uppercase tracking-wider text-white/50">Total Net Worth</p>
                                        <h3 className="text-3xl sm:text-4xl font-black mt-1 tracking-tight text-white">
                                            {showBalance ? `$${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '••••••••'}
                                        </h3>
                                        <p className="text-xs font-bold text-[#10B981] mt-1">+14.8% vs last month ($5,280 yield)</p>
                                    </div>
                                </div>

                                <div className="my-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span>Autonomous Yield Engine</span>
                                        <span className="text-[#FFE185]">Active · 8.4% APY</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#FFE185] w-[78%] rounded-full animate-pulse" />
                                    </div>
                                    <p className="text-[10px] text-white/60">Auto-hedged against inflation via decentralized treasury</p>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-white/10">
                                    <p className="text-[11px] font-bold text-white/70 uppercase tracking-wider">Quick Actions</p>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <button
                                            onClick={() => handleAiSubmit("Send $500 to Linear")}
                                            className="p-2.5 rounded-xl bg-white/10 hover:bg-[#FF6B6B] hover:text-white transition font-bold text-left"
                                        >
                                            💸 Send $500
                                        </button>
                                        <button
                                            onClick={() => handleAiSubmit("What is my burn rate this month?")}
                                            className="p-2.5 rounded-xl bg-white/10 hover:bg-[#FF6B6B] hover:text-white transition font-bold text-left"
                                        >
                                            📊 Burn Analysis
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Interactive AI Copilot Interface */}
                            <div className="lg:col-span-7 rounded-3xl bg-[#14161F]/5 dark:bg-white/[0.03] border border-[#14161F]/10 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-xl bg-[#14161F] dark:bg-white text-white dark:text-[#14161F] flex items-center justify-center font-black text-xs">
                                                QP
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-[#14161F] dark:text-white">Financial AI Copilot</h4>
                                                <p className="text-[11px] text-[#647087]">Natural language portfolio command center</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-0.5 rounded-full">
                                            Online
                                        </span>
                                    </div>

                                    {/* Conversation Display */}
                                    <div className="min-h-[160px] p-4 rounded-2xl bg-white dark:bg-[#12141d] border border-[#14161F]/8 dark:border-white/10 text-xs space-y-3">
                                        <div className="p-3 rounded-xl bg-[#14161F]/5 dark:bg-white/5 text-[#5A637A] dark:text-[#9DA7C2]">
                                            👋 Hi Abhinav! I monitor your cashflow, smart contract yields, and recurring SaaS contracts in real time. Ask me anything or trigger a payment.
                                        </div>

                                        {isAiThinking && (
                                            <div className="p-3 rounded-xl bg-[#FAF0D7] text-[#8A6318] flex items-center gap-2 font-bold animate-pulse">
                                                <FaWandMagicSparkles className="h-3 w-3 animate-spin" />
                                                Synthesizing financial telemetry & liquidity pools...
                                            </div>
                                        )}

                                        {aiAnswer && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-3 rounded-xl bg-[#10B981]/15 text-[#059669] dark:text-[#2DD4BF] font-semibold leading-relaxed border border-[#10B981]/30"
                                            >
                                                🤖 {aiAnswer}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <Input
                                        value={aiQuery}
                                        onChange={(e) => setAiQuery(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleAiSubmit() }}
                                        placeholder="Ask: 'Forecast Q4 taxes' or 'Send $500 to Linear'..."
                                        className="h-12 rounded-2xl bg-white dark:bg-[#12141d] border-[#14161F]/10 dark:border-white/10 text-xs"
                                    />
                                    <Button
                                        onClick={() => handleAiSubmit()}
                                        className="h-12 px-6 rounded-2xl bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold shrink-0"
                                    >
                                        <FaPaperPlane className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* PROJECT 2: SPHERE 3D INTERACTIVE SPATIAL STUDIO */}
                {isSphere && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                            {/* 3D Visualizer Canvas Screen */}
                            <div className="lg:col-span-8 rounded-3xl bg-[#0e111a] border border-white/10 p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
                                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold text-white border border-white/10">
                                        Engine: WebGL Spatial 2.4
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                                        Vertices: 32,400
                                    </span>
                                </div>

                                {/* Simulated 3D Geometry with CSS 3D & Framer Motion */}
                                <div className="my-auto flex items-center justify-center relative py-12">
                                    <motion.div
                                        animate={{
                                            rotateX: [0, 360],
                                            rotateY: [0, 360],
                                            scale: [1, 1.05, 1]
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 16 / rotationSpeed,
                                            ease: "linear"
                                        }}
                                        style={{
                                            borderColor: sphereColor,
                                            boxShadow: `0 0 40px ${sphereColor}55`
                                        }}
                                        className={`h-48 w-48 rounded-full border-4 flex items-center justify-center relative transition-colors ${isWireframe ? 'border-dashed opacity-80' : 'bg-gradient-to-tr from-[#14161F] via-[#7057BD]/40 to-[#FF6B6B]/40 backdrop-blur-md'}`}
                                    >
                                        <div className="absolute inset-4 rounded-full border border-white/30" />
                                        <div className="absolute inset-10 rounded-full border border-white/40 rotate-45" />
                                        <FaCube className="h-10 w-10 text-white drop-shadow-lg" />
                                    </motion.div>
                                </div>

                                {/* Audio Waveform Sync */}
                                <div className="flex items-center justify-between border-t border-white/10 pt-4 z-10">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setIsPlayingSound(!isPlayingSound)}
                                            className="h-8 w-8 rounded-full bg-white text-[#14161F] flex items-center justify-center font-bold text-xs"
                                        >
                                            {isPlayingSound ? <FaPause className="h-3 w-3" /> : <FaPlay className="h-3 w-3 ml-0.5" />}
                                        </button>
                                        <span className="text-xs text-white/80 font-bold">Spatial Audio Waveform</span>
                                    </div>
                                    <div className="flex items-end gap-1.5 h-6">
                                        {[30, 80, 50, 95, 65, 40, 75, 85, 45, 90, 60, 35].map((h, i) => (
                                            <span
                                                key={i}
                                                style={{ height: isPlayingSound ? `${h}%` : '20%' }}
                                                className="w-1.5 rounded-full bg-[#FFE185] transition-all duration-300"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 3D Geometry Controls Panel */}
                            <div className="lg:col-span-4 rounded-3xl bg-[#14161F]/5 dark:bg-white/[0.03] border border-[#14161F]/10 dark:border-white/10 p-6 flex flex-col justify-between space-y-4">
                                <div>
                                    <h4 className="text-sm font-black text-[#14161F] dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <FaSliders className="h-4 w-4 text-[#FF6B6B]" />
                                        Mesh Shader Parameters
                                    </h4>

                                    <div className="space-y-4 text-xs font-bold text-[#14161F] dark:text-white">
                                        <div>
                                            <div className="flex justify-between mb-1.5">
                                                <span>Rotation Speed</span>
                                                <span className="text-[#FF6B6B]">{rotationSpeed.toFixed(1)}x</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.2"
                                                max="4"
                                                step="0.1"
                                                value={rotationSpeed}
                                                onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                                                className="w-full accent-[#FF6B6B]"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-[#12141d] border border-[#14161F]/8 dark:border-white/10">
                                            <span>Wireframe Topology</span>
                                            <input
                                                type="checkbox"
                                                checked={isWireframe}
                                                onChange={(e) => setIsWireframe(e.target.checked)}
                                                className="h-4 w-4 rounded accent-[#FF6B6B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block mb-2">Ambient Shading Hue</label>
                                            <div className="flex gap-2">
                                                {['#7057BD', '#FF6B6B', '#10B981', '#38BDF8', '#F59E0B'].map(color => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setSphereColor(color)}
                                                        style={{ backgroundColor: color }}
                                                        className={`h-8 w-8 rounded-full border-2 transition-transform ${sphereColor === color ? 'scale-110 border-white ring-2 ring-black' : 'border-transparent'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => toast.success("Spatial GLTF model exported to clipboard!")}
                                    className="w-full h-11 rounded-2xl bg-[#14161F] hover:bg-[#252B3F] text-white dark:bg-white dark:text-[#14161F] font-bold text-xs"
                                >
                                    Export Spatial GLTF / USDZ
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* PROJECT 3: NOVA DESIGN SYSTEM TOKEN STUDIO */}
                {isNova && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                            {/* Left: Token Controls */}
                            <div className="lg:col-span-5 rounded-3xl bg-[#14161F]/5 dark:bg-white/[0.03] border border-[#14161F]/10 dark:border-white/10 p-6 space-y-5">
                                <h4 className="text-sm font-black text-[#14161F] dark:text-white uppercase tracking-wider flex items-center gap-2">
                                    <FaPalette className="h-4 w-4 text-[#FF6B6B]" />
                                    Semantic Token Variables
                                </h4>

                                {/* Theme Presets */}
                                <div>
                                    <label className="text-xs font-bold text-[#647087] dark:text-[#9DA7C2] block mb-2">Theme Mode</label>
                                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                                        {[
                                            { id: 'default', label: 'Coral Modern' },
                                            { id: 'neon', label: 'Cyberpunk' },
                                            { id: 'swiss', label: 'Swiss Modern' },
                                            { id: 'ivory', label: 'Warm Ivory' }
                                        ].map(t => (
                                            <button
                                                key={t.id}
                                                onClick={() => {
                                                    setTokenTheme(t.id as any)
                                                    if (t.id === 'neon') setTokenHue('#10B981')
                                                    else if (t.id === 'swiss') setTokenHue('#14161F')
                                                    else if (t.id === 'ivory') setTokenHue('#D97706')
                                                    else setTokenHue('#FF6B6B')
                                                }}
                                                className={`p-2.5 rounded-xl border transition ${tokenTheme === t.id ? 'bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] border-transparent shadow-sm' : 'bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-[#647087]'}`}
                                            >
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Radius Slider */}
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-1.5">
                                        <span>--radius-card</span>
                                        <span className="text-[#FF6B6B]">{tokenRadius}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="4"
                                        max="36"
                                        value={tokenRadius}
                                        onChange={(e) => setTokenRadius(parseInt(e.target.value))}
                                        className="w-full accent-[#FF6B6B]"
                                    />
                                </div>

                                {/* Hue Customizer */}
                                <div>
                                    <label className="text-xs font-bold text-[#647087] dark:text-[#9DA7C2] block mb-1.5">--primary-accent</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={tokenHue}
                                            onChange={(e) => setTokenHue(e.target.value)}
                                            className="h-10 w-14 rounded-xl cursor-pointer border border-[#14161F]/10 dark:border-white/10 p-0.5 bg-transparent"
                                        />
                                        <span className="font-mono text-xs font-bold px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-[#14161F]/10 dark:border-white/10">
                                            {tokenHue}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => {
                                        const code = `:root {\n  --primary: ${tokenHue};\n  --radius: ${tokenRadius}px;\n}`
                                        navigator.clipboard.writeText(code)
                                        toast.success("Tokens CSS copied to clipboard!")
                                    }}
                                    className="w-full rounded-2xl bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold text-xs h-11"
                                >
                                    <FaCopy className="mr-1.5 h-3.5 w-3.5" />
                                    Copy Token Code
                                </Button>
                            </div>

                            {/* Right: Live Interactive Component Preview reacting to tokens */}
                            <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#12141d] border border-[#14161F]/10 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">Live Component Manifestation</span>
                                    
                                    <div className="mt-6 space-y-4">
                                        {/* Dynamic Card */}
                                        <div
                                            style={{ borderRadius: `${tokenRadius}px` }}
                                            className="p-6 bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-lg space-y-3 transition-all"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span
                                                    style={{ backgroundColor: `${tokenHue}20`, color: tokenHue }}
                                                    className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider"
                                                >
                                                    Nova Component
                                                </span>
                                                <span className="text-xs font-bold text-muted-foreground">Tokens in sync</span>
                                            </div>
                                            <h4 className="text-lg font-black text-[#14161F] dark:text-white">
                                                Variable Mode Token Container
                                            </h4>
                                            <p className="text-xs text-[#5A637A] dark:text-[#9DA7C2] leading-relaxed">
                                                Radius and accent colors are reacting live to CSS custom property bindings with zero re-rendering overhead.
                                            </p>
                                            <div className="pt-2 flex items-center gap-3">
                                                <button
                                                    style={{ backgroundColor: tokenHue, borderRadius: `${tokenRadius / 2}px` }}
                                                    className="px-5 py-2.5 text-xs font-bold text-white shadow-md transition-transform active:scale-95"
                                                >
                                                    Primary CTA
                                                </button>
                                                <button
                                                    style={{ borderRadius: `${tokenRadius / 2}px` }}
                                                    className="px-5 py-2.5 text-xs font-bold border border-[#14161F]/20 dark:border-white/20 text-[#14161F] dark:text-white"
                                                >
                                                    Secondary
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-[#14161F]/8 dark:border-white/10 flex items-center justify-between text-xs text-[#647087]">
                                    <span>Sync Status: 100% Figma Tokens Parity</span>
                                    <span className="font-bold text-[#14161F] dark:text-white">React 19 Ready</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Case Study Details & Discussion Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Case study breakdown */}
                <div className="lg:col-span-8 rounded-[36px] bg-white/80 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 p-6 sm:p-10 shadow-sm space-y-6 backdrop-blur-xl">
                    <h3 className="text-2xl font-black text-[#14161F] dark:text-white">
                        Design Rationale & Case Study
                    </h3>
                    
                    <div className="space-y-4 text-sm text-[#5A637A] dark:text-[#E2E8F0] leading-relaxed">
                        <p>
                            High-craft digital interfaces require equal parts aesthetic intuition and systematic discipline. In this study, we explored tactile spatial micro-interactions paired with high-performance WebGL and token architectures.
                        </p>
                        <h4 className="text-base font-bold text-[#14161F] dark:text-white pt-2">Key Accomplishments</h4>
                        <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#5A637A] dark:text-[#9DA7C2]">
                            <li>Engineered 60 FPS animation pipelines with sub-10ms input latency</li>
                            <li>Integrated automated accessibility checks meeting WCAG AAA standard</li>
                            <li>Built multi-brand token system with instant light/dark/high-contrast mode parity</li>
                        </ul>
                    </div>

                    {/* Community Comments */}
                    <div className="pt-8 border-t border-[#14161F]/8 dark:border-white/10 space-y-5">
                        <h4 className="text-lg font-black text-[#14161F] dark:text-white flex items-center gap-2">
                            <FaComment className="h-4 w-4 text-[#FF6B6B]" />
                            Community Feedback ({comments.length})
                        </h4>

                        <form onSubmit={handleAddComment} className="flex gap-2">
                            <Input
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Leave constructive design feedback for Abhinav..."
                                className="h-11 rounded-2xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs"
                            />
                            <Button type="submit" className="h-11 px-5 rounded-2xl bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] font-bold text-xs shrink-0">
                                Post
                            </Button>
                        </form>

                        <div className="space-y-3">
                            {comments.map(c => (
                                <div key={c.id} className="p-4 rounded-2xl bg-[#14161F]/[0.02] dark:bg-white/[0.02] border border-[#14161F]/6 dark:border-white/5 flex items-start gap-3">
                                    <img src={c.avatar} alt={c.author} className="h-8 w-8 rounded-full object-cover ring-1 ring-black/5" />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-xs text-[#14161F] dark:text-white">{c.author}</span>
                                            <span className="text-[10px] text-[#8C96AB]">{c.time}</span>
                                        </div>
                                        <p className="text-xs text-[#5A637A] dark:text-[#9DA7C2] mt-1">{c.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Project Meta Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="rounded-[32px] bg-white/80 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 p-6 space-y-5 shadow-sm backdrop-blur-xl">
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">
                            Project Metadata
                        </h4>

                        <div className="space-y-3 text-xs">
                            <div className="flex justify-between py-2 border-b border-[#14161F]/6 dark:border-white/5">
                                <span className="text-[#647087]">Lead Creator</span>
                                <span className="font-bold text-[#14161F] dark:text-white">Abhinav</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#14161F]/6 dark:border-white/5">
                                <span className="text-[#647087]">Verification</span>
                                <span className="font-bold text-[#10B981] flex items-center gap-1">
                                    <FaCircleCheck className="h-3 w-3" /> CreateDOT Verified
                                </span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#14161F]/6 dark:border-white/5">
                                <span className="text-[#647087]">Status</span>
                                <span className="font-bold text-[#FF6B6B]">{projectData.status}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[#14161F]/6 dark:border-white/5">
                                <span className="text-[#647087]">Date</span>
                                <span className="font-bold text-[#14161F] dark:text-white">{projectData.date}</span>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-bold text-[#647087] block mb-2">Tagged Disciplines</span>
                            <div className="flex flex-wrap gap-1.5">
                                {projectData.tags.map(t => (
                                    <span key={t} className="px-3 py-1 rounded-full bg-[#14161F]/5 dark:bg-white/10 text-[#5A637A] dark:text-[#9DA7C2] text-xs font-semibold">
                                        #{t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
