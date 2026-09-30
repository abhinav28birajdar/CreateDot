"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaCookieBite,
  FaShieldHalved,
  FaCheck,
  FaArrowLeft
} from "react-icons/fa6"

export default function CookiePolicyPage() {
  const [preferences, setPreferences] = useState({
    essential: true, // cannot be disabled
    analytics: true,
    marketing: false,
    functional: true
  })
  const [saved, setSaved] = useState(false)

  const toggle = (key: keyof typeof preferences) => {
    if (key === "essential") return
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Banner */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-4 transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-400 mb-2">
            <FaCookieBite className="text-pink-400" />
            <span>Privacy & Compliance</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl text-white">Cookie Policy & Consent Manager</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Last Updated: September 2026. Manage how CreateDOT uses cookies to provide secure authentication and optimal experience.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8 space-y-8">
        {/* Preference Center Card */}
        <div className="rounded-3xl border border-white/15 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">Cookie Preference Center</h2>
              <p className="text-xs text-slate-400">Customise your telemetry and privacy settings below.</p>
            </div>
            <button
              onClick={handleSave}
              className="rounded-xl bg-[#ff4b6e] px-4 py-2 text-xs font-bold text-white shadow-md shadow-pink-500/20 hover:brightness-110"
            >
              {saved ? "Preferences Saved!" : "Save Preferences"}
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                id: "essential",
                title: "Strictly Necessary Cookies",
                desc: "Required for basic site security, authentication session tokens, and escrow checkout processing. Cannot be disabled.",
                enabled: preferences.essential,
                locked: true
              },
              {
                id: "functional",
                title: "Functional & Studio Personalization",
                desc: "Remembers your dark/light theme, UI canvas zoom level, active role (creator vs client), and sidebar state.",
                enabled: preferences.functional,
                locked: false
              },
              {
                id: "analytics",
                title: "Performance & Analytics Cookies",
                desc: "Anonymous aggregate telemetry helping our engineering team detect runtime crashes and improve page speed.",
                enabled: preferences.analytics,
                locked: false
              },
              {
                id: "marketing",
                title: "Targeted Marketing & Promotions",
                desc: "Used to show relevant creator fellowship grants, gig promotions, and marketplace discounts.",
                enabled: preferences.marketing,
                locked: false
              }
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between rounded-2xl border border-white/5 bg-white/5 p-4"
              >
                <div className="pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{item.title}</span>
                    {item.locked && (
                      <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400">
                        Always Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>

                <button
                  type="button"
                  disabled={item.locked}
                  onClick={() => toggle(item.id as any)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    item.enabled ? "bg-[#ff4b6e]" : "bg-slate-700"
                  } ${item.locked ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      item.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl text-xs text-slate-300 leading-relaxed space-y-4">
          <h3 className="text-sm font-bold text-white">How CreateDOT Uses Cookies</h3>
          <p>
            Cookies are small text fragments stored on your device when you browse websites. At CreateDOT, we use cookies primarily to keep you securely signed in to your creator studio or client workspace, protect active payment escrow sessions, and provide seamless UI state across browser refreshes.
          </p>
          <p>
            For questions regarding our data practices or to request complete data erasure under GDPR / CCPA, please contact our Data Protection Officer at <span className="text-pink-400 font-semibold">privacy@createdot.io</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
