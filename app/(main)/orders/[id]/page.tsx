"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  FaClock,
  FaCheck,
  FaArrowLeft,
  FaFileLines,
  FaCloudArrowUp,
  FaDownload,
  FaMessage,
  FaShieldHalved,
  FaCircleCheck,
  FaArrowsRotate,
  FaPaperPlane,
  FaTriangleExclamation,
  FaFileInvoiceDollar
} from "react-icons/fa6"

export default function OrderWorkspacePage() {
  const params = useParams()
  const orderId = (params?.id as string) || "ORD-8921"

  const [activeTab, setActiveTab] = useState<"workspace" | "delivery" | "messages" | "requirements">("workspace")
  const [deliveryStatus, setDeliveryStatus] = useState<"in_progress" | "delivered" | "approved">("delivered")
  const [messages, setMessages] = useState([
    {
      sender: "Abhinav Birajdar",
      avatar: "/images/profile-image-4.png",
      text: "Hello! I have begun mapping the component architecture and auto-layout tokens for the primary screen flows.",
      time: "2 days ago"
    },
    {
      sender: "Client (Stripe Studio)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      text: "Awesome, please ensure the dark mode contrast adheres to WCAG AAA standards for the analytics graphs.",
      time: "1 day ago"
    },
    {
      sender: "Abhinav Birajdar",
      avatar: "/images/profile-image-4.png",
      text: "Initial delivery packaged! Check the Delivery tab for the Figma link, React tokens, and high-res prototype video.",
      time: "4 hours ago"
    }
  ])
  const [messageInput, setMessageInput] = useState("")

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        {
          sender: "Client (You)",
          avatar: "/images/profile-image-4.png",
          text: messageInput.trim(),
          time: "Just now"
        }
      ])
      setMessageInput("")
    }
  }

  const handleApprove = () => {
    setDeliveryStatus("approved")
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Bar */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/orders"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white"
            >
              <FaArrowLeft className="text-xs" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white">Order Workspace #{orderId}</h1>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  Escrow Secured
                </span>
              </div>
              <p className="text-xs text-slate-400">Ultra-Modern SaaS UI/UX Design System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Invoice downloaded as PDF")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10"
            >
              <FaFileInvoiceDollar className="text-pink-400" />
              <span>Download Invoice</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main workspace column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Delivery Alert Banner */}
            {deliveryStatus === "delivered" && (
              <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 backdrop-blur-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FaArrowsRotate className="text-amber-400 text-lg animate-spin" />
                    <div>
                      <h3 className="text-sm font-bold text-white">Work Delivered by Abhinav Birajdar</h3>
                      <p className="text-xs text-slate-300">
                        Please review the deliverables below. You have 3 days to request revisions or release payment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleApprove}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/30"
                    >
                      <FaCheck />
                      <span>Approve & Release Funds</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {deliveryStatus === "approved" && (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 backdrop-blur-md text-emerald-300 flex items-center gap-3">
                <FaCircleCheck className="text-xl shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">Order Completed & Funds Released!</h3>
                  <p className="text-xs text-emerald-400/80">
                    Escrow payment of $1,250 has been settled. Thank you for building with CreateDOT!
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 gap-6 text-xs font-semibold">
              {[
                { id: "workspace", label: "Workspace & Files" },
                { id: "delivery", label: "Delivery Files" },
                { id: "messages", label: "Order Chat" },
                { id: "requirements", label: "Brief & Requirements" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-[#ff4b6e] text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB: Workspace & Files */}
            {activeTab === "workspace" && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
                  <h3 className="text-sm font-bold text-white mb-3">Project Assets & Working Files</h3>
                  <div className="space-y-3">
                    {[
                      { name: "CreateDOT_DesignSystem_Tokens.json", size: "320 KB", date: "Sep 28, 2026" },
                      { name: "Figma_Component_Architecture_v1.fig", size: "48.2 MB", date: "Sep 29, 2026" },
                      { name: "Brand_Color_Guidelines_WCAG.pdf", size: "2.4 MB", date: "Sep 27, 2026" }
                    ].map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3.5 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <FaFileLines className="text-pink-400 text-base" />
                          <div>
                            <p className="font-semibold text-white">{file.name}</p>
                            <p className="text-[11px] text-slate-500">{file.size} • {file.date}</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/15">
                          <FaDownload className="text-[10px]" />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Delivery Files */}
            {activeTab === "delivery" && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
                <h3 className="text-sm font-bold text-white">Final Milestone Deliverables</h3>
                <p className="text-xs text-slate-300">
                  Deliverable pack submitted by <strong>Abhinav Birajdar</strong>:
                </p>

                <div className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-4 space-y-2 text-xs">
                  <p className="font-semibold text-pink-300">Creator's Note:</p>
                  <p className="text-slate-300 leading-relaxed">
                    "All 15 responsive frames have been finalized in Figma with dynamic variables for light and dark modes. React TSX token exports are packaged below along with interactive prototype specs."
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs">
                    <FaFileLines className="text-emerald-400 text-lg" />
                    <div>
                      <p className="font-bold text-white">CreateDOT_Enterprise_FullPack_Final.zip</p>
                      <p className="text-[11px] text-slate-400">142 MB • Complete Figma .fig + React TSX + SVG Assets</p>
                    </div>
                  </div>
                  <button className="rounded-xl bg-[#ff4b6e] px-4 py-2 text-xs font-bold text-white hover:brightness-110">
                    Download Final ZIP
                  </button>
                </div>
              </div>
            )}

            {/* TAB: Messages */}
            {activeTab === "messages" && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
                <h3 className="text-sm font-bold text-white">Direct Order Chat</h3>
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                  {messages.map((msg, i) => (
                    <div key={i} className="flex gap-3 text-xs">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden shrink-0 border border-white/15">
                        <Image src={msg.avatar} alt="Sender" fill sizes="32px" className="object-cover" />
                      </div>
                      <div className="flex-1 rounded-xl border border-white/5 bg-white/5 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white">{msg.sender}</span>
                          <span className="text-[10px] text-slate-500">{msg.time}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 border-t border-white/10">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message to the creator..."
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="rounded-xl bg-[#ff4b6e] px-4 py-2 text-xs font-bold text-white hover:brightness-110"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            )}

            {/* TAB: Requirements */}
            {activeTab === "requirements" && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md space-y-3 text-xs">
                <h3 className="text-sm font-bold text-white">Client Requirements Submission</h3>
                <div className="space-y-3 pt-2">
                  <div>
                    <span className="font-bold text-pink-400">1. Product Description:</span>
                    <p className="text-slate-300 mt-1">Next-generation autonomous AI banking & liquidity router dashboard.</p>
                  </div>
                  <div>
                    <span className="font-bold text-pink-400">2. Brand Guidelines:</span>
                    <p className="text-slate-300 mt-1">Dark slate theme, neon magenta (#ff4b6e) accents, Inter + JetBrains Mono typography.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar: Order Summary & Escrow */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-white/15 bg-slate-900/90 p-6 backdrop-blur-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                Order Information
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Order ID:</span>
                  <span className="font-mono font-bold text-white">#{orderId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Package:</span>
                  <span className="font-semibold text-white">Enterprise Studio (Premium)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Creator:</span>
                  <span className="font-semibold text-white">Abhinav Birajdar</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Timeline:</span>
                  <span className="font-semibold text-white">8 Business Days</span>
                </div>
                <div className="flex justify-between py-2 border-t border-white/10 text-sm">
                  <span className="font-bold text-white">Total Escrow:</span>
                  <span className="font-extrabold text-pink-400">$1,250.00</span>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-[11px] text-emerald-400">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <FaShieldHalved />
                  <span>Escrow Guarantee</span>
                </div>
                Funds are protected in CreateDOT Smart Escrow. Funds are released only upon your explicit approval.
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <Link
                  href="/contact?subject=DisputeResolution"
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Need help? Contact Dispute Resolution
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
