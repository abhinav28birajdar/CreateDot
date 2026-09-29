'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaCompass,
  FaMagnifyingGlass,
  FaBell,
  FaComments,
  FaPlus,
  FaWandMagicSparkles,
} from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserMenu } from './user-menu'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/feed', label: 'Feed' },
    { href: '/explore', label: 'Discover' },
    { href: '/trending', label: 'Trending' },
    { href: '/jobs', label: 'Hiring', badge: 'Live' },
    { href: '/marketplace', label: 'Market' },
    { href: '/workflows/smart-case-studies', label: 'Studio AI', isAi: true },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#14161F]/6 dark:border-white/10 bg-[#FAF7F0]/85 dark:bg-[#111420]/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#14161F] text-white shadow-md shadow-[#14161F]/15 group-hover:rotate-6 transition-transform">
              <FaCompass className="h-5 w-5 text-[#FF6B6B]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-[#14161F] dark:text-white">
                CreateDOT<span className="text-[#FF6B6B]">.</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#69728B] dark:text-[#9DA7C2]">
                Curated Guild
              </span>
            </div>
          </Link>

          {/* Nav Pills Bar */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-[#14161F]/8 dark:border-white/10 bg-white/70 dark:bg-white/5 p-1.5 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.isAi && pathname?.startsWith('/workflows'))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#14161F] text-white shadow-sm dark:bg-white dark:text-[#14161F]'
                      : 'text-[#576075] hover:text-[#14161F] dark:text-[#9DA7C2] dark:hover:text-white'
                  }`}
                >
                  {link.isAi && <FaWandMagicSparkles className="text-[11px] text-[#FF6B6B]" />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded-full bg-[#10B981]/15 px-1.5 py-0.2 text-[9px] font-extrabold text-[#059669] dark:text-[#34D399]">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right Action Stack */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative hidden md:block">
            <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8C96AB]" />
            <Input
              placeholder="Search works, creators..."
              className="pl-9 pr-4 h-10 w-[200px] xl:w-[260px] rounded-full border border-[#14161F]/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-xs font-medium placeholder:text-[#8C96AB] focus-visible:ring-1 focus-visible:ring-[#FF6B6B]"
            />
          </div>

          {/* Notifications */}
          <Link href="/notifications">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#576075] dark:text-[#9DA7C2]"
            >
              <FaBell className="h-4 w-4" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-[#FF6B6B] ring-2 ring-[#FAF7F0] dark:ring-[#111420]" />
              <span className="sr-only">Notifications</span>
            </Button>
          </Link>

          {/* Messages */}
          <Link href="/messages">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#576075] dark:text-[#9DA7C2]"
            >
              <FaComments className="h-4 w-4" />
              <span className="sr-only">Messages</span>
            </Button>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Share Work Action */}
          <Link href="/upload">
            <Button
              size="sm"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 rounded-full bg-[#FF6B6B] hover:bg-[#F35555] px-5 text-xs font-bold text-white shadow-md shadow-[#FF6B6B]/25 transition-all hover:shadow-lg"
            >
              <FaPlus className="h-3 w-3" />
              <span>Share Work</span>
            </Button>
          </Link>

          {/* User Profile Menu */}
          <UserMenu />
        </div>
      </div>
    </nav>
  )
}
