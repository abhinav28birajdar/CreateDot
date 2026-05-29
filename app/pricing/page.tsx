"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Crown,
  Building2,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Star,
  Users,
  Shield,
  Clock,
  CreditCard,
  Gift,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Pricing plans
const plans = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for getting started",
    price: { monthly: 0, yearly: 0 },
    icon: Sparkles,
    color: "from-slate-500 to-slate-600",
    popular: false,
    features: [
      { text: "Up to 10 projects", included: true },
      { text: "Basic portfolio page", included: true },
      { text: "Community access", included: true },
      { text: "Apply to 5 jobs/month", included: true },
      { text: "Standard support", included: true },
      { text: "Custom domain", included: false },
      { text: "Analytics & insights", included: false },
      { text: "Priority in search", included: false },
      { text: "Verified badge", included: false },
      { text: "Remove watermark", included: false },
    ],
    cta: "Get Started",
    ctaLink: "/get-started",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For serious creators",
    price: { monthly: 12, yearly: 9 },
    icon: Zap,
    color: "from-violet-500 to-fuchsia-500",
    popular: true,
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Custom portfolio themes", included: true },
      { text: "Community access", included: true },
      { text: "Unlimited job applications", included: true },
      { text: "Priority support", included: true },
      { text: "Custom domain", included: true },
      { text: "Analytics & insights", included: true },
      { text: "Priority in search", included: true },
      { text: "Verified badge", included: true },
      { text: "Remove watermark", included: true },
    ],
    cta: "Start Free Trial",
    ctaLink: "/get-started?plan=pro",
  },
  {
    id: "team",
    name: "Team",
    description: "For agencies & studios",
    price: { monthly: 49, yearly: 39 },
    icon: Crown,
    color: "from-amber-500 to-orange-500",
    popular: false,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Up to 10 team members", included: true },
      { text: "Team portfolio page", included: true },
      { text: "Shared project library", included: true },
      { text: "Team analytics", included: true },
      { text: "Custom branding", included: true },
      { text: "API access", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Priority job listings", included: true },
      { text: "Invoice clients", included: true },
    ],
    cta: "Contact Sales",
    ctaLink: "/contact?type=team",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: { monthly: null, yearly: null },
    icon: Building2,
    color: "from-slate-700 to-slate-900",
    popular: false,
    features: [
      { text: "Everything in Team", included: true },
      { text: "Unlimited team members", included: true },
      { text: "SSO/SAML", included: true },
      { text: "Custom integrations", included: true },
      { text: "SLA guarantee", included: true },
      { text: "Dedicated infrastructure", included: true },
      { text: "24/7 phone support", included: true },
      { text: "Onboarding & training", included: true },
      { text: "Custom contract", included: true },
      { text: "Compliance (SOC2, GDPR)", included: true },
    ],
    cta: "Contact Sales",
    ctaLink: "/contact?type=enterprise",
  },
];

// Comparison features for detailed table
const comparisonCategories = [
  {
    name: "Portfolio",
    features: [
      { name: "Projects", free: "10", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
      { name: "Storage", free: "1 GB", pro: "50 GB", team: "200 GB", enterprise: "Unlimited" },
      { name: "Custom domain", free: false, pro: true, team: true, enterprise: true },
      { name: "Remove branding", free: false, pro: true, team: true, enterprise: true },
      { name: "Custom themes", free: false, pro: true, team: true, enterprise: true },
      { name: "Password protection", free: false, pro: true, team: true, enterprise: true },
    ],
  },
  {
    name: "Jobs & Hiring",
    features: [
      { name: "Job applications", free: "5/month", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
      { name: "Featured in search", free: false, pro: true, team: "Priority", enterprise: "Priority" },
      { name: "Post job listings", free: false, pro: false, team: true, enterprise: true },
      { name: "Talent search", free: false, pro: false, team: true, enterprise: true },
    ],
  },
  {
    name: "Analytics",
    features: [
      { name: "Basic stats", free: true, pro: true, team: true, enterprise: true },
      { name: "Advanced analytics", free: false, pro: true, team: true, enterprise: true },
      { name: "Export data", free: false, pro: true, team: true, enterprise: true },
      { name: "Team reports", free: false, pro: false, team: true, enterprise: true },
    ],
  },
  {
    name: "Support",
    features: [
      { name: "Community support", free: true, pro: true, team: true, enterprise: true },
      { name: "Email support", free: false, pro: true, team: true, enterprise: true },
      { name: "Priority support", free: false, pro: true, team: true, enterprise: true },
      { name: "Dedicated manager", free: false, pro: false, team: true, enterprise: true },
      { name: "Phone support", free: false, pro: false, team: false, enterprise: true },
    ],
  },
];

// FAQ items
const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, you'll receive a credit towards future billing.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start. You can explore all features before committing.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. Enterprise customers can also pay via invoice.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. You can cancel your subscription at any time. Your account will remain active until the end of your current billing period.",
  },
  {
    question: "What happens to my projects if I downgrade?",
    answer: "Your projects are safe! If you exceed the free plan limits, your portfolio will become read-only until you either upgrade again or remove some projects.",
  },
  {
    question: "Do you offer discounts for students?",
    answer: "Yes! Students get 50% off Pro plans. Just verify your student status with a valid .edu email or student ID.",
  },
];

// Stats
const stats = [
  { label: "Creators using Pro", value: "500K+" },
  { label: "Hires made", value: "150K+" },
  { label: "Uptime guarantee", value: "99.9%" },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border-b border-slate-200 dark:border-[#1F1F1F] z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">DesignDot</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
              Sign In
            </Link>
            <Link
              href="/get-started"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="text-center max-w-4xl mx-auto px-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-sm font-medium mb-4">
              <Gift className="w-4 h-4" />
              Save 25% with yearly billing
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Choose the perfect plan
              <br />
              <span className="bg-[#8B5DFF] from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                for your creative journey
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Start free and scale as you grow. All plans include access to our global creative community.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!isYearly ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isYearly ? "bg-violet-600" : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <motion.div
                layout
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
                animate={{ left: isYearly ? "calc(100% - 24px)" : "4px" }}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>
              Yearly
              <span className="ml-1 text-green-600 font-semibold">-25%</span>
            </span>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white dark:bg-[#111111] rounded-2xl p-6 ${
                  plan.popular
                    ? "ring-2 ring-violet-600 shadow-xl scale-[1.02]"
                    : "border border-slate-200 dark:border-[#2A2A2A]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-600 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Icon & Name */}
                <div className={`w-12 h-12 rounded-xl bg-[#8B5DFF] ${plan.color} flex items-center justify-center mb-4`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  {plan.price.monthly !== null ? (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-slate-900 dark:text-white">
                          ${isYearly ? plan.price.yearly : plan.price.monthly}
                        </span>
                        <span className="text-slate-500">/month</span>
                      </div>
                      {isYearly && plan.price.monthly > 0 && (
                        <p className="text-sm text-slate-500 mt-1">
                          Billed ${plan.price.yearly * 12}/year
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      Custom pricing
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={plan.ctaLink}
                  className={`block w-full py-3 rounded-xl font-medium text-center transition-colors mb-6 ${
                    plan.popular
                      ? "bg-violet-600 hover:bg-violet-700 text-white"
                      : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white"
                  }`}
                >
                  {plan.cta}
                </Link>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-[#8B5DFF] flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? "text-slate-700 dark:text-slate-300" : "text-slate-400"}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-4xl mx-auto px-4 mb-20">
          <div className="grid grid-cols-3 gap-8 py-8 border-y border-slate-200 dark:border-[#1F1F1F]">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table Toggle */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="w-full flex items-center justify-center gap-2 py-4 text-violet-600 hover:text-violet-700 font-medium"
          >
            {showComparison ? "Hide" : "View"} full feature comparison
            <ChevronDown className={`w-5 h-5 transition-transform ${showComparison ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white dark:bg-[#111111] rounded-2xl border border-slate-200 dark:border-[#2A2A2A] overflow-x-auto mt-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-[#2A2A2A]">
                        <th className="text-left p-4 min-w-[200px]">Feature</th>
                        {["Free", "Pro", "Team", "Enterprise"].map((plan) => (
                          <th key={plan} className="text-center p-4 min-w-[120px]">
                            {plan}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonCategories.map((category) => (
                        <React.Fragment key={category.name}>
                          <tr className="bg-slate-50 dark:bg-[#111111]">
                            <td colSpan={5} className="p-4 font-semibold text-slate-900 dark:text-white">
                              {category.name}
                            </td>
                          </tr>
                          {category.features.map((feature, i) => (
                            <tr key={i} className="border-b border-slate-100 dark:border-[#2A2A2A]/50">
                              <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                                {feature.name}
                              </td>
                              {["free", "pro", "team", "enterprise"].map((plan) => {
                                const value = feature[plan as keyof typeof feature];
                                return (
                                  <td key={plan} className="text-center p-4">
                                    {typeof value === "boolean" ? (
                                      value ? (
                                        <Check className="w-5 h-5 text-[#8B5DFF] mx-auto" />
                                      ) : (
                                        <X className="w-5 h-5 text-slate-300 mx-auto" />
                                      )
                                    ) : (
                                      <span className="text-sm text-slate-700 dark:text-slate-300">
                                        {value}
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Trust Badges */}
        <section className="max-w-4xl mx-auto px-4 mb-20">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-slate-500">
              <Shield className="w-5 h-5" />
              <span className="text-sm">256-bit SSL encryption</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm">Secure payments via Stripe</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently asked questions
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Can't find what you're looking for?{" "}
              <Link href="/help" className="text-violet-600 hover:underline">
                Contact our support team
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#2A2A2A] overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* CTA Footer */}
      <section className="bg-[#8B5DFF] from-violet-600 to-fuchsia-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to showcase your work?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join over 5 million designers and start building your creative portfolio today.
          </p>
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
          >
            Get started for free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
