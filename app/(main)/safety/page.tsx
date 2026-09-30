"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaShieldHalved,
  FaTriangleExclamation,
  FaFileContract,
  FaBan,
  FaScaleBalanced,
  FaCheck,
  FaArrowRight,
  FaLock
} from "react-icons/fa6"

export default function SafetyAndTrustCenterPage() {
  const [activeSection, setActiveSection] = useState<"report" | "dmca" | "appeal" | "blocked">("report")
  const [reportType, setReportType] = useState("project")
  const [reportTarget, setReportTarget] = useState("")
  const [reportReason, setReportReason] = useState("Copyright infringement or stolen artwork")
  const [reportDetails, setReportDetails] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setReportTarget("")
      setReportDetails("")
      alert("Report received by CreateDOT Trust & Safety. Case ticket generated.")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Banner */}
      <div className="border-b border-white/10 bg-gradient-to-b from-rose-950/40 via-slate-950 to-slate-950 px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1 text-xs font-semibold text-rose-400">
            <FaShieldHalved />
            <span>CreateDOT Trust & Safety Standards</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
            Safety & Moderation <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">Center</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Report policy violations, submit DMCA copyright takedowns, file formal appeals, and manage blocked users.
          </p>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              { id: "report", label: "File a Report" },
              { id: "dmca", label: "DMCA & Copyright" },
              { id: "appeal", label: "Appeals Center" },
              { id: "blocked", label: "Blocked Accounts" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeSection === tab.id
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

      <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* SECTION 1: File a Report */}
        {activeSection === "report" && (
          <div className="rounded-3xl border border-white/15 bg-slate-900/80 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <FaTriangleExclamation />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Submit Violation Report</h2>
                <p className="text-xs text-slate-400">Confidential report reviewed by our 24/7 moderation team.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">What are you reporting?</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-800 p-3 text-xs text-white focus:outline-none"
                  >
                    <option value="project">Project / Portfolio Item</option>
                    <option value="gig">Marketplace Gig</option>
                    <option value="user">User / Freelancer Profile</option>
                    <option value="post">Community Post / Comment</option>
                    <option value="message">Direct Message Harassment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target URL or Handle</label>
                  <input
                    type="text"
                    required
                    value={reportTarget}
                    onChange={(e) => setReportTarget(e.target.value)}
                    placeholder="e.g. /projects/proj-123 or @username"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ff4b6e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Violation Reason</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-800 p-3 text-xs text-white focus:outline-none"
                >
                  <option>Copyright infringement or stolen artwork</option>
                  <option>Scam, misleading deliverables, or non-delivery</option>
                  <option>Harassment, abusive language, or hate speech</option>
                  <option>Spam, duplicate accounts, or bot activity</option>
                  <option>Attempting to transact outside CreateDOT Escrow</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Additional Evidence & Context</label>
                <textarea
                  rows={4}
                  required
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Provide timestamps, links to original source files, or description of the incident..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ff4b6e]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full rounded-xl bg-gradient-to-r from-rose-600 to-[#ff4b6e] py-3 text-xs font-bold text-white shadow-lg shadow-rose-500/20 hover:brightness-110 disabled:opacity-50"
              >
                {isSubmitted ? "Generating Safety Ticket..." : "Submit Incident Report"}
              </button>
            </form>
          </div>
        )}

        {/* SECTION 2: DMCA */}
        {activeSection === "dmca" && (
          <div className="rounded-3xl border border-white/15 bg-slate-900/80 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="flex items-center gap-3 mb-2">
              <FaFileContract className="text-xl text-pink-400" />
              <h2 className="text-base font-bold text-white">DMCA Copyright Infringement Notice</h2>
            </div>
            <p>
              CreateDOT respects the intellectual property rights of all creative professionals. If you believe your copyrighted work has been reproduced or shared without authorization, please submit a designated notice pursuant to the Digital Millennium Copyright Act (17 U.S.C. § 512).
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
              <p className="font-bold text-white">Required Elements of your DMCA Notice:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>Identification of the copyrighted work claimed to be infringed.</li>
                <li>Direct URL of the infringing material on CreateDOT.</li>
                <li>Your full legal name, physical address, and contact email.</li>
                <li>A statement made under penalty of perjury that the information is accurate.</li>
              </ul>
            </div>
            <p className="pt-2">
              Send your signed legal notice directly to: <span className="font-mono text-pink-400">dmca@createdot.io</span>
            </p>
          </div>
        )}

        {/* SECTION 3: Appeals */}
        {activeSection === "appeal" && (
          <div className="rounded-3xl border border-white/15 bg-slate-900/80 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <FaScaleBalanced className="text-xl text-amber-400" />
              <h2 className="text-base font-bold text-white">Dispute & Account Appeals Center</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              If your content was removed, or if your account experienced a security hold or gig de-listing that you believe was made in error, submit an appeal below.
            </p>

            <div className="space-y-3 pt-2">
              <Link
                href="/account-suspended"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-pink-500/50 transition-all"
              >
                <div>
                  <h3 className="text-xs font-bold text-white">Account Suspension Appeal</h3>
                  <p className="text-[11px] text-slate-400">Submit a formal request to restore your account privileges.</p>
                </div>
                <FaArrowRight className="text-pink-400 text-xs" />
              </Link>

              <Link
                href="/orders"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-pink-500/50 transition-all"
              >
                <div>
                  <h3 className="text-xs font-bold text-white">Order Escrow Dispute Resolution</h3>
                  <p className="text-[11px] text-slate-400">Resolve milestone disputes between buyer and seller.</p>
                </div>
                <FaArrowRight className="text-pink-400 text-xs" />
              </Link>
            </div>
          </div>
        )}

        {/* SECTION 4: Blocked Accounts */}
        {activeSection === "blocked" && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-base font-bold text-white mb-4">Blocked Accounts (0)</h2>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-8 text-center text-xs text-slate-400">
              <FaBan className="mx-auto text-2xl mb-2 text-slate-500" />
              <p>You have not blocked any users. Blocked users cannot send direct messages or view private boards.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
