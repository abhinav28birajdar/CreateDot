"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  CreditCard,
  Building2,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Download,
  Filter,
  Calendar,
  ChevronRight,
  Banknote,
  PiggyBank,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
interface Transaction {
  id: string;
  type: "income" | "withdrawal" | "refund" | "fee";
  description: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  project?: string;
  client?: string;
}

interface PayoutMethod {
  id: string;
  type: "bank" | "paypal" | "stripe";
  name: string;
  last4: string;
  isDefault: boolean;
}

// ============ MOCK DATA ============
const mockTransactions: Transaction[] = [
  { id: "t1", type: "income", description: "Payment for Mobile App Redesign", amount: 5500, status: "completed", date: "2025-01-10", project: "Mobile App Redesign", client: "TechStart Inc." },
  { id: "t2", type: "withdrawal", description: "Withdrawal to Bank ****4532", amount: -3000, status: "completed", date: "2025-01-08" },
  { id: "t3", type: "income", description: "Payment for Brand Identity", amount: 3200, status: "pending", date: "2025-01-07", project: "Brand Identity", client: "Creative Agency" },
  { id: "t4", type: "fee", description: "Platform fee - January", amount: -165, status: "completed", date: "2025-01-01" },
  { id: "t5", type: "income", description: "Payment for Dashboard Design", amount: 4800, status: "completed", date: "2024-12-28", project: "Dashboard UI", client: "E-Commerce Pro" },
  { id: "t6", type: "withdrawal", description: "Withdrawal to PayPal", amount: -5000, status: "completed", date: "2024-12-25" },
  { id: "t7", type: "refund", description: "Refund for cancelled project", amount: -800, status: "completed", date: "2024-12-20" },
];

const mockPayoutMethods: PayoutMethod[] = [
  { id: "pm1", type: "bank", name: "Chase Business Checking", last4: "4532", isDefault: true },
  { id: "pm2", type: "paypal", name: "PayPal", last4: "john@email.com", isDefault: false },
];

// ============ TRANSACTION ICON ============
function TransactionIcon({ type }: { type: Transaction["type"] }) {
  const config = {
    income: { icon: ArrowDownLeft, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    withdrawal: { icon: ArrowUpRight, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    refund: { icon: ArrowUpRight, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
    fee: { icon: DollarSign, color: "text-slate-500", bg: "bg-slate-100 dark:bg-slate-800" },
  };

  const { icon: Icon, color, bg } = config[type];

  return (
    <div className={`w-10 h-10 rounded-full ${bg} ${color} flex items-center justify-center`}>
      <Icon className="w-5 h-5" />
    </div>
  );
}

// ============ MAIN PAGE ============
export default function EarningsPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const totalEarnings = mockTransactions
    .filter((t) => t.type === "income" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingEarnings = mockTransactions
    .filter((t) => t.type === "income" && t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawn = Math.abs(
    mockTransactions
      .filter((t) => t.type === "withdrawal" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const availableBalance = totalEarnings - totalWithdrawn;

  // Mock chart data
  const chartData = [
    { month: "Aug", earnings: 4200 },
    { month: "Sep", earnings: 5800 },
    { month: "Oct", earnings: 3900 },
    { month: "Nov", earnings: 6500 },
    { month: "Dec", earnings: 8200 },
    { month: "Jan", earnings: 5500 },
  ];
  const maxEarning = Math.max(...chartData.map((d) => d.earnings));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Wallet className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Earnings</h1>
                <p className="text-white/80">Manage your earnings and withdrawals</p>
              </div>
            </div>

            <Button
              onClick={() => setShowWithdrawModal(true)}
              className="bg-white text-violet-600 hover:bg-white/90"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Withdraw Funds
            </Button>
          </div>

          {/* Balance Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">Available Balance</span>
                <Wallet className="w-5 h-5 text-white/60" />
              </div>
              <p className="text-3xl font-bold">${availableBalance.toLocaleString()}</p>
              <p className="text-sm text-white/60 mt-1">Ready to withdraw</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">Pending</span>
                <Clock className="w-5 h-5 text-white/60" />
              </div>
              <p className="text-3xl font-bold">${pendingEarnings.toLocaleString()}</p>
              <p className="text-sm text-white/60 mt-1">Awaiting clearance</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">Total Earned</span>
                <TrendingUp className="w-5 h-5 text-white/60" />
              </div>
              <p className="text-3xl font-bold">${totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-white/60 mt-1">All time</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">Withdrawn</span>
                <Banknote className="w-5 h-5 text-white/60" />
              </div>
              <p className="text-3xl font-bold">${totalWithdrawn.toLocaleString()}</p>
              <p className="text-sm text-white/60 mt-1">Total withdrawals</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Earnings Chart */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Earnings Overview
                </h2>
                <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                  {(["week", "month", "year"] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 text-sm rounded-md capitalize ${
                        timeRange === range
                          ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600"
                          : "text-slate-500"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Simple Chart */}
              <div className="h-64 flex items-end gap-4">
                {chartData.map((data, i) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.earnings / maxEarning) * 100}%` }}
                      transition={{ delay: i * 0.1 }}
                      className="w-full bg-gradient-to-t from-violet-500 to-fuchsia-500 rounded-t-lg min-h-[20px]"
                    />
                    <span className="text-xs text-slate-500">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Recent Transactions
                </h2>
                <Link href="/dashboard/transactions">
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {mockTransactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <TransactionIcon type={transaction.type} />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-slate-500">
                          {new Date(transaction.date).toLocaleDateString()}
                          {transaction.client && ` • ${transaction.client}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.amount > 0 ? "text-green-600" : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <Badge
                        className={`text-xs ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                            : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                            : "bg-red-100 text-red-600 dark:bg-red-900/30"
                        }`}
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={() => setShowWithdrawModal(true)}
                  className="w-full bg-violet-600 hover:bg-violet-700 justify-start"
                >
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Withdraw to Bank
                </Button>
                <Link href="/dashboard/invoices/create" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Invoice
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export Statements
                </Button>
              </div>
            </div>

            {/* Payout Methods */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Payout Methods
                </h3>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {mockPayoutMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center">
                        {method.type === "bank" ? (
                          <Building2 className="w-5 h-5 text-slate-600" />
                        ) : method.type === "paypal" ? (
                          <span className="text-blue-600 font-bold text-sm">PP</span>
                        ) : (
                          <CreditCard className="w-5 h-5 text-violet-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">
                          {method.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {method.type === "bank" ? `****${method.last4}` : method.last4}
                        </p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <Badge className="bg-green-100 text-green-600 dark:bg-green-900/30 text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Breakdown */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                This Month
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Gross Earnings</span>
                  <span className="font-semibold text-slate-900 dark:text-white">$5,665</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Platform Fee (3%)</span>
                  <span className="text-red-500">-$165</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Processing Fee</span>
                  <span className="text-red-500">-$0</span>
                </div>
                <hr className="border-slate-200 dark:border-slate-700" />
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900 dark:text-white">Net Earnings</span>
                  <span className="font-bold text-green-600">$5,500</span>
                </div>
              </div>
            </div>

            {/* Tax Info */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                    Tax Documents
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                    Your 1099-K form will be available by January 31st if you earned over $600.
                  </p>
                  <Link href="/dashboard/tax-documents">
                    <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                      View Tax Center
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
