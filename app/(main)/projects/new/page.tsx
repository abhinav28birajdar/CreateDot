"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Upload,
  Sparkles,
  ArrowLeft,
  Image as ImageIcon,
  Video,
  FileText,
  Plus,
  X,
  CheckCircle2,
  Calendar,
  Lock,
  Globe,
  Users,
  Eye,
  SlidersHorizontal,
  FolderPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function CreateProjectPage() {
  const router = useRouter();

  // Basic Info
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [story, setStory] = useState("");
  const [category, setCategory] = useState("UI/UX Design");

  // Taxonomy & Metadata
  const [tags, setTags] = useState<string[]>(["creative-tech", "fintech"]);
  const [tagInput, setTagInput] = useState("");
  const [skills, setSkills] = useState<string[]>(["Product Strategy", "Design Systems"]);
  const [skillInput, setSkillInput] = useState("");
  const [tools, setTools] = useState<string[]>(["Figma", "Next.js"]);
  const [toolInput, setToolInput] = useState("");

  // Collaboration & Licensing
  const [client, setClient] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [credits, setCredits] = useState("");
  const [projectLinks, setProjectLinks] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private" | "unlisted">("public");
  const [allowComments, setAllowComments] = useState(true);
  const [licensing, setLicensing] = useState("Standard CreativeDOT License");

  // Assets
  const [coverUrl, setCoverUrl] = useState("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const addTool = () => {
    if (toolInput.trim() && !tools.includes(toolInput.trim())) {
      setTools([...tools, toolInput.trim()]);
      setToolInput("");
    }
  };

  const handleSubmit = (action: "publish" | "draft" | "schedule") => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (action === "publish") {
        toast.success("Project published successfully to CreateDOT network! 🚀");
        router.push("/projects/my");
      } else if (action === "draft") {
        toast.success("Draft saved successfully! 📝");
        router.push("/projects/drafts");
      } else {
        toast.success("Project scheduled for auto-release! 📅");
        router.push("/projects/scheduled");
      }
    }, 1000);
  };

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/projects" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Projects
            </Link>
            <span>/</span>
            <span>Studio Creator</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Create & Setup Project</h1>
          <p className="text-muted-foreground text-sm">
            Publish your case study, multimedia assets, story, and collaborative credits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={isSubmitting} className="rounded-xl">
            Save Draft
          </Button>
          <Button variant="outline" onClick={() => handleSubmit("schedule")} disabled={isSubmitting} className="rounded-xl gap-1.5">
            <Calendar className="h-4 w-4" /> Schedule
          </Button>
          <Button
            onClick={() => handleSubmit("publish")}
            disabled={isSubmitting}
            className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-1.5"
          >
            <Sparkles className="h-4 w-4" /> Publish Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Cover Photo Upload */}
          <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm">
            <h2 className="text-base font-bold mb-1">Project Cover & Keyframe</h2>
            <p className="text-xs text-muted-foreground mb-4">Recommended resolution: 1920x1080 (16:9 ratio)</p>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-black/40 group">
              <img src={coverUrl} alt="Cover Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary" className="rounded-xl gap-1.5 text-xs font-bold">
                  <Upload className="h-3.5 w-3.5" /> Replace Cover
                </Button>
              </div>
            </div>
          </div>

          {/* Project Details & Story */}
          <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4">
            <h2 className="text-base font-bold">Project Details & Narrative</h2>

            <div>
              <label className="text-xs font-semibold mb-1 block">Project Title *</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., QuantumPay — Autonomous AI Banking App"
                className="rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">Quick Tagline</label>
              <Input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Turning financial complexity into instant clarity."
                className="rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">Overview Description</label>
              <Textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Summarize the core problem statement, audience, and breakthrough innovation..."
                className="rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">In-Depth Case Study / Project Story</label>
              <Textarea
                rows={6}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Detail your research, visual iterations, prototyping breakthroughs, metrics, and user reception..."
                className="rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Project Assets & Files */}
          <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm">
            <h2 className="text-base font-bold mb-1">Project Media & Deliverables</h2>
            <p className="text-xs text-muted-foreground mb-4">Attach high-res imagery, video showreels, vector assets, and design files.</p>

            <div className="border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl p-8 text-center hover:border-[#FF6B6B]/40 transition-colors">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B]">
                  <Upload className="h-6 w-6" />
                </div>
              </div>
              <p className="text-sm font-bold">Drag and drop media files here, or browse</p>
              <p className="text-xs text-muted-foreground mt-1">Supports PNG, JPG, WebP, MP4, Figma files, and PDF</p>
              <Button size="sm" variant="outline" className="mt-4 rounded-xl">
                Browse Files
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar Metadata & Setup */}
        <div className="space-y-6">
          {/* Category & Visibility */}
          <div className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4">
            <h3 className="font-bold text-sm">Classification</h3>

            <div>
              <label className="text-xs font-semibold mb-1 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-xs font-medium"
              >
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Spatial & 3D">Spatial & 3D</option>
                <option value="Design Systems">Design Systems</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="Brand Identity">Brand Identity</option>
                <option value="Web Development">Web Development</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">Visibility</label>
              <div className="space-y-2">
                {[
                  { id: "public", label: "Public to Universe", desc: "Discoverable on Feed & Explore", icon: Globe },
                  { id: "private", label: "Private", desc: "Only visible to you & invited peers", icon: Lock },
                  { id: "unlisted", label: "Unlisted Link", desc: "Anyone with direct link can view", icon: Eye },
                ].map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setVisibility(v.id as any)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      visibility === v.id
                        ? "border-[#FF6B6B] bg-[#FF6B6B]/5"
                        : "border-black/5 dark:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <v.icon className="h-3.5 w-3.5 text-[#FF6B6B]" /> {v.label}
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tags & Skills */}
          <div className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4">
            <h3 className="font-bold text-sm">Tags & Tools</h3>

            <div>
              <label className="text-xs font-semibold mb-1 block">Tags</label>
              <div className="flex gap-1.5 mb-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Add tag..."
                  className="rounded-xl text-xs h-8"
                />
                <Button size="sm" onClick={addTag} className="rounded-xl h-8 text-xs">Add</Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-[10px] gap-1">
                    #{t}
                    <X className="h-2.5 w-2.5 cursor-pointer" onClick={() => setTags(tags.filter((x) => x !== t))} />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">Tools Used</label>
              <div className="flex gap-1.5 mb-2">
                <Input
                  value={toolInput}
                  onChange={(e) => setToolInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTool())}
                  placeholder="e.g. Figma, Blender"
                  className="rounded-xl text-xs h-8"
                />
                <Button size="sm" onClick={addTool} className="rounded-xl h-8 text-xs">Add</Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {tools.map((t) => (
                  <Badge key={t} variant="outline" className="text-[10px] gap-1">
                    {t}
                    <X className="h-2.5 w-2.5 cursor-pointer" onClick={() => setTools(tools.filter((x) => x !== t))} />
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Credits, Client & Licensing */}
          <div className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-3">
            <h3 className="font-bold text-sm">Credits & Licensing</h3>

            <div>
              <label className="text-xs font-semibold mb-1 block">Client or Employer</label>
              <Input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g., Stripe, Quantum Pay"
                className="rounded-xl text-xs h-8"
              />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">Collaborators (@usernames)</label>
              <Input
                value={collaborators}
                onChange={(e) => setCollaborators(e.target.value)}
                placeholder="@marcus, @elena"
                className="rounded-xl text-xs h-8"
              />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">Licensing</label>
              <select
                value={licensing}
                onChange={(e) => setLicensing(e.target.value)}
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-1.5 text-xs font-medium"
              >
                <option value="Standard CreativeDOT License">Standard CreativeDOT License</option>
                <option value="Creative Commons (CC BY-NC 4.0)">Creative Commons (CC BY-NC 4.0)</option>
                <option value="All Rights Reserved">All Rights Reserved</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="font-medium">Allow Comments</span>
              <input
                type="checkbox"
                checked={allowComments}
                onChange={(e) => setAllowComments(e.target.checked)}
                className="rounded border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
