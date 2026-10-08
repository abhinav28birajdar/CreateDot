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
  const { data: authData, error: authError } = await supabase.auth.getUser()
  const user = authData.user
  if (authError) throw authError

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

  let uploadedCoverUrl = coverUrl
  if (input.cover_image instanceof File) {
    uploadedCoverUrl = await uploadFile(input.cover_image, 'covers')
  }

  const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        title: input.title,
        slug,
        description: input.description,
        case_study: input.case_study || null,
        cover_image: uploadedCoverUrl || null,
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

  if (projectError) throw projectError
  if (!project) throw new Error('Project was not created')

  return {
    ...project,
    user: (project as any).profiles || null,
  } as Project
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
