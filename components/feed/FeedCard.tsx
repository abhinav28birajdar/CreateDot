"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FaHeart,
  FaEye,
  FaAward,
  FaCircleCheck,
} from 'react-icons/fa6'
import { Project } from '@/types/database.types'
import { useLike } from '@/hooks/useLike'

export function formatCount(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

export function FeedCard({ project }: { project: Project }) {
  const { isLiked, count, toggleLike } = useLike(
    project.id,
    false,
    project.likes_count || 0
  )

  const authorName = (project as any).profiles?.full_name || (project.user as any)?.full_name || (project.user as any)?.name || project.user?.username || 'Creator'
  const authorAvatar = (project as any).profiles?.avatar_url || project.user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${project.user_id || 'creator'}`
  const authorUsername = (project as any).profiles?.username || project.user?.username || 'creator'

  return (
    <motion.div
      className="group relative rounded-3xl overflow-hidden bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 shadow-sm hover:shadow-2xl shadow-[#14161F]/5 transition-all duration-300 flex flex-col backdrop-blur-sm"
      whileHover={{ y: -5 }}
    >
      {/* Media Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800">
        <Link href={`/projects/${project.id}`} className="block w-full h-full">
          <img
            src={project.cover_image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Hover Overlay Action Bar */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-4 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start pointer-events-auto">
            <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20">
              {project.category || 'UI/UX'}
            </span>
            {project.is_featured && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FF6B6B] text-white text-xs font-bold rounded-full shadow-md">
                <FaAward className="w-3 h-3" /> Staff Pick
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pointer-events-auto">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-transform active:scale-90 ${
                isLiked
                  ? 'bg-[#FF6B6B] text-white shadow-md'
                  : 'bg-white/80 hover:bg-white text-slate-900'
              }`}
            >
              <FaHeart className={`w-3.5 h-3.5 ${isLiked ? 'text-white' : 'text-slate-700'}`} />
              <span>{formatCount(count)}</span>
            </button>

            <div className="flex items-center gap-2">
              <Link
                href={`/projects/${project.id}`}
                className="p-2.5 bg-white/80 hover:bg-white text-slate-900 rounded-full backdrop-blur-md transition-colors flex items-center justify-center"
                title="View Details"
              >
                <FaEye className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <Link href={`/projects/${project.id}`}>
          <h3 className="font-bold text-sm text-[#14161F] dark:text-white hover:text-[#FF6B6B] transition-colors line-clamp-1">
            {project.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 gap-2">
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <Link href={`/profile/${authorUsername}`} className="min-w-0 truncate">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 truncate block">
                {authorName}
              </span>
            </Link>
            {project.user?.is_verified !== false && (
              <FaCircleCheck className="w-3 h-3 text-[#FF6B6B] shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 ml-auto">
            <span className="flex items-center gap-1">
              <FaHeart className={`w-3 h-3 ${isLiked ? 'text-[#FF6B6B]' : 'text-slate-400'}`} />
              {formatCount(count)}
            </span>
            <span className="flex items-center gap-1">
              <FaEye className="w-3 h-3 text-slate-400" />
              {formatCount(project.views_count || 0)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
