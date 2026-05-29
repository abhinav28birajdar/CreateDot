"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Image as ImageIcon,
  MessageSquare,
  Flag,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Heart,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Search,
  Filter,
  Download,
  Calendar,
  ChevronRight,
  Activity,
  BarChart3,
  PieChart,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ============ MOCK DATA ============
const stats = [
  { label: "Total Users", value: "124,532", change: "+12.5%", trend: "up", icon: Users },
  { label: "Total Projects", value: "458,291", change: "+8.3%", trend: "up", icon: ImageIcon },
  { label: "Active Jobs", value: "1,247", change: "-2.1%", trend: "down", icon: Briefcase },
  { label: "Revenue (MTD)", value: "$89,432", change: "+23.4%", trend: "up", icon: DollarSign },
];

const recentUsers = [
  { id: "u1", name: "Sarah Chen", email: "sarah@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", status: "active", joinedAt: "2 hours ago" },
  { id: "u2", name: "Marcus Johnson", email: "marcus@example.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", status: "pending", joinedAt: "5 hours ago" },
  { id: "u3", name: "Emily Rodriguez", email: "emily@example.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", status: "active", joinedAt: "1 day ago" },
  { id: "u4", name: "James Park", email: "james@example.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", status: "suspended", joinedAt: "2 days ago" },
];

const recentReports = [
  { id: "r1", type: "content", reason: "Copyright violation", reporter: "User#1234", reported: "Project: Mobile App UI", status: "pending", createdAt: "1 hour ago" },
  { id: "r2", type: "user", reason: "Spam", reporter: "User#5678", reported: "User: spammer_bot", status: "resolved", createdAt: "3 hours ago" },
  { id: "r3", type: "content", reason: "Inappropriate content", reporter: "User#9012", reported: "Project: Abstract Art", status: "pending", createdAt: "5 hours ago" },
  { id: "r4", type: "comment", reason: "Harassment", reporter: "User#3456", reported: "Comment on Project#789", status: "escalated", createdAt: "1 day ago" },
];

const activityLog = [
  { id: "a1", action: "User verified", details: "sarah@example.com was verified", time: "5 minutes ago" },
  { id: "a2", action: "Content removed", details: "Project #12345 removed for TOS violation", time: "15 minutes ago" },
  { id: "a3", action: "Job approved", details: "Senior Designer at TechCorp approved", time: "1 hour ago" },
  { id: "a4", action: "User suspended", details: "spam_user@fake.com suspended for spam", time: "2 hours ago" },
  { id: "a5", action: "Payout processed", details: "$1,234 payout to designer_pro", time: "3 hours ago" },
];

// ============ SIDEBAR ITEMS ============
const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: Users, label: "Users", href: "/admin/users", badge: "124K" },
  { icon: ImageIcon, label: "Projects", href: "/admin/projects", badge: "458K" },
  { icon: Briefcase, label: "Jobs", href: "/admin/jobs", badge: "1.2K" },
  { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
  { icon: Flag, label: "Reports", href: "/admin/reports", badge: "23", badgeColor: "red" },
  { icon: DollarSign, label: "Billing", href: "/admin/billing" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

// ============ STAT CARD ============
function StatCard({ stat }: { stat: typeof stats[0] }) {
  const Icon = stat.icon;
  const isUp = stat.trend === "up";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#111111] rounded-xl p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
          <Icon className="w-6 h-6 text-violet-600" />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-4">
        {isUp ? (
          <TrendingUp className="w-4 h-4 text-[#8B5DFF]" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500" />
        )}
        <span className={`text-sm font-medium ${isUp ? "text-[#8B5DFF]" : "text-red-500"}`}>
          {stat.change}
        </span>
        <span className="text-sm text-slate-400 ml-1">vs last month</span>
      </div>
    </motion.div>
  );
}

// ============ MAIN ADMIN DASHBOARD ============
export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#111111] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#111111] border-r border-slate-200 dark:border-[#2A2A2A] fixed h-full">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#8B5DFF] from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Admin</span>
          </Link>
        </div>

        <nav className="mt-2 px-3">
          {sidebarItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <div
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                  item.active
                    ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge
                    className={
                      item.badgeColor === "red"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                    }
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
            <p className="text-slate-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#111111]"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Users */}
          <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Recent Users
              </h2>
              <Link href="/admin/users" className="text-sm text-violet-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <Badge
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : user.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Recent Reports
              </h2>
              <Link href="/admin/reports" className="text-sm text-violet-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          report.status === "escalated" ? "text-red-500" : "text-amber-500"
                        }`}
                      />
                      <span className="font-medium text-slate-900 dark:text-white">
                        {report.reason}
                      </span>
                    </div>
                    <Badge
                      className={
                        report.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : report.status === "escalated"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500">{report.reported}</p>
                  <p className="text-xs text-slate-400 mt-1">{report.createdAt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Activity Log
              </h2>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {activityLog.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">
                      {activity.action}
                    </p>
                    <p className="text-sm text-slate-500">{activity.details}</p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* User Growth Chart Placeholder */}
          <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              User Growth
            </h2>
            <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="text-center text-slate-400">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <p>Chart visualization would go here</p>
              </div>
            </div>
          </div>

          {/* Revenue Chart Placeholder */}
          <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Revenue Overview
            </h2>
            <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="text-center text-slate-400">
                <PieChart className="w-12 h-12 mx-auto mb-2" />
                <p>Chart visualization would go here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white dark:bg-[#111111] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <UserPlus className="w-5 h-5 text-violet-500" />
              <span>Add User</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Briefcase className="w-5 h-5 text-violet-500" />
              <span>Manage Jobs</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Flag className="w-5 h-5 text-violet-500" />
              <span>Review Reports</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Settings className="w-5 h-5 text-violet-500" />
              <span>Settings</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
