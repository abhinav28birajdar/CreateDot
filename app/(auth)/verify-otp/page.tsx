"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  FaKey,
  FaShieldHalved,
  FaCheck,
  FaArrowLeft
} from "react-icons/fa6"

export default function VerifyOtpPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(45)

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0] ?? ""
    const updated = [...otp]
    updated[index] = val
    setOtp(updated)

    if (val && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus()
    }
  }

  const handleVerify = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setVerified(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 1200)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white selection:bg-[#ff4b6e]/30 selection:text-white">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-2xl">
        <div className="text-center mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 text-xl mb-3">
            <FaKey />
          </div>
          <h1 className="text-xl font-extrabold text-white">One-Time Password (OTP)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Please enter the 6-digit authentication token sent to your registered contact channel.
          </p>
        </div>

        {verified ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center text-emerald-400">
            <FaCheck className="mx-auto text-2xl mb-2" />
            <h3 className="font-bold text-white">Authentication Successful!</h3>
            <p className="text-xs text-emerald-300 mt-1">Logging you in securely...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-input-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="h-12 w-10 text-center rounded-xl border border-white/15 bg-white/5 text-lg font-bold text-white focus:border-[#ff4b6e] focus:outline-none"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying || otp.join("").length < 6}
              className="w-full rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110 disabled:opacity-50"
            >
              {isVerifying ? "Verifying Code..." : "Verify Token"}
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <button
                type="button"
                onClick={() => alert("New code sent to your registered phone & email.")}
                className="hover:text-pink-400"
              >
                Resend Code
              </button>
              <Link href="/login" className="hover:text-white">
                Back to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
