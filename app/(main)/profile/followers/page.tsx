"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  UserPlus, 
  UserMinus, 
  Search, 
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';

const mockFollowers = [
  {
    id: '1',
    username: 'designlover',
    fullName: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    bio: 'Graphic designer with passion for minimalism',
    followersCount: 2340,
    isFollowing: true,
    isFollowingYou: true
  },
  {
    id: '2',
    username: 'creativemind',
    fullName: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    bio: 'UI/UX Designer at TechCorp',
    followersCount: 1890,
    isFollowing: false,
    isFollowingYou: true
  },
  {
    id: '3',
    username: 'artistica',
    fullName: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    bio: 'Digital artist and illustrator',
    followersCount: 5600,
    isFollowing: true,
    isFollowingYou: true
  },
  {
    id: '4',
    username: 'webwizard',
    fullName: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    bio: 'Full-stack designer & developer',
    followersCount: 3240,
    isFollowing: false,
    isFollowingYou: true
  },
  {
    id: '5',
    username: 'pixelperfect',
    fullName: 'Anna Wilson',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    bio: 'Brand designer specializing in startups',
    followersCount: 1560,
    isFollowing: true,
    isFollowingYou: true
  }
];

export default function FollowersPage() {
  const [followers, setFollowers] = useState(mockFollowers);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('followers');

  const filteredFollowers = followers.filter(follower =>
    follower.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    follower.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollowToggle = (userId: string) => {
    setFollowers(prev =>
      prev.map(follower =>
        follower.id === userId
          ? { ...follower, isFollowing: !follower.isFollowing }
          : follower
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/profile">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Connections</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'followers', label: 'Followers', count: 1234 },
                { id: 'following', label: 'Following', count: 567 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-[#8B5DFF] text-[#8B5DFF]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <Badge variant="secondary" className="ml-2">
                    {tab.count.toLocaleString()}
                  </Badge>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Followers List */}
        <div className="space-y-4">
          {filteredFollowers.map((follower) => (
            <Card key={follower.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Link href={`/profile/${follower.username}`}>
                      <img
                        src={follower.avatar}
                        alt={follower.fullName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/profile/${follower.username}`}
                          className="font-semibold text-gray-900 hover:text-[#8B5DFF]"
                        >
                          {follower.fullName}
                        </Link>
                        {follower.isFollowingYou && (
                          <Badge variant="secondary" className="text-xs">
                            Follows you
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">@{follower.username}</p>
                      {follower.bio && (
                        <p className="text-gray-600 text-sm mt-1">{follower.bio}</p>
                      )}
                      <p className="text-gray-400 text-xs mt-1">
                        {follower.followersCount.toLocaleString()} followers
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link href={`/messages?user=${follower.id}`}>
                        <MessageCircle className="h-4 w-4" />
                      </Link>
                    </Button>
                    
                    <Button
                      onClick={() => handleFollowToggle(follower.id)}
                      size="sm"
                      className={
                        follower.isFollowing
                          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          : 'bg-[#8B5DFF] text-white hover:bg-blue-700'
                      }
                    >
                      {follower.isFollowing ? (
                        <>
                          <UserMinus className="h-4 w-4 mr-1" />
                          Unfollow
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4 mr-1" />
                          Follow
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredFollowers.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchQuery ? 'No results found' : `No ${activeTab} yet`}
                </h3>
                <p className="text-gray-500">
                  {searchQuery
                    ? 'Try adjusting your search terms'
                    : `Start connecting with other designers to see them here.`
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
