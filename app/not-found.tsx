"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#8B5DFF] from-violet-50 via-white to-fuchsia-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <span className="text-[200px] md:text-[280px] font-black text-transparent bg-clip-text bg-[#8B5DFF] from-violet-500 to-fuchsia-500 leading-none">
            404
          </span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Sparkles className="w-16 h-16 text-violet-500/30" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          Oops! Page Not Found
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-600 dark:text-slate-400 mb-8"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Don&apos;t worry, let&apos;s get you back on track!
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/">
            <Button size="lg" className="bg-violet-500 hover:bg-violet-600 px-8">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/explore">
            <Button size="lg" variant="outline" className="px-8">
              <Search className="w-4 h-4 mr-2" />
              Explore Designs
            </Button>
          </Link>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-slate-200 dark:border-[#2A2A2A]"
        >
          <p className="text-sm text-slate-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/explore" className="text-violet-600 hover:underline">
              Explore
            </Link>
            <Link href="/jobs" className="text-violet-600 hover:underline">
              Find Jobs
            </Link>
            <Link href="/hire" className="text-violet-600 hover:underline">
              Hire Designers
            </Link>
            <Link href="/blog" className="text-violet-600 hover:underline">
              Blog
            </Link>
            <Link href="/settings" className="text-violet-600 hover:underline">
              Settings
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
