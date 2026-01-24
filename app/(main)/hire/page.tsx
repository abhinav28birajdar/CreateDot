import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Hire a Creator - CreatorFlow',
    description: 'Find the perfect talent',
}

export default function HirePage() {
    return (
        <div className="container py-6">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Hire Top Talent</h1>
            <div className="p-12 text-center border border-dashed rounded-lg text-muted-foreground">
                Coming soon
            </div>
        </div>
    )
}
