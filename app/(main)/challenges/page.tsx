"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Clock, Users, ArrowUpRight, Sparkles, CheckCircle2, Award, Zap, X, ShieldCheck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface Challenge {
    id: string
    title: string
    category: string
    prize: string
    daysLeft: number
    submissionsCount: number
    image: string
    sponsor: string
    sponsorLogo: string
    description: string
    rules: string[]
    judges: { name: string; role: string; avatar: string }[]
}

const CHALLENGES_DATA: Challenge[] = [
    {
        id: 'ch1',
        title: 'Spatial Widget & Micro-Interaction Challenge',
        category: '3D & Spatial UI',
        prize: '$2,500 + 1-Yr Figma Pro',
        daysLeft: 4,
        submissionsCount: 148,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        sponsor: 'Spline & CreateDOT',
        sponsorLogo: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=100&q=80',
        description: 'Design an interactive tactile widget for spatial computing or desktop platforms with high emphasis on lighting, sound cues, and fluid motion transitions.',
        rules: [
            'Must include interactive prototype video or live link',
            'Original work created during the challenge period',
            'Case study must detail micro-interaction logic'
        ],
        judges: [
            { name: 'Elena Rostova', role: 'Principal Designer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
            { name: 'Marcus Chen', role: '3D Artist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' }
        ]
    },
    {
        id: 'ch2',
        title: 'Autonomous AI Finance & Banking Assistant',
        category: 'Product Design',
        prize: '$1,800 + Pro Creator Badge',
        daysLeft: 11,
        submissionsCount: 92,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        sponsor: 'Fintech Collective',
        sponsorLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=100&q=80',
        description: 'Rethink how individuals monitor wealth and investments with generative intelligence. Focus on trust, hierarchy, and delight.',
        rules: [
            'Include desktop and mobile screens',
            'Figma component library breakdown',
            'Accessibility & color contrast compliant'
        ],
        judges: [
            { name: 'Sophia Lin', role: 'Design Director', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80' }
        ]
    },
    {
        id: 'ch3',
        title: 'Swiss Brutalism Editorial & Monograph Cover',
        category: 'Branding & Print',
        prize: '$1,200 + Global Feature',
        daysLeft: 18,
        submissionsCount: 64,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
        sponsor: 'Zurich Design Review',
        sponsorLogo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
        description: 'Design an avant-garde publication monograph using asymmetric grid structures, custom typographic ligatures, and architectural rhythm.',
        rules: [
            'High-resolution PDF or 4K mockup render',
            'Description of typographic rationale and grid system'
        ],
        judges: [
            { name: 'Aria Takahashi', role: 'Brand Director', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80' }
        ]
    }
]

export default function ChallengesPage() {
    const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)
    const [isJoining, setIsJoining] = useState(false)

    const handleJoin = (challenge: Challenge) => {
        setIsJoining(true)
        setTimeout(() => {
            setIsJoining(false)
            setActiveChallenge(null)
            toast.success(`You joined "${challenge.title}"!`, {
                description: 'Challenge guidelines & Figma starter kit sent to your inbox.'
            })
        }, 1000)
    }

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-[36px] bg-[#14161F] p-8 sm:p-14 text-white shadow-2xl">
                <div className="pointer-events-none absolute -top-10 -right-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 to-[#FFE185]/20 blur-3xl" />
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider mb-4 border border-white/10">
                        <Trophy className="h-3.5 w-3.5 text-[#FFE185]" />
                        Guild Design Arena
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                        Design Challenges & Cash Prizes.
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-[#9DA7C2] leading-relaxed">
                        Compete with top creators worldwide, push your craft to the limit, and get discovered by leading creative directors and design teams.
                    </p>
                </div>
            </div>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CHALLENGES_DATA.map((ch, idx) => (
                    <motion.div
                        key={ch.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.08 }}
                        className="group flex flex-col rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl shadow-[#14161F]/5 transition-all backdrop-blur-sm"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                            <img
                                src={ch.image}
                                alt={ch.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="px-3 py-1 rounded-full text-xs font-black bg-[#FAF0D7] text-[#8A6318] shadow-md">
                                    🏆 {ch.prize}
                                </span>
                            </div>
                            <div className="absolute top-3 right-3">
                                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white">
                                    <Clock className="h-3 w-3" /> {ch.daysLeft}d left
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between text-xs text-[#647087] dark:text-[#9DA7C2] mb-1.5">
                                    <span className="font-bold text-[#FF6B6B]">{ch.category}</span>
                                    <span className="flex items-center gap-1 font-semibold">
                                        <Users className="h-3 w-3" /> {ch.submissionsCount} entries
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg text-[#14161F] dark:text-white group-hover:text-[#FF6B6B] transition">
                                    {ch.title}
                                </h3>
                                <p className="text-xs text-[#647087] dark:text-[#9DA7C2] mt-2 line-clamp-2 leading-relaxed">
                                    {ch.description}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-[#14161F]/6 dark:border-white/10 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {ch.judges.map((j, i) => (
                                        <img
                                            key={i}
                                            src={j.avatar}
                                            alt={j.name}
                                            title={`Judge: ${j.name}`}
                                            className="h-7 w-7 rounded-full object-cover ring-2 ring-white dark:ring-[#14161F]"
                                        />
                                    ))}
                                </div>

                                <Button
                                    onClick={() => setActiveChallenge(ch)}
                                    className="bg-[#14161F] hover:bg-[#252B3F] text-white dark:bg-white dark:text-[#14161F] font-bold rounded-full text-xs h-9 px-4 shadow-sm"
                                >
                                    View Brief & Join
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Challenge Modal Brief */}
            <AnimatePresence>
                {activeChallenge && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-2xl bg-white dark:bg-[#14161F] rounded-[32px] border border-[#14161F]/10 dark:border-white/10 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setActiveChallenge(null)}
                                className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#647087] dark:text-[#9DA7C2]"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-[#FAF0D7] text-[#8A6318] mb-3">
                                🏆 Prize Pool: {activeChallenge.prize}
                            </div>

                            <h2 className="text-2xl font-black text-[#14161F] dark:text-white mb-2">
                                {activeChallenge.title}
                            </h2>
                            <p className="text-xs text-[#647087] dark:text-[#9DA7C2] mb-6">
                                Sponsored by {activeChallenge.sponsor} • Closes in {activeChallenge.daysLeft} days
                            </p>

                            <div className="space-y-4 text-sm text-[#14161F] dark:text-[#E2E8F0]">
                                <h4 className="font-black text-xs uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">The Brief</h4>
                                <p className="leading-relaxed text-[#5A637A] dark:text-[#9DA7C2]">{activeChallenge.description}</p>

                                <h4 className="font-black text-xs uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2] pt-2">Rules & Submission Criteria</h4>
                                <ul className="space-y-2">
                                    {activeChallenge.rules.map((rule, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-xs">
                                            <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                                            <span>{rule}</span>
                                        </li>
                                    ))}
                                </ul>

                                <h4 className="font-black text-xs uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2] pt-2">Jury Panel</h4>
                                <div className="flex items-center gap-3">
                                    {activeChallenge.judges.map(j => (
                                        <div key={j.name} className="flex items-center gap-2 p-2 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10">
                                            <img src={j.avatar} alt={j.name} className="h-8 w-8 rounded-full object-cover" />
                                            <div>
                                                <p className="text-xs font-bold text-[#14161F] dark:text-white">{j.name}</p>
                                                <p className="text-[10px] text-[#647087] dark:text-[#9DA7C2]">{j.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-[#14161F]/8 dark:border-white/10 flex items-center justify-between">
                                <span className="text-xs text-[#647087] dark:text-[#9DA7C2]">
                                    Free entry for all community members
                                </span>
                                <Button
                                    onClick={() => handleJoin(activeChallenge)}
                                    disabled={isJoining}
                                    className="bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold px-8 py-6 rounded-full shadow-lg shadow-[#FF6B6B]/25"
                                >
                                    {isJoining ? "Joining..." : "Join Challenge & Get Starter Kit"}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
