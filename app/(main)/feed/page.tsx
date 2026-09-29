import type { Metadata } from 'next'
import { FeedContainer } from '@/components/feed/FeedContainer'

export const metadata: Metadata = {
    title: 'Curated Feed — CreateDOT',
    description: 'Discover world-class portfolio projects, UI/UX designs, 3D art, and motion graphics.',
}

export default function FeedPage() {
    return (
        <div className="py-6 px-4 sm:px-6">
            <FeedContainer />
        </div>
    )
}
