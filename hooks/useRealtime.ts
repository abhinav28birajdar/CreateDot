"use client";

import { useEffect, useCallback, useRef } from "react";
import { createSupabaseClient } from "@/lib/supabase";

type RealtimeCallback = (payload: any) => void;
type TableName = 
  | "projects" 
  | "comments" 
  | "likes" 
  | "followers" 
  | "messages" 
  | "conversations" 
  | "notifications" 
  | "jobs" 
  | "job_applications" 
  | "collections" 
  | "collection_items" 
  | "reviews" 
  | "saved_items" 
  | "users";

interface RealtimeSubscription {
  table: TableName;
  events?: ("INSERT" | "UPDATE" | "DELETE")[];
  filter?: string;
  callback: RealtimeCallback;
}

/**
 * Hook to manage Supabase real-time subscriptions
 * Handles automatic cleanup on unmount
 * 
 * Usage:
 * useRealtime({
 *   table: "projects",
 *   events: ["INSERT", "UPDATE"],
 *   filter: `user_id=eq.${userId}`,
 *   callback: (payload) => {
 *     console.log("Project updated:", payload.new);
 *   }
 * });
 */
export function useRealtime(subscription: RealtimeSubscription) {
  const supabaseRef = useRef(createSupabaseClient());
  const channelRef = useRef<any>(null);

  useEffect(() => {
    const supabase = supabaseRef.current;
    
    // Create unique channel name
    const channelName = `${subscription.table}-${subscription.filter || "all"}`;

    // Set up subscription
    const channel = supabase
      .channel(channelName, {
        config: {
          broadcast: { self: true },
        },
      })
      .on(
        "postgres_changes",
        {
          event: "*" as any,
          schema: "public",
          table: subscription.table,
          filter: subscription.filter,
        },
        subscription.callback
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log(`[Realtime] Subscribed to ${subscription.table}`);
        } else if (status === "CLOSED") {
          console.log(`[Realtime] Subscription to ${subscription.table} closed`);
        }
      });

    channelRef.current = channel;

    // Cleanup on unmount
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [subscription.table, subscription.filter, subscription.callback]);
}

/**
 * Hook to manage multiple real-time subscriptions
 * Usage:
 * useMultiRealtime([
 *   {
 *     table: "projects",
 *     callback: onProjectChange
 *   },
 *   {
 *     table: "notifications",
 *     filter: `user_id=eq.${userId}`,
 *     callback: onNotificationChange
 *   }
 * ]);
 */
export function useMultiRealtime(subscriptions: RealtimeSubscription[]) {
  subscriptions.forEach((sub) => {
    useRealtime(sub);
  });
}

/**
 * Hook for real-time project updates
 */
export function useProjectRealtime(projectId: string, callback: RealtimeCallback) {
  useRealtime({
    table: "projects",
    filter: `id=eq.${projectId}`,
    callback,
  });
}

/**
 * Hook for real-time notification updates
 */
export function useNotificationRealtime(userId: string, callback: RealtimeCallback) {
  useRealtime({
    table: "notifications",
    filter: `user_id=eq.${userId}`,
    callback,
  });
}

/**
 * Hook for real-time message updates
 */
export function useMessageRealtime(conversationId: string, callback: RealtimeCallback) {
  useRealtime({
    table: "messages",
    events: ["INSERT"],
    callback,
  });
}

/**
 * Hook for real-time comment updates on a project
 */
export function useCommentRealtime(projectId: string, callback: RealtimeCallback) {
  useRealtime({
    table: "comments",
    filter: `project_id=eq.${projectId}`,
    callback,
  });
}

/**
 * Hook for real-time like updates on a project
 */
export function useLikeRealtime(projectId: string, callback: RealtimeCallback) {
  useRealtime({
    table: "likes",
    filter: `project_id=eq.${projectId}`,
    callback,
  });
}

export default useRealtime;

