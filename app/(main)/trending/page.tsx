"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Flame, Sparkles, TrendingUp, Heart, Award, ArrowUpRight, Crown, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRealtimeSubscription } from '@/hooks/useRealtime'
import { useLike } from '@/hooks/useLike'
import type { Database } from '@/types/database'

type ProfileRow = Database['public']['Tables']['profiles']['Row']
type ProjectWithAuthor = Database['public']['Tables']['projects']['Row'] & {
    profiles?: ProfileRow | null
    author?: ProfileRow | null
}

const TIMEFRAMES = [
    { id: 'today', label: "Today's Top", icon: Flame },
    { id: 'week', label: 'This Week', icon: TrendingUp },
    { id: 'month', label: 'This Month', icon: Sparkles },
    { id: 'all', label: 'All Time', icon: Crown }
]

const CATEGORIES = ['All', 'UI/UX Design', '3D & Motion', 'Brand Identity', 'Mobile Apps', 'Editorial']

function TrendingProjectCard({ project, index }: { project: ProjectWithAuthor, index: number }) {
    const { isLiked, count, toggleLike } = useLike(project.id, false, project.likes_count || 0)
    const authorName = project.profiles?.full_name || project.profiles?.username || 'Creator'
    const authorAvatar = project.profiles?.avatar_url || '/images/profile-image-4.png'
    const authorHandle = project.profiles?.username || 'creator'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative flex flex-col rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl shadow-[#14161F]/5 transition-all duration-300 backdrop-blur-sm"
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                    src={project.cover_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
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
                            {project.category || 'UI/UX Design'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6B6B]">
                            {project.category || 'Design'}
                        </span>
                        <div className="flex gap-1">
                            {(project.tags || []).slice(0, 2).map(tag => (
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
                        href={`/profile/${authorHandle}`}
                        className="flex items-center gap-2 group/author"
                    >
                        <img
                            src={authorAvatar}
                            alt={authorName}
                            className="h-6 w-6 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-[#576075] dark:text-[#9DA7C2] group-hover/author:text-[#FF6B6B] transition truncate max-w-[120px]">
                            {authorName}
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
    const [creators, setCreators] = useState<ProfileRow[]>([])
    const [projects, setProjects] = useState<ProjectWithAuthor[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchTrending = async () => {
        setIsLoading(true)
        try {
            // Load top creators
            const { data: topProfiles } = await supabase
                .from('profiles')
                .select('*')
                .order('followers_count', { ascending: false })
                .limit(4)

            if (topProfiles) {
                setCreators(topProfiles)
            }

            // Load trending projects
            let query = supabase
                .from('projects')
                .select(`
                    *,
                    profiles:user_id (*)
                `)
                .eq('is_published', true)
                .order('likes_count', { ascending: false })
                .limit(20)

            const { data: trendingProjects } = await query
            if (trendingProjects) {
                setProjects(trendingProjects as any)
            }
        } catch (err) {
            console.warn('Error fetching trending data:', err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTrending()
    }, [selectedTimeframe])

    // Live subscription for project updates
    useRealtimeSubscription({
        table: 'projects',
        onUpdate: (updatedRecord) => {
            setProjects(prev => prev.map(p => p.id === updatedRecord.id ? { ...p, ...updatedRecord } : p))
        },
        onInsert: async (newRecord) => {
            if (newRecord.is_published) {
                const { data: prof } = await supabase.from('profiles').select('*').eq('id', newRecord.user_id).single()
                setProjects(prev => [{ ...newRecord, profiles: prof }, ...prev])
            }
        }
    })

    const filteredProjects = projects.filter(project => {
        if (selectedCategory === 'All') return true
        return (project.category || '').toLowerCase().includes(selectedCategory.toLowerCase())
    })

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-10 max-w-7xl mx-auto">
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
                        Discover the most recognized case studies, viral UI concepts, and breakthrough creative work shaping the industry live from Supabase.
                    </p>
                </div>
            </div>

            {/* Top Creators Leaderboard */}
            {creators.length > 0 && (
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
                        {creators.map((creator, i) => (
                            <Link
                                key={creator.id}
                                href={`/profile/${creator.username || creator.id}`}
                                className="flex items-center gap-3.5 p-4 rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 shadow-sm hover:shadow-lg transition-all"
                            >
                                <img
                                    src={creator.avatar_url || '/images/profile-image-4.png'}
                                    alt={creator.full_name || creator.username || 'Creator'}
                                    className="h-12 w-12 rounded-2xl object-cover ring-2 ring-[#FF6B6B]/20"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-sm text-[#14161F] dark:text-white truncate">
                                        {creator.full_name || creator.username || 'Creator'}
                                    </h3>
                                    <p className="text-xs text-[#6B758E] truncate">@{creator.username || 'creator'}</p>
                                    <span className="inline-block mt-1 text-[10px] font-black text-[#8A6318] bg-[#FAF0D7] px-2 py-0.5 rounded-full">
                                        {i === 0 ? '🥇 #1 Star' : i === 1 ? '🥈 #2 Top' : i === 2 ? '🥉 #3 Ranked' : '⚡ Top Guild'}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

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
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="rounded-3xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 p-5 space-y-4 animate-pulse">
                            <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                            <div className="h-4 bg-slate-100 dark:bg-slate-800/60 rounded-md w-1/2" />
                        </div>
                    ))}
                </div>
            ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <TrendingProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/70 dark:bg-white/5 rounded-3xl border border-slate-200/70 dark:border-white/10 p-8 space-y-4">
                    <Flame className="w-12 h-12 text-[#FF6B6B] mx-auto opacity-70" />
                    <h3 className="text-xl font-bold">No trending projects in this filter yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Be the first creator to publish projects and get featured on the community pulse!
                    </p>
                    <Link href="/upload">
                        <button className="bg-[#FF6B6B] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-[#F35555]">
                            Publish Your Project
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}
