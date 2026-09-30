"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  FaThumbtack,
  FaHeart,
  FaRegHeart,
  FaShareNodes,
  FaArrowLeft,
  FaDownload,
  FaComment,
  FaPaperPlane,
  FaPalette,
  FaEllipsis,
  FaCheck
} from "react-icons/fa6"

export default function PinDetailPage() {
  const params = useParams()
  const pinId = (params?.id as string) || "pin-1"

  const [isSaved, setIsSaved] = useState(false)
  const [likes, setLikes] = useState(1240)
  const [hasLiked, setHasLiked] = useState(false)
  const [comments, setComments] = useState([
    {
      author: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      text: "The backdrop-filter and specular neon rim lighting in this interface is mindblowing!",
      time: "2 hours ago"
    },
    {
      author: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      text: "What color tokens did you use for the card borders?",
      time: "5 hours ago"
    }
  ])
  const [newComment, setNewComment] = useState("")

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1)
      setHasLiked(false)
    } else {
      setLikes(likes + 1)
      setHasLiked(true)
    }
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          author: "Abhinav Birajdar",
          avatar: "/images/profile-image-4.png",
          text: newComment.trim(),
          time: "Just now"
        }
      ])
      setNewComment("")
    }
  }

  const palette = [
    { hex: "#0B0F19", name: "Deep Void" },
    { hex: "#FF4B6E", name: "Neon Coral" },
    { hex: "#6366F1", name: "Electric Indigo" },
    { hex: "#10B981", name: "Emerald Glaze" },
    { hex: "#F3F4F6", name: "Specular White" }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top back bar */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/pins"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Pins</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Pin link copied to clipboard")}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            >
              <FaShareNodes className="text-xs" />
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                isSaved
                  ? "bg-emerald-500 text-white"
                  : "bg-[#ff4b6e] text-white shadow-md shadow-pink-500/25 hover:brightness-110"
              }`}
            >
              {isSaved ? <FaCheck /> : <FaThumbtack />}
              <span>{isSaved ? "Saved to Board" : "Save Pin"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
          <div className="grid md:grid-cols-12">
            {/* Visual Canvas (Left) */}
            <div className="relative md:col-span-7 aspect-[4/5] md:aspect-auto w-full bg-slate-950 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"
                alt="Pin Preview"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  Futuristic Fintech
                </span>
              </div>
            </div>

            {/* Pin Details & Discussion (Right) */}
            <div className="flex flex-col md:col-span-5 p-6 sm:p-8 space-y-6">
              {/* Creator info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
                    <Image
                      src="/images/profile-image-4.png"
                      alt="Abhinav Birajdar"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Abhinav Birajdar</h3>
                    <p className="text-[11px] text-pink-400">@abhinav_design</p>
                  </div>
                </div>

                <button
                  onClick={handleLike}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10"
                >
                  {hasLiked ? <FaHeart className="text-[#ff4b6e]" /> : <FaRegHeart />}
                  <span>{likes}</span>
                </button>
              </div>

              {/* Title & Description */}
              <div>
                <h1 className="text-lg font-extrabold text-white leading-tight">
                  QuantumPay AI Banking Terminal — Glassmorphism HUD Spec
                </h1>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Autonomous liquidity routing, real-time reactive canvas, and multi-tier glassmorphism hierarchy designed for ultra-low latency decision making.
                </p>
              </div>

              {/* Color Palette Extraction */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white mb-3">
                  <FaPalette className="text-pink-400" />
                  <span>Extracted Color Palette</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {palette.map((c, i) => (
                    <div key={i} className="text-center">
                      <div
                        className="h-10 w-full rounded-xl border border-white/10 shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="block mt-1 font-mono text-[9px] text-slate-400">{c.hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="flex-1 flex flex-col justify-between border-t border-white/10 pt-4 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <FaComment className="text-pink-400" />
                  <span>Discussion ({comments.length})</span>
                </div>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {comments.map((c, i) => (
                    <div key={i} className="flex gap-2.5 text-xs">
                      <div className="relative h-6 w-6 rounded-full overflow-hidden shrink-0 border border-white/15">
                        <Image src={c.avatar} alt="Commenter" fill sizes="24px" className="object-cover" />
                      </div>
                      <div className="flex-1 rounded-xl bg-white/5 p-2.5">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-semibold text-white text-[11px]">{c.author}</span>
                          <span className="text-[10px] text-slate-500">{c.time}</span>
                        </div>
                        <p className="text-slate-300 text-[11px]">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment input */}
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                    placeholder="Add a comment..."
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white focus:outline-none"
                  />
                  <button
                    onClick={handleAddComment}
                    className="rounded-xl bg-[#ff4b6e] px-3.5 py-2 text-xs text-white hover:brightness-110"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
