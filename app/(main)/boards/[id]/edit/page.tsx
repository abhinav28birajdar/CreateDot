"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, Eye, Plus, X, Users, Lock, Globe, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function EditBoardPage() {
  const params = useParams();
  const router = useRouter();
  const boardId = (params?.id as string) || "board-1";

  const [title, setTitle] = useState("UI / UX NextGen Inspiration");
  const [description, setDescription] = useState("Curated collection of innovative interaction design, glassmorphism, and 3D web interfaces.");
  const [privacy, setPrivacy] = useState<"public" | "private" | "shared">("public");
  const [sections, setSections] = useState<string[]>(["Hero Layouts", "Card Grids", "Micro-Interactions", "Color Systems"]);
  const [newSection, setNewSection] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const addSection = () => {
    if (newSection.trim() && !sections.includes(newSection.trim())) {
      setSections([...sections, newSection.trim()]);
      setNewSection("");
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Board settings saved! ✨");
    }, 600);
  };

  const handleDelete = () => {
    toast.error("Board deleted");
    router.push("/boards/my");
  };

  return (
    <div className="container max-w-3xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/boards/my" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> My Boards
            </Link>
            <span>/</span>
            <span>Settings</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Edit Board Settings</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/boards/${boardId}/analytics`}>
              <BarChart3 className="h-4 w-4 mr-1.5 text-blue-500" /> Analytics
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/boards/${boardId}`}>
              <Eye className="h-4 w-4 mr-1.5" /> View Board
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-1.5">
            <Save className="h-4 w-4" /> Save
          </Button>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-6">
        <div>
          <label className="text-xs font-semibold mb-1 block">Board Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-xl text-sm" />
        </div>

        <div>
          <label className="text-xs font-semibold mb-1 block">Description</label>
          <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-xl text-sm" />
        </div>

        <div>
          <label className="text-xs font-semibold mb-2 block">Privacy</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "public", label: "Public", icon: Globe },
              { id: "private", label: "Private", icon: Lock },
              { id: "shared", label: "Shared", icon: Users },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => setPrivacy(p.id as any)}
                  className={`p-3 rounded-xl border cursor-pointer text-center ${
                    privacy === p.id ? "border-[#FF6B6B] bg-[#FF6B6B]/5 font-bold" : "border-black/5 dark:border-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4 mx-auto mb-1 text-[#FF6B6B]" />
                  <span className="text-xs">{p.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold mb-1 block">Board Sections</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              placeholder="Add section name..."
              className="rounded-xl text-xs"
            />
            <Button size="sm" onClick={addSection} className="rounded-xl text-xs">Add</Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sections.map((s) => (
              <Badge key={s} variant="secondary" className="gap-1 text-xs">
                {s}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSections(sections.filter((x) => x !== s))} />
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={handleDelete} className="text-rose-500 hover:text-rose-600 text-xs">
            <Trash2 className="h-4 w-4 mr-1" /> Delete Board
          </Button>
        </div>
      </div>
    </div>
  );
}
