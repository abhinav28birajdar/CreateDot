"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, RefreshCw, AlertTriangle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          Something Went Wrong
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-600 dark:text-slate-400 mb-4"
        >
          We&apos;re sorry, but something unexpected happened. Our team has been
          notified and is working on fixing the issue.
        </motion.p>

        {error.digest && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-sm text-slate-400 mb-8"
          >
            Error ID: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{error.digest}</code>
          </motion.p>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={reset}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 px-8"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button size="lg" variant="outline" className="px-8">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700"
        >
          <p className="text-sm text-slate-500 mb-4">If the problem persists, please contact support:</p>
          <a
            href="mailto:support@designly.com"
            className="inline-flex items-center gap-2 text-violet-600 hover:underline"
          >
            <Mail className="w-4 h-4" />
            support@designly.com
          </a>
        </motion.div>

        {/* Status Page Link */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <a
            href="https://status.designly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 hover:text-violet-600"
          >
            Check system status →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
