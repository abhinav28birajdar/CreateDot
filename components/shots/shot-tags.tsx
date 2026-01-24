"use client"

import { Badge } from "@/components/ui/badge"

export function ShotTags({ tags }: { tags: string[] | null }) {
    if (!tags || tags.length === 0) return null
    return (
        <div className="flex flex-wrap gap-2 my-6">
            {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                    {tag}
                </Badge>
            ))}
        </div>
    )
}
