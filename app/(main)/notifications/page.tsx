"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Heart, 
  MessageCircle, 
  UserPlus, 
  Award, 
  TrendingUp, 
  Settings, 
  CheckCheck, 
  Trash2, 
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Search,
  Filter,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'award' | 'trending' | 'system';
  title: string;
  message: string;
  avatar?: string | null;
  userInitial?: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  category: 'engagement' | 'social' | 'achievement' | 'system';
}

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'like',
    title: 'Sarah Jenkins liked your design',
    message: '"Cyberpunk 3D Dashboard UI" received a new appreciation.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    timestamp: '2 mins ago',
    isRead: false,
    actionUrl: '/showcase',
    category: 'engagement'
  },
  {
    id: '2',
    type: 'comment',
    title: 'New comment from Marcus Chen',
    message: '"The color contrast and typography hierarchy in this mobile flow look fantastic!"',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    timestamp: '18 mins ago',
    isRead: false,
    actionUrl: '/explore',
    category: 'engagement'
  },
  {
    id: '3',
    type: 'follow',
    title: 'Elena Rostova started following you',
    message: 'Elena added your profile to her favorite creators list.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    timestamp: '1 hour ago',
    isRead: true,
    actionUrl: '/profile',
    category: 'social'
  },
  {
    id: '4',
    type: 'award',
    title: 'Achievement Unlocked: Top Creator',
    message: 'Congratulations! Your portfolio reached over 1,000 views this week.',
    userInitial: 'CD',
    timestamp: '3 hours ago',
    isRead: false,
    actionUrl: '/dashboard',
    category: 'achievement'
  },
  {
    id: '5',
    type: 'trending',
    title: 'Your design is on the Explore Front Page!',
    message: '"Neomorphic Banking App" is currently trending #4 in UI/UX Design.',
    userInitial: 'AI',
    timestamp: '5 hours ago',
    isRead: true,
    actionUrl: '/explore',
    category: 'achievement'
  },
  {
    id: '6',
    type: 'system',
    title: 'CreateDOT 2.0 Feature Release',
    message: 'Explore our new AI Prompt Enhancer & real-time canvas collaboration tools.',
    userInitial: 'SYS',
    timestamp: '1 day ago',
    isRead: true,
    actionUrl: '/tools',
    category: 'system'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'engagement' | 'social' | 'achievement' | 'system'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const toggleReadStatus = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.isRead));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.isRead;
    if (activeTab !== 'all') return n.category === activeTab;
    return true;
  }).filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'like': return <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />;
      case 'comment': return <MessageCircle className="w-4 h-4 text-[#8B5DFF]" />;
      case 'follow': return <UserPlus className="w-4 h-4 text-violet-500" />;
      case 'award': return <Award className="w-4 h-4 text-amber-500" />;
      case 'trending': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      default: return <Sparkles className="w-4 h-4 text-[#8B5DFF]" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0C] text-slate-900 dark:text-slate-100 transition-colors py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#121215] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5DFF]/10 text-[#8B5DFF] flex items-center justify-center relative">
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-[#121215]">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Notifications</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You have {unreadCount} unread update{unreadCount === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button 
                onClick={markAllAsRead} 
                variant="outline" 
                size="sm" 
                className="text-xs font-semibold hover:text-[#8B5DFF]"
              >
                <CheckCheck className="w-3.5 h-3.5 mr-1.5" /> Mark all read
              </Button>
            )}
            <Button 
              onClick={clearAllRead} 
              variant="ghost" 
              size="sm" 
              className="text-xs text-slate-500 hover:text-rose-500"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear read
            </Button>
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="w-4 h-4 text-slate-500" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-[#121215] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All' },
              { id: 'unread', label: `Unread (${unreadCount})` },
              { id: 'engagement', label: 'Engagement' },
              { id: 'social', label: 'Social' },
              { id: 'achievement', label: 'Awards' },
              { id: 'system', label: 'System' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#8B5DFF] text-white shadow-sm shadow-[#8B5DFF]/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Filter updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
          </div>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                    !notification.isRead
                      ? 'bg-white dark:bg-[#121215] border-[#8B5DFF]/30 shadow-md shadow-purple-500/5'
                      : 'bg-white/60 dark:bg-[#121215]/60 border-slate-200/70 dark:border-slate-800/70 opacity-90'
                  }`}
                >
                  {/* Avatar or Icon */}
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      {notification.avatar ? (
                        <AvatarImage src={notification.avatar} />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-tr from-[#8B5DFF] to-indigo-600 text-white font-bold text-xs">
                          {notification.userInitial || 'CD'}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-[#121215] border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
                      {getIcon(notification.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                        {notification.title}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                        {notification.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {notification.message}
                    </p>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 mt-3">
                      {notification.actionUrl && (
                        <Link href={notification.actionUrl}>
                          <Button size="sm" variant="outline" className="h-7 text-[11px] px-3 font-semibold text-[#8B5DFF] hover:bg-[#8B5DFF]/10 border-[#8B5DFF]/30">
                            View details <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      )}
                      <button
                        onClick={() => toggleReadStatus(notification.id)}
                        className="text-[11px] font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        {notification.isRead ? 'Mark unread' : 'Mark read'}
                      </button>
                    </div>
                  </div>

                  {/* Options / Delete */}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-slate-400 hover:text-rose-500 transition p-1"
                    title="Delete notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-[#121215] p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Bell className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  No notifications found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  You're all caught up! When you receive new likes, comments, or system updates, they will appear here.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
