"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FaFire,
  FaClock,
  FaHeart,
  FaPlus,
  FaSpinner,
} from 'react-icons/fa6'
import { CATEGORIES } from '@/config/categories'
import { fetchProjects } from '@/services/project.service'
import { Project } from '@/types/database.types'
import { FeedGrid } from './FeedGrid'

// Sample initial mock projects to guarantee immediate initial render even if DB table is empty
const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-demo-1',
    user_id: 'u-abhinav',
    title: 'QuantumPay — NextGen AI Banking App',
    slug: 'quantumpay-ai-banking',
    description: 'Autonomous financial assistant with dark mode glassmorphism interface and micro-interactions.',
    cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    cover_color: '#576A8F',
    category: 'UI Design',
    tags: ['fintech', 'mobile-app', 'dark-mode'],
    tools_used: ['Figma', 'React', 'Tailwind'],
    is_published: true,
    is_featured: true,
    is_approved: true,
    allow_comments: true,
    likes_count: 1840,
    views_count: 24800,
    saves_count: 512,
    comments_count: 148,
    shares_count: 94,
    score: 99.4,
    created_at: '2026-09-29T12:00:00.000Z',
    updated_at: '2026-09-29T12:00:00.000Z',
    published_at: '2026-09-29T12:00:00.000Z',
    user: {
      id: 'u-abhinav',
      auth_id: 'a-abhinav',
      name: 'Abhinav',
      username: 'abhinav',
      email: 'abhinav@createdot.io',
      role: 'creator',
      avatar_url: '/images/profile-image-4.png',
      availability: 'available',
      is_verified: true,
      is_pro: true,
      subscription_tier: 'pro',
      followers_count: 24500,
      following_count: 180,
      projects_count: 12,
      likes_received: 142000,
      views_received: 680000,
      awards_count: 14,
      profile_views: 45000,
      is_onboarded: true,
      is_banned: false,
      created_at: '2026-09-29T00:00:00.000Z',
      updated_at: '2026-09-29T00:00:00.000Z',
      last_active: '2026-09-29T22:00:00.000Z',
    },
  },
  {
    id: 'proj-demo-2',
    user_id: 'u-abhinav',
    title: 'Sphere 3D — Geometric Spatial Studio',
    slug: 'sphere-3d-spatial',
    description: 'Interactive 3D geometry engine built for web experiences and AR/VR spatial devices.',
    cover_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    cover_color: '#8B5CF6',
    category: '3D & Modeling',
    tags: ['3d-art', 'blender', 'spline', 'webxr'],
    tools_used: ['Three.js', 'Spline', 'WebXR'],
    is_published: true,
    is_featured: true,
    is_approved: true,
    allow_comments: true,
    likes_count: 1420,
    views_count: 18900,
    saves_count: 380,
    comments_count: 86,
    shares_count: 42,
    score: 96.2,
    created_at: '2026-09-29T12:00:00.000Z',
    updated_at: '2026-09-29T12:00:00.000Z',
    published_at: '2026-09-29T12:00:00.000Z',
    user: {
      id: 'u-abhinav',
      auth_id: 'a-abhinav',
      name: 'Abhinav',
      username: 'abhinav',
      email: 'abhinav@createdot.io',
      role: 'creator',
      avatar_url: '/images/profile-image-4.png',
      availability: 'available',
      is_verified: true,
      is_pro: true,
      subscription_tier: 'pro',
      followers_count: 24500,
      following_count: 180,
      projects_count: 12,
      likes_received: 142000,
      views_received: 680000,
      awards_count: 14,
      profile_views: 45000,
      is_onboarded: true,
      is_banned: false,
      created_at: '2026-09-29T00:00:00.000Z',
      updated_at: '2026-09-29T00:00:00.000Z',
      last_active: '2026-09-29T22:00:00.000Z',
    },
  },
  {
    id: 'proj-demo-3',
    user_id: 'u-abhinav',
    title: 'Nova Design System — Tokens & Multi-brand',
    slug: 'nova-design-system-tokens',
    description: 'Component architecture with variable color modes, semantic tokens, and React parity.',
    cover_image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    cover_color: '#10B981',
    category: 'Design Systems',
    tags: ['tokens', 'tailwind', 'component-library'],
    tools_used: ['React', 'TailwindCSS', 'Figma'],
    is_published: true,
    is_featured: true,
    is_approved: true,
    allow_comments: true,
    likes_count: 2150,
    views_count: 31200,
    saves_count: 820,
    comments_count: 164,
    shares_count: 112,
    score: 99.8,
    created_at: '2026-09-29T12:00:00.000Z',
    updated_at: '2026-09-29T12:00:00.000Z',
    published_at: '2026-09-29T12:00:00.000Z',
    user: {
      id: 'u-abhinav',
      auth_id: 'a-abhinav',
      name: 'Abhinav',
      username: 'abhinav',
      email: 'abhinav@createdot.io',
      role: 'creator',
      avatar_url: '/images/profile-image-4.png',
      availability: 'available',
      is_verified: true,
      is_pro: true,
      subscription_tier: 'pro',
      followers_count: 24500,
      following_count: 180,
      projects_count: 12,
      likes_received: 142000,
      views_received: 680000,
      awards_count: 14,
      profile_views: 45000,
      is_onboarded: true,
      is_banned: false,
      created_at: '2026-09-29T00:00:00.000Z',
      updated_at: '2026-09-29T00:00:00.000Z',
      last_active: '2026-09-29T22:00:00.000Z',
    },
  },
]

export function FeedContainer() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortTab, setSortTab] = useState<'trending' | 'new' | 'popular'>('trending')
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    async function loadFeed() {
      setLoading(true)
      try {
        const dbProjects = await fetchProjects({
          category: selectedCategory,
          sort: sortTab,
          limit: 24,
        })
        if (isMounted) {
          if (dbProjects && dbProjects.length > 0) {
            setProjects(dbProjects)
          } else {
            setProjects(MOCK_PROJECTS)
          }
        }
      } catch {
        if (isMounted) setProjects(MOCK_PROJECTS)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadFeed()
    return () => {
      isMounted = false
    }
  }, [selectedCategory, sortTab])

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
            onClick={() => setSortTab('new')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              sortTab === 'new'
                ? 'bg-[#FAF7F0] dark:bg-white/10 text-[#10B981] shadow-sm'
                : 'text-[#647087] hover:text-[#14161F] dark:hover:text-white'
            }`}
          >
            <FaClock className="w-3.5 h-3.5" />
            <span>Newest</span>
          </button>
          <button
            onClick={() => setSortTab('popular')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              sortTab === 'popular'
                ? 'bg-[#FAF7F0] dark:bg-white/10 text-[#765EE3] shadow-sm'
                : 'text-[#647087] hover:text-[#14161F] dark:hover:text-white'
            }`}
          >
            <FaHeart className="w-3.5 h-3.5" />
            <span>Popular</span>
          </button>
        </div>

        <div className="text-xs font-semibold text-[#647087]">
          Showing <span className="font-bold text-[#14161F] dark:text-white">{projects.length}</span> curated works
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex items-center justify-center py-8 text-slate-400">
          <FaSpinner className="w-5 h-5 animate-spin mr-2 text-[#FF6B6B]" />
          <span className="text-xs font-medium">Fetching creative works...</span>
        </div>
      )}

      {/* Masonry Project Grid */}
      <FeedGrid projects={projects} />

      {/* Floating Action Button (FAB) for Quick Project Upload */}
      <Link
        href="/upload"
        className="fixed bottom-8 right-8 z-40 p-4 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-full shadow-2xl shadow-[#FF6B6B]/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group"
        title="Publish New Project"
      >
        <FaPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
      </Link>
    </div>
  )
}
