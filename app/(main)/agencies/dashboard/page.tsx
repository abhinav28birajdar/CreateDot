"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  FaBuilding,
  FaUsers,
  FaBriefcase,
  FaDollarSign,
  FaPlus,
  FaShieldHalved,
  FaArrowLeft,
  FaUserPlus,
  FaEllipsis,
  FaCircleCheck,
  FaEnvelope
} from "react-icons/fa6"

interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  avatar: string
  accessLevel: "Admin" | "Designer" | "Developer" | "Finance"
}

export default function AgencyDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "team" | "projects" | "clients">("overview")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "m1",
      name: "Abhinav Birajdar",
      role: "Design Director & Founder",
      email: "abhinav@createdot.io",
      avatar: "/images/profile-image-4.png",
      accessLevel: "Admin"
    },
    {
      id: "m2",
      name: "Elena Rostova",
      role: "Lead 3D & Spline Artist",
      email: "elena@agency.design",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      accessLevel: "Designer"
    },
    {
      id: "m3",
      name: "Marcus Vance",
      role: "Principal Systems Engineer",
      email: "marcus@agency.design",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      accessLevel: "Developer"
    }
  ])
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Designer")

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (inviteEmail.trim()) {
      alert(`Invitation sent to ${inviteEmail} with role: ${inviteRole}`)
      setInviteEmail("")
      setShowInviteModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Banner */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/agencies"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-4 transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Agencies Directory</span>
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border-2 border-pink-500/40 shrink-0">
                <Image
                  src="/images/profile-image-4.png"
                  alt="Agency"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold sm:text-2xl text-white">CreateDOT Studio Guild</h1>
                  <span className="rounded bg-pink-500/10 px-2 py-0.5 text-[10px] font-bold text-pink-400 border border-pink-500/20">
                    Verified Agency
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">3 Team Seats • 8 Active Client Sprints • $48,200 YTD</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInviteModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110"
              >
                <FaUserPlus className="text-xs" />
                <span>Invite Team Member</span>
              </button>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="mt-8 flex gap-6 border-b border-white/10 text-xs font-bold">
            {[
              { id: "overview", label: "Studio Overview" },
              { id: "team", label: `Team Members (${teamMembers.length})` },
              { id: "projects", label: "Active Agency Contracts" },
              { id: "clients", label: "Client Roster" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 transition-colors ${
                  activeTab === tab.id ? "border-b-2 border-[#ff4b6e] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* TAB 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <span className="text-xs text-slate-400 font-bold uppercase">Contract Pipeline</span>
                <p className="text-2xl font-extrabold text-white mt-1">$48,200</p>
                <span className="text-[10px] text-emerald-400">+18% this month</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <span className="text-xs text-slate-400 font-bold uppercase">Active Projects</span>
                <p className="text-2xl font-extrabold text-white mt-1">8</p>
                <span className="text-[10px] text-slate-400">Across 6 enterprise clients</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <span className="text-xs text-slate-400 font-bold uppercase">Average Delivery</span>
                <p className="text-2xl font-extrabold text-white mt-1">4.2 Days</p>
                <span className="text-[10px] text-pink-400">99.4% on-time milestone rate</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <span className="text-xs text-slate-400 font-bold uppercase">Client Rating</span>
                <p className="text-2xl font-extrabold text-amber-400 mt-1">5.0 ★</p>
                <span className="text-[10px] text-slate-400">142 reviews</span>
              </div>
            </div>

            {/* Team Snapshot */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">Agency Team & Roles</h3>
                <button onClick={() => setActiveTab("team")} className="text-xs text-pink-400 hover:text-white">
                  Manage all
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 shrink-0">
                      <Image src={member.avatar} alt={member.name} fill sizes="40px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{member.name}</p>
                      <p className="text-[11px] text-slate-400">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Team Members */}
        {activeTab === "team" && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-white">Agency Team Seats</h2>
                <p className="text-xs text-slate-400">Manage member permissions, seat assignments, and payout splits.</p>
              </div>
              <button
                onClick={() => setShowInviteModal(true)}
                className="rounded-xl bg-[#ff4b6e] px-4 py-2 text-xs font-bold text-white hover:brightness-110"
              >
                + Add Seat
              </button>
            </div>

            <div className="divide-y divide-white/10">
              {teamMembers.map((member) => (
                <div key={member.id} className="py-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
                      <Image src={member.avatar} alt={member.name} fill sizes="40px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{member.name}</p>
                      <p className="text-slate-400 text-[11px]">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="rounded bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300 border border-white/10">
                      {member.accessLevel}
                    </span>
                    <button className="text-slate-500 hover:text-white">
                      <FaEllipsis />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Contracts */}
        {activeTab === "projects" && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-4">
            <h2 className="text-base font-bold text-white">Agency Retainers & Contracts</h2>
            <div className="space-y-3">
              {[
                { client: "Stripe Venture Studio", project: "QuantumPay AI Banking Flow", amount: "$12,500", status: "Active" },
                { client: "Kinetics AI", project: "Multi-Agent Canvas Terminal", amount: "$8,400", status: "In Progress" },
                { client: "Sphere Interactive", project: "Spatial Audio 3D Visualizer", amount: "$6,200", status: "Review" }
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 text-xs">
                  <div>
                    <p className="font-bold text-white">{c.project}</p>
                    <p className="text-[11px] text-slate-400">Client: {c.client}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-pink-400">{c.amount}</span>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 border border-emerald-500/20">
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Clients */}
        {activeTab === "clients" && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
            <h2 className="text-base font-bold text-white mb-4">Enterprise Client Accounts (6)</h2>
            <p className="text-xs text-slate-400">
              Clients who currently have active NDAs and recurring design retainers with your agency.
            </p>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-4">Invite Agency Member</h2>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="collaborator@company.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ff4b6e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Role / Permissions</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-800 p-3 text-xs text-white focus:outline-none"
                >
                  <option value="Designer">Designer (Can manage design files & deliver gigs)</option>
                  <option value="Developer">Developer (Can access code repos & APIs)</option>
                  <option value="Admin">Admin (Full access to agency finances & team)</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#ff4b6e] px-5 py-2 text-xs font-bold text-white hover:brightness-110"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
