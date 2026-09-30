"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Eye,
  Trash2,
  Upload,
  Sparkles,
  Lock,
  Globe,
  Settings,
  History,
  BarChart3,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ProjectEditorPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = (params?.id as string) || "proj-1";

  const [title, setTitle] = useState("QuantumPay — Autonomous AI Banking");
  const [description, setDescription] = useState("Autonomous financial assistant with dark mode glassmorphism interface and micro-interactions.");
  const [category, setCategory] = useState("Fintech");
  const [visibility, setVisibility] = useState("public");
  const [licensing, setLicensing] = useState("Standard CreativeDOT License");
  const [allowComments, setAllowComments] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Project changes saved successfully! ✨");
    }, 800);
  };

  const handleUnpublish = () => {
    toast.info("Project moved to drafts");
    router.push("/projects/my");
  };

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/projects/my" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> My Projects
            </Link>
            <span>/</span>
            <span>Editor</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Project Editor & Settings</h1>
          <p className="text-muted-foreground text-sm">
            Modify project copy, assets, permissions, licensing, and story chapters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/projects/${projectId}/versions`}>
              <History className="h-4 w-4 mr-1.5" /> Versions
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/projects/${projectId}/analytics`}>
              <BarChart3 className="h-4 w-4 mr-1.5 text-blue-500" /> Analytics
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/project/${projectId}`}>
              <Eye className="h-4 w-4 mr-1.5" /> Public View
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl gap-1.5 shadow-sm">
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4">
            <h2 className="text-base font-bold">General Information</h2>

            <div>
              <label className="text-xs font-semibold mb-1 block">Project Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-xl text-sm" />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">Description</label>
              <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-xl text-sm" />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-xs font-medium"
              >
                <option value="Fintech">Fintech</option>
                <option value="Spatial Computing">Spatial Computing</option>
                <option value="Design System">Design System</option>
                <option value="Mobile Apps">Mobile Apps</option>
              </select>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4">
            <h2 className="text-base font-bold">Comments & Visibility</h2>

            <div className="flex items-center justify-between p-3 rounded-xl border border-black/5 dark:border-white/10">
              <div>
                <p className="font-bold text-xs">Allow Public Comments</p>
                <p className="text-[11px] text-muted-foreground">Community members can give feedback</p>
              </div>
              <input
                type="checkbox"
                checked={allowComments}
                onChange={(e) => setAllowComments(e.target.checked)}
                className="h-4 w-4 rounded"
              />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">Licensing</label>
              <select
                value={licensing}
                onChange={(e) => setLicensing(e.target.value)}
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-xs font-medium"
              >
                <option value="Standard CreativeDOT License">Standard CreativeDOT License</option>
                <option value="CC BY-NC 4.0">CC BY-NC 4.0</option>
                <option value="All Rights Reserved">All Rights Reserved</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4">
            <h3 className="font-bold text-sm">Status & Danger Zone</h3>

            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Published & Live
            </div>

            <Button variant="outline" onClick={handleUnpublish} className="w-full text-xs text-amber-500 hover:text-amber-600 rounded-xl">
              Unpublish to Drafts
            </Button>

            <Button variant="outline" className="w-full text-xs text-rose-500 hover:text-rose-600 rounded-xl">
              <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete Permanently
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
