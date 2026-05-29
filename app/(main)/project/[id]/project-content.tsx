"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Header } from "@/components/layout/Header";
import { CommentSection } from "@/components/common/CommentSection";

export default function ProjectContent({ projectId }: { projectId: string }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Mock project data
  const project = {
    id: projectId,
    title: "Modern Dashboard Interface",
    description:
      "A comprehensive dashboard design for an AI analytics platform. This project showcases modern UI design principles including glassmorphism, accessibility, and user experience best practices.",
    creator: {
      id: "user1",
      username: "sarahdesigns",
      full_name: "Sarah Anderson",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      verified: true,
      followers_count: 2543,
    },
    tags: ["UI Design", "Dashboard", "Figma", "Analytics"],
    tools: ["Figma", "Adobe XD", "Tailwind CSS"],
    likes_count: 1523,
    comments_count: 89,
    shares_count: 234,
    images: [
      "https://via.placeholder.com/1200x700?text=Dashboard+Hero",
      "https://via.placeholder.com/1200x700?text=Dashboard+Details",
      "https://via.placeholder.com/1200x700?text=Dashboard+Components",
    ],
  };

  return (
    <div className="min-h-screen bg-[#8B5DFF] from-gray-50 via-white to-[#FFF8DE]/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950/50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images Carousel */}
            <Card>
              <div className="aspect-video bg-[#8B5DFF] from-[#576A8F]/20 to-[#B7BDF7]/20 rounded-xl mb-4 flex items-center justify-center text-5xl">
                🎨
              </div>
              <div className="grid grid-cols-3 gap-3">
                {project.images.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg bg-[#8B5DFF] from-[#576A8F]/20 to-[#B7BDF7]/20 cursor-pointer hover:opacity-75 transition-opacity flex items-center justify-center"
                  >
                    📸
                  </div>
                ))}
              </div>
            </Card>

            {/* Project Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{project.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge key={tag} size="lg">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Tools */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Tools Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <Badge key={tool} size="sm" variant="secondary">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments</h2>
              <CommentSection projectId={project.id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Creator Card */}
            <Card>
              <div className="text-center">
                <Avatar
                  src={project.creator.avatar_url}
                  alt={project.creator.full_name}
                  size="lg"
                  className="mx-auto mb-4"
                />
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {project.creator.full_name}
                  </h3>
                  {project.creator.verified && (
                    <Badge size="sm" variant="primary">
                      ✓
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 mb-4">
                  @{project.creator.username}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {project.creator.followers_count} followers
                </p>
                <div className="space-y-3">
                  <Button variant="primary" size="lg" className="w-full">
                    Follow
                  </Button>
                  <Button variant="secondary" size="lg" className="w-full">
                    Message
                  </Button>
                </div>
              </div>
            </Card>

            {/* Stats Card */}
            <Card>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Engagement</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-700 dark:text-gray-300">Likes</span>
                  <span className="font-bold text-[#576A8F]">{project.likes_count}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-700 dark:text-gray-300">Comments</span>
                  <span className="font-bold text-[#576A8F]">{project.comments_count}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-700 dark:text-gray-300">Shares</span>
                  <span className="font-bold text-[#576A8F]">{project.shares_count}</span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="space-y-3">
              <Button
                variant={isLiked ? "primary" : "outline"}
                size="lg"
                className="w-full"
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? "❤️ Liked" : "🤍 Like"}
              </Button>
              <Button
                variant={isSaved ? "primary" : "outline"}
                size="lg"
                className="w-full"
                onClick={() => setIsSaved(!isSaved)}
              >
                {isSaved ? "📌 Saved" : "📌 Save"}
              </Button>
              <Button variant="secondary" size="lg" className="w-full">
                ↗️ Share
              </Button>
            </Card>

            {/* Related Projects */}
            <Card>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">More by Creator</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Project {i}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">234 likes</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
