"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wrench,
  Search,
  ExternalLink,
  Star,
  Users,
  Sparkles,
  Palette,
  Code,
  Image,
  Type,
  Layers,
  Grid3X3,
  Smartphone,
  Monitor,
  Zap,
  DollarSign,
  CheckCircle,
  Filter,
  Heart,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
interface DesignTool {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  pricing: "free" | "freemium" | "paid";
  platforms: ("web" | "mac" | "windows" | "ios" | "android")[];
  rating: number;
  users: string;
  tags: string[];
  url: string;
  featured?: boolean;
}

// ============ MOCK DATA ============
const categories = [
  { id: "all", name: "All Tools", icon: <Grid3X3 className="w-5 h-5" /> },
  { id: "design", name: "Design", icon: <Palette className="w-5 h-5" /> },
  { id: "prototyping", name: "Prototyping", icon: <Layers className="w-5 h-5" /> },
  { id: "illustration", name: "Illustration", icon: <Image className="w-5 h-5" /> },
  { id: "typography", name: "Typography", icon: <Type className="w-5 h-5" /> },
  { id: "development", name: "Development", icon: <Code className="w-5 h-5" /> },
  { id: "ai", name: "AI Tools", icon: <Sparkles className="w-5 h-5" /> },
  { id: "collaboration", name: "Collaboration", icon: <Users className="w-5 h-5" /> },
];

const mockTools: DesignTool[] = [
  {
    id: "1",
    name: "Figma",
    description: "The collaborative interface design tool. Design, prototype, and gather feedback all in one place.",
    logo: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png",
    category: "design",
    pricing: "freemium",
    platforms: ["web", "mac", "windows"],
    rating: 4.9,
    users: "4M+",
    tags: ["UI Design", "Prototyping", "Collaboration"],
    url: "https://figma.com",
    featured: true,
  },
  {
    id: "2",
    name: "Framer",
    description: "Design and publish stunning sites in minutes. No code required.",
    logo: "https://www.framer.com/images/favicons/framer.png",
    category: "prototyping",
    pricing: "freemium",
    platforms: ["web", "mac"],
    rating: 4.7,
    users: "2M+",
    tags: ["No-code", "Web Design", "Animation"],
    url: "https://framer.com",
    featured: true,
  },
  {
    id: "3",
    name: "Adobe Illustrator",
    description: "The industry-standard vector graphics software for print, web, video, and mobile.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/1200px-Adobe_Illustrator_CC_icon.svg.png",
    category: "illustration",
    pricing: "paid",
    platforms: ["mac", "windows"],
    rating: 4.8,
    users: "10M+",
    tags: ["Vector", "Illustration", "Print"],
    url: "https://adobe.com/illustrator",
  },
  {
    id: "4",
    name: "Midjourney",
    description: "AI-powered image generation tool that creates stunning visuals from text prompts.",
    logo: "https://seeklogo.com/images/M/midjourney-logo-631F6D8A58-seeklogo.com.png",
    category: "ai",
    pricing: "paid",
    platforms: ["web"],
    rating: 4.6,
    users: "15M+",
    tags: ["AI", "Image Generation", "Concept Art"],
    url: "https://midjourney.com",
    featured: true,
  },
  {
    id: "5",
    name: "VS Code",
    description: "A lightweight but powerful source code editor with built-in support for JavaScript, TypeScript, and more.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png",
    category: "development",
    pricing: "free",
    platforms: ["web", "mac", "windows"],
    rating: 4.9,
    users: "30M+",
    tags: ["Code Editor", "Extensions", "Git"],
    url: "https://code.visualstudio.com",
  },
  {
    id: "6",
    name: "Notion",
    description: "All-in-one workspace for notes, docs, project management, and team collaboration.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    category: "collaboration",
    pricing: "freemium",
    platforms: ["web", "mac", "windows", "ios", "android"],
    rating: 4.8,
    users: "20M+",
    tags: ["Notes", "Docs", "Project Management"],
    url: "https://notion.so",
  },
  {
    id: "7",
    name: "Blender",
    description: "Free and open-source 3D creation suite supporting modeling, animation, and rendering.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/1200px-Blender_logo_no_text.svg.png",
    category: "illustration",
    pricing: "free",
    platforms: ["mac", "windows"],
    rating: 4.8,
    users: "5M+",
    tags: ["3D", "Animation", "Rendering"],
    url: "https://blender.org",
  },
  {
    id: "8",
    name: "Webflow",
    description: "Build professional, custom websites in a completely visual canvas with no code.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Webflow_logo.svg",
    category: "development",
    pricing: "freemium",
    platforms: ["web"],
    rating: 4.7,
    users: "3.5M+",
    tags: ["No-code", "Web Design", "CMS"],
    url: "https://webflow.com",
  },
  {
    id: "9",
    name: "Spline",
    description: "Create 3D web experiences directly in the browser with an easy-to-use editor.",
    logo: "https://app.spline.design/_next/image?url=%2Flogo.png&w=128&q=75",
    category: "illustration",
    pricing: "freemium",
    platforms: ["web", "mac"],
    rating: 4.5,
    users: "1M+",
    tags: ["3D", "Web", "Interactive"],
    url: "https://spline.design",
  },
  {
    id: "10",
    name: "Miro",
    description: "Online whiteboard for visual collaboration, brainstorming, and project planning.",
    logo: "https://asset.brandfetch.io/idAnDTFapY/idYC5f2L1X.png",
    category: "collaboration",
    pricing: "freemium",
    platforms: ["web", "mac", "windows", "ios", "android"],
    rating: 4.7,
    users: "50M+",
    tags: ["Whiteboard", "Collaboration", "Brainstorming"],
    url: "https://miro.com",
  },
];

// ============ TOOL CARD ============
function ToolCard({ tool, view }: { tool: DesignTool; view: "grid" | "list" }) {
  const getPricingBadge = () => {
    switch (tool.pricing) {
      case "free":
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Free</Badge>;
      case "freemium":
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Freemium</Badge>;
      case "paid":
        return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Paid</Badge>;
    }
  };

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700 transition-all"
      >
        <img src={tool.logo} alt={tool.name} className="w-16 h-16 rounded-xl object-contain" />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
            {tool.featured && (
              <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                Featured
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1 mt-1">
            {tool.description}
          </p>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              {tool.rating}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {tool.users}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {tool.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {getPricingBadge()}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bookmark className="w-4 h-4" />
          </Button>
          <a href={tool.url} target="_blank" rel="noopener noreferrer">
            <Button className="bg-violet-600 hover:bg-violet-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit
            </Button>
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-violet-300 dark:hover:border-violet-700 transition-all"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <img src={tool.logo} alt={tool.name} className="w-14 h-14 rounded-xl object-contain" />
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Bookmark className="w-5 h-5 text-slate-400 hover:text-violet-600" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
          {tool.featured && (
            <Sparkles className="w-4 h-4 text-violet-500" />
          )}
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              {tool.rating}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {tool.users}
            </span>
          </div>
          {getPricingBadge()}
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex gap-1">
            {tool.platforms.includes("web") && (
              <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center" title="Web">
                <Monitor className="w-3 h-3" />
              </div>
            )}
            {tool.platforms.includes("mac") && (
              <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center" title="macOS">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
            )}
            {tool.platforms.includes("windows") && (
              <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center" title="Windows">
                <Grid3X3 className="w-3 h-3" />
              </div>
            )}
            {tool.platforms.includes("ios") && (
              <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center" title="iOS">
                <Smartphone className="w-3 h-3" />
              </div>
            )}
          </div>
          <div className="flex-1" />
          <a href={tool.url} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
              <ExternalLink className="w-3 h-3 mr-1" />
              Visit
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ============ MAIN PAGE ============
export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [pricingFilter, setPricingFilter] = useState<"all" | "free" | "freemium" | "paid">("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredTools = mockTools.filter((tool) => {
    if (selectedCategory !== "all" && tool.category !== selectedCategory) return false;
    if (pricingFilter !== "all" && tool.pricing !== pricingFilter) return false;
    if (searchQuery && !tool.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !tool.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const featuredTools = mockTools.filter((t) => t.featured);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Wrench className="w-5 h-5" />
              <span className="text-sm font-medium">Design Tools Directory</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Essential Tools for Designers
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Discover the best design tools, software, and resources curated by our community.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="pl-12 py-6 text-lg bg-white text-slate-900 border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-violet-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Featured Tools</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featuredTools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 border border-violet-100 dark:border-violet-800"
              >
                <img src={tool.logo} alt={tool.name} className="w-12 h-12 rounded-lg object-contain" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-900 dark:text-white">{tool.name}</h3>
                  <p className="text-sm text-slate-500 truncate">{tool.tags.join(", ")}</p>
                </div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 text-violet-500 hover:text-violet-600" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sticky top-24">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Categories</h2>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {category.icon}
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Pricing</h3>
                <div className="space-y-2">
                  {(["all", "free", "freemium", "paid"] as const).map((pricing) => (
                    <button
                      key={pricing}
                      onClick={() => setPricingFilter(pricing)}
                      className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                        pricingFilter === pricing
                          ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {pricing === "free" && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {pricing === "freemium" && <Zap className="w-4 h-4 text-blue-500" />}
                      {pricing === "paid" && <DollarSign className="w-4 h-4 text-amber-500" />}
                      {pricing === "all" && <Filter className="w-4 h-4" />}
                      <span className="capitalize">{pricing === "all" ? "All Pricing" : pricing}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Tools Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-600 dark:text-slate-400">
                Showing <span className="font-medium text-slate-900 dark:text-white">{filteredTools.length}</span> tools
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-lg ${view === "grid" ? "bg-slate-100 dark:bg-slate-800" : ""}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-lg ${view === "list" ? "bg-slate-100 dark:bg-slate-800" : ""}`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {view === "grid" ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} view="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} view="list" />
                ))}
              </div>
            )}

            {filteredTools.length === 0 && (
              <div className="text-center py-16">
                <Wrench className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  No tools found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Submit Tool CTA */}
      <section className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Know a great design tool?</h2>
              <p className="text-white/80">
                Submit it to our directory and help the design community discover amazing tools.
              </p>
            </div>
            <Button size="lg" className="bg-white text-violet-600 hover:bg-white/90">
              Submit a Tool
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
