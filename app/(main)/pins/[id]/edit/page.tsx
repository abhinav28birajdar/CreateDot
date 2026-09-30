"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, Eye, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function EditPinPage() {
  const params = useParams();
  const router = useRouter();
  const pinId = (params?.id as string) || "pin-1";

  const [title, setTitle] = useState("Minimalist Mobile Checkout Component");
  const [description, setDescription] = useState("Dark mode card component featuring frictionless apple pay authentication.");
  const [board, setBoard] = useState("UI Inspiration");
  const [link, setLink] = useState("https://createdot.io/project/proj-1");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Pin updated successfully! 📌");
    }, 600);
  };

  const handleDelete = () => {
    toast.error("Pin deleted from your board");
    router.push("/pins/my");
  };

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/pins/my" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> My Pins
            </Link>
            <span>/</span>
            <span>Edit Pin</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Edit Pin Details</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/pins/${pinId}/analytics`}>
              <BarChart3 className="h-4 w-4 mr-1.5 text-blue-500" /> Analytics
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-xl">
            <Link href={`/pins/${pinId}`}>
              <Eye className="h-4 w-4 mr-1.5" /> Public View
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-1.5">
            <Save className="h-4 w-4" /> Save Pin
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1200&fit=crop"
              alt="Pin"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-2 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-4">
          <div>
            <label className="text-xs font-semibold mb-1 block">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-xl text-sm" />
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block">Description</label>
            <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-xl text-sm" />
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block">Assigned Board</label>
            <select
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-xs font-medium"
            >
              <option value="UI Inspiration">UI Inspiration</option>
              <option value="Widgets & Micro-UX">Widgets & Micro-UX</option>
              <option value="3D Visuals">3D Visuals</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 block">Destination Link</label>
            <Input value={link} onChange={(e) => setLink(e.target.value)} className="rounded-xl text-xs" />
          </div>

          <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={handleDelete} className="text-rose-500 hover:text-rose-600 text-xs">
              <Trash2 className="h-4 w-4 mr-1" /> Delete this Pin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
