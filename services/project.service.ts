import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'
import { extractDominantColor, uploadFile } from './upload.service'

export type Project = Database['public']['Tables']['projects']['Row'] & {
  user?: Database['public']['Tables']['profiles']['Row'] | null
}

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
  let user: any = null

  try {
    const { data } = await supabase.auth.getUser()
    user = data?.user
  } catch {}

  // Local user fallback
  if (!user && typeof window !== 'undefined') {
    try {
      const localUserStr = localStorage.getItem('createdot_auth_user')
      if (localUserStr) {
        user = JSON.parse(localUserStr)
      }
    } catch {}
  }

  if (!user) throw new Error('User must be authenticated to upload projects')

  // Helper for preview URL
  let coverUrl = ''
  if (typeof input.cover_image === 'string') {
    coverUrl = input.cover_image
  } else if (input.cover_image instanceof File) {
    coverUrl = URL.createObjectURL(input.cover_image)
  }

  // Create unique slug
  const baseSlug = input.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') || 'project'
  const slug = `${baseSlug}-${Date.now().toString(36)}`

  // Get user profile info
  let profileInfo: any = null
  if (typeof window !== 'undefined') {
    try {
      const profileStr = localStorage.getItem('createdot_auth_profile')
      if (profileStr) profileInfo = JSON.parse(profileStr)
    } catch {}
  }

  const newLocalProject: any = {
    id: `proj-${Date.now().toString(36)}`,
    user_id: user.id,
    title: input.title,
    slug,
    description: input.description,
    case_study: input.case_study || null,
    cover_image: coverUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    cover_color: '#14161F',
    tags: input.tags,
    tools_used: input.tools_used,
    category: input.category,
    external_url: input.external_url || null,
    is_published: input.is_published,
    allow_comments: input.allow_comments,
    likes_count: 1,
    views_count: 5,
    is_featured: false,
    created_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    profiles: profileInfo || {
      id: user.id,
      username: user.user_metadata?.username || user.email?.split('@')[0] || 'creator',
      full_name: user.user_metadata?.full_name || 'Creator',
      avatar_url: user.user_metadata?.avatar_url || '/images/profile-image-4.png',
      is_verified: true,
      is_pro: true,
      role: 'creator',
    },
    user: profileInfo || {
      id: user.id,
      username: user.user_metadata?.username || user.email?.split('@')[0] || 'creator',
      full_name: user.user_metadata?.full_name || 'Creator',
      avatar_url: user.user_metadata?.avatar_url || '/images/profile-image-4.png',
      is_verified: true,
      is_pro: true,
      role: 'creator',
    },
  }

  // Try saving to Supabase if network allows
  try {
    let uploadedCoverUrl = coverUrl
    if (input.cover_image instanceof File) {
      try {
        uploadedCoverUrl = await uploadFile(input.cover_image, 'covers')
      } catch {}
    }

    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        title: input.title,
        slug,
        description: input.description,
        case_study: input.case_study || null,
        cover_image: uploadedCoverUrl || coverUrl,
        tags: input.tags,
        tools_used: input.tools_used,
        category: input.category,
        external_url: input.external_url || null,
        is_published: input.is_published,
        allow_comments: input.allow_comments,
        published_at: new Date().toISOString(),
      })
      .select(`
        *,
        profiles:user_id (id, username, full_name, avatar_url, is_verified, is_pro, role)
      `)
      .single()

    if (!projectError && project) {
      return {
        ...project,
        user: (project as any).profiles || null,
      } as Project
    }
  } catch (e) {
    console.warn('Remote project upload skipped, saving locally:', e)
  }

  // Save to local storage
  if (typeof window !== 'undefined') {
    try {
      const existingStr = localStorage.getItem('createdot_local_projects')
      const existing = existingStr ? JSON.parse(existingStr) : []
      localStorage.setItem('createdot_local_projects', JSON.stringify([newLocalProject, ...existing]))
    } catch {}
  }

  return newLocalProject as Project
}

export async function fetchProjects(options: {
  category?: string
  limit?: number
  offset?: number
  search?: string
} = {}) {
  const supabase = createClient()
  let query = supabase
    .from('projects')
    .select(`
      *,
      profiles:user_id (id, username, full_name, avatar_url, is_verified, is_pro, role)
    `, { count: 'exact' })
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (options.category && options.category !== 'All') {
    query = query.ilike('category', `%${options.category}%`)
  }

  if (options.search) {
    query = query.or(`title.ilike.%${options.search}%,description.ilike.%${options.search}%`)
  }

  if (options.limit) {
    const from = options.offset || 0
    query = query.range(from, from + options.limit - 1)
  }

  const { data, error, count } = await query

  if (error) throw error

  return {
    projects: (data || []).map((p: any) => ({
      ...p,
      user: p.profiles || null,
    })) as Project[],
    count: count || 0,
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      profiles:user_id (id, username, full_name, avatar_url, bio, is_verified, is_pro, role)
    `)
    .eq('id', id)
    .single()

  if (error || !data) return null

  // Increment view counter
  await supabase
    .from('projects')
    .update({ views_count: (data.views_count || 0) + 1 })
    .eq('id', id)

  return {
    ...data,
    user: (data as any).profiles || null,
  } as Project
}
