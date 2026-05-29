"use client";

import React, { useState, useRef, useEffect } from "react";

interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
  icon?: string;
  divider?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
}

export function Dropdown({ trigger, items, align = "left" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className={`absolute ${align === "left" ? "left-0" : "right-0"} top-full mt-2 w-48 bg-white dark:bg-[#111111] rounded-lg shadow-xl border border-slate-200 dark:border-[#2A2A2A] z-40 animate-in fade-in zoom-in-95`}
        >
          {items.map((item, idx) =>
            item.divider ? (
              <div key={idx} className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
            ) : (
              <button
                key={item.id}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {item.icon && <span>{item.icon}</span>}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

