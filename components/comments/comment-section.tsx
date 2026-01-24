"use client"

import { CommentForm } from "./comment-form"
import { CommentItem } from "./comment-item"

export function CommentSection({ shotId }: { shotId: string }) {
    return (
        <div className="space-y-6">
            <h3 className="font-bold text-lg">Comments (3)</h3>
            <CommentForm />
            <div className="space-y-6">
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </div>
        </div>
    )
}
