"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye, Play, ChevronLeft, ChevronRight, Flame } from "lucide-react";

interface FeaturedProject {
  id: string;
  title: string;
  coverImage: string;
  creator: {
    name: string;
    avatar: string;
    username: string;
  };
  likes: number;
  views: number;
  category: string;
  isTrending: boolean;
  isVideo: boolean;
}

const featuredProjects: FeaturedProject[] = [
  {
    id: "1",
    title: "Modern Banking App UI",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    creator: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah", username: "sarahchen" },
    likes: 2453,
    views: 45200,
    category: "UI/UX",
    isTrending: true,
    isVideo: false,
  },
  {
    id: "2",
    title: "3D Character Design",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    creator: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/150?u=alex", username: "alexrivera" },
    likes: 1892,
    views: 32100,
    category: "3D",
    isTrending: true,
    isVideo: true,
  },
  {
    id: "3",
    title: "Brand Identity System",
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    creator: { name: "Maya Johnson", avatar: "https://i.pravatar.cc/150?u=maya", username: "mayaj" },
    likes: 3201,
    views: 56400,
    category: "Branding",
    isTrending: true,
    isVideo: false,
  },
  {
    id: "4",
    title: "Illustration Series",
    coverImage: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800",
    creator: { name: "Tom Wilson", avatar: "https://i.pravatar.cc/150?u=tom", username: "tomw" },
    likes: 1567,
    views: 28900,
    category: "Illustration",
    isTrending: false,
    isVideo: false,
  },
  {
    id: "5",
    title: "E-commerce Website Design",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    creator: { name: "Lisa Park", avatar: "https://i.pravatar.cc/150?u=lisa", username: "lisapark" },
    likes: 2789,
    views: 41300,
    category: "Web Design",
    isTrending: true,
    isVideo: false,
  },
  {
    id: "6",
    title: "Motion Graphics Reel",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800",
    creator: { name: "James Lee", avatar: "https://i.pravatar.cc/150?u=james", username: "jameslee" },
    likes: 4102,
    views: 72500,
    category: "Motion",
    isTrending: true,
    isVideo: true,
  },
];

const categories = ["All", "UI/UX", "Illustration", "3D", "Branding", "Web Design", "Motion", "Typography"];

export default function FeaturedWorkSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredProjects = activeCategory === "All"
    ? featuredProjects
    : featuredProjects.filter((p) => p.category === activeCategory);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => scrollContainer.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover the most inspiring designs from our community of talented creators
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative group">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-80 snap-start"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Link href={`/project/${project.id}`}>
                  <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 group/card">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                      />
                      
                      {/* Video Indicator */}
                      {project.isVideo && (
                        <div className="absolute bottom-3 right-3 p-2 bg-black/50 rounded-full backdrop-blur-sm">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      )}

                      {/* Trending Badge */}
                      {project.isTrending && (
                        <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                          <Flame className="w-3 h-3" />
                          Trending
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4"
                      >
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-4 text-white/80 text-sm">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {project.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {project.views.toLocaleString()}
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-4 flex items-center gap-3">
                      <img
                        src={project.creator.avatar}
                        alt={project.creator.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-500/20"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-900 dark:text-white truncate">
                          {project.creator.name}
                        </h4>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          @{project.creator.username}
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/explore">
            <button className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-violet-600/30 inline-flex items-center gap-2">
              View All Projects
              <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
