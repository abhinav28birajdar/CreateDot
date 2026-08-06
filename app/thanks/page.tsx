"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Star, 
  Sparkles, 
  ArrowRight,
  Twitter,
  Instagram,
  Github,
  Linkedin
} from 'lucide-react';
import Link from 'next/link';

export default function ThanksPage() {
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation
    setConfetti(true);
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Designs Created', value: '2.5M+' },
    { label: 'Active Designers', value: '150K+' },
    { label: 'Countries', value: '180+' },
    { label: 'Templates', value: '50K+' }
  ];

  const features = [
    {
      title: 'AI-Powered Design Tools',
      description: 'Create stunning designs with our advanced AI assistance',
      icon: Sparkles
    },
    {
      title: 'Collaborative Workspace',
      description: 'Work together with your team in real-time',
      icon: Heart
    },
    {
      title: 'Professional Templates',
      description: 'Choose from thousands of professionally designed templates',
      icon: Star
    }
  ];

  return (
    <div className="min-h-screen bg-[#8B5DFF] from-purple-50 via-white to-pink-50 relative overflow-hidden">
      {/* Confetti Animation */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className="w-2 h-2 bg-[#8B5DFF] rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Thank You Message */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#8B5DFF] rounded-full mb-8 animate-pulse">
              <Heart className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-[#8B5DFF] mb-6">
              Thank You!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Thank you for being part of the CreateDOT community! Your creativity and passion inspire us every day. 
              We hope to see you again soon.
            </p>

            <div className="flex justify-center space-x-4 mb-12">
              <Button asChild className="bg-[#8B5DFF] hover:hover:">
                <Link href="/sign-in">
                  Sign In Again
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  Explore as Guest
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why Designers Love CreateDOT
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8B5DFF] rounded-full mb-6">
                        <Icon className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Stay Connected
            </h3>
            <p className="text-gray-600 mb-8">
              Follow us on social media for design inspiration, tips, and community highlights
            </p>
            
            <div className="flex justify-center space-x-6">
              {[
                { icon: Twitter, href: '#', color: 'hover:text-[#8B5DFF]' },
                { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                { icon: Github, href: '#', color: 'hover:text-gray-600' },
                { icon: Linkedin, href: '#', color: 'hover:text-[#8B5DFF]' }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-3 bg-white rounded-full shadow-lg text-gray-400 ${social.color} transition-all hover:shadow-xl hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Newsletter Signup */}
          <Card className="bg-[#8B5DFF] border-0 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated
              </h3>
              <p className="mb-6 opacity-90">
                Get the latest design trends, features, and community updates delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-white/50"
                />
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              © 2025 CreateDOT. Made with <Heart className="inline h-4 w-4 text-red-500" /> for designers worldwide.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
