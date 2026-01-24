import type { Metadata } from 'next'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export const metadata: Metadata = {
    title: 'Search - CreatorFlow',
    description: 'Search for inspiration',
}

export default function SearchPage() {
    return (
        <div className="container py-6">
            <div className="max-w-2xl mx-auto mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight mb-4">Find your inspiration</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input className="pl-10 h-12 text-lg" placeholder="Search for designs, colors, or creators..." />
                </div>
                <div className="mt-4 flex gap-2 justify-center flex-wrap">
                    <span className="text-sm text-muted-foreground">Trending:</span>
                    <Button variant="link" size="sm" className="h-auto p-0">Dashboard</Button>
                    <Button variant="link" size="sm" className="h-auto p-0">Landing Page</Button>
                    <Button variant="link" size="sm" className="h-auto p-0">Mobile App</Button>
                </div>
            </div>

            <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg">
                Search Results Placeholder
            </div>
        </div>
    )
}
