"use client";

import React from "react";
import clsx from "clsx";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
}

export function LoadingSpinner({ size = "md", color = "primary" }: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const colors = {
    primary: "from-[#576A8F] to-[#B7BDF7]",
    secondary: "from-[#B7BDF7] to-[#576A8F]",
  };

  return (
    <div className={clsx(sizes[size], "relative")}>
      <div
        className={clsx(
          sizes[size],
          `animate-spin rounded-full border-4 border-transparent border-t-current`,
          `bg-[#8B5DFF] ${colors[color]}`
        )}
      />
    </div>
  );
}

export default LoadingSpinner;

