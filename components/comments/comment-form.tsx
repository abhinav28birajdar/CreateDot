"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CommentForm() {
    return (
        <div className="flex space-x-4 mb-8">
            <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
                <Textarea placeholder="What do you think about this shot?" className="min-h-[100px]" />
                <div className="flex justify-end">
                    <Button size="sm">Post Comment</Button>
                </div>
            </div>
        </div>
    )
}
