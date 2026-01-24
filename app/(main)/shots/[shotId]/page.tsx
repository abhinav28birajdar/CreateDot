import { createClient } from "@/lib/supabase/client"
import { ShotDetail } from "@/components/shots/shot-detail"
import { notFound } from "next/navigation"

export default async function ShotPage({ params }: { params: { shotId: string } }) {
    // Note: params are now async in latest Next.js, but standard way for 14.x is direct access or await depending on config
    // For basic 14 server component:
    const resolvedParams = await Promise.resolve(params) // Ensure async handling compatibility
    const shotId = resolvedParams.shotId
    const supabase = createClient()

    // Fetch shot data
    const { data: shot } = await supabase
        .from('shots')
        .select('*, profiles(*)')
        .eq('id', shotId)
        .single()

    if (!shot) {
        notFound()
    }

    return (
        <div className="bg-muted/10 min-h-screen pb-10">
            {/* @ts-ignore - Supabase type refinement */}
            <ShotDetail shot={shot} />
        </div>
    )
}
