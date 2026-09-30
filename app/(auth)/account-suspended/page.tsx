"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  FaTriangleExclamation,
  FaShieldHalved,
  FaMessage,
  FaCheck,
  FaArrowLeft
} from "react-icons/fa6"

export default function AccountSuspendedPage() {
  const [appealSent, setAppealSent] = useState(false)
  const [appealText, setAppealText] = useState("")

  const handleAppeal = (e: React.FormEvent) => {
    e.preventDefault()
    setAppealSent(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white selection:bg-[#ff4b6e]/30 selection:text-white">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-rose-500/30 bg-slate-900/90 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl">
        <div className="text-center mb-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 text-2xl mb-3">
            <FaTriangleExclamation />
          </div>
          <h1 className="text-xl font-extrabold text-white">Account Temporarily Suspended</h1>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Your account has been temporarily restricted due to a security review or policy flag regarding recent gig deliverables.
          </p>
        </div>

        {appealSent ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center text-emerald-400">
            <FaCheck className="mx-auto text-2xl mb-2" />
            <h3 className="font-bold text-white">Appeal Submitted</h3>
            <p className="text-xs text-emerald-300 mt-1">
              Our Trust & Safety Council has received your request. A review decision will be sent within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleAppeal} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Submit an Appeal to Trust & Safety
              </label>
              <textarea
                rows={4}
                required
                value={appealText}
                onChange={(e) => setAppealText(e.target.value)}
                placeholder="Explain the context or reason why your account status should be restored..."
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ff4b6e]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 py-3 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110"
            >
              Submit Appeal Request
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <Link href="/help" className="hover:text-white">
            Help Center
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact Support
          </Link>
          <Link href="/terms" className="hover:text-white">
            Community Guidelines
          </Link>
        </div>
      </div>
    </div>
  )
}
