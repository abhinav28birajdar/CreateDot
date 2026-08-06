"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/loading";
import { Project } from "@/types";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const fetchProject = React.useCallback(async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      if (!response.ok) throw new Error("Failed to fetch project");
      const data = await response.json();
      setProject(data);

      const likeResponse = await fetch(`/api/likes?project_id=${projectId}`);
      const likeData = await likeResponse.json();
      setLiked(likeData.liked);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleLike = async () => {
    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: projectId,
          action: liked ? "unlike" : "like",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLiked(!liked);
        setProject((prev) =>
          prev ? { ...prev, likes_count: data.likes_count } : null
        );
      }
    } catch (error) {
      console.error("Error liking project:", error);
    }
  };

  if (loading) return <Spinner />;
  if (!project)
    return (
      <div className="min-h-screen bg-[#8B5DFF] from-slate-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Project not found</h1>
        </div>
      </div>
    );

  const mainImage = project.media_urls?.[selectedImageIndex] || project.thumbnail_url;

  return (
    <div className="min-h-screen bg-[#8B5DFF] from-slate-50 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950/50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 rounded-2xl overflow-hidden bg-slate-200 dark:bg-[#111111] h-96">
          {mainImage ? (
            <img
              src={mainImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-slate-400">No image available</span>
            </div>
          )}
        </div>

        {project.media_urls && project.media_urls.length > 1 && (
          <div className="mb-8 flex gap-3 overflow-x-auto pb-3">
            {project.media_urls.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                  selectedImageIndex === idx ? "ring-2 ring-[#8B5DFF]" : ""
                }`}
              >
                <img
                  src={url}
                  alt={`Gallery image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {project.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                {project.user && (
                  <div className="flex items-center gap-3">
                    <Avatar url={project.user.avatar_url} size="lg" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {project.user.full_name || project.user.username}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        @{project.user.username}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mb-6">
                <Button
                  onClick={handleLike}
                  variant={liked ? "primary" : "outline"}
                  className="gap-2"
                >
                  <span>❤️</span> Like ({project.likes_count})
                </Button>
                <Button variant="outline" className="gap-2">
                  💬 Comment ({project.comments_count})
                </Button>
                <Button variant="outline" className="gap-2">
                  🔗 Share
                </Button>
              </div>
            </div>

            <Card className="mb-8 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                About this project
              </h2>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                {project.description}
              </p>
            </Card>

            {(project.tags?.length || 0) > 0 && (
              <Card className="mb-8 p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {(project.tools?.length || 0) > 0 && (
              <Card className="mb-8 p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">
                  Tools Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <Badge key={tool} variant="outline">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Comments
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Comments section coming soon...
              </p>
            </Card>
          </div>

          <div>
            <Card className="mb-6 p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Views</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {project.views_count}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Engagement
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {project.likes_count + project.comments_count}
                  </p>
                </div>
                {project.created_at && (
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Created
                    </p>
                    <p className="text-slate-900 dark:text-white">
                      {new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {project.user && (
              <Card className="p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                  About Creator
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {project.user.bio || "Bio not set"}
                </p>
                <Button className="w-full">Follow</Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

