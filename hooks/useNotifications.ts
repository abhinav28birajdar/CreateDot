"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { useRealtimeSubscription } from "./useRealtime"
import { toast } from "sonner"
import type { Database } from "@/types/database"

export type Notification = Database["public"]["Tables"]["notifications"]["Row"] & {
  actor?: Database["public"]["Tables"]["profiles"]["Row"] | null
}

export function useNotifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([])
      setUnreadCount(0)
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase
        .from("notifications")
        .select(`
          *,
          actor:actor_id (id, username, full_name, avatar_url)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(40)

      if (error) throw error

      const items = (data as any) || []
      setNotifications(items)
      setUnreadCount(items.filter((n: Notification) => !n.is_read).length)
    } catch (err: any) {
      console.warn("Error loading notifications:", err)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  // Live real-time subscription for notifications targeting current user
  useRealtimeSubscription({
    table: "notifications",
    filter: user ? `user_id=eq.${user.id}` : undefined,
    onInsert: async (newRecord) => {
      let actorProfile = null
      if (newRecord.actor_id) {
        const { data: act } = await supabase
          .from("profiles")
          .select("id, username, full_name, avatar_url")
          .eq("id", newRecord.actor_id)
          .single()
        actorProfile = act
      }

      const fullNotif: Notification = {
        ...newRecord,
        actor: actorProfile,
      }

      setNotifications((prev) => [fullNotif, ...prev])
      setUnreadCount((c) => c + 1)
      toast.info(fullNotif.title, { description: fullNotif.message })
    },
    onUpdate: (updatedRecord) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === updatedRecord.id ? { ...n, ...updatedRecord } : n))
      )
      setUnreadCount((prev) =>
        updatedRecord.is_read ? Math.max(0, prev - 1) : prev
      )
    },
    onDelete: (deletedRecord) => {
      setNotifications((prev) => prev.filter((n) => n.id !== deletedRecord.id))
    },
  })

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq("id", id)

      if (error) throw error

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      )
      setUnreadCount((c) => Math.max(0, c - 1))
    } catch (err) {
      console.warn("Failed to mark notification read:", err)
    }
  }

  const markAllAsRead = async () => {
    if (!user) return
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq("user_id", user.id)
        .eq("is_read", false)

      if (error) throw error

      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
      setUnreadCount(0)
      toast.success("All notifications marked as read")
    } catch (err) {
      console.warn("Failed to mark all read:", err)
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", id)

      if (error) throw error

      setNotifications((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
      console.warn("Failed to delete notification:", err)
    }
  }

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetch: fetchNotifications,
  }
}

export default useNotifications
