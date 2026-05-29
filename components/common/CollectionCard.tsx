"use client";

import React, { useState } from "react";

export interface CollectionCardProps {
  id: string;
  name: string;
  description?: string;
  itemCount: number;
  thumbnail?: string;
  isPrivate?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function CollectionCard({
  id,
  name,
  description,
  itemCount,
  thumbnail,
  isPrivate = false,
  onEdit,
  onDelete,
}: CollectionCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#2A2A2A] overflow-hidden hover:shadow-lg transition-shadow">
      <div
        className="relative h-32 bg-[#8B5DFF] to-purple-600"
        style={thumbnail ? { backgroundImage: `url(${thumbnail})`, backgroundSize: "cover" } : {}}
      >
        <div className="absolute inset-0 bg-[#0B0B0C]/20" />
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-600 transition-colors"
        >
          ⋮
        </button>
        {showMenu && (
          <div className="absolute top-10 right-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg z-10">
            {onEdit && (
              <button
                onClick={onEdit}
                className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white truncate">{name}</h3>
            {description && <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1 mt-1">{description}</p>}
          </div>
          {isPrivate && <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">🔒</span>}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">{itemCount} items</p>
      </div>
    </div>
  );
}

