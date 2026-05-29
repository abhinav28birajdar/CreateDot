"use client";

import React, { useState } from "react";

export interface InteractionBarProps {
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isSaved?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  compact?: boolean;
}

export function InteractionBar({
  likes,
  comments,
  shares,
  isLiked = false,
  isSaved = false,
  onLike,
  onComment,
  onShare,
  onSave,
  compact = false,
}: InteractionBarProps) {
  const [localLiked, setLocalLiked] = useState(isLiked);
  const [localSaved, setLocalSaved] = useState(isSaved);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLocalLiked(!localLiked);
    setLikeCount(localLiked ? likeCount - 1 : likeCount + 1);
    onLike?.();
  };

  const handleSave = () => {
    setLocalSaved(!localSaved);
    onSave?.();
  };

  if (compact) {
    return (
      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
        <button onClick={handleLike} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
          <span className={localLiked ? "text-red-500" : ""}>{localLiked ? "❤️" : "🤍"}</span>
          {likeCount}
        </button>
        <button onClick={onComment} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
          💬 {comments}
        </button>
        <button onClick={onShare} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
          📤 {shares}
        </button>
        <button
          onClick={handleSave}
          className={`flex items-center gap-1 transition-colors ${
            localSaved ? "text-[#8B5DFF]" : "hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          {localSaved ? "⭐" : "☆"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 py-4 border-y border-slate-200 dark:border-[#2A2A2A]">
      <button
        onClick={handleLike}
        className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#111111] transition-colors"
      >
        <span className={`text-xl ${localLiked ? "text-red-500" : ""}`}>{localLiked ? "❤️" : "🤍"}</span>
        <span className={`font-medium ${localLiked ? "text-red-500" : "text-slate-700 dark:text-slate-300"}`}>
          {likeCount > 0 ? likeCount.toLocaleString() : "Like"}
        </span>
      </button>

      <button
        onClick={onComment}
        className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#111111] transition-colors"
      >
        <span className="text-xl">💬</span>
        <span className="font-medium text-slate-700 dark:text-slate-300">{comments > 0 ? comments.toLocaleString() : "Comment"}</span>
      </button>

      <button
        onClick={onShare}
        className="flex items-center gap-2 flex-1 justify-center py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#111111] transition-colors"
      >
        <span className="text-xl">📤</span>
        <span className="font-medium text-slate-700 dark:text-slate-300">{shares > 0 ? shares.toLocaleString() : "Share"}</span>
      </button>

      <button
        onClick={handleSave}
        className={`flex items-center gap-2 flex-1 justify-center py-2 rounded-lg transition-colors ${
          localSaved
            ? "bg-blue-50 dark:bg-blue-900"
            : "hover:bg-slate-100 dark:hover:bg-[#111111]"
        }`}
      >
        <span className="text-xl">{localSaved ? "⭐" : "☆"}</span>
        <span className={`font-medium ${localSaved ? "text-[#8B5DFF] dark:text-[#8B5DFF]" : "text-slate-700 dark:text-slate-300"}`}>
          {localSaved ? "Saved" : "Save"}
        </span>
      </button>
    </div>
  );
}

