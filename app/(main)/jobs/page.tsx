"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Search,
  Plus,
  CheckCircle2,
  Sparkles,
  X,
  RotateCw,
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useJobs, type Job } from "@/hooks/useJobs"
import { toast } from "sonner"

export default function JobsPage() {
  const [selectedType, setSelectedType] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeJob, setActiveJob] = useState<Job | null>(null)
  const [showPostModal, setShowPostModal] = useState(false)
  const [isApplying, setIsApplying] = useState(false)

  // New Job Form State
  const [newTitle, setNewTitle] = useState('')
  const [newCompany, setNewCompany] = useState('')
  const [newLocation, setNewLocation] = useState('Remote')
  const [newSalary, setNewSalary] = useState('$120k - $160k')
  const [newType, setNewType] = useState('Remote')
  const [newDescription, setNewDescription] = useState('')

  const {
    jobs,
    isLoading,
    error,
    postJob,
    applyToJob,
    refetch,
    isEmpty,
  } = useJobs({
    type: selectedType === 'All' ? undefined : selectedType,
    search: searchTerm,
  })

  const handleApply = async (job: Job) => {
    setIsApplying(true)
    try {
      await applyToJob(job.id)
      setActiveJob(null)
    } finally {
      setIsApplying(false)
    }
  }

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newCompany.trim()) {
      toast.error("Please fill in job title and company name")
      return
    }

    const res = await postJob({
      title: newTitle.trim(),
      company: newCompany.trim(),
      location: newLocation.trim(),
      salary: newSalary.trim(),
      type: newType,
      description: newDescription.trim() || 'Exciting creative opportunity at a high-craft studio.',
    })

    if (!res.error) {
      setShowPostModal(false)
      setNewTitle('')
      setNewCompany('')
      setNewDescription('')
    }
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto">
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

        {/* Live Stats */}
        <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div>
            <p className="text-2xl font-black text-white">{jobs.length}</p>
            <p className="text-xs text-[#9DA7C2]">Live Guild Roles</p>
          </div>
          <div>
            <p className="text-2xl font-black text-[#FF6B6B]">$140k+</p>
            <p className="text-xs text-[#9DA7C2]">Avg Base Comp</p>
          </div>
          <div>
            <p className="text-2xl font-black text-emerald-400">100%</p>
            <p className="text-xs text-[#9DA7C2]">Verified Studios</p>
          </div>
          <div>
            <p className="text-2xl font-black text-violet-400">Real-time</p>
            <p className="text-xs text-[#9DA7C2]">Supabase Updates</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {['All', 'Remote', 'Full-time', 'Contract', 'Freelance'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedType === t
                  ? 'bg-[#14161F] text-white shadow-md dark:bg-white dark:text-[#14161F]'
                  : 'bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search roles or studios..."
            className="pl-9 h-11 rounded-2xl bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-xs"
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 animate-pulse space-y-3"
            >
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="text-center py-12 bg-white dark:bg-white/5 rounded-3xl border border-red-200 dark:border-red-900/30 p-6">
          <p className="text-sm text-red-500 mb-3">{error}</p>
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <RotateCw className="h-3.5 w-3.5 mr-2" /> Retry
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && isEmpty && (
        <div className="text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 p-8 max-w-lg mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#FF6B6B]/15 text-[#FF6B6B] flex items-center justify-center mx-auto">
            <Briefcase className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No job postings found</h3>
          <p className="text-xs text-slate-500">
            Be the first hiring manager or studio lead to list an open role for our verified creative network!
          </p>
          <Button onClick={() => setShowPostModal(true)} className="bg-[#14161F] dark:bg-white text-white dark:text-[#14161F] font-bold rounded-full px-6">
            Post the First Role
          </Button>
        </div>
      )}

      {/* Job Listings Feed */}
      {!isLoading && !error && !isEmpty && (
        <div className="space-y-4">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ y: -2 }}
              onClick={() => setActiveJob(job)}
              className="cursor-pointer p-6 rounded-3xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#14161F] text-white flex items-center justify-center text-lg font-black shrink-0 shadow-md">
                  {job.company.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{job.title}</h3>
                    {job.is_featured && (
                      <Badge className="bg-[#FF6B6B] text-white text-[10px]">Featured</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                      <Building2 className="h-3.5 w-3.5" /> {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <DollarSign className="h-3.5 w-3.5" /> {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {job.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <div className="flex flex-wrap gap-1.5">
                  {job.tags?.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button size="sm" className="rounded-xl font-bold bg-violet-600 hover:bg-violet-700 text-white shrink-0">
                  View & Apply
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Job Details & Apply Modal */}
      <AnimatePresence>
        {activeJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white dark:bg-[#151926] rounded-3xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveJob(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#14161F] text-white flex items-center justify-center text-xl font-black">
                    {activeJob.company.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{activeJob.title}</h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {activeJob.company} • {activeJob.location} • {activeJob.type}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-slate-400">Compensation</p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 text-base">{activeJob.salary}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Experience</p>
                    <p className="font-bold text-slate-900 dark:text-white">{activeJob.experience || 'Mid-Senior'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Status</p>
                    <p className="font-bold text-violet-500 uppercase">{activeJob.status}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description & Scope</h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {activeJob.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Auto-attaches your verified CreateDOT profile</span>
                  </div>
                  <Button
                    onClick={() => handleApply(activeJob)}
                    disabled={isApplying}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 rounded-xl"
                  >
                    {isApplying ? "Submitting Application..." : "Submit Application"}
                  </Button>
                </div>
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
              className="w-full max-w-lg bg-white dark:bg-[#151926] rounded-3xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setShowPostModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Post a Creative Role</h2>
              <p className="text-xs text-slate-500 mb-6">Listings are broadcast live in real-time to verified creatives.</p>

              <form onSubmit={handleCreateJob} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Job Title *</label>
                  <Input
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Senior Product Designer (Design Systems)"
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Company Name *</label>
                  <Input
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="Aura Studio or Vercel"
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Location</label>
                    <Input
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="Remote / San Francisco"
                      className="mt-1 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Salary / Rate</label>
                    <Input
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      placeholder="$140k - $180k"
                      className="mt-1 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Role Scope & Requirements</label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describe design responsibilities, tools needed, and studio vision..."
                    className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent text-xs focus:ring-2 focus:ring-violet-500 focus:outline-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#FF6B6B] hover:bg-[#F05555] text-white font-bold rounded-2xl py-6 mt-4 shadow-lg shadow-[#FF6B6B]/20">
                  Publish Role Live to Guild
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
