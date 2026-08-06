import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Learn - CreateDOT',
    description: 'Master your craft',
}

export default function LearnPage() {
    return (
        <div className="container py-6">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Learning Hub</h1>
            <div className="p-12 text-center border border-dashed rounded-lg text-muted-foreground">
                Tutorials coming soon
            </div>
        </div>
    )
}
