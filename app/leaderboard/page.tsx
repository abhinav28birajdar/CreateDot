"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  Eye,
  Users,
  ChevronUp,
  ChevronDown,
  Filter,
  Calendar,
  Award,
  Zap,
  Flame,
  Target,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
interface LeaderboardEntry {
  rank: number;
  previousRank: number;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    title: string;
    isPro: boolean;
    isVerified: boolean;
  };
  stats: {
    score: number;
    likes: number;
    views: number;
    followers: number;
    projects: number;
  };
  streak: number;
  badges: string[];
}

// ============ MOCK DATA ============
const timeRanges = [
  { id: "day", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "year", label: "This Year" },
  { id: "all", label: "All Time" },
];

const categories = [
  { id: "overall", label: "Overall", icon: Trophy },
  { id: "likes", label: "Most Liked", icon: Heart },
  { id: "views", label: "Most Viewed", icon: Eye },
  { id: "followers", label: "Most Followed", icon: Users },
  { id: "streak", label: "Longest Streak", icon: Flame },
];

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    previousRank: 2,
    user: {
      id: "1",
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      title: "Senior Product Designer",
      isPro: true,
      isVerified: true,
    },
    stats: {
      score: 125680,
      likes: 45200,
      views: 892000,
      followers: 67800,
      projects: 156,
    },
    streak: 45,
    badges: ["Top Creator", "Design Pioneer", "Community Star"],
  },
  {
    rank: 2,
    previousRank: 1,
    user: {
      id: "2",
      name: "Marcus Lee",
      username: "marcuslee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      title: "Creative Director",
      isPro: true,
      isVerified: true,
    },
    stats: {
      score: 118450,
      likes: 42100,
      views: 756000,
      followers: 58900,
      projects: 189,
    },
    streak: 32,
    badges: ["Rising Star", "Trendsetter"],
  },
  {
    rank: 3,
    previousRank: 3,
    user: {
      id: "3",
      name: "Emma Wilson",
      username: "emmawilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      title: "UI/UX Designer",
      isPro: true,
      isVerified: true,
    },
    stats: {
      score: 98760,
      likes: 38500,
      views: 623000,
      followers: 45600,
      projects: 134,
    },
    streak: 28,
    badges: ["Design Master", "Mentor"],
  },
  {
    rank: 4,
    previousRank: 6,
    user: {
      id: "4",
      name: "Jordan Park",
      username: "jordanpark",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
      title: "3D Artist",
      isPro: true,
      isVerified: false,
    },
    stats: {
      score: 87340,
      likes: 32400,
      views: 534000,
      followers: 38700,
      projects: 98,
    },
    streak: 21,
    badges: ["3D Master"],
  },
  {
    rank: 5,
    previousRank: 4,
    user: {
      id: "5",
      name: "Alex Turner",
      username: "alexturner",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      title: "Brand Designer",
      isPro: false,
      isVerified: true,
    },
    stats: {
      score: 76890,
      likes: 28900,
      views: 467000,
      followers: 32100,
      projects: 87,
    },
    streak: 15,
    badges: ["Brand Expert"],
  },
  {
    rank: 6,
    previousRank: 5,
    user: {
      id: "6",
      name: "Mia Rodriguez",
      username: "miarodriguez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
      title: "Motion Designer",
      isPro: true,
      isVerified: true,
    },
    stats: {
      score: 65430,
      likes: 24500,
      views: 389000,
      followers: 27800,
      projects: 76,
    },
    streak: 18,
    badges: ["Animation Expert"],
  },
  {
    rank: 7,
    previousRank: 8,
    user: {
      id: "7",
      name: "David Kim",
      username: "davidkim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
      title: "Product Designer",
      isPro: false,
      isVerified: false,
    },
    stats: {
      score: 54670,
      likes: 19800,
      views: 312000,
      followers: 21500,
      projects: 65,
    },
    streak: 12,
    badges: [],
  },
  {
    rank: 8,
    previousRank: 10,
    user: {
      id: "8",
      name: "Sophie Martin",
      username: "sophiemartin",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
      title: "Illustrator",
      isPro: true,
      isVerified: true,
    },
    stats: {
      score: 48920,
      likes: 17600,
      views: 278000,
      followers: 19200,
      projects: 123,
    },
    streak: 9,
    badges: ["Illustration Master"],
  },
  {
    rank: 9,
    previousRank: 7,
    user: {
      id: "9",
      name: "Chris Anderson",
      username: "chrisanderson",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200",
      title: "Design Lead",
      isPro: true,
      isVerified: false,
    },
    stats: {
      score: 43560,
      likes: 15900,
      views: 245000,
      followers: 16800,
      projects: 54,
    },
    streak: 7,
    badges: [],
  },
  {
    rank: 10,
    previousRank: 12,
    user: {
      id: "10",
      name: "Lisa Wang",
      username: "lisawang",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200",
      title: "UX Researcher",
      isPro: false,
      isVerified: true,
    },
    stats: {
      score: 38740,
      likes: 13400,
      views: 198000,
      followers: 14500,
      projects: 42,
    },
    streak: 14,
    badges: ["Research Expert"],
  },
];

// ============ RANK BADGE ============
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="w-12 h-12 bg-[#8B5DFF] from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
        <Crown className="w-6 h-6 text-white" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-12 h-12 bg-[#8B5DFF] from-slate-300 to-slate-500 rounded-full flex items-center justify-center shadow-lg shadow-slate-500/30">
        <Medal className="w-6 h-6 text-white" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-12 h-12 bg-[#8B5DFF] from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-lg shadow-amber-700/30">
        <Medal className="w-6 h-6 text-white" />
      </div>
    );
  }
  return (
    <div className="w-12 h-12 bg-slate-100 dark:bg-[#111111] rounded-full flex items-center justify-center">
      <span className="text-lg font-bold text-slate-600 dark:text-slate-400">
        {rank}
      </span>
    </div>
  );
}

// ============ RANK CHANGE INDICATOR ============
function RankChange({ current, previous }: { current: number; previous: number }) {
  const diff = previous - current;
  
  if (diff > 0) {
    return (
      <div className="flex items-center gap-1 text-green-600">
        <TrendingUp className="w-4 h-4" />
        <span className="text-sm font-medium">+{diff}</span>
      </div>
    );
  }
  if (diff < 0) {
    return (
      <div className="flex items-center gap-1 text-red-500">
        <TrendingDown className="w-4 h-4" />
        <span className="text-sm font-medium">{diff}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-slate-400">
      <Minus className="w-4 h-4" />
    </div>
  );
}

// ============ LEADERBOARD ROW ============
function LeaderboardRow({ entry, isTop3 }: { entry: LeaderboardEntry; isTop3: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-4 p-4 rounded-xl ${
        isTop3
          ? "bg-[#8B5DFF] from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 border border-violet-200 dark:border-violet-800"
          : "bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1F1F1F]"
      } hover:shadow-lg transition-all`}
    >
      {/* Rank */}
      <RankBadge rank={entry.rank} />

      {/* Rank Change */}
      <div className="w-12 flex-shrink-0">
        <RankChange current={entry.rank} previous={entry.previousRank} />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Link href={`/u/${entry.user.username}`}>
          <img
            src={entry.user.avatar}
            alt={entry.user.name}
            className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-violet-500 transition-all"
          />
        </Link>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Link href={`/u/${entry.user.username}`}>
              <h3 className="font-semibold text-slate-900 dark:text-white hover:text-violet-600 transition-colors">
                {entry.user.name}
              </h3>
            </Link>
            {entry.user.isVerified && (
              <CheckCircle className="w-4 h-4 text-[#8B5DFF]" />
            )}
            {entry.user.isPro && (
              <Badge className="bg-[#8B5DFF] from-violet-600 to-fuchsia-600 text-white text-xs">
                PRO
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
            {entry.user.title}
          </p>
        </div>
      </div>

      {/* Streak */}
      <div className="hidden md:flex items-center gap-2 px-4">
        <Flame className="w-5 h-5 text-orange-500" />
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {entry.streak} day streak
        </span>
      </div>

      {/* Stats */}
      <div className="hidden lg:flex items-center gap-6">
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900 dark:text-white">
            {(entry.stats.likes / 1000).toFixed(1)}K
          </div>
          <div className="text-xs text-slate-500">Likes</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900 dark:text-white">
            {(entry.stats.views / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-slate-500">Views</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900 dark:text-white">
            {(entry.stats.followers / 1000).toFixed(1)}K
          </div>
          <div className="text-xs text-slate-500">Followers</div>
        </div>
      </div>

      {/* Score */}
      <div className="text-right">
        <div className="text-xl font-bold text-transparent bg-clip-text bg-[#8B5DFF] from-violet-600 to-fuchsia-600">
          {entry.stats.score.toLocaleString()}
        </div>
        <div className="text-xs text-slate-500">Score</div>
      </div>
    </motion.div>
  );
}

// ============ MAIN PAGE ============
export default function LeaderboardPage() {
  const [selectedTime, setSelectedTime] = useState("week");
  const [selectedCategory, setSelectedCategory] = useState("overall");

  // Current user stats (mock)
  const currentUserRank = 156;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-[#8B5DFF] from-violet-600 via-violet-700 to-fuchsia-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Designer Leaderboard
            </h1>
            <p className="text-xl text-violet-200 mb-8 max-w-2xl mx-auto">
              Discover the top creators in our community. Climb the ranks by creating
              amazing work and engaging with fellow designers.
            </p>

            {/* Your Rank */}
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
              <Target className="w-6 h-6" />
              <div className="text-left">
                <p className="text-violet-200 text-sm">Your Current Rank</p>
                <p className="text-2xl font-bold">#{currentUserRank}</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-left">
                <p className="text-violet-200 text-sm">Points to next rank</p>
                <p className="text-2xl font-bold">2,450</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#1F1F1F] sticky top-16 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Time Range */}
            <div className="flex gap-2">
              {timeRanges.map((range) => (
                <Button
                  key={range.id}
                  variant={selectedTime === range.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(range.id)}
                  className={selectedTime === range.id ? "bg-violet-600 hover:bg-violet-700" : ""}
                >
                  {range.label}
                </Button>
              ))}
            </div>

            {/* Categories */}
            <div className="flex gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={selectedCategory === cat.id ? "bg-violet-600 hover:bg-violet-700" : ""}
                >
                  <cat.icon className="w-4 h-4 mr-1" />
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top 3 Podium (Desktop) */}
          {(() => {
            const first = mockLeaderboard[0];
            const second = mockLeaderboard[1];
            const third = mockLeaderboard[2];
            if (!first || !second || !third) return null;
            return (
              <div className="hidden lg:flex justify-center gap-8 mb-12">
                {/* 2nd Place */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-8"
                >
                  <div className="w-48 text-center">
                    <div className="relative inline-block mb-4">
                      <img
                        src={second?.user?.avatar}
                        alt={second?.user?.name}
                        className="w-24 h-24 rounded-full border-4 border-slate-300 object-cover"
                      />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#8B5DFF] from-slate-300 to-slate-500 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {second?.user?.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-2">
                      {second?.stats?.score?.toLocaleString()} pts
                    </p>
                  </div>
                </motion.div>

                {/* 1st Place */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-56 text-center">
                    <div className="relative inline-block mb-4">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <Crown className="w-10 h-10 text-amber-500" />
                      </div>
                      <img
                        src={first?.user?.avatar}
                        alt={first?.user?.name}
                        className="w-32 h-32 rounded-full border-4 border-amber-400 object-cover ring-4 ring-amber-200 dark:ring-amber-900"
                      />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#8B5DFF] from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-white font-bold">1</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {first?.user?.name}
                    </h3>
                    <p className="text-violet-600 font-semibold mb-2">
                      {first?.stats?.score?.toLocaleString()} pts
                    </p>
                    <div className="flex justify-center gap-1">
                      {first?.badges?.slice(0, 3).map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* 3rd Place */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8"
                >
                  <div className="w-48 text-center">
                    <div className="relative inline-block mb-4">
                      <img
                        src={third?.user?.avatar}
                        alt={third?.user?.name}
                        className="w-24 h-24 rounded-full border-4 border-amber-700 object-cover"
                      />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#8B5DFF] from-amber-600 to-amber-800 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {third?.user?.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-2">
                      {third?.stats?.score?.toLocaleString()} pts
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })()}

          {/* Leaderboard List */}
          <div className="space-y-3">
            {mockLeaderboard.map((entry, index) => (
              <LeaderboardRow
                key={entry.user.id}
                entry={entry}
                isTop3={entry.rank <= 3}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More
            </Button>
          </div>
        </div>
      </section>

      {/* How Scoring Works */}
      <section className="py-16 bg-white dark:bg-[#111111] border-t border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            How Scoring Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Heart, label: "Likes Received", points: "+10 pts each" },
              { icon: Eye, label: "Project Views", points: "+1 pt per view" },
              { icon: Users, label: "New Followers", points: "+50 pts each" },
              { icon: Flame, label: "Daily Streak", points: "+100 pts/day" },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center p-6 bg-slate-50 dark:bg-[#111111]/50 rounded-xl"
              >
                <item.icon className="w-8 h-8 text-violet-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {item.label}
                </h3>
                <p className="text-sm text-violet-600 font-medium">{item.points}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
