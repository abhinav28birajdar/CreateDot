"use client"

import { useAuth } from '@/contexts/auth-context'

export function useUser() {
  const { user, profile, isLoading, role, isAdmin } = useAuth()

  return {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    role,
    isAdmin,
  }
}

export default useUser
