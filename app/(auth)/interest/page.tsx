"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Paintbrush,
  Briefcase,
  Search,
  GraduationCap,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface InterestOption {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  benefits: string[];
  color: string;
  bgColor: string;
}

const interestOptions: InterestOption[] = [
  {
    id: "creator",
    icon: Paintbrush,
    title: "I'm a creator looking to showcase work",
    description: "Build your portfolio, get discovered, and land dream opportunities",
    benefits: [
      "Upload unlimited projects",
      "Get featured in explore",
      "Connect with clients",
      "Join the community",
    ],
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-900/30 border-violet-200 dark:border-violet-800",
  },
  {
    id: "hiring",
    icon: Briefcase,
    title: "I'm hiring creative talent",
    description: "Find and hire top designers, illustrators, and creatives",
    benefits: [
      "Access 5M+ portfolios",
      "Post job listings",
      "Direct messaging",
      "Verified talent",
    ],
    color: "text-[#8B5DFF] dark:text-[#8B5DFF]",
    bgColor: "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
  },
  {
    id: "exploring",
    icon: Search,
    title: "I'm exploring for inspiration",
    description: "Discover amazing design work and creative ideas",
    benefits: [
      "Curated collections",
      "Trending projects",
      "Save favorites",
      "Follow creators",
    ],
    color: "text-green-600 dark:text-[#8B5DFF]",
    bgColor: "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800",
  },
  {
    id: "student",
    icon: GraduationCap,
    title: "I'm a student/learning design",
    description: "Learn from the best and start building your portfolio",
    benefits: [
      "Free student account",
      "Learning resources",
      "Mentorship access",
      "Portfolio reviews",
    ],
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800",
  },
];

export default function PreSignupInterestPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedOption) {
      // Save selection to session storage for onboarding customization
      sessionStorage.setItem("signup-interest", selectedOption);
      window.location.href = "/get-started";
    }
  };

  const handleSkip = () => {
    sessionStorage.removeItem("signup-interest");
    window.location.href = "/get-started";
  };

  return (
    <div className="min-h-screen bg-[#8B5DFF] from-slate-50 to-violet-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              DesignDot
            </span>
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            What brings you here today?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Help us personalize your experience by telling us about yourself
          </motion.p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {interestOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              onMouseEnter={() => setHoveredOption(option.id)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              <button
                onClick={() => setSelectedOption(option.id)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                  selectedOption === option.id
                    ? `${option.bgColor} border-current ${option.color} ring-2 ring-offset-2 ring-violet-500`
                    : "bg-white dark:bg-[#111111] border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{
                      scale: selectedOption === option.id || hoveredOption === option.id ? 1.1 : 1,
                    }}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      selectedOption === option.id
                        ? option.bgColor
                        : "bg-slate-100 dark:bg-slate-700"
                    }`}
                  >
                    <option.icon
                      className={`w-7 h-7 ${
                        selectedOption === option.id
                          ? option.color
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    />
                  </motion.div>

                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold mb-1 ${
                        selectedOption === option.id
                          ? option.color
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {option.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                      {option.description}
                    </p>

                    {/* Benefits (show on hover or selection) */}
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height:
                          selectedOption === option.id || hoveredOption === option.id
                            ? "auto"
                            : 0,
                        opacity:
                          selectedOption === option.id || hoveredOption === option.id
                            ? 1
                            : 0,
                      }}
                      className="space-y-1 overflow-hidden"
                    >
                      {option.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                        >
                          <ChevronRight className="w-4 h-4 text-[#8B5DFF]" />
                          {benefit}
                        </li>
                      ))}
                    </motion.ul>
                  </div>

                  {/* Selection Indicator */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedOption === option.id
                        ? `${option.color} border-current`
                        : "border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {selectedOption === option.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 rounded-full bg-current"
                      />
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleContinue}
            disabled={!selectedOption}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center gap-2 ${
              selectedOption
                ? "bg-violet-600 hover:bg-violet-700 text-white shadow-lg hover:shadow-xl"
                : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleSkip}
            className="px-8 py-4 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors"
          >
            Skip for now
          </button>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-2 bg-violet-600 rounded-full" />
            <div className="w-8 h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="w-8 h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="w-8 h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
