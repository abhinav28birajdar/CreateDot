"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ShotCard } from "./shot-card"
import { Database } from "@/types/database"
import { Loader2 } from "lucide-react"

type Shot = Database['public']['Tables']['shots']['Row'] & {
    profiles: Database['public']['Tables']['profiles']['Row'] | null
}

export function FeedContainer() {
    const [shots, setShots] = useState<Shot[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function loadShots() {
            const { data, error } = await supabase
                .from('shots')
                .select('*, profiles(*)')
                .order('created_at', { ascending: false })
                .limit(20)

            if (data) {
                setShots(data)
            }
            setLoading(false)
        }

        loadShots()
    }, [])

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    if (shots.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium">No shots found</h3>
                <p className="text-muted-foreground">Follow more creators to see their work here.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shots.map((shot) => (
                <ShotCard key={shot.id} shot={shot} />
            ))}
        </div>
    )
}
