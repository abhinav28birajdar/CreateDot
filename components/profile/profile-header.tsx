"use client"

import { Button } from "@/components/ui/button"
import { Database } from "@/types/database"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Link as LinkIcon, Twitter, Instagram, Globe } from "lucide-react"

type Profile = Database['public']['Tables']['profiles']['Row']

export function ProfileHeader({ profile, isOwnProfile }: { profile: Profile, isOwnProfile: boolean }) {
    return (
        <div className="bg-background border-b pb-8">
            {/* Banner */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-purple-500 to-pink-500 w-full relative">
                {profile.banner_url && (
                    <img src={profile.banner_url} alt="Banner" className="w-full h-full object-cover" />
                )}
            </div>

            <div className="container px-4">
                <div className="relative -mt-20 mb-6 flex flex-col md:flex-row items-end md:items-end gap-6">
                    <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-lg">
                        <AvatarImage src={profile.avatar_url || ''} />
                        <AvatarFallback className="text-4xl">{profile.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 pb-2 text-center md:text-left">
                        <h1 className="text-3xl font-bold">{profile.full_name || profile.username}</h1>
                        <p className="text-muted-foreground text-lg">@{profile.username}</p>
                        {profile.title && <p className="font-medium mt-1">{profile.title}</p>}
                    </div>

                    <div className="flex gap-3 pb-4 w-full md:w-auto justify-center md:justify-end">
                        {isOwnProfile ? (
                            <Button variant="outline">Edit Profile</Button>
                        ) : (
                            <>
                                <Button variant="outline">Message</Button>
                                <Button>Follow</Button>
                                {profile.is_hiring && <Button variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Hire Me</Button>}
                            </>
                        )}
                    </div>
                </div>

                <div className="max-w-3xl space-y-4">
                    {profile.bio && <p className="text-base leading-relaxed">{profile.bio}</p>}

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {profile.location && (
                            <div className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {profile.location}
                            </div>
                        )}
                        {profile.website && (
                            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-foreground">
                                <LinkIcon className="mr-1 h-4 w-4" />
                                {profile.website}
                            </a>
                        )}
                        {/* Socials placeholder - in real app would verify existence */}
                        <div className="flex gap-3 ml-auto">
                            {profile.twitter && <Twitter className="h-4 w-4 cursor-pointer hover:text-blue-400" />}
                            {profile.instagram && <Instagram className="h-4 w-4 cursor-pointer hover:text-pink-600" />}
                            {profile.dribbble && <Globe className="h-4 w-4 cursor-pointer hover:text-pink-500" />}
                        </div>
                    </div>

                    <div className="flex gap-8 border-t pt-4 mt-6">
                        <div className="text-center md:text-left">
                            <span className="font-bold block text-lg">{profile.followers_count}</span>
                            <span className="text-muted-foreground text-sm">Followers</span>
                        </div>
                        <div className="text-center md:text-left">
                            <span className="font-bold block text-lg">{profile.following_count}</span>
                            <span className="text-muted-foreground text-sm">Following</span>
                        </div>
                        <div className="text-center md:text-left">
                            <span className="font-bold block text-lg">{profile.likes_count}</span>
                            <span className="text-muted-foreground text-sm">Likes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
