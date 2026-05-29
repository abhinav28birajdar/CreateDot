import type { Metadata } from 'next'
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: 'Jobs - CreatorFlow',
    description: 'Find your next role',
}

export default function JobsPage() {
    return (
        <div className="container py-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Design Jobs</h1>
                <Button>Post a Job</Button>
            </div>
            <div className="space-y-4">
                <div className="p-12 text-center border border-dashed rounded-lg text-muted-foreground">
                    No active job listings
                </div>
            </div>
        </div>
    )
}

