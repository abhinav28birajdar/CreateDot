"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Compass,
  Upload,
  MessageSquare,
  Bell,
  User,
  Search,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
  Briefcase,
  Heart,
  Bookmark,
  Users,
  Award,
  HelpCircle,
  Moon,
  Sun,
  Plus,
  Command,
  X,
  Menu,
  Folder,
  TrendingUp,
  Star,
  Zap,
  Crown,
  Image as ImageIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Navigation items
const mainNavItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/community", label: "Community", icon: Users },
];

// Create menu items
const createMenuItems = [
  { href: "/create/design", label: "New Design", icon: ImageIcon, description: "Upload a new project" },
  { href: "/create/collection", label: "New Collection", icon: Folder, description: "Organize your work" },
  { href: "/create/mood-board", label: "Mood Board", icon: Heart, description: "Create inspiration board" },
];

// Quick actions for search
const quickActions = [
  { icon: TrendingUp, label: "Trending", href: "/explore?filter=trending" },
  { icon: Star, label: "Following", href: "/home?filter=following" },
  { icon: Zap, label: "Fresh", href: "/explore?filter=fresh" },
  { icon: Award, label: "Featured", href: "/explore?filter=featured" },
];

// User menu items
const userMenuItems = [
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/collections", label: "My Collections", icon: Folder },
  { href: "/bookmarks", label: "Saved", icon: Bookmark },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help Center", icon: HelpCircle },
];

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "hire" | "mention";
  user: { name: string; avatar: string };
  content: string;
  time: string;
  read: boolean;
  link: string;
}

// Mock notifications
const mockNotifications: Notification[] = [
  { id: "1", type: "like", user: { name: "Sarah Chen", avatar: "" }, content: "liked your project", time: "2m", read: false, link: "/project/1" },
  { id: "2", type: "follow", user: { name: "Alex Morgan", avatar: "" }, content: "started following you", time: "1h", read: false, link: "/u/alex" },
  { id: "3", type: "comment", user: { name: "Jordan Lee", avatar: "" }, content: "commented on your design", time: "3h", read: true, link: "/project/2" },
  { id: "4", type: "hire", user: { name: "TechCorp Inc.", avatar: "" }, content: "wants to hire you", time: "5h", read: true, link: "/messages" },
];

interface AuthenticatedNavbarProps {
  user?: {
    name: string;
    username: string;
    avatar: string;
    isPro?: boolean;
  };
}

export default function AuthenticatedNavbar({ user }: AuthenticatedNavbarProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchHistory, setSearchHistory] = useState<string[]>(["Dashboard design", "Mobile app", "Brand identity"]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const createMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Mock user data
  const currentUser = user || {
    name: "John Doe",
    username: "johndoe",
    avatar: "",
    isPro: true,
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsCreateMenuOpen(false);
        setIsUserMenuOpen(false);
        setIsNotificationsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (createMenuRef.current && !createMenuRef.current.contains(e.target as Node)) {
        setIsCreateMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to search history
      setSearchHistory([searchQuery, ...searchHistory.slice(0, 4)]);
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border-b border-slate-200 dark:border-[#1F1F1F] z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/home" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="hidden sm:block text-lg font-bold text-slate-900 dark:text-white">
                DesignDot
              </span>
            </Link>

            {/* Main Navigation - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#111111]"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-xl hidden md:block">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-100 dark:bg-[#111111] rounded-xl text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="flex-1 text-left">Search designs, creators, collections...</span>
              <kbd className="hidden lg:flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-700 rounded text-xs text-slate-400">
                <Command className="w-3 h-3" />K
              </kbd>
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#111111]"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Create Button */}
            <div ref={createMenuRef} className="relative">
              <button
                onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Create</span>
              </button>

              <AnimatePresence>
                {isCreateMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#111111] rounded-xl shadow-xl border border-slate-200 dark:border-[#2A2A2A] overflow-hidden"
                  >
                    {createMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsCreateMenuOpen(false)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">
                            {item.label}
                          </div>
                          <div className="text-sm text-slate-500">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Messages */}
            <Link
              href="/messages"
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#111111]"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-violet-600 rounded-full" />
            </Link>

            {/* Notifications */}
            <div ref={notificationsRef} className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#111111]"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#111111] rounded-xl shadow-xl border border-slate-200 dark:border-[#2A2A2A] overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-[#2A2A2A]">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        Notifications
                      </h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-violet-600 hover:text-violet-700"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <Link
                            key={notification.id}
                            href={notification.link}
                            onClick={() => setIsNotificationsOpen(false)}
                            className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                              !notification.read ? "bg-violet-50 dark:bg-violet-900/20" : ""
                            }`}
                          >
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={notification.user.avatar} />
                              <AvatarFallback>
                                {notification.user.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-900 dark:text-white">
                                <span className="font-medium">{notification.user.name}</span>{" "}
                                {notification.content}
                              </p>
                              <p className="text-xs text-slate-500">{notification.time} ago</p>
                            </div>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-violet-600 rounded-full" />
                            )}
                          </Link>
                        ))
                      ) : (
                        <div className="py-12 text-center text-slate-500">
                          No notifications yet
                        </div>
                      )}
                    </div>

                    <Link
                      href="/notifications"
                      className="block px-4 py-3 text-center text-sm text-violet-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 border-t border-slate-200 dark:border-[#2A2A2A]"
                    >
                      View all notifications
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#111111] transition-colors"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="bg-violet-600 text-white">
                    {currentUser.name[0]}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#111111] rounded-xl shadow-xl border border-slate-200 dark:border-[#2A2A2A] overflow-hidden"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-[#2A2A2A]">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={currentUser.avatar} />
                          <AvatarFallback className="bg-violet-600 text-white text-lg">
                            {currentUser.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900 dark:text-white">
                              {currentUser.name}
                            </span>
                            {currentUser.isPro && (
                              <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-[#8B5DFF] from-amber-500 to-orange-500 text-white text-xs rounded">
                                <Crown className="w-3 h-3" />
                                PRO
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-slate-500">@{currentUser.username}</div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <item.icon className="w-5 h-5" />
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {/* Dark Mode Toggle */}
                    <div className="px-4 py-2 border-t border-slate-200 dark:border-[#2A2A2A]">
                      <button
                        onClick={toggleDarkMode}
                        className="w-full flex items-center justify-between py-2 text-slate-700 dark:text-slate-300"
                      >
                        <div className="flex items-center gap-3">
                          {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                          <span>Dark Mode</span>
                        </div>
                        <div
                          className={`w-10 h-6 rounded-full transition-colors ${
                            isDarkMode ? "bg-violet-600" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full shadow transition-transform mt-0.5 ${
                              isDarkMode ? "translate-x-4.5 ml-0.5" : "translate-x-0.5"
                            }`}
                          />
                        </div>
                      </button>
                    </div>

                    {/* Upgrade to Pro */}
                    {!currentUser.isPro && (
                      <div className="px-4 py-3 border-t border-slate-200 dark:border-[#2A2A2A]">
                        <Link
                          href="/pricing"
                          className="flex items-center justify-center gap-2 w-full py-2 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 text-white rounded-lg font-medium"
                        >
                          <Zap className="w-4 h-4" />
                          Upgrade to Pro
                        </Link>
                      </div>
                    )}

                    {/* Logout */}
                    <div className="border-t border-slate-200 dark:border-[#2A2A2A]">
                      <button
                        onClick={() => {
                          // Handle logout
                          window.location.href = "/sign-in";
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#111111]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0B0B0C]/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-white dark:bg-[#111111] z-50 md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-[#1F1F1F]">
                <span className="font-bold text-slate-900 dark:text-white">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#111111]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#111111]"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0B0B0C]/50 z-50"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            >
              <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-2xl overflow-hidden">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search designs, creators, collections..."
                    className="w-full pl-12 pr-12 py-4 bg-transparent text-lg text-slate-900 dark:text-white placeholder-slate-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </form>

                {/* Quick Actions */}
                <div className="px-4 py-3 border-t border-slate-200 dark:border-[#2A2A2A]">
                  <div className="text-xs font-medium text-slate-500 uppercase mb-2">
                    Quick Actions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                      <Link
                        key={action.label}
                        href={action.href}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      >
                        <action.icon className="w-4 h-4" />
                        {action.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div className="px-4 py-3 border-t border-slate-200 dark:border-[#2A2A2A]">
                    <div className="text-xs font-medium text-slate-500 uppercase mb-2">
                      Recent Searches
                    </div>
                    <div className="space-y-1">
                      {searchHistory.map((query, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(query);
                            searchInputRef.current?.focus();
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-left"
                        >
                          <Search className="w-4 h-4 text-slate-400" />
                          {query}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="px-4 py-3 bg-slate-50 dark:bg-[#111111] border-t border-slate-200 dark:border-[#2A2A2A] text-sm text-slate-500">
                  Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#111111] rounded text-xs">Enter</kbd> to search, <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#111111] rounded text-xs">Esc</kbd> to close
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
