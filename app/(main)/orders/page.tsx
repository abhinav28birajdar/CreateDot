"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  FaBoxArchive,
  FaClock,
  FaCheck,
  FaArrowsRotate,
  FaCircleXmark,
  FaEye,
  FaMessage,
  FaFileInvoiceDollar,
  FaShieldHalved,
  FaFilter,
  FaReceipt,
  FaArrowRight
} from "react-icons/fa6"

interface Order {
  id: string
  gigTitle: string
  freelancer: {
    name: string
    avatar: string
  }
  client: {
    name: string
    avatar: string
  }
  tier: "Basic" | "Standard" | "Premium"
  amount: number
  status: "active" | "delivered" | "completed" | "revision" | "cancelled"
  deliveryDate: string
  orderedDate: string
}

const mockOrders: Order[] = [
  {
    id: "ORD-8921",
    gigTitle: "Ultra-Modern SaaS UI/UX Design System & Interactive Prototype",
    freelancer: {
      name: "Abhinav Birajdar",
      avatar: "/images/profile-image-4.png"
    },
    client: {
      name: "Stripe Venture Studio",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    tier: "Premium",
    amount: 1250,
    status: "active",
    deliveryDate: "Oct 04, 2026",
    orderedDate: "Sep 28, 2026"
  },
  {
    id: "ORD-7814",
    gigTitle: "High-Performance Next.js 15 Web App with Tailwind & Motion",
    freelancer: {
      name: "Abhinav Birajdar",
      avatar: "/images/profile-image-4.png"
    },
    client: {
      name: "Kinetics AI",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    tier: "Standard",
    amount: 680,
    status: "delivered",
    deliveryDate: "Today (Reviewing)",
    orderedDate: "Sep 25, 2026"
  },
  {
    id: "ORD-6520",
    gigTitle: "3D Animated Hero Scene with Three.js & Spline",
    freelancer: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    client: {
      name: "Abhinav Birajdar",
      avatar: "/images/profile-image-4.png"
    },
    tier: "Basic",
    amount: 280,
    status: "completed",
    deliveryDate: "Sep 20, 2026",
    orderedDate: "Sep 16, 2026"
  },
  {
    id: "ORD-5192",
    gigTitle: "Generative AI Prompt Pipeline & Autonomous Agent API",
    freelancer: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    client: {
      name: "HyperScale Tech",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
    },
    tier: "Premium",
    amount: 600,
    status: "completed",
    deliveryDate: "Sep 12, 2026",
    orderedDate: "Sep 05, 2026"
  }
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "delivered" | "completed" | "cancelled">("all")
  const [rolePerspective, setRolePerspective] = useState<"as_buyer" | "as_seller">("as_seller")

  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
            <FaClock className="text-[10px]" />
            In Progress
          </span>
        )
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
            <FaArrowsRotate className="text-[10px]" />
            Delivered (Action Required)
          </span>
        )
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
            <FaCheck className="text-[10px]" />
            Completed
          </span>
        )
      case "revision":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-400">
            <FaArrowsRotate className="text-[10px]" />
            Revision Requested
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-400">
            <FaCircleXmark className="text-[10px]" />
            Cancelled
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Header */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-pink-400 backdrop-blur-md mb-2">
                <FaBoxArchive className="text-pink-400" />
                <span>Escrow Order Management</span>
              </div>
              <h1 className="text-2xl font-extrabold sm:text-3xl text-white">Manage Orders</h1>
              <p className="text-xs text-slate-400 mt-1">
                Track production timelines, approve deliverables, and manage escrow releases.
              </p>
            </div>

            {/* Role switch toggle */}
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm self-start sm:self-auto">
              <button
                onClick={() => setRolePerspective("as_seller")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  rolePerspective === "as_seller"
                    ? "bg-[#ff4b6e] text-white shadow-md shadow-pink-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                As Creator / Seller
              </button>
              <button
                onClick={() => setRolePerspective("as_buyer")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  rolePerspective === "as_buyer"
                    ? "bg-[#ff4b6e] text-white shadow-md shadow-pink-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                As Client / Buyer
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Orders" },
              { id: "active", label: "Active" },
              { id: "delivered", label: "Delivered" },
              { id: "completed", label: "Completed" },
              { id: "cancelled", label: "Cancelled" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-[#ff4b6e] text-white shadow-md shadow-pink-500/20"
                    : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List Content */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center text-slate-400">
              <p>No orders found in this view.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md transition-all hover:border-[#ff4b6e]/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/15 shrink-0">
                    <Image
                      src={rolePerspective === "as_seller" ? order.client.avatar : order.freelancer.avatar}
                      alt="User avatar"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-pink-400">{order.id}</span>
                      <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400 border border-white/10">
                        {order.tier} Tier
                      </span>
                      {getStatusBadge(order.status)}
                    </div>

                    <Link
                      href={`/orders/${order.id}`}
                      className="text-sm font-bold text-white hover:text-pink-400 transition-colors line-clamp-1"
                    >
                      {order.gigTitle}
                    </Link>

                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span>
                        {rolePerspective === "as_seller" ? "Client:" : "Creator:"}{" "}
                        <strong className="text-white">
                          {rolePerspective === "as_seller" ? order.client.name : order.freelancer.name}
                        </strong>
                      </span>
                      <span>•</span>
                      <span>Due: <strong className="text-slate-200">{order.deliveryDate}</strong></span>
                      <span>•</span>
                      <span>Ordered: {order.orderedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-white/10 sm:border-0 pt-3 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">Order Total</span>
                    <p className="text-lg font-extrabold text-white">${order.amount}</p>
                  </div>

                  <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-pink-500/20 hover:brightness-110"
                  >
                    <span>Open Workspace</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
