"use client";

import React from "react";

export const ProjectCardSkeleton = () => (
  <div className="bg-slate-200 dark:bg-[#111111] rounded-lg h-72 animate-pulse">
    <div className="h-40 bg-slate-300 dark:bg-slate-700 rounded-t-lg" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4" />
      <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full" />
      <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-2/3" />
    </div>
  </div>
);

export const ProjectGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProjectCardSkeleton key={i} />
    ))}
  </div>
);

export const CommentCardSkeleton = () => (
  <div className="p-4 border border-slate-200 dark:border-[#2A2A2A] rounded-lg animate-pulse">
    <div className="flex gap-3 mb-3">
      <div className="w-10 h-10 bg-slate-300 dark:bg-slate-700 rounded-full" />
      <div className="flex-1">
        <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-1/4 mb-2" />
        <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-40" />
      </div>
    </div>
    <div className="space-y-2 ml-13">
      <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full" />
      <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-5/6" />
    </div>
  </div>
);

export const CommentSectionSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <CommentCardSkeleton key={i} />
    ))}
  </div>
);

export const UserCardSkeleton = () => (
  <div className="bg-white dark:bg-[#111111] rounded-lg p-4 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-16 h-16 bg-slate-300 dark:bg-slate-700 rounded-full" />
      <div className="flex-1">
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mb-2" />
        <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-3/4" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full" />
      <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-5/6" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => (
  <div className="w-full border border-slate-200 dark:border-[#2A2A2A] rounded-lg overflow-hidden">
    <table className="w-full">
      <tbody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <tr key={rowIdx} className="border-b border-slate-200 dark:border-[#2A2A2A] animate-pulse">
            {Array.from({ length: columns }).map((_, colIdx) => (
              <td key={colIdx} className="p-4">
                <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-[#111111] p-6 rounded-lg">
          <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mb-2" />
          <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-2/3" />
        </div>
      ))}
    </div>

    {/* Chart */}
    <div className="bg-white dark:bg-[#111111] p-6 rounded-lg h-80 bg-[#8B5DFF] from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />

    {/* Table */}
    <div className="bg-white dark:bg-[#111111] p-6 rounded-lg">
      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/4 mb-4" />
      <TableSkeleton rows={5} columns={4} />
    </div>
  </div>
);

export const ProfilePageSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {/* Cover Photo */}
    <div className="h-64 bg-slate-300 dark:bg-slate-700 rounded-lg" />

    {/* Profile Info */}
    <div className="flex gap-6 -mt-12 relative z-10 px-6">
      <div className="w-32 h-32 bg-slate-300 dark:bg-slate-700 rounded-full" />
      <div className="flex-1 pt-8">
        <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-1/3 mb-4" />
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mb-2" />
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-2/3" />
      </div>
    </div>

    {/* Tabs & Content */}
    <div className="bg-white dark:bg-[#111111] p-6 rounded-lg">
      <div className="flex gap-4 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-20" />
        ))}
      </div>
      <ProjectGridSkeleton count={3} />
    </div>
  </div>
);

export const PageLoadingSkeleton = ({ type = "dashboard" }: { type?: "dashboard" | "profile" | "grid" | "table" }) => {
  switch (type) {
    case "profile":
      return <ProfilePageSkeleton />;
    case "table":
      return <TableSkeleton />;
    case "grid":
      return <ProjectGridSkeleton />;
    default:
      return <DashboardSkeleton />;
  }
};

export default {
  ProjectCardSkeleton,
  ProjectGridSkeleton,
  CommentCardSkeleton,
  CommentSectionSkeleton,
  UserCardSkeleton,
  TableSkeleton,
  DashboardSkeleton,
  ProfilePageSkeleton,
  PageLoadingSkeleton,
};

