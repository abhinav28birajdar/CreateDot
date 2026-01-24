"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Star,
  MapPin,
  Calendar,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
  Send,
  Reply,
} from "lucide-react";
import Image from "next/image";

// Mock project data
const projectData = {
  id: "1",
  title: "Modern E-Commerce Dashboard",
  description:
    "A comprehensive e-commerce dashboard redesign focused on improving user experience and conversion rates. This design system includes UI components, interactions, and complete user flows for product management, order tracking, and analytics.",
  category: "UI/UX Design",
  difficulty: "Advanced",
  tools: ["Figma", "Adobe XD", "Protopie"],
  images: [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop",
      alt: "Dashboard Hero",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop",
      alt: "Dashboard Overview",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
      alt: "Product Cards",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop",
      alt: "Analytics View",
    },
  ],
  palette: [
    { name: "Primary", color: "#6366f1", hex: "#6366f1" },
    { name: "Secondary", color: "#8b5cf6", hex: "#8b5cf6" },
    { name: "Accent", color: "#ec4899", hex: "#ec4899" },
    { name: "Background", color: "#f8fafc", hex: "#f8fafc" },
    { name: "Text", color: "#0f172a", hex: "#0f172a" },
  ],
  likes: 1240,
  saves: 380,
  views: 5640,
  downloads: 145,
  liked: false,
  saved: false,
  author: {
    name: "Sarah Anderson",
    username: "sarahdesigns",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    followers: 3240,
    isFollowing: false,
    bio: "Product Designer | UX Enthusiast | Coffee Lover",
  },
  createdAt: "2024-01-15",
  updatedAt: "2024-01-20",
  tags: ["ecommerce", "dashboard", "ui-design", "web-design"],
  comments: [
    {
      id: 1,
      author: {
        name: "Alex Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      },
      content:
        "Amazing work on the dashboard! The color palette and layout are really well thought out. How long did this take?",
      likes: 24,
      liked: false,
      createdAt: "2024-01-18",
      replies: [
        {
          id: 101,
          author: {
            name: "Sarah Anderson",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
          },
          content:
            "Thank you! It took about 3 weeks including research and iterations. Really appreciated the feedback!",
          likes: 12,
          liked: false,
          createdAt: "2024-01-18",
        },
      ],
    },
    {
      id: 2,
      author: {
        name: "Jordan Smith",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      },
      content:
        "The micro-interactions are perfect. Would love to see the prototype in action!",
      likes: 18,
      liked: false,
      createdAt: "2024-01-19",
      replies: [],
    },
  ],
  relatedProjects: [
    {
      id: 2,
      title: "Mobile App Redesign",
      image:
        "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=400&h=300&fit=crop",
      views: 3200,
      likes: 840,
    },
    {
      id: 3,
      title: "Branding System",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      views: 2100,
      likes: 620,
    },
    {
      id: 4,
      title: "Design Tokens Library",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
      views: 1800,
      likes: 490,
    },
  ],
};

export default function ProjectDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [liked, setLiked] = useState(projectData.liked);
  const [saved, setSaved] = useState(projectData.saved);
  const [likes, setLikes] = useState(projectData.likes);
  const [saves, setSaves] = useState(projectData.saves);
  const [isFollowing, setIsFollowing] = useState(projectData.author.isFollowing);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [replyToId, setReplyToId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState<number | null>(null);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
    setSaves(saved ? saves - 1 : saves + 1);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const copyToClipboard = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(name);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === projectData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? projectData.images.length - 1 : prev - 1
    );
  };

  const handleShare = (platform: "twitter" | "facebook" | "linkedin") => {
    const url = window.location.href;
    const text = `Check out "${projectData.title}" by ${projectData.author.name}`;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section with Image Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full h-[500px] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 overflow-hidden"
      >
        <Image
          src={projectData.images[currentImageIndex].src}
          alt={projectData.images[currentImageIndex].alt}
          fill
          className="object-cover"
          priority
        />

        {/* Gallery Navigation */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevImage}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 rounded-full p-2 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-slate-900 dark:text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextImage}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 rounded-full p-2 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-slate-900 dark:text-white" />
          </motion.button>
        </div>

        {/* Image Thumbnails */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {projectData.images.map((image, idx) => (
            <motion.button
              key={image.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentImageIndex
                  ? "border-violet-600 dark:border-violet-400"
                  : "border-white/50 dark:border-slate-600"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>

        {/* Lightbox View Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 rounded-full p-2 transition-colors"
        >
          <Eye className="w-5 h-5 text-slate-900 dark:text-white" />
        </motion.button>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <Image
                src={projectData.images[currentImageIndex].src}
                alt={projectData.images[currentImageIndex].alt}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
              />

              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="absolute inset-y-0 left-4 flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={prevImage}
                  className="bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              <div className="absolute inset-y-0 right-4 flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={nextImage}
                  className="bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {projectData.images.map((image, idx) => (
                  <motion.button
                    key={image.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? "border-violet-400"
                        : "border-white/30"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium">
                  {projectData.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                  {projectData.difficulty}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                {projectData.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{projectData.createdAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{projectData.views} views</span>
                </div>
              </div>
            </motion.div>

            {/* Action Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-3 pb-8 border-b border-slate-200 dark:border-slate-700"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  liked
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                <span className="text-sm font-medium">{likes}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  saved
                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <Bookmark className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
                <span className="text-sm font-medium">{saves}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                <Download className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {projectData.downloads}
                </span>
              </motion.button>

              {/* Share Dropdown */}
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Share</span>
                </motion.button>

                <div className="absolute right-0 top-full mt-2 invisible group-hover:visible bg-white dark:bg-slate-800 rounded-lg shadow-lg p-2 z-10">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                  >
                    <Twitter className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-blue-700" />
                    <span className="text-sm">LinkedIn</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Project Overview
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {projectData.description}
              </p>
            </motion.div>

            {/* Tools & Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Tools Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {projectData.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {projectData.tags.map((tag) => (
                    <motion.button
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    >
                      #{tag}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Color Palette */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Color Palette
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {projectData.palette.map((color) => (
                  <motion.button
                    key={color.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(color.hex, color.name)}
                    className="group space-y-2"
                  >
                    <div
                      className="w-full h-24 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow relative overflow-hidden"
                      style={{ backgroundColor: color.color }}
                    >
                      {copiedColor === color.name && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
                        >
                          <Check className="w-6 h-6 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {color.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {color.hex}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Comments ({projectData.comments.length})
              </h2>

              {/* Add Comment Form */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Image
                    src={projectData.author.avatar}
                    alt="Your avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                      rows={3}
                    />
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition-colors">
                      <Send className="w-4 h-4" />
                      <span className="text-sm font-medium">Comment</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {projectData.comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Main Comment */}
                    <div className="flex gap-3">
                      <Image
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                          <p className="font-medium text-slate-900 dark:text-white">
                            {comment.author.name}
                          </p>
                          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                            {comment.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                          <span>{comment.createdAt}</span>
                          <button className="hover:text-violet-600 transition-colors">
                            Like ({comment.likes})
                          </button>
                          <button
                            onClick={() =>
                              setShowReplyForm(
                                showReplyForm === comment.id ? null : comment.id
                              )
                            }
                            className="hover:text-violet-600 transition-colors flex items-center gap-1"
                          >
                            <Reply className="w-3 h-3" />
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="flex gap-3 ml-6 pt-2 border-l-2 border-slate-200 dark:border-slate-700 pl-4"
                      >
                        <Image
                          src={reply.author.avatar}
                          alt={reply.author.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
                            <p className="font-medium text-sm text-slate-900 dark:text-white">
                              {reply.author.name}
                            </p>
                            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                              {reply.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <span>{reply.createdAt}</span>
                            <button className="hover:text-violet-600 transition-colors">
                              Like ({reply.likes})
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Reply Form */}
                    {showReplyForm === comment.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-6 flex gap-3 pt-2 border-l-2 border-slate-200 dark:border-slate-700 pl-4"
                      >
                        <Image
                          src={projectData.author.avatar}
                          alt="Your avatar"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 space-y-2">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm transition-colors">
                              <Send className="w-3 h-3" />
                              Reply
                            </button>
                            <button
                              onClick={() => setShowReplyForm(null)}
                              className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-violet-50 dark:from-violet-900/20 to-fuchsia-50 dark:to-fuchsia-900/20 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <Image
                  src={projectData.author.avatar}
                  alt={projectData.author.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {projectData.author.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    @{projectData.author.username}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    {projectData.author.bio}
                  </p>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {projectData.author.followers}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    followers
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFollow}
                  className={`w-full py-2 rounded-lg font-medium transition-all ${
                    isFollowing
                      ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
                      : "bg-violet-600 hover:bg-violet-700 text-white"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </motion.button>

                <button className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  Contact
                </button>
              </div>
            </motion.div>

            {/* Related Projects */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Related Projects
              </h3>

              <div className="space-y-3">
                {projectData.relatedProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ scale: 1.02 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative h-32 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm mt-2 group-hover:text-violet-600 transition-colors">
                      {project.title}
                    </h4>
                    <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-1">
                      <span>{project.views} views</span>
                      <span>{project.likes} likes</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Stats
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Views
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {projectData.views}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Likes
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {likes}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Saves
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {saves}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">
                    Downloads
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {projectData.downloads}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
