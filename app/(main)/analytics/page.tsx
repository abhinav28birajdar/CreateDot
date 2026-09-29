"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    TrendingUp,
    TrendingDown,
    Eye,
    Heart,
    MessageSquare,
    DollarSign,
    Sparkles,
    Calendar,
    ArrowUpRight,
    Globe,
    Share2,
    Users,
    Layers
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const STATS = [
    {
        id: 'views',
        label: 'Total Project Views',
        value: '148,290',
        change: '+24.5%',
        isPositive: true,
        icon: Eye,
        color: 'text-violet-600 dark:text-violet-400',
        bgColor: 'bg-violet-50 dark:bg-violet-950/40'
    },
    {
        id: 'likes',
        label: 'Likes & Appreciations',
        value: '9,410',
        change: '+18.2%',
        isPositive: true,
        icon: Heart,
        color: 'text-rose-600 dark:text-rose-400',
        bgColor: 'bg-rose-50 dark:bg-rose-950/40'
    },
    {
        id: 'profile',
        label: 'Profile Visits',
        value: '31,840',
        change: '+12.8%',
        isPositive: true,
        icon: Users,
        color: 'text-indigo-600 dark:text-indigo-400',
        bgColor: 'bg-indigo-50 dark:bg-indigo-950/40'
    },
    {
        id: 'inquiries',
        label: 'Client Inquiries',
        value: '28',
        change: '+42.0%',
        isPositive: true,
        icon: MessageSquare,
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/40'
    }
]

const WEEKLY_DATA = [
    { day: 'Mon', views: 18400, likes: 1120, height: '55%' },
    { day: 'Tue', views: 24200, likes: 1480, height: '75%' },
    { day: 'Wed', views: 29800, likes: 1820, height: '92%' },
    { day: 'Thu', views: 22100, likes: 1390, height: '68%' },
    { day: 'Fri', views: 34500, likes: 2150, height: '100%' },
    { day: 'Sat', views: 19800, likes: 1240, height: '60%' },
    { day: 'Sun', views: 16200, likes: 980, height: '48%' },
]

const TOP_PROJECTS = [
    {
        title: 'QuantumPay — NextGen AI Banking App',
        views: '48.9k',
        likes: '3,840',
        shares: '310',
        conversion: '4.8%',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80'
    },
    {
        title: 'Sphere 3D — Geometric Spatial Studio',
        views: '36.2k',
        likes: '2,910',
        shares: '240',
        conversion: '3.9%',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'
    },
    {
        title: 'Nova Design System — Multi-brand tokens',
        views: '28.4k',
        likes: '2,150',
        shares: '180',
        conversion: '5.2%',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80'
    }
]

const TRAFFIC_SOURCES = [
    { source: 'CreateDOT Explore & Feed', percent: 46, color: 'bg-violet-600' },
    { source: 'External Web & Direct Link', percent: 24, color: 'bg-indigo-600' },
    { source: 'Twitter / X & LinkedIn', percent: 18, color: 'bg-sky-500' },
    { source: 'Google Search & SEO', percent: 12, color: 'bg-emerald-500' },
]

const GEOGRAPHY = [
    { country: 'United States', percent: '42%' },
    { country: 'United Kingdom', percent: '18%' },
    { country: 'Germany', percent: '14%' },
    { country: 'Canada', percent: '9%' },
    { country: 'Japan & Others', percent: '17%' },
]

export default function AnalyticsPage() {
    const [timeframe, setTimeframe] = useState('30d')

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0D7] dark:bg-white/10 text-xs font-black text-[#8A6318] dark:text-[#FFE185] uppercase tracking-wider mb-2">
                        <Sparkles className="h-3.5 w-3.5 text-[#FF6B6B]" />
                        Studio Intelligence
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-[#14161F] dark:text-white">
                        Performance & Audience Insights.
                    </h1>
                    <p className="text-sm text-[#647087] dark:text-[#9DA7C2] mt-1">
                        Track portfolio engagement, reach growth, and client discovery metrics in real-time.
                    </p>
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-white/80 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10 rounded-2xl self-start sm:self-auto shadow-sm">
                    {[
                        { id: '7d', label: '7 Days' },
                        { id: '30d', label: '30 Days' },
                        { id: '90d', label: '90 Days' },
                        { id: '1y', label: 'Year' },
                    ].map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTimeframe(t.id)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${timeframe === t.id ? 'bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] shadow-sm' : 'text-[#647087] hover:text-[#14161F] dark:hover:text-white'}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((stat, idx) => {
                    const Icon = stat.icon
                    return (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="p-6 rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 shadow-sm hover:shadow-xl shadow-[#14161F]/5 transition-all backdrop-blur-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div className="p-3 rounded-2xl bg-[#14161F]/5 dark:bg-white/10 text-[#FF6B6B]">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span className="flex items-center gap-1 text-xs font-black text-[#059669] bg-[#10B981]/15 px-2.5 py-0.5 rounded-full">
                                    <TrendingUp className="h-3 w-3" />
                                    {stat.change}
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">{stat.label}</p>
                                <h3 className="text-2xl sm:text-3xl font-black text-[#14161F] dark:text-white mt-1">
                                    {stat.value}
                                </h3>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Primary Chart & Traffic Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Impressions Chart */}
                <div className="lg:col-span-2 p-6 sm:p-8 rounded-[32px] bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 shadow-sm flex flex-col justify-between backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-black text-[#14161F] dark:text-white">Impressions & Reach Trend</h3>
                            <p className="text-xs text-[#647087] dark:text-[#9DA7C2] mt-0.5">Daily view counts across all showcased projects</p>
                        </div>
                        <span className="text-xs font-bold text-[#FF6B6B] bg-[#FF6B6B]/10 px-3 py-1 rounded-full">
                            Peak: 34.5k on Friday
                        </span>
                    </div>

                    {/* Interactive Bar Chart Visualization */}
                    <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-2">
                        {WEEKLY_DATA.map((item, i) => (
                            <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                                <div className="relative w-full flex justify-center">
                                    <div
                                        style={{ height: item.height }}
                                        className="w-full max-w-[48px] rounded-2xl bg-gradient-to-t from-[#FF6B6B] to-[#7950F2] opacity-80 group-hover:opacity-100 group-hover:scale-y-105 transition-all duration-300 shadow-sm shadow-[#FF6B6B]/20"
                                    />
                                    {/* Hover Tooltip */}
                                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#14161F] text-white text-[10px] font-bold py-1 px-2.5 rounded-xl pointer-events-none whitespace-nowrap shadow-md">
                                        {item.views.toLocaleString()} views
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-[#647087] dark:text-[#9DA7C2]">{item.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Traffic Breakdown */}
                <div className="p-6 sm:p-8 rounded-[32px] bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 shadow-sm flex flex-col justify-between backdrop-blur-sm">
                    <div>
                        <h3 className="text-lg font-black text-[#14161F] dark:text-white">Traffic Acquisition</h3>
                        <p className="text-xs text-[#647087] dark:text-[#9DA7C2] mt-0.5">Where your viewers discover your work</p>

                        <div className="mt-6 space-y-4">
                            {TRAFFIC_SOURCES.map(source => (
                                <div key={source.source} className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-[#5A637A] dark:text-[#9DA7C2]">{source.source}</span>
                                        <span className="text-[#14161F] dark:text-white">{source.percent}%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-[#14161F]/5 dark:bg-white/10 overflow-hidden">
                                        <div
                                            style={{ width: `${source.percent}%` }}
                                            className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#FA5252] rounded-full transition-all duration-500"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-[#14161F]/6 dark:border-white/10">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2] mb-3">Top Viewer Locations</h4>
                        <div className="flex flex-wrap gap-2">
                            {GEOGRAPHY.map(geo => (
                                <span key={geo.country} className="text-xs px-2.5 py-1 rounded-full bg-[#14161F]/5 dark:bg-white/10 font-bold text-[#5A637A] dark:text-[#9DA7C2]">
                                    {geo.country} ({geo.percent})
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Performing Projects Table */}
            <div className="p-6 sm:p-8 rounded-[32px] bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-black text-[#14161F] dark:text-white">Top Performing Case Studies</h3>
                        <p className="text-xs text-[#647087] dark:text-[#9DA7C2] mt-0.5">Ranked by total engagement & inquiries converted</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full border-[#14161F]/15 dark:border-white/10 text-xs font-bold">
                        Export CSV
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#14161F]/6 dark:border-white/10 text-xs font-bold text-[#647087] dark:text-[#9DA7C2] uppercase tracking-wider">
                                <th className="pb-3">Project Title</th>
                                <th className="pb-3 text-right">Views</th>
                                <th className="pb-3 text-right">Likes</th>
                                <th className="pb-3 text-right">Shares</th>
                                <th className="pb-3 text-right">Inquiry Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#14161F]/6 dark:divide-white/5">
                            {TOP_PROJECTS.map(proj => (
                                <tr key={proj.title} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition">
                                    <td className="py-4 flex items-center gap-3">
                                        <img
                                            src={proj.image}
                                            alt={proj.title}
                                            className="h-10 w-14 rounded-xl object-cover ring-1 ring-black/5"
                                        />
                                        <span className="font-bold text-[#14161F] dark:text-white truncate max-w-xs sm:max-w-md">
                                            {proj.title}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right font-bold text-[#5A637A] dark:text-[#9DA7C2]">{proj.views}</td>
                                    <td className="py-4 text-right font-bold text-[#5A637A] dark:text-[#9DA7C2]">{proj.likes}</td>
                                    <td className="py-4 text-right font-bold text-[#5A637A] dark:text-[#9DA7C2]">{proj.shares}</td>
                                    <td className="py-4 text-right font-black text-[#10B981]">{proj.conversion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
