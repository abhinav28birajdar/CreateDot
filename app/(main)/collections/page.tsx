import type { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Collections - CreateDOT',
    description: 'Your saved collections',
}

export default function CollectionsPage() {
    return (
        <div className="container py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Collections</h1>
                <Button asChild>
                    <Link href="/collections/new">New Collection</Link>
                </Button>
            </div>
            <div className="p-12 text-center border border-dashed rounded-lg text-muted-foreground">
                No collections yet
            </div>
        </div>
    )
}
