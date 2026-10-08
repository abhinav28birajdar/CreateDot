import { NextResponse, type NextRequest } from 'next/server'
import { requireAuth } from '@/lib/api-response'
import { createClient } from '@supabase/supabase-js'
import { getSupabaseEnv } from '@/lib/supabase/env'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

export async function POST(req: NextRequest) {
    const auth = await requireAuth(req)
    if (!auth.auth) return auth.error

    const formData = await req.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'File must be between 1 byte and 10 MB' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.has(file.type)) {
        return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 })
    }

    const bucket = formData.get('bucket')
    const bucketName = typeof bucket === 'string' && bucket.length > 0 ? bucket : 'project-assets'
    const extension = file.name.split('.').pop()?.toLowerCase() || 'bin'
    const path = `${auth.userId}/${crypto.randomUUID()}.${extension}`
    const { url, anonKey } = getSupabaseEnv()
    const supabase = createClient(url, anonKey, {
        auth: { autoRefreshToken: false, persistSession: false },
        global: { headers: { Authorization: req.headers.get('authorization') as string } },
    })
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false })

    if (error) {
        return NextResponse.json({ error: 'Unable to store file' }, { status: 502 })
    }

    return NextResponse.json({ success: true, path: data.path, bucket: bucketName })
}
