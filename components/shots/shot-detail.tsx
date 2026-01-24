"use client"

import Image from "next/image"
import { ShotActions } from "./shot-actions"
import { ShotTags } from "./shot-tags"
import { CommentSection } from "@/components/comments/comment-section"
import { Database } from "@/types/database"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Shot = Database['public']['Tables']['shots']['Row'] & {
    profiles: Database['public']['Tables']['profiles']['Row'] | null
}

export function ShotDetail({ shot }: { shot: Shot }) {
    return (
        <div className="rounded-xl overflow-hidden bg-background">
            <div className="w-full bg-muted/30 py-8 flex justify-center">
                <div className="relative w-full max-w-5xl aspect-[4/3] rounded-lg shadow-xl overflow-hidden bg-white dark:bg-black border">
                    {shot.cover_url ? (
                        <Image src={shot.cover_url} alt={shot.title} fill className="object-cover" priority />
                    ) : (
                        <div className="flex items-center justify-center h-full">No Preview</div>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-[1fr_80px] gap-8">
                <div className="space-y-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={shot.profiles?.avatar_url || ''} />
                                <AvatarFallback>{shot.profiles?.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-bold">{shot.title}</h1>
                                <div className="flex items-center space-x-2 text-muted-foreground">
                                    <span>by</span>
                                    <Link href={`/${shot.profiles?.username}`} className="font-medium text-foreground hover:underline">
                                        {shot.profiles?.full_name || shot.profiles?.username}
                                    </Link>
                                    {shot.profiles?.is_hiring && (
                                        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                                            Hiring
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Button>Get in touch</Button>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <p>{shot.description}</p>
                    </div>

                    <ShotTags tags={shot.tags} />

                    <div className="border-t pt-8">
                        <CommentSection shotId={shot.id} />
                    </div>
                </div>

                <div className="hidden md:block">
                    <ShotActions />
                </div>
            </div>
        </div>
    )
}
