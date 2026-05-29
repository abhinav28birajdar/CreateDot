"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Eye, MessageSquare, Bookmark, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DesignCard } from '@/lib/types';

interface DesignFeedProps {
  initialDesigns?: DesignCard[];
  isLoading?: boolean;
  filter?: string;
}

export function DesignFeed({ 
  initialDesigns = [], 
  isLoading = false,
  filter = 'trending'
}: DesignFeedProps) {
  const [designs, setDesigns] = useState<DesignCard[]>(initialDesigns);
  const [loading, setLoading] = useState(isLoading);

  // Mock fetch more designs for demo
  const fetchMoreDesigns = () => {
    setLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      // Mock design data
      const newDesigns: DesignCard[] = [
        {
          id: `design-${Date.now()}-1`,
          title: 'Modern Logo Design',
          imageUrl: 'https://source.unsplash.com/random/800x600/?logo',
          author: {
            id: 'user-1',
            name: 'Alex Johnson',
            avatarUrl: 'https://source.unsplash.com/random/100x100/?portrait&sig=1',
          },
          likes: 42,
          views: 256,
          category: 'Logo Design',
          tags: ['minimal', 'modern', 'brand'],
          createdAt: new Date().toISOString(),
        },
        {
          id: `design-${Date.now()}-2`,
          title: 'Social Media Campaign',
          imageUrl: 'https://source.unsplash.com/random/800x600/?social',
          author: {
            id: 'user-2',
            name: 'Sarah Parker',
            avatarUrl: 'https://source.unsplash.com/random/100x100/?portrait&sig=2',
          },
          likes: 68,
          views: 420,
          category: 'Social Media',
          tags: ['instagram', 'campaign', 'colorful'],
          createdAt: new Date().toISOString(),
        },
        {
          id: `design-${Date.now()}-3`,
          title: 'App UI Design System',
          imageUrl: 'https://source.unsplash.com/random/800x600/?ui',
          author: {
            id: 'user-3',
            name: 'Miguel Rodriguez',
            avatarUrl: 'https://source.unsplash.com/random/100x100/?portrait&sig=3',
          },
          likes: 103,
          views: 735,
          category: 'UI/UX',
          tags: ['mobile', 'app', 'interface'],
          createdAt: new Date().toISOString(),
        },
      ];
      
      setDesigns([...designs, ...newDesigns]);
      setLoading(false);
    }, 1000);
  };

  // Simulate initial load if no designs provided
  useEffect(() => {
    if (designs.length === 0) {
      fetchMoreDesigns();
    }
  }, []);

  // Function to format date to relative time (e.g., "2 days ago")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Explore Designs</h2>
          <p className="text-gray-500">Discover amazing community designs</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={filter === 'trending' ? 'default' : 'outline'} 
            className={filter === 'trending' ? 'bg-[#8B5DFF]' : ''}
          >
            Trending
          </Button>
          <Button
            variant={filter === 'newest' ? 'default' : 'outline'}
            className={filter === 'newest' ? 'bg-[#8B5DFF]' : ''}
          >
            Newest
          </Button>
          <Button
            variant={filter === 'following' ? 'default' : 'outline'}
            className={filter === 'following' ? 'bg-[#8B5DFF]' : ''}
          >
            Following
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <Card 
            key={design.id} 
            className="overflow-hidden group design-grid-item hover:shadow-xl transition-all duration-300"
          >
            <div className="relative">
              <Link href={`/designs/${design.id}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={design.imageUrl}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
              
              <div className="absolute inset-0 bg-[#8B5DFF] from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="space-y-1 text-white">
                  <h3 className="text-lg font-bold">{design.title}</h3>
                  <div className="flex space-x-2">
                    {design.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-white/10 text-white text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-4 pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={design.author.avatarUrl || '/placeholder-avatar.png'}
                    alt={design.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{design.author.name}</h4>
                    <p className="text-xs text-gray-500">{formatDate(design.createdAt)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-600 hover:text-[#8B5DFF]">
                    <Heart className="h-4 w-4 mr-1" />
                    {design.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-600">
                    <Eye className="h-4 w-4 mr-1" />
                    {design.views}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-600">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          onClick={fetchMoreDesigns} 
          disabled={loading}
          className="bg-[#8B5DFF] hover:bg-[#7B4DE5] text-white"
        >
          {loading ? 'Loading...' : 'Load More Designs'}
        </Button>
      </div>
    </div>
  );
}
