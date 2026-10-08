"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { BrandProfileEditor } from "@/components/specific-features/BrandProfileEditor";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { BrandProfile } from "@/lib/types";

export default function CreateBrandPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentBrandData, setCurrentBrandData] = useState<Partial<BrandProfile>>({});

  const handleSaveBrand = async (brandData?: Partial<BrandProfile>) => {
    if (!user) {
      toast.error("Please sign in to create a brand kit");
      return;
    }

    const dataToSave = brandData || currentBrandData;
    const brandName = dataToSave.name?.trim() || "My Brand";

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("brands")
        .insert({
          user_id: user.id,
          name: brandName,
          colors: dataToSave.colors || { primary: "#FF6B6B", secondary: "#14161F" },
          fonts: dataToSave.fonts || { heading: "Plus Jakarta Sans", body: "Inter" },
          voice_tone: dataToSave.voice_tone || { personality: "Professional" },
          image_prefs: dataToSave.image_prefs || {},
        });

      if (error) throw error;

      toast.success(`Brand profile "${brandName}" created successfully!`);
      router.push("/dashboard");
    } catch (err: any) {
      toast.error("Failed to save brand profile", { description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Create Brand Profile</h1>
          <p className="text-gray-600 mt-1">
            Define your brand&apos;s identity to maintain consistency across all designs
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Cancel
          </Button>
          <Button 
            className="bg-[#8B5DFF] hover:bg-[#7B4DE5] text-white font-bold"
            onClick={() => handleSaveBrand()}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin mr-2 border-2 border-white border-t-transparent rounded-full" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Brand
              </>
            )}
          </Button>
        </div>
      </div>
      
      <BrandProfileEditor 
        onSave={(data) => {
          setCurrentBrandData(data);
          handleSaveBrand(data);
        }} 
      />
    </div>
  );
}
