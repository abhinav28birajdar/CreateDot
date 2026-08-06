"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Layout,
  Plus,
  Grip,
  Eye,
  Edit3,
  Trash2,
  ExternalLink,
  Globe,
  Lock,
  Image,
  Palette,
  Settings,
  CheckCircle,
  Copy,
  Share2,
  MoreHorizontal,
  Sparkles,
  Calendar,
  ArrowUpRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
interface PortfolioProject {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  views: number;
  likes: number;
  featured: boolean;
}

interface Portfolio {
  id: string;
  name: string;
  slug: string;
  description: string;
  isPublic: boolean;
  views: number;
  projects: PortfolioProject[];
  theme: string;
  customDomain?: string;
  createdAt: string;
  updatedAt: string;
}

// ============ MOCK DATA ============
const mockPortfolios: Portfolio[] = [
  {
    id: "1",
    name: "Main Portfolio",
    slug: "john-doe",
    description: "My primary design portfolio showcasing UI/UX projects",
    isPublic: true,
    views: 12450,
    theme: "minimal",
    customDomain: "johndoe.design",
    createdAt: "2024-01-15",
    updatedAt: "2025-01-10",
    projects: [
      { id: "p1", title: "Mobile Banking App", thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=300", category: "Mobile Design", views: 4500, likes: 234, featured: true },
      { id: "p2", title: "E-commerce Dashboard", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300", category: "Web Design", views: 3200, likes: 189, featured: true },
      { id: "p3", title: "Brand Identity - TechCo", thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=300", category: "Branding", views: 2800, likes: 156, featured: false },
      { id: "p4", title: "Fitness App Redesign", thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300", category: "Mobile Design", views: 1950, likes: 112, featured: false },
    ],
  },
  {
    id: "2",
    name: "Freelance Work",
    slug: "john-doe-freelance",
    description: "Selected client projects from freelance work",
    isPublic: true,
    views: 5670,
    theme: "dark",
    createdAt: "2024-06-20",
    updatedAt: "2025-01-08",
    projects: [
      { id: "p5", title: "Restaurant Website", thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300", category: "Web Design", views: 2100, likes: 98, featured: true },
      { id: "p6", title: "Event App Concept", thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300", category: "Mobile Design", views: 1800, likes: 87, featured: false },
    ],
  },
  {
    id: "3",
    name: "Side Projects",
    slug: "experiments",
    description: "Personal experiments and passion projects",
    isPublic: false,
    views: 890,
    theme: "colorful",
    createdAt: "2024-09-01",
    updatedAt: "2025-01-05",
    projects: [
      { id: "p7", title: "3D Illustrations", thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300", category: "Illustration", views: 450, likes: 34, featured: false },
    ],
  },
];

// ============ PROJECT CARD ============
function ProjectCard({ project, onRemove }: { project: PortfolioProject; onRemove: () => void }) {
  return (
    <Reorder.Item
      value={project}
      id={project.id}
      className="group relative bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#2A2A2A] overflow-hidden"
    >
      <div className="absolute top-2 left-2 z-10 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity">
        <Grip className="w-5 h-5 text-white drop-shadow-lg" />
      </div>
      
      <div className="relative aspect-[4/3]">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0B0C]/0 group-hover:bg-[#0B0B0C]/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button className="p-2 bg-white rounded-full hover:bg-slate-100">
              <Eye className="w-4 h-4 text-slate-700" />
            </button>
            <button className="p-2 bg-white rounded-full hover:bg-slate-100">
              <Edit3 className="w-4 h-4 text-slate-700" />
            </button>
            <button
              onClick={onRemove}
              className="p-2 bg-white rounded-full hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
        {project.featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-amber-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h4 className="font-medium text-slate-900 dark:text-white text-sm truncate">
          {project.title}
        </h4>
        <div className="flex items-center justify-between mt-1">
          <Badge variant="secondary" className="text-xs">{project.category}</Badge>
          <span className="text-xs text-slate-500">{project.views} views</span>
        </div>
      </div>
    </Reorder.Item>
  );
}

// ============ PORTFOLIO CARD ============
function PortfolioCard({ portfolio, onEdit, onDelete }: { 
  portfolio: Portfolio; 
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Preview Grid */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-[#111111]">
        {portfolio.projects.slice(0, 4).map((project, i) => (
          <div
            key={project.id}
            className={`aspect-[4/3] ${i === 0 && portfolio.projects.length >= 3 ? "col-span-2 row-span-2" : ""}`}
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
        {portfolio.projects.length === 0 && (
          <div className="col-span-2 aspect-video flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded">
            <Image className="w-8 h-8 text-slate-400" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-white truncate">
              {portfolio.name}
            </h3>
            <p className="text-sm text-slate-500 line-clamp-1">{portfolio.description}</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-[#111111] rounded-lg"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#111111] rounded-lg shadow-lg border border-slate-200 dark:border-[#1F1F1F] py-2 z-10">
                <button
                  onClick={() => { onEdit(); setShowMenu(false); }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-[#111111] flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Portfolio
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-[#111111] flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Duplicate
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-[#111111] flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <hr className="my-2 border-slate-200 dark:border-[#2A2A2A]" />
                <button
                  onClick={() => { onDelete(); setShowMenu(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-sm text-slate-500">
            {portfolio.isPublic ? (
              <>
                <Globe className="w-4 h-4" />
                <span>Public</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Private</span>
              </>
            )}
          </div>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-sm text-slate-500">{portfolio.projects.length} projects</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-sm text-slate-500">{portfolio.views.toLocaleString()} views</span>
        </div>

        {portfolio.customDomain && (
          <div className="flex items-center gap-2 p-2 bg-violet-50 dark:bg-violet-900/20 rounded-lg mb-3">
            <Globe className="w-4 h-4 text-violet-500" />
            <span className="text-sm text-violet-600 dark:text-violet-400">{portfolio.customDomain}</span>
            <ArrowUpRight className="w-3 h-3 text-violet-500" />
          </div>
        )}

        <div className="flex gap-2">
          <a
            href={`/portfolio/${portfolio.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </a>
          <Button size="sm" className="flex-1 bg-violet-600 hover:bg-violet-700" onClick={onEdit}>
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ============ MAIN PAGE ============
export default function ShowcasePage() {
  const [portfolios, setPortfolios] = useState(mockPortfolios);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);

  const totalViews = portfolios.reduce((sum, p) => sum + p.views, 0);
  const totalProjects = portfolios.reduce((sum, p) => sum + p.projects.length, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#8B5DFF] from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
                <Layout className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Portfolio Showcase
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Create and manage your portfolio collections
                </p>
              </div>
            </div>

            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-violet-600 hover:bg-violet-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Portfolio
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            {[
              { label: "Total Portfolios", value: portfolios.length, icon: Layout },
              { label: "Total Projects", value: totalProjects, icon: Image },
              { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye },
              { label: "Public Portfolios", value: portfolios.filter((p) => p.isPublic).length, icon: Globe },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-50 dark:bg-[#111111] rounded-xl p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 flex items-center justify-center">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              onEdit={() => setEditingPortfolio(portfolio)}
              onDelete={() => setPortfolios((prev) => prev.filter((p) => p.id !== portfolio.id))}
            />
          ))}

          {/* Add New Card */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowCreateModal(true)}
            className="min-h-[300px] bg-white dark:bg-[#111111] rounded-xl border-2 border-dashed border-slate-200 dark:border-[#2A2A2A] flex flex-col items-center justify-center gap-4 hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-[#111111] flex items-center justify-center">
              <Plus className="w-8 h-8 text-slate-400" />
            </div>
            <div className="text-center">
              <p className="font-medium text-slate-900 dark:text-white">Create New Portfolio</p>
              <p className="text-sm text-slate-500">Organize and showcase your work</p>
            </div>
          </motion.button>
        </div>

        {/* Quick Tips */}
        <section className="mt-12 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-2xl p-8 text-white">
          <h2 className="text-xl font-bold mb-4">Pro Tips for Your Portfolio</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "Feature Your Best Work", desc: "Put your strongest projects at the top to make a great first impression." },
              { icon: Palette, title: "Keep It Consistent", desc: "Use a cohesive visual style across all projects for a professional look." },
              { icon: Globe, title: "Use Custom Domains", desc: "Stand out with a custom domain like yourname.design for your portfolio." },
            ].map((tip) => (
              <div key={tip.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <tip.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{tip.title}</h3>
                  <p className="text-sm text-white/80">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {(showCreateModal || editingPortfolio) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0B0B0C]/50 flex items-center justify-center z-50 p-4"
            onClick={() => { setShowCreateModal(false); setEditingPortfolio(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#111111] rounded-xl p-6 w-full max-w-lg shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {editingPortfolio ? "Edit Portfolio" : "Create New Portfolio"}
                </h2>
                <button
                  onClick={() => { setShowCreateModal(false); setEditingPortfolio(null); }}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-[#111111] rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Portfolio Name
                  </label>
                  <Input
                    placeholder="e.g., Main Portfolio"
                    defaultValue={editingPortfolio?.name}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    URL Slug
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">createdot.com/portfolio/</span>
                    <Input
                      placeholder="my-portfolio"
                      defaultValue={editingPortfolio?.slug}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-200 dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#111111] text-slate-900 dark:text-white"
                    rows={3}
                    placeholder="Describe your portfolio..."
                    defaultValue={editingPortfolio?.description}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Theme
                  </label>
                  <div className="flex gap-2">
                    {["minimal", "dark", "colorful", "elegant"].map((theme) => (
                      <button
                        key={theme}
                        className={`px-4 py-2 rounded-lg border ${
                          (editingPortfolio?.theme || "minimal") === theme
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-600"
                            : "border-slate-200 dark:border-[#2A2A2A]"
                        }`}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300"
                    defaultChecked={editingPortfolio?.isPublic ?? true}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Make this portfolio public
                  </span>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => { setShowCreateModal(false); setEditingPortfolio(null); }}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-violet-600 hover:bg-violet-700">
                  {editingPortfolio ? "Save Changes" : "Create Portfolio"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
