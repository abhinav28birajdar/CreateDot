"use client"

import React, { useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  FaShieldHalved,
  FaCreditCard,
  FaPaypal,
  FaBitcoin,
  FaWallet,
  FaLock,
  FaCheck,
  FaArrowRight,
  FaArrowLeft
} from "react-icons/fa6"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gigId = searchParams.get("gig") || "gig-1"
  const tier = searchParams.get("tier") || "Standard"
  const priceParam = Number(searchParams.get("price")) || 680

  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto" | "wallet" | "paypal">("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const serviceFee = Math.round(priceParam * 0.05)
  const total = priceParam + serviceFee

  const handlePlaceOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      router.push(`/orders/ORD-${Math.floor(1000 + Math.random() * 9000)}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Header bar */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <h1 className="text-base font-bold text-white">CreateDOT Secure Checkout</h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <FaLock className="text-xs" />
            <span>256-Bit SSL Encrypted & Escrow Protected</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Payment Method Selector (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
              <h2 className="text-lg font-bold text-white mb-6">Select Payment Method</h2>

              <div className="grid gap-3 sm:grid-cols-2 mb-6">
                {[
                  { id: "card", label: "Credit / Debit Card", icon: FaCreditCard },
                  { id: "crypto", label: "Crypto (USDC, SOL)", icon: FaBitcoin },
                  { id: "wallet", label: "CreateDOT Wallet", icon: FaWallet },
                  { id: "paypal", label: "PayPal", icon: FaPaypal }
                ].map((method) => {
                  const Icon = method.icon
                  const isSelected = paymentMethod === method.id
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "border-[#ff4b6e] bg-[#ff4b6e]/10 text-white shadow-lg shadow-pink-500/10"
                          : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon className={isSelected ? "text-[#ff4b6e]" : "text-slate-400"} />
                      <span className="text-xs font-semibold">{method.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Card Form */}
              {paymentMethod === "card" && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Abhinav Birajdar"
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#ff4b6e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 4242"
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#ff4b6e] focus:outline-none font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#ff4b6e] focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:border-[#ff4b6e] focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Crypto Form */}
              {paymentMethod === "crypto" && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center space-y-3">
                  <FaBitcoin className="mx-auto text-3xl text-amber-400" />
                  <p className="text-xs font-semibold text-white">Instant Web3 Escrow Deposit</p>
                  <p className="text-xs text-slate-400">
                    Supports Solana (SOL), Ethereum (USDC / USDT), and Base. One-click deposit via Phantom, MetaMask, or Rainbow.
                  </p>
                </div>
              )}

              {/* Wallet Form */}
              {paymentMethod === "wallet" && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Available Wallet Balance:</span>
                    <span className="font-extrabold text-emerald-400 text-sm">$3,420.00</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Sufficient funds available. Balance will be debited instantly into project escrow.
                  </p>
                </div>
              )}

              {/* PayPal Form */}
              {paymentMethod === "paypal" && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center space-y-3">
                  <FaPaypal className="mx-auto text-3xl text-blue-400" />
                  <p className="text-xs font-semibold text-white">Pay via PayPal or PayPal Credit</p>
                  <p className="text-xs text-slate-400">
                    You will be redirected to PayPal's secure gateway to authorize your payment.
                  </p>
                </div>
              )}
            </div>

            {/* Escrow note */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-emerald-400 flex items-center gap-3">
              <FaShieldHalved className="text-xl shrink-0" />
              <div>
                <span className="font-bold">CreateDOT Smart Escrow Protection:</span> Your payment is not transferred to the freelancer until you review and approve the finished project deliverables.
              </div>
            </div>
          </div>

          {/* Order Summary (Right) */}
          <div className="lg:col-span-5">
            <div className="sticky top-20 rounded-3xl border border-white/15 bg-slate-900/90 p-6 backdrop-blur-xl shadow-2xl space-y-6">
              <h3 className="text-base font-bold text-white">Order Summary</h3>

              {/* Gig Preview Info */}
              <div className="flex gap-4 border-b border-white/10 pb-5">
                <div className="relative h-16 w-20 overflow-hidden rounded-xl bg-slate-800 shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"
                    alt="Gig Preview"
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="text-xs space-y-1">
                  <span className="rounded bg-pink-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-pink-400 border border-pink-500/20">
                    {tier} Package
                  </span>
                  <p className="font-bold text-white line-clamp-2">
                    Ultra-Modern SaaS UI/UX Design System in Figma
                  </p>
                  <p className="text-slate-400">Creator: Abhinav Birajdar</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Package Subtotal:</span>
                  <span className="font-semibold text-white">${priceParam}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Escrow & Platform Fee (5%):</span>
                  <span className="font-semibold text-white">${serviceFee}.00</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10 text-sm font-extrabold text-white">
                  <span>Total Amount Due:</span>
                  <span className="text-pink-400">${total}.00</span>
                </div>
              </div>

              {/* Confirmation CTA */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 py-4 font-bold text-white shadow-xl shadow-pink-500/25 transition-all hover:brightness-110 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing Escrow Funds...</span>
                ) : (
                  <>
                    <span>Confirm & Pay ${total}.00</span>
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-slate-500">
                By clicking Confirm, you accept CreateDOT's Terms of Service and Escrow Agreement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
