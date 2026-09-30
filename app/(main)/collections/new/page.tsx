"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Globe, Lock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CreateCollectionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "private">("public");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = () => {
    if (!title.trim()) {
      toast.error("Please enter a collection title");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Collection created! 📁");
      router.push("/collections/my");
    }, 600);
  };

  return (
    <div className="container max-w-2xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/collections/my" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Collections
        </Link>
        <span>/</span>
        <span>Create</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Create New Collection</h1>
      <p className="text-muted-foreground text-sm mb-8">Group projects, pins, and assets into shareable folders.</p>

      <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-6">
        <div>
          <label className="text-xs font-semibold mb-1 block">Collection Title *</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Best of Glassmorphism 2026" className="rounded-xl text-sm" />
        </div>

        <div>
          <label className="text-xs font-semibold mb-1 block">Description</label>
          <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the curation criteria..." className="rounded-xl text-sm" />
        </div>

        <div>
          <label className="text-xs font-semibold mb-2 block">Privacy</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "public", label: "Public Collection", desc: "Discoverable to everyone", icon: Globe },
              { id: "private", label: "Private Collection", desc: "Only visible to you", icon: Lock },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => setPrivacy(p.id as any)}
                  className={`p-3.5 rounded-xl border cursor-pointer ${
                    privacy === p.id ? "border-[#FF6B6B] bg-[#FF6B6B]/5" : "border-black/5 dark:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                    <Icon className="h-4 w-4 text-[#FF6B6B]" /> {p.label}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-end gap-2">
          <Button variant="outline" asChild className="rounded-xl">
            <Link href="/collections/my">Cancel</Link>
          </Button>
          <Button onClick={handleCreate} disabled={isSubmitting} className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-2">
            <Sparkles className="h-4 w-4" /> Create Collection
          </Button>
        </div>
      </div>
    </div>
  );
}
