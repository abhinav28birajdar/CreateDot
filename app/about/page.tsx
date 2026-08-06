"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Globe,
  Users,
  Zap,
  Shield,
  ArrowRight,
  Play,
  Award,
  TrendingUp,
  MapPin,
  Calendar,
  Star,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Company stats
const stats = [
  { label: "Creatives", value: "5M+", icon: Users },
  { label: "Countries", value: "180+", icon: Globe },
  { label: "Projects Shared", value: "50M+", icon: TrendingUp },
  { label: "Hires Made", value: "500K+", icon: Award },
];

// Company values
const values = [
  {
    title: "Creativity First",
    description: "We believe everyone has the power to create. Our platform is built to inspire and amplify creative voices around the world.",
    icon: Sparkles,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Community Driven",
    description: "Great design happens when people connect. We foster a supportive community where creatives learn, share, and grow together.",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Accessible to All",
    description: "Design opportunities shouldn't be limited by geography or background. We're making the creative industry more accessible globally.",
    icon: Globe,
    color: "to-cyan-500",
  },
  {
    title: "Trust & Safety",
    description: "Your work is valuable. We protect your intellectual property and maintain a safe, respectful environment for all creators.",
    icon: Shield,
    color: "",
  },
];

// Timeline/milestones
const milestones = [
  { year: "2018", title: "Founded in San Francisco", description: "Started with a simple idea: make portfolio building beautiful and effortless." },
  { year: "2019", title: "Launched to public", description: "Opened doors to creators worldwide, reaching 100K users in the first month." },
  { year: "2020", title: "Series A funding", description: "Raised $15M to expand our team and build more features for creators." },
  { year: "2021", title: "Job marketplace launch", description: "Connected designers with opportunities, facilitating over 100K hires." },
  { year: "2022", title: "5 million users", description: "Became the fastest-growing design portfolio platform globally." },
  { year: "2023", title: "AI-powered tools", description: "Introduced AI features to help creators work smarter, not harder." },
  { year: "2024", title: "Global expansion", description: "Opened offices in London and Singapore, supporting creators 24/7." },
];

// Leadership team
const leadership = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "Former design lead at Google. Passionate about democratizing design.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Marcus Williams",
    role: "CTO & Co-Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Ex-Netflix engineer. Building the infrastructure for creative expression.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Elena Rodriguez",
    role: "Chief Design Officer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Award-winning designer. Led design at Airbnb and Spotify.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "James Park",
    role: "VP of Product",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Product veteran from Meta. Obsessed with creator experience.",
    linkedin: "#",
    twitter: "#",
  },
];

// Press mentions
const press = [
  { name: "TechCrunch", logo: "/press/techcrunch.svg", quote: "The platform designers have been waiting for." },
  { name: "Forbes", logo: "/press/forbes.svg", quote: "Revolutionizing how creative talent is discovered." },
  { name: "Wired", logo: "/press/wired.svg", quote: "A beautiful home for the world's best design work." },
  { name: "Fast Company", logo: "/press/fastcompany.svg", quote: "Most innovative design platform of 2024." },
];

// Investors
const investors = [
  "Sequoia Capital",
  "Andreessen Horowitz",
  "Accel",
  "Index Ventures",
  "Y Combinator",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border-b border-slate-200 dark:border-[#1F1F1F] z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">CreateDOT</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-violet-600 font-medium">About</Link>
            <Link href="/careers" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Careers</Link>
            <Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Blog</Link>
            <Link href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Contact</Link>
          </nav>
          <Link
            href="/get-started"
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-[#8B5DFF] from-violet-50 to-white dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              About CreateDOT
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Empowering creators to
              <br />
              <span className="bg-[#8B5DFF] from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                share their story
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
              We're building the world's most inspiring creative community—where designers, 
              illustrators, and artists showcase their work and connect with opportunities.
            </p>

            {/* Video/Image placeholder */}
            <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-[#8B5DFF] from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <button className="w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-violet-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                We believe that every creative deserves a platform to showcase their work, 
                tell their story, and connect with opportunities that matter.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                CreateDOT was founded with a simple vision: to create the most beautiful, 
                accessible, and inspiring portfolio platform in the world. A place where 
                design speaks for itself.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Today, we're proud to serve over 5 million creatives across 180+ countries, 
                helping them get hired, find collaborators, and build their careers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl bg-[#8B5DFF] from-violet-200 to-fuchsia-200 dark:from-violet-900 dark:to-fuchsia-900" />
                <div className="aspect-square rounded-2xl bg-[#8B5DFF] from-pink-200 to-rose-200 dark:from-pink-900 dark:to-rose-900" />
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl bg-[#8B5DFF] to-cyan-200 dark:dark:to-cyan-900" />
                <div className="aspect-[4/5] rounded-2xl bg-[#8B5DFF] from-amber-200 to-orange-200 dark:from-amber-900 dark:to-orange-900" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50 dark:bg-[#111111]/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The principles that guide everything we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-[#111111] rounded-2xl p-6 border border-slate-200 dark:border-[#2A2A2A]"
              >
                <div className={`w-12 h-12 rounded-xl bg-[#8B5DFF] ${value.color} flex items-center justify-center mb-4`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              From a small idea to a global creative community
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-[#8B5DFF] from-violet-500 to-fuchsia-500 md:-translate-x-1/2" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center md:-translate-x-1/2 z-10">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="inline-block px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 text-sm font-medium rounded-full mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-slate-50 dark:bg-[#111111]/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Leadership Team
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              The people building the future of creative work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-[#111111] rounded-2xl p-6 border border-slate-200 dark:border-[#2A2A2A] text-center"
              >
                <div className="w-24 h-24 rounded-full bg-[#8B5DFF] from-violet-200 to-fuchsia-200 dark:from-violet-900 dark:to-fuchsia-900 mx-auto mb-4 overflow-hidden">
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {person.name}
                </h3>
                <p className="text-sm text-violet-600 mb-2">{person.role}</p>
                <p className="text-sm text-slate-500 mb-4">{person.bio}</p>
                <div className="flex items-center justify-center gap-3">
                  <a href={person.linkedin} className="text-slate-400 hover:text-violet-600">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a href={person.twitter} className="text-slate-400 hover:text-violet-600">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium"
            >
              Join our team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Press & Investors */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Press */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Featured In
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {press.map((item) => (
                  <div
                    key={item.name}
                    className="bg-slate-100 dark:bg-[#111111] rounded-xl p-4 text-center"
                  >
                    <div className="text-lg font-bold text-slate-400 mb-2">{item.name}</div>
                    <p className="text-xs text-slate-500 italic">"{item.quote}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Investors */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Backed By
              </h3>
              <div className="flex flex-wrap gap-3">
                {investors.map((investor) => (
                  <span
                    key={investor}
                    className="px-4 py-2 bg-slate-100 dark:bg-[#111111] rounded-lg text-sm text-slate-600 dark:text-slate-400"
                  >
                    {investor}
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-4">
                We've raised $50M+ to build the future of creative portfolios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#8B5DFF] from-violet-600 to-fuchsia-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to join the community?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Start showcasing your work today and connect with millions of creatives worldwide.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/get-started"
              className="px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2"
            >
              Create Your Portfolio
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/careers"
              className="px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
