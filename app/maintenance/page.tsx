"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, Clock, Bell, Mail, Twitter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#8B5DFF] from-slate-900 via-violet-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-[#8B5DFF] from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-white">D</span>
            </div>
            <span className="text-2xl font-bold text-white">CreateDOT</span>
          </Link>
        </motion.div>

        {/* Animated Maintenance Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative mx-auto mb-8"
        >
          <div className="w-32 h-32 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto border border-violet-500/30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Wrench className="w-14 h-14 text-violet-400" />
            </motion.div>
          </div>
          
          {/* Pulse Effect */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 w-32 h-32 bg-violet-500/20 rounded-full mx-auto"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          We're Under Maintenance
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-300 mb-8 max-w-lg mx-auto"
        >
          We're making some improvements to bring you a better experience.
          We'll be back shortly!
        </motion.p>

        {/* Estimated Time */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-center gap-2 text-violet-300 mb-4">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Estimated Downtime</span>
          </div>
          
          {/* Countdown-style display */}
          <div className="flex justify-center gap-4">
            {[
              { value: "02", label: "Hours" },
              { value: "30", label: "Minutes" },
              { value: "00", label: "Seconds" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-20 h-20 bg-violet-600/20 rounded-xl flex items-center justify-center border border-violet-500/30">
                  <span className="text-3xl font-bold text-white">{item.value}</span>
                </div>
                <span className="text-xs text-slate-400 mt-2 block">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Notification Signup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-center gap-2 text-white mb-4">
            <Bell className="w-5 h-5" />
            <span className="font-medium">Get Notified When We're Back</span>
          </div>
          <div className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            />
            <Button className="bg-violet-600 hover:bg-violet-700 flex-shrink-0">
              Notify Me
            </Button>
          </div>
        </motion.div>

        {/* Status Updates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-slate-400"
        >
          <p className="mb-4">Follow our status for real-time updates:</p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://twitter.com/createdot" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <Twitter className="w-4 h-4" />
              @createdot
            </a>
            <span className="text-slate-600">•</span>
            <a 
              href="https://status.createdot.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              status.createdot.com
            </a>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 pt-8 border-t border-white/10"
        >
          <p className="text-slate-400 text-sm">
            Need urgent assistance?{" "}
            <a 
              href="mailto:support@createdot.com" 
              className="text-violet-400 hover:text-violet-300 inline-flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              support@createdot.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
