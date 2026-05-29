"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started",
    features: [
      "Upload up to 12 projects",
      "Basic profile customization",
      "Join the community",
      "Apply to 5 jobs/month",
      "Standard support",
    ],
    icon: Zap,
    color: "from-slate-500 to-slate-600",
    popular: false,
  },
  {
    name: "Pro",
    price: 12,
    description: "For serious creators",
    features: [
      "Unlimited project uploads",
      "Advanced analytics",
      "Custom portfolio URL",
      "Priority job applications",
      "Remove DesignDot branding",
      "Featured in search results",
      "Pro badge on profile",
      "Priority support",
    ],
    icon: Crown,
    color: "from-violet-600 to-purple-600",
    popular: true,
  },
];

export default function PricingTeaserSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#111111]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Start Free, Upgrade Anytime
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Join millions of creators on our free plan, or unlock premium features with Pro
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? "bg-[#8B5DFF] from-violet-600 to-purple-700 text-white shadow-2xl shadow-violet-500/30 scale-105"
                  : "bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#2A2A2A]"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#8B5DFF] from-amber-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    plan.popular ? "bg-white/20" : `bg-[#8B5DFF] ${plan.color}`
                  }`}
                >
                  <plan.icon
                    className={`w-6 h-6 ${plan.popular ? "text-white" : "text-white"}`}
                  />
                </div>
                <div>
                  <h3
                    className={`text-2xl font-bold ${
                      plan.popular ? "text-white" : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      plan.popular ? "text-white/80" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span
                  className={`text-5xl font-bold ${
                    plan.popular ? "text-white" : "text-slate-900 dark:text-white"
                  }`}
                >
                  ${plan.price}
                </span>
                <span
                  className={`text-lg ${
                    plan.popular ? "text-white/70" : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  /month
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.popular ? "text-green-300" : "text-[#8B5DFF]"
                      }`}
                    />
                    <span
                      className={
                        plan.popular ? "text-white/90" : "text-slate-600 dark:text-slate-400"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={plan.popular ? "/pricing" : "/get-started"}
                className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? "bg-white text-violet-600 hover:bg-white/90 shadow-lg"
                    : "bg-[#111111] dark:bg-white text-white dark:text-slate-900 hover:bg-[#111111] dark:hover:bg-slate-100"
                }`}
              >
                {plan.popular ? "Get Pro" : "Get Started Free"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#8B5DFF]" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-[#8B5DFF]" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#8B5DFF]" />
            <span>No hidden fees</span>
          </div>
        </motion.div>

        {/* See All Plans Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold hover:underline"
          >
            See all plans and features
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
