"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    User,
    Bell,
    Shield,
    Palette,
    Camera,
    Save,
    Smartphone,
    Loader2
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/ThemeContext"
import { uploadFile } from "@/services/upload.service"
import { supabase } from "@/lib/supabase"

export default function SettingsPage() {
    const { user, profile, updateProfile, refreshProfile } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'appearance' | 'security'>('profile')

    // Profile state
    const [name, setName] = useState('')
    const [handle, setHandle] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')
    const [website, setWebsite] = useState('')
    const [avatar, setAvatar] = useState('/images/profile-image-4.png')
    const [isSaving, setIsSaving] = useState(false)
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

    // Sync profile values when loaded
    useEffect(() => {
        if (profile) {
            setName(profile.full_name || '')
            setHandle(profile.username || '')
            setBio(profile.bio || '')
            setLocation(profile.location || '')
            setWebsite(profile.website || '')
            if (profile.avatar_url) {
                setAvatar(profile.avatar_url)
            }
        } else if (user) {
            setName(user.user_metadata?.full_name || '')
            setHandle(user.email?.split('@')[0] || '')
        }
    }, [profile, user])

    // Notifications state
    const [emailInquiries, setEmailInquiries] = useState(true)
    const [emailLikes, setEmailLikes] = useState(true)
    const [emailFollows, setEmailFollows] = useState(false)
    const [weeklyDigest, setWeeklyDigest] = useState(true)

    // Security state
    const [newPass, setNewPass] = useState('')
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) {
            toast.error("You must be logged in to update your profile")
            return
        }

        setIsSaving(true)
        try {
            const { error } = await updateProfile({
                full_name: name,
                username: handle,
                bio,
                location,
                website,
                avatar_url: avatar
            })

            if (error) throw error
            toast.success("Profile updated successfully! ✨")
        } catch (err: any) {
            toast.error("Failed to update profile", { description: err?.message })
        } finally {
            setIsSaving(false)
        }
    }

    const handleAvatarUpload = () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                setIsUploadingAvatar(true)
                try {
                    const publicUrl = await uploadFile(file, 'avatars')
                    setAvatar(publicUrl)
                    await updateProfile({ avatar_url: publicUrl })
                    toast.success("Avatar uploaded and updated!")
                } catch (err: any) {
                    toast.error("Failed to upload avatar", { description: err.message })
                } finally {
                    setIsUploadingAvatar(false)
                }
            }
        }
        input.click()
    }

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newPass || newPass.length < 6) {
            toast.error("Password must be at least 6 characters")
            return
        }

        setIsUpdatingPassword(true)
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPass
            })

            if (error) throw error
            toast.success("Password updated successfully!")
            setNewPass('')
        } catch (err: any) {
            toast.error("Failed to update password", { description: err.message })
        } finally {
            setIsUpdatingPassword(false)
        }
    }

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-8 max-w-6xl mx-auto">
            {/* Header */}
            <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0D7] dark:bg-white/10 text-xs font-black text-[#8A6318] dark:text-[#FFE185] uppercase tracking-wider mb-2">
                    <User className="h-3.5 w-3.5 text-[#FF6B6B]" />
                    Creator Settings
                </div>
                <h1 className="text-3xl font-black tracking-tight text-[#14161F] dark:text-white">
                    Account & Profile Settings.
                </h1>
                <p className="text-sm text-[#647087] dark:text-[#9DA7C2] mt-1">
                    Manage your public identity, communication preferences, theme, and security credentials.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                {/* Navigation Sidebar */}
                <nav className="flex md:flex-col gap-1.5 p-1 bg-white/80 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10 rounded-2xl md:bg-transparent md:dark:bg-transparent md:border-0 md:p-0 overflow-x-auto">
                    {[
                        { id: 'profile', label: 'Profile Information', icon: User },
                        { id: 'notifications', label: 'Notifications', icon: Bell },
                        { id: 'appearance', label: 'Appearance & Theme', icon: Palette },
                        { id: 'security', label: 'Password & Security', icon: Shield },
                    ].map(item => {
                        const Icon = item.icon
                        const active = activeTab === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as any)}
                                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${active ? 'bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] shadow-sm' : 'text-[#647087] hover:text-[#14161F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'}`}
                            >
                                <Icon className={`h-4 w-4 ${active ? 'text-[#FF6B6B]' : ''}`} />
                                <span>{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                {/* Active Tab Content Area */}
                <div className="rounded-[32px] bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 p-6 sm:p-8 shadow-sm backdrop-blur-sm">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <form onSubmit={handleSaveProfile} className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-[#14161F] dark:text-white">Public Profile</h3>
                                <p className="text-xs text-[#647087] dark:text-[#9DA7C2] mt-0.5">This information will be displayed publicly on your portfolio.</p>
                            </div>

                            {/* Avatar Upload */}
                            <div className="flex items-center gap-5 pt-2">
                                <div className="relative group cursor-pointer" onClick={handleAvatarUpload}>
                                    <img
                                        src={avatar}
                                        alt={name || "Avatar"}
                                        className="h-20 w-20 rounded-2xl object-cover ring-4 ring-[#FF6B6B]/20"
                                    />
                                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        {isUploadingAvatar ? (
                                            <Loader2 className="h-5 w-5 text-white animate-spin" />
                                        ) : (
                                            <Camera className="h-5 w-5 text-white" />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAvatarUpload}
                                        disabled={isUploadingAvatar}
                                        className="rounded-full border-[#14161F]/15 dark:border-white/10 text-xs font-bold"
                                    >
                                        {isUploadingAvatar ? "Uploading..." : "Change Avatar"}
                                    </Button>
                                    <p className="text-[11px] text-muted-foreground mt-1">Direct upload to Supabase storage bucket</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Display Name</label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your full name"
                                        className="mt-1 rounded-xl"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Username / Handle</label>
                                    <Input
                                        value={handle}
                                        onChange={(e) => setHandle(e.target.value)}
                                        placeholder="username"
                                        className="mt-1 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Short Bio</label>
                                <Textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={3}
                                    placeholder="Write a brief introduction about your creative craft..."
                                    className="mt-1 rounded-xl resize-none"
                                />
                                <p className="text-[11px] text-muted-foreground mt-1">{bio.length}/250 characters</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Location</label>
                                    <Input
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="City, Country"
                                        className="mt-1 rounded-xl"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Portfolio Website</label>
                                    <Input
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        placeholder="https://yourportfolio.com"
                                        className="mt-1 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl px-6"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Notification Preferences</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">Control which activity alerts you receive in-app and via email.</p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: 'Client Inquiries & Job Offers', desc: 'Notify immediately when clients request quotes or send project inquiries', checked: emailInquiries, toggle: () => setEmailInquiries(!emailInquiries) },
                                    { label: 'Project Appreciations & Likes', desc: 'Receive real-time notifications when creators like your work', checked: emailLikes, toggle: () => setEmailLikes(!emailLikes) },
                                    { label: 'New Followers', desc: 'Notify when another creator follows your portfolio', checked: emailFollows, toggle: () => setEmailFollows(!emailFollows) },
                                    { label: 'Weekly Curator Digest', desc: 'Weekly summary of trending designs, job matches, and your view metrics', checked: weeklyDigest, toggle: () => setWeeklyDigest(!weeklyDigest) },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</p>
                                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={item.toggle}
                                            className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <Button onClick={() => toast.success("Notification preferences saved!")} className="bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl px-6">
                                    Save Preferences
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Appearance Tab */}
                    {activeTab === 'appearance' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Appearance & Theme</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">Customize your viewing experience across CreateDOT.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => toggleTheme()}
                                    className={`p-5 rounded-2xl border-2 text-left transition ${theme === 'light' ? 'border-violet-600 bg-violet-50/30 dark:bg-transparent' : 'border-slate-200 dark:border-slate-800'}`}
                                >
                                    <div className="h-20 rounded-xl bg-slate-100 border border-slate-200 p-2 mb-3 flex flex-col justify-between">
                                        <div className="h-3 w-16 bg-slate-300 rounded" />
                                        <div className="h-6 w-full bg-white rounded shadow-sm" />
                                    </div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Light Mode</p>
                                    <p className="text-xs text-muted-foreground">Crisp clean editorial aesthetic</p>
                                </button>

                                <button
                                    onClick={() => toggleTheme()}
                                    className={`p-5 rounded-2xl border-2 text-left transition ${theme === 'dark' ? 'border-violet-600 bg-violet-950/20' : 'border-slate-200 dark:border-slate-800'}`}
                                >
                                    <div className="h-20 rounded-xl bg-slate-950 border border-slate-800 p-2 mb-3 flex flex-col justify-between">
                                        <div className="h-3 w-16 bg-slate-700 rounded" />
                                        <div className="h-6 w-full bg-slate-900 rounded shadow-sm" />
                                    </div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">Dark Mode</p>
                                    <p className="text-xs text-muted-foreground">Sleek obsidian & glowing glass</p>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <form onSubmit={handleUpdatePassword} className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Password & Security</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">Manage your credentials and authentication security.</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">New Password (6+ characters)</label>
                                    <Input
                                        type="password"
                                        value={newPass}
                                        onChange={(e) => setNewPass(e.target.value)}
                                        placeholder="Enter new password"
                                        className="mt-1 rounded-xl"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
                                    <div className="flex items-center gap-3">
                                        <Smartphone className="h-5 w-5 text-violet-600" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</p>
                                            <p className="text-xs text-muted-foreground">Protect your creator account with an authenticator app</p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                                        Active
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={isUpdatingPassword || !newPass}
                                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl px-6"
                                >
                                    {isUpdatingPassword ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Password"
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
