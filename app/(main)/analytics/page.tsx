import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Analytics - CreatorFlow',
    description: 'Your performance stats',
}

export default function AnalyticsPage() {
    return (
        <div className="container py-6">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Analytics Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {/* Stat Cards Stubs */}
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-32 border rounded-xl bg-card p-6 shadow-sm"></div>
                ))}
            </div>
            <div className="h-[400px] border rounded-xl bg-card p-6 shadow-sm flex items-center justify-center text-muted-foreground">
                Chart Placeholder
            </div>
        </div>
    )
}
