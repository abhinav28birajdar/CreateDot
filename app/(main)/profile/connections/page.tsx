"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserPlus,
  Search,
  MapPin,
  Briefcase,
  Star,
  CheckCircle,
  ArrowLeft,
  Filter,
  Grid3X3,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
interface UserConnection {
  id: string;
  name: string;
  username: string;
  avatar: string;
  title: string;
  location: string;
  bio: string;
  followers: number;
  following: number;
  isFollowing: boolean;
  isVerified: boolean;
  skills: string[];
  mutualFollowers?: number;
}

// ============ MOCK DATA ============
const mockUsers: UserConnection[] = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahchen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    title: "Design Director at Meta",
    location: "San Francisco, CA",
    bio: "Crafting digital experiences that matter. Previously at Apple & Google.",
    followers: 45200,
    following: 312,
    isFollowing: true,
    isVerified: true,
    skills: ["UI Design", "Product Design", "Design Systems"],
    mutualFollowers: 23,
  },
  {
    id: "2",
    name: "Marcus Lee",
    username: "marcuslee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    title: "Senior Product Designer",
    location: "New York, NY",
    bio: "Building products people love. Design & code enthusiast.",
    followers: 23400,
    following: 456,
    isFollowing: false,
    isVerified: true,
    skills: ["Mobile Design", "Prototyping", "User Research"],
    mutualFollowers: 12,
  },
  {
    id: "3",
    name: "Emma Wilson",
    username: "emmawilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    title: "Freelance Illustrator",
    location: "London, UK",
    bio: "Creating whimsical illustrations for brands and books.",
    followers: 67800,
    following: 289,
    isFollowing: true,
    isVerified: false,
    skills: ["Illustration", "Character Design", "Brand Identity"],
    mutualFollowers: 8,
  },
  {
    id: "4",
    name: "Alex Turner",
    username: "alexturner",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    title: "Brand Designer",
    location: "Austin, TX",
    bio: "Helping startups build memorable brands.",
    followers: 15600,
    following: 534,
    isFollowing: false,
    isVerified: false,
    skills: ["Branding", "Logo Design", "Visual Identity"],
    mutualFollowers: 5,
  },
  {
    id: "5",
    name: "Jordan Park",
    username: "jordanpark",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    title: "Motion Designer",
    location: "Los Angeles, CA",
    bio: "Bringing designs to life through animation.",
    followers: 34500,
    following: 421,
    isFollowing: true,
    isVerified: true,
    skills: ["Motion Design", "After Effects", "3D Animation"],
    mutualFollowers: 17,
  },
  {
    id: "6",
    name: "Mia Rodriguez",
    username: "miarodriguez",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    title: "UX Lead at Spotify",
    location: "Stockholm, Sweden",
    bio: "Making music discovery better for millions.",
    followers: 89200,
    following: 198,
    isFollowing: false,
    isVerified: true,
    skills: ["UX Design", "Research", "Design Strategy"],
    mutualFollowers: 31,
  },
];

// ============ USER CARD ============
function UserCard({ user, view }: { user: UserConnection; view: "grid" | "list" }) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count;
  };

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700 transition-all"
      >
        <Link href={`/u/${user.username}`}>
          <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover" />
        </Link>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link href={`/u/${user.username}`} className="font-semibold text-slate-900 dark:text-white hover:text-violet-600">
              {user.name}
            </Link>
            {user.isVerified && (
              <CheckCircle className="w-4 h-4 text-violet-500 fill-violet-500" />
            )}
          </div>
          <p className="text-sm text-slate-500">@{user.username}</p>
          <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {user.title}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {user.location}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-500">
          <div className="text-center">
            <p className="font-semibold text-slate-900 dark:text-white">{formatCount(user.followers)}</p>
            <p>Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-900 dark:text-white">{formatCount(user.following)}</p>
            <p>Following</p>
          </div>
        </div>

        {user.mutualFollowers && user.mutualFollowers > 0 && (
          <Badge variant="secondary" className="flex-shrink-0">
            {user.mutualFollowers} mutual
          </Badge>
        )}

        <Button
          onClick={() => setIsFollowing(!isFollowing)}
          variant={isFollowing ? "outline" : "default"}
          className={!isFollowing ? "bg-violet-600 hover:bg-violet-700" : ""}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <Link href={`/u/${user.username}`} className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover" />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-900 dark:text-white hover:text-violet-600">
                {user.name}
              </span>
              {user.isVerified && (
                <CheckCircle className="w-4 h-4 text-violet-500 fill-violet-500" />
              )}
            </div>
            <p className="text-sm text-slate-500">@{user.username}</p>
          </div>
        </Link>
        <Button
          onClick={() => setIsFollowing(!isFollowing)}
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          className={!isFollowing ? "bg-violet-600 hover:bg-violet-700" : ""}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
        {user.bio}
      </p>

      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
        <span className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          {user.title}
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {user.skills.slice(0, 3).map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">{formatCount(user.followers)}</span>
            <span className="text-slate-500 ml-1">Followers</span>
          </div>
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">{formatCount(user.following)}</span>
            <span className="text-slate-500 ml-1">Following</span>
          </div>
        </div>
        {user.mutualFollowers && user.mutualFollowers > 0 && (
          <span className="text-xs text-slate-500">
            {user.mutualFollowers} mutual
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ============ MAIN PAGE ============
export default function ConnectionsPage() {
  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");

  const filteredUsers = mockUsers.filter((user) => {
    if (searchQuery) {
      return (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/profile" className="inline-flex items-center gap-2 text-slate-500 hover:text-violet-600 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Connections
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  {activeTab === "followers" ? "People following you" : "People you follow"}
                </p>
              </div>
            </div>

            <Button className="bg-violet-600 hover:bg-violet-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Find People
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 mt-8">
            <button
              onClick={() => setActiveTab("followers")}
              className={`pb-4 font-medium transition-colors border-b-2 ${
                activeTab === "followers"
                  ? "text-violet-600 border-violet-600"
                  : "text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Followers
              <Badge variant="secondary" className="ml-2">1,234</Badge>
            </button>
            <button
              onClick={() => setActiveTab("following")}
              className={`pb-4 font-medium transition-colors border-b-2 ${
                activeTab === "following"
                  ? "text-violet-600 border-violet-600"
                  : "text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Following
              <Badge variant="secondary" className="ml-2">567</Badge>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search connections..."
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900"
            >
              <option value="recent">Recently Added</option>
              <option value="popular">Most Popular</option>
              <option value="mutual">Most Mutual</option>
              <option value="name">Name A-Z</option>
            </select>

            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
              <button
                onClick={() => setView("grid")}
                className={`p-2 ${view === "grid" ? "bg-slate-100 dark:bg-slate-800" : ""}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 ${view === "list" ? "bg-slate-100 dark:bg-slate-800" : ""}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Users */}
        {activeTab === "following" && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Suggested for You
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {mockUsers.slice(0, 4).map((user) => (
                <div
                  key={user.id}
                  className="flex-shrink-0 w-64 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-sm text-slate-500 truncate">{user.title}</p>
                    </div>
                  </div>
                  {user.mutualFollowers && (
                    <p className="text-xs text-slate-500 mb-3">
                      {user.mutualFollowers} mutual followers
                    </p>
                  )}
                  <Button variant="outline" size="sm" className="w-full">
                    <UserPlus className="w-3 h-3 mr-1" />
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Grid/List */}
        <AnimatePresence mode="popLayout">
          {filteredUsers.length > 0 ? (
            <div className={view === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-3"}>
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} view={view} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No connections found
              </h3>
              <p className="text-slate-500 mb-6">
                {searchQuery
                  ? "Try adjusting your search"
                  : "Start following other designers to build your network"}
              </p>
              <Link href="/designers">
                <Button className="bg-violet-600 hover:bg-violet-700">
                  Discover Designers
                </Button>
              </Link>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
