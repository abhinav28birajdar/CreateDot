import { createClient } from '@/lib/supabase/client'
import { Project, ProjectAsset } from '@/types/database.types'
import { extractDominantColor, uploadFile } from './upload.service'

export interface ProjectCreateInput {
    title: string
    description: string
    case_study?: string
    cover_image: File | string
    assets: (File | string)[]
    tags: string[]
    tools_used: string[]
    category: string
    external_url?: string
    is_published: boolean
    allow_comments: boolean
}

export async function createProject(input: ProjectCreateInput): Promise<Project> {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User must be authenticated to upload projects')

    // Fetch internal user ID
    let { data: profile } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', user.id)
        .single()

    if (!profile) {
        // Create user profile on the fly if missing
        const { data: newProfile } = await supabase
            .from('users')
            .insert({
                auth_id: user.id,
                email: user.email!,
                name: user.email?.split('@')[0] || 'Creator',
                username: (user.email?.split('@')[0] || 'creator') + '_' + Math.floor(Math.random() * 1000),
                role: 'creator'
            })
            .select()
            .single()
        profile = newProfile
    }

    // Upload cover image
    let coverUrl = ''
    if (typeof input.cover_image === 'string') {
        coverUrl = input.cover_image
    } else {
        coverUrl = await uploadFile(input.cover_image, 'covers')
    }

    // Extract color
    const dominantColor = await extractDominantColor(coverUrl)

    // Upload asset files
    const assetUrls = await Promise.all(
        input.assets.map(async (asset) => {
            if (typeof asset === 'string') return asset
            return await uploadFile(asset, 'assets')
        })
    )

    // Create unique slug
    const baseSlug = input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'project'
    const slug = `${baseSlug}-${Date.now().toString(36)}`

    // Insert project
    const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
            user_id: profile!.id,
            title: input.title,
            slug,
            description: input.description,
            case_study: input.case_study,
            cover_image: coverUrl,
            cover_color: dominantColor,
            tags: input.tags,
            tools_used: input.tools_used,
            category: input.category,
            external_url: input.external_url,
            is_published: input.is_published,
            allow_comments: input.allow_comments,
            published_at: new Date().toISOString()
        })
        .select(`*, user:users(*)`)
        .single()

    if (projectError) throw projectError

    // Insert project assets
    if (assetUrls.length > 0) {
        await supabase.from('project_assets').insert(
            assetUrls.map((url, index) => ({
                project_id: project.id,
                file_url: url,
                type: url.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image',
                order_index: index
            }))
        )
    }

    // Update projects_count for user
    try {
        await supabase.rpc('increment_projects_count', { u_id: profile!.id })
    } catch {
        // Silently handle if rpc function is optional
    }

    return project as Project
}

export async function fetchProjects(options: {
    category?: string
    sort?: 'trending' | 'new' | 'popular'
    limit?: number
    offset?: number
} = {}) {
    const supabase = createClient()
    const { category, sort = 'trending', limit = 20, offset = 0 } = options

    let query = supabase
        .from('projects')
        .select(`*, user:users(id, name, username, avatar_url, is_verified, is_pro, role, tagline)`)
        .eq('is_published', true)

    if (category && category !== 'All') {
        query = query.ilike('category', `%${category}%`)
    }

    if (sort === 'new') {
        query = query.order('published_at', { ascending: false })
    } else if (sort === 'popular') {
        query = query.order('likes_count', { ascending: false })
    } else {
        query = query.order('score', { ascending: false }).order('published_at', { ascending: false })
    }

    query = query.range(offset, offset + limit - 1)

    const { data, error } = await query
    if (error) throw error
    return (data || []) as Project[]
}

export async function fetchProjectById(id: string): Promise<Project | null> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('projects')
        .select(`
            *,
            user:users(*),
            assets:project_assets(*)
        `)
        .eq('id', id)
        .single()

    if (error) return null

    // Increment views count asynchronously
    try {
        const { error: rpcError } = await supabase.rpc('increment_views', { p_id: id })
        if (rpcError) {
            await supabase.from('projects').update({ views_count: (data.views_count || 0) + 1 }).eq('id', id)
        }
    } catch {
        // Silently ignore
    }

    return data as Project
}
