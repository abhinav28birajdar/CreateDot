"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  FaUserSlash,
  FaCheck,
  FaArrowRight,
  FaArrowLeft
} from "react-icons/fa6"

export default function AccountDeactivatedPage() {
  const router = useRouter()
  const [reactivated, setReactivated] = useState(false)

  const handleReactivate = () => {
    setReactivated(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white selection:bg-[#ff4b6e]/30 selection:text-white">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-2xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-slate-400 text-2xl mb-4">
          <FaUserSlash />
        </div>

        <h1 className="text-xl font-extrabold text-white">Your Account is Deactivated</h1>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          Your profile, active gigs, and public projects are currently hidden from the CreateDOT marketplace. You have 30 days to reactivate before permanent data deletion.
        </p>

        {reactivated ? (
          <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-400 text-xs">
            <FaCheck className="mx-auto text-xl mb-1" />
            <span className="font-bold text-white">Account Reactivated!</span>
            <p className="mt-1 text-emerald-300">Taking you back to your workspace...</p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <button
              onClick={handleReactivate}
              className="w-full rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 py-3 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110"
            >
              Reactivate My Account
            </button>

            <Link
              href="/"
              className="block w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs text-slate-400 hover:text-white hover:bg-white/10"
            >
              Return to Homepage
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
