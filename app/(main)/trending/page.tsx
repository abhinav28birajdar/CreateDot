import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Trending - CreatorFlow',
    description: 'See what is trending today',
}

export default function TrendingPage() {
    return (
        <div className="container py-6">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Trending Designs</h1>
            {/* Reusing FeedContainer with different query params in real app */}
            <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg">
                Trending Feed Placeholder
            </div>
        </div>
    )
}
