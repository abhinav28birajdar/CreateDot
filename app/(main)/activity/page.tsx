"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Heart,
  MessageCircle,
  UserPlus,
  Star,
  Award,
  Briefcase,
  Eye,
  Bookmark,
  Share2,
  Trophy,
  Upload,
  Bell,
  Settings,
  Filter,
  CheckCircle,
  Clock,
  Image,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
type ActivityType =
  | "like"
  | "comment"
  | "follow"
  | "bookmark"
  | "share"
  | "mention"
  | "upload"
  | "award"
  | "hire"
  | "collection_add";

interface ActivityItem {
  id: string;
  type: ActivityType;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  target?: {
    type: string;
    title: string;
    thumbnail?: string;
    id: string;
  };
  content?: string;
  timestamp: string;
  isRead: boolean;
}

interface ActivityGroup {
  date: string;
  activities: ActivityItem[];
}

// ============ MOCK DATA ============
const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "like",
    user: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", username: "sarahchen" },
    target: { type: "project", title: "Minimal Dashboard UI Kit", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200", id: "p1" },
    timestamp: "2025-01-12T10:30:00",
    isRead: false,
  },
  {
    id: "2",
    type: "comment",
    user: { name: "Marcus Lee", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", username: "marcuslee" },
    target: { type: "project", title: "E-commerce Mobile App", thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=200", id: "p2" },
    content: "This is absolutely stunning! Love the attention to detail in the micro-interactions.",
    timestamp: "2025-01-12T09:15:00",
    isRead: false,
  },
  {
    id: "3",
    type: "follow",
    user: { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", username: "emmawilson" },
    timestamp: "2025-01-12T08:00:00",
    isRead: false,
  },
  {
    id: "4",
    type: "award",
    user: { name: "DesignDot Team", avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100", username: "designdot" },
    target: { type: "project", title: "3D Abstract Shapes Collection", thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200", id: "p3" },
    content: "Your project was featured as Pick of the Day!",
    timestamp: "2025-01-11T18:00:00",
    isRead: true,
  },
  {
    id: "5",
    type: "mention",
    user: { name: "Alex Turner", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", username: "alexturner" },
    target: { type: "comment", title: "Brand Identity System Discussion", id: "c1" },
    content: "@you What do you think about this color palette?",
    timestamp: "2025-01-11T14:30:00",
    isRead: true,
  },
  {
    id: "6",
    type: "hire",
    user: { name: "Jordan Park", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", username: "jordanpark" },
    content: "Sent you a project inquiry for a mobile app redesign.",
    timestamp: "2025-01-11T11:00:00",
    isRead: true,
  },
  {
    id: "7",
    type: "collection_add",
    user: { name: "Mia Rodriguez", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", username: "miarodriguez" },
    target: { type: "project", title: "Landing Page Redesign", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200", id: "p4" },
    content: "Added to collection: Top UI Designs 2025",
    timestamp: "2025-01-10T16:45:00",
    isRead: true,
  },
  {
    id: "8",
    type: "upload",
    user: { name: "Chris Anderson", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100", username: "chrisanderson" },
    target: { type: "project", title: "Fintech Dashboard Design", thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200", id: "p5" },
    timestamp: "2025-01-10T12:00:00",
    isRead: true,
  },
  {
    id: "9",
    type: "like",
    user: { name: "Nina Patel", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", username: "ninapatel" },
    target: { type: "project", title: "E-commerce Mobile App", thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=200", id: "p2" },
    timestamp: "2025-01-10T09:30:00",
    isRead: true,
  },
  {
    id: "10",
    type: "follow",
    user: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100", username: "davidkim" },
    timestamp: "2025-01-09T20:00:00",
    isRead: true,
  },
];

// ============ ACTIVITY ICON ============
function ActivityIcon({ type }: { type: ActivityType }) {
  const iconConfig: Record<ActivityType, { icon: React.ReactNode; color: string; bg: string }> = {
    like: { icon: <Heart className="w-4 h-4" />, color: "text-rose-500", bg: "bg-rose-100 dark:bg-rose-900/30" },
    comment: { icon: <MessageCircle className="w-4 h-4" />, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    follow: { icon: <UserPlus className="w-4 h-4" />, color: "text-violet-500", bg: "bg-violet-100 dark:bg-violet-900/30" },
    bookmark: { icon: <Bookmark className="w-4 h-4" />, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30" },
    share: { icon: <Share2 className="w-4 h-4" />, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
    mention: { icon: <Star className="w-4 h-4" />, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
    upload: { icon: <Upload className="w-4 h-4" />, color: "text-cyan-500", bg: "bg-cyan-100 dark:bg-cyan-900/30" },
    award: { icon: <Trophy className="w-4 h-4" />, color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
    hire: { icon: <Briefcase className="w-4 h-4" />, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    collection_add: { icon: <Image className="w-4 h-4" />, color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-900/30" },
  };

  const config = iconConfig[type];
  
  return (
    <div className={`w-10 h-10 rounded-full ${config.bg} ${config.color} flex items-center justify-center`}>
      {config.icon}
    </div>
  );
}

// ============ ACTIVITY ITEM ============
function ActivityItemCard({ activity }: { activity: ActivityItem }) {
  const getMessage = () => {
    switch (activity.type) {
      case "like":
        return (
          <>
            <strong>{activity.user.name}</strong> liked your project{" "}
            <Link href={`/project/${activity.target?.id}`} className="font-medium text-violet-600 hover:underline">
              {activity.target?.title}
            </Link>
          </>
        );
      case "comment":
        return (
          <>
            <strong>{activity.user.name}</strong> commented on{" "}
            <Link href={`/project/${activity.target?.id}`} className="font-medium text-violet-600 hover:underline">
              {activity.target?.title}
            </Link>
          </>
        );
      case "follow":
        return (
          <>
            <strong>{activity.user.name}</strong> started following you
          </>
        );
      case "mention":
        return (
          <>
            <strong>{activity.user.name}</strong> mentioned you in a comment
          </>
        );
      case "award":
        return (
          <>
            <strong>{activity.user.name}</strong> featured your project{" "}
            <Link href={`/project/${activity.target?.id}`} className="font-medium text-violet-600 hover:underline">
              {activity.target?.title}
            </Link>
          </>
        );
      case "hire":
        return (
          <>
            <strong>{activity.user.name}</strong> sent you a project inquiry
          </>
        );
      case "collection_add":
        return (
          <>
            <strong>{activity.user.name}</strong> added{" "}
            <Link href={`/project/${activity.target?.id}`} className="font-medium text-violet-600 hover:underline">
              {activity.target?.title}
            </Link>{" "}
            to a collection
          </>
        );
      case "upload":
        return (
          <>
            <strong>{activity.user.name}</strong> uploaded a new project{" "}
            <Link href={`/project/${activity.target?.id}`} className="font-medium text-violet-600 hover:underline">
              {activity.target?.title}
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = now.getTime() - then.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${
        !activity.isRead
          ? "bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800"
          : "hover:bg-slate-50 dark:hover:bg-slate-900"
      }`}
    >
      <ActivityIcon type={activity.type} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link href={`/u/${activity.user.username}`}>
            <img
              src={activity.user.avatar}
              alt={activity.user.name}
              className="w-8 h-8 rounded-full"
            />
          </Link>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {getMessage()}
          </p>
        </div>

        {activity.content && (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
            {activity.content}
          </p>
        )}

        {activity.target?.thumbnail && (
          <Link href={`/project/${activity.target.id}`}>
            <img
              src={activity.target.thumbnail}
              alt={activity.target.title}
              className="mt-3 w-24 h-16 rounded-lg object-cover"
            />
          </Link>
        )}

        <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {getTimeAgo(activity.timestamp)}
        </p>
      </div>

      {!activity.isRead && (
        <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
      )}
    </motion.div>
  );
}

// ============ MAIN PAGE ============
export default function ActivityPage() {
  const [filter, setFilter] = useState<"all" | ActivityType>("all");
  const [activities, setActivities] = useState(mockActivities);

  const unreadCount = activities.filter((a) => !a.isRead).length;

  const filteredActivities = filter === "all"
    ? activities
    : activities.filter((a) => a.type === filter);

  const markAllAsRead = () => {
    setActivities((prev) => prev.map((a) => ({ ...a, isRead: true })));
  };

  const filterOptions: { value: "all" | ActivityType; label: string; icon: React.ReactNode }[] = [
    { value: "all", label: "All Activity", icon: <Activity className="w-4 h-4" /> },
    { value: "like", label: "Likes", icon: <Heart className="w-4 h-4" /> },
    { value: "comment", label: "Comments", icon: <MessageCircle className="w-4 h-4" /> },
    { value: "follow", label: "Followers", icon: <UserPlus className="w-4 h-4" /> },
    { value: "mention", label: "Mentions", icon: <Star className="w-4 h-4" /> },
    { value: "hire", label: "Inquiries", icon: <Briefcase className="w-4 h-4" /> },
  ];

  // Group by date
  const groupedActivities = filteredActivities.reduce((groups: Record<string, ActivityItem[]>, activity) => {
    const date = new Date(activity.timestamp).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Activity
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  {unreadCount > 0 ? (
                    <span>
                      You have <span className="text-violet-600 font-medium">{unreadCount} unread</span> notifications
                    </span>
                  ) : (
                    "All caught up!"
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark all as read
                </Button>
              )}
              <Link href="/settings/notifications">
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(option.value)}
              className={filter === option.value ? "bg-violet-600 hover:bg-violet-700" : ""}
            >
              {option.icon}
              <span className="ml-2">{option.label}</span>
              {option.value === "all" && unreadCount > 0 && (
                <Badge className="ml-2 bg-rose-500">{unreadCount}</Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="space-y-8">
          {Object.entries(groupedActivities).map(([date, activities]) => (
            <div key={date}>
              <h2 className="text-sm font-medium text-slate-500 mb-4">{date}</h2>
              <div className="space-y-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {activities.map((activity) => (
                  <ActivityItemCard key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No activity yet
            </h3>
            <p className="text-slate-500 mb-6">
              {filter === "all"
                ? "When people interact with your work, you'll see it here"
                : `No ${filter} activity to show`}
            </p>
            <Link href="/explore">
              <Button className="bg-violet-600 hover:bg-violet-700">
                Explore Projects
              </Button>
            </Link>
          </div>
        )}

        {/* Quick Stats */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            This Week&apos;s Highlights
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "New Followers", value: "23", icon: <Users className="w-5 h-5" />, change: "+12%" },
              { label: "Total Likes", value: "156", icon: <Heart className="w-5 h-5" />, change: "+8%" },
              { label: "Comments", value: "34", icon: <MessageCircle className="w-5 h-5" />, change: "+24%" },
              { label: "Profile Views", value: "892", icon: <Eye className="w-5 h-5" />, change: "+15%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900/30">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
