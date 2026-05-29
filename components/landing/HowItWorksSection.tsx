"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Image,
  Rocket,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Users,
  DollarSign,
  Award,
} from "lucide-react";

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  color: string;
}

const steps: Step[] = [
  {
    icon: Upload,
    title: "Create Your Profile",
    description: "Set up your creative portfolio in minutes",
    details: [
      "Upload your profile photo and cover image",
      "Add your bio, skills, and experience",
      "Connect your social media accounts",
      "Set your availability and rates",
    ],
    color: "to-cyan-500",
  },
  {
    icon: Image,
    title: "Upload Your Work",
    description: "Showcase your best projects to the world",
    details: [
      "Upload images, videos, and 3D models",
      "Add detailed case studies",
      "Tag with categories and skills",
      "Import from Behance, Dribbble, or Figma",
    ],
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Rocket,
    title: "Get Discovered",
    description: "Connect with clients and opportunities",
    details: [
      "Get featured in our explore section",
      "Receive job opportunities from top companies",
      "Build your professional network",
      "Monetize your skills and expertise",
    ],
    color: "from-pink-500 to-rose-500",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "AI-Powered Tools",
    description: "Use AI to enhance your designs and get smart suggestions",
  },
  {
    icon: Users,
    title: "Global Community",
    description: "Connect with 5M+ designers and creators worldwide",
  },
  {
    icon: DollarSign,
    title: "Earn Money",
    description: "Get hired for freelance projects and full-time roles",
  },
  {
    icon: Award,
    title: "Get Recognized",
    description: "Win awards and get featured for outstanding work",
  },
];

export default function HowItWorksSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get started in three simple steps and begin your creative journey
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-[#8B5DFF] from-slate-300 to-transparent dark:from-slate-700 z-0" />
              )}

              <div
                className={`relative bg-white dark:bg-[#111111] rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-[#2A2A2A] transition-all hover:shadow-2xl cursor-pointer ${
                  expandedStep === index ? "ring-2 ring-violet-500" : ""
                }`}
                onClick={() => toggleStep(index)}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <motion.div
                  animate={{ rotate: expandedStep === index ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-2xl bg-[#8B5DFF] ${step.color} flex items-center justify-center mb-6`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {step.description}
                </p>

                {/* Expand/Collapse Button */}
                <button className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-medium hover:underline">
                  {expandedStep === index ? "Show less" : "Learn more"}
                  {expandedStep === index ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Expanded Details */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedStep === index ? "auto" : 0,
                    opacity: expandedStep === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-2">
                    {step.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{
                          x: expandedStep === index ? 0 : -20,
                          opacity: expandedStep === index ? 1 : 0,
                        }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 text-slate-600 dark:text-slate-400"
                      >
                        <svg
                          className="w-5 h-5 text-[#8B5DFF] flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Why Choose DesignDot?
            </h3>
            <p className="text-white/80">
              Everything you need to succeed as a creative professional
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
