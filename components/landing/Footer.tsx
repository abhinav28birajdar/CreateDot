"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Facebook,
  Mail,
  MapPin,
  Globe,
  ChevronUp,
  Moon,
  Sun,
  Heart,
  Shield,
  Lock,
  Apple,
  Smartphone,
  CreditCard,
} from "lucide-react";

const footerLinks = {
  product: [
    { name: "Explore Gallery", href: "/explore" },
    { name: "Marketplace Gigs", href: "/gigs" },
    { name: "Visual Pins", href: "/pins" },
    { name: "Inspiration Boards", href: "/boards" },
    { name: "Moodboard Studio", href: "/moodboards" },
    { name: "Master Directory (20 Modules)", href: "/sitemap-index", badge: "All Pages" },
  ],
  forDesigners: [
    { name: "Creator Program", href: "/creator-program", badge: "Fund" },
    { name: "Seller Program", href: "/seller-program" },
    { name: "Create a Gig", href: "/gigs/new" },
    { name: "Studio Wallet", href: "/wallet" },
    { name: "Creative Categories", href: "/categories" },
    { name: "Weekly Challenges", href: "/challenges" },
  ],
  forCompanies: [
    { name: "Buyer Program", href: "/buyer-program" },
    { name: "Post a Job Brief", href: "/post-a-job" },
    { name: "Enterprise Solutions", href: "/enterprise" },
    { name: "Escrow Orders", href: "/orders" },
    { name: "Top Freelancers", href: "/freelancers" },
    { name: "Design Agencies", href: "/agencies" },
  ],
  resources: [
    { name: "Help Center", href: "/help" },
    { name: "FAQ & Knowledge Base", href: "/faq" },
    { name: "Developer Guild", href: "/developers" },
    { name: "Brand Guidelines", href: "/brand" },
    { name: "Community Hub", href: "/community" },
  ],
  company: [
    { name: "About CreateDOT", href: "/about" },
    { name: "Pricing & Plans", href: "/pricing" },
    { name: "Careers", href: "/careers", badge: "Hiring!" },
    { name: "Contact Support", href: "/contact" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Consent", href: "/cookies" },
    { name: "Community Guidelines", href: "/guidelines" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/createdot", color: "hover:text-[#8B5DFF]" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/createdot", color: "hover:text-pink-500" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/createdot", color: "hover:text-[#8B5DFF]" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/createdot", color: "hover:text-red-500" },
  { name: "GitHub", icon: Github, href: "https://github.com/createdot", color: "hover:text-slate-300" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/createdot", color: "hover:text-[#8B5DFF]" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "zh", name: "中文" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
  { code: "ru", name: "Русский" },
  { code: "nl", name: "Nederlands" },
  { code: "pl", name: "Polski" },
  { code: "tr", name: "Türkçe" },
];

const paymentMethods = ["visa", "mastercard", "amex", "paypal", "apple-pay", "google-pay"];

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <footer className="bg-[#111111] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">CreateDOT</span>
            </Link>
            <p className="text-slate-400 text-sm mb-6">
              Where creativity meets opportunity. The world's leading platform for designers to showcase work and get hired.
            </p>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 bg-[#111111] rounded-lg text-slate-400 transition-all hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Designers */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              For Designers
            </h4>
            <ul className="space-y-3">
              {footerLinks.forDesigners.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Companies */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              For Companies
            </h4>
            <ul className="space-y-3">
              {footerLinks.forCompanies.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-2"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="px-2 py-0.5 bg-[#8B5DFF] text-white text-xs font-semibold rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Secondary Footer */}
      <div className="border-t border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left Side */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="appearance-none bg-[#111111] text-slate-300 text-sm rounded-lg px-4 py-2 pr-10 border border-[#2A2A2A] focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-slate-300 rounded-lg border border-[#2A2A2A] hover:bg-slate-700 transition-colors"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-4 h-4" />
                    <span className="text-sm">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    <span className="text-sm">Dark</span>
                  </>
                )}
              </button>

              {/* App Download */}
              <div className="flex gap-2">
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-slate-300 rounded-lg border border-[#2A2A2A] hover:bg-slate-700 transition-colors"
                >
                  <Apple className="w-4 h-4" />
                  <span className="text-sm">iOS</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-slate-300 rounded-lg border border-[#2A2A2A] hover:bg-slate-700 transition-colors"
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="text-sm">Android</span>
                </a>
              </div>
            </div>

            {/* Right Side - Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Shield className="w-4 h-4 text-[#8B5DFF]" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Lock className="w-4 h-4 text-[#8B5DFF]" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <CreditCard className="w-4 h-4 text-[#8B5DFF]" />
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>© 2026 CreateDOT Inc. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in San Francisco
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-slate-700 hidden sm:inline">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showBackToTop ? 1 : 0, y: showBackToTop ? 0 : 20 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-2xl shadow-violet-500/30 transition-all hover:scale-110 z-50"
        aria-label="Back to top"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
}
