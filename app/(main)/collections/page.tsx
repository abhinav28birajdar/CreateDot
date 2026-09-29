"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Plus, Lock, Globe, Sparkles, Folder, ArrowUpRight, Share2, MoreHorizontal, X, Heart, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface Collection {
    id: string
    title: string
    description: string
    itemsCount: number
    isPrivate: boolean
    images: string[]
    updatedAt: string
    author: string
}

const INITIAL_COLLECTIONS: Collection[] = [
    {
        id: 'col-1',
        title: 'Minimalist Mobile UI & Fintech',
        description: 'Clean typography, fluid balance sheets, and tactile banking interactions.',
        itemsCount: 24,
        isPrivate: false,
        updatedAt: '2 days ago',
        author: 'Elena Rostova',
        images: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'
        ]
    },
    {
        id: 'col-2',
        title: 'Spatial 3D & VisionOS Experiences',
        description: 'Iridescent lighting, procedural geometry, and glassmorphic depth.',
        itemsCount: 18,
        isPrivate: false,
        updatedAt: 'Yesterday',
        author: 'Marcus Chen',
        images: [
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80'
        ]
    },
    {
        id: 'col-3',
        title: 'Swiss Editorial & Typography Monographs',
        description: 'Rigorous asymmetric grids, bold brutalist type, and art direction.',
        itemsCount: 15,
        isPrivate: false,
        updatedAt: '3 days ago',
        author: 'Aria Takahashi',
        images: [
            'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1608248597359-299e5251641d?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80'
        ]
    },
    {
        id: 'col-4',
        title: 'Dark Mode Glassmorphism Systems',
        description: 'Internal reference board for upcoming enterprise software refresh.',
        itemsCount: 32,
        isPrivate: true,
        updatedAt: '5 hours ago',
        author: 'Elena Rostova',
        images: [
            'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'
        ]
    }
]

export default function CollectionsPage() {
    const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS)
    const [activeTab, setActiveTab] = useState<'all' | 'public' | 'private'>('all')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)

    const filteredCollections = collections.filter(c => {
        if (activeTab === 'public') return !c.isPrivate
        if (activeTab === 'private') return c.isPrivate
        return true
    })

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newTitle.trim()) return

        const newCol: Collection = {
            id: `col-${Date.now()}`,
            title: newTitle.trim(),
            description: newDescription.trim() || 'Custom collection created on CreateDOT',
            itemsCount: 0,
            isPrivate,
            updatedAt: 'Just now',
            author: 'You',
            images: [
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80'
            ]
        }

        setCollections([newCol, ...collections])
        setNewTitle('')
        setNewDescription('')
        setShowCreateModal(false)
        toast.success(`Created collection "${newCol.title}"!`)
    }

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0D7] dark:bg-white/10 text-xs font-black text-[#8A6318] dark:text-[#FFE185] uppercase tracking-wider mb-2">
                        <Sparkles className="h-3.5 w-3.5 text-[#FF6B6B]" />
                        Moodboards & Collections
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-[#14161F] dark:text-white">
                        Curated Visual Archives.
                    </h1>
                    <p className="text-sm text-[#647087] dark:text-[#9DA7C2] mt-1">
                        Organize, curate, and share aesthetic reference boards with collaborators and design teams.
                    </p>
                </div>

                <Button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold rounded-full shadow-lg shadow-[#FF6B6B]/25 self-start sm:self-auto px-6 py-6"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Collection
                </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white/80 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10 rounded-2xl w-fit shadow-sm">
                {[
                    { id: 'all', label: 'All Moodboards' },
                    { id: 'public', label: 'Public' },
                    { id: 'private', label: 'Private (Only You)' }
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

            {/* Collections Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((col, idx) => (
                    <motion.div
                        key={col.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.06 }}
                        className="group flex flex-col rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl shadow-[#14161F]/5 transition-all backdrop-blur-sm"
                    >
                        {/* 4-Image Mosaic Preview */}
                        <div className="relative aspect-[16/10] grid grid-cols-2 gap-1 p-2 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                            {col.images.slice(0, 4).map((img, i) => (
                                <div key={i} className="relative w-full h-full overflow-hidden rounded-2xl">
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}

                            <div className="absolute top-4 left-4">
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-white border border-white/10">
                                    {col.isPrivate ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                                    {col.isPrivate ? 'Private' : 'Public'}
                                </span>
                            </div>
                            <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/70 backdrop-blur-md text-white border border-white/10">
                                    {col.itemsCount} items
                                </span>
                            </div>
                        </div>

                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                        <span>Curated by {col.author}</span>
                                        <span>Updated {col.updatedAt}</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-violet-600 transition">
                                        {col.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                        {col.description}
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            navigator.clipboard?.writeText(window.location.href)
                                            toast.success("Collection link copied to clipboard!")
                                        }}
                                        className="rounded-xl border-slate-200 dark:border-slate-800 text-xs h-9"
                                    >
                                        <Share2 className="mr-1.5 h-3.5 w-3.5" />
                                        Share
                                    </Button>

                                    <Button
                                        asChild
                                        size="sm"
                                        className="bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl text-xs h-9 px-4 shadow-md shadow-violet-600/25"
                                    >
                                        <Link href={`/explore?collection=${col.id}`}>
                                            Explore Moodboard <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Create Collection Modal */}
                <AnimatePresence>
                    {showCreateModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full max-w-md bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl relative"
                            >
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">New Collection</h2>
                                <p className="text-xs text-muted-foreground mb-6">Group favorite projects and design patterns into a shared board.</p>

                                <form onSubmit={handleCreate} className="space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Collection Title *</label>
                                        <Input
                                            required
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            placeholder="e.g. 3D Spatial Audio Interfaces"
                                            className="mt-1 rounded-xl"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Description (Optional)</label>
                                        <Input
                                            value={newDescription}
                                            onChange={(e) => setNewDescription(e.target.value)}
                                            placeholder="What kind of inspiration belongs here?"
                                            className="mt-1 rounded-xl"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                                        <div className="flex items-center gap-2.5">
                                            <Lock className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs font-bold text-slate-900 dark:text-white">Private Collection</p>
                                                <p className="text-[11px] text-muted-foreground">Only you can view this moodboard</p>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={isPrivate}
                                            onChange={(e) => setIsPrivate(e.target.checked)}
                                            className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl py-6 mt-4">
                                        Create Moodboard
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
    )
}
