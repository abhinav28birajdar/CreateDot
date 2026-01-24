"use client"

import { Database } from "@/types/database"
import { FeedContainer } from "@/components/feed/feed-container"

export function RelatedShots() {
    return (
        <div className="mt-12 border-t pt-10">
            <h3 className="text-lg font-bold mb-6">You might also like</h3>
            {/* This would fetch related shots */}
            <FeedContainer />
        </div>
    )
}
