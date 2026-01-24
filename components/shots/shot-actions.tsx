"use client"

import { Button } from "@/components/ui/button"
import { Heart, Save, Share2, MoreHorizontal } from "lucide-react"

export function ShotActions() {
    return (
        <div className="flex flex-col gap-4 sticky top-24">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shadow-sm hover:shadow-md transition-all hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200">
                <Heart className="h-6 w-6" />
                <span className="sr-only">Like</span>
            </Button>
            <div className="text-center text-xs font-medium text-muted-foreground mt-[-10px]">1.2k</div>

            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shadow-sm hover:shadow-md transition-all">
                <Save className="h-6 w-6" />
                <span className="sr-only">Save</span>
            </Button>
            <div className="text-center text-xs font-medium text-muted-foreground mt-[-10px]">324</div>

            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shadow-sm hover:shadow-md transition-all">
                <Share2 className="h-6 w-6" />
                <span className="sr-only">Share</span>
            </Button>
            <div className="text-center text-xs font-medium text-muted-foreground mt-[-10px]">Share</div>
        </div>
    )
}
