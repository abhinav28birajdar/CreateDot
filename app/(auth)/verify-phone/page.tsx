"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  FaMobileScreen,
  FaShieldHalved,
  FaArrowRight,
  FaArrowLeft,
  FaCheck
} from "react-icons/fa6"

export default function VerifyPhonePage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("+91 98765 43210")
  const [codeSent, setCodeSent] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)
  const [verified, setVerified] = useState(false)

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault()
    setCodeSent(true)
  }

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0] ?? ""
    const updated = [...otp]
    updated[index] = val
    setOtp(updated)

    // auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleVerify = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setVerified(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white selection:bg-[#ff4b6e]/30 selection:text-white">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="text-center mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 text-xl mb-3">
            <FaMobileScreen />
          </div>
          <h1 className="text-xl font-extrabold text-white">Phone Verification</h1>
          <p className="text-xs text-slate-400 mt-1">
            Secure your CreateDOT creator wallet and enable two-factor authentication.
          </p>
        </div>

        {verified ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center text-emerald-400">
            <FaCheck className="mx-auto text-2xl mb-2" />
            <h3 className="font-bold text-white">Phone Verified!</h3>
            <p className="text-xs text-emerald-300 mt-1">Redirecting you to your dashboard...</p>
          </div>
        ) : !codeSent ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Phone Number</label>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ff4b6e]"
              />
              <p className="text-[11px] text-slate-500 mt-1">We will send a 6-digit verification code via SMS.</p>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 py-3 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110"
            >
              Send SMS Code
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <p className="text-center text-xs text-slate-300">
              Enter the 6-digit code sent to <strong className="text-white">{phoneNumber}</strong>:
            </p>

            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
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
              className="w-full rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 py-3 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110 disabled:opacity-50"
            >
              {isVerifying ? "Verifying..." : "Verify & Continue"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setCodeSent(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Change phone number
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <Link href="/dashboard" className="text-xs text-slate-500 hover:text-slate-300">
            Skip for now
          </Link>
        </div>
      </div>
    </div>
  )
}
