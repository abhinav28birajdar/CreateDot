"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  Palette,
  Zap,
  Target,
  Users,
  TrendingUp,
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  Brain,
  ChevronRight,
  Quote,
  Wand2,
  Eye,
  Layers,
  Cpu,
  Globe,
  MousePointer,
  Smartphone,
  Monitor,
  Printer
} from "lucide-react";

const DesignlyHomePage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = React.useState(0);

  const heroSlides = [
    {
      title: "Design Your Brand Identity",
      subtitle: "AI-powered logo generation and complete brand guidelines",
      image: "/api/placeholder/600/400",
      ctaText: "Create Brand Identity",
      ctaLink: "/create/branding-identity"
    },
    {
      title: "Beautiful UI/UX Concepts", 
      subtitle: "Generate stunning app screens and website mockups instantly",
      image: "/api/placeholder/600/400",
      ctaText: "Design UI/UX",
      ctaLink: "/create/ui-ux-conceptual"
    },
    {
      title: "Marketing Materials",
      subtitle: "Create compelling social media graphics and promotional content",
      image: "/api/placeholder/600/400", 
      ctaText: "Design Marketing",
      ctaLink: "/create/design-assets"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Creative Director", 
      company: "Design Studio Inc.",
      content: "Design.ly has revolutionized our design workflow. The AI suggestions are incredibly intuitive and save us hours of work.",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    },
    {
      name: "Marcus Rodriguez", 
      role: "Brand Manager",
      company: "TechCorp",
      content: "The brand consistency tools in Design.ly ensure our visual identity remains cohesive across all touchpoints.",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    },
    {
      name: "Elena Petrov",
      role: "UX Designer", 
      company: "StartupX",
      content: "From concept to execution, Design.ly streamlines every step of the design process. It's like having a creative partner.",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    }
  ];

  const aiModes = [
    {
      id: "design-assets",
      title: "Design Assets",
      description: "General Graphics, Posters, Social Media, Ads",
      icon: <Palette className="w-8 h-8" />,
      color: "",
      features: ["Social Media Graphics", "Print Materials", "Digital Ads", "Posters & Banners"]
    },
    {
      id: "branding-identity", 
      title: "Branding & Identity",
      description: "Logo Generation, Brand Guidelines, Business Kits",
      icon: <Target className="w-8 h-8" />,
      color: "from-designly-emerald-500 to-designly-emerald-600",
      features: ["Logo Design", "Brand Guidelines", "Business Cards", "Letterheads"]
    },
    {
      id: "ui-ux-conceptual",
      title: "UI/UX Concepts", 
      description: "App Screens, Website Sections, Component Kits",
      icon: <Smartphone className="w-8 h-8" />,
      color: "",
      features: ["Mobile Apps", "Web Interfaces", "Component Libraries", "Wireframes"]
    },
    {
      id: "product-packaging",
      title: "Product & Packaging",
      description: "3D Product Mockups, Labeling, Feature Visuals", 
      icon: <Layers className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600",
      features: ["Product Mockups", "Package Design", "Label Design", "3D Visualization"]
    },
    {
      id: "editorial-publication",
      title: "Editorial & Publication",
      description: "Ebook Layouts, Blog Graphics, Newsletter Concepts",
      icon: <Monitor className="w-8 h-8" />,
      color: "to-purple-600", 
      features: ["Magazine Layouts", "Ebook Design", "Blog Graphics", "Newsletters"]
    },
    {
      id: "data-storytelling",
      title: "Data Storytelling",
      description: "Styled Charts, Infographics, Dashboard Elements",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "",
      features: ["Infographics", "Charts & Graphs", "Dashboards", "Data Visualization"]
    }
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms that understand design principles and generate creative solutions tailored to your brand.",
      highlight: "Smart Suggestions"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Consistency",
      description: "Maintain visual identity across all touchpoints with intelligent brand guideline enforcement and style suggestions.",
      highlight: "Brand Guardian"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Performance",
      description: "Real-time design generation and editing with industry-leading speed and responsiveness for seamless creativity.",
      highlight: "Instant Results"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Workspace",
      description: "Share, review, and iterate on designs with your team using built-in collaboration tools and feedback systems.",
      highlight: "Team Sync"
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  React.useEffect(() => {
    const heroTimer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(heroTimer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-[#8B5DFF] from-almost-white via-white to-light-slate">
      {/* Hero Carousel Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#8B5DFF] from-designly-purple-50 via-white to-designly-emerald-50" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHeroSlide}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="relative z-10 container mx-auto px-4 text-center"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-6xl md:text-7xl font-bold font-heading mb-6">
                <span className="designly-text-gradient">Design.ly</span>
              </h1>
              <p className="text-xl md:text-2xl text-dark-slate mb-4">
                The AI-Powered Creative Engine
              </p>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Innovate. Automate. Elevate. Every Design, Masterfully Crafted.
              </p>
              
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-dark-slate mb-4">
                  {heroSlides[activeHeroSlide].title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {heroSlides[activeHeroSlide].subtitle}
                </p>
                
                <Button 
                  asChild
                  size="lg"
                  className="designly-gradient text-white hover:opacity-90 designly-hover-lift animate-pulse-glow font-semibold px-8 py-4 text-lg"
                >
                  <Link href={heroSlides[activeHeroSlide].ctaLink}>
                    {heroSlides[activeHeroSlide].ctaText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>

              {/* Hero Slide Indicators */}
              <div className="flex justify-center space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeHeroSlide 
                        ? 'bg-[#8B5DFF] w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setActiveHeroSlide(index)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Design Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-16 h-16 bg-designly-purple-200 rounded-full opacity-60"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-40 right-20 w-12 h-12 bg-designly-emerald-200 rounded-full opacity-60"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-32 left-20 w-20 h-20 bg-designly-purple-100 rounded-full opacity-40"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
      </section>

      {/* Interactive Mini-Generators Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Experience <span className="designly-text-gradient">AI Magic</span> Instantly
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Try our interactive mini-generators and see the power of Design.ly in action
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Brand Name Generator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <Card className="p-6 h-full border-2 border-transparent hover:border-designly-purple-200 transition-all designly-hover-lift">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 designly-gradient rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">Logo Generator</CardTitle>
                  <CardDescription>Type a brand name and see instant AI logo concepts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Enter brand name..."
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-designly-purple-500 focus:outline-none transition-colors"
                    />
                    <Button className="w-full designly-gradient text-white hover:opacity-90">
                      Generate Logo Ideas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Color Palette Generator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group"
            >
              <Card className="p-6 h-full border-2 border-transparent hover:border-designly-purple-200 transition-all designly-hover-lift">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-[#8B5DFF] from-designly-emerald-500 to-designly-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">Smart Palettes</CardTitle>
                  <CardDescription>Generate harmonious color schemes for any mood</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Describe the mood..."
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-designly-purple-500 focus:outline-none transition-colors"
                    />
                    <Button className="w-full bg-[#8B5DFF] from-designly-emerald-500 to-designly-emerald-600 text-white hover:opacity-90">
                      Create Palette
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Layout Generator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <Card className="p-6 h-full border-2 border-transparent hover:border-designly-purple-200 transition-all designly-hover-lift">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-[#8B5DFF] rounded-lg flex items-center justify-center mb-4">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">Layout Wizard</CardTitle>
                  <CardDescription>Smart layouts that adapt to your content perfectly</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <select className="w-full p-3 border border-gray-200 rounded-lg focus:border-designly-purple-500 focus:outline-none transition-colors">
                      <option>Social Media Post</option>
                      <option>Business Card</option>
                      <option>Flyer</option>
                      <option>Web Banner</option>
                    </select>
                    <Button className="w-full bg-[#8B5DFF] text-white hover:opacity-90">
                      Generate Layout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Design Modes Showcase */}
      <section className="py-20 bg-[#8B5DFF] from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Powerful <span className="designly-text-gradient">AI Design Modes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from specialized AI modes, each trained to excel in specific design disciplines
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Card className="p-6 h-full border-2 border-transparent hover:border-designly-purple-200 transition-all designly-hover-lift hover:shadow-2xl">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-[#8B5DFF] ${mode.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {mode.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{mode.title}</CardTitle>
                    <CardDescription className="text-base">{mode.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {mode.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-[#8B5DFF] mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild
                      className="w-full bg-[#8B5DFF] text-white hover:opacity-90"
                    >
                      <Link href={`/create/${mode.id}`}>
                        Start Creating
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Why Choose <span className="designly-text-gradient">Design.ly</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with intuitive design to deliver unmatched creative capabilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 designly-gradient rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform designly-purple-glow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <span className="inline-block px-3 py-1 bg-designly-purple-100 text-designly-purple-700 rounded-full text-sm font-medium">
                  {feature.highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#8B5DFF] from-designly-purple-50 to-designly-emerald-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              What Our <span className="designly-text-gradient">Creators</span> Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of satisfied designers, marketers, and businesses who trust Design.ly
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <Quote className="w-12 h-12 text-designly-purple-400 mx-auto mb-8" />
                <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed text-dark-slate">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-lg">{testimonials[currentTestimonial].name}</p>
                    <p className="text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                    <p className="text-sm text-designly-purple-600">{testimonials[currentTestimonial].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial 
                      ? 'bg-[#8B5DFF] w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#8B5DFF] via-designly-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              Ready to Transform Your Creative Process?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join the AI design revolution and create stunning visuals in minutes, not hours
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-white text-designly-purple-700 hover:bg-gray-100 designly-hover-lift font-semibold px-8 py-4 text-lg"
              >
                <Link href="/create">
                  Start Designing Your Vision
                  <Sparkles className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-designly-purple-700 designly-hover-lift font-semibold px-8 py-4 text-lg"
              >
                <Link href="/explore">
                  Explore Gallery
                  <Eye className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DesignlyHomePage;
