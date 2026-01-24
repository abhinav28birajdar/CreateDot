import { createClient } from "@/lib/supabase/client"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { notFound } from "next/navigation"

export default async function ProfilePage({ params }: { params: { username: string } }) {
    // @ts-ignore
    const username = params.username
    const supabase = createClient()

    // Fetch profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()

    if (!profile && username !== 'user') { // 'user' is fallback fallback
        // In real app we 404
        // notFound()
    }

    // Mock profile if not found for demo purposes or strictly enforce
    const displayProfile = profile || {
        username: username,
        full_name: username.charAt(0).toUpperCase() + username.slice(1),
        avatar_url: null,
        banner_url: null,
        bio: "This is a creator on CreatorFlow.",
        followers_count: 0,
        following_count: 0,
        likes_count: 0,
        is_hiring: false,
        title: "Creator"
    }

    const { data: { user } } = await supabase.auth.getUser()
    const isOwnProfile = user?.id === displayProfile.id

    return (
        <div className="min-h-screen bg-background">
            {/* @ts-ignore */}
            <ProfileHeader profile={displayProfile} isOwnProfile={isOwnProfile} />
            <ProfileTabs />
        </div>
    )
}
