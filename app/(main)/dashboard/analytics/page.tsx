"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageCircle,
  Users,
  Download,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Clock,
  MapPin,
  Link2,
  Share2,
  Target,
  Zap,
  Award,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
interface StatCard {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: React.ElementType;
}

interface ProjectAnalytics {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  saves: number;
  change: number;
}

// ============ MOCK DATA ============
const overviewStats: StatCard[] = [
  { label: "Total Views", value: "125,450", change: 12.5, trend: "up", icon: Eye },
  { label: "Total Likes", value: "8,920", change: 8.3, trend: "up", icon: Heart },
  { label: "New Followers", value: "1,245", change: 15.2, trend: "up", icon: Users },
  { label: "Comments", value: "567", change: -2.1, trend: "down", icon: MessageCircle },
  { label: "Profile Visits", value: "34,560", change: 22.4, trend: "up", icon: Target },
  { label: "Engagement Rate", value: "4.8%", change: 0.5, trend: "up", icon: Zap },
];

const topProjects: ProjectAnalytics[] = [
  {
    id: "1",
    title: "Dashboard UI Kit Design",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200",
    views: 12450,
    likes: 890,
    comments: 45,
    saves: 234,
    change: 15.2,
  },
  {
    id: "2",
    title: "E-commerce Mobile App",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=200",
    views: 8920,
    likes: 567,
    comments: 32,
    saves: 178,
    change: 8.7,
  },
  {
    id: "3",
    title: "Brand Identity System",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=200",
    views: 7650,
    likes: 456,
    comments: 28,
    saves: 145,
    change: -2.3,
  },
  {
    id: "4",
    title: "3D Abstract Shapes",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
    views: 6340,
    likes: 389,
    comments: 21,
    saves: 112,
    change: 5.4,
  },
  {
    id: "5",
    title: "Landing Page Redesign",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200",
    views: 5120,
    likes: 312,
    comments: 18,
    saves: 98,
    change: 12.1,
  },
];

const deviceData = [
  { device: "Desktop", percentage: 58, icon: Monitor },
  { device: "Mobile", percentage: 32, icon: Smartphone },
  { device: "Tablet", percentage: 10, icon: Tablet },
];

const topCountries = [
  { country: "United States", views: 45200, percentage: 36 },
  { country: "United Kingdom", views: 18900, percentage: 15 },
  { country: "Germany", views: 12450, percentage: 10 },
  { country: "Canada", views: 9870, percentage: 8 },
  { country: "Australia", views: 7650, percentage: 6 },
];

const trafficSources = [
  { source: "Direct", visits: 45200, percentage: 42 },
  { source: "Search", visits: 28900, percentage: 27 },
  { source: "Social Media", visits: 18450, percentage: 17 },
  { source: "Referral", visits: 15200, percentage: 14 },
];

const weeklyData = [65, 45, 78, 52, 89, 67, 92];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ============ STAT CARD COMPONENT ============
function StatCardComponent({ stat }: { stat: StatCard }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center">
          <stat.icon className="w-6 h-6 text-violet-600" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-500" : "text-slate-500"
        }`}>
          {stat.trend === "up" ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : stat.trend === "down" ? (
            <ArrowDownRight className="w-4 h-4" />
          ) : null}
          {Math.abs(stat.change)}%
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
        {stat.value}
      </div>
      <div className="text-sm text-slate-500">{stat.label}</div>
    </motion.div>
  );
}

// ============ MINI CHART ============
function MiniChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((value, index) => (
        <div
          key={index}
          className="flex-1 bg-violet-500 rounded-t"
          style={{ height: `${(value / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

// ============ MAIN PAGE ============
export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#8B5DFF] from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Analytics Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Track your portfolio performance and audience insights
                </p>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center gap-2">
              {[
                { id: "7d", label: "7 Days" },
                { id: "30d", label: "30 Days" },
                { id: "90d", label: "90 Days" },
                { id: "1y", label: "1 Year" },
              ].map((range) => (
                <Button
                  key={range.id}
                  variant={timeRange === range.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range.id)}
                  className={timeRange === range.id ? "bg-violet-600 hover:bg-violet-700" : ""}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {overviewStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <StatCardComponent stat={stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Views Chart */}
            <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Views Over Time
                </h2>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  +12.5% vs last period
                </Badge>
              </div>

              {/* Simple Bar Chart */}
              <div className="h-64 flex items-end gap-4">
                {weeklyData.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-[#8B5DFF] from-violet-600 to-violet-400 rounded-t-lg transition-all hover:from-violet-700 hover:to-violet-500"
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-xs text-slate-500">{weekDays[index]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Projects */}
            <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Top Performing Projects
                </h2>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {topProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#111111]/50 hover:bg-slate-100 dark:hover:bg-[#111111] transition-colors"
                  >
                    <span className="text-lg font-bold text-slate-400 w-6">
                      {index + 1}
                    </span>
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-900 dark:text-white truncate">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {project.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {project.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {project.comments}
                        </span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      project.change >= 0 ? "text-green-600" : "text-red-500"
                    }`}>
                      {project.change >= 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {Math.abs(project.change)}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Device Breakdown */}
            <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Device Breakdown
              </h3>
              <div className="space-y-4">
                {deviceData.map((device) => (
                  <div key={device.device}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <device.icon className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {device.device}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {device.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-[#111111] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-600 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Countries */}
            <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-violet-600" />
                Top Countries
              </h3>
              <div className="space-y-3">
                {topCountries.map((country, index) => (
                  <div
                    key={country.country}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-[#111111]/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-400">
                        {index + 1}
                      </span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {country.country}
                      </span>
                    </div>
                    <span className="text-sm text-slate-500">
                      {country.views.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Link2 className="w-5 h-5 text-violet-600" />
                Traffic Sources
              </h3>
              <div className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.source}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {source.source}
                      </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {source.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-[#111111] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Insights */}
            <div className="bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-semibold">Quick Insights</h3>
              </div>
              <ul className="space-y-3 text-sm text-violet-100">
                <li className="flex items-start gap-2">
                  <Award className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Your "Dashboard UI Kit" is trending! Views up 45% this week.</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Best posting time: Tuesday & Thursday at 10 AM PST.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>67% of your audience prefers UI/UX content.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
