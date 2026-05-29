"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Plus, 
  Heart, 
  Eye, 
  ChevronRight, 
  Sparkles,
  Users,
  Star,
  Calendar,
  Award,
  Palette,
  Monitor,
  Smartphone,
  Camera,
  Brush,
  Type,
  Layout,
  Play,
  Shirt,
  Package,
  Home,
  Gamepad2
} from 'lucide-react'

// Design categories with icons and trending designs
const designCategories = [
  {
    id: 'branding',
    name: 'Branding',
    icon: Palette,
    color: '',
    count: 1340,
    trending: [
      { id: 1, title: 'Coffee Brand Identity', image: '/api/placeholder/300/200', likes: 234 },
      { id: 2, title: 'Tech Startup Logo', image: '/api/placeholder/300/200', likes: 189 },
      { id: 3, title: 'Fashion Brand Guide', image: '/api/placeholder/300/200', likes: 156 }
    ]
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    icon: Brush,
    color: 'to-cyan-500',
    count: 2100,
    trending: [
      { id: 4, title: 'Event Poster Design', image: '/api/placeholder/300/200', likes: 312 },
      { id: 5, title: 'Magazine Layout', image: '/api/placeholder/300/200', likes: 278 },
      { id: 6, title: 'Business Card Set', image: '/api/placeholder/300/200', likes: 198 }
    ]
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: Camera,
    color: '',
    count: 2890,
    trending: [
      { id: 7, title: 'Portrait Photography', image: '/api/placeholder/300/200', likes: 445 },
      { id: 8, title: 'Street Photography', image: '/api/placeholder/300/200', likes: 367 },
      { id: 9, title: 'Product Photography', image: '/api/placeholder/300/200', likes: 289 }
    ]
  },
  {
    id: 'illustration',
    name: 'Illustration',
    icon: Sparkles,
    color: 'from-orange-500 to-red-500',
    count: 1780,
    trending: [
      { id: 10, title: 'Digital Art Portrait', image: '/api/placeholder/300/200', likes: 523 },
      { id: 11, title: 'Character Design', image: '/api/placeholder/300/200', likes: 456 },
      { id: 12, title: 'Book Illustration', image: '/api/placeholder/300/200', likes: 334 }
    ]
  },
  {
    id: '3d-art',
    name: '3D Art',
    icon: Package,
    color: 'from-violet-500 to-purple-500',
    count: 890,
    trending: [
      { id: 13, title: '3D Character Model', image: '/api/placeholder/300/200', likes: 298 },
      { id: 14, title: 'Product Visualization', image: '/api/placeholder/300/200', likes: 234 },
      { id: 15, title: 'Abstract 3D Art', image: '/api/placeholder/300/200', likes: 187 }
    ]
  },
  {
    id: 'ui-ux',
    name: 'UI/UX',
    icon: Monitor,
    color: 'from-indigo-500 ',
    count: 2340,
    trending: [
      { id: 16, title: 'Mobile App Design', image: '/api/placeholder/300/200', likes: 567 },
      { id: 17, title: 'Dashboard Interface', image: '/api/placeholder/300/200', likes: 445 },
      { id: 18, title: 'Website Redesign', image: '/api/placeholder/300/200', likes: 389 }
    ]
  },
  {
    id: 'motion',
    name: 'Motion Graphics',
    icon: Play,
    color: 'from-pink-500 to-rose-500',
    count: 670,
    trending: [
      { id: 19, title: 'Logo Animation', image: '/api/placeholder/300/200', likes: 234 },
      { id: 20, title: 'UI Transitions', image: '/api/placeholder/300/200', likes: 198 },
      { id: 21, title: 'Explainer Video', image: '/api/placeholder/300/200', likes: 167 }
    ]
  },
  {
    id: 'product-design',
    name: 'Product Design',
    icon: Package,
    color: 'from-teal-500 ',
    count: 560,
    trending: [
      { id: 22, title: 'Smart Watch Design', image: '/api/placeholder/300/200', likes: 345 },
      { id: 23, title: 'Furniture Design', image: '/api/placeholder/300/200', likes: 267 },
      { id: 24, title: 'Packaging Design', image: '/api/placeholder/300/200', likes: 234 }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion Design',
    icon: Shirt,
    color: 'from-rose-500 ',
    count: 430,
    trending: [
      { id: 25, title: 'Streetwear Collection', image: '/api/placeholder/300/200', likes: 289 },
      { id: 26, title: 'Luxury Dress Design', image: '/api/placeholder/300/200', likes: 234 },
      { id: 27, title: 'Sneaker Design', image: '/api/placeholder/300/200', likes: 198 }
    ]
  }
]

// Quick stats data
const quickStats = [
  { label: 'Designs Uploaded', value: '12,345', icon: Sparkles, change: '+12%' },
  { label: 'Total Views', value: '1.2M', icon: Eye, change: '+8%' },
  { label: 'Community Members', value: '45K', icon: Users, change: '+15%' },
  { label: 'Pro Designers', value: '2.3K', icon: Star, change: '+5%' }
]

interface CategoryCarouselProps {
  category: typeof designCategories[0]
}

function CategoryCarousel({ category }: CategoryCarouselProps) {
  const Icon = category.icon
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % category.trending.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [category.trending.length])

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-64">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-[#8B5DFF] ${category.color} opacity-10`} />
        
        {/* Header */}
        <div className="relative p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg bg-[#8B5DFF] ${category.color} text-white`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.count.toLocaleString()} designs</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>

        {/* Trending designs carousel */}
        <div className="relative h-32 mx-6 mb-6">
          <div className="overflow-hidden rounded-lg h-full">
            <div 
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {category.trending.map((design, index) => (
                <div key={design.id} className="min-w-full h-full relative">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#8B5DFF] from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="font-semibold text-white text-sm line-clamp-1">
                      {design.title}
                    </h4>
                    <div className="flex items-center space-x-1 mt-1">
                      <Heart className="h-3 w-3 text-white" />
                      <span className="text-xs text-white">{design.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {category.trending.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#8B5DFF] from-gray-50 to-gray-100/50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, <span className="designly-text-gradient">Designer!</span>
              </h1>
              <p className="text-lg text-gray-600">
                Discover trending designs and get inspired by the community
              </p>
            </div>
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <Button className="bg-designly-purple-600 hover:bg-designly-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Design
              </Button>
              <Link href="/explore">
                <Button variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Explore Trending
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className="p-3 bg-designly-purple-100 rounded-lg">
                        <Icon className="h-5 w-5 text-designly-purple-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-3 w-3 text-[#8B5DFF] mr-1" />
                      <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                      <span className="text-xs text-gray-500 ml-1">vs last month</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Featured Categories Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Trending Design Categories
              </h2>
              <p className="text-gray-600">
                Explore the most popular design categories this week
              </p>
            </div>
            <Link href="/explore">
              <Button variant="ghost" className="text-designly-purple-600 hover:text-designly-purple-700">
                View All Categories
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Horizontally scrolling categories */}
          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
              {designCategories.map((category) => (
                <div key={category.id} className="flex-none w-80">
                  <Link href={`/explore?category=${category.id}`}>
                    <CategoryCarousel category={category} />
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Gradient fade on scroll */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-[#8B5DFF] from-gray-50 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <Button variant="ghost" className="text-designly-purple-600">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Popular This Week */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-designly-purple-600" />
                  <h3 className="font-semibold text-gray-900">Popular This Week</h3>
                </div>
                <div className="space-y-4">
                  {designCategories.slice(0, 4).map((category, index) => (
                    <div key={category.id} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-sm text-gray-600">{category.count.toLocaleString()} designs</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Uploads */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="h-5 w-5 text-designly-purple-600" />
                  <h3 className="font-semibold text-gray-900">Recent Uploads</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Modern Dashboard UI", category: "UI/UX", time: "2 hours ago" },
                    { title: "Coffee Shop Branding", category: "Branding", time: "4 hours ago" },
                    { title: "Street Photography", category: "Photography", time: "6 hours ago" },
                    { title: "Character Illustration", category: "Illustration", time: "8 hours ago" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.category} • {item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
