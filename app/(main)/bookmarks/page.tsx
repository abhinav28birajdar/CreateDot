"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  Search,
  Grid3X3,
  List,
  Folder,
  Plus,
  MoreHorizontal,
  Heart,
  Eye,
  MessageCircle,
  Trash2,
  FolderPlus,
  Edit3,
  Share2,
  Filter,
  Clock,
  Tag,
  SortAsc,
  X,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
interface SavedItem {
  id: string;
  type: "project" | "collection" | "user" | "article";
  title: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
  };
  savedAt: string;
  folderId?: string;
  tags: string[];
  stats?: {
    likes: number;
    views: number;
    comments: number;
  };
}

interface SaveFolder {
  id: string;
  name: string;
  color: string;
  itemCount: number;
  isPrivate: boolean;
}

// ============ MOCK DATA ============
const mockFolders: SaveFolder[] = [
  { id: "all", name: "All Saved", color: "violet", itemCount: 156, isPrivate: false },
  { id: "inspiration", name: "Inspiration", color: "pink", itemCount: 45, isPrivate: false },
  { id: "references", name: "References", color: "blue", itemCount: 32, isPrivate: false },
  { id: "portfolio-ideas", name: "Portfolio Ideas", color: "amber", itemCount: 28, isPrivate: true },
  { id: "ui-patterns", name: "UI Patterns", color: "green", itemCount: 51, isPrivate: false },
];

const mockSavedItems: SavedItem[] = [
  {
    id: "1",
    type: "project",
    title: "Minimal Dashboard UI Kit",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    savedAt: "2025-01-10",
    folderId: "inspiration",
    tags: ["Dashboard", "UI Kit", "SaaS"],
    stats: { likes: 2340, views: 45000, comments: 89 },
  },
  {
    id: "2",
    type: "project",
    title: "E-commerce Mobile App Design",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600",
    author: { name: "Marcus Lee", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    savedAt: "2025-01-09",
    folderId: "references",
    tags: ["Mobile", "E-commerce", "iOS"],
    stats: { likes: 1890, views: 32000, comments: 56 },
  },
  {
    id: "3",
    type: "project",
    title: "3D Abstract Shapes Collection",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
    author: { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    savedAt: "2025-01-08",
    folderId: "inspiration",
    tags: ["3D", "Abstract", "Illustration"],
    stats: { likes: 3200, views: 58000, comments: 124 },
  },
  {
    id: "4",
    type: "project",
    title: "Brand Identity System",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600",
    author: { name: "Alex Turner", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    savedAt: "2025-01-07",
    folderId: "portfolio-ideas",
    tags: ["Branding", "Identity", "Logo"],
    stats: { likes: 4500, views: 89000, comments: 234 },
  },
  {
    id: "5",
    type: "project",
    title: "Landing Page Redesign",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    author: { name: "Jordan Park", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
    savedAt: "2025-01-06",
    folderId: "ui-patterns",
    tags: ["Landing Page", "Web Design", "SaaS"],
    stats: { likes: 2800, views: 67000, comments: 156 },
  },
  {
    id: "6",
    type: "project",
    title: "Motion Design Reel 2024",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600",
    author: { name: "Mia Rodriguez", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
    savedAt: "2025-01-05",
    folderId: "inspiration",
    tags: ["Motion", "Animation", "Reel"],
    stats: { likes: 1560, views: 28000, comments: 67 },
  },
];

// ============ SAVED ITEM CARD ============
function SavedItemCard({ item, viewMode, onRemove }: { 
  item: SavedItem; 
  viewMode: "grid" | "list";
  onRemove: (id: string) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700 transition-all"
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-24 h-16 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <Link href={`/project/${item.id}`}>
            <h3 className="font-medium text-slate-900 dark:text-white truncate hover:text-violet-600 transition-colors">
              {item.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <img src={item.author.avatar} alt="" className="w-5 h-5 rounded-full" />
            <span className="text-sm text-slate-500">{item.author.name}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {item.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        {item.stats && (
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {(item.stats.likes / 1000).toFixed(1)}K
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {(item.stats.views / 1000).toFixed(0)}K
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">
            {new Date(item.savedAt).toLocaleDateString()}
          </span>
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
              className="opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-2 z-10">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                  <FolderPlus className="w-4 h-4" />
                  Move to folder
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-violet-300 dark:hover:border-violet-700 transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Actions on hover */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onRemove(item.id)}
            className="w-8 h-8 bg-white/90 dark:bg-slate-900/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-slate-900 transition-colors"
          >
            <Bookmark className="w-4 h-4 text-violet-600 fill-violet-600" />
          </button>
        </div>

        {/* Stats on hover */}
        {item.stats && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {(item.stats.likes / 1000).toFixed(1)}K
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {(item.stats.views / 1000).toFixed(0)}K
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <Link href={`/project/${item.id}`}>
          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1 hover:text-violet-600 transition-colors">
            {item.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <img src={item.author.avatar} alt="" className="w-6 h-6 rounded-full" />
          <span className="text-sm text-slate-500">{item.author.name}</span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <span className="text-xs text-slate-400">
            Saved {new Date(item.savedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ============ MAIN PAGE ============
export default function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [savedItems, setSavedItems] = useState(mockSavedItems);

  const filteredItems = savedItems.filter((item) => {
    if (selectedFolder !== "all" && item.folderId !== selectedFolder) {
      return false;
    }
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleRemove = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
                <Bookmark className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Saved Items
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  {savedItems.length} items saved across {mockFolders.length} folders
                </p>
              </div>
            </div>

            <Button
              onClick={() => setShowNewFolderModal(true)}
              className="bg-violet-600 hover:bg-violet-700"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              New Folder
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Folders */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sticky top-24">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Folder className="w-5 h-5 text-violet-600" />
                Folders
              </h2>
              <div className="space-y-1">
                {mockFolders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedFolder === folder.id
                        ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-${folder.color}-500`} />
                      <span className="text-sm font-medium">{folder.name}</span>
                      {folder.isPrivate && (
                        <Badge variant="secondary" className="text-xs">
                          Private
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-slate-400">{folder.itemCount}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowNewFolderModal(true)}
                className="w-full mt-4 p-3 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-500 hover:border-violet-300 hover:text-violet-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Folder
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search saved items..."
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900"
                >
                  <option value="recent">Recently Saved</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="name">Name A-Z</option>
                </select>

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

            {/* Items */}
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-3"}>
                  {filteredItems.map((item) => (
                    <SavedItemCard
                      key={item.id}
                      item={item}
                      viewMode={viewMode}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Bookmark className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    No saved items found
                  </h3>
                  <p className="text-slate-500 mb-6">
                    {searchQuery
                      ? "Try adjusting your search"
                      : "Start saving projects you love!"}
                  </p>
                  <Link href="/explore">
                    <Button className="bg-violet-600 hover:bg-violet-700">
                      Explore Projects
                    </Button>
                  </Link>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* New Folder Modal */}
      <AnimatePresence>
        {showNewFolderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowNewFolderModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Create New Folder
                </h2>
                <button
                  onClick={() => setShowNewFolderModal(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Folder Name
                  </label>
                  <Input placeholder="e.g., Design Inspiration" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Color
                  </label>
                  <div className="flex gap-2">
                    {["violet", "pink", "blue", "green", "amber", "red"].map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full bg-${color}-500 ring-2 ring-offset-2 ring-transparent hover:ring-${color}-500 transition-all`}
                      />
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Make this folder private
                  </span>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowNewFolderModal(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-violet-600 hover:bg-violet-700">
                  Create Folder
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
