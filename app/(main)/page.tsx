"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function LandingPage() {
  const { user } = useAuth();

  const features = [
    {
      icon: "🎨",
      title: "Showcase Your Work",
      description: "Build your creative portfolio and share your best projects with the world",
    },
    {
      icon: "🔍",
      title: "Discover Inspiration",
      description:
        "Explore thousands of creative projects and find inspiration from talented creators",
    },
    {
      icon: "🤝",
      title: "Collaborate & Connect",
      description: "Connect with other creators, clients, and build meaningful professional relationships",
    },
    {
      icon: "💼",
      title: "Find Opportunities",
      description:
        "Access freelance jobs, partnerships, and monetize your creative work",
    },
    {
      icon: "🤖",
      title: "AI-Powered Tools",
      description:
        "Get AI suggestions for captions, tags, and portfolio improvements",
    },
    {
      icon: "📊",
      title: "Analytics & Growth",
      description:
        "Track your profile views, engagement, and grow your creative audience",
    },
  ];

  return (
    <div className="min-h-screen bg-[#8B5DFF] from-gray-50 via-white to-[#FFF8DE]/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950/50">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-[#8B5DFF] from-[#576A8F] to-[#B7BDF7] bg-clip-text text-transparent">
                Your Creative Platform
              </span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Join thousands of designers, developers, and creators. Showcase your portfolio,
              discover inspiration, collaborate, and monetize your creative work.
            </p>
            <div className="flex flex-wrap gap-4">
              {user ? (
                <>
                  <Link href="/explore">
                    <Button variant="primary" size="lg">
                      Explore Platform
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="secondary" size="lg">
                      Go to Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/signup">
                    <Button variant="primary" size="lg">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link href="/explore">
                    <Button variant="outline" size="lg">
                      Explore as Guest
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {/* Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-[#8B5DFF] from-[#576A8F]/20 to-[#B7BDF7]/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-8xl">
              🎨
            </div>
            <div className="absolute inset-0 rounded-2xl bg-[#8B5DFF] from-[#576A8F]/10 to-[#B7BDF7]/10 blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5 dark:bg-gray-950/5 backdrop-blur-sm border-y border-white/20 dark:border-[#1F1F1F]/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" size="lg" className="mb-4">
              ✨ Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A complete platform designed for modern creators, designers, and developers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="text-center h-full cursor-pointer hover:shadow-md transition">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-[#8B5DFF] from-[#576A8F]/20 to-[#B7BDF7]/20 backdrop-blur-xl border border-white/20 p-12 md:p-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
            Ready to Showcase Your Work?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join CreateDot today and become part of a thriving community of creative professionals.
          </p>
          {!user && (
            <Link href="/auth/signup">
              <Button variant="primary" size="lg">
                Create Your Profile
              </Button>
            </Link>
          )}
        </motion.div>
      </section>
    </div>
  );
}

