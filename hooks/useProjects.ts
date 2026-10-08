"use client"

import { useState, useEffect, useCallback, useTransition } from "react"
import { supabase } from "@/lib/supabase"
import { useRealtimeSubscription } from "./useRealtime"
import type { Database } from "@/types/database"

export type Project = Database["public"]["Tables"]["projects"]["Row"] & {
  profiles?: Database["public"]["Tables"]["profiles"]["Row"] | null
  user?: Database["public"]["Tables"]["profiles"]["Row"] | null
}

export interface UseProjectsOptions {
  category?: string
  search?: string
  sortBy?: "recent" | "popular" | "trending"
  limit?: number
  userId?: string
}

export function useProjects(options: UseProjectsOptions = {}) {
  const { category, search, sortBy = "recent", limit = 20, userId } = options

  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const fetchProjects = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      let query = supabase
        .from("projects")
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url,
            is_verified,
            is_pro,
            role
          )
        `)
        .eq("is_published", true)

      if (category && category !== "All" && category !== "all") {
        query = query.ilike("category", `%${category}%`)
      }

      if (userId) {
        query = query.eq("user_id", userId)
      }

      if (search && search.trim()) {
        const term = search.trim()
        query = query.or(`title.ilike.%${term}%,description.ilike.%${term}%`)
      }

      if (sortBy === "popular" || sortBy === "trending") {
        query = query.order("likes_count", { ascending: false }).order("created_at", { ascending: false })
      } else {
        query = query.order("created_at", { ascending: false })
      }

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error: queryError } = await query

      if (queryError) throw queryError

      const formatted = (data || []).map((p: any) => ({
        ...p,
        user: p.profiles || null,
      }))

      startTransition(() => {
        setProjects(formatted)
      })
    } catch (err: any) {
      console.warn("Error fetching projects from Supabase:", err)
      setError(err?.message || "Failed to load projects")
    } finally {
      setIsLoading(false)
    }
  }, [category, search, sortBy, limit, userId])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Live real-time subscription on projects table
  useRealtimeSubscription({
    table: "projects",
    onInsert: async (newRecord) => {
      // Fetch creator profile for new item
      if (newRecord.user_id) {
        const { data: prof } = await supabase
          .from("profiles")
          .select("id, username, full_name, avatar_url, is_verified, is_pro, role")
          .eq("id", newRecord.user_id)
          .single()

        const fullProject: Project = {
          ...newRecord,
          profiles: prof || null,
          user: prof || null,
        }

        setProjects((prev) => [fullProject, ...prev.filter((p) => p.id !== fullProject.id)])
      }
    },
    onUpdate: (updatedRecord) => {
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedRecord.id ? { ...p, ...updatedRecord } : p))
      )
    },
    onDelete: (deletedRecord) => {
      setProjects((prev) => prev.filter((p) => p.id !== deletedRecord.id))
    },
  })

  return {
    projects,
    isLoading: isLoading || isPending,
    error,
    refetch: fetchProjects,
    isEmpty: !isLoading && projects.length === 0,
  }
}

export default useProjects
