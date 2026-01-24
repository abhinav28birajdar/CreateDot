import { createClient } from "@/lib/supabase/client"

export async function fetchShots(page = 1, limit = 20) {
    const supabase = createClient()
    const from = (page - 1) * limit
    const to = from + limit - 1

    return await supabase
        .from('shots')
        .select('*, profiles(*)')
        .order('created_at', { ascending: false })
        .range(from, to)
}
