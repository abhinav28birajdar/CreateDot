"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderKanban,
  Plus,
  Search,
  Grid3X3,
  List,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Star,
  Archive,
  Trash2,
  Settings,
  MessageCircle,
  FileText,
  Image,
  Upload,
  Filter,
  ChevronRight,
  Play,
  Pause,
  Check,
  Circle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
type ProjectStatus = "planning" | "in-progress" | "review" | "completed" | "on-hold";

interface WorkspaceProject {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  client: {
    name: string;
    avatar: string;
  };
  status: ProjectStatus;
  progress: number;
  startDate: string;
  dueDate: string;
  team: {
    name: string;
    avatar: string;
    role: string;
  }[];
  tasks: {
    total: number;
    completed: number;
  };
  files: number;
  comments: number;
  isStarred: boolean;
  lastActivity: string;
}

// ============ MOCK DATA ============
const mockProjects: WorkspaceProject[] = [
  {
    id: "1",
    name: "Mobile Banking App Redesign",
    description: "Complete redesign of the TechStart mobile banking application",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400",
    client: { name: "TechStart Inc.", avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100" },
    status: "in-progress",
    progress: 65,
    startDate: "2025-01-01",
    dueDate: "2025-03-01",
    team: [
      { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", role: "Lead Designer" },
      { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", role: "UX Designer" },
    ],
    tasks: { total: 24, completed: 16 },
    files: 48,
    comments: 127,
    isStarred: true,
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    name: "Brand Identity - Creative Agency",
    description: "Logo, brand guidelines, and stationery design",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400",
    client: { name: "Creative Agency", avatar: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=100" },
    status: "planning",
    progress: 15,
    startDate: "2025-01-15",
    dueDate: "2025-02-28",
    team: [
      { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", role: "Designer" },
    ],
    tasks: { total: 12, completed: 2 },
    files: 8,
    comments: 15,
    isStarred: false,
    lastActivity: "1 day ago",
  },
  {
    id: "3",
    name: "E-Commerce Dashboard",
    description: "Admin dashboard design for E-Commerce Pro",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    client: { name: "E-Commerce Pro", avatar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100" },
    status: "review",
    progress: 90,
    startDate: "2024-12-01",
    dueDate: "2025-01-20",
    team: [
      { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", role: "Designer" },
      { name: "Marcus Lee", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", role: "Developer" },
    ],
    tasks: { total: 18, completed: 16 },
    files: 32,
    comments: 89,
    isStarred: true,
    lastActivity: "5 hours ago",
  },
  {
    id: "4",
    name: "Fitness App Concept",
    description: "UI/UX design for a fitness tracking application",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    client: { name: "Startup Labs", avatar: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100" },
    status: "completed",
    progress: 100,
    startDate: "2024-10-01",
    dueDate: "2024-12-15",
    team: [
      { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", role: "Designer" },
    ],
    tasks: { total: 15, completed: 15 },
    files: 28,
    comments: 56,
    isStarred: false,
    lastActivity: "2 weeks ago",
  },
];

// ============ STATUS BADGE ============
function StatusBadge({ status }: { status: ProjectStatus }) {
  const config: Record<ProjectStatus, { label: string; icon: React.ReactNode; className: string }> = {
    planning: { label: "Planning", icon: <Circle className="w-3 h-3" />, className: "bg-slate-100 text-slate-600 dark:bg-[#111111]" },
    "in-progress": { label: "In Progress", icon: <Play className="w-3 h-3" />, className: "bg-blue-100 text-[#8B5DFF] dark:bg-blue-900/30" },
    review: { label: "In Review", icon: <Clock className="w-3 h-3" />, className: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
    completed: { label: "Completed", icon: <Check className="w-3 h-3" />, className: "bg-green-100 text-green-600 dark:bg-green-900/30" },
    "on-hold": { label: "On Hold", icon: <Pause className="w-3 h-3" />, className: "bg-orange-100 text-orange-600 dark:bg-orange-900/30" },
  };

  const { label, icon, className } = config[status];

  return (
    <Badge className={`flex items-center gap-1 ${className}`}>
      {icon}
      {label}
    </Badge>
  );
}

// ============ PROJECT CARD ============
function ProjectCard({ project, view }: { project: WorkspaceProject; view: "grid" | "list" }) {
  const [isStarred, setIsStarred] = useState(project.isStarred);
  const [showMenu, setShowMenu] = useState(false);

  const daysLeft = Math.ceil((new Date(project.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysLeft < 0 && project.status !== "completed";

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-4 bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700 transition-all"
      >
        <img
          src={project.thumbnail}
          alt={project.name}
          className="w-16 h-12 rounded-lg object-cover"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link href={`/workspace/${project.id}`}>
              <h3 className="font-semibold text-slate-900 dark:text-white hover:text-violet-600">
                {project.name}
              </h3>
            </Link>
            <button onClick={() => setIsStarred(!isStarred)}>
              <Star className={`w-4 h-4 ${isStarred ? "text-amber-500 fill-amber-500" : "text-slate-300"}`} />
            </button>
          </div>
          <p className="text-sm text-slate-500">{project.client.name}</p>
        </div>

        <div className="w-32">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-slate-500">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-[#111111] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8B5DFF] from-violet-500 to-fuchsia-500 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="flex -space-x-2">
          {project.team.slice(0, 3).map((member, i) => (
            <img
              key={i}
              src={member.avatar}
              alt={member.name}
              className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900"
              title={member.name}
            />
          ))}
          {project.team.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#111111] border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-medium">
              +{project.team.length - 3}
            </div>
          )}
        </div>

        <div className="text-sm text-slate-500">
          {isOverdue ? (
            <span className="text-red-500">Overdue</span>
          ) : project.status === "completed" ? (
            <span className="text-[#8B5DFF]">Done</span>
          ) : (
            `${daysLeft} days left`
          )}
        </div>

        <StatusBadge status={project.status} />

        <Link href={`/workspace/${project.id}`}>
          <Button variant="ghost" size="sm">
            Open
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] overflow-hidden hover:shadow-xl hover:border-violet-300 dark:hover:border-violet-700 transition-all"
    >
      <div className="relative">
        <img
          src={project.thumbnail}
          alt={project.name}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setIsStarred(!isStarred)}
            className="w-8 h-8 bg-white/90 dark:bg-[#111111]/90 rounded-full flex items-center justify-center"
          >
            <Star className={`w-4 h-4 ${isStarred ? "text-amber-500 fill-amber-500" : "text-slate-400"}`} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <StatusBadge status={project.status} />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <Link href={`/workspace/${project.id}`}>
              <h3 className="font-semibold text-slate-900 dark:text-white hover:text-violet-600 line-clamp-1">
                {project.name}
              </h3>
            </Link>
            <p className="text-sm text-slate-500 line-clamp-1">{project.description}</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-slate-100 dark:hover:bg-[#111111] rounded"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#111111] rounded-lg shadow-lg border border-slate-200 dark:border-[#1F1F1F] py-2 z-10">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-[#111111] flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Project Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-[#111111] flex items-center gap-2">
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-slate-500">Progress</span>
            <span className="font-medium text-slate-900 dark:text-white">{project.progress}%</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-[#111111] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8B5DFF] from-violet-500 to-fuchsia-500 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            {project.tasks.completed}/{project.tasks.total}
          </span>
          <span className="flex items-center gap-1">
            <Image className="w-4 h-4" />
            {project.files}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {project.comments}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#1F1F1F]">
          <div className="flex items-center gap-2">
            <img
              src={project.client.avatar}
              alt={project.client.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-slate-500">{project.client.name}</span>
          </div>
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, i) => (
              <img
                key={i}
                src={member.avatar}
                alt={member.name}
                className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============ MAIN PAGE ============
export default function WorkspacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState<"all" | ProjectStatus>("all");

  const filteredProjects = mockProjects.filter((project) => {
    if (statusFilter !== "all" && project.status !== statusFilter) return false;
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const activeProjects = mockProjects.filter((p) => p.status === "in-progress").length;
  const reviewProjects = mockProjects.filter((p) => p.status === "review").length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#8B5DFF] from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
                <FolderKanban className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Project Workspace
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage and collaborate on your projects
                </p>
              </div>
            </div>

            <Button className="bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8B5DFF]" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">{activeProjects}</span> In Progress
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">{reviewProjects}</span> In Review
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8B5DFF]" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {mockProjects.filter((p) => p.status === "completed").length}
                </span>{" "}
                Completed
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            {(["all", "in-progress", "planning", "review", "completed"] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className={statusFilter === status ? "bg-violet-600 hover:bg-violet-700" : ""}
              >
                {status === "all" ? "All Projects" : status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="pl-10 w-64"
              />
            </div>

            <div className="flex items-center border border-slate-200 dark:border-[#2A2A2A] rounded-lg">
              <button
                onClick={() => setView("grid")}
                className={`p-2 ${view === "grid" ? "bg-slate-100 dark:bg-[#111111]" : ""}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 ${view === "list" ? "bg-slate-100 dark:bg-[#111111]" : ""}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Projects */}
        {view === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} view="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} view="list" />
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <FolderKanban className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-slate-500 mb-6">
              {searchQuery ? "Try adjusting your search" : "Create your first project to get started"}
            </p>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
