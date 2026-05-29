"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { BrandProfileEditor } from "@/components/specific-features/BrandProfileEditor";

export default function CreateBrandPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Use the BrandProfileEditor component
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Create Brand Profile</h1>
          <p className="text-gray-600 mt-1">
            Define your brand's identity to maintain consistency across all designs
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Cancel
          </Button>
          <Button 
            className="bg-[#8B5DFF] hover:bg-[#7B4DE5] text-white"
            onClick={() => {
              setIsLoading(true);
              // Simulate saving
              setTimeout(() => {
                setIsLoading(false);
                router.push('/dashboard?tab=brands');
              }, 1500);
            }}
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
      
      <BrandProfileEditor />
    </div>
  );
}
