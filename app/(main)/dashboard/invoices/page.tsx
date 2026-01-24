"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Send,
  Eye,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Calendar,
  DollarSign,
  User,
  Copy,
  Mail,
  Printer,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: {
    name: string;
    email: string;
    avatar: string;
    company?: string;
  };
  project: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  items: {
    description: string;
    quantity: number;
    rate: number;
    total: number;
  }[];
}

// ============ MOCK DATA ============
const mockInvoices: Invoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "INV-2025-001",
    client: {
      name: "TechStart Inc.",
      email: "billing@techstart.io",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100",
      company: "TechStart Inc.",
    },
    project: "Mobile App Redesign",
    amount: 5500,
    currency: "USD",
    status: "paid",
    issueDate: "2025-01-01",
    dueDate: "2025-01-15",
    paidDate: "2025-01-10",
    items: [
      { description: "UI/UX Design", quantity: 40, rate: 100, total: 4000 },
      { description: "Prototyping", quantity: 10, rate: 100, total: 1000 },
      { description: "Design System", quantity: 5, rate: 100, total: 500 },
    ],
  },
  {
    id: "inv-002",
    invoiceNumber: "INV-2025-002",
    client: {
      name: "Creative Agency",
      email: "finance@creative.co",
      avatar: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=100",
      company: "Creative Agency Ltd.",
    },
    project: "Brand Identity Package",
    amount: 3200,
    currency: "USD",
    status: "sent",
    issueDate: "2025-01-08",
    dueDate: "2025-01-22",
    items: [
      { description: "Logo Design", quantity: 1, rate: 1500, total: 1500 },
      { description: "Brand Guidelines", quantity: 1, rate: 1000, total: 1000 },
      { description: "Stationery Design", quantity: 1, rate: 700, total: 700 },
    ],
  },
  {
    id: "inv-003",
    invoiceNumber: "INV-2025-003",
    client: {
      name: "E-Commerce Pro",
      email: "accounts@ecommercepro.com",
      avatar: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=100",
      company: "E-Commerce Pro",
    },
    project: "Dashboard UI Design",
    amount: 4800,
    currency: "USD",
    status: "overdue",
    issueDate: "2024-12-15",
    dueDate: "2024-12-29",
    items: [
      { description: "Dashboard Design", quantity: 30, rate: 120, total: 3600 },
      { description: "Component Library", quantity: 10, rate: 120, total: 1200 },
    ],
  },
  {
    id: "inv-004",
    invoiceNumber: "INV-2025-004",
    client: {
      name: "Startup Labs",
      email: "finance@startuplabs.io",
      avatar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100",
      company: "Startup Labs",
    },
    project: "Website Redesign",
    amount: 2800,
    currency: "USD",
    status: "draft",
    issueDate: "2025-01-12",
    dueDate: "2025-01-26",
    items: [
      { description: "Homepage Design", quantity: 1, rate: 1200, total: 1200 },
      { description: "Inner Pages (5)", quantity: 5, rate: 320, total: 1600 },
    ],
  },
];

// ============ STATUS BADGE ============
function StatusBadge({ status }: { status: InvoiceStatus }) {
  const config: Record<InvoiceStatus, { label: string; icon: React.ReactNode; className: string }> = {
    draft: { label: "Draft", icon: <Edit3 className="w-3 h-3" />, className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
    sent: { label: "Sent", icon: <Send className="w-3 h-3" />, className: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    paid: { label: "Paid", icon: <CheckCircle className="w-3 h-3" />, className: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
    overdue: { label: "Overdue", icon: <AlertCircle className="w-3 h-3" />, className: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
    cancelled: { label: "Cancelled", icon: <XCircle className="w-3 h-3" />, className: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500" },
  };

  const { label, icon, className } = config[status];

  return (
    <Badge className={`flex items-center gap-1 ${className}`}>
      {icon}
      {label}
    </Badge>
  );
}

// ============ INVOICE ROW ============
function InvoiceRow({ invoice }: { invoice: Invoice }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"
    >
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              {invoice.invoiceNumber}
            </p>
            <p className="text-sm text-slate-500">{invoice.project}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <img
            src={invoice.client.avatar}
            alt={invoice.client.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {invoice.client.name}
            </p>
            <p className="text-xs text-slate-500">{invoice.client.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <p className="font-semibold text-slate-900 dark:text-white">
          ${invoice.amount.toLocaleString()}
        </p>
        <p className="text-xs text-slate-500">{invoice.currency}</p>
      </td>
      <td className="py-4 px-4">
        <StatusBadge status={invoice.status} />
      </td>
      <td className="py-4 px-4">
        <div className="text-sm">
          <p className="text-slate-900 dark:text-white">
            {new Date(invoice.issueDate).toLocaleDateString()}
          </p>
          <p className="text-xs text-slate-500">
            Due: {new Date(invoice.dueDate).toLocaleDateString()}
          </p>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-2 z-10">
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Invoice
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Reminder
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
              <hr className="my-2 border-slate-200 dark:border-slate-700" />
              <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </motion.tr>
  );
}

// ============ MAIN PAGE ============
export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | InvoiceStatus>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredInvoices = mockInvoices.filter((invoice) => {
    if (statusFilter !== "all" && invoice.status !== statusFilter) return false;
    if (searchQuery) {
      return (
        invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.project.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const totalRevenue = mockInvoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);
  const pendingAmount = mockInvoices.filter((i) => i.status === "sent").reduce((sum, i) => sum + i.amount, 0);
  const overdueAmount = mockInvoices.filter((i) => i.status === "overdue").reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Invoices
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage your invoices and payments
                </p>
              </div>
            </div>

            <Link href="/dashboard/invoices/create">
              <Button className="bg-violet-600 hover:bg-violet-700">
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-500">Total Invoices</span>
                <FileText className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {mockInvoices.length}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-600 dark:text-green-400">Paid</span>
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-600 dark:text-blue-400">Pending</span>
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${pendingAmount.toLocaleString()}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-red-600 dark:text-red-400">Overdue</span>
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                ${overdueAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invoices..."
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
              {(["all", "paid", "sent", "overdue", "draft"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    statusFilter === status
                      ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Invoice</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Client</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500"></th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <InvoiceRow key={invoice.id} invoice={invoice} />
              ))}
            </tbody>
          </table>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No invoices found
              </h3>
              <p className="text-slate-500 mb-6">
                {searchQuery
                  ? "Try adjusting your search"
                  : "Create your first invoice to get started"}
              </p>
              <Link href="/dashboard/invoices/create">
                <Button className="bg-violet-600 hover:bg-violet-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
