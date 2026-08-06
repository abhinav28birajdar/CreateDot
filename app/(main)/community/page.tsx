import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageSquare, Users, Calendar, TrendingUp, Star } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with real Supabase queries
const featuredCreators = [
  {
    id: '1',
    username: 'alexdesigner',
    display_name: 'Alex Johnson',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followers_count: 12500,
    designs_count: 89,
    is_verified: true,
    specialty: 'UI/UX Design'
  },
  {
    id: '2', 
    username: 'sarah_creative',
    display_name: 'Sarah Wilson',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    followers_count: 8900,
    designs_count: 156,
    is_verified: true,
    specialty: 'Brand Identity'
  },
  {
    id: '3',
    username: 'mike_illustrations',
    display_name: 'Mike Chen',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    followers_count: 15200,
    designs_count: 234,
    is_verified: true,
    specialty: 'Illustration'
  }
];

const trendingDesigns = [
  {
    id: '1',
    title: 'Modern Banking App UI',
    cover_image_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
    likes_count: 342,
    views_count: 1200,
    creator: featuredCreators[0]
  },
  {
    id: '2',
    title: 'Minimalist Brand Identity',
    cover_image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    likes_count: 289,
    views_count: 980,
    creator: featuredCreators[1]
  },
  {
    id: '3',
    title: 'Character Design Collection',
    cover_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    likes_count: 567,
    views_count: 2100,
    creator: featuredCreators[2]
  }
];

const forumTopics = [
  {
    id: '1',
    title: 'Best practices for mobile UI design in 2024',
    author: 'designpro',
    replies_count: 23,
    last_activity: '2 hours ago',
    category: 'UI/UX'
  },
  {
    id: '2',
    title: 'How to price your design services as a freelancer',
    author: 'freelancer_tips',
    replies_count: 45,
    last_activity: '4 hours ago',
    category: 'Business'
  },
  {
    id: '3',
    title: 'Color theory fundamentals every designer should know',
    author: 'color_master',
    replies_count: 67,
    last_activity: '1 day ago',
    category: 'Theory'
  }
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Design Thinking Workshop',
    date: '2024-01-15',
    time: '2:00 PM EST',
    attendees_count: 156,
    type: 'Workshop'
  },
  {
    id: '2',
    title: 'AI in Design: Future Trends',
    date: '2024-01-20',
    time: '7:00 PM EST',
    attendees_count: 289,
    type: 'Webinar'
  }
];

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CreateDOT Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow creators, discover inspiration, and grow together in our vibrant design community.
          </p>
        </div>

        {/* Featured Creators Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              Featured Creators
            </h2>
            <Link href="/explore/creators">
              <Button variant="outline">View All Creators</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCreators.map((creator) => (
              <Card key={creator.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={creator.avatar_url} alt={creator.display_name} />
                    <AvatarFallback>{creator.display_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-1">{creator.display_name}</h3>
                  <p className="text-gray-600 mb-2">@{creator.username}</p>
                  <Badge variant="secondary" className="mb-3">{creator.specialty}</Badge>
                  <div className="flex justify-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {creator.followers_count.toLocaleString()} followers
                    </span>
                    <span>{creator.designs_count} designs</span>
                  </div>
                  <Link href={`/users/${creator.username}`}>
                    <Button className="w-full">View Profile</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Designs Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="h-6 w-6 text-designly-purple-600 mr-2" />
              Trending This Week
            </h2>
            <Link href="/explore?sort=trending">
              <Button variant="outline">View All Trending</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingDesigns.map((design) => (
              <Card key={design.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200">
                  <img 
                    src={design.cover_image_url} 
                    alt={design.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{design.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {design.likes_count}
                      </span>
                      <span>{design.views_count} views</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      {design.creator?.avatar_url ? (
                        <AvatarImage src={design.creator.avatar_url} alt={design.creator.display_name ?? design.title} />
                      ) : (
                        <AvatarFallback>{design.creator?.display_name?.[0] ?? "?"}</AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-sm font-medium">{design.creator?.display_name ?? "Unknown"}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Activity Tabs */}
        <section className="mb-12">
          <Tabs defaultValue="forum" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="forum">Forum Discussions</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              <TabsTrigger value="activity">Live Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="forum" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Latest Forum Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {forumTopics.map((topic) => (
                      <div key={topic.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{topic.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>by @{topic.author}</span>
                              <Badge variant="outline">{topic.category}</Badge>
                              <span>{topic.replies_count} replies</span>
                              <span>{topic.last_activity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link href="/forum">
                      <Button>Join the Discussion</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <span>{event.date}</span>
                              <span>{event.time}</span>
                              <Badge variant="secondary">{event.type}</Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {event.attendees_count} people attending
                            </p>
                          </div>
                          <Button size="sm">RSVP</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link href="/events">
                      <Button>View All Events</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Activity Feed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <Avatar className="h-8 w-8">
                        {featuredCreators?.[0]?.avatar_url ? (
                          <AvatarImage src={featuredCreators?.[0]?.avatar_url ?? ""} alt={featuredCreators?.[0]?.display_name ?? ""} />
                        ) : (
                          <AvatarFallback>{featuredCreators?.[0]?.display_name?.split(" ").map(n=>n[0]).join("") ?? "AJ"}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <span className="font-medium">Alex Johnson</span> uploaded a new design "Mobile Banking Interface"
                        <span className="text-gray-500 ml-2">2 minutes ago</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Avatar className="h-8 w-8">
                        {featuredCreators?.[1]?.avatar_url ? (
                          <AvatarImage src={featuredCreators?.[1]?.avatar_url ?? ""} alt={featuredCreators?.[1]?.display_name ?? ""} />
                        ) : (
                          <AvatarFallback>{featuredCreators?.[1]?.display_name?.split(" ").map(n=>n[0]).join("") ?? "SW"}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <span className="font-medium">Sarah Wilson</span> liked a design by Mike Chen
                        <span className="text-gray-500 ml-2">5 minutes ago</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Avatar className="h-8 w-8">
                        {featuredCreators?.[2]?.avatar_url ? (
                          <AvatarImage src={featuredCreators?.[2]?.avatar_url ?? ""} alt={featuredCreators?.[2]?.display_name ?? ""} />
                        ) : (
                          <AvatarFallback>{featuredCreators?.[2]?.display_name?.split(" ").map(n=>n[0]).join("") ?? "MC"}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <span className="font-medium">Mike Chen</span> started following 3 new creators
                        <span className="text-gray-500 ml-2">12 minutes ago</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Community Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-designly-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Creators</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-designly-purple-600 mb-2">2M+</div>
              <div className="text-gray-600">Designs Shared</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-designly-purple-600 mb-2">500K+</div>
              <div className="text-gray-600">Community Interactions</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-designly-purple-600 mb-2">150+</div>
              <div className="text-gray-600">Countries Represented</div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default CommunityPage;
