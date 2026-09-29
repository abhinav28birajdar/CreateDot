'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  FaHouse,
  FaCompass,
  FaArrowTrendUp,
  FaMagnifyingGlass,
  FaFolder,
  FaTableCellsLarge,
  FaChartSimple,
  FaComments,
  FaBriefcase,
  FaUserCheck,
  FaBagShopping,
  FaTrophy,
  FaGraduationCap,
  FaGear,
  FaWandMagicSparkles,
  FaArrowRight,
} from 'react-icons/fa6'

const primaryNav = [
  { name: 'Feed', href: '/feed', icon: FaHouse },
  { name: 'Explore', href: '/explore', icon: FaCompass },
  { name: 'Trending', href: '/trending', icon: FaArrowTrendUp },
  { name: 'Search', href: '/search', icon: FaMagnifyingGlass },
]

const workspaceNav = [
  { name: 'Projects', href: '/projects', icon: FaFolder },
  { name: 'Studio AI', href: '/workflows/smart-case-studies', icon: FaWandMagicSparkles },
  { name: 'Collections', href: '/collections', icon: FaTableCellsLarge },
  { name: 'Analytics', href: '/analytics', icon: FaChartSimple },
  { name: 'Messages', href: '/messages', icon: FaComments },
]

const ecosystemNav = [
  { name: 'Jobs Board', href: '/jobs', icon: FaBriefcase },
  { name: 'Hire Talent', href: '/hire', icon: FaUserCheck },
  { name: 'Marketplace', href: '/marketplace', icon: FaBagShopping },
  { name: 'Challenges', href: '/challenges', icon: FaTrophy },
  { name: 'Masterclasses', href: '/learn', icon: FaGraduationCap },
  { name: 'Settings', href: '/settings', icon: FaGear },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  const renderNavGroup = (title: string, items: typeof primaryNav) => (
    <div className="space-y-1 mb-6">
      <p className="px-3 text-[10px] font-black uppercase tracking-widest text-[#8C96AB] mb-2">
        {title}
      </p>
      {items.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== '/feed' && pathname?.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all",
              isActive
                ? "bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] shadow-sm shadow-black/10"
                : "text-[#5A637A] hover:text-[#14161F] hover:bg-black/[0.04] dark:text-[#9DA7C2] dark:hover:text-white dark:hover:bg-white/[0.06]"
            )}
          >
            <item.icon className={cn("h-3.5 w-3.5", isActive ? "text-[#FF6B6B]" : "text-[#7A849E]")} />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </div>
  )

  return (
    <aside
      className={cn(
        "w-64 border-r border-[#14161F]/6 dark:border-white/10 bg-[#FAF7F0] dark:bg-[#111420] px-4 py-6 flex flex-col justify-between overflow-y-auto selection:bg-[#FF6B6B]/20 selection:text-[#FF6B6B]",
        className
      )}
    >
      <div>
        {renderNavGroup("Discover", primaryNav)}
        {renderNavGroup("Studio & Craft", workspaceNav)}
        {renderNavGroup("Opportunities", ecosystemNav)}
      </div>

      {/* Pro Badge Card */}
      <div className="rounded-3xl border border-[#14161F]/8 dark:border-white/10 bg-gradient-to-br from-white/90 to-[#FAF0D7]/70 dark:from-white/5 dark:to-white/[0.02] p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#FF6B6B] text-white">
            <FaWandMagicSparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-xs font-black text-[#14161F] dark:text-white">CreateDOT Pro</p>
            <p className="text-[10px] text-[#6E7892]">Zero platform fees</p>
          </div>
        </div>
        <Link
          href="/pricing"
          className="mt-3 flex items-center justify-between rounded-xl bg-[#14161F] dark:bg-white px-3 py-2 text-[11px] font-bold text-white dark:text-[#14161F] transition hover:opacity-90"
        >
          <span>Upgrade now</span>
          <FaArrowRight className="h-3 w-3 text-[#FF6B6B]" />
        </Link>
      </div>
    </aside>
  )
}
