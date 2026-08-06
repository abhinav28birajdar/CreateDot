"use client";

import type React from "react";
import Link from "next/link";
import { AuthProvider } from "@/contexts/auth-context";
import { SocketProvider } from "@/contexts/SocketContext";
import { Palette, Search, Bell, Menu, ChevronDown, User, Settings, LogOut, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";

function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Main Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 bg-[#8B5DFF] flex items-center justify-center rounded-md text-white mr-2">
                <Palette className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-[#8B5DFF] ">
                CreateDOT
              </span>
            </Link>

            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/community"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Community
              </Link>
              <Link
                href="/marketplace"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Marketplace
              </Link>
              <div className="relative group">
                <button className="text-gray-500 group-hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center">
                  Create
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 w-48 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    <Link
                      href="/create/design"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      New Design
                    </Link>
                    <Link
                      href="/share"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Share Work
                    </Link>
                    <Link
                      href="/create/template"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      From Template
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="text-gray-500 hover:text-gray-900">
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <Link href="/notifications" className="text-gray-500 hover:text-gray-900 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#8B5DFF] ring-2 ring-white" />
            </Link>

            {/* Mobile Menu (visible on small screens) */}
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-900">
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* User Menu (visible on medium screens and above) */}
            {user ? (
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900">
                      <div className="h-8 w-8 rounded-full bg-[#8B5DFF]/10 flex items-center justify-center">
                        {user.avatar_url ? (
                          <img
                            src={user.avatar_url}
                            alt="User"
                            className="h-8 w-8 rounded-full"
                          />
                        ) : (
                          <User className="h-5 w-5 text-[#8B5DFF]" />
                        )}
                      </div>
                      <span className="font-medium">
                        {user.full_name || user.username || user.email?.split("@")[0]}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/messages" className="flex items-center">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex md:items-center md:space-x-2">
                <Link href="/sign-in">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="sm"
                    className="bg-[#8B5DFF] hover:bg-[#7B4DE5] text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SocketProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </SocketProvider>
    </AuthProvider>
  );
}
