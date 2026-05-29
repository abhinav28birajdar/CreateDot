"use client";

import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-[#0B0B0C]/30 animate-in fade-in">
      <div
        className={`${sizeClasses[size]} w-full mx-4 bg-white dark:bg-[#111111] rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200`}
      >
        {title && <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{title}</h2>}
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

