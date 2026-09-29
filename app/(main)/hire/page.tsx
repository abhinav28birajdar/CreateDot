"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Briefcase,
    Star,
    CheckCircle2,
    MapPin,
    DollarSign,
    Sparkles,
    Send,
    X,
    ShieldCheck,
    ArrowUpRight,
    Search,
    MessageSquare
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface CreatorTalent {
    id: string
    name: string
    handle: string
    avatar: string
    headline: string
    location: string
    rate: string
    availability: 'Available Now' | 'Booked (Available Next Month)'
    rating: number
    reviewsCount: number
    skills: string[]
    portfolio: string[]
    bio: string
}

const TALENT_DIRECTORY: CreatorTalent[] = [
    {
        id: 't1',
        name: 'Elena Rostova',
        handle: 'elenadesign',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        headline: 'Principal Product & Design Systems Architect',
        location: 'San Francisco, CA / Remote',
        rate: '$140 / hr',
        availability: 'Available Now',
        rating: 5.0,
        reviewsCount: 38,
        skills: ['Figma', 'Fintech', 'Design Systems', 'Micro-Interactions'],
        portfolio: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80'
        ],
        bio: 'Over 8 years crafting award-winning financial software, dark-mode design languages, and high-conversion SaaS web applications.'
    },
    {
        id: 't2',
        name: 'Marcus Chen',
        handle: 'marcus_3d',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        headline: '3D Spatial, WebGL & VisionOS Specialist',
        location: 'Vancouver, Canada / Remote',
        rate: '$160 / hr',
        availability: 'Available Now',
        rating: 4.9,
        reviewsCount: 29,
        skills: ['Blender', 'Spline', 'Three.js', 'Cinema 4D'],
        portfolio: [
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80'
        ],
        bio: 'Crafts interactive 3D assets, procedural glass shaders, and tactile spatial environments that convert visitors into buyers.'
    },
    {
        id: 't3',
        name: 'Aria Takahashi',
        handle: 'ariat_brand',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        headline: 'Brand Identity Director & Swiss Typographer',
        location: 'London, UK / Hybrid',
        rate: '$120 / hr',
        availability: 'Booked (Available Next Month)',
        rating: 5.0,
        reviewsCount: 42,
        skills: ['Brand Systems', 'Typography', 'Packaging', 'Art Direction'],
        portfolio: [
            'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1608248597359-299e5251641d?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80'
        ],
        bio: 'Specializing in timeless, editorial-grade visual identities for architectural firms, luxury brands, and innovative tech companies.'
    },
    {
        id: 't4',
        name: 'Devon Vance',
        handle: 'devonvance',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        headline: 'Staff Design Engineer & Interactive Prototyper',
        location: 'Austin, TX / Remote',
        rate: '$150 / hr',
        availability: 'Available Now',
        rating: 4.9,
        reviewsCount: 24,
        skills: ['React', 'Next.js', 'Framer Motion', 'Figma Plugins'],
        portfolio: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'
        ],
        bio: 'Bridges visual craft with production-ready code. Ships performant web applications with seamless animations and design systems.'
    }
]

export default function HirePage() {
    const [selectedSpecialty, setSelectedSpecialty] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [hiringTalent, setHiringTalent] = useState<CreatorTalent | null>(null)
    const [projectScope, setProjectScope] = useState('')
    const [projectBudget, setProjectBudget] = useState('$5k - $10k')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const filteredTalent = TALENT_DIRECTORY.filter(talent => {
        const matchesSearch = !searchQuery || (
            talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            talent.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
            talent.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        return matchesSearch
    })

    const handleSubmitInquiry = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
            setHiringTalent(null)
            setProjectScope('')
            toast.success(`Inquiry sent to ${hiringTalent?.name}!`, {
                description: 'They typically reply within 24 hours via CreateDOT messages.'
            })
        }, 1200)
    }

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-[36px] bg-[#14161F] p-8 sm:p-14 text-white shadow-2xl">
                <div className="pointer-events-none absolute -top-10 -right-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 to-[#FFE185]/20 blur-3xl" />
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider mb-4 border border-white/10">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                        Verified Creator Network
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                        Hire World-Class Independent Creators.
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-[#9DA7C2] leading-relaxed">
                        Connect directly with senior product designers, 3D artists, brand strategists, and design engineers. Zero middleman agency markups.
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
                    <div>
                        <p className="text-2xl font-black text-white">Top 3%</p>
                        <p className="text-xs text-[#9DA7C2]">Vetted Portfolios</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-[#10B981]">0%</p>
                        <p className="text-xs text-[#9DA7C2]">Client Commission</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-[#FF6B6B]">&lt; 24h</p>
                        <p className="text-xs text-[#9DA7C2]">Response Guarantee</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-[#FFE185]">Escrow</p>
                        <p className="text-xs text-[#9DA7C2]">Milestone Protection</p>
                    </div>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C96AB]" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by skill, name, or role..."
                        className="h-11 pl-10 rounded-full bg-white/80 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs font-medium"
                    />
                </div>

                <div className="text-xs font-bold text-[#647087] dark:text-[#9DA7C2]">
                    Showing <span className="text-[#14161F] dark:text-white font-black">{filteredTalent.length}</span> vetted creators
                </div>
            </div>

            {/* Talent Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTalent.map((talent, idx) => (
                    <motion.div
                        key={talent.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.08 }}
                        className="group rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 p-6 sm:p-8 shadow-sm hover:shadow-2xl shadow-[#14161F]/5 transition-all flex flex-col justify-between backdrop-blur-sm"
                    >
                        <div>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3.5">
                                    <img
                                        src={talent.avatar}
                                        alt={talent.name}
                                        className="h-14 w-14 rounded-2xl object-cover ring-2 ring-black/5"
                                    />
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="font-bold text-lg text-[#14161F] dark:text-white group-hover:text-[#FF6B6B] transition">
                                                {talent.name}
                                            </h3>
                                            <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                                        </div>
                                        <p className="text-xs text-[#647087] dark:text-[#9DA7C2]">{talent.headline}</p>
                                    </div>
                                </div>

                                <div className="text-right shrink-0">
                                    <p className="font-black text-lg text-[#14161F] dark:text-white">{talent.rate}</p>
                                    <span className={`inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full mt-1 ${talent.availability.includes('Available Now') ? 'bg-[#10B981]/15 text-[#059669]' : 'bg-[#FAF0D7] text-[#8A6318]'}`}>
                                        {talent.availability}
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs text-[#5A637A] dark:text-[#9DA7C2] mt-4 leading-relaxed">
                                {talent.bio}
                            </p>

                            {/* Portfolio Snippet Collage */}
                            <div className="grid grid-cols-3 gap-2 my-4">
                                {talent.portfolio.map((img, i) => (
                                    <div key={i} className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                                        <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-1.5 flex-wrap">
                                {talent.skills.map(s => (
                                    <span key={s} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#14161F]/5 dark:bg-white/10 text-[#5A637A] dark:text-[#9DA7C2] font-semibold">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[#14161F]/6 dark:border-white/10 flex items-center justify-between">
                            <Link
                                href={`/u/${talent.handle}`}
                                className="text-xs font-bold text-[#647087] dark:text-[#9DA7C2] hover:text-[#14161F] dark:hover:text-white flex items-center gap-1"
                            >
                                Full Portfolio <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>

                            <Button
                                onClick={() => setHiringTalent(talent)}
                                className="bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold rounded-full text-xs h-9 px-5 shadow-md shadow-[#FF6B6B]/25"
                            >
                                Request Project Quote
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Hire / Quote Request Modal */}
            <AnimatePresence>
                {hiringTalent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-lg bg-white dark:bg-[#14161F] rounded-[32px] border border-[#14161F]/10 dark:border-white/10 p-6 sm:p-8 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setHiringTalent(null)}
                                className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#647087] dark:text-[#9DA7C2]"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="flex items-center gap-3 mb-4">
                                <img src={hiringTalent.avatar} alt={hiringTalent.name} className="h-12 w-12 rounded-2xl object-cover ring-2 ring-black/5" />
                                <div>
                                    <h3 className="font-bold text-lg text-[#14161F] dark:text-white">Request Quote from {hiringTalent.name}</h3>
                                    <p className="text-xs text-[#647087] dark:text-[#9DA7C2]">{hiringTalent.rate} • Typical response in 2-4 hours</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmitInquiry} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-[#14161F] dark:text-white">Project Description & Goals *</label>
                                    <Textarea
                                        required
                                        value={projectScope}
                                        onChange={(e) => setProjectScope(e.target.value)}
                                        placeholder="Describe your product, timeline, deliverable needs, and any reference designs..."
                                        rows={4}
                                        className="mt-1 rounded-2xl resize-none bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-[#14161F] dark:text-white">Estimated Budget</label>
                                    <select
                                        value={projectBudget}
                                        onChange={(e) => setProjectBudget(e.target.value)}
                                        className="w-full mt-1 px-4 py-2.5 rounded-2xl border border-[#14161F]/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-sm font-medium"
                                    >
                                        <option value="$2k - $5k">$2,000 – $5,000</option>
                                        <option value="$5k - $10k">$5,000 – $10,000</option>
                                        <option value="$10k - $25k">$10,000 – $25,000</option>
                                        <option value="$25k+">$25,000+</option>
                                    </select>
                                </div>

                                <div className="p-3 rounded-2xl bg-[#FAF0D7]/60 dark:bg-white/5 text-xs text-[#8A6318] dark:text-[#FFE185] flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-[#10B981] shrink-0" />
                                    <span className="font-medium">No obligation inquiry. Payment protected by milestone escrow.</span>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold rounded-full py-6 mt-2 shadow-lg shadow-[#FF6B6B]/25"
                                >
                                    {isSubmitting ? "Sending Project Inquiry..." : "Send Project Inquiry"}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
