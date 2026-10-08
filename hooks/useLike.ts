"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { useRealtimeSubscription } from "./useRealtime"
import { toast } from "sonner"

export function useLike(projectId: string, initialLiked = false, initialCount = 0) {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch initial liked status from Supabase
  useEffect(() => {
    if (!user || !projectId) return

    let isMounted = true

    async function checkLiked() {
      try {
        const { data, error } = await supabase
          .from("likes")
          .select("id")
          .eq("user_id", user!.id)
          .eq("project_id", projectId)
          .maybeSingle()

        if (!error && isMounted) {
          setIsLiked(!!data)
        }
      } catch (err) {
        console.warn("Error checking like status:", err)
      }
    }

    checkLiked()

    return () => {
      isMounted = false
    }
  }, [user, projectId])

  // Live real-time sync for likes on this project
  useRealtimeSubscription({
    table: "likes",
    filter: `project_id=eq.${projectId}`,
    onInsert: (newRecord) => {
      setCount((c) => c + 1)
      if (user && newRecord.user_id === user.id) {
        setIsLiked(true)
      }
    },
    onDelete: (deletedRecord) => {
      setCount((c) => Math.max(0, c - 1))
      if (user && deletedRecord.user_id === user.id) {
        setIsLiked(false)
      }
    },
  })

  const toggleLike = useCallback(
    async (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      if (!user) {
        toast.info("Sign in to appreciate projects and save them to your profile", {
          action: {
            label: "Sign In",
            onClick: () => {
              if (typeof window !== "undefined") window.location.href = "/login"
            },
          },
        })
        return
      }

      if (isLoading) return
      setIsLoading(true)

      // Optimistic update
      const wasLiked = isLiked
      const nextLiked = !wasLiked
      setIsLiked(nextLiked)
      setCount((c) => (wasLiked ? Math.max(0, c - 1) : c + 1))

      try {
        if (wasLiked) {
          const { error } = await supabase
            .from("likes")
            .delete()
            .match({ user_id: user.id, project_id: projectId })

          if (error) throw error
          toast.success("Removed appreciation")
        } else {
          const { error } = await supabase
            .from("likes")
            .insert({ user_id: user.id, project_id: projectId })

          if (error) throw error
          toast.success("Appreciated project! ❤️")
        }
      } catch (err: any) {
        // Rollback optimistic state on error
        setIsLiked(wasLiked)
        setCount((c) => (wasLiked ? c + 1 : Math.max(0, c - 1)))
        console.warn("Like sync error:", err)
        toast.error("Could not update appreciation", { description: err.message })
      } finally {
        setIsLoading(false)
      }
    },
    [user, projectId, isLiked, isLoading]
  )

  return { isLiked, count, toggleLike, isLoading }
}

export default useLike
