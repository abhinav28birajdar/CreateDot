"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";

interface CommentProps {
  id: string;
  user_id: string;
  username: string;
  avatar: string;
  content: string;
  created_at: string;
  likes_count: number;
  replies?: CommentProps[];
}

export function CommentSection({ projectId }: { projectId: string }) {
  const [comments, setComments] = useState<CommentProps[]>([
    {
      id: "1",
      user_id: "user1",
      username: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      content: "This is an amazing design! Love the attention to detail.",
      created_at: "2 hours ago",
      likes_count: 12,
      replies: [
        {
          id: "1-1",
          user_id: "user2",
          username: "Alex Chen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
          content: "Totally agree! The color palette is perfect.",
          created_at: "1 hour ago",
          likes_count: 5,
        },
      ],
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: CommentProps = {
        id: String(comments.length + 1),
        user_id: "current-user",
        username: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you",
        content: newComment,
        created_at: "just now",
        likes_count: 0,
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Comment Input */}
      <Card>
        <div className="flex gap-4">
          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=you"
            alt="You"
            size="md"
          />
          <div className="flex-1">
            <Input
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  handleAddComment();
                }
              }}
            />
            <div className="flex gap-2 mt-3">
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                Post Comment
              </Button>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

function CommentCard({ comment }: { comment: CommentProps }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(true);

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex gap-4">
          <Avatar src={comment.avatar} alt={comment.username} size="md" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-gray-900 dark:text-white">{comment.username}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{comment.created_at}</p>
            </div>
            <p className="text-gray-800 dark:text-gray-200 mb-3">{comment.content}</p>
            <div className="flex gap-4 text-sm">
              <button className="text-gray-600 dark:text-gray-400 hover:text-[#576A8F] transition-colors">
                ❤️ Like ({comment.likes_count})
              </button>
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="text-gray-600 dark:text-gray-400 hover:text-[#576A8F] transition-colors"
              >
                💬 Reply
              </button>
            </div>

            {isReplying && (
              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <Button
                  variant="primary"
                  className="px-3 py-1 text-xs"
                  onClick={() => {
                    setReplyText("");
                    setIsReplying(false);
                  }}
                >
                  Reply
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 space-y-4">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-sm text-[#576A8F] hover:underline font-medium"
          >
            {showReplies ? "Hide" : "Show"} {comment.replies.length} repl{comment.replies.length === 1 ? "y" : "ies"}
          </button>

          {showReplies && (
            <div className="space-y-4 border-l-2 border-gray-200 dark:border-[#1F1F1F] pl-4">
              {comment.replies.map((reply) => (
                <Card key={reply.id}>
                  <div className="flex gap-4">
                    <Avatar src={reply.avatar} alt={reply.username} size="md" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {reply.username}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {reply.created_at}
                        </p>
                      </div>
                      <p className="text-gray-800 dark:text-gray-200 mb-3">{reply.content}</p>
                      <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#576A8F]">
                        ❤️ ({reply.likes_count})
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CommentSection;

