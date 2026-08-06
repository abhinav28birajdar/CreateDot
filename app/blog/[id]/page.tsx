"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  BookmarkCheck,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
  User,
  ThumbsUp,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ============ MOCK DATA ============
const article = {
  id: "b1",
  title: "The Future of Design: AI-Powered Creative Tools in 2024",
  excerpt: "Explore how artificial intelligence is transforming the design industry and what it means for creative professionals.",
  coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop",
  author: {
    id: "u1",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    role: "Design Lead at CreateDOT",
    bio: "Senior Product Designer with 8+ years of experience. Passionate about creating intuitive digital experiences.",
    followers: 12500,
  },
  publishedAt: "December 15, 2024",
  updatedAt: "December 16, 2024",
  readTime: "8 min read",
  category: "Industry Trends",
  tags: ["AI", "Design Tools", "Future of Design", "Automation", "Creative AI"],
  likes: 342,
  comments: 28,
  content: `
    <p class="lead">The design industry is undergoing a revolutionary transformation. Artificial intelligence is no longer a futuristic concept—it's here, and it's changing how we create, iterate, and deliver design work.</p>

    <h2>The Rise of AI in Design</h2>
    <p>Over the past year, we've witnessed an explosion of AI-powered design tools. From Midjourney and DALL-E for image generation to Figma's new AI features, these tools are becoming essential parts of the modern designer's toolkit.</p>
    <p>But what does this mean for designers? Are we being replaced, or are we being empowered?</p>

    <blockquote>
      "AI won't replace designers, but designers who use AI will replace those who don't."
      <cite>— John Maeda, Design in Tech Report</cite>
    </blockquote>

    <h2>How AI is Transforming Design Workflows</h2>
    <p>Let's look at the key areas where AI is making the biggest impact:</p>

    <h3>1. Generative Design</h3>
    <p>AI can now generate design variations at scale. What used to take hours of manual iteration can now be done in minutes. Tools like Galileo AI and Uizard can create entire UI designs from simple text prompts.</p>

    <h3>2. Image and Asset Creation</h3>
    <p>Need a custom illustration or photo that doesn't exist? AI image generators can create unique assets that perfectly match your design vision. This eliminates the need for expensive stock photos or time-consuming custom illustrations.</p>

    <h3>3. Design Systems Automation</h3>
    <p>AI can analyze your designs and automatically generate consistent components, suggest improvements, and even detect accessibility issues. This helps maintain design consistency across large projects.</p>

    <h3>4. User Research and Testing</h3>
    <p>AI-powered tools can analyze user behavior, predict usability issues, and even simulate user testing sessions. This makes research more accessible and affordable for smaller teams.</p>

    <h2>The Human Element</h2>
    <p>Despite these advances, the human element remains crucial. AI is a tool, not a replacement. Here's what designers bring that AI cannot:</p>
    <ul>
      <li><strong>Empathy:</strong> Understanding human emotions and needs</li>
      <li><strong>Context:</strong> Grasping cultural nuances and business requirements</li>
      <li><strong>Strategy:</strong> Aligning design decisions with business goals</li>
      <li><strong>Creativity:</strong> True innovation and original thinking</li>
      <li><strong>Ethics:</strong> Making responsible design decisions</li>
    </ul>

    <h2>Preparing for the AI-Powered Future</h2>
    <p>To stay relevant in this evolving landscape, designers should:</p>
    <ol>
      <li>Embrace AI tools as productivity multipliers</li>
      <li>Focus on skills AI can't replicate: strategy, empathy, and creativity</li>
      <li>Stay curious and keep experimenting with new tools</li>
      <li>Develop a strong understanding of AI capabilities and limitations</li>
      <li>Build a portfolio that showcases your unique human perspective</li>
    </ol>

    <h2>Conclusion</h2>
    <p>The future of design is a collaboration between human creativity and artificial intelligence. Those who learn to harness AI effectively while maintaining their unique human perspective will thrive in this new era.</p>
    <p>The question isn't whether to adopt AI—it's how to adopt it thoughtfully and strategically.</p>
  `,
};

const comments = [
  {
    id: "c1",
    author: { name: "Marcus Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    content: "Great article! I've been experimenting with AI tools for the past few months and they've definitely changed how I approach projects. The key is knowing when to use them and when to rely on traditional methods.",
    date: "2 hours ago",
    likes: 12,
  },
  {
    id: "c2",
    author: { name: "Emily Rodriguez", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    content: "I love the point about empathy being irreplaceable. No matter how advanced AI gets, understanding human emotions and cultural context requires a human touch.",
    date: "5 hours ago",
    likes: 8,
  },
  {
    id: "c3",
    author: { name: "James Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    content: "This is exactly what I needed to read. I was worried about AI replacing designers, but now I see it as an opportunity to level up my skills and focus on what makes me unique.",
    date: "1 day ago",
    likes: 24,
  },
];

const relatedPosts = [
  {
    id: "b2",
    title: "10 Design System Best Practices for 2024",
    coverImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop",
    readTime: "6 min read",
  },
  {
    id: "b3",
    title: "The Psychology of Color in Brand Design",
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop",
    readTime: "5 min read",
  },
  {
    id: "b4",
    title: "From Concept to Launch: A UX Case Study",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
    readTime: "12 min read",
  },
];

// ============ MAIN ARTICLE PAGE ============
export default function BlogArticlePage() {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article.title;

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
        break;
      case "facebook":
        window.open(`https://facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case "linkedin":
        window.open(`https://linkedin.com/sharing/share-offsite/?url=${url}`);
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111]">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#8B5DFF] from-black/80 via-black/40 to-black/20" />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-white/80 bg-[#0B0B0C]/20 backdrop-blur-sm px-3 py-2 rounded-lg z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto">
          <Badge className="bg-violet-500 text-white mb-4">{article.category}</Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{article.title}</h1>
          <div className="flex items-center gap-6 text-white/80">
            <div className="flex items-center gap-3">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={44}
                height={44}
                className="rounded-full border-2 border-white"
              />
              <div>
                <p className="text-white font-medium">{article.author.name}</p>
                <p className="text-white/60 text-sm">{article.author.role}</p>
              </div>
            </div>
            <span className="hidden md:flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-200 dark:border-[#2A2A2A]">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500" : ""}
            >
              <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
              {article.likes + (isLiked ? 1 : 0)}
            </Button>
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              {article.comments}
            </Button>
          </div>
          <div className="flex items-center gap-2 relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
              className={isSaved ? "text-violet-600" : ""}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </Button>
            <div className="relative">
              <Button variant="outline" size="icon" onClick={() => setShowShareMenu(!showShareMenu)}>
                <Share2 className="w-4 h-4" />
              </Button>
              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white dark:bg-[#111111] rounded-xl shadow-lg border border-slate-200 dark:border-[#2A2A2A] p-2 z-10">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-a:text-violet-600 prose-blockquote:border-violet-500 prose-blockquote:bg-slate-100 dark:prose-blockquote:bg-[#111111] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-slate-200 dark:border-[#2A2A2A]">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-violet-100">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Author Bio */}
        <div className="bg-white dark:bg-[#111111] rounded-xl p-6 mt-8">
          <div className="flex items-start gap-4">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={80}
              height={80}
              className="rounded-xl"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {article.author.name}
                  </h3>
                  <p className="text-sm text-slate-500">{article.author.role}</p>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{article.author.bio}</p>
              <p className="text-sm text-slate-500 mt-2">
                {article.author.followers.toLocaleString()} followers
              </p>
            </div>
          </div>
        </div>

        {/* Comments */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Comments ({comments.length})
          </h2>

          {/* Add Comment */}
          <div className="bg-white dark:bg-[#111111] rounded-xl p-6 mb-6">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <Button className="bg-violet-500 hover:bg-violet-600">
                Post Comment
              </Button>
            </div>
          </div>

          {/* Comment List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white dark:bg-[#111111] rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {comment.author.name}
                        </p>
                        <p className="text-sm text-slate-400">{comment.date}</p>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-violet-600">
                        <ThumbsUp className="w-4 h-4" />
                        {comment.likes}
                      </button>
                      <button className="text-sm text-slate-500 hover:text-violet-600">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Posts */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-[#111111] rounded-xl overflow-hidden"
                >
                  <div className="aspect-[16/10] relative">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">{post.readTime}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between mt-12 pt-8 border-t border-slate-200 dark:border-[#2A2A2A]">
          <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-violet-600">
            <ChevronLeft className="w-5 h-5" />
            <div className="text-left">
              <p className="text-sm text-slate-400">Previous</p>
              <p className="font-medium">Design System Best Practices</p>
            </div>
          </button>
          <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-violet-600">
            <div className="text-right">
              <p className="text-sm text-slate-400">Next</p>
              <p className="font-medium">Psychology of Color in Design</p>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
