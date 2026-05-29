"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#8B5DFF] from-gray-50 via-white to-[#FFF8DE]/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950/50">
      <Header />
      <main className="container mx-auto">
        {children}
      </main>
      <footer className="bg-white/10 dark:bg-gray-950/10 backdrop-blur-sm border-t border-white/20 dark:border-[#1F1F1F]/20 mt-20 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-[#576A8F] mb-4">CreateDot</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The creative platform for designers and developers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li><Link href="/explore" className="hover:text-[#576A8F] transition-colors">Explore</Link></li>
                <li><Link href="/trending" className="hover:text-[#576A8F] transition-colors">Trending</Link></li>
                <li><Link href="/jobs" className="hover:text-[#576A8F] transition-colors">Jobs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li><Link href="/about" className="hover:text-[#576A8F] transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-[#576A8F] transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-[#576A8F] transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li><Link href="/privacy" className="hover:text-[#576A8F] transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-[#576A8F] transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 dark:border-[#1F1F1F]/20 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2026 CreateDot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;

