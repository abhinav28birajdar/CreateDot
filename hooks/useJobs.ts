"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { useRealtimeSubscription } from "./useRealtime"
import { toast } from "sonner"
import type { Database } from "@/types/database"

export type Job = Database["public"]["Tables"]["jobs"]["Row"] & {
  profiles?: Database["public"]["Tables"]["profiles"]["Row"] | null
  user?: Database["public"]["Tables"]["profiles"]["Row"] | null
}

export interface UseJobsOptions {
  type?: string
  search?: string
}

export function useJobs(options: UseJobsOptions = {}) {
  const { type, search } = options
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchJobs = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      let query = supabase
        .from("jobs")
        .select(`
          *,
          profiles:user_id (id, username, full_name, avatar_url)
        `)
        .eq("status", "open")
        .order("created_at", { ascending: false })

      if (type && type !== "All" && type !== "all") {
        query = query.ilike("type", `%${type}%`)
      }

      if (search && search.trim()) {
        const term = search.trim()
        query = query.or(`title.ilike.%${term}%,company.ilike.%${term}%,description.ilike.%${term}%`)
      }

      const { data, error: queryError } = await query

      if (queryError) throw queryError

      const formatted = (data || []).map((j: any) => ({
        ...j,
        user: j.profiles || null,
      }))

      setJobs(formatted)
    } catch (err: any) {
      console.warn("Error fetching jobs from Supabase:", err)
      setError(err?.message || "Failed to load jobs")
    } finally {
      setIsLoading(false)
    }
  }, [type, search])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  // Live real-time subscription on jobs
  useRealtimeSubscription({
    table: "jobs",
    onInsert: async (newRecord) => {
      if (newRecord.user_id) {
        const { data: prof } = await supabase
          .from("profiles")
          .select("id, username, full_name, avatar_url")
          .eq("id", newRecord.user_id)
          .single()

        const fullJob: Job = {
          ...newRecord,
          profiles: prof || null,
          user: prof || null,
        }

        setJobs((prev) => [fullJob, ...prev.filter((j) => j.id !== fullJob.id)])
      }
    },
    onUpdate: (updatedRecord) => {
      setJobs((prev) =>
        prev.map((j) => (j.id === updatedRecord.id ? { ...j, ...updatedRecord } : j))
      )
    },
    onDelete: (deletedRecord) => {
      setJobs((prev) => prev.filter((j) => j.id !== deletedRecord.id))
    },
  })

  // Post a new job
  const postJob = async (input: {
    title: string
    company: string
    location: string
    salary: string
    type?: string
    description: string
    tags?: string[]
  }) => {
    if (!user) {
      toast.error("Please sign in to post a design role")
      return { error: new Error("Unauthenticated") }
    }

    setIsSubmitting(true)

    try {
      const { data, error: insertError } = await supabase
        .from("jobs")
        .insert({
          user_id: user.id,
          title: input.title,
          company: input.company,
          location: input.location,
          salary: input.salary,
          type: input.type || "Remote",
          description: input.description,
          tags: input.tags || ["Design", "Full-time"],
          status: "open",
          is_featured: true,
        })
        .select(`
          *,
          profiles:user_id (id, username, full_name, avatar_url)
        `)
        .single()

      if (insertError) throw insertError

      if (data) {
        const fullJob: Job = {
          ...data,
          user: (data as any).profiles || null,
        }
        setJobs((prev) => [fullJob, ...prev])
      }

      toast.success("Job posting published live to the CreateDOT Guild!")
      return { error: null, data }
    } catch (err: any) {
      toast.error("Failed to post job", { description: err.message })
      return { error: err }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Apply to job
  const applyToJob = async (jobId: string, note?: string) => {
    if (!user) {
      toast.error("Please sign in to submit your portfolio and application")
      return { error: new Error("Unauthenticated") }
    }

    try {
      const { error: applyError } = await supabase
        .from("job_applications")
        .insert({
          job_id: jobId,
          user_id: user.id,
          note: note || "Application submitted via CreateDOT verified portfolio",
          status: "pending",
        })

      if (applyError) {
        if (applyError.code === "23505") {
          toast.info("You have already applied to this role.")
          return { error: null }
        }
        throw applyError
      }

      toast.success("Application successfully submitted!", {
        description: "Your verified portfolio and case studies were attached.",
      })
      return { error: null }
    } catch (err: any) {
      toast.error("Failed to submit application", { description: err.message })
      return { error: err }
    }
  }

  return {
    jobs,
    isLoading,
    isSubmitting,
    error,
    postJob,
    applyToJob,
    refetch: fetchJobs,
    isEmpty: !isLoading && jobs.length === 0,
  }
}

export default useJobs
