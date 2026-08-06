import type { Metadata } from "next"
import { FeedContainer } from "@/components/feed/feed-container"

export const metadata: Metadata = {
    title: "Feed - CreateDOT",
    description: "Your personalized design feed",
}

export default function FeedPage() {
    return (
        <div className="container py-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Your Feed</h1>
            </div>
            <FeedContainer />
        </div>
    )
}
