"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full text-center"
          >
            {/* Animated Error Icon */}
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative mx-auto mb-8"
            >
              <div className="w-32 h-32 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-16 h-16 text-red-500" />
              </div>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 w-32 h-32 bg-red-500/20 rounded-full mx-auto"
              />
            </motion.div>

            {/* Error Code */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-4"
            >
              500
            </motion.h1>

            {/* Error Message */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Something went wrong
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto"
            >
              We're experiencing some technical difficulties. Our team has been notified 
              and is working to fix the issue. Please try again in a few moments.
            </motion.p>

            {/* Error Details (Development) */}
            {process.env.NODE_ENV === "development" && error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-8 text-left overflow-auto max-h-32"
              >
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs font-mono text-slate-500 mt-2">
                    Digest: {error.digest}
                  </p>
                )}
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={reset}
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Link href="/">
                <Button variant="outline" size="lg">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>

            {/* Support Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-sm text-slate-500"
            >
              Need help?{" "}
              <Link href="/help" className="text-violet-600 hover:underline">
                Contact Support
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
