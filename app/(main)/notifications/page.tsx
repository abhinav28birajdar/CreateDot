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
  Search,
  Check,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import { useAuth } from '@/contexts/auth-context';

export default function NotificationsPage() {
  const { user } = useAuth();
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'like' | 'comment' | 'follow' | 'system'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.is_read;
    if (activeTab !== 'all') return n.type === activeTab;
    return true;
  }).filter(n => 
    (n.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
     n.message?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />;
      case 'comment': return <MessageCircle className="w-4 h-4 text-[#8B5DFF]" />;
      case 'follow': return <UserPlus className="w-4 h-4 text-violet-500" />;
      case 'award': return <Award className="w-4 h-4 text-amber-500" />;
      case 'trending': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      default: return <Sparkles className="w-4 h-4 text-[#8B5DFF]" />;
    }
  };

  const formatTimestamp = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return 'Recently';
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
              { id: 'like', label: 'Likes' },
              { id: 'comment', label: 'Comments' },
              { id: 'follow', label: 'Follows' },
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
          {isLoading ? (
            <div className="bg-white dark:bg-[#121215] p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 text-center">
              <Loader2 className="w-8 h-8 text-[#8B5DFF] animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-500">Loading your live notifications...</p>
            </div>
          ) : (
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
                      !notification.is_read
                        ? 'bg-white dark:bg-[#121215] border-[#8B5DFF]/30 shadow-md shadow-purple-500/5'
                        : 'bg-white/60 dark:bg-[#121215]/60 border-slate-200/70 dark:border-slate-800/70 opacity-90'
                    }`}
                  >
                    {/* Avatar or Icon */}
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-10 w-10">
                        {notification.actor?.avatar_url ? (
                          <AvatarImage src={notification.actor.avatar_url} />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-tr from-[#8B5DFF] to-indigo-600 text-white font-bold text-xs">
                            {notification.actor?.full_name?.charAt(0) || notification.actor?.username?.charAt(0) || 'CD'}
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
                          {formatTimestamp(notification.created_at || '')}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {notification.message}
                      </p>

                      {/* Action buttons */}
                      <div className="flex items-center gap-3 mt-3">
                        {notification.action_url && (
                          <Link href={notification.action_url}>
                            <Button size="sm" variant="outline" className="h-7 text-[11px] px-3 font-semibold text-[#8B5DFF] hover:bg-[#8B5DFF]/10 border-[#8B5DFF]/30">
                              View details <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </Link>
                        )}
                        {!notification.is_read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-[11px] font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Mark read
                          </button>
                        )}
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
                    No notifications yet
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    You&apos;re completely up to date! Real-time notifications for likes, comments, and messages will arrive here automatically.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

      </div>
    </div>
  );
}
