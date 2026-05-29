"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Globe,
  Mail,
  CheckCircle,
  Heart,
  Eye,
  MessageSquare,
  UserPlus,
  UserCheck,
  Share2,
  Flag,
  MoreHorizontal,
  Grid3X3,
  List,
  Bookmark,
  Twitter,
  Linkedin,
  Dribbble,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ============ MOCK DATA ============
const user = {
  id: "u1",
  name: "Sarah Chen",
  username: "sarahchen",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&h=400&fit=crop",
  title: "Senior Product Designer",
  bio: "Creating beautiful digital experiences. Product designer with 8+ years of experience. Previously at Google, now freelancing and building cool stuff.",
  location: "San Francisco, CA",
  website: "https://sarahchen.design",
  email: "hello@sarahchen.design",
  joinedAt: "January 2020",
  isVerified: true,
  isPro: true,
  isAvailable: true,
  stats: {
    followers: 12500,
    following: 856,
    projects: 89,
    likes: 45600,
  },
  skills: ["UI/UX", "Mobile Design", "Design Systems", "Prototyping", "User Research"],
  socialLinks: {
    twitter: "https://twitter.com/sarahchen",
    linkedin: "https://linkedin.com/in/sarahchen",
    dribbble: "https://dribbble.com/sarahchen",
    instagram: "https://instagram.com/sarahchen",
  },
};

const projects = [
  { id: "p1", title: "Mobile Banking App", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=450&fit=crop", likes: 1234, views: 45678 },
  { id: "p2", title: "E-commerce Redesign", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop", likes: 892, views: 23456 },
  { id: "p3", title: "SaaS Dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=450&fit=crop", likes: 756, views: 19800 },
  { id: "p4", title: "Travel App Concept", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=450&fit=crop", likes: 543, views: 15000 },
  { id: "p5", title: "Design System", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=450&fit=crop", likes: 1100, views: 32000 },
  { id: "p6", title: "Health App", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=450&fit=crop", likes: 678, views: 18900 },
];

const collections = [
  { id: "c1", name: "Mobile Designs", projectCount: 24, images: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=200&fit=crop", "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=200&fit=crop"] },
  { id: "c2", name: "Dashboard UI", projectCount: 18, images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop"] },
];

// ============ MAIN USER PROFILE PAGE ============
export default function UserProfilePage() {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111]">
      {/* Cover Image */}
      <div className="h-48 md:h-64 relative">
        <Image src={user.coverImage} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#8B5DFF] from-black/50 to-transparent" />
        <button onClick={() => router.back()} className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-white/80 bg-[#0B0B0C]/20 backdrop-blur-sm px-3 py-2 rounded-lg">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white dark:bg-[#111111] rounded-xl -mt-16 relative z-10 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="shrink-0 -mt-20">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-[#1F1F1F] shadow-lg">
                <Image src={user.avatar} alt={user.name} width={128} height={128} className="object-cover" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
                    {user.isVerified && <CheckCircle className="w-5 h-5 text-[#8B5DFF]" />}
                    {user.isPro && <Badge className="bg-[#8B5DFF] from-violet-500 to-fuchsia-500 text-white">PRO</Badge>}
                    {user.isAvailable && <Badge className="bg-green-100 text-green-700">Available for hire</Badge>}
                  </div>
                  <p className="text-slate-500">@{user.username}</p>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">{user.title}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{user.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Joined {user.joinedAt}</span>
                    {user.website && <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-violet-600 hover:underline"><Globe className="w-4 h-4" />Website</a>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button onClick={() => setIsFollowing(!isFollowing)} className={isFollowing ? "bg-slate-200 text-slate-900 hover:bg-slate-300" : "bg-violet-500 hover:bg-violet-600"}>
                    {isFollowing ? <><UserCheck className="w-4 h-4 mr-2" />Following</> : <><UserPlus className="w-4 h-4 mr-2" />Follow</>}
                  </Button>
                  <Button variant="outline"><MessageSquare className="w-4 h-4 mr-2" />Message</Button>
                  <Button variant="outline" size="icon"><Share2 className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                </div>
              </div>

              {/* Bio */}
              <p className="text-slate-600 dark:text-slate-400 mt-4">{user.bio}</p>

              {/* Stats */}
              <div className="flex gap-6 mt-6 pt-6 border-t border-slate-200 dark:border-[#2A2A2A]">
                <Link href={`/u/${user.username}/followers`} className="text-center hover:text-violet-600">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{user.stats.followers.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">Followers</p>
                </Link>
                <Link href={`/u/${user.username}/following`} className="text-center hover:text-violet-600">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{user.stats.following.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">Following</p>
                </Link>
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{user.stats.projects}</p>
                  <p className="text-sm text-slate-500">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{user.stats.likes.toLocaleString()}</p>
                  <p className="text-sm text-slate-500">Likes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="projects" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <div className="flex border border-slate-200 dark:border-[#2A2A2A] rounded-lg overflow-hidden">
              <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-violet-500 text-white" : "bg-white dark:bg-[#111111]"}`}><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-violet-500 text-white" : "bg-white dark:bg-[#111111]"}`}><List className="w-4 h-4" /></button>
            </div>
          </div>

          <TabsContent value="projects">
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {projects.map((project) => (
                <Link key={project.id} href={`/project/${project.id}`}>
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-[#111111] rounded-xl overflow-hidden group">
                    <div className="aspect-[4/3] relative">
                      <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-[#8B5DFF] from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <p className="text-white font-semibold">{project.title}</p>
                          <div className="flex items-center gap-3 text-white/80 text-sm">
                            <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{project.likes}</span>
                            <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{project.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collections">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <Link key={collection.id} href={`/collections/${collection.id}`}>
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-[#111111] rounded-xl overflow-hidden p-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {collection.images.map((img, i) => (
                        <div key={i} className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                          <Image src={img} alt="" width={100} height={100} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{collection.name}</h3>
                    <p className="text-sm text-slate-500">{collection.projectCount} projects</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="likes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 4).map((project) => (
                <Link key={project.id} href={`/project/${project.id}`}>
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-[#111111] rounded-xl overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <Image src={project.image} alt={project.title} fill className="object-cover" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Bio</h3>
                <p className="text-slate-600 dark:text-slate-400">{user.bio}</p>
              </div>

              <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (<Badge key={skill} variant="secondary">{skill}</Badge>))}
                </div>
              </div>

              <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Connect</h3>
                <div className="space-y-3">
                  {user.socialLinks.twitter && <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-violet-600"><Twitter className="w-5 h-5" />Twitter</a>}
                  {user.socialLinks.linkedin && <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-violet-600"><Linkedin className="w-5 h-5" />LinkedIn</a>}
                  {user.socialLinks.dribbble && <a href={user.socialLinks.dribbble} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-violet-600"><Dribbble className="w-5 h-5" />Dribbble</a>}
                  {user.socialLinks.instagram && <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-violet-600"><Instagram className="w-5 h-5" />Instagram</a>}
                </div>
              </div>

              <div className="bg-white dark:bg-[#111111] rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Contact</h3>
                <a href={`mailto:${user.email}`} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-violet-600"><Mail className="w-5 h-5" />{user.email}</a>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Report */}
        <div className="text-center pb-8">
          <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 text-sm mx-auto"><Flag className="w-4 h-4" />Report this profile</button>
        </div>
      </div>
    </div>
  );
}
