"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";

export interface UserProfileCardProps {
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  isFollowing?: boolean;
  onFollowClick?: () => void;
  verified?: boolean;
}

export function UserProfileCard({
  username,
  avatar,
  bio,
  followers,
  isFollowing = false,
  onFollowClick,
  verified = false,
}: UserProfileCardProps) {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = () => {
    setFollowing(!following);
    onFollowClick?.();
  };

  return (
    <Link href={`/profile/${username}`}>
      <div className="bg-white dark:bg-[#111111] rounded-2xl p-6 border border-slate-200 dark:border-[#2A2A2A] hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex flex-col items-center text-center gap-4">
          <Avatar src={avatar} alt={username} size="lg" />
          <div>
            <div className="flex items-center justify-center gap-2">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{username}</h3>
              {verified && <span className="text-[#8B5DFF]">✓</span>}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">{bio}</p>
          </div>
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {followers.toLocaleString()} followers
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleFollow();
            }}
            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
              following
                ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
                : "bg-[#8B5DFF] text-white hover:bg-blue-700"
            }`}
          >
            {following ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </Link>
  );
}

