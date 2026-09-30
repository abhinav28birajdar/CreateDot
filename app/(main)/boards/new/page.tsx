"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Lock, Globe, Users, Sparkles, FolderPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function CreateBoardPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "private" | "shared">("public");
  const [sections, setSections] = useState<string[]>(["Hero Sections", "Components", "Color Ideas"]);
  const [sectionInput, setSectionInput] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addSection = () => {
    if (sectionInput.trim() && !sections.includes(sectionInput.trim())) {
      setSections([...sections, sectionInput.trim()]);
      setSectionInput("");
    }
  };

  const handleCreate = () => {
    if (!title.trim()) {
      toast.error("Please enter a board name");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Board created successfully! 🎨");
      router.push("/boards/my");
    }, 800);
  };

  return (
    <div className="container max-w-3xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/boards/my" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> My Boards
        </Link>
        <span>/</span>
        <span>Create Board</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Create New Board</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Organize pins into visual sections, invite team collaborators, and curate inspiration.
      </p>

      <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-6">
        <div>
          <label className="text-xs font-semibold mb-1 block">Board Name *</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Fintech 2026 UI Trends"
            className="rounded-xl text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold mb-1 block">Description</label>
          <Textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is the focus of this board?"
            className="rounded-xl text-sm"
          />
        </div>

        {/* Privacy Selector */}
        <div>
          <label className="text-xs font-semibold mb-2 block">Privacy & Access</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "public", label: "Public", desc: "Anyone on CreateDOT can view & follow", icon: Globe },
              { id: "private", label: "Private (Secret)", desc: "Only visible to you", icon: Lock },
              { id: "shared", label: "Shared / Team", desc: "Collaborate with peers", icon: Users },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => setPrivacy(p.id as any)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    privacy === p.id
                      ? "border-[#FF6B6B] bg-[#FF6B6B]/5"
                      : "border-black/5 dark:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs mb-1">
                    <Icon className="h-4 w-4 text-[#FF6B6B]" /> {p.label}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Board Sections */}
        <div>
          <label className="text-xs font-semibold mb-1 block">Board Sections (Folders inside board)</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={sectionInput}
              onChange={(e) => setSectionInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSection())}
              placeholder="e.g. Navigation Bars, Typography, Motion..."
              className="rounded-xl text-xs"
            />
            <Button size="sm" onClick={addSection} className="rounded-xl text-xs">Add Section</Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sections.map((sec) => (
              <Badge key={sec} variant="secondary" className="gap-1 text-xs">
                {sec}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSections(sections.filter((s) => s !== sec))} />
              </Badge>
            ))}
          </div>
        </div>

        {/* Collaborators */}
        {privacy === "shared" && (
          <div>
            <label className="text-xs font-semibold mb-1 block">Invite Collaborators (@usernames or emails)</label>
            <Input
              value={collaborators}
              onChange={(e) => setCollaborators(e.target.value)}
              placeholder="sarah@example.com, @marcus"
              className="rounded-xl text-xs"
            />
          </div>
        )}

        <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-end gap-2">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href="/boards/my">Cancel</Link>
          </Button>
          <Button
            onClick={handleCreate}
            disabled={isSubmitting}
            className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2"
          >
            <Sparkles className="h-4 w-4" /> Create Board
          </Button>
        </div>
      </div>
    </div>
  );
}
