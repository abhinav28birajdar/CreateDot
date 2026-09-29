"use client"

import React from 'react'
import { Project } from '@/types/database.types'
import { FeedCard } from './FeedCard'

export function FeedGrid({ projects }: { projects: Project[] }) {
    if (!projects || projects.length === 0) {
        return (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 max-w-md mx-auto my-8">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No projects found</h3>
                <p className="text-slate-500 text-sm mt-1">Be the first creator to share a project in this category!</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {projects.map(project => (
                <FeedCard key={project.id} project={project} />
            ))}
        </div>
    )
}
