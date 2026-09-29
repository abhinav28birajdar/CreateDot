"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Upload, X, Plus, Sparkles, Image as ImageIcon, Video, CheckCircle2, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CATEGORIES } from '@/config/categories'
import { createProject } from '@/services/project.service'
import { toast } from 'sonner'

export function ProjectUploadForm() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('UI Design')
    const [coverImage, setCoverImage] = useState<File | null>(null)
    const [coverPreview, setCoverPreview] = useState<string>('')
    const [assets, setAssets] = useState<File[]>([])
    const [assetPreviews, setAssetPreviews] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>(['ui-design', 'ui-ux', 'modern'])
    const [tagInput, setTagInput] = useState('')
    const [toolsUsed, setToolsUsed] = useState<string[]>(['Figma'])
    const [toolInput, setToolInput] = useState('')
    const [externalUrl, setExternalUrl] = useState('')
    const [allowComments, setAllowComments] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setCoverImage(file)
            setCoverPreview(URL.createObjectURL(file))
        }
    }

    const handleAssetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setAssets(prev => [...prev, ...files])
            const previews = files.map(file => URL.createObjectURL(file))
            setAssetPreviews(prev => [...prev, ...previews])
        }
    }

    const removeAsset = (index: number) => {
        setAssets(prev => prev.filter((_, i) => i !== index))
        setAssetPreviews(prev => prev.filter((_, i) => i !== index))
    }

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
            setTags(prev => [...prev, tagInput.trim().toLowerCase()])
            setTagInput('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(prev => prev.filter(t => t !== tagToRemove))
    }

    const addTool = () => {
        if (toolInput.trim() && !toolsUsed.includes(toolInput.trim())) {
            setToolsUsed(prev => [...prev, toolInput.trim()])
            setToolInput('')
        }
    }

    const removeTool = (toolToRemove: string) => {
        setToolsUsed(prev => prev.filter(t => t !== toolToRemove))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) {
            toast.error('Please enter a project title')
            return
        }
        if (!coverImage && !coverPreview) {
            toast.error('Please select a cover image')
            return
        }

        setIsSubmitting(true)

        try {
            const project = await createProject({
                title,
                description,
                cover_image: coverImage || coverPreview,
                assets,
                category,
                tags,
                tools_used: toolsUsed,
                external_url: externalUrl || undefined,
                is_published: true,
                allow_comments: allowComments
            })

            toast.success('Project published successfully! 🚀')
            router.push(`/project/${project.id}`)
        } catch (error: any) {
            toast.error('Failed to publish project', { description: error.message || 'An error occurred' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 p-6 sm:p-10 pb-24 rounded-[36px] bg-white/80 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 shadow-2xl shadow-[#14161F]/5 backdrop-blur-xl">
            {/* Header */}
            <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0D7] dark:bg-white/10 text-xs font-black text-[#8A6318] dark:text-[#FFE185] uppercase tracking-wider mb-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#FF6B6B]" />
                    Studio Creator Suite
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#14161F] dark:text-white">
                    Publish Your Masterpiece.
                </h1>
                <p className="text-sm text-[#647087] dark:text-[#9DA7C2] mt-1">
                    Showcase your work to the global guild of creative directors, recruiters, and design enthusiasts.
                </p>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">
                    Project Cover Canvas *
                </label>
                <div className="relative group border-2 border-dashed border-[#14161F]/15 dark:border-white/15 rounded-3xl p-6 text-center hover:border-[#FF6B6B]/50 transition-colors bg-[#14161F]/[0.02] dark:bg-white/[0.02] overflow-hidden">
                    {coverPreview ? (
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg">
                            <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => { setCoverImage(null); setCoverPreview('') }}
                                className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center py-12">
                            <div className="w-16 h-16 rounded-2xl bg-[#14161F] text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md">
                                <Upload className="w-7 h-7 text-[#FF6B6B]" />
                            </div>
                            <span className="font-bold text-[#14161F] dark:text-white">Click or drag & drop high-res cover</span>
                            <span className="text-xs text-[#647087] dark:text-[#9DA7C2] mt-1">PNG, JPG, WebP, GIF up to 25MB</span>
                            <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
                        </label>
                    )}
                </div>
            </div>

            {/* Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">Project Title *</label>
                    <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="e.g. Marrow — Coffee culture, remixed"
                        className="h-12 text-base font-semibold rounded-2xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">Category *</label>
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full h-12 px-4 rounded-2xl border border-[#14161F]/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-[#14161F] dark:text-white font-semibold text-sm focus:ring-2 focus:ring-[#FF6B6B] focus:outline-none"
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.name} className="dark:bg-[#14161F]">
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">Design Rationale & Case Study Summary</label>
                <Textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Describe the problem space, typography choices, and artistic direction of this project..."
                    className="min-h-[130px] rounded-2xl text-sm leading-relaxed bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 resize-none"
                />
            </div>

            {/* Gallery Assets Upload */}
            <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">
                    High-Res Gallery Shots
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {assetPreviews.map((src, i) => (
                        <div key={i} className="relative aspect-video rounded-2xl overflow-hidden border border-[#14161F]/10 dark:border-white/10 group shadow-sm bg-black/5">
                            <img src={src} alt={`Asset ${i}`} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeAsset(i)}
                                className="absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <label className="aspect-video rounded-2xl border-2 border-dashed border-[#14161F]/15 dark:border-white/15 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6B6B]/50 transition-colors bg-[#14161F]/[0.02] dark:bg-white/[0.02]">
                        <Plus className="w-6 h-6 text-[#647087]" />
                        <span className="text-xs text-[#647087] dark:text-[#9DA7C2] mt-1 font-bold">Add Media</span>
                        <input type="file" accept="image/*,video/*" multiple onChange={handleAssetsChange} className="hidden" />
                    </label>
                </div>
            </div>

            {/* Tags & Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tags */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">Design Tags</label>
                    <div className="flex gap-2">
                        <Input
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                            placeholder="Add tag (e.g. branding)"
                            className="rounded-full bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs"
                        />
                        <Button type="button" onClick={addTag} variant="outline" className="rounded-full border-[#14161F]/15 dark:border-white/10 font-bold text-xs">Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {tags.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#14161F]/5 dark:bg-white/10 text-[#14161F] dark:text-white rounded-full text-xs font-semibold">
                                #{tag}
                                <button type="button" onClick={() => removeTag(tag)} className="hover:text-[#FF6B6B]">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tools */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">Creative Tools</label>
                    <div className="flex gap-2">
                        <Input
                            value={toolInput}
                            onChange={e => setToolInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTool() } }}
                            placeholder="Add tool (e.g. Figma, Blender)"
                            className="rounded-full bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs"
                        />
                        <Button type="button" onClick={addTool} variant="outline" className="rounded-full border-[#14161F]/15 dark:border-white/10 font-bold text-xs">Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {toolsUsed.map(tool => (
                            <span key={tool} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF0D7] dark:bg-white/10 text-[#8A6318] dark:text-[#FFE185] rounded-full text-xs font-bold">
                                ✦ {tool}
                                <button type="button" onClick={() => removeTool(tool)} className="hover:text-[#FF6B6B]">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* External URL */}
            <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">Interactive Prototype / Figma URL</label>
                <Input
                    value={externalUrl}
                    onChange={e => setExternalUrl(e.target.value)}
                    placeholder="https://figma.com/@file or https://live-demo.com"
                    className="h-11 rounded-full bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs"
                />
            </div>

            {/* Submit Action Bar */}
            <div className="pt-6 border-t border-[#14161F]/8 dark:border-white/10 flex items-center justify-between">
                <Button type="button" variant="ghost" onClick={() => router.back()} className="rounded-full font-bold text-xs text-[#647087]">
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#FF6B6B] hover:bg-[#F35555] text-white px-8 h-12 rounded-full font-bold shadow-xl shadow-[#FF6B6B]/25"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Publishing Project...
                        </>
                    ) : (
                        <>
                            Publish Project
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                    )}
                </Button>
            </div>
        </form>
    )
}
