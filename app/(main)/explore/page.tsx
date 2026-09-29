import type { Metadata } from 'next'
import { FeedContainer } from '@/components/feed/FeedContainer'

export const metadata: Metadata = {
    title: 'Discover Works — CreateDOT',
    description: 'Discover curated UI/UX designs, 3D art, motion graphics, branding, and creative portfolios.',
}

export default function ExplorePage() {
    return (
        <div className="py-6 px-4 sm:px-6">
            <FeedContainer />
        </div>
    )
}
