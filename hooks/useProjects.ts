"use client"

import { useCallback, useEffect, useState, useTransition } from "react"
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
  const { category, search, sortBy = "trending", limit = 30, userId } = options
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
            id, username, full_name, avatar_url, is_verified, is_pro, role
          )
        `)
        .eq("is_published", true)

      if (category && category.toLowerCase() !== "all") {
        query = query.ilike("category", `%${category}%`)
      }
      if (userId) query = query.eq("user_id", userId)
      if (search?.trim()) {
        const term = search.trim()
        query = query.or(`title.ilike.%${term}%,description.ilike.%${term}%`)
      }
      query = sortBy === "recent"
        ? query.order("created_at", { ascending: false })
        : query.order("likes_count", { ascending: false }).order("created_at", { ascending: false })
      if (limit) query = query.limit(limit)

      const { data, error: queryError } = await query
      if (queryError) throw queryError

      startTransition(() => {
        setProjects((data ?? []).map((project) => ({
          ...project,
          profiles: project.profiles ?? null,
          user: project.profiles ?? null,
        })) as Project[])
      })
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Unable to load projects")
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }, [category, search, sortBy, limit, userId])

  useEffect(() => {
    void fetchProjects()
  }, [fetchProjects])

  useRealtimeSubscription({
    table: "projects",
    onInsert: (record) => setProjects((current) => [record as Project, ...current]),
    onUpdate: (record) => setProjects((current) =>
      current.map((project) => project.id === record.id ? { ...project, ...record } : project)
    ),
    onDelete: (record) => setProjects((current) =>
      current.filter((project) => project.id !== record.id)
    ),
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
