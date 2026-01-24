"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  readTime: number;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Portfolio Tips That Will Get You Hired in 2026",
    excerpt: "Learn the secrets top designers use to create portfolios that stand out and attract dream clients.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    category: "Career",
    readTime: 8,
    publishedAt: "2026-01-15",
    author: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=blog1",
    },
  },
  {
    id: "2",
    title: "The Complete Guide to Pricing Your Design Services",
    excerpt: "Stop undercharging! This comprehensive guide helps you price your work confidently.",
    coverImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600",
    category: "Business",
    readTime: 12,
    publishedAt: "2026-01-12",
    author: {
      name: "Michael Torres",
      avatar: "https://i.pravatar.cc/150?u=blog2",
    },
  },
  {
    id: "3",
    title: "Design Trends to Watch in 2026",
    excerpt: "From AI-generated art to nostalgic minimalism, here's what's shaping the future of design.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600",
    category: "Trends",
    readTime: 6,
    publishedAt: "2026-01-10",
    author: {
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?u=blog3",
    },
  },
];

export default function BlogSection() {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Latest Articles
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
              Design Insights
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Tips, trends, and stories from the creative community
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold hover:underline"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <Link href={`/blog/${post.id}`}>
                <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  {/* Cover Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-900 dark:text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {post.author.name}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
