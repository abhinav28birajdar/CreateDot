"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Plus,
  Heart,
  Eye,
  ArrowUpRight,
  TrendingUp,
  Users,
  Compass,
  Palette,
  Layers,
  FolderOpen,
} from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { useProjects } from '@/hooks/useProjects'
import { FeedGrid } from '@/components/feed/FeedGrid'

export default function DashboardPage() {
  const { user, profile, isLoading: isAuthLoading } = useAuth()

  // User's own projects
  const {
    projects: myProjects,
    isLoading: isMyProjectsLoading,
    isEmpty: isMyProjectsEmpty,
  } = useProjects({
    userId: user?.id,
    limit: 8,
  })

  // Community trending works
  const {
    projects: communityProjects,
    isLoading: isCommunityLoading,
  } = useProjects({
    sortBy: 'popular',
    limit: 8,
  })

  const displayName = profile?.full_name || profile?.username || user?.email?.split('@')[0] || 'Creator'
  const projectsCount = profile?.projects_count || myProjects.length
  const likesCount = profile?.likes_count || myProjects.reduce((acc, p) => acc + (p.likes_count || 0), 0)
  const followersCount = profile?.followers_count || 0
  const followingCount = profile?.following_count || 0

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto space-y-10">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-[36px] bg-[#14161F] text-white p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 to-[#FFE185]/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white border border-white/10">
              <Sparkles className="h-3.5 w-3.5 text-[#FF6B6B]" />
              Creator Studio Hub
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Welcome back, <span className="text-[#FF6B6B]">{displayName}</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Track your portfolio engagement, manage your creative case studies, and discover the highest-voted projects across the guild.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/upload">
              <Button className="bg-[#FF6B6B] hover:bg-[#F05555] text-white font-bold rounded-2xl px-6 py-6 shadow-lg shadow-[#FF6B6B]/25">
                <Plus className="h-4 w-4 mr-2" />
                Publish Work
              </Button>
            </Link>
            <Link href="/create/design">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-2xl px-6 py-6 font-bold">
                <Palette className="h-4 w-4 mr-2" />
                Launch Canvas
              </Button>
            </Link>
          </div>
        </div>

        {/* Real-time Metric Cards */}
        <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
              <Layers className="h-4 w-4 text-[#FF6B6B]" />
              Works Published
            </div>
            <p className="text-2xl font-black text-white">{projectsCount}</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
              <Heart className="h-4 w-4 text-rose-400" />
              Appreciations
            </div>
            <p className="text-2xl font-black text-white">{likesCount}</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
              <Users className="h-4 w-4 text-violet-400" />
              Followers
            </div>
            <p className="text-2xl font-black text-white">{followersCount}</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-1">
              <Compass className="h-4 w-4 text-emerald-400" />
              Following
            </div>
            <p className="text-2xl font-black text-white">{followingCount}</p>
          </div>
        </div>
      </div>

      {/* Section 1: My Creative Portfolio */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Your Published Portfolio
            </h2>
            <p className="text-xs text-slate-500">Live projects synced in real-time with Supabase</p>
          </div>
          <Link href="/upload" className="text-xs font-bold text-[#FF6B6B] hover:underline flex items-center gap-1">
            New Project <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        {isMyProjectsLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-3xl bg-white dark:bg-white/5 p-4 border border-slate-200 dark:border-white/10 animate-pulse space-y-3">
                <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!isMyProjectsLoading && isMyProjectsEmpty && (
          <div className="text-center py-14 bg-white dark:bg-white/5 rounded-3xl border border-dashed border-slate-300 dark:border-white/15 p-8 max-w-lg mx-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/15 text-[#FF6B6B] flex items-center justify-center mx-auto">
              <FolderOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">You haven&apos;t published any work yet</h3>
            <p className="text-xs text-slate-500">
              Share your UI case studies, 3D renderings, and branding design to get noticed by clients and fellow creators.
            </p>
            <Link href="/upload" className="inline-block pt-2">
              <Button size="sm" className="bg-[#14161F] dark:bg-white text-white dark:text-[#14161F] font-bold rounded-full px-5">
                Upload First Work
              </Button>
            </Link>
          </div>
        )}

        {!isMyProjectsLoading && !isMyProjectsEmpty && (
          <FeedGrid projects={myProjects as any} />
        )}
      </div>

      {/* Section 2: Trending Across CreateDOT */}
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Community Trending Creations
            </h2>
            <p className="text-xs text-slate-500">The most appreciated work curated live from the platform</p>
          </div>
          <Link href="/feed" className="text-xs font-bold text-[#FF6B6B] hover:underline flex items-center gap-1">
            Explore All Works <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        {isCommunityLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-3xl bg-white dark:bg-white/5 p-4 border border-slate-200 dark:border-white/10 animate-pulse space-y-3">
                <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <FeedGrid projects={communityProjects as any} />
        )}
      </div>
    </div>
  )
}
