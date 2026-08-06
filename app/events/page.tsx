"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Users,
  Globe,
  Video,
  Star,
  Heart,
  Share2,
  ChevronRight,
  Filter,
  ArrowRight,
  Ticket,
  ExternalLink,
  Sparkles,
  Mic,
  BookOpen,
  Trophy,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// ============ TYPES ============
interface Event {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  type: "online" | "in-person" | "hybrid";
  category: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  venue?: string;
  price: number | "free";
  capacity: number;
  registered: number;
  hosts: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  }[];
  speakers?: {
    name: string;
    avatar: string;
    title: string;
    company: string;
  }[];
  tags: string[];
  isFeatured: boolean;
  isLive?: boolean;
}

// ============ MOCK DATA ============
const eventCategories = [
  { name: "All Events", icon: Calendar },
  { name: "Workshops", icon: BookOpen },
  { name: "Webinars", icon: Video },
  { name: "Conferences", icon: Mic },
  { name: "Meetups", icon: Users },
  { name: "Hackathons", icon: Trophy },
];

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Design Systems Summit 2025",
    description: "Join us for the largest design systems conference. Learn from industry leaders about building and scaling design systems across organizations.",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    type: "hybrid",
    category: "Conferences",
    date: "2025-02-15",
    time: "9:00 AM PST",
    duration: "3 days",
    location: "San Francisco, CA + Online",
    venue: "Moscone Center",
    price: 299,
    capacity: 5000,
    registered: 3456,
    hosts: [
      {
        id: "h1",
        name: "CreateDOT",
        avatar: "/logo.png",
        role: "Host",
      },
    ],
    speakers: [
      { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", title: "Design Lead", company: "Airbnb" },
      { name: "Marcus Lee", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", title: "VP Design", company: "Figma" },
      { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", title: "Design Director", company: "Spotify" },
    ],
    tags: ["Design Systems", "UI/UX", "Enterprise"],
    isFeatured: true,
    isLive: false,
  },
  {
    id: "2",
    title: "Figma Masterclass: Advanced Prototyping",
    description: "Deep dive into Figma's advanced prototyping features. Learn to create complex interactions, smart animate, and variables.",
    coverImage: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=600&fit=crop",
    type: "online",
    category: "Workshops",
    date: "2025-01-25",
    time: "11:00 AM EST",
    duration: "3 hours",
    location: "Online",
    price: "free",
    capacity: 500,
    registered: 423,
    hosts: [
      {
        id: "h2",
        name: "Figma Community",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        role: "Official Partner",
      },
    ],
    tags: ["Figma", "Prototyping", "Tutorial"],
    isFeatured: true,
    isLive: false,
  },
  {
    id: "3",
    title: "NYC Design Meetup: Portfolio Reviews",
    description: "Monthly meetup for NYC designers. Get your portfolio reviewed by senior designers from top tech companies.",
    coverImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=600&fit=crop",
    type: "in-person",
    category: "Meetups",
    date: "2025-01-20",
    time: "6:30 PM EST",
    duration: "2 hours",
    location: "New York, NY",
    venue: "WeWork Times Square",
    price: "free",
    capacity: 50,
    registered: 48,
    hosts: [
      {
        id: "h3",
        name: "NYC Design Community",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        role: "Community Organizer",
      },
    ],
    tags: ["Portfolio", "Networking", "Career"],
    isFeatured: false,
    isLive: false,
  },
  {
    id: "4",
    title: "AI in Design: Live Q&A with Industry Experts",
    description: "Join us for a live discussion on how AI is transforming the design industry. Ask your questions directly to the experts.",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    type: "online",
    category: "Webinars",
    date: "2025-01-18",
    time: "2:00 PM PST",
    duration: "1.5 hours",
    location: "Online",
    price: "free",
    capacity: 1000,
    registered: 876,
    hosts: [
      {
        id: "h4",
        name: "CreateDOT",
        avatar: "/logo.png",
        role: "Host",
      },
    ],
    speakers: [
      { name: "Jordan Park", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", title: "Creative Director", company: "OpenAI" },
    ],
    tags: ["AI", "Future of Design", "Q&A"],
    isFeatured: true,
    isLive: true,
  },
  {
    id: "5",
    title: "Global Design Hackathon 2025",
    description: "48-hour design hackathon with teams from around the world. $50,000 in prizes. Theme: Sustainable Design for Social Good.",
    coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
    type: "online",
    category: "Hackathons",
    date: "2025-02-01",
    time: "12:00 PM UTC",
    duration: "48 hours",
    location: "Online (Global)",
    price: "free",
    capacity: 2000,
    registered: 1234,
    hosts: [
      {
        id: "h5",
        name: "CreateDOT",
        avatar: "/logo.png",
        role: "Host",
      },
    ],
    tags: ["Hackathon", "Competition", "Prizes"],
    isFeatured: true,
    isLive: false,
  },
  {
    id: "6",
    title: "UX Research Methods Workshop",
    description: "Hands-on workshop covering user interviews, usability testing, surveys, and data analysis techniques.",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    type: "online",
    category: "Workshops",
    date: "2025-01-30",
    time: "10:00 AM EST",
    duration: "4 hours",
    location: "Online",
    price: 49,
    capacity: 100,
    registered: 67,
    hosts: [
      {
        id: "h6",
        name: "UX Research Academy",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        role: "Training Partner",
      },
    ],
    tags: ["UX Research", "User Testing", "Skills"],
    isFeatured: false,
    isLive: false,
  },
];

// ============ EVENT CARD ============
function EventCard({ event, size = "medium" }: { event: Event; size?: "large" | "medium" }) {
  const getEventTypeColor = () => {
    switch (event.type) {
      case "online":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-[#8B5DFF]";
      case "in-person":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-[#8B5DFF]";
      case "hybrid":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    }
  };

  const spotsLeft = event.capacity - event.registered;
  const isSoldOut = spotsLeft <= 0;
  const isAlmostFull = spotsLeft > 0 && spotsLeft <= event.capacity * 0.1;

  if (size === "large") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1F1F1F]"
      >
        <Link href={`/events/${event.id}`}>
          <div className="relative h-80 overflow-hidden">
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-[#8B5DFF] from-black/80 via-black/40 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {event.isLive && (
                <Badge className="bg-red-500 text-white animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full mr-2" />
                  LIVE NOW
                </Badge>
              )}
              {event.isFeatured && (
                <Badge className="bg-amber-500 text-white">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              <Badge className={getEventTypeColor()}>
                {event.type === "online" && <Video className="w-3 h-3 mr-1" />}
                {event.type === "in-person" && <MapPin className="w-3 h-3 mr-1" />}
                {event.type === "hybrid" && <Globe className="w-3 h-3 mr-1" />}
                {event.type}
              </Badge>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Badge variant="secondary" className="mb-3">
                {event.category}
              </Badge>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                {event.title}
              </h2>
              <p className="text-slate-300 line-clamp-2 mb-4">
                {event.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.registered.toLocaleString()} registered
                  </span>
                </div>

                <div className="text-white font-bold">
                  {event.price === "free" ? "Free" : `$${event.price}`}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#1F1F1F] overflow-hidden hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700 transition-all"
    >
      <Link href={`/events/${event.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-[#8B5DFF] from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {event.isLive && (
              <Badge className="bg-red-500 text-white text-xs animate-pulse">
                LIVE
              </Badge>
            )}
            <Badge className={`text-xs ${getEventTypeColor()}`}>
              {event.type}
            </Badge>
          </div>

          {/* Price */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 dark:bg-[#111111]/90 text-slate-900 dark:text-white font-semibold">
              {event.price === "free" ? "Free" : `$${event.price}`}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-4">
        {/* Date & Category */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{event.category}</Badge>
          <span className="text-sm text-violet-600 font-medium">
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Title */}
        <Link href={`/events/${event.id}`}>
          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 hover:text-violet-600 transition-colors mb-2">
            {event.title}
          </h3>
        </Link>

        {/* Location & Time */}
        <div className="space-y-1 text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{event.time} • {event.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Capacity */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-slate-500">
              {event.registered.toLocaleString()} / {event.capacity.toLocaleString()} registered
            </span>
            {isAlmostFull && (
              <span className="text-amber-600 font-medium">Almost full!</span>
            )}
            {isSoldOut && (
              <span className="text-red-600 font-medium">Sold out</span>
            )}
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-[#111111] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                isSoldOut ? "bg-red-500" : isAlmostFull ? "bg-amber-500" : "bg-violet-600"
              }`}
              style={{ width: `${Math.min(100, (event.registered / event.capacity) * 100)}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#1F1F1F]">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#111111] text-slate-400 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#111111] text-slate-400 hover:text-[#8B5DFF] transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          <Button
            size="sm"
            disabled={isSoldOut}
            className={isSoldOut ? "opacity-50" : "bg-violet-600 hover:bg-violet-700"}
          >
            <Ticket className="w-4 h-4 mr-1" />
            {isSoldOut ? "Sold Out" : "Register"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ============ MAIN PAGE ============
export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [selectedType, setSelectedType] = useState("all");

  const featuredEvents = mockEvents.filter((e) => e.isFeatured);
  const liveEvents = mockEvents.filter((e) => e.isLive);
  const upcomingEvents = mockEvents.filter((e) => {
    if (selectedCategory !== "All Events" && e.category !== selectedCategory) {
      return false;
    }
    if (selectedType !== "all" && e.type !== selectedType) {
      return false;
    }
    if (searchQuery && !e.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-[#8B5DFF] from-violet-600 via-violet-700 to-fuchsia-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Design Events & Meetups
              </h1>
              <p className="text-violet-200">
                Connect, learn, and grow with the design community
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, workshops, conferences..."
              className="pl-12 py-6 text-lg bg-white text-slate-900 border-0"
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6 mt-8">
            {[
              { label: "Events This Month", value: "45+", icon: Calendar },
              { label: "Community Members", value: "50K+", icon: Users },
              { label: "Cities", value: "120+", icon: Globe },
              { label: "Workshops Hosted", value: "500+", icon: BookOpen },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-violet-300" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-violet-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Now Banner */}
      {liveEvents[0] && (
        <section className="bg-red-500 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 font-semibold">
                  <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  LIVE NOW
                </span>
                <span className="text-red-100">•</span>
                <span>{liveEvents[0]?.title}</span>
              </div>
              <Link href={`/events/${liveEvents[0]?.id}`}>
                <Button size="sm" className="bg-white text-red-500 hover:bg-red-50">
                  Join Now
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-12 bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#1F1F1F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                Featured Events
              </h2>
              <Link href="/events?featured=true">
                <Button variant="ghost">View All</Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredEvents.slice(0, 2).map((event) => (
                <EventCard key={event.id} event={event} size="large" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#1F1F1F] sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {eventCategories.map((cat) => (
                <Button
                  key={cat.name}
                  variant={selectedCategory === cat.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex-shrink-0 ${
                    selectedCategory === cat.name ? "bg-violet-600 hover:bg-violet-700" : ""
                  }`}
                >
                  <cat.icon className="w-4 h-4 mr-2" />
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 text-sm border border-slate-200 dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#111111]"
              >
                <option value="all">All Types</option>
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Upcoming Events
            </h2>
            <span className="text-sm text-slate-500">
              {upcomingEvents.length} events found
            </span>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No events found
              </h3>
              <p className="text-slate-500">Try adjusting your filters</p>
            </div>
          )}

          {/* Load More */}
          {upcomingEvents.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Events
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Host Your Event CTA */}
      <section className="py-16 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Host Your Own Event</h2>
          <p className="text-xl text-violet-100 mb-8">
            Share your knowledge with the community. Host workshops, webinars, or meetups
            and reach thousands of designers worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/events/create">
              <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50">
                <Mic className="w-5 h-5 mr-2" />
                Create Event
              </Button>
            </Link>
            <Link href="/events/hosting-guide">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
