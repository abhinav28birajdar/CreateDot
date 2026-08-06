"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSignature,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Calendar,
  DollarSign,
  User,
  Building2,
  Edit3,
  Trash2,
  Send,
  PenTool,
  FileText,
  Shield,
  ChevronRight,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
type ContractStatus = "draft" | "sent" | "signed" | "active" | "completed" | "cancelled";

interface Contract {
  id: string;
  title: string;
  client: {
    name: string;
    email: string;
    avatar: string;
    company?: string;
  };
  type: "fixed" | "hourly" | "retainer";
  value: number;
  currency: string;
  status: ContractStatus;
  startDate: string;
  endDate?: string;
  signedDate?: string;
  milestones?: {
    title: string;
    amount: number;
    status: "pending" | "paid";
  }[];
  description: string;
}

// ============ MOCK DATA ============
const mockContracts: Contract[] = [
  {
    id: "con-001",
    title: "Mobile App Redesign - TechStart Inc.",
    client: {
      name: "TechStart Inc.",
      email: "projects@techstart.io",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100",
      company: "TechStart Inc.",
    },
    type: "fixed",
    value: 12000,
    currency: "USD",
    status: "active",
    startDate: "2025-01-01",
    endDate: "2025-03-01",
    signedDate: "2024-12-28",
    milestones: [
      { title: "Discovery & Research", amount: 2000, status: "paid" },
      { title: "Design System", amount: 3000, status: "paid" },
      { title: "UI Design", amount: 4000, status: "pending" },
      { title: "Prototyping & Handoff", amount: 3000, status: "pending" },
    ],
    description: "Complete redesign of the TechStart mobile application including UX research, design system creation, and interactive prototypes.",
  },
  {
    id: "con-002",
    title: "Brand Identity - Creative Agency",
    client: {
      name: "Creative Agency",
      email: "hello@creative.co",
      avatar: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=100",
      company: "Creative Agency Ltd.",
    },
    type: "fixed",
    value: 8500,
    currency: "USD",
    status: "signed",
    startDate: "2025-01-15",
    endDate: "2025-02-28",
    signedDate: "2025-01-10",
    description: "Complete brand identity package including logo, color palette, typography, and brand guidelines.",
  },
  {
    id: "con-003",
    title: "UI/UX Consultation - Startup Labs",
    client: {
      name: "Startup Labs",
      email: "team@startuplabs.io",
      avatar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100",
      company: "Startup Labs",
    },
    type: "hourly",
    value: 125,
    currency: "USD",
    status: "sent",
    startDate: "2025-02-01",
    description: "Ongoing UI/UX consultation and design review services at $125/hour.",
  },
  {
    id: "con-004",
    title: "Monthly Retainer - E-Commerce Pro",
    client: {
      name: "E-Commerce Pro",
      email: "design@ecommercepro.com",
      avatar: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=100",
      company: "E-Commerce Pro",
    },
    type: "retainer",
    value: 3500,
    currency: "USD",
    status: "active",
    startDate: "2024-10-01",
    signedDate: "2024-09-25",
    description: "Monthly design retainer for ongoing UI updates, feature designs, and design support.",
  },
  {
    id: "con-005",
    title: "Website Redesign - Local Business",
    client: {
      name: "Local Business Co",
      email: "info@localbiz.com",
      avatar: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100",
      company: "Local Business Co",
    },
    type: "fixed",
    value: 4500,
    currency: "USD",
    status: "completed",
    startDate: "2024-11-01",
    endDate: "2024-12-15",
    signedDate: "2024-10-28",
    description: "Complete website redesign including homepage and 5 inner pages.",
  },
];

// ============ STATUS BADGE ============
function StatusBadge({ status }: { status: ContractStatus }) {
  const config: Record<ContractStatus, { label: string; icon: React.ReactNode; className: string }> = {
    draft: { label: "Draft", icon: <Edit3 className="w-3 h-3" />, className: "bg-slate-100 text-slate-600 dark:bg-[#111111] dark:text-slate-400" },
    sent: { label: "Awaiting Signature", icon: <Send className="w-3 h-3" />, className: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
    signed: { label: "Signed", icon: <PenTool className="w-3 h-3" />, className: "bg-blue-100 text-[#8B5DFF] dark:bg-blue-900/30 dark:text-[#8B5DFF]" },
    active: { label: "Active", icon: <CheckCircle className="w-3 h-3" />, className: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-[#8B5DFF]" },
    completed: { label: "Completed", icon: <CheckCircle className="w-3 h-3" />, className: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" },
    cancelled: { label: "Cancelled", icon: <XCircle className="w-3 h-3" />, className: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
  };

  const { label, icon, className } = config[status];

  return (
    <Badge className={`flex items-center gap-1 ${className}`}>
      {icon}
      {label}
    </Badge>
  );
}

// ============ CONTRACT CARD ============
function ContractCard({ contract }: { contract: Contract }) {
  const [showMenu, setShowMenu] = useState(false);

  const getTypeLabel = () => {
    switch (contract.type) {
      case "fixed":
        return "Fixed Price";
      case "hourly":
        return "Hourly Rate";
      case "retainer":
        return "Monthly Retainer";
    }
  };

  const getValueDisplay = () => {
    switch (contract.type) {
      case "fixed":
        return `$${contract.value.toLocaleString()}`;
      case "hourly":
        return `$${contract.value}/hr`;
      case "retainer":
        return `$${contract.value.toLocaleString()}/mo`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] p-6 hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <img
            src={contract.client.avatar}
            alt={contract.client.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
              {contract.title}
            </h3>
            <p className="text-sm text-slate-500">{contract.client.company || contract.client.name}</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-[#111111] rounded-lg"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#111111] rounded-lg shadow-lg border border-slate-200 dark:border-[#1F1F1F] py-2 z-10">
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-[#111111] flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Contract
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-[#111111] flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-[#111111] flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-[#111111] flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
              <hr className="my-2 border-slate-200 dark:border-[#2A2A2A]" />
              <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
        {contract.description}
      </p>

      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1.5 text-slate-500">
          <DollarSign className="w-4 h-4" />
          <span className="font-semibold text-slate-900 dark:text-white">{getValueDisplay()}</span>
          <span className="text-slate-400">({getTypeLabel()})</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(contract.startDate).toLocaleDateString()}
          {contract.endDate && ` - ${new Date(contract.endDate).toLocaleDateString()}`}
        </span>
      </div>

      {/* Milestones Progress */}
      {contract.milestones && contract.milestones.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-500">Milestones</span>
            <span className="text-slate-900 dark:text-white font-medium">
              {contract.milestones.filter((m) => m.status === "paid").length}/{contract.milestones.length}
            </span>
          </div>
          <div className="flex gap-1">
            {contract.milestones.map((milestone, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  milestone.status === "paid"
                    ? "bg-[#8B5DFF]"
                    : "bg-slate-200 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#1F1F1F]">
        <StatusBadge status={contract.status} />
        <Link href={`/dashboard/contracts/${contract.id}`}>
          <Button variant="ghost" size="sm">
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// ============ MAIN PAGE ============
export default function ContractsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ContractStatus>("all");

  const filteredContracts = mockContracts.filter((contract) => {
    if (statusFilter !== "all" && contract.status !== statusFilter) return false;
    if (searchQuery) {
      return (
        contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.client.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const activeContracts = mockContracts.filter((c) => c.status === "active").length;
  const pendingSignature = mockContracts.filter((c) => c.status === "sent").length;
  const totalValue = mockContracts
    .filter((c) => c.status === "active" || c.status === "signed")
    .reduce((sum, c) => sum + (c.type === "fixed" ? c.value : 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#8B5DFF] from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
                <FileSignature className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Contracts
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage your client contracts and agreements
                </p>
              </div>
            </div>

            <Link href="/dashboard/contracts/create">
              <Button className="bg-violet-600 hover:bg-violet-700">
                <Plus className="w-4 h-4 mr-2" />
                New Contract
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-50 dark:bg-[#111111] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-500">Total Contracts</span>
                <FileSignature className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {mockContracts.length}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-600 dark:text-[#8B5DFF]">Active</span>
                <CheckCircle className="w-5 h-5 text-[#8B5DFF]" />
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-[#8B5DFF]">
                {activeContracts}
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-amber-600 dark:text-amber-400">Pending Signature</span>
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {pendingSignature}
              </p>
            </div>
            <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-violet-600 dark:text-violet-400">Active Value</span>
                <DollarSign className="w-5 h-5 text-violet-500" />
              </div>
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                ${totalValue.toLocaleString()}
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
              placeholder="Search contracts..."
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {(["all", "active", "signed", "sent", "draft", "completed"] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className={statusFilter === status ? "bg-violet-600 hover:bg-violet-700" : ""}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Contracts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredContracts.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>

        {filteredContracts.length === 0 && (
          <div className="text-center py-16">
            <FileSignature className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No contracts found
            </h3>
            <p className="text-slate-500 mb-6">
              {searchQuery
                ? "Try adjusting your search"
                : "Create your first contract to get started"}
            </p>
            <Link href="/dashboard/contracts/create">
              <Button className="bg-violet-600 hover:bg-violet-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Contract
              </Button>
            </Link>
          </div>
        )}

        {/* Tips Section */}
        <section className="mt-12 bg-[#8B5DFF] from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Protect Your Work</h2>
              <p className="text-slate-300 mb-4">
                All contracts on CreateDOT are legally binding and include our standard protections for both parties. 
                Learn more about how we keep your work and payments secure.
              </p>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Learn About Contract Protection
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
