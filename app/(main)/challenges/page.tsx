import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Challenges - CreateDOT',
    description: 'Test your skills',
}

export default function ChallengesPage() {
    return (
        <div className="container py-6">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Design Challenges</h1>
            <div className="p-12 text-center border border-dashed rounded-lg text-muted-foreground">
                Challenges coming soon
            </div>
        </div>
    )
}
