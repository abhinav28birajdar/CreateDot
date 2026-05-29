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

const mockFollowing = [
  {
    id: '1',
    username: 'designguru',
    fullName: 'Jessica Martinez',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    bio: 'Senior Product Designer at Google',
    followersCount: 12340,
    isFollowingYou: true,
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    username: 'uxmaster',
    fullName: 'Robert Taylor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    bio: 'UX Researcher & Design Lead',
    followersCount: 8900,
    isFollowingYou: false,
    joinedDate: '2023-03-22'
  },
  {
    id: '3',
    username: 'creativestudio',
    fullName: 'Creative Studio Inc.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    bio: 'Award-winning design agency',
    followersCount: 25600,
    isFollowingYou: false,
    joinedDate: '2022-11-10'
  },
  {
    id: '4',
    username: 'minimalist',
    fullName: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    bio: 'Minimalist designer & photographer',
    followersCount: 4240,
    isFollowingYou: true,
    joinedDate: '2023-06-08'
  },
  {
    id: '5',
    username: 'brandexpert',
    fullName: 'Sophie Williams',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    bio: 'Brand strategist and visual identity designer',
    followersCount: 7560,
    isFollowingYou: true,
    joinedDate: '2023-02-14'
  }
];

export default function FollowingPage() {
  const [following, setFollowing] = useState(mockFollowing);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFollowing = following.filter(person =>
    person.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUnfollow = (userId: string) => {
    setFollowing(prev => prev.filter(person => person.id !== userId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/profile/followers">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Followers
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Following</h1>
            <Badge variant="secondary">
              {following.length} people
            </Badge>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search following..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Following List */}
        <div className="space-y-4">
          {filteredFollowing.map((person) => (
            <Card key={person.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Link href={`/profile/${person.username}`}>
                      <img
                        src={person.avatar}
                        alt={person.fullName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/profile/${person.username}`}
                          className="font-semibold text-gray-900 hover:text-[#8B5DFF]"
                        >
                          {person.fullName}
                        </Link>
                        {person.isFollowingYou && (
                          <Badge variant="secondary" className="text-xs">
                            Follows you
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">@{person.username}</p>
                      {person.bio && (
                        <p className="text-gray-600 text-sm mt-1">{person.bio}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-gray-400 text-xs">
                          {person.followersCount.toLocaleString()} followers
                        </p>
                        <p className="text-gray-400 text-xs">
                          Following since {new Date(person.joinedDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link href={`/messages?user=${person.id}`}>
                        <MessageCircle className="h-4 w-4" />
                      </Link>
                    </Button>
                    
                    <Button
                      onClick={() => handleUnfollow(person.id)}
                      size="sm"
                      variant="outline"
                      className="text-gray-600 hover:text-red-600 hover:border-red-600"
                    >
                      <UserMinus className="h-4 w-4 mr-1" />
                      Unfollow
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredFollowing.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchQuery ? 'No results found' : 'Not following anyone yet'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery
                    ? 'Try adjusting your search terms'
                    : 'Discover amazing designers and start following them to see their work.'
                  }
                </p>
                {!searchQuery && (
                  <Button asChild>
                    <Link href="/explore">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Discover Designers
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
