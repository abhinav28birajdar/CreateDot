import type { Metadata } from "next"
import { ExploreFilters } from "@/components/explore/explore-filters"
import { FeedContainer } from "@/components/feed/feed-container"

export const metadata: Metadata = {
  title: "Explore - CreatorFlow",
  description: "Explore the best designs",
}

export default function ExplorePage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
        <p className="text-muted-foreground">Discover the latest trends in design and creativity.</p>
      </div>
      <ExploreFilters />
      <div className="mt-8">
        <FeedContainer />
      </div>
    </div>
  )
}
