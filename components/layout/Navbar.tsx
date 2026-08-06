'use client'

import Link from 'next/link'
import { Bell, MessageSquare, Search, Plus, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserMenu } from './user-menu'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-8 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Logo would go here */}
            <span className="hidden font-bold sm:inline-block text-xl tracking-tight">
              CreateDOT
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/explore" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Explore
            </Link>
            <Link href="/jobs" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Jobs
            </Link>
            <Link href="/learn" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Learn
            </Link>
            <Link href="/pro" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Pro
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8 h-9 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only">Messages</span>
            </Button>
            <ThemeToggle />
            <Button size="sm" className="hidden sm:flex">
              <Plus className="mr-2 h-4 w-4" />
              Upload
            </Button>
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
