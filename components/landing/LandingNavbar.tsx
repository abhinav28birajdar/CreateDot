"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Upload,
  Bell,
  MessageCircle,
  Menu,
  X,
  Moon,
  Sun,
  Sparkles,
  ChevronDown,
  Briefcase,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Keyboard,
  Command,
  Layout,
  Palette,
  PenTool,
  Box,
  Globe,
  Camera,
  Film,
  Trophy,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "UI/UX Design", icon: Layout, href: "/explore?category=ui-ux" },
  { name: "Graphic Design", icon: Palette, href: "/explore?category=graphic-design" },
  { name: "Illustration", icon: PenTool, href: "/explore?category=illustration" },
  { name: "3D Design", icon: Box, href: "/explore?category=3d" },
  { name: "Web Design", icon: Globe, href: "/explore?category=web-design" },
  { name: "Photography", icon: Camera, href: "/explore?category=photography" },
  { name: "Motion", icon: Film, href: "/explore?category=motion" },
];

const discoverLinks = [
  { name: "Trending Now", icon: TrendingUp, href: "/explore?sort=trending" },
  { name: "Editor's Picks", icon: Trophy, href: "/explore?featured=true" },
  { name: "Fresh Work", icon: Zap, href: "/explore?sort=recent" },
  { name: "Top Creators", icon: Users, href: "/designers" },
];

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showExploreMenu, setShowExploreMenu] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearchOverlay(true);
      }
      if (e.key === "Escape") {
        setShowSearchOverlay(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <span
                className={`text-xl font-bold transition-colors ${
                  isScrolled
                    ? "text-slate-900 dark:text-white"
                    : "text-white"
                }`}
              >
                DesignDot
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Explore Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowExploreMenu(true)}
                onMouseLeave={() => setShowExploreMenu(false)}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isScrolled
                      ? "text-slate-600 hover:text-violet-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-violet-400 dark:hover:bg-slate-800"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Explore
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Mega Menu */}
                <AnimatePresence>
                  {showExploreMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-[600px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-0">
                        {/* Categories */}
                        <div className="p-4 border-r border-slate-100 dark:border-slate-700">
                          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
                            Categories
                          </h4>
                          <div className="space-y-1">
                            {categories.map((category) => (
                              <Link
                                key={category.name}
                                href={category.href}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                              >
                                <category.icon className="w-5 h-5" />
                                <span className="font-medium">{category.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Discover */}
                        <div className="p-4">
                          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
                            Discover
                          </h4>
                          <div className="space-y-1">
                            {discoverLinks.map((link) => (
                              <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                              >
                                <link.icon className="w-5 h-5" />
                                <span className="font-medium">{link.name}</span>
                              </Link>
                            ))}
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                            <Link
                              href="/explore"
                              className="block text-center py-2 text-violet-600 dark:text-violet-400 font-medium hover:underline"
                            >
                              View All Categories →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/shots"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isScrolled
                    ? "text-slate-600 hover:text-violet-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-violet-400"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                Shots
              </Link>

              <Link
                href="/designers"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isScrolled
                    ? "text-slate-600 hover:text-violet-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-violet-400"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                Designers
              </Link>

              <Link
                href="/jobs"
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  isScrolled
                    ? "text-slate-600 hover:text-violet-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-violet-400"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                Jobs
                <span className="px-1.5 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                  12
                </span>
              </Link>

              <Link
                href="/hire"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isScrolled
                    ? "text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30"
                    : "text-green-300 hover:text-green-200 hover:bg-green-500/20"
                }`}
              >
                <Briefcase className="w-4 h-4 inline mr-1" />
                Hire
              </Link>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <button
                onClick={() => setShowSearchOverlay(true)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-colors ${
                  isScrolled
                    ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"
                    : "bg-white/10 border-white/20 text-white/60"
                }`}
              >
                <Search className="w-5 h-5" />
                <span className="flex-1 text-left">Search for inspiration...</span>
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white/10 rounded text-xs">
                  <Command className="w-3 h-3" />K
                </kbd>
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Auth Buttons */}
              <Link
                href="/sign-in"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isScrolled
                    ? "text-slate-600 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Sign In
              </Link>

              <Link href="/get-started">
                <Button
                  className={`font-semibold px-6 ${
                    isScrolled
                      ? "bg-violet-600 hover:bg-violet-700 text-white"
                      : "bg-white text-violet-600 hover:bg-white/90"
                  }`}
                >
                  Join Free
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled
                  ? "text-slate-600 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
            >
              <div className="p-4 space-y-4">
                {/* Mobile Search */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowSearchOverlay(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500"
                >
                  <Search className="w-5 h-5" />
                  <span>Search for inspiration...</span>
                </button>

                {/* Mobile Nav Links */}
                <div className="space-y-2">
                  <Link
                    href="/explore"
                    className="block px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                  >
                    Explore
                  </Link>
                  <Link
                    href="/shots"
                    className="block px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                  >
                    Shots
                  </Link>
                  <Link
                    href="/designers"
                    className="block px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                  >
                    Designers
                  </Link>
                  <Link
                    href="/jobs"
                    className="flex items-center justify-between px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                  >
                    Jobs
                    <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                      12
                    </span>
                  </Link>
                  <Link
                    href="/hire"
                    className="block px-4 py-3 rounded-lg text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 font-medium"
                  >
                    Hire Designers
                  </Link>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-2">
                  <Link
                    href="/sign-in"
                    className="block w-full text-center px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/get-started"
                    className="block w-full text-center px-4 py-3 rounded-xl bg-violet-600 text-white font-semibold"
                  >
                    Join Free
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearchOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSearchOverlay(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl mx-auto mt-20 p-4"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-4 p-4 border-b border-slate-200 dark:border-slate-700">
                  <Search className="w-6 h-6 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search for inspiration..."
                    autoFocus
                    className="flex-1 bg-transparent text-lg text-slate-900 dark:text-white placeholder-slate-400 outline-none"
                  />
                  <button
                    onClick={() => setShowSearchOverlay(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Quick Links */}
                <div className="p-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Trending Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Dashboard UI", "Mobile App", "Logo Design", "3D Illustration", "Landing Page"].map((term) => (
                      <button
                        key={term}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
