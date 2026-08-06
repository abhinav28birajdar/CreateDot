"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import {
  Sparkles,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Search,
  Brain,
  LayoutDashboard,
  Palette
} from "lucide-react"

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create", badge: "AI" },
  { href: "/explore", label: "Explore" },
  { href: "/explore/ai-insights", label: "AI Insights", badge: "New" },
]

export function Navbar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container-fluid max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
            <div className="w-10 h-10 bg-[#8B5DFF] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold designly-text-gradient">CreateDOT</span>
              <div className="text-xs text-gray-500 font-medium">AI-Powered Creative Engine</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center space-x-2 text-sm font-medium transition-all duration-200 hover:text-purple-600 group ${
                  isActiveLink(link.href)
                    ? "text-purple-600 font-semibold"
                    : "text-gray-600"
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <Badge className="text-xs bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200">
                    {link.badge}
                  </Badge>
                )}
                {isActiveLink(link.href) && (
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-purple-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-gray-600 hover:text-purple-600 hover:bg-purple-50">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 border-2 border-purple-100">
                        <AvatarImage src="" alt="" />
                        <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">
                          {user.email?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg" align="end">
                    <div className="px-3 py-2">
                      <p className="font-medium text-gray-900">User</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-gray-600 hover:text-purple-600 hover:bg-purple-50">
                    Sign In
                  </Button>
                </Link>
                <Link href="/create">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Creating
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-10 w-10 px-0"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-6 space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActiveLink(link.href)
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <Badge className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <Link href="/dashboard">
                      <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-purple-600 hover:bg-purple-50">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/sign-in" className="block">
                      <Button variant="ghost" className="w-full justify-start">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/create" className="block">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Start Creating
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
