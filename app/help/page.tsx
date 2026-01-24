"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Book,
  MessageCircle,
  Zap,
  CreditCard,
  Shield,
  Users,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Mail,
  Phone,
  Sparkles,
  FileText,
  Upload,
  Briefcase,
  Palette,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Help categories
const categories = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "New to DesignDot? Start here",
    icon: Book,
    color: "bg-blue-500",
    articles: [
      { title: "Creating your account", views: "12.5k" },
      { title: "Setting up your profile", views: "10.2k" },
      { title: "Uploading your first project", views: "9.8k" },
      { title: "Understanding the dashboard", views: "7.3k" },
      { title: "Connecting social accounts", views: "5.1k" },
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio & Projects",
    description: "Showcase your work effectively",
    icon: Palette,
    color: "bg-violet-500",
    articles: [
      { title: "Creating stunning project pages", views: "8.9k" },
      { title: "Organizing projects into collections", views: "6.7k" },
      { title: "Adding project details and tags", views: "5.4k" },
      { title: "Custom portfolio themes", views: "4.2k" },
      { title: "Password protecting projects", views: "3.1k" },
    ],
  },
  {
    id: "account",
    title: "Account & Profile",
    description: "Manage your account settings",
    icon: Settings,
    color: "bg-green-500",
    articles: [
      { title: "Updating profile information", views: "7.2k" },
      { title: "Changing your username", views: "5.8k" },
      { title: "Privacy settings explained", views: "4.5k" },
      { title: "Deleting your account", views: "3.9k" },
      { title: "Two-factor authentication", views: "3.2k" },
    ],
  },
  {
    id: "billing",
    title: "Billing & Plans",
    description: "Payments, invoices, and subscriptions",
    icon: CreditCard,
    color: "bg-amber-500",
    articles: [
      { title: "Upgrading to Pro", views: "6.5k" },
      { title: "Managing your subscription", views: "5.3k" },
      { title: "Downloading invoices", views: "4.1k" },
      { title: "Refund policy", views: "3.8k" },
      { title: "Payment methods", views: "2.9k" },
    ],
  },
  {
    id: "community",
    title: "Community & Social",
    description: "Connect with other creatives",
    icon: Users,
    color: "bg-pink-500",
    articles: [
      { title: "Following and followers", views: "5.7k" },
      { title: "Commenting and appreciations", views: "4.8k" },
      { title: "Messaging other users", views: "4.2k" },
      { title: "Reporting inappropriate content", views: "3.6k" },
      { title: "Blocking and muting", views: "2.7k" },
    ],
  },
  {
    id: "jobs",
    title: "Jobs & Hiring",
    description: "Find work or hire designers",
    icon: Briefcase,
    color: "bg-indigo-500",
    articles: [
      { title: "Applying to job listings", views: "6.2k" },
      { title: "Setting availability status", views: "4.9k" },
      { title: "Posting a job (for employers)", views: "4.1k" },
      { title: "Freelance vs full-time settings", views: "3.4k" },
      { title: "Negotiating and contracts", views: "2.8k" },
    ],
  },
];

// Popular articles
const popularArticles = [
  { title: "How to get more views on your projects", category: "Portfolio" },
  { title: "Best practices for case studies", category: "Portfolio" },
  { title: "Setting your hourly rate", category: "Jobs" },
  { title: "Importing from Behance or Dribbble", category: "Getting Started" },
  { title: "Custom domain setup guide", category: "Account" },
];

// FAQ items
const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Go to the sign-in page and click 'Forgot password'. Enter your email address and we'll send you a link to reset your password. The link expires in 24 hours.",
  },
  {
    question: "Can I use DesignDot for free?",
    answer: "Yes! Our free plan includes up to 10 projects, basic analytics, and full community access. You can upgrade anytime to unlock unlimited projects and premium features.",
  },
  {
    question: "How do I upload high-resolution images?",
    answer: "DesignDot supports images up to 50MB each. We recommend using PNG or JPEG format with at least 2000px width for best quality. Pro users get unlimited storage.",
  },
  {
    question: "Can I transfer my work from another platform?",
    answer: "Yes! We offer one-click import from Behance and Dribbble. You can also manually upload your work. Our team can help with bulk migrations for Pro users.",
  },
  {
    question: "How does the job board work?",
    answer: "Companies post job listings on our platform. As a designer, you can browse and apply to positions. Pro users get priority visibility and can apply to unlimited jobs.",
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">DesignDot</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
              Contact Us
            </Link>
            <Link
              href="/sign-in"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-violet-600 to-violet-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How can we help you?
            </h1>
            <p className="text-violet-200 mb-8">
              Search our knowledge base or browse categories below
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 h-14 bg-white dark:bg-slate-800 border-0 rounded-xl text-lg shadow-lg"
              />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <span className="text-violet-200 text-sm">Popular:</span>
              {["Password reset", "Upload issues", "Cancel subscription"].map((term) => (
                <button
                  key={term}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mb-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {category.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4">{category.description}</p>

                <ul className="space-y-2">
                  {category.articles.slice(0, 3).map((article) => (
                    <li key={article.title}>
                      <Link
                        href={`/help/${category.id}/${article.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400"
                      >
                        <span className="truncate">{article.title}</span>
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/help/${category.id}`}
                  className="inline-flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700 font-medium mt-4"
                >
                  View all {category.articles.length} articles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <section className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-medium text-slate-900 dark:text-white pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${
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

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Popular Articles */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Popular Articles
              </h3>
              <ul className="space-y-3">
                {popularArticles.map((article) => (
                  <li key={article.title}>
                    <Link
                      href="#"
                      className="block group"
                    >
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 line-clamp-1">
                        {article.title}
                      </span>
                      <span className="text-xs text-slate-400">{article.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Options */}
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Still need help?</h3>
              <p className="text-sm text-white/80 mb-4">
                Our support team is here to assist you
              </p>
              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <div>
                    <div className="font-medium text-sm">Live Chat</div>
                    <div className="text-xs text-white/70">Available 24/7</div>
                  </div>
                </Link>
                <Link
                  href="mailto:support@designdot.io"
                  className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <div>
                    <div className="font-medium text-sm">Email Support</div>
                    <div className="text-xs text-white/70">Response within 24h</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/guidelines"
                    className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Community Guidelines
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Terms of Service
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 hover:text-violet-600"
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Privacy Policy
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-slate-100 dark:bg-slate-800/50 py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Our support team is always ready to help
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Support
            </Link>
            <a
              href="https://twitter.com/designdot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl font-medium border border-slate-200 dark:border-slate-600"
            >
              Follow @designdot
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
