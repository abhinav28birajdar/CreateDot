"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Upload,
  ArrowLeft,
  Sparkles,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Plus,
  X,
  FolderPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function CreatePinPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destinationLink, setDestinationLink] = useState("");
  const [board, setBoard] = useState("UI Inspiration");
  const [category, setCategory] = useState("UI/UX Design");
  const [tags, setTags] = useState<string[]>(["ui", "minimal"]);
  const [tagInput, setTagInput] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1200&fit=crop");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handlePublish = (asDraft: boolean) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (asDraft) {
        toast.success("Pin saved to drafts! 📌");
        router.push("/pins/my");
      } else {
        toast.success("Pin published to CreateDOT discovery! 🚀");
        router.push("/pins/my");
      }
    }, 800);
  };

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/pins" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Pins
            </Link>
            <span>/</span>
            <span>Create</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Create a New Pin</h1>
          <p className="text-muted-foreground text-sm">Upload visual snapshots, interaction clips, and link to your projects.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handlePublish(true)} disabled={isSubmitting} className="rounded-xl">
            Save as Draft
          </Button>
          <Button
            onClick={() => handlePublish(false)}
            disabled={isSubmitting}
            className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-1.5"
          >
            <Sparkles className="h-4 w-4" /> Publish Pin
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Media Preview Box */}
        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-muted group">
            <img src={imageUrl} alt="Pin Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <Button size="sm" variant="secondary" className="rounded-xl gap-1 text-xs">
                <Upload className="h-3.5 w-3.5" /> Upload File
              </Button>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground text-center mt-3">
            Recommended: high-resolution .jpg, .png, or .mp4 up to 50MB
          </p>
        </div>

        {/* Pin Form */}
        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4">
          <div>
            <label className="text-xs font-semibold mb-1 block">Pin Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Minimalist Dark Mode Banking Component"
              className="rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block">Description</label>
            <Textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the typography, micro-interactions, or tools used..."
              className="rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block">Destination Link</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={destinationLink}
                onChange={(e) => setDestinationLink(e.target.value)}
                placeholder="https://createdot.io/project/proj-1"
                className="pl-8 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold mb-1 block">Save to Board</label>
              <select
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-xs font-medium"
              >
                <option value="UI Inspiration">UI Inspiration</option>
                <option value="Widgets & Micro-UX">Widgets & Micro-UX</option>
                <option value="3D Visuals">3D Visuals</option>
                <option value="Design Systems">Design Systems</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-xs font-medium"
              >
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Mobile App">Mobile App</option>
                <option value="3D Design">3D Design</option>
                <option value="Branding">Branding</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block">Tags</label>
            <div className="flex gap-1.5 mb-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Type tag and press enter..."
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
        </div>
      </div>
    </div>
  );
}
