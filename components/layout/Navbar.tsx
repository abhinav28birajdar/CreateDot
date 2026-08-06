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
      <div className="container flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="mr-8 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#8B5DFF] to-violet-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-[#8B5DFF]/20">
              CD
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[#8B5DFF] via-purple-500 to-indigo-600 bg-clip-text text-transparent">
              CreateDOT
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="transition-colors hover:text-[#8B5DFF] text-muted-foreground">
              Dashboard
            </Link>
            <Link href="/explore" className="transition-colors hover:text-[#8B5DFF] text-muted-foreground">
              Explore
            </Link>
            <Link href="/tools" className="transition-colors hover:text-[#8B5DFF] text-muted-foreground">
              Tools
            </Link>
            <Link href="/showcase" className="transition-colors hover:text-[#8B5DFF] text-muted-foreground">
              Showcase
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-[#8B5DFF] text-muted-foreground">
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search creative projects, tools, designers..."
                className="pl-9 h-9 md:w-[260px] lg:w-[340px] bg-muted/40 focus:bg-background transition"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative hover:text-[#8B5DFF] hover:bg-[#8B5DFF]/10">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#8B5DFF] ring-2 ring-background" />
                <span className="sr-only">Notifications</span>
              </Button>
            </Link>
            <Link href="/messages">
              <Button variant="ghost" size="icon" className="hover:text-[#8B5DFF] hover:bg-[#8B5DFF]/10">
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only">Messages</span>
              </Button>
            </Link>
            <ThemeToggle />
            <Link href="/create/design">
              <Button size="sm" className="hidden sm:flex bg-[#8B5DFF] hover:bg-[#7B4DE5] text-white shadow-sm shadow-[#8B5DFF]/30">
                <Plus className="mr-1.5 h-4 w-4" />
                Create
              </Button>
            </Link>
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
