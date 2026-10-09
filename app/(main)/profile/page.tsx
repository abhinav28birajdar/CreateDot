"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Globe,
  Settings,
  Edit,
  Heart,
  Eye,
  Grid3X3,
  LayoutGrid,
  List,
  Folder,
  Users,
  Briefcase,
  Check,
  Plus,
  X,
  Copy,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type CollectionRow = Database["public"]["Tables"]["collections"]["Row"];

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, isLoading: authLoading } = useAuth();

  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [collections, setCollections] = useState<CollectionRow[]>([]);
  const [likedProjects, setLikedProjects] = useState<ProjectRow[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [activeTab, setActiveTab] = useState("projects");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!user) return;
    setIsLoadingData(true);

    try {
      // 1. Fetch user's own projects
      const { data: userProjects } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (userProjects) setProjects(userProjects);

      // 2. Fetch user's collections
      const { data: userCollections } = await supabase
        .from("collections")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (userCollections) setCollections(userCollections);

      // 3. Fetch user's liked projects
      const { data: likesData } = await supabase
        .from("likes")
        .select("project_id")
        .eq("user_id", user.id)
        .limit(12);

      if (likesData && likesData.length > 0) {
        const projectIds = likesData.map((l: any) => l.project_id);
        const { data: likedProjs } = await supabase
          .from("projects")
          .select("*")
          .in("id", projectIds);

        if (likedProjs) setLikedProjects(likedProjs);
      }
    } catch (err) {
      console.warn("Error loading profile data:", err);
    } finally {
      setIsLoadingData(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      fetchUserData();
    }
  }, [user, authLoading, router, fetchUserData]);

  if (authLoading || (!profile && isLoadingData)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#111111]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF6B6B] mx-auto" />
          <p className="text-xs text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const displayName = profile?.full_name || user?.user_metadata?.full_name || "Creator";
  const displayUsername = profile?.username || user?.email?.split("@")[0] || "creator";
  const avatarUrl = profile?.avatar_url || "/images/profile-image-4.png";
  const coverUrl = profile?.cover_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&h=400&fit=crop";
  const bioText = profile?.bio || "Digital creator and technologist on CreateDOT.";
  const locationText = profile?.location || "Earth";
  const websiteUrl = profile?.website || "";
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/profile/${displayUsername}` : "";

  const copyShareLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0C] pb-24">
      {/* Cover Image Banner */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-[#14161F] overflow-hidden">
        <img
          src={coverUrl}
          alt="Profile Cover"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Link href="/settings">
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/80 hover:bg-white text-xs font-bold rounded-full"
          >
            <Edit className="w-3.5 h-3.5 mr-1.5" />
            Edit Cover
          </Button>
        </Link>
      </div>

      {/* Profile Header Box */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative -mt-16 md:-mt-20 lg:-mt-24 mb-8">
          <div className="bg-white dark:bg-[#121215] rounded-3xl shadow-xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Avatar */}
              <div className="relative -mt-20 md:-mt-24">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl border-4 border-white dark:border-[#121215] overflow-hidden shadow-2xl bg-slate-100 ring-2 ring-black/5">
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Link
                  href="/settings"
                  className="absolute bottom-1 right-1 w-9 h-9 bg-[#FF6B6B] hover:bg-[#F35555] rounded-full flex items-center justify-center text-white shadow-lg transition"
                >
                  <Edit className="w-4 h-4" />
                </Link>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                        {displayName}
                      </h1>
                      {profile?.is_verified && (
                        <div className="w-5 h-5 bg-[#FF6B6B] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {profile?.is_pro && (
                        <Badge className="bg-[#FAF0D7] text-[#8A6318] hover:bg-[#FAF0D7] text-[10px] font-black uppercase">
                          PRO
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-500">@{displayUsername}</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 max-w-xl leading-relaxed">
                      {bioText}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500 font-medium">
                      {locationText && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#FF6B6B]" />
                          {locationText}
                        </span>
                      )}
                      {websiteUrl && (
                        <a
                          href={websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-[#FF6B6B]"
                        >
                          <Globe className="w-3.5 h-3.5 text-[#FF6B6B]" />
                          {websiteUrl.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : "Recently"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link href="/upload">
                      <Button className="bg-[#FF6B6B] hover:bg-[#F35555] text-white rounded-full text-xs font-bold px-5">
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        New Project
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => setShowShareModal(true)}
                      className="rounded-full text-xs font-bold px-4"
                    >
                      Share
                    </Button>
                    <Link href="/settings">
                      <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Stats Counter */}
                <div className="flex items-center gap-8 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-xl font-black text-slate-900 dark:text-white block">
                      {profile?.followers_count || 0}
                    </span>
                    <span className="text-muted-foreground font-semibold uppercase text-[10px] tracking-wider">Followers</span>
                  </div>
                  <div>
                    <span className="text-xl font-black text-slate-900 dark:text-white block">
                      {profile?.following_count || 0}
                    </span>
                    <span className="text-muted-foreground font-semibold uppercase text-[10px] tracking-wider">Following</span>
                  </div>
                  <div>
                    <span className="text-xl font-black text-slate-900 dark:text-white block">
                      {projects.length}
                    </span>
                    <span className="text-muted-foreground font-semibold uppercase text-[10px] tracking-wider">Projects</span>
                  </div>
                  <div>
                    <span className="text-xl font-black text-[#FF6B6B] block">
                      {profile?.likes_received || 0}
                    </span>
                    <span className="text-muted-foreground font-semibold uppercase text-[10px] tracking-wider">Likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-white dark:bg-[#121215] p-1 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <TabsTrigger value="projects" className="gap-2 rounded-xl text-xs font-bold">
                <Grid3X3 className="w-3.5 h-3.5" />
                Projects ({projects.length})
              </TabsTrigger>
              <TabsTrigger value="collections" className="gap-2 rounded-xl text-xs font-bold">
                <Folder className="w-3.5 h-3.5" />
                Collections ({collections.length})
              </TabsTrigger>
              <TabsTrigger value="likes" className="gap-2 rounded-xl text-xs font-bold">
                <Heart className="w-3.5 h-3.5" />
                Likes ({likedProjects.length})
              </TabsTrigger>
            </TabsList>

            <div className="hidden sm:flex items-center gap-1 bg-white dark:bg-[#121215] p-1 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg ${viewMode === "grid" ? "bg-slate-100 dark:bg-white/10" : "text-slate-400"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg ${viewMode === "list" ? "bg-slate-100 dark:bg-white/10" : "text-slate-400"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Projects Tab */}
          <TabsContent value="projects">
            {projects.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {projects.map((proj) => (
                  <Link key={proj.id} href={`/project/${proj.id}`}>
                    <div className="group bg-white dark:bg-[#121215] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                        <img
                          src={proj.cover_image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop"}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
                          <Heart className="w-3 h-3 text-[#FF6B6B] fill-[#FF6B6B]" />
                          {proj.likes_count || 0}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#FF6B6B] transition">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                          {proj.description || "No description provided"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-[#121215] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-3">
                <Sparkles className="w-8 h-8 text-[#FF6B6B] mx-auto" />
                <h3 className="text-lg font-bold">No projects uploaded yet</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Showcase your first creative design, case study, or prototype to the community.
                </p>
                <Link href="/upload">
                  <Button className="bg-[#FF6B6B] hover:bg-[#F35555] text-white rounded-full text-xs font-bold px-6 mt-2">
                    Upload Your First Project
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections">
            {collections.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((col) => (
                  <div key={col.id} className="bg-white dark:bg-[#121215] p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                    <h3 className="font-bold text-base">{col.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{col.description || "Curated collection"}</p>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-500">
                      {col.project_count || 0} items
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-[#121215] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-3">
                <Folder className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold">No collections created</h3>
                <p className="text-xs text-muted-foreground">Save your favorite community designs into organized collections.</p>
              </div>
            )}
          </TabsContent>

          {/* Likes Tab */}
          <TabsContent value="likes">
            {likedProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedProjects.map((proj) => (
                  <Link key={proj.id} href={`/project/${proj.id}`}>
                    <div className="group bg-white dark:bg-[#121215] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                        <img
                          src={proj.cover_image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop"}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#FF6B6B] transition">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                          {proj.description || "Project"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-[#121215] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-3">
                <Heart className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold">No liked projects yet</h3>
                <p className="text-xs text-muted-foreground">Appreciate projects on the feed to save them here.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-bold">Share Creator Profile</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">Copy the direct URL to your public CreateDOT profile.</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
                <Button onClick={copyShareLink} size="sm" className="bg-[#FF6B6B] hover:bg-[#F35555] text-white rounded-xl">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
