"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { FaArrowRightFromBracket, FaCircleNotch } from "react-icons/fa6"

export default function LogoutPage() {
  const router = useRouter()
  const { signOut } = useAuth()

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut()
      } catch (err) {
        console.error("Logout error", err)
      } finally {
        setTimeout(() => {
          router.push("/login")
        }, 800)
      }
    }
    performLogout()
  }, [signOut, router])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-white">
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center max-w-sm w-full backdrop-blur-xl shadow-2xl space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 text-2xl">
          <FaArrowRightFromBracket />
        </div>
        <h1 className="text-lg font-bold text-white">Signing Out of CreateDOT</h1>
        <p className="text-xs text-slate-400">Clearing active session credentials safely...</p>
        <div className="flex justify-center pt-2">
          <FaCircleNotch className="animate-spin text-pink-500 text-lg" />
        </div>
      </div>
    </div>
  )
}
