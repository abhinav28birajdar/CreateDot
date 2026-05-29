"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/Dropdown";

export function Header() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/explore", label: "Explore", icon: "🔍" },
    { href: "/trending", label: "Trending", icon: "🔥" },
    { href: "/jobs", label: "Jobs", icon: "💼" },
  ];

  const userMenuItems = [
    { id: "profile", label: "👤 My Profile", onClick: () => window.location.href = `/profile/${user?.username}` },
    { id: "dashboard", label: "📊 Dashboard", onClick: () => window.location.href = "/dashboard" },
    { id: "upload", label: "📤 Upload Project", onClick: () => window.location.href = "/upload" },
    { id: "collections", label: "⭐ Collections", onClick: () => window.location.href = "/collections" },
    { id: "divider1", divider: true } as any,
    { id: "settings", label: "⚙️ Settings", onClick: () => window.location.href = "/settings" },
    { id: "divider2", divider: true } as any,
    {
      id: "logout",
      label: "🚪 Sign Out",
      onClick: async () => {
        await signOut();
        window.location.href = "/login";
      },
    },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-lg border-b border-[#2A2A2A]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition">
          <div className="w-9 h-9 rounded-lg bg-[#4300FF] flex items-center justify-center text-white text-sm font-bold">
            CD
          </div>
          <span className="hidden sm:inline text-[#FFFFFF]">CreateDot</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-[#B3B3B3] hover:text-[#4300FF] transition-colors font-medium text-sm"
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Notifications */}
              <Link
                href="/notifications"
                className="relative p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors"
              >
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>

              {/* Messages */}
              <Link
                href="/messages"
                className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors"
              >
                <span className="text-xl">💬</span>
              </Link>

              {/* User Menu Dropdown */}
              <Dropdown
                trigger={
                  <Avatar
                    src={user.avatar_url || ""}
                    alt={user.full_name || user.username || "User"}
                    size="sm"
                    className="cursor-pointer hover:ring-2 hover:ring-[#4300FF] transition"
                  />
                }
                items={userMenuItems}
                align="right"
              />
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/login")}>
                Sign In
              </Button>
              <Button size="sm" onClick={() => (window.location.href = "/signup")}>
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-[#1A1A1A] rounded-lg"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#2A2A2A] bg-[#121212]">
          <nav className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-[#B3B3B3] hover:text-[#4300FF] hover:bg-[#1A1A1A] rounded-lg transition-colors"
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;

