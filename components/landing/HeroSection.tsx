"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Play,
  Pause,
  ArrowRight,
  Sparkles,
  Users,
  Briefcase,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const rotatingTexts = [
  "Showcase",
  "Discover",
  "Get Hired",
  "Collaborate",
  "Inspire",
  "Create",
];

const stats = [
  { label: "Projects Uploaded", value: 2500000, suffix: "+" },
  { label: "Designers Hired", value: 150000, suffix: "+" },
  { label: "Revenue Earned", value: 45, prefix: "$", suffix: "M+" },
  { label: "Active Creators", value: 5000000, suffix: "+" },
];

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600"
      >
        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl"
          />
        </div>
      </motion.div>

      {/* Video Background Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>

      {/* Video Control */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-8 right-8 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
      >
        {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm mb-8"
        >
          <Users className="w-4 h-4" />
          <span>Join</span>
          <span className="font-bold">
            <AnimatedCounter value={5000000} suffix="+" />
          </span>
          <span>Creators Worldwide</span>
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </motion.div>

        {/* Main Headline with Typing Effect */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Where Creativity
          <br />
          <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Meets Opportunity
          </span>
        </motion.h1>

        {/* Rotating Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="h-10 mb-8 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-3xl text-white/80 font-light"
            >
              {rotatingTexts[currentTextIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link href="/get-started">
            <Button
              size="lg"
              className="bg-white text-violet-600 hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-xl shadow-2xl shadow-white/20 group"
            >
              Join Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/explore">
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
            >
              Explore Work
            </Button>
          </Link>
        </motion.div>

        {/* Stats Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="text-center p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/60"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Cursor Trail Effect */}
      <CursorTrail />
    </section>
  );
}

function CursorTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [
        ...prev.slice(-10),
        { x: e.clientX, y: e.clientY, id: idCounter++ },
      ]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden lg:block">
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-4 h-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
          style={{
            left: point.x - 8,
            top: point.y - 8,
          }}
        />
      ))}
    </div>
  );
}
