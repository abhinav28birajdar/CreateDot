"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Palette,
  Brush,
  Layout,
  Box,
  Camera,
  Film,
  Type,
  PenTool,
  Smartphone,
  Globe,
  Package,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: React.ElementType;
  image: string;
  projectCount: number;
  isTrending: boolean;
  growthPercent: number;
  color: string;
}

const categories: Category[] = [
  {
    id: "1",
    name: "UI/UX Design",
    slug: "ui-ux",
    icon: Layout,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    projectCount: 245000,
    isTrending: true,
    growthPercent: 23,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "2",
    name: "Graphic Design",
    slug: "graphic-design",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
    projectCount: 189000,
    isTrending: false,
    growthPercent: 12,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "3",
    name: "Illustration",
    slug: "illustration",
    icon: PenTool,
    image: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400",
    projectCount: 167000,
    isTrending: true,
    growthPercent: 31,
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "4",
    name: "3D Design",
    slug: "3d",
    icon: Box,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
    projectCount: 98000,
    isTrending: true,
    growthPercent: 45,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "5",
    name: "Web Design",
    slug: "web-design",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    projectCount: 156000,
    isTrending: false,
    growthPercent: 18,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "6",
    name: "Mobile Design",
    slug: "mobile",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    projectCount: 134000,
    isTrending: true,
    growthPercent: 28,
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "7",
    name: "Motion Design",
    slug: "motion",
    icon: Film,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
    projectCount: 78000,
    isTrending: true,
    growthPercent: 52,
    color: "from-red-500 to-pink-500",
  },
  {
    id: "8",
    name: "Brand Identity",
    slug: "branding",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400",
    projectCount: 112000,
    isTrending: false,
    growthPercent: 15,
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "9",
    name: "Typography",
    slug: "typography",
    icon: Type,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
    projectCount: 56000,
    isTrending: false,
    growthPercent: 8,
    color: "from-slate-600 to-slate-800",
  },
  {
    id: "10",
    name: "Photography",
    slug: "photography",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=400",
    projectCount: 203000,
    isTrending: false,
    growthPercent: 10,
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: "11",
    name: "Packaging",
    slug: "packaging",
    icon: Package,
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400",
    projectCount: 45000,
    isTrending: false,
    growthPercent: 14,
    color: "from-lime-500 to-green-500",
  },
  {
    id: "12",
    name: "Art Direction",
    slug: "art-direction",
    icon: Brush,
    image: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=400",
    projectCount: 67000,
    isTrending: false,
    growthPercent: 11,
    color: "from-fuchsia-500 to-purple-500",
  },
];

const formatCount = (count: number) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(0) + "K+";
  }
  return count.toString();
};

export default function CategoryShowcaseSection() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover amazing work across all creative disciplines
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link href={`/explore?category=${category.slug}`}>
                <div className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] shadow-lg hover:shadow-2xl transition-all">
                  {/* Background Image */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-80 transition-opacity`}
                  />

                  {/* Trending Badge */}
                  {category.isTrending && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                      <TrendingUp className="w-3 h-3" />
                      +{category.growthPercent}%
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        scale: hoveredCategory === category.id ? 1.2 : 1,
                        y: hoveredCategory === category.id ? -10 : 0,
                      }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3"
                    >
                      <category.icon className="w-5 h-5 text-white" />
                    </motion.div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-white mb-1">
                      {category.name}
                    </h3>

                    {/* Project Count */}
                    <p className="text-white/80 text-sm">
                      {formatCount(category.projectCount)} projects
                    </p>

                    {/* Hover Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: hoveredCategory === category.id ? 1 : 0,
                        x: hoveredCategory === category.id ? 0 : -10,
                      }}
                      className="absolute bottom-4 right-4"
                    >
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-slate-900" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold hover:underline"
          >
            View all categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
