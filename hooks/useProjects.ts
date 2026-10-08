"use client"

import { useState, useEffect, useCallback, useTransition } from "react"
import { supabase } from "@/lib/supabase"
import { useRealtimeSubscription } from "./useRealtime"
import type { Database } from "@/types/database"

export type Project = Database["public"]["Tables"]["projects"]["Row"] & {
  profiles?: Database["public"]["Tables"]["profiles"]["Row"] | null
  user?: Database["public"]["Tables"]["profiles"]["Row"] | null
}

export interface UseProjectsOptions {
  category?: string
  search?: string
  sortBy?: "recent" | "popular" | "trending"
  limit?: number
  userId?: string
}

const FALLBACK_SHOWCASE_PROJECTS: any[] = [
  {
    id: "proj-curated-1",
    title: "QuantumPay — NextGen AI Banking App",
    description: "Autonomous financial assistant with dark mode glassmorphism interface and micro-interactions.",
    category: "UI Design",
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    likes_count: 1840,
    views_count: 14200,
    is_published: true,
    is_featured: true,
    tags: ["fintech", "glassmorphism", "banking"],
    tools_used: ["Figma", "React"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    user_id: "user-abhinav",
    profiles: {
      id: "user-abhinav",
      username: "abhinav",
      full_name: "Abhinav Birajdar",
      avatar_url: "/images/profile-image-4.png",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
    user: {
      id: "user-abhinav",
      username: "abhinav",
      full_name: "Abhinav Birajdar",
      avatar_url: "/images/profile-image-4.png",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
  },
  {
    id: "proj-curated-2",
    title: "Sphere 3D — Spatial Geometry Studio",
    description: "Interactive 3D geometry engine built for web experiences and spatial AR/VR devices.",
    category: "3D & Modeling",
    cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    likes_count: 1420,
    views_count: 9800,
    is_published: true,
    is_featured: true,
    tags: ["3d", "spatial", "geometry"],
    tools_used: ["Blender", "Three.js"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    user_id: "user-elena",
    profiles: {
      id: "user-elena",
      username: "elena_3d",
      full_name: "Elena Rostova",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
    user: {
      id: "user-elena",
      username: "elena_3d",
      full_name: "Elena Rostova",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
  },
  {
    id: "proj-curated-3",
    title: "Komorebi — Organic Tea Identity & Packaging",
    description: "Handcrafted serif typography, textured paper stock packaging, and serene minimalist brand language.",
    category: "Branding",
    cover_image: "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?w=800&auto=format&fit=crop&q=80",
    likes_count: 2150,
    views_count: 16800,
    is_published: true,
    is_featured: true,
    tags: ["branding", "packaging", "tea"],
    tools_used: ["Illustrator", "Photoshop"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    user_id: "user-marcus",
    profiles: {
      id: "user-marcus",
      username: "marcus_design",
      full_name: "Marcus Vance",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
    user: {
      id: "user-marcus",
      username: "marcus_design",
      full_name: "Marcus Vance",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
  },
  {
    id: "proj-curated-4",
    title: "Nebula — Cyberpunk Editorial Lettering",
    description: "Custom display typography exploring neon chrome glyphs, ligatures, and poster layouts.",
    category: "Typography",
    cover_image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    likes_count: 980,
    views_count: 7400,
    is_published: true,
    is_featured: false,
    tags: ["typography", "editorial", "display-font"],
    tools_used: ["Glyphs", "Illustrator"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    user_id: "user-sofia",
    profiles: {
      id: "user-sofia",
      username: "sofia_type",
      full_name: "Sofia Chen",
      avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
    user: {
      id: "user-sofia",
      username: "sofia_type",
      full_name: "Sofia Chen",
      avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
  },
  {
    id: "proj-curated-5",
    title: "Chronos Kinetic — Motion Identity System",
    description: "Algorithmic kinetic title sequences and responsive brand behaviors across 12 screens.",
    category: "Motion & Animation",
    cover_image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    likes_count: 1670,
    views_count: 11200,
    is_published: true,
    is_featured: true,
    tags: ["motion", "animation", "kinetic"],
    tools_used: ["After Effects", "Cinema 4D"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    user_id: "user-alex",
    profiles: {
      id: "user-alex",
      username: "alex_motion",
      full_name: "Alex Thorne",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: false,
      role: "creator",
    },
    user: {
      id: "user-alex",
      username: "alex_motion",
      full_name: "Alex Thorne",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: false,
      role: "creator",
    },
  },
  {
    id: "proj-curated-6",
    title: "Lumina Mobile — Ambient Health Tracker",
    description: "Quiet luxury interface for circadian rhythm and biometric tracking with pastel glass widgets.",
    category: "Mobile Design",
    cover_image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    likes_count: 1310,
    views_count: 8900,
    is_published: true,
    is_featured: false,
    tags: ["mobile", "health", "ios"],
    tools_used: ["Figma", "SwiftUI"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 42).toISOString(),
    user_id: "user-abhinav",
    profiles: {
      id: "user-abhinav",
      username: "abhinav",
      full_name: "Abhinav Birajdar",
      avatar_url: "/images/profile-image-4.png",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
    user: {
      id: "user-abhinav",
      username: "abhinav",
      full_name: "Abhinav Birajdar",
      avatar_url: "/images/profile-image-4.png",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
  },
  {
    id: "proj-curated-7",
    title: "Nordic Minimal — Architectural Monoliths",
    description: "High-contrast geometric architectural study captured during the Scandinavian winter solstice.",
    category: "Photography",
    cover_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    likes_count: 890,
    views_count: 6200,
    is_published: true,
    is_featured: false,
    tags: ["photography", "architecture", "minimalism"],
    tools_used: ["Leica", "Lightroom"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    user_id: "user-elena",
    profiles: {
      id: "user-elena",
      username: "elena_3d",
      full_name: "Elena Rostova",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
    user: {
      id: "user-elena",
      username: "elena_3d",
      full_name: "Elena Rostova",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
  },
  {
    id: "proj-curated-8",
    title: "Aura Design System — Variables & Tokens Kit",
    description: "Scalable component architecture with variable color modes, semantic tokens, and React parity.",
    category: "UI Design",
    cover_image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    likes_count: 2450,
    views_count: 19500,
    is_published: true,
    is_featured: true,
    tags: ["design-system", "tokens", "react"],
    tools_used: ["Figma", "Storybook", "Tailwind"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    user_id: "user-marcus",
    profiles: {
      id: "user-marcus",
      username: "marcus_design",
      full_name: "Marcus Vance",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
    user: {
      id: "user-marcus",
      username: "marcus_design",
      full_name: "Marcus Vance",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
  },
  {
    id: "proj-curated-9",
    title: "Botanica Folklore — Digital Vector Murals",
    description: "Rich botanical illustrations exploring wild flora, medicinal herbs, and surreal ecosystems.",
    category: "Illustration",
    cover_image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    likes_count: 1720,
    views_count: 12400,
    is_published: true,
    is_featured: true,
    tags: ["illustration", "vector", "botanical"],
    tools_used: ["Procreate", "Illustrator"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    user_id: "user-sofia",
    profiles: {
      id: "user-sofia",
      username: "sofia_type",
      full_name: "Sofia Chen",
      avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
    user: {
      id: "user-sofia",
      username: "sofia_type",
      full_name: "Sofia Chen",
      avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
  },
  {
    id: "proj-curated-10",
    title: "Prism WebXR — Spatial Art Gallery",
    description: "Web-first virtual reality pavilion for digital sculptors and generative artists.",
    category: "Web Design",
    cover_image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    likes_count: 1140,
    views_count: 8700,
    is_published: true,
    is_featured: false,
    tags: ["webxr", "spatial", "threejs"],
    tools_used: ["Three.js", "WebAudio"],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 85).toISOString(),
    user_id: "user-abhinav",
    profiles: {
      id: "user-abhinav",
      username: "abhinav",
      full_name: "Abhinav Birajdar",
      avatar_url: "/images/profile-image-4.png",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
    user: {
      id: "user-abhinav",
      username: "abhinav",
      full_name: "Abhinav Birajdar",
      avatar_url: "/images/profile-image-4.png",
      is_verified: true,
      is_pro: true,
      role: "creator",
    },
  },
]

export function useProjects(options: UseProjectsOptions = {}) {
  const { category, search, sortBy = "trending", limit = 30, userId } = options

  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const fetchProjects = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    // Helper to filter and sort fallback projects
    const getFilteredFallback = () => {
      let list = [...FALLBACK_SHOWCASE_PROJECTS]

      // Check if user has uploaded local projects in browser
      if (typeof window !== "undefined") {
        try {
          const localStr = localStorage.getItem("createdot_local_projects")
          if (localStr) {
            const localList = JSON.parse(localStr)
            if (Array.isArray(localList)) {
              list = [...localList, ...list]
            }
          }
        } catch {}
      }

      if (category && category !== "All" && category !== "all") {
        const normCat = category.toLowerCase()
        list = list.filter((p) => {
          const pCat = (p.category || "").toLowerCase()
          return pCat.includes(normCat) || normCat.includes(pCat)
        })
      }

      if (userId) {
        list = list.filter((p) => p.user_id === userId)
      }

      if (search && search.trim()) {
        const term = search.trim().toLowerCase()
        list = list.filter(
          (p) =>
            p.title?.toLowerCase().includes(term) ||
            p.description?.toLowerCase().includes(term) ||
            p.tags?.some((t: string) => t.toLowerCase().includes(term))
        )
      }

      if (sortBy === "popular") {
        list.sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
      } else if (sortBy === "recent") {
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      } else {
        // trending: likes + recency
        list.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0))
      }

      if (limit) {
        list = list.slice(0, limit)
      }

      return list
    }

    try {
      // Race Supabase with 2s timeout so unresolvable Supabase URL never causes UI hang
      const queryPromise = (async () => {
        let query = supabase
          .from("projects")
          .select(`
            *,
            profiles:user_id (
              id,
              username,
              full_name,
              avatar_url,
              is_verified,
              is_pro,
              role
            )
          `)
          .eq("is_published", true)

        if (category && category !== "All" && category !== "all") {
          query = query.ilike("category", `%${category}%`)
        }

        if (userId) {
          query = query.eq("user_id", userId)
        }

        if (search && search.trim()) {
          const term = search.trim()
          query = query.or(`title.ilike.%${term}%,description.ilike.%${term}%`)
        }

        if (sortBy === "popular" || sortBy === "trending") {
          query = query.order("likes_count", { ascending: false }).order("created_at", { ascending: false })
        } else {
          query = query.order("created_at", { ascending: false })
        }

        if (limit) {
          query = query.limit(limit)
        }

        return await query
      })()

      const timeoutPromise = new Promise<{ data: null; error: Error }>((resolve) =>
        setTimeout(() => resolve({ data: null, error: new Error("Network timeout") }), 2000)
      )

      const { data, error: queryError } = await Promise.race([queryPromise, timeoutPromise])

      if (queryError || !data || data.length === 0) {
        // Gracefully use showcase projects without presenting raw fetch error
        const fallback = getFilteredFallback()
        startTransition(() => {
          setProjects(fallback)
        })
      } else {
        const formatted = (data || []).map((p: any) => ({
          ...p,
          user: p.profiles || null,
        }))
        startTransition(() => {
          setProjects(formatted)
        })
      }
    } catch (err: any) {
      console.warn("Using curated fallback showcase projects:", err?.message)
      const fallback = getFilteredFallback()
      startTransition(() => {
        setProjects(fallback)
      })
    } finally {
      setIsLoading(false)
    }
  }, [category, search, sortBy, limit, userId])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Live real-time subscription on projects table
  useRealtimeSubscription({
    table: "projects",
    onInsert: async (newRecord) => {
      if (newRecord.user_id) {
        let prof = null
        try {
          const { data } = await supabase
            .from("profiles")
            .select("id, username, full_name, avatar_url, is_verified, is_pro, role")
            .eq("id", newRecord.user_id)
            .single()
          prof = data
        } catch {}

        const fullProject: Project = {
          ...newRecord,
          profiles: prof || null,
          user: prof || null,
        }

        setProjects((prev) => [fullProject, ...prev.filter((p) => p.id !== fullProject.id)])
      }
    },
    onUpdate: (updatedRecord) => {
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedRecord.id ? { ...p, ...updatedRecord } : p))
      )
    },
    onDelete: (deletedRecord) => {
      setProjects((prev) => prev.filter((p) => p.id !== deletedRecord.id))
    },
  })

  return {
    projects,
    isLoading: isLoading || isPending,
    error,
    refetch: fetchProjects,
    isEmpty: !isLoading && projects.length === 0,
  }
}

export default useProjects

