"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Eye } from "lucide-react"
import { Database } from "@/types/database"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Shot = Database['public']['Tables']['shots']['Row'] & {
    profiles: Database['public']['Tables']['profiles']['Row'] | null
}

export function ShotCard({ shot }: { shot: Shot }) {
    return (
        <div className="group relative rounded-lg bg-card border shadow-sm transition-all hover:shadow-md overflow-hidden">
            <Link href={`/shots/${shot.id}`} className="block relative aspect-[4/3] overflow-hidden bg-muted">
                {shot.cover_url ? (
                    <Image
                        src={shot.cover_url}
                        alt={shot.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">No Image</div>
                )}

                <div className="absolute inset-0 bg-[#0B0B0C]/0 group-hover:bg-[#0B0B0C]/10 transition-colors" />

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#8B5DFF] from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between">
                    <h3 className="text-white font-medium truncate drop-shadow-sm">{shot.title}</h3>
                </div>
            </Link>

            <div className="p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Link href={`/${shot.profiles?.username || 'user'}`}>
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={shot.profiles?.avatar_url || ''} />
                            <AvatarFallback>{shot.profiles?.username?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <Link href={`/${shot.profiles?.username || 'user'}`} className="text-sm font-medium hover:underline truncate max-w-[100px]">
                        {shot.profiles?.full_name || shot.profiles?.username || 'User'}
                    </Link>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground text-xs">
                    <div className="flex items-center">
                        <Heart className="mr-1 h-3 w-3" />
                        <span>{shot.likes_count}</span>
                    </div>
                    <div className="flex items-center">
                        <Eye className="mr-1 h-3 w-3" />
                        <span>{shot.views_count}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
