"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, MapPin, DollarSign, Clock, Building2, Search, Filter, Plus, ArrowUpRight, CheckCircle2, Sparkles, Send, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface JobListing {
    id: string
    title: string
    company: string
    logo: string
    location: string
    type: 'Full-time' | 'Contract' | 'Remote' | 'Freelance'
    salary: string
    experience: string
    posted: string
    tags: string[]
    description: string
    isFeatured?: boolean
}

const JOBS_DATA: JobListing[] = [
    {
        id: 'j1',
        title: 'Senior Product Designer — AI Systems',
        company: 'Vercel',
        logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
        location: 'San Francisco, CA / Remote',
        type: 'Remote',
        salary: '$160k - $210k',
        experience: 'Senior (5+ yrs)',
        posted: '2 hours ago',
        tags: ['Figma', 'Design Systems', 'AI Interfaces', 'Next.js'],
        description: 'Lead the next generation of developer & designer tools. You will architect intuitive AI workflows and design systems for millions of web builders.',
        isFeatured: true
    },
    {
        id: 'j2',
        title: 'Lead 3D Spatial & VisionOS Designer',
        company: 'Linear Labs',
        logo: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=100&q=80',
        location: 'New York, NY / Remote',
        type: 'Full-time',
        salary: '$175k - $230k',
        experience: 'Lead (7+ yrs)',
        posted: '5 hours ago',
        tags: ['Blender', 'Spline', 'VisionOS', 'Three.js'],
        description: 'Shape the spatial UI and tactile micro-interactions for modern productivity software on vision and web platforms.',
        isFeatured: true
    },
    {
        id: 'j3',
        title: 'Brand Identity & Visual Designer',
        company: 'Oasis Studio',
        logo: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=100&q=80',
        location: 'London, UK / Hybrid',
        type: 'Contract',
        salary: '$90 - $130 / hr',
        experience: 'Mid-Senior (4+ yrs)',
        posted: '1 day ago',
        tags: ['Branding', 'Typography', 'Art Direction', 'Print'],
        description: 'Collaborate with global luxury fashion and architecture clients on complete visual identities, editorial monographs, and motion guidelines.',
        isFeatured: false
    },
    {
        id: 'j4',
        title: 'Staff Design Technologist / Prototyper',
        company: 'Figma',
        logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=100&q=80',
        location: 'San Francisco, CA / Remote',
        type: 'Full-time',
        salary: '$190k - $250k',
        experience: 'Staff (8+ yrs)',
        posted: '1 day ago',
        tags: ['React', 'TypeScript', 'Canvas', 'WebGL', 'Figma Plugin'],
        description: 'Bridge high-fidelity design engineering with product development, building rapid experiments, plugin architecture, and canvas engines.',
        isFeatured: false
    },
    {
        id: 'j5',
        title: 'UI/UX Mobile App Designer',
        company: 'Monolith Fintech',
        logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=100&q=80',
        location: 'Berlin, Germany / Remote',
        type: 'Full-time',
        salary: '€85k - €115k',
        experience: 'Mid-Level (3+ yrs)',
        posted: '2 days ago',
        tags: ['iOS', 'Android', 'Fintech', 'Design Systems'],
        description: 'Own the end-to-end mobile experience for over 4 million European banking and cryptocurrency users with high attention to tactile polish.',
        isFeatured: false
    }
]

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedType, setSelectedType] = useState('All')
    const [activeJob, setActiveJob] = useState<JobListing | null>(null)
    const [showPostModal, setShowPostModal] = useState(false)
    const [isApplying, setIsApplying] = useState(false)

    const filteredJobs = JOBS_DATA.filter(job => {
        const matchesType = selectedType === 'All' || job.type === selectedType
        const matchesSearch = !searchQuery || (
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        return matchesType && matchesSearch
    })

    const handleApply = (job: JobListing) => {
        setIsApplying(true)
        setTimeout(() => {
            setIsApplying(false)
            setActiveJob(null)
            toast.success(`Application sent to ${job.company}!`, {
                description: 'Your CreateDOT portfolio & case studies were attached.'
            })
        }, 1200)
    }

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-[36px] bg-[#14161F] p-8 sm:p-14 text-white shadow-2xl">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 to-[#FFE185]/20 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider mb-4 border border-white/10">
                            <Sparkles className="h-3.5 w-3.5 text-[#FF6B6B]" />
                            Curated Guild Roles
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                            Find Your Next Creative Chapter.
                        </h1>
                        <p className="mt-3 text-sm sm:text-base text-[#9DA7C2] leading-relaxed">
                            Discover high-craft product design, 3D spatial, branding, and design engineering roles at top tech companies and boutique design studios.
                        </p>
                    </div>
                    <Button
                        onClick={() => setShowPostModal(true)}
                        className="bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold px-7 py-6 rounded-full shadow-lg shadow-[#FF6B6B]/30 shrink-0 transition-transform active:scale-95"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Post a Role ($199)
                    </Button>
                </div>

                {/* Stats strip */}
                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
                    <div>
                        <p className="text-2xl font-black text-white">240+</p>
                        <p className="text-xs text-[#9DA7C2]">Verified Roles</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-[#FFE185]">$175k</p>
                        <p className="text-xs text-[#9DA7C2]">Average Salary</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-[#10B981]">82%</p>
                        <p className="text-xs text-[#9DA7C2]">Remote Worldwide</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-[#FF6B6B]">Direct</p>
                        <p className="text-xs text-[#9DA7C2]">No Resume Red Tape</p>
                    </div>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C96AB]" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title, studio, or skill..."
                        className="h-11 pl-10 rounded-full bg-white/80 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs font-medium"
                    />
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-white/80 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10 rounded-2xl overflow-x-auto w-full md:w-auto shadow-sm">
                    {['All', 'Remote', 'Full-time', 'Contract'].map(type => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${selectedType === type ? 'bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] shadow-sm' : 'text-[#647087] hover:text-[#14161F] dark:hover:text-white'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Jobs Listings List */}
            <div className="space-y-4">
                {filteredJobs.map((job, idx) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="group p-6 rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 hover:border-[#FF6B6B]/40 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-sm"
                    >
                        <div className="flex items-start gap-4">
                            <img
                                src={job.logo}
                                alt={job.company}
                                className="h-14 w-14 rounded-2xl object-cover ring-2 ring-black/5"
                            />
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-lg font-bold text-[#14161F] dark:text-white group-hover:text-[#FF6B6B] transition">
                                        {job.title}
                                    </h3>
                                    {job.isFeatured && (
                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#FAF0D7] text-[#8A6318]">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-[#647087] dark:text-[#9DA7C2] mt-1 flex-wrap">
                                    <span className="font-bold text-[#14161F] dark:text-white">{job.company}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1 font-bold text-[#10B981]">
                                        <DollarSign className="h-3 w-3" /> {job.salary}
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                                    {job.tags.map(t => (
                                        <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#14161F]/5 dark:bg-white/10 text-[#5A637A] dark:text-[#9DA7C2] font-semibold">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-4 md:pt-0 border-t md:border-t-0 border-[#14161F]/6 dark:border-white/10">
                            <span className="text-xs text-[#647087] hidden lg:block mr-2">{job.posted}</span>
                            <Button
                                variant="outline"
                                onClick={() => setActiveJob(job)}
                                className="rounded-full border-[#14161F]/15 dark:border-white/10 text-xs font-bold"
                            >
                                Details
                            </Button>
                            <Button
                                onClick={() => handleApply(job)}
                                className="bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold rounded-full shadow-md shadow-[#FF6B6B]/25 text-xs px-5"
                            >
                                Quick Apply
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

                {/* Job Details Modal */}
                <AnimatePresence>
                    {activeJob && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full max-w-2xl bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                            >
                                <button
                                    onClick={() => setActiveJob(null)}
                                    className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={activeJob.logo}
                                        alt={activeJob.company}
                                        className="h-16 w-16 rounded-2xl object-cover ring-2 ring-violet-500/20"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{activeJob.title}</h2>
                                        <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">{activeJob.company} • {activeJob.location}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 mb-6 text-xs">
                                    <div>
                                        <p className="text-muted-foreground">Compensation</p>
                                        <p className="font-bold text-slate-900 dark:text-white mt-0.5">{activeJob.salary}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Workplace</p>
                                        <p className="font-bold text-slate-900 dark:text-white mt-0.5">{activeJob.type}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Experience</p>
                                        <p className="font-bold text-slate-900 dark:text-white mt-0.5">{activeJob.experience}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">About the Role</h4>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                                        {activeJob.description}
                                    </p>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground pt-2">Skills & Technologies</h4>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {activeJob.tags.map(t => (
                                            <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        <span>Auto-attaches verified portfolio</span>
                                    </div>
                                    <Button
                                        onClick={() => handleApply(activeJob)}
                                        disabled={isApplying}
                                        className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 rounded-xl"
                                    >
                                        {isApplying ? "Submitting Application..." : "Submit Application"}
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Post a Job Modal */}
                <AnimatePresence>
                    {showPostModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full max-w-lg bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl relative"
                            >
                                <button
                                    onClick={() => setShowPostModal(false)}
                                    className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Post a Design Job</h2>
                                <p className="text-xs text-muted-foreground mb-6">Reach over 50,000+ vetted product designers and creative technologists.</p>

                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    toast.success("Job posting created successfully!")
                                    setShowPostModal(false)
                                }} className="space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Job Title</label>
                                        <Input required placeholder="Senior Product Designer" className="mt-1 rounded-xl" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Company Name</label>
                                        <Input required placeholder="Your Studio or Startup" className="mt-1 rounded-xl" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Location</label>
                                            <Input required placeholder="Remote / City" className="mt-1 rounded-xl" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Salary / Rate</label>
                                            <Input required placeholder="$140k - $180k" className="mt-1 rounded-xl" />
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl py-6 mt-4">
                                        Continue to Payment ($199)
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
    )
}
