"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  Clock,
  User,
  ChevronRight,
  Bookmark,
  TrendingUp,
  Sparkles,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ============ MOCK DATA ============
const featuredPost = {
  id: "b1",
  title: "The Future of Design: AI-Powered Creative Tools in 2024",
  excerpt: "Explore how artificial intelligence is transforming the design industry and what it means for creative professionals. From generative design to smart automation, discover the tools shaping tomorrow.",
  coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
  author: {
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    role: "Design Lead",
  },
  publishedAt: "Dec 15, 2024",
  readTime: "8 min read",
  category: "Industry Trends",
};

const posts = [
  {
    id: "b2",
    title: "10 Design System Best Practices for 2024",
    excerpt: "Learn how to build scalable, maintainable design systems that your team will actually use.",
    coverImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
    author: { name: "Marcus Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    publishedAt: "Dec 12, 2024",
    readTime: "6 min read",
    category: "Design Systems",
  },
  {
    id: "b3",
    title: "The Psychology of Color in Brand Design",
    excerpt: "How color choices influence user perception and brand recognition in digital products.",
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop",
    author: { name: "Emily Rodriguez", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    publishedAt: "Dec 10, 2024",
    readTime: "5 min read",
    category: "Branding",
  },
  {
    id: "b4",
    title: "From Concept to Launch: A UX Case Study",
    excerpt: "A detailed walkthrough of designing a fintech app from initial research to final handoff.",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
    author: { name: "James Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    publishedAt: "Dec 8, 2024",
    readTime: "12 min read",
    category: "Case Studies",
  },
  {
    id: "b5",
    title: "Micro-Interactions That Delight Users",
    excerpt: "Small animations that make big differences in user experience and engagement.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    author: { name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
    publishedAt: "Dec 5, 2024",
    readTime: "7 min read",
    category: "UI/UX",
  },
  {
    id: "b6",
    title: "Building an Accessible Design Practice",
    excerpt: "Practical tips for creating inclusive designs that work for everyone.",
    coverImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop",
    author: { name: "Alex Thompson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
    publishedAt: "Dec 3, 2024",
    readTime: "9 min read",
    category: "Accessibility",
  },
  {
    id: "b7",
    title: "Figma vs Sketch in 2024: A Comprehensive Comparison",
    excerpt: "An honest look at the strengths and weaknesses of today's top design tools.",
    coverImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop",
    author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    publishedAt: "Dec 1, 2024",
    readTime: "10 min read",
    category: "Tools",
  },
  {
    id: "b8",
    title: "Typography Trends Shaping Modern Web Design",
    excerpt: "Explore the latest typography trends and how to implement them in your projects.",
    coverImage: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=400&fit=crop",
    author: { name: "Marcus Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    publishedAt: "Nov 28, 2024",
    readTime: "6 min read",
    category: "Typography",
  },
];

const categories = [
  { name: "All", count: 156 },
  { name: "UI/UX", count: 42 },
  { name: "Design Systems", count: 28 },
  { name: "Branding", count: 35 },
  { name: "Case Studies", count: 24 },
  { name: "Tools", count: 18 },
  { name: "Industry Trends", count: 29 },
];

const trendingTopics = [
  "AI in Design",
  "Design Tokens",
  "Variable Fonts",
  "Dark Mode",
  "Mobile First",
  "Figma Plugins",
];

// ============ BLOG CARD ============
function BlogCard({ post }: { post: typeof posts[0] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#111111] rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
    >
      <Link href={`/blog/${post.id}`}>
        <div className="aspect-[16/10] relative overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 left-3 bg-white/90 text-slate-700">
            {post.category}
          </Badge>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-slate-500 mt-2 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-[#2A2A2A]">
            <div className="flex items-center gap-2">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="text-sm text-slate-600 dark:text-slate-400">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ============ MAIN BLOG PAGE ============
export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111]">
      {/* Header */}
      <section className="bg-[#8B5DFF] from-violet-600 via-fuchsia-600 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Design Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 mb-8"
          >
            Insights, tutorials, and inspiration for creative professionals
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white focus:text-slate-900 focus:placeholder:text-slate-400"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Featured Post */}
        <section className="mb-12">
          <Link href={`/blog/${featuredPost.id}`}>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <div className="aspect-[21/9] relative">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#8B5DFF] from-black/80 via-black/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <Badge className="bg-violet-500 text-white mb-4">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-white/80 text-lg max-w-2xl mb-4">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white"
                    />
                    <div>
                      <p className="text-white font-medium">{featuredPost.author.name}</p>
                      <p className="text-white/60 text-sm">{featuredPost.author.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          </Link>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.name
                      ? "bg-violet-500 text-white"
                      : "bg-white dark:bg-[#111111] text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {cat.name}
                  <span className="ml-1 opacity-60">({cat.count})</span>
                </button>
              ))}
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter */}
            <div className="bg-[#8B5DFF] from-violet-500 to-fuchsia-500 rounded-xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-2">Design Newsletter</h3>
              <p className="text-white/80 text-sm mb-4">
                Get weekly design tips and inspiration delivered to your inbox.
              </p>
              <Input
                placeholder="Your email"
                className="mb-3 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="w-full bg-white text-violet-600 hover:bg-white/90">
                Subscribe
              </Button>
            </div>

            {/* Trending Topics */}
            <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-violet-500" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="cursor-pointer hover:bg-violet-100">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Popular This Week
              </h3>
              <div className="space-y-4">
                {posts.slice(0, 4).map((post, i) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <div className="flex items-start gap-3 group">
                      <span className="text-2xl font-bold text-violet-500/20 group-hover:text-violet-500 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors line-clamp-2 text-sm">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">{post.readTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.slice(1).map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className="flex items-center justify-between w-full py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <span className="text-slate-600 dark:text-slate-400">{cat.name}</span>
                    <span className="text-sm text-slate-400">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
