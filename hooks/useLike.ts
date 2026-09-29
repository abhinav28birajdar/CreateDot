"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export function useLike(projectId: string, initialLiked = false, initialCount = 0) {
    const [isLiked, setIsLiked] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(`createdot_liked_${projectId}`)
            if (stored !== null) return stored === 'true'
        }
        return initialLiked
    })
    const [count, setCount] = useState(initialCount)
    const [isLoading, setIsLoading] = useState(false)

    async function toggleLike(e?: React.MouseEvent) {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }

        if (isLoading) return
        setIsLoading(true)

        // Optimistic update
        const wasLiked = isLiked
        const nextLiked = !wasLiked
        setIsLiked(nextLiked)
        setCount(c => (wasLiked ? Math.max(0, c - 1) : c + 1))

        if (typeof window !== 'undefined') {
            localStorage.setItem(`createdot_liked_${projectId}`, String(nextLiked))
        }

        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                // Check if demo user is active
                const hasDemo = typeof window !== 'undefined' && Boolean(
                    localStorage.getItem("createdot_demo_user") ||
                    document.cookie.includes("createdot_demo_user=true")
                )

                if (hasDemo) {
                    toast.success(nextLiked ? 'Appreciated project! ❤️' : 'Removed appreciation')
                    return
                }

                // If not logged in and no demo, keep local like but gently inform
                toast.success(nextLiked ? 'Appreciated! Sign in to save to your public profile.' : 'Removed appreciation')
                return
            }

            // Fetch user profile id
            const { data: profile } = await supabase
                .from('users')
                .select('id')
                .eq('auth_id', user.id)
                .single()

            const userId = profile?.id

            if (!userId) {
                return
            }

            if (wasLiked) {
                await supabase
                    .from('likes')
                    .delete()
                    .match({ user_id: userId, project_id: projectId })
            } else {
                await supabase
                    .from('likes')
                    .insert({ user_id: userId, project_id: projectId })
            }
        } catch (error: any) {
            // In case of network error, do not break optimistic UI for user
            console.warn('Like sync warning:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLiked, count, toggleLike, isLoading }
}
