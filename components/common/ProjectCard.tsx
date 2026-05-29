"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Project, User } from "@/types";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  creator?: User;
  onLike?: () => void;
  isLiked?: boolean;
}

export function ProjectCard({ project, creator, onLike, isLiked = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
    >
      <Card className="overflow-hidden cursor-pointer hover:shadow-md transition">
        {/* Image Container */}
        <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-4 bg-[#8B5DFF] from-[#576A8F]/20 to-[#B7BDF7]/20">
          {project.thumbnail_url ? (
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              🎨
            </div>
          )}

          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-[#0B0B0C]/0 group-hover:bg-[#0B0B0C]/20 transition-colors duration-300 flex items-end justify-between p-3 opacity-0 group-hover:opacity-100">
            <button
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-lg transition-all"
              onClick={onLike}
            >
              <span className="text-xl">{isLiked ? "❤️" : "🤍"}</span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-lg transition-all">
              <span className="text-xl">↗️</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {project.title}
          </h3>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} size="sm" variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Creator Info */}
          {creator && (
            <Link href={`/profile/${creator.username}`}>
              <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-[#1F1F1F]">
                <Avatar
                  src={creator.avatar_url || ""}
                  alt={creator.full_name}
                  size="sm"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + creator.id;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {creator.full_name || creator.username}
                  </p>
                  {creator.verified && (
                    <p className="text-xs text-[#8B5DFF]">✓ Verified</p>
                  )}
                </div>
              </div>
            </Link>
          )}

          {/* Stats */}
          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mt-3 pt-3 border-t border-gray-200 dark:border-[#1F1F1F]">
            <span>❤️ {project.likes_count}</span>
            <span>💬 {project.comments_count}</span>
            <span>↗️ {project.shares_count}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default ProjectCard;

