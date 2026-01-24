"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Download,
  FileText,
  Book,
  Video,
  Palette,
  Code,
  Box,
  Star,
  Heart,
  ExternalLink,
  Filter,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  Eye,
  Clock,
  Folder,
  FileImage,
  Type,
  Layers,
  Grid3X3,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
interface Resource {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  type: "template" | "guide" | "toolkit" | "video" | "ebook" | "cheatsheet";
  format: string[];
  size?: string;
  downloads: number;
  rating: number;
  isFree: boolean;
  isPremium: boolean;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  lastUpdated: string;
}

// ============ MOCK DATA ============
const categories = [
  { name: "All Resources", icon: Folder, count: 450 },
  { name: "Templates", icon: FileText, count: 120 },
  { name: "UI Kits", icon: Layers, count: 85 },
  { name: "Guides", icon: Book, count: 65 },
  { name: "Toolkits", icon: Box, count: 48 },
  { name: "Videos", icon: Video, count: 72 },
  { name: "eBooks", icon: FileText, count: 35 },
  { name: "Icons", icon: Grid3X3, count: 25 },
];

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Complete Design System Starter Kit",
    description: "Everything you need to start building your design system. Includes tokens, components, documentation templates, and best practices guide.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    category: "Toolkits",
    type: "toolkit",
    format: ["Figma", "Notion", "PDF"],
    size: "45 MB",
    downloads: 12450,
    rating: 4.9,
    isFree: true,
    isPremium: false,
    author: {
      name: "DesignDot Team",
      avatar: "/logo.png",
    },
    tags: ["Design Systems", "Components", "Documentation"],
    lastUpdated: "2025-01-10",
  },
  {
    id: "2",
    title: "UX Research Methods Handbook",
    description: "A comprehensive guide to user research methods. Learn how to conduct interviews, usability tests, surveys, and analyze your findings.",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    category: "eBooks",
    type: "ebook",
    format: ["PDF", "ePub"],
    size: "8.5 MB",
    downloads: 8920,
    rating: 4.8,
    isFree: true,
    isPremium: false,
    author: {
      name: "Research Academy",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    tags: ["UX Research", "Methods", "User Testing"],
    lastUpdated: "2025-01-05",
  },
  {
    id: "3",
    title: "Portfolio Website Template",
    description: "A stunning portfolio template for designers. Fully responsive, dark mode support, and easy to customize.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "Templates",
    type: "template",
    format: ["Figma", "HTML/CSS", "React"],
    size: "25 MB",
    downloads: 15670,
    rating: 4.9,
    isFree: false,
    isPremium: true,
    author: {
      name: "WebCraft Studio",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    tags: ["Portfolio", "Website", "Template"],
    lastUpdated: "2025-01-08",
  },
  {
    id: "4",
    title: "Figma Shortcuts Cheatsheet",
    description: "Master Figma with this comprehensive keyboard shortcuts cheatsheet. Boost your productivity and speed up your workflow.",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop",
    category: "Guides",
    type: "cheatsheet",
    format: ["PDF", "PNG"],
    size: "2.5 MB",
    downloads: 23450,
    rating: 5.0,
    isFree: true,
    isPremium: false,
    author: {
      name: "Figma Community",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
    tags: ["Figma", "Shortcuts", "Productivity"],
    lastUpdated: "2025-01-12",
  },
  {
    id: "5",
    title: "Mobile UI Kit - iOS & Android",
    description: "500+ components designed for mobile apps. Compatible with iOS and Android design guidelines. Includes dark mode variants.",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop",
    category: "UI Kits",
    type: "toolkit",
    format: ["Figma", "Sketch"],
    size: "120 MB",
    downloads: 9870,
    rating: 4.7,
    isFree: false,
    isPremium: true,
    author: {
      name: "MobileDesigns",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    },
    tags: ["Mobile", "iOS", "Android", "Components"],
    lastUpdated: "2025-01-03",
  },
  {
    id: "6",
    title: "Design Interview Preparation Guide",
    description: "Ace your design interviews with this complete preparation guide. Includes common questions, portfolio tips, and whiteboard challenges.",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
    category: "Guides",
    type: "guide",
    format: ["PDF", "Notion"],
    size: "15 MB",
    downloads: 18340,
    rating: 4.9,
    isFree: true,
    isPremium: false,
    author: {
      name: "Career Academy",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    },
    tags: ["Interview", "Career", "Portfolio"],
    lastUpdated: "2024-12-28",
  },
  {
    id: "7",
    title: "Color Theory Masterclass",
    description: "Learn the science and art of color in design. 4-hour video course covering color psychology, harmonies, and accessibility.",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
    category: "Videos",
    type: "video",
    format: ["MP4", "Subtitles"],
    size: "2.5 GB",
    downloads: 7650,
    rating: 4.8,
    isFree: false,
    isPremium: true,
    author: {
      name: "Design Academy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    },
    tags: ["Color", "Theory", "Video Course"],
    lastUpdated: "2025-01-01",
  },
  {
    id: "8",
    title: "3000+ Line Icons Pack",
    description: "A massive collection of consistent line icons covering 40+ categories. SVG and PNG formats included.",
    thumbnail: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=800&h=600&fit=crop",
    category: "Icons",
    type: "toolkit",
    format: ["SVG", "PNG", "Figma"],
    size: "85 MB",
    downloads: 21340,
    rating: 4.9,
    isFree: true,
    isPremium: false,
    author: {
      name: "IconLab",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    tags: ["Icons", "Line", "UI"],
    lastUpdated: "2025-01-07",
  },
];

// ============ RESOURCE CARD ============
function ResourceCard({ resource }: { resource: Resource }) {
  const [isHovered, setIsHovered] = useState(false);

  const getTypeIcon = () => {
    switch (resource.type) {
      case "template": return FileText;
      case "guide": return Book;
      case "toolkit": return Box;
      case "video": return Video;
      case "ebook": return FileText;
      case "cheatsheet": return FileImage;
      default: return FileText;
    }
  };

  const TypeIcon = getTypeIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-violet-300 dark:hover:border-violet-700 transition-all"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <Button className="bg-white text-slate-900 hover:bg-slate-100">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {resource.isFree && (
            <Badge className="bg-green-500 text-white">Free</Badge>
          )}
          {resource.isPremium && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              Premium
            </Badge>
          )}
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 dark:bg-slate-900/90">
            <TypeIcon className="w-3 h-3 mr-1" />
            {resource.type}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <Badge variant="secondary" className="mb-2">
          {resource.category}
        </Badge>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-violet-600 transition-colors mb-2">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
          {resource.description}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={resource.author.avatar}
            alt={resource.author.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {resource.author.name}
          </span>
        </div>

        {/* Formats */}
        <div className="flex flex-wrap gap-1 mb-3">
          {resource.format.map((fmt) => (
            <span
              key={fmt}
              className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 rounded"
            >
              {fmt}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              {resource.rating}
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {resource.downloads.toLocaleString()}
            </span>
          </div>
          {resource.size && (
            <span className="text-xs text-slate-400">{resource.size}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ============ MAIN PAGE ============
export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Resources");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredResources = mockResources.filter((resource) => {
    if (selectedCategory !== "All Resources" && resource.category !== selectedCategory) {
      return false;
    }
    if (showFreeOnly && !resource.isFree) {
      return false;
    }
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-violet-600 via-violet-700 to-fuchsia-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
              <Download className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Free Design Resources
              </h1>
              <p className="text-violet-200">
                Templates, toolkits, guides, and more for designers
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates, guides, toolkits..."
              className="pl-12 py-6 text-lg bg-white text-slate-900 border-0"
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6 mt-8">
            {[
              { label: "Total Resources", value: "450+", icon: Folder },
              { label: "Free Downloads", value: "300+", icon: Zap },
              { label: "Total Downloads", value: "500K+", icon: Download },
              { label: "Happy Users", value: "50K+", icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-violet-300" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-violet-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat.name}
                  variant={selectedCategory === cat.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex-shrink-0 ${
                    selectedCategory === cat.name ? "bg-violet-600 hover:bg-violet-700" : ""
                  }`}
                >
                  <cat.icon className="w-4 h-4 mr-2" />
                  {cat.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {cat.count}
                  </Badge>
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFreeOnly}
                  onChange={(e) => setShowFreeOnly(e.target.checked)}
                  className="rounded border-slate-300"
                />
                <span className="text-slate-600 dark:text-slate-400">Free only</span>
              </label>

              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-slate-100 dark:bg-slate-800" : ""}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-slate-100 dark:bg-slate-800" : ""}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {selectedCategory}
            </h2>
            <span className="text-sm text-slate-500">
              {filteredResources.length} resources found
            </span>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ResourceCard resource={resource} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Folder className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No resources found
              </h3>
              <p className="text-slate-500">Try adjusting your filters</p>
            </div>
          )}

          {/* Load More */}
          {filteredResources.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Resources
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Submit Resource CTA */}
      <section className="py-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Share Your Resources</h2>
          <p className="text-xl text-violet-100 mb-8">
            Have a helpful template, guide, or toolkit? Share it with the community
            and help thousands of designers level up their skills.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/resources/submit">
              <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50">
                <Zap className="w-5 h-5 mr-2" />
                Submit Resource
              </Button>
            </Link>
            <Link href="/resources/guidelines">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
