"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, Eye, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function EditCollectionPage() {
  const params = useParams();
  const router = useRouter();
  const collectionId = (params?.id as string) || "c-1";

  const [title, setTitle] = useState("FinTech & Banking Masterpieces");
  const [description, setDescription] = useState("Carefully selected design systems, dashboards, and high-frequency trading interfaces.");
  const [privacy, setPrivacy] = useState<"public" | "private">("public");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Collection settings updated! ✨");
    }, 600);
  };

  const handleDelete = () => {
    toast.error("Collection removed");
    router.push("/collections/my");
  };

  return (
    <div className="container max-w-2xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href={`/collections/${collectionId}`} className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Collection
            </Link>
            <span>/</span>
            <span>Settings</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Edit Collection Settings</h1>
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl shadow-sm gap-1.5">
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm space-y-6">
        <div>
          <label className="text-xs font-semibold mb-1 block">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-xl text-sm" />
        </div>

        <div>
          <label className="text-xs font-semibold mb-1 block">Description</label>
          <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-xl text-sm" />
        </div>

        <div>
          <label className="text-xs font-semibold mb-2 block">Privacy</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "public", label: "Public", icon: Globe },
              { id: "private", label: "Private", icon: Lock },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => setPrivacy(p.id as any)}
                  className={`p-3.5 rounded-xl border cursor-pointer text-center ${
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

        <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={handleDelete} className="text-rose-500 hover:text-rose-600 text-xs">
            <Trash2 className="h-4 w-4 mr-1" /> Delete Collection
          </Button>
        </div>
      </div>
    </div>
  );
}
