"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Bell, 
  Heart, 
  MessageCircle, 
  UserPlus, 
  Star, 
  Download,
  Share2,
  Settings,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  Search,
  Award,
  TrendingUp,
  Calendar,
  Gift,
  AlertCircle,
  Info,
  CheckCircle,
  X,
  MoreVertical,
  Volume2,
  VolumeX,
  Clock,
  Eye,
  EyeOff
} from 'lucide-react';

// Enhanced notification types
const mockNotifications = [
  {
    id: '1',
    type: 'like',
    title: 'Sarah liked your design',
    message: '"Modern Dashboard UI" received a new like',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face',
    timestamp: '2 minutes ago',
    isRead: false,
    isNew: true,
    priority: 'normal',
    actionUrl: '/design/123',
    category: 'engagement'
  },
  {
    id: '2',
    type: 'comment',
    title: 'New comment on your work',
    message: 'Mike commented: "Amazing color palette! How did you achieve this gradient effect?"',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    timestamp: '15 minutes ago',
    isRead: false,
    isNew: true,
    priority: 'high',
    actionUrl: '/design/123#comments',
    category: 'engagement'
  },
  {
    id: '3',
    type: 'follow',
    title: 'You have a new follower',
    message: 'Emily Rodriguez started following you',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    timestamp: '1 hour ago',
    isRead: true,
    isNew: false,
    priority: 'normal',
    actionUrl: '/profile/emily',
    category: 'social'
  },
  {
    id: '4',
    type: 'award',
    title: 'Achievement Unlocked!',
    message: 'You\'ve earned the "Rising Star" badge for reaching 1000 likes!',
    avatar: null,
    timestamp: '2 hours ago',
    isRead: false,
    isNew: true,
    priority: 'high',
    actionUrl: '/achievements',
    category: 'achievement'
  },
  {
    id: '5',
    type: 'trending',
    title: 'Your design is trending!',
    message: '"Mobile App Design" is now in the top 10 trending designs',
    avatar: null,
    timestamp: '3 hours ago',
    isRead: true,
    isNew: false,
    priority: 'high',
    actionUrl: '/trending',
    category: 'milestone'
  },
  {
    id: '6',
    type: 'message',
    title: 'New message from Alex',
    message: 'Hey! I\'d love to collaborate on a project with you...',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    timestamp: '4 hours ago',
    isRead: false,
    isNew: false,
    priority: 'normal',
    actionUrl: '/messages?user=alex',
    category: 'message'
  },
  {
    id: '7',
    type: 'download',
    title: 'Design Downloaded',
    message: 'Someone downloaded your "Logo Collection" template',
    avatar: null,
    timestamp: '6 hours ago',
    isRead: true,
    isNew: false,
    priority: 'low',
    actionUrl: '/analytics',
    category: 'activity'
  },
  {
    id: '8',
    type: 'system',
    title: 'Weekly Design Report',
    message: 'Your designs received 245 views and 67 likes this week!',
    avatar: null,
    timestamp: '1 day ago',
    isRead: true,
    isNew: false,
    priority: 'low',
    actionUrl: '/analytics/weekly',
    category: 'report'
  },
  {
    id: '9',
    type: 'promotion',
    title: 'Special Offer Available',
    message: 'Upgrade to Pro and get 50% off your first month!',
    avatar: null,
    timestamp: '2 days ago',
    isRead: false,
    isNew: false,
    priority: 'low',
    actionUrl: '/pricing',
    category: 'promotion'
  },
  {
    id: '10',
    type: 'reminder',
    title: 'Portfolio Update Reminder',
    message: 'It\'s been a while since you updated your portfolio. Add some new work!',
    avatar: null,
    timestamp: '3 days ago',
    isRead: true,
    isNew: false,
    priority: 'normal',
    actionUrl: '/share',
    category: 'reminder'
  }
];

const notificationIcons = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  share: Share2,
  download: Download,
  message: MessageCircle,
  system: Settings,
  award: Award,
  trending: TrendingUp,
  promotion: Gift,
  reminder: Clock
};

const priorityColors = {
  low: 'text-gray-500',
  normal: 'text-[#8B5DFF]',
  high: 'text-orange-500',
  urgent: 'text-red-500'
};

export default function EnhancedNotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [notificationSettings, setNotificationSettings] = useState({
    sound: true,
    desktop: true,
    email: true,
    push: true
  });

  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    let filtered = notifications;

    // Filter by tab
    switch (activeTab) {
      case 'unread':
        filtered = filtered.filter(n => !n.isRead);
        break;
      case 'mentions':
        filtered = filtered.filter(n => n.type === 'comment' || n.type === 'message');
        break;
      case 'updates':
        filtered = filtered.filter(n => n.type === 'system' || n.type === 'promotion');
        break;
      case 'engagement':
        filtered = filtered.filter(n => ['like', 'comment', 'follow', 'share'].includes(n.type));
        break;
      case 'achievements':
        filtered = filtered.filter(n => n.type === 'award' || n.type === 'trending');
        break;
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by priority
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(n => n.priority === selectedPriority);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(n => n.category === selectedCategory);
    }

    // Sort notifications
    switch (sortBy) {
      case 'oldest':
        filtered = [...filtered].reverse();
        break;
      case 'priority':
        filtered = [...filtered].sort((a, b) => {
          const priorityOrder: Record<string, number> = { urgent: 4, high: 3, normal: 2, low: 1 };
          return (priorityOrder[b.priority ?? 'normal'] ?? 0) - (priorityOrder[a.priority ?? 'normal'] ?? 0);
        });
        break;
      case 'unread':
        filtered = [...filtered].sort((a, b) => Number(!a.isRead) - Number(!b.isRead));
        break;
      default: // newest
        break;
    }

    return filtered;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true, isNew: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true, isNew: false }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.isRead));
  };

  const getNotificationIcon = (type: string) => {
    const Icon = (notificationIcons as Record<string, any>)[type] || Bell;
    return Icon;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = getFilteredNotifications();

  const tabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: unreadCount },
    { id: 'engagement', label: 'Engagement', count: notifications.filter(n => ['like', 'comment', 'follow', 'share'].includes(n.type)).length },
    { id: 'mentions', label: 'Mentions', count: notifications.filter(n => n.type === 'comment' || n.type === 'message').length },
    { id: 'achievements', label: 'Achievements', count: notifications.filter(n => n.type === 'award' || n.type === 'trending').length },
    { id: 'updates', label: 'Updates', count: notifications.filter(n => n.type === 'system' || n.type === 'promotion').length }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'social', label: 'Social' },
    { value: 'achievement', label: 'Achievements' },
    { value: 'milestone', label: 'Milestones' },
    { value: 'message', label: 'Messages' },
    { value: 'activity', label: 'Activity' },
    { value: 'report', label: 'Reports' },
    { value: 'promotion', label: 'Promotions' },
    { value: 'reminder', label: 'Reminders' }
  ];

  const priorities = [
    { value: 'all', label: 'All Priorities' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'normal', label: 'Normal' },
    { value: 'low', label: 'Low' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-8 w-8 text-gray-700" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" onClick={deleteAllRead}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Read
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#8B5DFF] focus:border-[#8B5DFF]"
                    >
                      {priorities.map(priority => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#8B5DFF] focus:border-[#8B5DFF]"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#8B5DFF] focus:border-[#8B5DFF]"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="priority">Priority</option>
                      <option value="unread">Unread First</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'sound', label: 'Sound', icon: notificationSettings.sound ? Volume2 : VolumeX },
                { key: 'desktop', label: 'Desktop', icon: notificationSettings.desktop ? Eye : EyeOff },
                { key: 'email', label: 'Email', icon: Bell },
                { key: 'push', label: 'Push', icon: Bell }
              ].map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={(notificationSettings as Record<string, boolean>)[key] ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNotificationSettings(prev => ({ ...prev, [key]: !(prev as Record<string, boolean>)[key] }))}
                  className="flex items-center justify-center"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#8B5DFF] text-[#8B5DFF]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <Badge variant="secondary" className="ml-2">
                    {tab.count}
                  </Badge>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  className={`transition-all hover:shadow-md cursor-pointer ${
                    !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'bg-white'
                  } ${notification.isNew ? 'ring-2 ring-blue-200' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Icon/Avatar */}
                      <div className="flex-shrink-0">
                        {notification.avatar ? (
                          <img
                            src={notification.avatar}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${(priorityColors as Record<string, string>)[notification.priority]}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                        )}
                        {notification.isNew && (
                          <div className="w-3 h-3 bg-[#8B5DFF] rounded-full -mt-2 ml-8 border-2 border-white"></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-1">
                              {notification.title}
                              {notification.priority === 'high' && (
                                <Badge className="ml-2 bg-orange-100 text-orange-800">
                                  High Priority
                                </Badge>
                              )}
                              {notification.priority === 'urgent' && (
                                <Badge className="ml-2 bg-red-100 text-red-800">
                                  Urgent
                                </Badge>
                              )}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.timestamp}
                              <Badge variant="outline" className="ml-2 text-xs">
                                {notification.category}
                              </Badge>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No notifications found
                </h3>
                <p className="text-gray-500">
                  {searchQuery || selectedPriority !== 'all' || selectedCategory !== 'all'
                    ? 'Try adjusting your filters or search terms.'
                    : 'You\'re all caught up! Check back later for new notifications.'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Load More Button */}
        {filteredNotifications.length >= 10 && (
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
