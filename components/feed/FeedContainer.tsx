"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  FaFire,
  FaClock,
  FaHeart,
  FaPlus,
  FaRotate,
} from 'react-icons/fa6'
import { CATEGORIES } from '@/config/categories'
import { useProjects } from '@/hooks/useProjects'
import { FeedGrid } from './FeedGrid'
import { Button } from '@/components/ui/button'

export function FeedContainer() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortTab, setSortTab] = useState<'trending' | 'recent' | 'popular'>('trending')

  const { projects, isLoading, error, refetch, isEmpty } = useProjects({
    category: selectedCategory === 'All' ? undefined : selectedCategory,
    sortBy: sortTab,
    limit: 30,
  })

  return (
    <div className="space-y-6 pb-20">
      {/* Category Filter Bar (Horizontal Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#14161F]/8 dark:border-white/10">
        {CATEGORIES.map((cat) => {
          const isActive =
            selectedCategory === cat.name ||
            (selectedCategory === 'All' && cat.name === 'All')
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#14161F] text-white shadow-md shadow-[#14161F]/15 dark:bg-white dark:text-[#14161F]'
                  : 'bg-white/80 dark:bg-white/5 text-[#5A637A] dark:text-[#9DA7C2] hover:bg-white dark:hover:bg-white/10 border border-[#14161F]/8 dark:border-white/10'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          )
        })}
      </div>

      {/* Sort Filter Tabs Bar */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-1 bg-white/80 dark:bg-white/5 p-1 rounded-2xl border border-[#14161F]/8 dark:border-white/10 shadow-sm backdrop-blur-md">
          <button
            onClick={() => setSortTab('trending')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              sortTab === 'trending'
                ? 'bg-[#FAF7F0] dark:bg-white/10 text-[#FF6B6B] shadow-sm'
                : 'text-[#647087] hover:text-[#14161F] dark:hover:text-white'
            }`}
          >
            <FaFire className="w-3.5 h-3.5" />
            <span>Trending</span>
          </button>
          <button
            onClick={() => setSortTab('recent')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              sortTab === 'recent'
                ? 'bg-[#FAF7F0] dark:bg-white/10 text-[#10B981] shadow-sm'
                : 'text-[#647087] hover:text-[#14161F] dark:hover:text-white'
            }`}
          >
            <FaClock className="w-3.5 h-3.5" />
            <span>Latest</span>
          </button>
          <button
            onClick={() => setSortTab('popular')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              sortTab === 'popular'
                ? 'bg-[#FAF7F0] dark:bg-white/10 text-[#8B5CF6] shadow-sm'
                : 'text-[#647087] hover:text-[#14161F] dark:hover:text-white'
            }`}
          >
            <FaHeart className="w-3.5 h-3.5" />
            <span>Most Loved</span>
          </button>
        </div>

        <Link href="/upload">
          <Button
            size="sm"
            className="rounded-full bg-[#14161F] hover:bg-[#202330] dark:bg-white dark:hover:bg-slate-200 text-white dark:text-[#14161F] text-xs font-bold px-4 py-2 shadow-sm gap-1.5"
          >
            <FaPlus className="w-3 h-3 text-[#FF6B6B]" />
            <span>Publish Work</span>
          </Button>
        </Link>
      </div>

      {/* Loading Skeleton State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-[#14161F]/8 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 space-y-4 animate-pulse"
            >
              <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
                <div className="h-3 w-10 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State with Retry */}
      {!isLoading && error && (
        <div className="text-center py-16 bg-white dark:bg-white/5 rounded-3xl border border-red-200/50 dark:border-red-900/30 p-8 max-w-md mx-auto my-6">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Button onClick={() => refetch()} variant="outline" size="sm" className="gap-2">
            <FaRotate className="w-3 h-3" /> Retry Loading Feed
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && isEmpty && (
        <div className="text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-[#14161F]/8 dark:border-white/10 p-8 max-w-lg mx-auto my-8 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#FF6B6B]/15 text-[#FF6B6B] flex items-center justify-center mx-auto text-2xl font-black">
            ✦
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">No works found</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            {selectedCategory !== 'All'
              ? `Be the first creative to upload a project in ${selectedCategory}!`
              : 'The creative guild is waiting for your project. Share your craft today!'}
          </p>
          <Link href="/upload" className="inline-block mt-2">
            <Button className="bg-[#FF6B6B] hover:bg-[#F05555] text-white font-bold rounded-full px-6">
              Publish Your First Project
            </Button>
          </Link>
        </div>
      )}

      {/* Projects Grid */}
      {!isLoading && !error && !isEmpty && (
        <FeedGrid projects={projects as any} />
      )}
    </div>
  )
}
