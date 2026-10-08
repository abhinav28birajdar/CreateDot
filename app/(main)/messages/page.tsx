"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Send,
  MoreVertical,
  CheckCheck,
  Sparkles,
  ArrowLeft,
  MessageCircle,
  User,
  ShieldCheck,
} from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useMessages } from "@/hooks/useMessages"

export default function MessagesPage() {
  const { user } = useAuth()
  const [activeContactId, setActiveContactId] = useState<string | undefined>(undefined)
  const [inputText, setInputText] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const {
    messages,
    contacts,
    isLoading,
    isSending,
    sendMessage,
  } = useMessages(activeContactId)

  // Filter contacts by search
  const filteredContacts = contacts.filter((c) =>
    (c.full_name || c.username || '')
      .toLowerCase()
      .includes(searchFilter.toLowerCase())
  )

  // Determine active contact object
  const activeContact =
    contacts.find((c) => c.id === activeContactId) || contacts[0]

  // Set active contact id default on first load
  React.useEffect(() => {
    if (!activeContactId && contacts.length > 0 && contacts[0]) {
      setActiveContactId(contacts[0].id)
    }
  }, [contacts, activeContactId])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim() || !activeContact) return

    const content = inputText.trim()
    setInputText('')
    await sendMessage(activeContact.id, content)
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-[calc(100vh-6rem)]">
      <div className="h-full rounded-[32px] border border-[#14161F]/8 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left: Contact Directory */}
        <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-[#14161F]/8 dark:border-white/10 flex flex-col bg-slate-50/50 dark:bg-transparent">
          {/* Header */}
          <div className="p-4 border-b border-[#14161F]/8 dark:border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Studio Messages</h2>
              <p className="text-[11px] text-slate-500 font-medium">Real-time Peer-to-Peer Guild Chat</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B] flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
          </div>

          {/* Search Contacts */}
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search creative peers..."
                className="pl-9 h-9 rounded-xl bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-xs"
              />
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredContacts.length === 0 && (
              <div className="text-center py-8 px-4 text-xs text-slate-400">
                No creative contacts found
              </div>
            )}

            {filteredContacts.map((contact) => {
              const isActive = activeContact?.id === contact.id
              return (
                <button
                  key={contact.id}
                  onClick={() => setActiveContactId(contact.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all ${
                    isActive
                      ? 'bg-[#14161F] text-white shadow-md dark:bg-white dark:text-[#14161F]'
                      : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={
                        contact.avatar_url ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.id}`
                      }
                      alt={contact.full_name || contact.username}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    {contact.is_verified && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#14161F]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold truncate">
                        {contact.full_name || contact.username}
                      </p>
                    </div>
                    <p
                      className={`text-[11px] truncate ${
                        isActive
                          ? 'text-slate-300 dark:text-slate-600'
                          : 'text-slate-400'
                      }`}
                    >
                      @{contact.username} • {contact.role || 'creator'}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right: Message Stream */}
        <div className="flex-1 flex flex-col bg-white dark:bg-transparent">
          {activeContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[#14161F]/8 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      activeContact.avatar_url ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${activeContact.id}`
                    }
                    alt={activeContact.full_name || activeContact.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {activeContact.full_name || activeContact.username}
                      {activeContact.is_verified && (
                        <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                      )}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      @{activeContact.username} • Verified Guild Member
                    </p>
                  </div>
                </div>

                <Link href={`/u/${activeContact.username}`}>
                  <Button variant="ghost" size="sm" className="text-xs rounded-xl">
                    View Portfolio
                  </Button>
                </Link>
              </div>

              {/* Chat Message Scroll */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {isLoading && (
                  <div className="space-y-3 py-10">
                    <div className="h-10 w-48 bg-slate-200 dark:bg-white/5 rounded-2xl animate-pulse" />
                    <div className="h-10 w-64 bg-slate-200 dark:bg-white/5 rounded-2xl animate-pulse ml-auto" />
                  </div>
                )}

                {!isLoading && messages.length === 0 && (
                  <div className="text-center py-20 text-slate-400 text-xs space-y-2">
                    <Sparkles className="h-8 w-8 text-[#FF6B6B] mx-auto opacity-70" />
                    <p className="font-bold text-slate-700 dark:text-slate-300">
                      No messages with {activeContact.full_name || activeContact.username} yet
                    </p>
                    <p>Send a message below to discuss design projects, critique, or collaboration!</p>
                  </div>
                )}

                {messages.map((msg) => {
                  const isMine = msg.sender_id === user?.id
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] sm:max-w-[65%] rounded-3xl p-4 text-xs shadow-sm ${
                          isMine
                            ? 'bg-[#14161F] text-white dark:bg-white dark:text-[#14161F]'
                            : 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        <div
                          className={`mt-1.5 flex items-center justify-end gap-1 text-[9px] ${
                            isMine
                              ? 'text-white/60 dark:text-[#14161F]/60'
                              : 'text-slate-400'
                          }`}
                        >
                          <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {isMine && <CheckCheck className="h-3 w-3" />}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-[#14161F]/8 dark:border-white/10 flex items-center gap-2">
                <Input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Message @${activeContact.username}...`}
                  className="flex-1 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-xs px-4"
                />
                <Button
                  type="submit"
                  disabled={isSending || !inputText.trim()}
                  className="h-12 w-12 rounded-2xl bg-[#FF6B6B] hover:bg-[#F05555] text-white shrink-0 shadow-md"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
              Select a creative peer to begin messaging
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
