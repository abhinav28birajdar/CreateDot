"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play, ChevronLeft, ChevronRight, Quote, TrendingUp } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  companyLogo?: string;
  type: "creator" | "client";
  quote: string;
  rating: number;
  stats?: {
    label: string;
    before: string;
    after: string;
  };
  hasVideo: boolean;
  videoUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=testimonial1",
    role: "Senior Product Designer",
    company: "Airbnb",
    type: "creator",
    quote: "DesignDot completely transformed my career. Within 6 months of joining, I landed my dream job at Airbnb. The exposure and networking opportunities are unmatched.",
    rating: 5,
    stats: {
      label: "Follower Growth",
      before: "500",
      after: "45K",
    },
    hasVideo: true,
    videoUrl: "/videos/testimonial-1.mp4",
  },
  {
    id: "2",
    name: "Michael Torres",
    avatar: "https://i.pravatar.cc/150?u=testimonial2",
    role: "Design Director",
    company: "Stripe",
    type: "client",
    quote: "We've hired 12 designers through DesignDot in the past year. The quality of talent and the ease of finding the right fit has been exceptional. It's our go-to platform.",
    rating: 5,
    hasVideo: false,
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?u=testimonial3",
    role: "Freelance Illustrator",
    company: "Self-employed",
    type: "creator",
    quote: "I went from struggling to find clients to being fully booked 3 months in advance. The platform's algorithm really helps talented creators get discovered.",
    rating: 5,
    stats: {
      label: "Monthly Revenue",
      before: "$2K",
      after: "$18K",
    },
    hasVideo: true,
    videoUrl: "/videos/testimonial-2.mp4",
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "https://i.pravatar.cc/150?u=testimonial4",
    role: "Head of Product",
    company: "Notion",
    type: "client",
    quote: "The portfolio quality on DesignDot is outstanding. We can easily find designers who match our aesthetic and culture. It's streamlined our entire hiring process.",
    rating: 5,
    hasVideo: false,
  },
  {
    id: "5",
    name: "Lisa Park",
    avatar: "https://i.pravatar.cc/150?u=testimonial5",
    role: "Brand Designer",
    company: "Figma",
    type: "creator",
    quote: "The community here is incredibly supportive. I've learned so much from other designers and made connections that led to amazing collaborations.",
    rating: 5,
    stats: {
      label: "Project Views",
      before: "1K",
      after: "500K",
    },
    hasVideo: true,
    videoUrl: "/videos/testimonial-3.mp4",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (isVideoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-white dark:bg-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-[#8B5DFF] rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Loved by Creators & Companies
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            See how DesignDot is helping designers and businesses succeed
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-[#111111] rounded-full shadow-xl hover:scale-110 transition-transform -translate-x-1/2"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-[#111111] rounded-full shadow-xl hover:scale-110 transition-transform translate-x-1/2"
          >
            <ChevronRight className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="bg-[#8B5DFF] from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100 dark:border-[#2A2A2A]"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="w-24 h-24 text-violet-600" />
              </div>

              {/* User Type Badge */}
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-6 ${
                  current.type === "creator"
                    ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                    : "bg-blue-100 dark:bg-blue-900/30 text-[#8B5DFF] dark:text-[#8B5DFF]"
                }`}
              >
                {current.type === "creator" ? "Creator Story" : "Client Testimonial"}
              </span>

              {/* Quote */}
              <blockquote className="text-2xl lg:text-3xl text-slate-900 dark:text-white font-medium leading-relaxed mb-8">
                "{current.quote}"
              </blockquote>

              {/* Stats (if available) */}
              {current.stats && (
                <div className="flex items-center gap-8 mb-8 p-4 bg-[#8B5DFF] from-violet-500/10 to-fuchsia-500/10 rounded-xl border border-violet-200 dark:border-violet-800">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {current.stats.label}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 line-through">
                      {current.stats.before}
                    </span>
                    <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                      →
                    </span>
                    <span className="text-2xl font-bold text-green-600 dark:text-[#8B5DFF]">
                      {current.stats.after}
                    </span>
                  </div>
                </div>
              )}

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-violet-500/20"
                    />
                    {current.hasVideo && (
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      >
                        <Play className="w-4 h-4 text-white fill-white" />
                      </button>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {current.name}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {current.role} at {current.company}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < current.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
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
