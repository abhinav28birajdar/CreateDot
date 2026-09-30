"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  FaLayerGroup,
  FaLock,
  FaGlobe,
  FaUsers,
  FaPlus,
  FaArrowRight,
  FaThumbtack,
  FaShieldHalved
} from "react-icons/fa6"

interface Board {
  id: string
  title: string
  description: string
  pinCount: number
  privacy: "private" | "public" | "shared"
  collaborators: number
  covers: string[]
}

const initialBoards: Board[] = [
  {
    id: "board-1",
    title: "Futuristic Fintech & HUDs",
    description: "Glassmorphism user interfaces, autonomous banking flows, and neon terminal designs.",
    pinCount: 38,
    privacy: "public",
    collaborators: 3,
    covers: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "board-2",
    title: "Nova Design System Architecture",
    description: "Atomic components, Tailwind variables, and WCAG accessibility standards.",
    pinCount: 24,
    privacy: "shared",
    collaborators: 5,
    covers: [
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "board-3",
    title: "Secret Client Brand Explorations",
    description: "Confidential identity mockups and preliminary art direction sketches.",
    pinCount: 19,
    privacy: "private",
    collaborators: 1,
    covers: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"
    ]
  }
]

export default function BoardsPage() {
  const [boards, setBoards] = useState(initialBoards)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDesc, setNewDesc] = useState("")
  const [newPrivacy, setNewPrivacy] = useState<"private" | "public" | "shared">("public")

  const handleCreateBoard = () => {
    if (newTitle.trim()) {
      const newBoard: Board = {
        id: `board-${Date.now()}`,
        title: newTitle.trim(),
        description: newDesc.trim() || "Creative moodboard and inspiration collection.",
        pinCount: 0,
        privacy: newPrivacy,
        collaborators: 1,
        covers: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&auto=format&fit=crop&q=80"
        ]
      }
      setBoards([newBoard, ...boards])
      setNewTitle("")
      setNewDesc("")
      setShowCreateModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Top Banner */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-pink-400 mb-2">
              <FaLayerGroup className="text-pink-400" />
              <span>Creative Boards & Collections</span>
            </div>
            <h1 className="text-2xl font-extrabold sm:text-3xl text-white">Your Inspiration Boards</h1>
            <p className="text-xs text-slate-400 mt-1">
              Organize saved pins into themed boards, share with collaborators, or keep them strictly private.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110 self-start sm:self-auto"
          >
            <FaPlus className="text-xs" />
            <span>Create Board</span>
          </button>
        </div>
      </div>

      {/* Boards Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <motion.div
              key={board.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl transition-all hover:border-[#ff4b6e]/40 hover:shadow-2xl"
            >
              {/* Cover Mosaic (3 items) */}
              <Link href={`/boards/${board.id}`} className="grid grid-cols-3 gap-1 p-2 bg-slate-950 aspect-[16/9]">
                <div className="col-span-2 relative h-full rounded-l-xl overflow-hidden">
                  <Image src={board.covers[0] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"} alt="Cover" fill sizes="300px" className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex flex-col gap-1 h-full">
                  <div className="relative flex-1 rounded-tr-xl overflow-hidden">
                    <Image src={board.covers[1] || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80"} alt="Cover" fill sizes="150px" className="object-cover" />
                  </div>
                  <div className="relative flex-1 rounded-br-xl overflow-hidden">
                    <Image src={board.covers[2] || "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&auto=format&fit=crop&q=80"} alt="Cover" fill sizes="150px" className="object-cover" />
                  </div>
                </div>
              </Link>

              {/* Board Details */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <FaThumbtack className="text-[10px]" />
                    {board.pinCount} Pins
                  </span>

                  <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                    {board.privacy === "private" && <FaLock className="text-[9px]" />}
                    {board.privacy === "public" && <FaGlobe className="text-[9px]" />}
                    {board.privacy === "shared" && <FaUsers className="text-[9px]" />}
                    <span className="capitalize">{board.privacy}</span>
                  </span>
                </div>

                <Link href={`/boards/${board.id}`}>
                  <h3 className="text-base font-bold text-white group-hover:text-pink-400 transition-colors">
                    {board.title}
                  </h3>
                </Link>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {board.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <FaUsers className="text-slate-500" />
                    <span>{board.collaborators} Collaborator{board.collaborators > 1 ? "s" : ""}</span>
                  </div>

                  <Link
                    href={`/boards/${board.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-pink-400 hover:text-white"
                  >
                    <span>View Board</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Board Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-4">Create New Board</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Board Name</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Design Tokens & UI Atoms"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ff4b6e]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description (Optional)</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="What is this board about?"
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none focus:border-[#ff4b6e]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Privacy</label>
                <select
                  value={newPrivacy}
                  onChange={(e) => setNewPrivacy(e.target.value as any)}
                  className="w-full rounded-xl border border-white/10 bg-slate-800 p-3 text-xs text-white focus:outline-none"
                >
                  <option value="public">Public (Visible to everyone on CreateDOT)</option>
                  <option value="shared">Shared (Only invited collaborators)</option>
                  <option value="private">Private (Only you)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBoard}
                className="rounded-xl bg-[#ff4b6e] px-5 py-2 text-xs font-bold text-white hover:brightness-110"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
