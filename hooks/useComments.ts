"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { useRealtimeSubscription } from "./useRealtime"
import { toast } from "sonner"
import type { Database } from "@/types/database"

export type Comment = Database["public"]["Tables"]["comments"]["Row"] & {
  profiles?: Database["public"]["Tables"]["profiles"]["Row"] | null
  user?: Database["public"]["Tables"]["profiles"]["Row"] | null
}

export function useComments(projectId: string) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchComments = useCallback(async () => {
    if (!projectId) return
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: queryError } = await supabase
        .from("comments")
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url,
            is_verified
          )
        `)
        .eq("project_id", projectId)
        .order("created_at", { ascending: true })

      if (queryError) throw queryError

      const formatted = (data || []).map((c: any) => ({
        ...c,
        user: c.profiles || null,
      }))

      setComments(formatted)
    } catch (err: any) {
      console.warn("Error fetching comments:", err)
      setError(err?.message || "Failed to load comments")
    } finally {
      setIsLoading(false)
    }
  }, [projectId])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  // Real-time listener for comments on this project
  useRealtimeSubscription({
    table: "comments",
    filter: `project_id=eq.${projectId}`,
    onInsert: async (newRecord) => {
      if (newRecord.user_id) {
        const { data: prof } = await supabase
          .from("profiles")
          .select("id, username, full_name, avatar_url, is_verified")
          .eq("id", newRecord.user_id)
          .single()

        const fullComment: Comment = {
          ...newRecord,
          profiles: prof || null,
          user: prof || null,
        }

        setComments((prev) => {
          if (prev.some((c) => c.id === fullComment.id)) return prev
          return [...prev, fullComment]
        })
      }
    },
    onDelete: (deletedRecord) => {
      setComments((prev) => prev.filter((c) => c.id !== deletedRecord.id))
    },
    onUpdate: (updatedRecord) => {
      setComments((prev) =>
        prev.map((c) => (c.id === updatedRecord.id ? { ...c, ...updatedRecord } : c))
      )
    },
  })

  const addComment = async (content: string, parentId?: string | null) => {
    if (!user) {
      toast.error("Please sign in to leave a critique or comment")
      return { error: new Error("Unauthenticated") }
    }

    if (!content.trim()) {
      toast.error("Comment cannot be empty")
      return { error: new Error("Empty comment") }
    }

    setIsSubmitting(true)

    try {
      const { data, error: insertError } = await supabase
        .from("comments")
        .insert({
          project_id: projectId,
          user_id: user.id,
          content: content.trim(),
          parent_id: parentId || null,
        })
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url,
            is_verified
          )
        `)
        .single()

      if (insertError) throw insertError

      if (data) {
        const formatted: Comment = {
          ...data,
          user: data.profiles || null,
        }
        setComments((prev) => {
          if (prev.some((c) => c.id === formatted.id)) return prev
          return [...prev, formatted]
        })
      }

      toast.success("Comment posted!")
      return { error: null, data }
    } catch (err: any) {
      toast.error("Failed to post comment", { description: err.message })
      return { error: err }
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteComment = async (commentId: string) => {
    if (!user) return

    try {
      const { error: delError } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId)

      if (delError) throw delError

      setComments((prev) => prev.filter((c) => c.id !== commentId))
      toast.success("Comment deleted")
    } catch (err: any) {
      toast.error("Failed to delete comment", { description: err.message })
    }
  }

  return {
    comments,
    isLoading,
    isSubmitting,
    error,
    addComment,
    deleteComment,
    refetch: fetchComments,
  }
}

export default useComments
