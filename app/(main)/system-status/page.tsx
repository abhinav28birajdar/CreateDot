"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaServer,
  FaCircleCheck,
  FaShieldHalved,
  FaLock,
  FaTriangleExclamation,
  FaArrowLeft,
  FaWifi,
  FaClock,
  FaArrowRotateRight
} from "react-icons/fa6"

export default function SystemStatusPage() {
  const [testError, setTestError] = useState<"none" | "403" | "401" | "offline">("none")

  const services = [
    { name: "CreateDOT Web API Gateway", status: "Operational", uptime: "99.99%", latency: "24ms" },
    { name: "Smart Escrow Smart Contract Rail", status: "Operational", uptime: "100.00%", latency: "110ms" },
    { name: "Critique Copilot AI Inference Engine", status: "Operational", uptime: "99.95%", latency: "420ms" },
    { name: "Asset CDN & Image Transformers", status: "Operational", uptime: "99.98%", latency: "18ms" },
    { name: "Realtime WebSocket Message Bus", status: "Operational", uptime: "99.97%", latency: "32ms" },
    { name: "Stripe & Crypto Payment Webhooks", status: "Operational", uptime: "100.00%", latency: "85ms" }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Banner */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-4 transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
                <FaCircleCheck className="text-emerald-400" />
                <span>All CreateDOT Systems Fully Operational</span>
              </div>
              <h1 className="text-2xl font-extrabold sm:text-4xl text-white">System Status & Network Health</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real-time uptime metrics, incident response history, and diagnostic resolution tools.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FaClock className="text-slate-500" />
              <span>Updated just now</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8 space-y-8">
        {/* Service Matrix */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
          <h2 className="text-base font-bold text-white mb-6">Service Health Matrix</h2>
          <div className="divide-y divide-white/5">
            {services.map((svc, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white">{svc.name}</span>
                </div>
                <div className="flex items-center gap-6 text-slate-400">
                  <span className="hidden sm:inline">Latency: <strong className="text-slate-200">{svc.latency}</strong></span>
                  <span className="hidden sm:inline">Uptime: <strong className="text-emerald-400">{svc.uptime}</strong></span>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                    {svc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Error Simulation Sandbox */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
          <h2 className="text-base font-bold text-white mb-2">System Error & Security Code Handlers</h2>
          <p className="text-xs text-slate-400 mb-6">
            Test how CreateDOT gracefully handles edge cases such as 403 Forbidden, 401 Unauthorized, and Offline mode:
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setTestError("none")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${testError === "none" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"}`}
            >
              Normal View
            </button>
            <button
              onClick={() => setTestError("403")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${testError === "403" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-white"}`}
            >
              403 Forbidden
            </button>
            <button
              onClick={() => setTestError("401")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${testError === "401" ? "bg-amber-500 text-white" : "text-slate-400 hover:text-white"}`}
            >
              401 Unauthorized
            </button>
            <button
              onClick={() => setTestError("offline")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${testError === "offline" ? "bg-purple-500 text-white" : "text-slate-400 hover:text-white"}`}
            >
              Offline State
            </button>
          </div>

          {/* Render Active Simulation */}
          {testError === "403" && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center space-y-3">
              <FaLock className="mx-auto text-3xl text-rose-400" />
              <h3 className="text-base font-bold text-white">403 — Access Forbidden</h3>
              <p className="text-xs text-rose-200/80 max-w-md mx-auto">
                You do not have the necessary permissions to access this studio resource or workspace. Please verify your role or request an invitation from the project owner.
              </p>
              <Link href="/dashboard" className="inline-block rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white">
                Return to Dashboard
              </Link>
            </div>
          )}

          {testError === "401" && (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-center space-y-3">
              <FaTriangleExclamation className="mx-auto text-3xl text-amber-400" />
              <h3 className="text-base font-bold text-white">401 — Session Expired / Unauthorized</h3>
              <p className="text-xs text-amber-200/80 max-w-md mx-auto">
                Your authentication session has expired. Please re-authenticate using your password or two-factor recovery code to continue.
              </p>
              <Link href="/login" className="inline-block rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black">
                Re-Authenticate Now
              </Link>
            </div>
          )}

          {testError === "offline" && (
            <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6 text-center space-y-3">
              <FaWifi className="mx-auto text-3xl text-purple-400" />
              <h3 className="text-base font-bold text-white">Offline Mode Activated</h3>
              <p className="text-xs text-purple-200/80 max-w-md mx-auto">
                Local changes are being saved to your browser cache. When your internet reconnects, all design tokens and comments will sync automatically.
              </p>
            </div>
          )}

          {testError === "none" && (
            <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-center text-xs text-slate-400">
              Click any of the error states above to test interactive system fallback responses.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
