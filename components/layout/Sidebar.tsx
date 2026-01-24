'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Home, Compass, TrendingUp, Search, Folder, Grid, MessageSquare, BarChart, Briefcase, ShoppingBag, Settings } from 'lucide-react'

const sidebarItems = [
  { name: 'Feed', href: '/feed', icon: Home },
  { name: 'Explore', href: '/explore', icon: Compass },
  { name: 'Trending', href: '/trending', icon: TrendingUp },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Projects', href: '/projects', icon: Folder },
  { name: 'Collections', href: '/collections', icon: Grid },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 bg-background", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname?.startsWith(item.href) ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
