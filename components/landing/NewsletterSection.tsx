"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check, Users, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubscribed(true);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8"
          >
            <Mail className="w-10 h-10 text-white" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Weekly Inspiration
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join 250,000+ designers and get the best creative inspiration, tips, and resources delivered to your inbox every week.
          </p>

          {/* Form or Success */}
          {!isSubscribed ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="max-w-lg mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-white text-slate-900 rounded-xl border-0 focus:ring-2 focus:ring-white/50 text-lg"
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 min-w-[140px]"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
              
              {/* Error Message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-200 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}

              {/* Privacy Notice */}
              <p className="text-white/60 text-sm mt-4">
                🔒 Your email is safe with us. No spam, unsubscribe anytime.
              </p>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">
                You're subscribed! 🎉
              </h3>
              <p className="text-white/80">
                Check your inbox for a welcome email. We can't wait to share amazing design content with you!
              </p>
            </motion.div>
          )}

          {/* Subscriber Count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-3 mt-8"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?u=newsletter${i}`}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-violet-600"
                />
              ))}
            </div>
            <span className="text-white/80 text-sm flex items-center gap-1">
              <Users className="w-4 h-4" />
              Join 250,000+ subscribers
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
