"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  FaCircleCheck,
  FaLocationDot,
  FaGlobe,
  FaHeart,
  FaEye,
  FaPlus,
} from 'react-icons/fa6'
import { supabase } from '@/lib/supabase'
import { FeedGrid } from '@/components/feed/FeedGrid'
import { Button } from '@/components/ui/button'
import { formatCount } from '@/components/feed/FeedCard'
import { toast } from 'sonner'
import type { Database } from '@/types/database'

type ProfileRow = Database['public']['Tables']['profiles']['Row']
type ProjectRow = Database['public']['Tables']['projects']['Row']

export default function PublicProfilePage() {
  const params = useParams()
  const username = (params?.username as string) || ''
  const [profile, setProfile] = useState<ProfileRow | null>(null)
  const [projects, setProjects] = useState<ProjectRow[]>([])
  const [activeTab, setActiveTab] = useState<'work' | 'about'>('work')
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function loadProfileData() {
      if (!username) return
      setLoading(true)
      try {
        // Query profiles by username
        const { data: userProfile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single()

        if (isMounted && userProfile) {
          setProfile(userProfile)

          // Fetch user's published projects
          const { data: userProjects } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', userProfile.id)
            .eq('is_published', true)
            .order('created_at', { ascending: false })

          if (userProjects) setProjects(userProjects)
        } else if (isMounted) {
          // Check by ID if username was a uuid
          const { data: byId } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', username)
            .single()

          if (byId) {
            setProfile(byId)
            const { data: userProjects } = await supabase
              .from('projects')
              .select('*')
              .eq('user_id', byId.id)
              .eq('is_published', true)

            if (userProjects) setProjects(userProjects)
          }
        }
      } catch (err) {
        console.warn('Error loading public profile:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadProfileData()
    return () => {
      isMounted = false
    }
  }, [username])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FF6B6B]" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-bold">Creator Not Found</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          No profile exists with username @{username}. They may have changed their handle or not joined yet.
        </p>
        <Link href="/explore">
          <Button className="mt-4 bg-[#FF6B6B] hover:bg-[#F35555] text-white rounded-full text-xs font-bold px-6">
            Explore Other Creators
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-24">
      {/* Cover Banner */}
      <div className="h-64 sm:h-80 w-full bg-[#14161F] relative overflow-hidden">
        <img
          src={profile.cover_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80'}
          alt="Profile Cover"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14161F]/80 via-transparent to-transparent" />
      </div>

      {/* Profile Info Header */}
      <div className="max-w-6xl mx-auto px-4 relative -mt-20">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 pb-6 border-b border-[#14161F]/8 dark:border-white/10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-left">
            <img
              src={profile.avatar_url || '/images/profile-image-4.png'}
              alt={profile.full_name || profile.username || 'Creator'}
              className="w-32 h-32 rounded-3xl border-4 border-[#FAF7F0] dark:border-[#14161F] shadow-2xl object-cover ring-2 ring-black/5"
            />
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[#14161F] dark:text-white">
                  {profile.full_name || profile.username}
                </h1>
                {profile.is_verified && <FaCircleCheck className="w-5 h-5 text-[#FF6B6B]" />}
                {profile.is_pro && (
                  <span className="px-2.5 py-0.5 bg-[#FAF0D7] text-[#8A6318] text-[10px] font-black rounded-full tracking-wider uppercase">
                    PRO GUILD
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-[#5A637A] dark:text-[#9DA7C2]">
                {profile.headline || `@${profile.username}`}
              </p>
              {profile.location && (
                <p className="text-xs text-[#647087] dark:text-[#9DA7C2] flex items-center justify-center md:justify-start gap-1 font-medium">
                  <FaLocationDot className="w-3.5 h-3.5 text-[#FF6B6B]" /> {profile.location}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`rounded-full px-6 text-xs font-bold shadow-md transition-all ${
                isFollowing
                  ? 'bg-[#14161F]/10 dark:bg-white/10 text-[#14161F] dark:text-white'
                  : 'bg-[#14161F] hover:bg-[#252B3F] text-white dark:bg-white dark:text-[#14161F]'
              }`}
            >
              {isFollowing ? 'Following' : '+ Follow'}
            </Button>
            <Button
              onClick={() => toast.success(`Inquiry sent to ${profile.full_name || profile.username}!`)}
              className="rounded-full px-6 text-xs font-bold bg-[#FF6B6B] hover:bg-[#F35555] text-white shadow-md shadow-[#FF6B6B]/25"
            >
              Hire Creator
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
          <div className="bg-white/90 dark:bg-white/[0.04] p-5 rounded-3xl border border-[#14161F]/8 dark:border-white/10 text-center shadow-sm">
            <div className="text-2xl font-black text-[#14161F] dark:text-white">{formatCount(projects.length)}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2] mt-0.5">Projects</div>
          </div>
          <div className="bg-white/90 dark:bg-white/[0.04] p-5 rounded-3xl border border-[#14161F]/8 dark:border-white/10 text-center shadow-sm">
            <div className="text-2xl font-black text-[#14161F] dark:text-white">{formatCount(profile.followers_count || 0)}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2] mt-0.5">Followers</div>
          </div>
          <div className="bg-white/90 dark:bg-white/[0.04] p-5 rounded-3xl border border-[#14161F]/8 dark:border-white/10 text-center shadow-sm">
            <div className="text-2xl font-black text-[#FF6B6B]">{formatCount(profile.likes_received || 0)}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2] mt-0.5">Appreciations</div>
          </div>
          <div className="bg-white/90 dark:bg-white/[0.04] p-5 rounded-3xl border border-[#14161F]/8 dark:border-white/10 text-center shadow-sm">
            <div className="text-2xl font-black text-[#10B981]">{formatCount(profile.views_received || 0)}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2] mt-0.5">Views</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b border-[#14161F]/8 dark:border-white/10 mb-6">
          <button
            onClick={() => setActiveTab('work')}
            className={`pb-3 font-bold text-sm transition-colors border-b-2 ${
              activeTab === 'work'
                ? 'border-[#FF6B6B] text-[#14161F] dark:text-white'
                : 'border-transparent text-[#647087] hover:text-[#14161F] dark:hover:text-white'
            }`}
          >
            Work ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`pb-3 font-bold text-sm transition-colors border-b-2 ${
              activeTab === 'about'
                ? 'border-[#FF6B6B] text-[#14161F] dark:text-white'
                : 'border-transparent text-[#647087] hover:text-[#14161F] dark:hover:text-white'
            }`}
          >
            About & Biography
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'work' ? (
          <FeedGrid projects={projects as any} />
        ) : (
          <div className="bg-white/90 dark:bg-white/[0.04] p-8 rounded-[32px] border border-[#14161F]/8 dark:border-white/10 space-y-6 shadow-sm backdrop-blur-sm">
            <div>
              <h3 className="text-xs font-black text-[#647087] dark:text-[#9DA7C2] uppercase tracking-wider mb-2">Biography</h3>
              <p className="text-[#5A637A] dark:text-[#E2E8F0] text-sm leading-relaxed">
                {profile.bio || 'This creator has not written a biography yet.'}
              </p>
            </div>

            {profile.skills && profile.skills.length > 0 && (
              <div>
                <h3 className="text-xs font-black text-[#647087] dark:text-[#9DA7C2] uppercase tracking-wider mb-2">Specialized Disciplines</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((s) => (
                    <span key={s} className="px-4 py-1.5 bg-[#14161F]/5 dark:bg-white/10 text-[#14161F] dark:text-white rounded-full text-xs font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
