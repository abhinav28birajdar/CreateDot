"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  Briefcase,
  TrendingUp,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  title: string;
  location: string;
  followers: number;
  followerGrowth: number;
  isAvailable: boolean;
  isVerified: boolean;
  isPro: boolean;
  topProjects: string[];
}

const featuredCreators: Creator[] = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahchen",
    avatar: "https://i.pravatar.cc/300?u=sarah",
    title: "Senior Product Designer",
    location: "San Francisco, CA",
    followers: 45200,
    followerGrowth: 12.5,
    isAvailable: true,
    isVerified: true,
    isPro: true,
    topProjects: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200",
    ],
  },
  {
    id: "2",
    name: "Alex Rivera",
    username: "alexrivera",
    avatar: "https://i.pravatar.cc/300?u=alex",
    title: "3D Artist & Animator",
    location: "Los Angeles, CA",
    followers: 32100,
    followerGrowth: 8.3,
    isAvailable: false,
    isVerified: true,
    isPro: true,
    topProjects: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
      "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=200",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200",
    ],
  },
  {
    id: "3",
    name: "Maya Johnson",
    username: "mayaj",
    avatar: "https://i.pravatar.cc/300?u=maya",
    title: "Brand Identity Designer",
    location: "New York, NY",
    followers: 56400,
    followerGrowth: 15.2,
    isAvailable: true,
    isVerified: true,
    isPro: true,
    topProjects: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
    ],
  },
  {
    id: "4",
    name: "Tom Wilson",
    username: "tomw",
    avatar: "https://i.pravatar.cc/300?u=tom",
    title: "Illustrator & Visual Artist",
    location: "London, UK",
    followers: 28900,
    followerGrowth: 6.7,
    isAvailable: true,
    isVerified: false,
    isPro: false,
    topProjects: [
      "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=200",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200",
    ],
  },
  {
    id: "5",
    name: "Lisa Park",
    username: "lisapark",
    avatar: "https://i.pravatar.cc/300?u=lisa",
    title: "UI/UX Designer",
    location: "Seoul, South Korea",
    followers: 41300,
    followerGrowth: 11.8,
    isAvailable: true,
    isVerified: true,
    isPro: true,
    topProjects: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
    ],
  },
];

export default function CreatorSpotlightSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredCreators.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const goToNext = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev + 1) % featuredCreators.length);
  };

  const goToPrev = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev - 1 + featuredCreators.length) % featuredCreators.length);
  };

  const goToIndex = (index: number) => {
    setIsAutoRotating(false);
    setCurrentIndex(index);
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-violet-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Creator Spotlight
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Meet Our Featured Creators
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover talented designers, artists, and creators shaping the future of design
          </p>
        </motion.div>

        {/* Creator Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl hover:scale-110 transition-transform -translate-x-1/2 lg:translate-x-0"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl hover:scale-110 transition-transform translate-x-1/2 lg:translate-x-0"
          >
            <ChevronRight className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>

          {/* Creator Cards */}
          <div className="overflow-hidden mx-8 lg:mx-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Creator Info */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-start gap-6 mb-8">
                      {/* Animated Avatar */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                      >
                        <img
                          src={featuredCreators[currentIndex].avatar}
                          alt={featuredCreators[currentIndex].name}
                          className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover ring-4 ring-violet-500/20"
                        />
                        {featuredCreators[currentIndex].isAvailable && (
                          <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
                            Available
                          </span>
                        )}
                        {featuredCreators[currentIndex].isPro && (
                          <span className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                            PRO
                          </span>
                        )}
                      </motion.div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                            {featuredCreators[currentIndex].name}
                          </h3>
                          {featuredCreators[currentIndex].isVerified && (
                            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          )}
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                          @{featuredCreators[currentIndex].username}
                        </p>
                        <p className="text-lg text-violet-600 dark:text-violet-400 font-medium">
                          {featuredCreators[currentIndex].title}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 mb-8">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <MapPin className="w-5 h-5" />
                        <span>{featuredCreators[currentIndex].location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Users className="w-5 h-5" />
                        <span>
                          <strong className="text-slate-900 dark:text-white">
                            {formatFollowers(featuredCreators[currentIndex].followers)}
                          </strong>{" "}
                          followers
                        </span>
                        <span className="flex items-center gap-1 text-green-500 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          +{featuredCreators[currentIndex].followerGrowth}%
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold">
                        <Users className="w-5 h-5 mr-2" />
                        Follow
                      </Button>
                      {featuredCreators[currentIndex].isAvailable && (
                        <Button
                          variant="outline"
                          className="border-2 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 px-6 py-3 rounded-xl font-semibold"
                        >
                          <Briefcase className="w-5 h-5 mr-2" />
                          Hire Me
                        </Button>
                      )}
                      <Link href={`/u/${featuredCreators[currentIndex].username}`}>
                        <Button
                          variant="ghost"
                          className="text-slate-600 dark:text-slate-400 hover:text-violet-600 px-6 py-3 rounded-xl font-semibold"
                        >
                          View Profile →
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Top Projects Grid */}
                  <div className="relative p-4 lg:p-8 bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30">
                    <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-4">
                      Top Projects
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {featuredCreators[currentIndex].topProjects.map((project, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer hover:scale-105 ${
                            i === 0 ? "row-span-2 col-span-2" : ""
                          }`}
                        >
                          <img
                            src={project}
                            alt={`Project ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {featuredCreators.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-violet-600 w-8"
                    : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
