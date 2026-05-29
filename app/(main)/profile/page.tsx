"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  ExternalLink,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Globe,
  Mail,
  MoreHorizontal,
  Share2,
  Flag,
  Settings,
  Edit,
  Heart,
  Eye,
  Bookmark,
  MessageCircle,
  Grid3X3,
  LayoutGrid,
  List,
  Folder,
  Users,
  Briefcase,
  Award,
  TrendingUp,
  Play,
  Check,
  Plus,
  X,
  Copy,
  Sparkles,
  Palette,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ============ MOCK DATA ============
const mockUser = {
  id: "u1",
  name: "Sarah Chen",
  username: "sarahchen",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600&h=400&fit=crop",
  bio: "Senior Product Designer at Google. Passionate about creating intuitive and beautiful user experiences. Previously at Airbnb and Stripe.",
  tagline: "Turning complexity into simplicity through design ✨",
  location: "San Francisco, CA",
  website: "https://sarahchen.design",
  joinedAt: "January 2021",
  isPro: true,
  isVerified: true,
  isAvailable: true,
  isOwner: true, // Current user is viewing their own profile
  stats: {
    followers: 15600,
    following: 842,
    projects: 42,
    likes: 89400,
    views: 1250000,
  },
  skills: ["UI/UX Design", "Product Design", "Design Systems", "Prototyping", "User Research"],
  tools: ["Figma", "Framer", "Principle", "After Effects"],
  experience: "Senior (5-10 years)",
  socialLinks: {
    twitter: "sarahchen",
    linkedin: "sarahchen",
    instagram: "sarahchen.design",
    github: "sarahchen",
    dribbble: "sarahchen",
    behance: "sarahchen",
  },
  isFollowing: false,
};

const mockProjects = [
  {
    id: "1",
    title: "FinTech Mobile App Dashboard",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    stats: { likes: 2340, views: 15600, comments: 89 },
    tags: ["UI/UX", "Mobile", "Dashboard"],
    createdAt: "2 days ago",
  },
  {
    id: "2",
    title: "E-commerce Website Redesign",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    stats: { likes: 1890, views: 12400, comments: 67 },
    tags: ["Web Design", "E-commerce"],
    createdAt: "1 week ago",
  },
  {
    id: "3",
    title: "Banking App Design System",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
    stats: { likes: 3210, views: 22100, comments: 134 },
    tags: ["Design System", "Banking"],
    createdAt: "2 weeks ago",
  },
  {
    id: "4",
    title: "Healthcare Dashboard",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    stats: { likes: 1560, views: 9800, comments: 45 },
    tags: ["Healthcare", "Dashboard"],
    createdAt: "3 weeks ago",
  },
  {
    id: "5",
    title: "Motion Design Showreel",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    stats: { likes: 4560, views: 32100, comments: 201 },
    tags: ["Motion", "Animation"],
    createdAt: "1 month ago",
    isVideo: true,
  },
  {
    id: "6",
    title: "SaaS Landing Page",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    stats: { likes: 2890, views: 18400, comments: 92 },
    tags: ["Web Design", "SaaS"],
    createdAt: "1 month ago",
  },
];

const mockCollections = [
  {
    id: "c1",
    title: "Dashboard Inspiration",
    description: "Collection of beautiful dashboard designs",
    cover: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop",
    ],
    projectCount: 24,
    isPublic: true,
  },
  {
    id: "c2",
    title: "Mobile UI Patterns",
    description: "Useful mobile design patterns",
    cover: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop",
    ],
    projectCount: 18,
    isPublic: true,
  },
  {
    id: "c3",
    title: "Color Inspiration",
    description: "Beautiful color palettes",
    cover: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
    ],
    projectCount: 32,
    isPublic: false,
  },
];

const mockLikedProjects = mockProjects.slice(0, 4).map((p) => ({
  ...p,
  author: {
    name: "Mike Ross",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
}));

const mockAppreciations = [
  {
    id: "a1",
    user: {
      name: "Mike Ross",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      username: "mikeross",
    },
    project: mockProjects[0],
    type: "like",
    createdAt: "2 hours ago",
  },
  {
    id: "a2",
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      username: "emmawilson",
    },
    project: mockProjects[1],
    type: "comment",
    comment: "Absolutely stunning work! Love the attention to detail.",
    createdAt: "5 hours ago",
  },
  {
    id: "a3",
    user: {
      name: "Jordan Lee",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      username: "jordanlee",
    },
    project: mockProjects[2],
    type: "follow",
    createdAt: "1 day ago",
  },
];

// ============ HELPER FUNCTIONS ============
const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

// ============ PROJECT CARD ============
function ProjectCard({ project, showAuthor = false }: { project: typeof mockProjects[0] & { author?: { name: string; avatar: string } }; showAuthor?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/project/${project.id}`}>
      <div
        className="group bg-white dark:bg-[#111111] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {"isVideo" in project && project.isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-[#0B0B0C]/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
          )}

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#8B5DFF] from-black/70 via-transparent to-transparent"
              >
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-medium mb-2">{project.title}</h3>
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {formatNumber(project.stats.likes)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {formatNumber(project.stats.views)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-slate-900 dark:text-white line-clamp-1">
            {project.title}
          </h3>
          {showAuthor && project.author && (
            <div className="flex items-center gap-2 mt-2">
              <Image
                src={project.author.avatar}
                alt={project.author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm text-slate-500">{project.author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-3 mt-2 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              {formatNumber(project.stats.likes)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {formatNumber(project.stats.views)}
            </span>
            <span>{project.createdAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ============ COLLECTION CARD ============
function CollectionCard({ collection }: { collection: typeof mockCollections[0] }) {
  return (
    <Link href={`/collection/${collection.id}`}>
      <div className="group">
        <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden aspect-square">
          {collection.cover.map((img, i) => (
            <div key={i} className="relative aspect-square">
              <Image
                src={img}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors">
              {collection.title}
            </h3>
            {!collection.isPublic && (
              <Badge variant="outline" className="text-xs">Private</Badge>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {collection.projectCount} projects
          </p>
        </div>
      </div>
    </Link>
  );
}

// ============ SHARE MODAL ============
function ShareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://designdot.com/${mockUser.username}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0B0B0C]/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-[#111111] rounded-2xl p-6 z-50"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Share Profile
              </h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <button className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-90">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:opacity-90">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border rounded-lg text-sm bg-slate-50 dark:bg-slate-700"
              />
              <Button onClick={copyLink} variant="outline">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============ MAIN PROFILE PAGE ============
export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(mockUser.isFollowing);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111]">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-[#8B5DFF] from-violet-600 to-fuchsia-600">
        {mockUser.coverImage && (
          <Image
            src={mockUser.coverImage}
            alt="Cover"
            fill
            className="object-cover"
          />
        )}
        {mockUser.isOwner && (
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Cover
          </Button>
        )}
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative -mt-16 md:-mt-20 lg:-mt-24 mb-8">
          <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Avatar */}
              <div className="relative -mt-20 md:-mt-24">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-[#1F1F1F] overflow-hidden shadow-lg bg-slate-100">
                  <Image
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {mockUser.isOwner && (
                  <Link
                    href="/profile/edit"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center text-white hover:bg-violet-600 transition-colors shadow-lg"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                        {mockUser.name}
                      </h1>
                      {mockUser.isVerified && (
                        <div className="w-6 h-6 bg-[#8B5DFF] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {mockUser.isPro && (
                        <Badge className="bg-violet-100 text-violet-700">PRO</Badge>
                      )}
                    </div>
                    <p className="text-slate-500">@{mockUser.username}</p>
                    <p className="text-slate-700 dark:text-slate-300 mt-2 max-w-xl">
                      {mockUser.tagline}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-500">
                      {mockUser.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {mockUser.location}
                        </span>
                      )}
                      {mockUser.website && (
                        <a
                          href={mockUser.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-violet-600"
                        >
                          <Globe className="w-4 h-4" />
                          {mockUser.website.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {mockUser.joinedAt}
                      </span>
                    </div>

                    {/* Availability Badge */}
                    {mockUser.isAvailable && (
                      <Badge variant="outline" className="mt-3 text-green-600 border-green-300">
                        <Briefcase className="w-3 h-3 mr-1" />
                        Available for work
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {mockUser.isOwner ? (
                      <>
                        <Link href="/profile/edit">
                          <Button variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                          </Button>
                        </Link>
                        <Link href="/settings">
                          <Button variant="outline" size="icon">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Button
                          variant={isFollowing ? "outline" : "default"}
                          onClick={() => setIsFollowing(!isFollowing)}
                          className={!isFollowing ? "bg-violet-500 hover:bg-violet-600" : ""}
                        >
                          {isFollowing ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Following
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Follow
                            </>
                          )}
                        </Button>
                        <Link href={`/messages?user=${mockUser.username}`}>
                          <Button variant="outline">
                            <Mail className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                        </Link>
                        <Button variant="outline" size="icon" onClick={() => setShowShareModal(true)}>
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-200 dark:border-[#2A2A2A]">
                  <Link href={`/profile/${mockUser.username}/followers`} className="text-center hover:opacity-80">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {formatNumber(mockUser.stats.followers)}
                    </div>
                    <div className="text-sm text-slate-500">Followers</div>
                  </Link>
                  <Link href={`/profile/${mockUser.username}/following`} className="text-center hover:opacity-80">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {formatNumber(mockUser.stats.following)}
                    </div>
                    <div className="text-sm text-slate-500">Following</div>
                  </Link>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {mockUser.stats.projects}
                    </div>
                    <div className="text-sm text-slate-500">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {formatNumber(mockUser.stats.likes)}
                    </div>
                    <div className="text-sm text-slate-500">Likes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-white dark:bg-[#111111] p-1 rounded-lg">
              <TabsTrigger value="projects" className="gap-2">
                <Grid3X3 className="w-4 h-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="collections" className="gap-2">
                <Folder className="w-4 h-4" />
                Collections
              </TabsTrigger>
              <TabsTrigger value="likes" className="gap-2">
                <Heart className="w-4 h-4" />
                Likes
              </TabsTrigger>
              <TabsTrigger value="about" className="gap-2">
                <Users className="w-4 h-4" />
                About
              </TabsTrigger>
            </TabsList>

            {/* View Toggle */}
            <div className="hidden md:flex items-center gap-1 bg-white dark:bg-[#111111] rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-slate-100 dark:bg-slate-700"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-slate-100 dark:bg-slate-700"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockUser.isOwner && (
                <Link href="/collections/new">
                  <div className="aspect-square border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-violet-600 hover:border-violet-400 transition-colors">
                    <Plus className="w-8 h-8" />
                    <span className="text-sm font-medium">New Collection</span>
                  </div>
                </Link>
              )}
              {mockCollections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </TabsContent>

          {/* Likes Tab */}
          <TabsContent value="likes">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockLikedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} showAuthor />
              ))}
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Bio */}
                <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    About
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">
                    {mockUser.bio}
                  </p>
                </div>

                {/* Skills */}
                <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-500" />
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-fuchsia-500" />
                    Tools
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.tools.map((tool) => (
                      <Badge key={tool} variant="outline">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Social Links */}
                <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Connect
                  </h2>
                  <div className="space-y-3">
                    {mockUser.socialLinks.twitter && (
                      <a
                        href={`https://twitter.com/${mockUser.socialLinks.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-violet-600"
                      >
                        <Twitter className="w-5 h-5" />
                        @{mockUser.socialLinks.twitter}
                      </a>
                    )}
                    {mockUser.socialLinks.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${mockUser.socialLinks.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-violet-600"
                      >
                        <Linkedin className="w-5 h-5" />
                        {mockUser.socialLinks.linkedin}
                      </a>
                    )}
                    {mockUser.socialLinks.instagram && (
                      <a
                        href={`https://instagram.com/${mockUser.socialLinks.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-violet-600"
                      >
                        <Instagram className="w-5 h-5" />
                        @{mockUser.socialLinks.instagram}
                      </a>
                    )}
                    {mockUser.socialLinks.github && (
                      <a
                        href={`https://github.com/${mockUser.socialLinks.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-violet-600"
                      >
                        <Github className="w-5 h-5" />
                        {mockUser.socialLinks.github}
                      </a>
                    )}
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Experience
                  </h2>
                  <Badge variant="outline" className="text-base">
                    {mockUser.experience}
                  </Badge>
                </div>

                {/* Stats Card */}
                <div className="bg-[#8B5DFF] from-violet-500 to-fuchsia-500 rounded-xl p-6 text-white">
                  <h2 className="font-semibold mb-4">Profile Stats</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="opacity-80">Total Views</span>
                      <span className="font-semibold">{formatNumber(mockUser.stats.views)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Total Likes</span>
                      <span className="font-semibold">{formatNumber(mockUser.stats.likes)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Projects</span>
                      <span className="font-semibold">{mockUser.stats.projects}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Share Modal */}
      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
    </div>
  );
}
