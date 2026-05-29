"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { 
  Sparkles, 
  Zap, 
  Target, 
  Palette, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Check,
  Star,
  Play,
  Brain,
  Layers,
  Download,
  Heart,
  Eye,
  Share2
} from "lucide-react"

export default function DesignlyHomePage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Design",
      description: "Generate stunning designs with our advanced AI engine that understands your creative vision."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Create professional designs in seconds, not hours. Our optimized workflow speeds up your creative process."
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Multiple Formats",
      description: "From logos to social media posts, banners to presentations - create anything you need."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Smart Color Palettes",
      description: "AI-generated color schemes that perfectly match your brand and design requirements."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time collaboration tools and shared workspaces."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Trending Styles",
      description: "Stay ahead with AI insights on the latest design trends and popular styles."
    }
  ]

  const designTypes = [
    {
      title: "Logo Design",
      description: "Professional brand identities",
      count: "2.5K+ created",
      gradient: "",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "Social Media",
      description: "Engaging post templates",
      count: "12K+ created",
      gradient: "to-cyan-500",
      icon: <Share2 className="h-6 w-6" />
    },
    {
      title: "Marketing Materials",
      description: "Banners, flyers & ads",
      count: "8.3K+ created",
      gradient: "",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "Presentations",
      description: "Professional slide decks",
      count: "5.7K+ created",
      gradient: "from-orange-500 to-red-500",
      icon: <Layers className="h-6 w-6" />
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechFlow",
      content: "Design.ly transformed our content creation process. We're creating professional designs 10x faster than before.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      company: "InnovateNow",
      content: "The AI understands exactly what I need. It's like having a professional designer available 24/7.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Creative Director",
      company: "Brand Studio",
      content: "Incredible results and so intuitive to use. Our clients are amazed by the quality and speed.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-[#8B5DFF] from-slate-50 via-white to-purple-50/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#8B5DFF] /5 via-transparent /5"></div>
        <div className="container-fluid relative max-w-7xl">
          <div className="max-w-4xl mx-auto text-center space-content animate-fade-in">
            <Badge className="mb-6 bg-designly-purple-50 text-designly-purple-700 border-designly-purple-200 hover:bg-designly-purple-100 transition-colors">
              <Sparkles className="h-4 w-4 mr-2" />
              Powered by Advanced AI
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Design Anything with{" "}
              <span className="designly-text-gradient">AI-Powered</span>{" "}
              Creativity
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Create stunning logos, social media posts, marketing materials, and more in seconds. 
              Professional design has never been this fast or accessible.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/create">
                <Button className="bg-[#8B5DFF] hover:bg-[#7B4DE5] text-white text-lg px-8 py-4 h-auto font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Creating Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              
              <Button variant="outline" className="text-lg px-8 py-4 h-auto border-2 hover:bg-gray-50 rounded-xl">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-[#8B5DFF]" />
                No credit card required
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-[#8B5DFF]" />
                Free forever plan
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-[#8B5DFF]" />
                Premium templates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container-fluid max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600 font-medium">Designs Created</div>
            </div>
            <div className="animate-slide-up" style={{animationDelay: "0.1s"}}>
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">25K+</div>
              <div className="text-gray-600 font-medium">Happy Users</div>
            </div>
            <div className="animate-slide-up" style={{animationDelay: "0.2s"}}>
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">99.8%</div>
              <div className="text-gray-600 font-medium">Uptime</div>
            </div>
            <div className="animate-slide-up" style={{animationDelay: "0.3s"}}>
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">4.9★</div>
              <div className="text-gray-600 font-medium">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-fluid max-w-7xl">
          <div className="text-center space-content">
            <Badge className="mb-6 bg-emerald-100 text-emerald-700 border-emerald-200">
              <Target className="h-4 w-4 mr-2" />
              Features
            </Badge>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything you need to create
              <span className="designly-text-gradient"> amazing designs</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with intuitive design tools 
              to help you create professional-quality designs effortlessly.
            </p>
          </div>
          
          <div className="responsive-grid-large">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#8B5DFF] rounded-2xl flex items-center justify-center text-designly-purple-600 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2 font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription className="text-base leading-relaxed text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Types Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-fluid max-w-7xl">
          <div className="text-center space-content">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Create any type of design
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From brand identities to social media content, our AI adapts to your needs
            </p>
          </div>
          
          <div className="responsive-grid-large">
            {designTypes.map((type, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white overflow-hidden group cursor-pointer">
                <div className={`h-2 bg-[#8B5DFF] ${type.gradient}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg bg-[#8B5DFF] ${type.gradient} text-white`}>
                      {type.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{type.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base text-gray-600">{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">{type.count}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-designly-purple-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-fluid max-w-7xl">
          <div className="text-center space-content">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Loved by creators worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who've transformed their creative workflow
            </p>
          </div>
          
          <div className="responsive-grid-large">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed text-gray-700 italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[#8B5DFF] via-designly-purple-700 text-white">
        <div className="container-fluid max-w-5xl text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to revolutionize your design process?
          </h2>
          <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            Join thousands of creators who are already using AI to bring their ideas to life faster than ever before.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/create">
              <Button className="bg-white text-designly-purple-700 hover:bg-gray-100 text-lg px-8 py-4 h-auto font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Creating Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            
            <Link href="/explore">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto rounded-xl border-2">
                <Eye className="h-5 w-5 mr-2" />
                Explore Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
