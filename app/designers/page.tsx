"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  MapPin,
  Star,
  CheckCircle,
  Heart,
  Eye,
  MessageCircle,
  Briefcase,
  Clock,
  DollarSign,
  ChevronDown,
  X,
  SlidersHorizontal,
  Users,
  TrendingUp,
  Award,
  Zap,
  Globe,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

// ============ TYPES ============
interface Designer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  title: string;
  bio: string;
  location: string;
  skills: string[];
  stats: {
    followers: number;
    following: number;
    projects: number;
    likes: number;
    views: number;
  };
  availability: "available" | "busy" | "unavailable";
  hourlyRate?: { min: number; max: number };
  isPro: boolean;
  isVerified: boolean;
  isHiring: boolean;
  memberSince: string;
  recentWork: {
    id: string;
    image: string;
    title: string;
    likes: number;
  }[];
  responseTime: string;
  completedProjects: number;
  rating: number;
  reviewCount: number;
}

// ============ MOCK DATA ============
const mockDesigners: Designer[] = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahchen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=300&fit=crop",
    title: "Senior Product Designer",
    bio: "Crafting delightful digital experiences for 8+ years. Specializing in fintech, healthcare, and e-commerce.",
    location: "San Francisco, CA",
    skills: ["UI Design", "UX Design", "Product Design", "Design Systems", "Figma"],
    stats: {
      followers: 45600,
      following: 892,
      projects: 89,
      likes: 125000,
      views: 890000,
    },
    availability: "available",
    hourlyRate: { min: 150, max: 200 },
    isPro: true,
    isVerified: true,
    isHiring: false,
    memberSince: "2019",
    recentWork: [
      { id: "w1", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400", title: "Dashboard UI", likes: 2400 },
      { id: "w2", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400", title: "E-commerce App", likes: 1890 },
      { id: "w3", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400", title: "Brand Identity", likes: 1560 },
    ],
    responseTime: "Within 24 hours",
    completedProjects: 156,
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "2",
    name: "Marcus Lee",
    username: "marcuslee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=300&fit=crop",
    title: "3D Artist & Motion Designer",
    bio: "Creating stunning 3D visuals and motion graphics. Available for freelance projects and collaborations.",
    location: "Los Angeles, CA",
    skills: ["3D Design", "Motion Graphics", "Blender", "Cinema 4D", "After Effects"],
    stats: {
      followers: 38900,
      following: 456,
      projects: 156,
      likes: 98000,
      views: 670000,
    },
    availability: "busy",
    hourlyRate: { min: 100, max: 150 },
    isPro: true,
    isVerified: false,
    isHiring: false,
    memberSince: "2020",
    recentWork: [
      { id: "w1", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400", title: "3D Shapes", likes: 3200 },
      { id: "w2", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400", title: "Abstract Art", likes: 2100 },
      { id: "w3", image: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=400", title: "Motion Reel", likes: 1890 },
    ],
    responseTime: "Within 48 hours",
    completedProjects: 89,
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: "3",
    name: "Emma Wilson",
    username: "emmawilson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    coverImage: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=300&fit=crop",
    title: "UI/UX Designer",
    bio: "Passionate about creating intuitive mobile experiences. Currently leading design at a fintech startup.",
    location: "London, UK",
    skills: ["Mobile Design", "UI/UX", "Prototyping", "User Research", "Sketch"],
    stats: {
      followers: 32400,
      following: 678,
      projects: 72,
      likes: 76000,
      views: 450000,
    },
    availability: "available",
    hourlyRate: { min: 120, max: 180 },
    isPro: false,
    isVerified: true,
    isHiring: true,
    memberSince: "2021",
    recentWork: [
      { id: "w1", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400", title: "Banking App", likes: 1800 },
      { id: "w2", image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400", title: "Finance UI", likes: 1560 },
      { id: "w3", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400", title: "Mobile Concept", likes: 1200 },
    ],
    responseTime: "Within 24 hours",
    completedProjects: 45,
    rating: 4.9,
    reviewCount: 34,
  },
  {
    id: "4",
    name: "Alex Turner",
    username: "alexturner",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=300&fit=crop",
    title: "Brand Designer & Illustrator",
    bio: "Bringing brands to life through thoughtful design and beautiful illustrations.",
    location: "New York, NY",
    skills: ["Branding", "Illustration", "Logo Design", "Typography", "Adobe Creative Suite"],
    stats: {
      followers: 28700,
      following: 345,
      projects: 98,
      likes: 65000,
      views: 380000,
    },
    availability: "unavailable",
    isPro: true,
    isVerified: true,
    isHiring: false,
    memberSince: "2018",
    recentWork: [
      { id: "w1", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400", title: "E-commerce Site", likes: 2100 },
      { id: "w2", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400", title: "Brand Guide", likes: 1890 },
      { id: "w3", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400", title: "Logo Suite", likes: 1650 },
    ],
    responseTime: "Within 72 hours",
    completedProjects: 178,
    rating: 5.0,
    reviewCount: 123,
  },
  {
    id: "5",
    name: "Jordan Park",
    username: "jordanpark",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=300&fit=crop",
    title: "Creative Director",
    bio: "10+ years leading creative teams at top agencies. Available for consulting and mentorship.",
    location: "Tokyo, Japan",
    skills: ["Creative Direction", "Brand Strategy", "Team Leadership", "Art Direction"],
    stats: {
      followers: 67800,
      following: 234,
      projects: 234,
      likes: 245000,
      views: 1200000,
    },
    availability: "available",
    hourlyRate: { min: 250, max: 400 },
    isPro: true,
    isVerified: true,
    isHiring: false,
    memberSince: "2017",
    recentWork: [
      { id: "w1", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400", title: "Agency Rebrand", likes: 5600 },
      { id: "w2", image: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?w=400", title: "Campaign", likes: 4200 },
      { id: "w3", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400", title: "Art Direction", likes: 3800 },
    ],
    responseTime: "Within 48 hours",
    completedProjects: 312,
    rating: 5.0,
    reviewCount: 234,
  },
];

const skills = [
  "UI Design",
  "UX Design",
  "Product Design",
  "Web Design",
  "Mobile Design",
  "Branding",
  "Illustration",
  "3D Design",
  "Motion Graphics",
  "Typography",
  "Logo Design",
  "Icon Design",
];

const locations = [
  "Worldwide",
  "United States",
  "Europe",
  "Asia",
  "Remote Only",
];

// ============ DESIGNER CARD ============
function DesignerCard({ designer, viewMode }: { designer: Designer; viewMode: "grid" | "list" }) {
  const getAvailabilityColor = () => {
    switch (designer.availability) {
      case "available":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-[#8B5DFF]";
      case "busy":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "unavailable":
        return "bg-slate-100 text-slate-700 dark:bg-[#111111] dark:text-slate-400";
    }
  };

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] p-6 hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700 transition-all"
      >
        <div className="flex gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={designer.avatar}
              alt={designer.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            {designer.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#8B5DFF] rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {designer.name}
                  </h3>
                  {designer.isPro && (
                    <Badge className="bg-[#8B5DFF] from-violet-600 to-fuchsia-600 text-white text-xs">
                      PRO
                    </Badge>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-1">
                  {designer.title}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {designer.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500" />
                    {designer.rating} ({designer.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className={getAvailabilityColor()}>
                  {designer.availability === "available" && "Available for hire"}
                  {designer.availability === "busy" && "Busy"}
                  {designer.availability === "unavailable" && "Not available"}
                </Badge>
                {designer.hourlyRate && (
                  <span className="text-slate-900 dark:text-white font-semibold">
                    ${designer.hourlyRate.min}-${designer.hourlyRate.max}/hr
                  </span>
                )}
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 line-clamp-2">
              {designer.bio}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {designer.skills.slice(0, 5).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {designer.skills.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{designer.skills.length - 5}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-[#1F1F1F]">
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {(designer.stats.followers / 1000).toFixed(1)}K followers
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {designer.completedProjects} projects
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {designer.responseTime}
                </span>
              </div>

              <div className="flex gap-2">
                <Link href={`/u/${designer.username}`}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
                {designer.availability === "available" && (
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                    Hire Me
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] overflow-hidden hover:shadow-xl hover:border-violet-300 dark:hover:border-violet-700 transition-all"
    >
      {/* Cover Image */}
      <div className="relative h-24 overflow-hidden">
        <img
          src={designer.coverImage}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-[#8B5DFF] from-black/40 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {designer.isPro && (
            <Badge className="bg-[#8B5DFF] from-violet-600 to-fuchsia-600 text-white text-xs">
              PRO
            </Badge>
          )}
          {designer.isHiring && (
            <Badge className="bg-[#8B5DFF] text-white text-xs">
              Hiring
            </Badge>
          )}
        </div>
      </div>

      {/* Avatar */}
      <div className="relative -mt-10 px-4">
        <div className="relative inline-block">
          <img
            src={designer.avatar}
            alt={designer.name}
            className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-900 object-cover"
          />
          {designer.isVerified && (
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#8B5DFF] rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-2">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {designer.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {designer.title}
            </p>
          </div>
          <Badge className={`${getAvailabilityColor()} text-xs`}>
            {designer.availability === "available" ? "Available" : designer.availability}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <MapPin className="w-3 h-3" />
          <span>{designer.location}</span>
          <span>•</span>
          <Star className="w-3 h-3 text-amber-500" />
          <span>{designer.rating}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {designer.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {designer.skills.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{designer.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Recent Work */}
        <div className="flex gap-1 mb-4">
          {designer.recentWork.slice(0, 3).map((work) => (
            <div key={work.id} className="w-1/3 aspect-square rounded-lg overflow-hidden">
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform"
              />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {(designer.stats.followers / 1000).toFixed(1)}K
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            {(designer.stats.likes / 1000).toFixed(0)}K
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {designer.stats.projects}
          </span>
        </div>

        {/* Rate & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#1F1F1F]">
          {designer.hourlyRate ? (
            <span className="font-semibold text-slate-900 dark:text-white">
              ${designer.hourlyRate.min}-${designer.hourlyRate.max}/hr
            </span>
          ) : (
            <span className="text-sm text-slate-400">Rate not set</span>
          )}
          <div className="flex gap-2">
            <Link href={`/u/${designer.username}`}>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </Link>
            {designer.availability === "available" && (
              <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                Hire
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============ FILTER SIDEBAR ============
function FilterSidebar({
  filters,
  setFilters,
  onReset,
}: {
  filters: Record<string, unknown>;
  setFilters: (filters: Record<string, unknown>) => void;
  onReset: () => void;
}) {
  return (
    <div className="w-64 bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] p-4 sticky top-24 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="text-xs text-violet-600">
          Reset
        </Button>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Availability
        </h4>
        <div className="space-y-2">
          {["available", "busy", "all"].map((status) => (
            <label key={status} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={(filters.availability as string) === status}
                onCheckedChange={() => setFilters({ ...filters, availability: status })}
              />
              <span className="text-slate-600 dark:text-slate-400 capitalize">
                {status === "all" ? "All" : status === "available" ? "Available for hire" : status}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Skills
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {skills.map((skill) => (
            <label key={skill} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={(filters.skills as string[])?.includes(skill)}
                onCheckedChange={(checked) => {
                  const current = (filters.skills as string[]) || [];
                  setFilters({
                    ...filters,
                    skills: checked
                      ? [...current, skill]
                      : current.filter((s) => s !== skill),
                  });
                }}
              />
              <span className="text-slate-600 dark:text-slate-400">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Location
        </h4>
        <div className="space-y-2">
          {locations.map((location) => (
            <label key={location} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={(filters.location as string) === location}
                onCheckedChange={() => setFilters({ ...filters, location })}
              />
              <span className="text-slate-600 dark:text-slate-400">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Hourly Rate */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Hourly Rate
        </h4>
        <div className="px-2">
          <Slider
            defaultValue={[0, 500]}
            max={500}
            step={10}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>$0</span>
            <span>$500+</span>
          </div>
        </div>
      </div>

      {/* Pro Badge */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <Checkbox
            checked={(filters.proOnly as boolean) || false}
            onCheckedChange={(checked) => setFilters({ ...filters, proOnly: checked })}
          />
          <span className="text-slate-600 dark:text-slate-400">Pro members only</span>
        </label>
      </div>

      {/* Verified */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <Checkbox
            checked={(filters.verifiedOnly as boolean) || false}
            onCheckedChange={(checked) => setFilters({ ...filters, verifiedOnly: checked })}
          />
          <span className="text-slate-600 dark:text-slate-400">Verified only</span>
        </label>
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============
export default function DesignersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<Record<string, unknown>>({
    availability: "all",
    skills: [],
    location: "Worldwide",
    proOnly: false,
    verifiedOnly: false,
  });

  const resetFilters = () => {
    setFilters({
      availability: "all",
      skills: [],
      location: "Worldwide",
      proOnly: false,
      verifiedOnly: false,
    });
  };

  const filteredDesigners = mockDesigners.filter((designer) => {
    if (filters.availability !== "all" && designer.availability !== filters.availability) {
      return false;
    }
    if (filters.proOnly && !designer.isPro) {
      return false;
    }
    if (filters.verifiedOnly && !designer.isVerified) {
      return false;
    }
    if (searchQuery && !designer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !designer.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-[#8B5DFF] from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Find Designers
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Discover and hire talented designers from around the world
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search designers by name, skill, or specialty..."
              className="pl-12 py-6 text-lg"
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6 mt-8">
            {[
              { label: "Total Designers", value: "50K+", icon: Users },
              { label: "Available Now", value: "12K+", icon: Zap },
              { label: "Verified Pros", value: "8K+", icon: CheckCircle },
              { label: "Countries", value: "120+", icon: Globe },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-violet-600" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#1F1F1F] sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <span className="text-sm text-slate-500">
                {filteredDesigners.length} designers found
              </span>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm border border-slate-200 dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#111111]"
              >
                <option value="relevance">Most Relevant</option>
                <option value="followers">Most Followers</option>
                <option value="rating">Highest Rated</option>
                <option value="recent">Recently Active</option>
              </select>

              <div className="flex items-center border border-slate-200 dark:border-[#2A2A2A] rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-slate-100 dark:bg-[#111111]" : ""}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-slate-100 dark:bg-[#111111]" : ""}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 256, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  onReset={resetFilters}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <div className="flex-1">
            {filteredDesigners.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredDesigners.map((designer, index) => (
                  <motion.div
                    key={designer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <DesignerCard designer={designer} viewMode={viewMode} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Users className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  No designers found
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredDesigners.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Designers
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
