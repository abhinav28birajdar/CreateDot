"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/enhanced-button";
import { useAuth } from "@/contexts/auth-context";
import {
  User,
  Settings,
  LogOut,
  Palette,
  Sparkles,
  LayoutDashboard,
  Search,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { href: "/", label: "Home", icon: null },
  { href: "/create", label: "Create AI Design", icon: Sparkles },
  { href: "/explore", label: "Explore Gallery", icon: Search },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, authRequired: true },
  { href: "/explore/ai-options", label: "AI Options", icon: Palette },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUserMenuOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="aakar-navbar sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-[#8B5DFF] from-aakar-green-600 to-aakar-green-700 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-heading font-bold aakar-text-gradient">
                Aakar
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => {
              if (link.authRequired && !user) return null;
              
              const Icon = link.icon;
              const isActive = isActiveLink(link.href);
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "text-aakar-green-700 font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-aakar-green-600 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="w-8 h-8 bg-aakar-green-100 text-aakar-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
                    {(profile?.full_name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
                
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg"
                    >
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium">{profile?.full_name || profile?.username || user.email?.split("@")[0] || "User"}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                        <Link
                          href="/profile/settings"
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-accent"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button variant="primary" asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navigationLinks.map((link) => {
                if (link.authRequired && !user) return null;
                
                const Icon = link.icon;
                const isActive = isActiveLink(link.href);
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-aakar-green-50 text-aakar-green-700 border border-aakar-green-200"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
