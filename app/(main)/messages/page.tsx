"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Search,
    Send,
    Paperclip,
    Smile,
    MoreVertical,
    Phone,
    Video,
    CheckCheck,
    Sparkles,
    Circle,
    Image as ImageIcon,
    FileText,
    ArrowLeft
} from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Message {
    id: string
    senderId: string
    text: string
    timestamp: string
    isOwn: boolean
}

interface Conversation {
    id: string
    name: string
    handle: string
    avatar: string
    role: string
    online: boolean
    lastSeen?: string
    unread: number
    messages: Message[]
}

const INITIAL_CONVERSATIONS: Conversation[] = [
    {
        id: 'c1',
        name: 'Elena Rostova',
        handle: 'elenadesign',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'Principal Designer @ Nexus',
        online: true,
        unread: 1,
        messages: [
            {
                id: 'm1',
                senderId: 'elena',
                text: 'Hey! I checked out your recent case study on the QuantumPay fintech app. Really loved the tactile glassmorphism and the micro-interactions!',
                timestamp: '10:42 AM',
                isOwn: false
            },
            {
                id: 'm2',
                senderId: 'me',
                text: 'Thanks so much Elena! That means a lot coming from you. I spent quite a bit of time fine-tuning the motion curves in Principle.',
                timestamp: '10:45 AM',
                isOwn: true
            },
            {
                id: 'm3',
                senderId: 'elena',
                text: 'Would you be open to collaborating on an upcoming AI design system project next month? We are looking for lead input.',
                timestamp: '10:48 AM',
                isOwn: false
            }
        ]
    },
    {
        id: 'c2',
        name: 'Marcus Chen',
        handle: 'marcus_3d',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        role: '3D Spatial & Motion Artist',
        online: false,
        lastSeen: '1h ago',
        unread: 0,
        messages: [
            {
                id: 'm4',
                senderId: 'marcus',
                text: 'Hey! Did you see the new Spline integration update? Let me know if you want the 3D geometry file.',
                timestamp: 'Yesterday',
                isOwn: false
            },
            {
                id: 'm5',
                senderId: 'me',
                text: 'Yes please! That would save me hours of modeling. Send it over when you have a chance.',
                timestamp: 'Yesterday',
                isOwn: true
            }
        ]
    },
    {
        id: 'c3',
        name: 'Sophia Lin',
        handle: 'sophialin_recruiter',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        role: 'Head of Talent @ Vercel',
        online: true,
        unread: 2,
        messages: [
            {
                id: 'm6',
                senderId: 'sophia',
                text: 'Hi there! We came across your portfolio on CreateDOT and are extremely impressed with your craft.',
                timestamp: '2 days ago',
                isOwn: false
            },
            {
                id: 'm7',
                senderId: 'sophia',
                text: 'We have an open Senior Product Designer position on our core team and would love to chat if you are exploring new roles.',
                timestamp: '2 days ago',
                isOwn: false
            }
        ]
    }
]

export default function MessagesPage() {
    const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS)
    const [activeId, setActiveId] = useState<string>('c1')
    const [inputText, setInputText] = useState('')
    const [searchFilter, setSearchFilter] = useState('')
    const [showMobileList, setShowMobileList] = useState(false)

    const activeConversation: Conversation = (conversations.find(c => c.id === activeId) || INITIAL_CONVERSATIONS[0])!

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputText.trim()) return

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: 'me',
            text: inputText.trim(),
            timestamp: 'Just now',
            isOwn: true
        }

        setConversations(prev => prev.map(c => {
            if (c.id === activeId) {
                return {
                    ...c,
                    messages: [...c.messages, newMessage]
                }
            }
            return c
        }))

        setInputText('')

        // Auto reply simulation after 1.5 seconds
        setTimeout(() => {
            const replies = [
                "Sounds wonderful! Let me review the file and get back to you shortly.",
                "Excited to work together on this! Let's schedule a quick 15-min sync.",
                "Awesome, appreciate the quick reply!",
                "Check out the latest preview I uploaded to my profile when you have a moment."
            ]
            const randomReply = replies[Math.floor(Math.random() * replies.length)] ?? "Awesome, sounds good!"

            const replyMessage: Message = {
                id: `reply-${Date.now()}`,
                senderId: activeConversation.name || 'Creator',
                text: randomReply,
                timestamp: 'Just now',
                isOwn: false
            }

            setConversations(prev => prev.map(c => {
                if (c.id === activeId) {
                    return {
                        ...c,
                        messages: [...c.messages, replyMessage]
                    }
                }
                return c
            }))
        }, 1500)
    }

    const filteredConversations = conversations.filter(c =>
        c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        c.role.toLowerCase().includes(searchFilter.toLowerCase())
    )

    return (
        <div className="h-[calc(100vh-5.5rem)] p-2 sm:p-4 lg:p-6 overflow-hidden">
            <div className="max-w-7xl mx-auto h-full flex rounded-[32px] bg-white/95 dark:bg-[#14161F] border border-[#14161F]/8 dark:border-white/10 shadow-xl overflow-hidden backdrop-blur-xl">

                {/* Left Conversation List */}
                <div className={`w-full md:w-80 lg:w-96 border-r border-[#14161F]/8 dark:border-white/10 flex flex-col ${showMobileList ? 'block' : 'hidden md:flex'}`}>
                    <div className="p-4 border-b border-[#14161F]/8 dark:border-white/10">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-xl font-black tracking-tight text-[#14161F] dark:text-white">Messages</h2>
                            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#FF6B6B]/15 text-[#FF6B6B]">
                                3 Active
                            </span>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C96AB]" />
                            <Input
                                value={searchFilter}
                                onChange={(e) => setSearchFilter(e.target.value)}
                                placeholder="Search conversations..."
                                className="pl-9 h-10 rounded-full bg-[#FAF7F0] dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-[#14161F]/6 dark:divide-white/5">
                        {filteredConversations.map(conv => {
                            const lastMsg = conv.messages[conv.messages.length - 1]
                            const isSelected = conv.id === activeId

                            return (
                                <button
                                    key={conv.id}
                                    onClick={() => {
                                        setActiveId(conv.id)
                                        setShowMobileList(false)
                                    }}
                                    className={`w-full p-4 flex items-start gap-3.5 text-left transition ${isSelected ? 'bg-[#FAF7F0] dark:bg-white/[0.06] border-l-4 border-[#FF6B6B]' : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'}`}
                                >
                                    <div className="relative shrink-0">
                                        <img
                                            src={conv.avatar}
                                            alt={conv.name}
                                            className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                                        />
                                        {conv.online ? (
                                            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#121215]" />
                                        ) : (
                                            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-slate-400 ring-2 ring-white dark:ring-[#121215]" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                                {conv.name}
                                            </h4>
                                            <span className="text-[11px] text-muted-foreground whitespace-nowrap ml-2">
                                                {lastMsg?.timestamp || ''}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">{conv.role}</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-1 font-medium">
                                            {lastMsg?.isOwn ? 'You: ' : ''}{lastMsg?.text || 'No messages'}
                                        </p>
                                    </div>
                                    {conv.unread > 0 && (
                                        <span className="h-5 w-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                            {conv.unread}
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Right Chat Stream */}
                <div className={`flex-1 flex flex-col h-full ${showMobileList ? 'hidden md:flex' : 'flex'}`}>
                    {/* Header */}
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowMobileList(true)}
                                className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <img
                                src={activeConversation.avatar}
                                alt={activeConversation.name}
                                className="h-10 w-10 rounded-full object-cover ring-2 ring-violet-500/20"
                            />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                                        {activeConversation.name}
                                    </h3>
                                    <Link
                                        href={`/u/${activeConversation.handle}`}
                                        className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-semibold"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    {activeConversation.online ? (
                                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Active now
                                        </span>
                                    ) : (
                                        <span>Active {activeConversation.lastSeen}</span>
                                    )}
                                    <span>•</span>
                                    <span>{activeConversation.role}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toast.info(`Calling ${activeConversation.name}...`)}
                                className="rounded-xl text-slate-600 dark:text-slate-400"
                            >
                                <Phone className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toast.info(`Starting video call with ${activeConversation.name}...`)}
                                className="rounded-xl text-slate-600 dark:text-slate-400"
                            >
                                <Video className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages Scroll Area */}
                    <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAF7F0]/40 dark:bg-black/20">
                        {activeConversation.messages.map(msg => (
                            <div
                                key={msg.id}
                                className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'}`}
                            >
                                <div
                                    className={`max-w-md sm:max-w-lg rounded-3xl px-5 py-3 text-sm leading-relaxed shadow-sm ${msg.isOwn ? 'bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] rounded-br-sm' : 'bg-white dark:bg-[#1A1A1E] text-[#14161F] dark:text-white border border-[#14161F]/8 dark:border-white/10 rounded-bl-sm'}`}
                                >
                                    <p>{msg.text}</p>
                                </div>
                                <span className="text-[10px] text-[#8C96AB] mt-1 px-1 flex items-center gap-1 font-semibold">
                                    {msg.timestamp}
                                    {msg.isOwn && <CheckCheck className="h-3 w-3 text-[#FF6B6B]" />}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Input Bar */}
                    <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-[#14161F]/8 dark:border-white/10 flex items-center gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => toast.info("Attaching portfolio project...")}
                            className="rounded-full text-[#8C96AB] hover:text-[#14161F] shrink-0"
                        >
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={`Reply to ${activeConversation.name}...`}
                            className="h-11 rounded-full bg-[#FAF7F0] dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs font-medium"
                        />
                        <Button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="bg-[#FF6B6B] hover:bg-[#F35555] text-white rounded-full h-11 px-5 shrink-0 shadow-md shadow-[#FF6B6B]/25 font-bold"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
