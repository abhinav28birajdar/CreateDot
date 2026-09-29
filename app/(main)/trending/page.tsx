"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Flame, Sparkles, TrendingUp, Heart, Award, ArrowUpRight, Crown } from 'lucide-react'
import { useLike } from '@/hooks/useLike'

interface TrendingCreator {
    id: string
    name: string
    username: string
    avatar: string
    role: string
    projectsCount: number
    followersCount: string
    badge: string
}

const TRENDING_CREATORS: TrendingCreator[] = [
    {
        id: 'tc1',
        name: 'Elena Rostova',
        username: 'elenadesign',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'Principal Product Designer',
        projectsCount: 28,
        followersCount: '48.2k',
        badge: '🥇 #1 Guild Star'
    },
    {
        id: 'tc2',
        name: 'Marcus Chen',
        username: 'marcus_3d',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        role: '3D Spatial & Motion Artist',
        projectsCount: 34,
        followersCount: '32.6k',
        badge: '🥈 #2 Trending'
    },
    {
        id: 'tc3',
        name: 'Aria Takahashi',
        username: 'ariat_brand',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        role: 'Brand Identity Director',
        projectsCount: 19,
        followersCount: '29.1k',
        badge: '🥉 #3 Trending'
    },
    {
        id: 'tc4',
        name: 'Devon Vance',
        username: 'devonvance',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        role: 'Design Engineer & Prototyper',
        projectsCount: 22,
        followersCount: '21.4k',
        badge: '⚡ Rising Talent'
    }
]

const TRENDING_PROJECTS = [
    {
        id: 'tp1',
        title: 'Sphere OS — Spatial Glass Interfaces for Spatial Computing',
        category: 'UI/UX Design',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        likes: 2840,
        views: 34200,
        author: {
            name: 'Marcus Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            handle: 'marcus_3d'
        },
        tags: ['VisionOS', 'Glassmorphism', 'Spatial'],
        isFeatured: true
    },
    {
        id: 'tp2',
        title: 'Lumina — Sustainable Energy Brand & Rebrand Monograph',
        category: 'Brand Identity',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        likes: 2190,
        views: 28100,
        author: {
            name: 'Aria Takahashi',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
            handle: 'ariat_brand'
        },
        tags: ['Branding', 'Typography', 'Packaging'],
        isFeatured: true
    },
    {
        id: 'tp3',
        title: 'Aura AI — Ambient Generative Copilot Architecture',
        category: 'UI/UX Design',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        likes: 1940,
        views: 22400,
        author: {
            name: 'Elena Rostova',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            handle: 'elenadesign'
        },
        tags: ['AI Interface', 'Design System', 'Next.js'],
        isFeatured: true
    },
    {
        id: 'tp4',
        title: 'Apex Financial — Real-time Autonomous Capital Engine',
        category: 'Mobile Apps',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
        likes: 1540,
        views: 19800,
        author: {
            name: 'Devon Vance',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
            handle: 'devonvance'
        },
        tags: ['Fintech', 'iOS 18', 'Dark Mode'],
        isFeatured: false
    },
    {
        id: 'tp5',
        title: 'Prism Sound — Spatial Audio Architecture',
        category: '3D & Motion',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
        likes: 1290,
        views: 16100,
        author: {
            name: 'Marcus Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            handle: 'marcus_3d'
        },
        tags: ['Audio Visual', 'Cinema 4D', 'WebGL'],
        isFeatured: false
    },
    {
        id: 'tp6',
        title: 'Architectural Digest — Milan Triennale Monograph',
        category: 'Editorial',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
        likes: 1180,
        views: 14200,
        author: {
            name: 'Elena Rostova',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            handle: 'elenadesign'
        },
        tags: ['Book Design', 'Grid Systems', 'Print'],
        isFeatured: false
    }
]

const TIMEFRAMES = [
    { id: 'today', label: "Today's Top", icon: Flame },
    { id: 'week', label: 'This Week', icon: TrendingUp },
    { id: 'month', label: 'This Month', icon: Sparkles },
    { id: 'all', label: 'All Time', icon: Crown }
]

const CATEGORIES = ['All', 'UI/UX Design', '3D & Motion', 'Brand Identity', 'Mobile Apps', 'Editorial']

function TrendingProjectCard({ project, index }: { project: typeof TRENDING_PROJECTS[0], index: number }) {
    const { isLiked, count, toggleLike } = useLike(project.id, false, project.likes)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative flex flex-col rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl shadow-[#14161F]/5 transition-all duration-300 backdrop-blur-sm"
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <div className="w-full flex items-center justify-between text-white">
                        <Link
                            href={`/project/${project.id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white hover:text-[#14161F] transition"
                        >
                            <span>Explore Study</span> <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <span className="text-[11px] font-semibold text-white/80">
                            {project.category}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6B6B]">
                            {project.category}
                        </span>
                        <div className="flex gap-1">
                            {project.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#14161F]/5 dark:bg-white/10 font-bold text-[#647087] dark:text-[#9DA7C2]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <Link href={`/project/${project.id}`}>
                        <h3 className="font-bold text-base text-[#14161F] dark:text-white group-hover:text-[#FF6B6B] transition-colors line-clamp-1">
                            {project.title}
                        </h3>
                    </Link>
                </div>

                <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-[#14161F]/8 dark:border-white/10">
                    <Link
                        href={`/profile/${project.author.handle}`}
                        className="flex items-center gap-2 group/author"
                    >
                        <img
                            src={project.author.avatar}
                            alt={project.author.name}
                            className="h-6 w-6 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-[#576075] dark:text-[#9DA7C2] group-hover/author:text-[#FF6B6B] transition truncate max-w-[120px]">
                            {project.author.name}
                        </span>
                    </Link>

                    <button
                        onClick={toggleLike}
                        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full transition ${isLiked ? 'bg-[#FF6B6B]/15 text-[#FF6B6B]' : 'text-[#647087] hover:bg-black/5 dark:hover:bg-white/10'}`}
                    >
                        <Heart className="h-3.5 w-3.5" fill={isLiked ? '#FF6B6B' : 'none'} />
                        <span>{count}</span>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default function TrendingPage() {
    const [selectedTimeframe, setSelectedTimeframe] = useState('week')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filteredProjects = TRENDING_PROJECTS.filter(project => {
        if (selectedCategory === 'All') return true
        return project.category === selectedCategory
    })

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-[36px] bg-[#14161F] p-8 sm:p-14 text-white shadow-2xl">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 to-[#FFE185]/20 blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider mb-4 border border-white/10">
                        <Flame className="h-3.5 w-3.5 text-[#FF6B6B]" />
                        Real-time Creator Pulse
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                        What&apos;s Trending in the Verse.
                    </h1>
                    <p className="mt-3 text-base sm:text-lg text-[#9DA7C2] leading-relaxed">
                        Discover the most recognized case studies, viral UI concepts, and breakthrough creative work shaping the industry this week.
                    </p>
                </div>
            </div>

            {/* Top Creators Leaderboard */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-[#FF6B6B]" />
                        <h2 className="text-xl font-black tracking-tight text-[#14161F] dark:text-white">
                            Top Guild Creators
                        </h2>
                    </div>
                    <Link href="/hire" className="text-xs font-bold text-[#FF6B6B] hover:underline">
                        Explore Creator Directory →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {TRENDING_CREATORS.map((creator) => (
                        <div
                            key={creator.id}
                            className="flex items-center gap-3.5 p-4 rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 shadow-sm hover:shadow-lg transition-all"
                        >
                            <img
                                src={creator.avatar}
                                alt={creator.name}
                                className="h-12 w-12 rounded-2xl object-cover ring-2 ring-[#FF6B6B]/20"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-sm text-[#14161F] dark:text-white truncate">
                                    {creator.name}
                                </h3>
                                <p className="text-xs text-[#6B758E] truncate">{creator.role}</p>
                                <span className="inline-block mt-1 text-[10px] font-black text-[#8A6318] bg-[#FAF0D7] px-2 py-0.5 rounded-full">
                                    {creator.badge}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-[#14161F]/8 dark:border-white/10">
                {/* Timeframe Tabs */}
                <div className="flex items-center gap-1.5 p-1.5 bg-white/80 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10 rounded-2xl shadow-sm">
                    {TIMEFRAMES.map(tf => {
                        const Icon = tf.icon
                        const active = selectedTimeframe === tf.id
                        return (
                            <button
                                key={tf.id}
                                onClick={() => setSelectedTimeframe(tf.id)}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${active ? 'bg-[#14161F] text-white shadow-sm dark:bg-white dark:text-[#14161F]' : 'text-[#647087] hover:text-[#14161F] dark:hover:text-white'}`}
                            >
                                <Icon className="h-3.5 w-3.5" />
                                <span>{tf.label}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Category Chips */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${selectedCategory === category ? 'bg-[#FF6B6B] text-white shadow-sm shadow-[#FF6B6B]/25' : 'bg-white/80 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10 text-[#5A637A] dark:text-[#9DA7C2] hover:bg-white dark:hover:bg-white/10'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Trending Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                    <TrendingProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </div>
    )
}
