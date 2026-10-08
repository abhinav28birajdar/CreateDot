"use client"

import { useEffect, useRef } from "react"
import { supabase } from "@/lib/supabase"
import type { RealtimeChannel } from "@supabase/supabase-js"

export type RealtimeEvent = "INSERT" | "UPDATE" | "DELETE" | "*"

export interface RealtimeSubscriptionOptions {
  table: string
  schema?: string
  filter?: string
  event?: RealtimeEvent
  onInsert?: (payload: any) => void
  onUpdate?: (payload: any) => void
  onDelete?: (payload: any) => void
  onChange?: (payload: any) => void
}

/**
 * Universal hook for Supabase Postgres Changes with guaranteed unmount cleanup
 */
export function useRealtimeSubscription({
  table,
  schema = "public",
  filter,
  event = "*",
  onInsert,
  onUpdate,
  onDelete,
  onChange,
}: RealtimeSubscriptionOptions) {
  const channelRef = useRef<RealtimeChannel | null>(null)
  const handlersRef = useRef({ onInsert, onUpdate, onDelete, onChange })

  useEffect(() => {
    handlersRef.current = { onInsert, onUpdate, onDelete, onChange }
  }, [onInsert, onUpdate, onDelete, onChange])

  useEffect(() => {
    const channelName = `realtime-${table}-${filter || "all"}-${Date.now()}`

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: event as any,
          schema,
          table,
          ...(filter ? { filter } : {}),
        },
        (payload) => {
          handlersRef.current.onChange?.(payload)
          if (payload.eventType === "INSERT") {
            handlersRef.current.onInsert?.(payload.new)
          } else if (payload.eventType === "UPDATE") {
            handlersRef.current.onUpdate?.(payload.new)
          } else if (payload.eventType === "DELETE") {
            handlersRef.current.onDelete?.(payload.old)
          }
        }
      )
      .subscribe()

    channelRef.current = channel

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [table, schema, filter, event])
}

export default useRealtimeSubscription
