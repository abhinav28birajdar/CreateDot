"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Filter, Sparkles, Heart, Eye, ArrowUpRight, User, Layers, Briefcase, SlidersHorizontal } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SearchItem {
    id: string
    type: 'project' | 'creator' | 'collection'
    title: string
    subtitle: string
    category: string
    image: string
    likes?: number
    views?: number
    followers?: string
    tags: string[]
    tools: string[]
    color?: string
}

const SEARCH_DATABASE: SearchItem[] = [
    {
        id: 's1',
        type: 'project',
        title: 'QuantumPay — NextGen AI Banking App',
        subtitle: 'By Elena Rostova',
        category: 'UI/UX Design',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        likes: 1420,
        views: 18900,
        tags: ['fintech', 'mobile-app', 'dark-mode', 'dashboard'],
        tools: ['Figma', 'Principle'],
        color: '#8B5DFF'
    },
    {
        id: 's2',
        type: 'project',
        title: 'Sphere 3D — Geometric Spatial Studio',
        subtitle: 'By Marcus Chen',
        category: '3D & Motion',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        likes: 980,
        views: 12400,
        tags: ['3d-art', 'blender', 'spline', 'spatial'],
        tools: ['Blender', 'Spline'],
        color: '#6366F1'
    },
    {
        id: 's3',
        type: 'project',
        title: 'Lumina Dashboard — Analytics & BI Studio',
        subtitle: 'By Sophia Lin',
        category: 'UI/UX Design',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
        likes: 1890,
        views: 22100,
        tags: ['analytics', 'dashboard', 'charts', 'saas'],
        tools: ['Figma', 'Framer'],
        color: '#3B82F6'
    },
    {
        id: 's4',
        type: 'creator',
        title: 'Elena Rostova',
        subtitle: 'Principal Product Designer at Nexus',
        category: 'UI/UX & Design Systems',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        followers: '48.2k followers',
        tags: ['fintech', 'mobile', 'design-systems'],
        tools: ['Figma', 'Framer']
    },
    {
        id: 's5',
        type: 'creator',
        title: 'Marcus Chen',
        subtitle: '3D Spatial & Motion Artist',
        category: '3D & Motion Graphics',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        followers: '32.6k followers',
        tags: ['3d', 'blender', 'spatial', 'animation'],
        tools: ['Blender', 'Cinema 4D', 'Spline']
    },
    {
        id: 's6',
        type: 'project',
        title: 'Atelier Minimalist — Swiss Editorial Identity',
        subtitle: 'By Aria Takahashi',
        category: 'Brand Identity',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
        likes: 1120,
        views: 14300,
        tags: ['branding', 'typography', 'editorial', 'minimal'],
        tools: ['Illustrator', 'InDesign'],
        color: '#10B981'
    },
    {
        id: 's7',
        type: 'collection',
        title: 'VisionOS & Spatial Glassmorphism',
        subtitle: 'Curated by CreateDOT Staff',
        category: 'Moodboard',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
        views: 8900,
        tags: ['visionos', 'glassmorphism', 'spatial', 'ui-ux'],
        tools: ['Figma', 'Spline']
    }
]

const QUICK_TAGS = ['Dashboard', 'Fintech', '3D Spatial', 'Mobile App', 'Design System', 'Branding', 'Minimalist']
const COLOR_FILTERS = [
    { label: 'All', color: 'transparent' },
    { label: 'Purple', color: '#8B5DFF' },
    { label: 'Indigo', color: '#6366F1' },
    { label: 'Blue', color: '#3B82F6' },
    { label: 'Emerald', color: '#10B981' },
    { label: 'Rose', color: '#F43F5E' },
]

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [activeTab, setActiveTab] = useState<'all' | 'project' | 'creator' | 'collection'>('all')
    const [selectedColor, setSelectedColor] = useState('All')

    const filteredResults = useMemo(() => {
        return SEARCH_DATABASE.filter(item => {
            const matchesTab = activeTab === 'all' || item.type === activeTab
            const normalizedQuery = query.toLowerCase().trim()
            const matchesQuery = !normalizedQuery || (
                item.title.toLowerCase().includes(normalizedQuery) ||
                item.subtitle.toLowerCase().includes(normalizedQuery) ||
                item.category.toLowerCase().includes(normalizedQuery) ||
                item.tags.some(t => t.toLowerCase().includes(normalizedQuery)) ||
                item.tools.some(t => t.toLowerCase().includes(normalizedQuery))
            )
            return matchesTab && matchesQuery
        })
    }, [query, activeTab])

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Search Bar Header */}
            <div className="max-w-3xl mx-auto text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0D7] dark:bg-white/10 text-xs font-black text-[#8A6318] dark:text-[#FFE185] uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5 text-[#FF6B6B]" />
                    Guild Search Engine
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#14161F] dark:text-white">
                    Discover Craft & Creators.
                </h1>
                <p className="text-sm sm:text-base text-[#647087] dark:text-[#9DA7C2]">
                    Search over 200,000+ curated UI screens, 3D assets, brand identities, and world-class designers.
                </p>

                <div className="relative mt-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8C96AB]" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by keywords, tags (e.g. Fintech, 3D, Figma, Dashboard)..."
                        className="h-14 pl-12 pr-12 text-sm sm:text-base rounded-full bg-white/90 dark:bg-white/5 border border-[#14161F]/10 dark:border-white/10 shadow-lg shadow-[#14161F]/5 focus-visible:ring-1 focus-visible:ring-[#FF6B6B]"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#8C96AB]"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Quick Tags */}
                <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                    <span className="text-xs font-bold text-[#8C96AB]">Suggested:</span>
                    {QUICK_TAGS.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setQuery(tag)}
                            className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 dark:bg-white/5 border border-[#14161F]/10 dark:border-white/10 text-[#5A637A] dark:text-[#9DA7C2] hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition"
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filter Controls & Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#14161F]/8 dark:border-white/10">
                <div className="flex items-center gap-1.5 p-1 bg-white/80 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10 rounded-2xl shadow-sm">
                    {[
                        { id: 'all', label: 'All Results' },
                        { id: 'project', label: 'Projects' },
                        { id: 'creator', label: 'Creators' },
                        { id: 'collection', label: 'Collections' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${activeTab === tab.id ? 'bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] shadow-sm' : 'text-[#647087] hover:text-[#14161F] dark:hover:text-white'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="text-xs font-bold text-[#647087]">
                    Found <span className="font-extrabold text-[#14161F] dark:text-white">{filteredResults.length}</span> matching results
                </div>
            </div>

                {/* Search Results Grid */}
                {filteredResults.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-[#121215] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
                        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-950/40 text-violet-600 mb-4">
                            <Search className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">No results found for &ldquo;{query}&rdquo;</h3>
                        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                            Try searching for more general terms like &quot;Mobile&quot;, &quot;3D&quot;, &quot;Dashboard&quot;, or browse trending work.
                        </p>
                        <Button onClick={() => setQuery('')} variant="outline" className="mt-6 rounded-xl">
                            Clear Search Query
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResults.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="group rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl shadow-[#14161F]/5 transition-all backdrop-blur-sm"
                            >
                                {item.type === 'creator' ? (
                                    <div className="p-6 flex flex-col items-center text-center">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-20 w-20 rounded-2xl object-cover ring-4 ring-[#FF6B6B]/20 mb-4"
                                        />
                                        <h3 className="font-bold text-lg text-[#14161F] dark:text-white">{item.title}</h3>
                                        <p className="text-xs text-[#6B758E] mt-1">{item.subtitle}</p>
                                        <span className="mt-2 px-3 py-1 rounded-full text-[11px] font-black bg-[#FAF0D7] text-[#8A6318]">
                                            {item.category}
                                        </span>
                                        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                                            {item.tags.map(t => (
                                                <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#14161F]/5 dark:bg-white/10 text-[#5A637A] dark:text-[#9DA7C2] font-semibold">
                                                    #{t}
                                                </span>
                                            ))}
                                        </div>
                                        <Button asChild size="sm" className="mt-5 w-full bg-[#14161F] hover:bg-black text-white dark:bg-white dark:text-[#14161F] rounded-full font-bold">
                                            <Link href={`/u/${item.title.toLowerCase().replace(/\s+/g, '_')}`}>
                                                View Creator Profile
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase tracking-wider">
                                                    {item.type}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center justify-between text-xs text-[#6B758E] mb-1">
                                                <span className="font-bold text-[#FF6B6B]">{item.category}</span>
                                                {item.views && (
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="h-3 w-3" /> {item.views.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="font-bold text-[#14161F] dark:text-white line-clamp-1 group-hover:text-[#FF6B6B] transition">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-[#6B758E] mt-0.5">{item.subtitle}</p>

                                            <div className="mt-4 flex items-center justify-between pt-3.5 border-t border-[#14161F]/8 dark:border-white/10">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    {item.tools.slice(0, 2).map(t => (
                                                        <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#14161F]/5 dark:bg-white/10 text-[#5A637A] dark:text-[#9DA7C2] font-semibold">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                                <Link
                                                    href={item.type === 'collection' ? '/collections' : `/project/${item.id}`}
                                                    className="inline-flex items-center gap-1 text-xs font-bold text-[#14161F] dark:text-white hover:text-[#FF6B6B] transition"
                                                >
                                                    Open <ArrowUpRight className="h-3.5 w-3.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
    )
}
