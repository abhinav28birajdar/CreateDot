"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { user, session } = useAuth()
  const loading = session?.isLoading ?? false
  const router = useRouter()

  const hasDemo = typeof window !== 'undefined' && (
    localStorage.getItem("createdot_demo_user") ||
    document.cookie.includes("createdot_demo_user=true")
  )
  const isAuthenticated = Boolean(user || hasDemo)

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        router.push("/login")
      } else if (!requireAuth && isAuthenticated) {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, loading, requireAuth, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#8B5DFF]" />
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (!requireAuth && isAuthenticated) {
    return null
  }

  return <>{children}</>
}
