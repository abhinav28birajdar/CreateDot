"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { useRealtimeSubscription } from "./useRealtime"
import { toast } from "sonner"
import type { Database } from "@/types/database"

export type Message = Database["public"]["Tables"]["messages"]["Row"] & {
  sender?: Database["public"]["Tables"]["profiles"]["Row"] | null
  recipient?: Database["public"]["Tables"]["profiles"]["Row"] | null
}

export function useMessages(activeRecipientId?: string) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)

  // Fetch recent conversation partners / creators
  const fetchContacts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, full_name, avatar_url, role, is_verified, bio")
        .limit(20)

      if (!error && data) {
        // Exclude current user from contact list
        setContacts(data.filter((c) => c.id !== user?.id))
      }
    } catch (err) {
      console.warn("Error fetching contacts:", err)
    }
  }, [user?.id])

  // Fetch conversation messages
  const fetchMessages = useCallback(async () => {
    if (!user) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    try {
      let query = supabase
        .from("messages")
        .select(`
          *,
          sender:sender_id (id, username, full_name, avatar_url),
          recipient:recipient_id (id, username, full_name, avatar_url)
        `)
        .order("created_at", { ascending: true })

      if (activeRecipientId) {
        query = query.or(
          `and(sender_id.eq.${user.id},recipient_id.eq.${activeRecipientId}),and(sender_id.eq.${activeRecipientId},recipient_id.eq.${user.id})`
        )
      } else {
        query = query.or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
      }

      const { data, error } = await query

      if (error) throw error
      setMessages((data as any) || [])
    } catch (err: any) {
      console.warn("Error loading messages:", err)
    } finally {
      setIsLoading(false)
    }
  }, [user, activeRecipientId])

  useEffect(() => {
    fetchContacts()
    fetchMessages()
  }, [fetchContacts, fetchMessages])

  // Live real-time subscription for new messages
  useRealtimeSubscription({
    table: "messages",
    onInsert: async (newRecord) => {
      // Check if message belongs to current user's session
      if (newRecord.sender_id === user?.id || newRecord.recipient_id === user?.id) {
        const { data: senderProf } = await supabase
          .from("profiles")
          .select("id, username, full_name, avatar_url")
          .eq("id", newRecord.sender_id)
          .single()

        const fullMsg: Message = {
          ...newRecord,
          sender: senderProf || null,
        }

        setMessages((prev) => {
          if (prev.some((m) => m.id === fullMsg.id)) return prev
          return [...prev, fullMsg]
        })

        if (newRecord.sender_id !== user?.id) {
          toast.info(`New message from ${senderProf?.full_name || "a creator"}: "${newRecord.content.slice(0, 30)}..."`)
        }
      }
    },
    onUpdate: (updatedRecord) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === updatedRecord.id ? { ...m, ...updatedRecord } : m))
      )
    },
  })

  // Send message
  const sendMessage = async (recipientId: string, content: string, subject = "Direct Message") => {
    if (!user) {
      toast.error("Please sign in to send messages")
      return { error: new Error("Unauthenticated") }
    }

    if (!content.trim()) return { error: new Error("Empty message") }

    setIsSending(true)

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          sender_id: user.id,
          recipient_id: recipientId,
          content: content.trim(),
          subject,
          is_read: false,
        })
        .select(`
          *,
          sender:sender_id (id, username, full_name, avatar_url),
          recipient:recipient_id (id, username, full_name, avatar_url)
        `)
        .single()

      if (error) throw error

      if (data) {
        setMessages((prev) => [...prev, data as Message])
      }

      return { error: null, data }
    } catch (err: any) {
      toast.error("Failed to send message", { description: err.message })
      return { error: err }
    } finally {
      setIsSending(false)
    }
  }

  return {
    messages,
    contacts,
    isLoading,
    isSending,
    sendMessage,
    refetch: fetchMessages,
  }
}

export default useMessages
