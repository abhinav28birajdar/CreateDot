"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Eye,
  Share2,
  Filter,
  ChevronDown,
  Loader2,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  Grid3X3,
  LayoutGrid,
  List,
  MoreHorizontal,
  Play,
  ExternalLink,
  Plus,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnails?: string[];
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isPro?: boolean;
  };
  stats: {
    likes: number;
    views: number;
    comments: number;
    saves: number;
  };
  tags: string[];
  category: string;
  createdAt: string;
  isLiked?: boolean;
  isSaved?: boolean;
  isVideo?: boolean;
  aspectRatio?: "square" | "landscape" | "portrait";
}

// ============ MOCK DATA ============
const mockProjects: Project[] = [
  {
    id: "1",
    title: "FinTech Mobile App Dashboard",
    description: "Modern financial dashboard with real-time analytics and beautiful charts",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    author: {
      id: "u1",
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      isPro: true,
    },
    stats: { likes: 2340, views: 15600, comments: 89, saves: 456 },
    tags: ["UI Design", "Mobile", "Dashboard"],
    category: "UI/UX Design",
    createdAt: "2024-01-15",
    aspectRatio: "landscape",
  },
  {
    id: "2",
    title: "Abstract 3D Shapes Collection",
    description: "Colorful abstract 3D shapes for modern branding projects",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=800&fit=crop",
    author: {
      id: "u2",
      name: "Mike Ross",
      username: "mikeross",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    stats: { likes: 1890, views: 12400, comments: 67, saves: 312 },
    tags: ["3D", "Abstract", "Branding"],
    category: "3D Design",
    createdAt: "2024-01-14",
    aspectRatio: "portrait",
  },
  {
    id: "3",
    title: "E-commerce Website Redesign",
    description: "Clean and modern redesign for a luxury fashion e-commerce platform",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    author: {
      id: "u3",
      name: "Emma Wilson",
      username: "emmawilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      isPro: true,
    },
    stats: { likes: 3200, views: 22100, comments: 134, saves: 567 },
    tags: ["Web Design", "E-commerce", "Luxury"],
    category: "Web Design",
    createdAt: "2024-01-13",
    aspectRatio: "landscape",
  },
  {
    id: "4",
    title: "Brand Identity - Coffee Shop",
    description: "Complete brand identity for an artisan coffee shop",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop",
    author: {
      id: "u4",
      name: "Alex Turner",
      username: "alexturner",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    stats: { likes: 1560, views: 9800, comments: 45, saves: 234 },
    tags: ["Branding", "Logo", "Identity"],
    category: "Branding",
    createdAt: "2024-01-12",
    aspectRatio: "square",
  },
  {
    id: "5",
    title: "Motion Graphics Showreel 2024",
    description: "Collection of my best motion design work from 2024",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    author: {
      id: "u5",
      name: "Jordan Lee",
      username: "jordanlee",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      isPro: true,
    },
    stats: { likes: 4500, views: 32000, comments: 201, saves: 890 },
    tags: ["Motion", "Animation", "Video"],
    category: "Motion Design",
    createdAt: "2024-01-11",
    isVideo: true,
    aspectRatio: "landscape",
  },
  {
    id: "6",
    title: "Illustration Series - Flora",
    description: "Botanical illustrations inspired by tropical plants",
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=900&fit=crop",
    author: {
      id: "u6",
      name: "Nina Patel",
      username: "ninapatel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    stats: { likes: 2100, views: 14500, comments: 78, saves: 345 },
    tags: ["Illustration", "Nature", "Art"],
    category: "Illustration",
    createdAt: "2024-01-10",
    aspectRatio: "portrait",
  },
  {
    id: "7",
    title: "SaaS Dashboard Design System",
    description: "Comprehensive design system for enterprise SaaS products",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    author: {
      id: "u7",
      name: "David Kim",
      username: "davidkim",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      isPro: true,
    },
    stats: { likes: 5600, views: 41000, comments: 267, saves: 1200 },
    tags: ["Design System", "SaaS", "Enterprise"],
    category: "UI/UX Design",
    createdAt: "2024-01-09",
    aspectRatio: "landscape",
  },
  {
    id: "8",
    title: "App Icon Collection",
    description: "Beautiful app icons for iOS and Android",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=600&fit=crop",
    author: {
      id: "u8",
      name: "Lisa Wang",
      username: "lisawang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    stats: { likes: 1890, views: 11200, comments: 56, saves: 278 },
    tags: ["Icons", "Mobile", "App Design"],
    category: "Icon Design",
    createdAt: "2024-01-08",
    aspectRatio: "square",
  },
];

// ============ PROJECT CARD ============
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(project.isLiked || false);
  const [isSaved, setIsSaved] = useState(project.isSaved || false);
  const [likeCount, setLikeCount] = useState(project.stats.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/project/${project.id}`}>
        <div
          className="relative bg-white dark:bg-[#111111] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Video Play Button */}
            {project.isVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 bg-[#0B0B0C]/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
            )}

            {/* Hover Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#8B5DFF] from-black/80 via-black/20 to-transparent"
                >
                  {/* Top Actions */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={handleSave}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        isSaved
                          ? "bg-violet-500 text-white"
                          : "bg-white/90 text-slate-700 hover:bg-white"
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg line-clamp-1 mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-white/80 text-sm">
                        <button
                          onClick={handleLike}
                          className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                          {formatNumber(likeCount)}
                        </button>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {formatNumber(project.stats.views)}
                        </span>
                      </div>
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Card Footer */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <Link
                href={`/profile/${project.author.username}`}
                className="flex items-center gap-2 group/author"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={project.author.avatar}
                    alt={project.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover/author:text-violet-600 transition-colors">
                      {project.author.name}
                    </span>
                    {project.author.isPro && (
                      <Badge variant="secondary" className="px-1.5 py-0 text-xs bg-violet-100 text-violet-700">
                        PRO
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-2 text-slate-400">
                <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                <span className="text-xs">{formatNumber(likeCount)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ============ STORIES/FOLLOWING BAR ============
function StoriesBar() {
  const stories = [
    { id: "1", name: "Your Story", avatar: "", isAdd: true },
    { id: "2", name: "Sarah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", hasNew: true },
    { id: "3", name: "Mike", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", hasNew: true },
    { id: "4", name: "Emma", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", hasNew: true },
    { id: "5", name: "Alex", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", hasNew: false },
    { id: "6", name: "Jordan", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", hasNew: true },
    { id: "7", name: "Nina", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", hasNew: false },
    { id: "8", name: "David", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", hasNew: true },
  ];

  return (
    <div className="bg-white dark:bg-[#111111] rounded-xl p-4 mb-6 overflow-x-auto">
      <div className="flex gap-4">
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center gap-1 min-w-[70px]"
          >
            <div
              className={`relative w-16 h-16 rounded-full ${
                story.hasNew
                  ? "p-0.5 bg-[#8B5DFF] from-violet-500 to-fuchsia-500"
                  : story.isAdd
                  ? ""
                  : "p-0.5 bg-slate-200 dark:bg-slate-700"
              }`}
            >
              <div className="w-full h-full rounded-full bg-white dark:bg-[#111111] flex items-center justify-center overflow-hidden">
                {story.isAdd ? (
                  <div className="w-full h-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-full flex items-center justify-center">
                    <Plus className="w-6 h-6 text-slate-400" />
                  </div>
                ) : (
                  <Image
                    src={story.avatar}
                    alt={story.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                )}
              </div>
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-[70px]">
              {story.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ FILTER TABS ============
function FilterTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const tabs = [
    { id: "following", label: "Following", icon: <Users className="w-4 h-4" /> },
    { id: "popular", label: "Popular", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "recent", label: "Recent", icon: <Clock className="w-4 h-4" /> },
    { id: "recommended", label: "For You", icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            activeTab === tab.id
              ? "bg-violet-500 text-white"
              : "bg-slate-100 dark:bg-[#111111] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ============ CATEGORY FILTERS ============
function CategoryFilters({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}) {
  const categories = [
    "All",
    "UI/UX Design",
    "Web Design",
    "Mobile",
    "Branding",
    "Illustration",
    "3D Design",
    "Motion",
    "Typography",
    "Icon Design",
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
            selectedCategory === cat
              ? "bg-[#111111] dark:bg-white text-white dark:text-slate-900"
              : "bg-slate-100 dark:bg-[#111111] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ============ MAIN HOME FEED PAGE ============
export default function HomeFeedPage() {
  const [activeTab, setActiveTab] = useState("popular");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "masonry" | "list">("grid");
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Infinite scroll
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add more projects
    const newProjects = mockProjects.map((p) => ({
      ...p,
      id: `${p.id}-${Date.now()}-${Math.random()}`,
    }));
    setProjects((prev) => [...prev, ...newProjects]);

    // Stop after 3 loads for demo
    if (projects.length > 20) {
      setHasMore(false);
    }

    setIsLoading(false);
  }, [isLoading, hasMore, projects.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  // Scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter projects by category
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stories Bar */}
        <StoriesBar />

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Your Feed
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Discover amazing design work from creators you follow
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-[#111111] rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-slate-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-2 rounded ${
                  viewMode === "masonry"
                    ? "bg-white dark:bg-slate-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-white dark:bg-slate-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Button */}
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Category Filters */}
        <CategoryFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Projects Grid */}
        <div className="mt-8">
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : viewMode === "masonry"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Loading Indicator */}
          <div ref={loadMoreRef} className="flex justify-center py-12">
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading more projects...</span>
              </div>
            )}
            {!hasMore && (
              <p className="text-slate-500">You&apos;ve reached the end!</p>
            )}
          </div>
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 w-12 h-12 bg-violet-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-violet-600 transition-colors z-50"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
