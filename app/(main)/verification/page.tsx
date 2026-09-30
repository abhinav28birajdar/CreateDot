"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaIdCard,
  FaShieldHalved,
  FaCheck,
  FaClock,
  FaCircleCheck,
  FaCloudArrowUp,
  FaArrowRight,
  FaBuilding,
  FaAward,
  FaMobileScreen,
  FaEnvelope
} from "react-icons/fa6"

interface VerificationTier {
  id: string
  title: string
  status: "verified" | "pending" | "not_started"
  badge: string
  description: string
  icon: any
}

export default function VerificationCenterPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "upload" | "history">("overview")
  const [docType, setDocType] = useState("passport")
  const [uploadSubmitted, setUploadSubmitted] = useState(false)

  const verificationTiers: VerificationTier[] = [
    {
      id: "email",
      title: "Email & Contact Verification",
      status: "verified",
      badge: "Verified Level 1",
      description: "Confirmed email address and two-factor authentication recovery codes.",
      icon: FaEnvelope
    },
    {
      id: "phone",
      title: "Mobile Phone Verification",
      status: "verified",
      badge: "Verified Level 1",
      description: "SMS token verification configured for wallet payouts and critical changes.",
      icon: FaMobileScreen
    },
    {
      id: "identity",
      title: "Government Identity Verification",
      status: "verified",
      badge: "ID Verified",
      description: "Passport / National ID confirmed via biometric live verification.",
      icon: FaIdCard
    },
    {
      id: "creator",
      title: "Creator Fellowship Badge",
      status: "verified",
      badge: "Top Rated Plus",
      description: "Manual portfolio review approved by CreateDOT Design Standards Council.",
      icon: FaAward
    },
    {
      id: "agency",
      title: "Agency & Business Verification",
      status: "pending",
      badge: "Review in Progress",
      description: "Company incorporation documents and tax identification verification.",
      icon: FaBuilding
    }
  ]

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUploadSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Banner */}
      <div className="border-b border-white/10 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1 text-xs font-semibold text-pink-400">
            <FaShieldHalved />
            <span>CreateDOT Trust & Identity Trustmark</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
            Verification <span className="bg-gradient-to-r from-pink-500 to-amber-300 bg-clip-text text-transparent">Center</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Enhance client trust, unlock high-limit escrow payouts, and earn the purple Verified Pro creator badge.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            {[
              { id: "overview", label: "Verification Status" },
              { id: "upload", label: "Submit Documents" },
              { id: "history", label: "Audit History" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#ff4b6e] text-white shadow-md shadow-pink-500/20"
                    : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* TAB 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {verificationTiers.map((tier) => {
                const Icon = tier.icon
                const isVerified = tier.status === "verified"
                const isPending = tier.status === "pending"
                return (
                  <div
                    key={tier.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 text-lg">
                          <Icon />
                        </div>

                        {isVerified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                            <FaCheck className="text-[9px]" /> Verified
                          </span>
                        )}
                        {isPending && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                            <FaClock className="text-[9px]" /> Under Review
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-white mb-1">{tier.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{tier.description}</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="font-semibold text-pink-400">{tier.badge}</span>
                      {isPending && (
                        <button
                          onClick={() => setActiveTab("upload")}
                          className="text-[11px] text-slate-400 hover:text-white"
                        >
                          Upload docs
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Submit Documents */}
        {activeTab === "upload" && (
          <div className="max-w-xl mx-auto rounded-3xl border border-white/15 bg-slate-900/80 p-8 backdrop-blur-2xl shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-2">Upload Verification Documents</h2>
            <p className="text-xs text-slate-400 mb-6">
              Documents are processed securely with AES-256 encryption and reviewed by compliance officers within 24 hours.
            </p>

            {uploadSubmitted ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center text-emerald-400">
                <FaCircleCheck className="mx-auto text-3xl mb-2" />
                <h3 className="font-bold text-white">Documents Received</h3>
                <p className="text-xs text-emerald-300 mt-1">
                  Your business verification submission is in review. You will receive an email update once cleared.
                </p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Document Category</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-800 p-3 text-xs text-white focus:outline-none"
                  >
                    <option value="passport">International Passport</option>
                    <option value="id">National Identity Card / Driver's License</option>
                    <option value="agency">Company Articles of Incorporation (Agency)</option>
                    <option value="tax">Tax Identification Document (W-8BEN / W-9 / GST)</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-white/20 rounded-2xl p-6 text-center bg-white/5 hover:border-[#ff4b6e] transition-colors cursor-pointer">
                  <FaCloudArrowUp className="mx-auto text-2xl text-pink-400 mb-2" />
                  <p className="text-xs font-semibold text-white">Click or drag document to upload</p>
                  <p className="text-[10px] text-slate-400 mt-1">PDF, PNG, JPG up to 10MB</p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 py-3 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110"
                >
                  Submit for Compliance Review
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: Audit History */}
        {activeTab === "history" && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-base font-bold text-white mb-4">Verification Audit Log</h2>
            <div className="space-y-3">
              {[
                { event: "Creator Pro Badge Granted", date: "Sep 28, 2026", status: "Approved", by: "Standards Council" },
                { event: "Government ID Biometric Verification", date: "Sep 25, 2026", status: "Approved", by: "Automated AI Shield" },
                { event: "SMS Two-Factor Phone Confirmation", date: "Sep 20, 2026", status: "Approved", by: "Twilio Telephony" },
                { event: "Primary Account Registration", date: "Sep 15, 2026", status: "Completed", by: "System" }
              ].map((log, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 text-xs">
                  <div>
                    <p className="font-semibold text-white">{log.event}</p>
                    <p className="text-[11px] text-slate-400">{log.date} • Verified by {log.by}</p>
                  </div>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
