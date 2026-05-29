"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Paintbrush,
  Briefcase,
  Sparkles,
  Users,
  DollarSign,
  Search,
  CreditCard,
  Shield,
  TrendingUp,
  MessageCircle,
  Zap,
  Globe,
  Award,
  FileCheck,
  Clock,
  Heart,
} from "lucide-react";

const creatorBenefits = [
  {
    icon: Sparkles,
    title: "Showcase Your Work",
    description: "Beautiful portfolio to display your best projects with rich media support",
  },
  {
    icon: Users,
    title: "Build Your Network",
    description: "Connect with millions of designers, clients, and collaborators worldwide",
  },
  {
    icon: Briefcase,
    title: "Job Opportunities",
    description: "Get discovered by top companies and land your dream creative role",
  },
  {
    icon: DollarSign,
    title: "Monetize Your Skills",
    description: "Sell digital assets, offer services, and grow your freelance business",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Audience",
    description: "Powerful analytics and promotion tools to expand your reach",
  },
  {
    icon: Award,
    title: "Get Recognized",
    description: "Win challenges, earn badges, and get featured for outstanding work",
  },
];

const clientBenefits = [
  {
    icon: Search,
    title: "Find Perfect Talent",
    description: "Advanced search and filters to discover designers matching your needs",
  },
  {
    icon: FileCheck,
    title: "Post Job Listings",
    description: "Reach qualified candidates with targeted job postings",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description: "Message designers directly and manage conversations efficiently",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Protected milestone-based payments with escrow protection",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Find available designers ready to start immediately",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Verified portfolios and reviews ensure reliable talent",
  },
];

export default function PlatformBenefitsSection() {
  return (
    <section className="py-20 bg-[#8B5DFF] from-violet-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Built for Everyone
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Whether you're creating or hiring, DesignDot has the tools you need
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* For Creators */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-[#8B5DFF] from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Paintbrush className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  For Creators
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Designers, artists, and creative professionals
                </p>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {creatorBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-5 bg-white dark:bg-[#111111] rounded-2xl border border-slate-100 dark:border-[#2A2A2A] hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-200 dark:group-hover:bg-violet-800 transition-colors">
                    <benefit.icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5DFF] from-violet-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-violet-500/30 transition-all"
              >
                <Paintbrush className="w-5 h-5" />
                Start Creating
              </Link>
            </motion.div>
          </motion.div>

          {/* Divider (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-32 bottom-32 w-px bg-[#8B5DFF] from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

          {/* For Clients */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-[#8B5DFF] to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  For Clients
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Companies and businesses hiring talent
                </p>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {clientBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-5 bg-white dark:bg-[#111111] rounded-2xl border border-slate-100 dark:border-[#2A2A2A] hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                    <benefit.icon className="w-5 h-5 text-[#8B5DFF] dark:text-[#8B5DFF]" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Link
                href="/hire"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5DFF] to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all"
              >
                <Search className="w-5 h-5" />
                Find Designers
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Users, value: "5M+", label: "Active Creators" },
            { icon: Briefcase, value: "150K+", label: "Hires Made" },
            { icon: Globe, value: "190+", label: "Countries" },
            { icon: Heart, value: "50M+", label: "Likes Given" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-white dark:bg-[#111111] rounded-2xl border border-slate-100 dark:border-[#2A2A2A]"
            >
              <stat.icon className="w-8 h-8 text-violet-600 dark:text-violet-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
