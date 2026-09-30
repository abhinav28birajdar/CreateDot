"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaWallet,
  FaArrowDown,
  FaArrowUp,
  FaClock,
  FaCheck,
  FaCreditCard,
  FaBitcoin,
  FaPaypal,
  FaShieldHalved,
  FaFileInvoiceDollar,
  FaPlus
} from "react-icons/fa6"

interface Transaction {
  id: string
  title: string
  amount: number
  type: "credit" | "debit" | "escrow_hold"
  status: "completed" | "pending"
  date: string
  method: string
}

const mockTransactions: Transaction[] = [
  {
    id: "TX-9021",
    title: "Order Payout: Ultra-Modern SaaS UI/UX Design System",
    amount: 1250,
    type: "credit",
    status: "completed",
    date: "Today, 10:45 AM",
    method: "CreateDOT Escrow"
  },
  {
    id: "TX-8910",
    title: "Withdrawal to Bank Account (•••• 8821)",
    amount: 2000,
    type: "debit",
    status: "completed",
    date: "Sep 27, 2026",
    method: "ACH Direct Wire"
  },
  {
    id: "TX-7643",
    title: "Commission: Generative AI Prompt Pipeline",
    amount: 600,
    type: "credit",
    status: "completed",
    date: "Sep 22, 2026",
    method: "CreateDOT Escrow"
  },
  {
    id: "TX-6521",
    title: "Escrow Deposit: 3D Animated Hero Scene",
    amount: 280,
    type: "escrow_hold",
    status: "pending",
    date: "Sep 18, 2026",
    method: "Credit Card"
  }
]

export default function WalletPage() {
  const [balance, setBalance] = useState(3420)
  const [pendingEscrow, setPendingEscrow] = useState(680)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState(1000)
  const [withdrawMethod, setWithdrawMethod] = useState("bank")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleWithdraw = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setBalance((b) => b - withdrawAmount)
      setIsProcessing(false)
      setShowWithdrawModal(false)
      alert(`Withdrawal of $${withdrawAmount} initiated via ${withdrawMethod.toUpperCase()}`)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Banner */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-400 mb-2">
              <FaWallet className="text-pink-400" />
              <span>Financial Studio Wallet & Escrow</span>
            </div>
            <h1 className="text-2xl font-extrabold sm:text-3xl text-white">CreateDOT Wallet</h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage your project earnings, active escrow guarantees, and instant payout rails.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110"
            >
              <FaArrowUp className="text-xs" />
              <span>Withdraw Funds</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Balance Cards */}
        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Available Balance</span>
            <div className="mt-2 text-3xl font-extrabold text-white">${balance.toLocaleString()}.00</div>
            <p className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
              <FaCheck /> Ready for instant withdrawal or platform checkout
            </p>
          </div>

          <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 backdrop-blur-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Funds in Active Escrow</span>
            <div className="mt-2 text-3xl font-extrabold text-white">${pendingEscrow.toLocaleString()}.00</div>
            <p className="mt-2 text-[11px] text-amber-400/80 flex items-center gap-1">
              <FaClock /> Released automatically upon order delivery approval
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Lifetime Studio Earnings</span>
            <div className="mt-2 text-3xl font-extrabold text-white">$24,850.00</div>
            <p className="mt-2 text-[11px] text-slate-400">
              Across 34 completed client contracts & gigs
            </p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-white">Recent Transactions & Statements</h2>
            <button
              onClick={() => alert("Monthly financial statement downloaded (PDF)")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10"
            >
              <FaFileInvoiceDollar className="text-pink-400" />
              <span>Download Tax Statement</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="pb-3">Transaction</th>
                  <th className="pb-3">Method</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <div className="font-semibold text-white">{tx.title}</div>
                      <div className="text-[10px] font-mono text-slate-500">{tx.id}</div>
                    </td>
                    <td className="py-4 text-slate-400">{tx.method}</td>
                    <td className="py-4 text-slate-400">{tx.date}</td>
                    <td className="py-4">
                      {tx.status === "completed" ? (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                          <FaCheck className="text-[9px]" /> Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/20">
                          <FaClock className="text-[9px]" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <span
                        className={`font-mono font-bold text-sm ${
                          tx.type === "credit"
                            ? "text-emerald-400"
                            : tx.type === "debit"
                            ? "text-slate-300"
                            : "text-amber-400"
                        }`}
                      >
                        {tx.type === "credit" ? "+" : tx.type === "debit" ? "-" : "~"}${tx.amount}.00
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-4">Withdraw Studio Funds</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Withdrawal Amount ($ USD)
                </label>
                <input
                  type="number"
                  max={balance}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:outline-none focus:border-[#ff4b6e]"
                />
                <p className="mt-1 text-[11px] text-slate-500">Available: ${balance}.00</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Payout Method</label>
                <select
                  value={withdrawMethod}
                  onChange={(e) => setWithdrawMethod(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-800 p-3 text-xs text-white focus:outline-none"
                >
                  <option value="bank">Bank Wire ACH (•••• 8821) — 0% fee</option>
                  <option value="usdc">Crypto USDC (Solana / Base) — Instant</option>
                  <option value="paypal">PayPal (instant transfer)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                disabled={isProcessing || withdrawAmount > balance}
                className="rounded-xl bg-[#ff4b6e] px-5 py-2 text-xs font-bold text-white hover:brightness-110 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Confirm Withdrawal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
