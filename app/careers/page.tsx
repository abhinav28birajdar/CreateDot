"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Briefcase,
  ArrowRight,
  Search,
  Heart,
  Zap,
  Globe,
  Users,
  Clock,
  Coffee,
  Gift,
  GraduationCap,
  Home,
  Plane,
  DollarSign,
  HeartPulse,
  ChevronDown,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Departments
const departments = [
  "All",
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Operations",
  "Customer Success",
];

// Locations
const locations = [
  "All",
  "San Francisco",
  "London",
  "Singapore",
  "Remote",
];

// Job openings
const jobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "San Francisco",
    type: "Full-time",
    remote: true,
    salary: "$180K - $220K",
    posted: "2 days ago",
    featured: true,
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    remote: true,
    salary: "$150K - $180K",
    posted: "3 days ago",
    featured: true,
  },
  {
    id: 3,
    title: "Backend Engineer (Python)",
    department: "Engineering",
    location: "San Francisco",
    type: "Full-time",
    remote: true,
    salary: "$170K - $210K",
    posted: "1 week ago",
    featured: false,
  },
  {
    id: 4,
    title: "Senior Product Manager",
    department: "Product",
    location: "San Francisco",
    type: "Full-time",
    remote: false,
    salary: "$180K - $230K",
    posted: "3 days ago",
    featured: true,
  },
  {
    id: 5,
    title: "Growth Marketing Lead",
    department: "Marketing",
    location: "London",
    type: "Full-time",
    remote: true,
    salary: "£100K - £130K",
    posted: "5 days ago",
    featured: false,
  },
  {
    id: 6,
    title: "Brand Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    remote: true,
    salary: "$130K - $160K",
    posted: "1 week ago",
    featured: false,
  },
  {
    id: 7,
    title: "iOS Engineer",
    department: "Engineering",
    location: "San Francisco",
    type: "Full-time",
    remote: true,
    salary: "$180K - $220K",
    posted: "4 days ago",
    featured: false,
  },
  {
    id: 8,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Singapore",
    type: "Full-time",
    remote: false,
    salary: "S$80K - S$100K",
    posted: "2 weeks ago",
    featured: false,
  },
  {
    id: 9,
    title: "Enterprise Account Executive",
    department: "Sales",
    location: "London",
    type: "Full-time",
    remote: true,
    salary: "£90K - £120K + OTE",
    posted: "1 week ago",
    featured: false,
  },
  {
    id: 10,
    title: "Design Systems Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    remote: true,
    salary: "$160K - $200K",
    posted: "3 days ago",
    featured: true,
  },
];

// Benefits
const benefits = [
  {
    icon: HeartPulse,
    title: "Health & Wellness",
    description: "Comprehensive medical, dental, and vision coverage for you and your family.",
  },
  {
    icon: Home,
    title: "Remote Flexible",
    description: "Work from anywhere. We offer remote-first culture with optional office access.",
  },
  {
    icon: DollarSign,
    title: "Competitive Equity",
    description: "Meaningful ownership stake in the company as we grow together.",
  },
  {
    icon: Plane,
    title: "Unlimited PTO",
    description: "Take the time you need. We trust you to manage your schedule.",
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description: "$2,000/year for conferences, courses, books, and skill development.",
  },
  {
    icon: Coffee,
    title: "Home Office Setup",
    description: "$1,500 stipend to create your perfect workspace at home.",
  },
  {
    icon: Gift,
    title: "Parental Leave",
    description: "16 weeks paid leave for all new parents, regardless of gender.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Async-friendly culture. Work when you're most productive.",
  },
];

// Company values for culture section
const cultureValues = [
  {
    title: "Move Fast, Stay Creative",
    description: "We ship quickly while maintaining high design standards.",
    icon: Zap,
  },
  {
    title: "Everyone's a Designer",
    description: "Every team member contributes to our product experience.",
    icon: Sparkles,
  },
  {
    title: "Global by Default",
    description: "We build for creators everywhere, not just the US.",
    icon: Globe,
  },
  {
    title: "Kindness as Code",
    description: "We treat each other with respect and empathy.",
    icon: Heart,
  },
];

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === "All" || 
      job.location === selectedLocation || 
      (selectedLocation === "Remote" && job.remote);
    return matchesSearch && matchesDepartment && matchesLocation;
  });

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
            <Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">About</Link>
            <Link href="/careers" className="text-violet-600 font-medium">Careers</Link>
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
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              We're hiring!
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Help us empower
              <br />
              <span className="bg-[#8B5DFF] from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                5 million creators
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              Join our mission to build the world's most inspiring creative community. 
              We're looking for passionate people who love design and technology.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#openings"
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium flex items-center gap-2"
              >
                View Open Roles
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 bg-slate-100 dark:bg-[#111111] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-medium"
              >
                Learn About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Culture Values */}
      <section className="py-16 border-b border-slate-200 dark:border-[#1F1F1F]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {cultureValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <value.icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="openings" className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {jobs.length} open roles across {departments.length - 1} departments
            </p>
          </div>

          {/* Filters */}
          <div className="bg-slate-50 dark:bg-[#111111]/50 rounded-xl p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>

              {/* Department Filter */}
              <div className="relative">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="appearance-none w-full md:w-48 px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white pr-10"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept === "All" ? "All Departments" : dept}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Location Filter */}
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="appearance-none w-full md:w-48 px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white pr-10"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc === "All" ? "All Locations" : loc}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 dark:bg-[#111111]/50 rounded-xl">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No positions match your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDepartment("All");
                    setSelectedLocation("All");
                  }}
                  className="text-violet-600 hover:underline mt-2"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/careers/${job.id}`}
                    className={`block bg-white dark:bg-[#111111] rounded-xl border ${
                      job.featured
                        ? "border-violet-200 dark:border-violet-800 ring-1 ring-violet-100 dark:ring-violet-900"
                        : "border-slate-200 dark:border-[#2A2A2A]"
                    } p-6 hover:shadow-lg transition-shadow group`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 transition-colors">
                            {job.title}
                          </h3>
                          {job.featured && (
                            <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                            {job.remote && " (Remote OK)"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <div className="font-medium text-slate-900 dark:text-white">
                            {job.salary}
                          </div>
                          <div className="text-sm text-slate-400">{job.posted}</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50 dark:bg-[#111111]/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Benefits & Perks
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We take care of our team so they can focus on doing their best work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-[#111111] rounded-xl p-6 border border-slate-200 dark:border-[#2A2A2A]"
              >
                <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-5 h-5 text-violet-600" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-500">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Where We Work
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Remote-first with offices in major creative hubs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { city: "San Francisco", country: "USA", team: "60+ team members", isHQ: true },
              { city: "London", country: "UK", team: "25+ team members", isHQ: false },
              { city: "Singapore", country: "Singapore", team: "15+ team members", isHQ: false },
            ].map((office, index) => (
              <div
                key={office.city}
                className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#2A2A2A] overflow-hidden"
              >
                <div className="h-40 bg-[#8B5DFF] from-violet-200 to-fuchsia-200 dark:from-violet-900 dark:to-fuchsia-900" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {office.city}
                    </h3>
                    {office.isHQ && (
                      <Badge className="bg-violet-100 text-violet-700 text-xs">HQ</Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{office.country}</p>
                  <p className="text-sm text-slate-400 mt-2">{office.team}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-[#111111] rounded-lg">
              <Globe className="w-5 h-5 text-violet-600" />
              <span className="text-slate-600 dark:text-slate-400">
                Plus <strong className="text-slate-900 dark:text-white">50+</strong> remote team members across 20 countries
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#8B5DFF] from-violet-600 to-fuchsia-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don't see the right role?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            We're always looking for talented people. Send us your portfolio and 
            tell us how you'd like to contribute.
          </p>
          <Link
            href="/contact?type=careers"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
