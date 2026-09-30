"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaBuilding,
  FaShieldHalved,
  FaLock,
  FaUsers,
  FaArrowRight,
  FaCheck,
  FaHeadset,
  FaServer
} from "react-icons/fa6"

export default function EnterprisePage() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Enterprise Hero */}
      <div className="border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1 text-xs font-bold text-pink-400">
            <FaBuilding />
            <span>CreateDOT Enterprise</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
            Scale Creative Output Across Your Entire <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">Organization</span>
          </h1>

          <p className="mx-auto max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
            Custom talent clouds, enterprise-grade SAML SSO, unified invoicing, dedicated creative directors, and custom Master Services Agreements.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <a
              href="#contact-enterprise"
              className="rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-6 py-3 font-bold text-white shadow-xl shadow-pink-500/25 hover:brightness-110"
            >
              Request Enterprise Demo
            </a>
          </div>
        </div>
      </div>

      {/* Enterprise Feature Matrix */}
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: FaLock,
              title: "SAML SSO & SCIM",
              desc: "Seamless single sign-on with Okta, Google Workspace, Azure AD, and automated directory provisioning."
            },
            {
              icon: FaShieldHalved,
              title: "SOC-2 Type II & GDPR",
              desc: "Rigorous compliance standards, end-to-end encrypted asset storage, and isolated tenant environments."
            },
            {
              icon: FaUsers,
              title: "Dedicated Talent Cloud",
              desc: "Pre-vetted guild of designers and engineers reserved exclusively for your brand's ongoing design sprints."
            },
            {
              icon: FaServer,
              title: "Custom SLA & MSA",
              desc: "Guaranteed 1-hour priority support response times, custom indemnification terms, and consolidated Net-30 billing."
            }
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 text-xl mb-4">
                  <Icon />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Contact Enterprise Form */}
      <div id="contact-enterprise" className="mx-auto max-w-xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-slate-900/80 p-8 backdrop-blur-2xl shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Talk to our Enterprise Solutions Team</h3>
            <p className="text-xs text-slate-400 mt-1">We’ll tailor a custom talent cloud proposal within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center text-emerald-400">
              <FaCheck className="mx-auto text-2xl mb-2" />
              <h4 className="font-bold text-white">Demo Request Submitted!</h4>
              <p className="text-xs text-emerald-300 mt-1">Our enterprise director will reach out to {email} shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ff4b6e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Technologies Inc."
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ff4b6e]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 py-3.5 font-bold text-white shadow-lg shadow-pink-500/25 hover:brightness-110"
              >
                Schedule Architecture Consultation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
