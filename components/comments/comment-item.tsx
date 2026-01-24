"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CommentItem() {
    return (
        <div className="flex space-x-4">
            <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">Username</span>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <p className="text-sm">This is a fantastic design! The color palette is really striking.</p>
                <div className="flex items-center space-x-4 pt-1 text-xs text-muted-foreground">
                    <button className="hover:text-foreground">Like</button>
                    <button className="hover:text-foreground">Reply</button>
                </div>
            </div>
        </div>
    )
}
