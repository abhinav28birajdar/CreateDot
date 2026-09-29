"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Database } from "@/types/database"
import { Loader2, Folder } from "lucide-react"
import { ProjectCard } from "./project-card"
import { Button } from "@/components/ui/button"

type Project = Database['public']['Tables']['projects']['Row']

export function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function loadProjects() {
            // In a real app, we filter by current user
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                setLoading(false)
                return
            }

            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('user_id', user.id)
                .order('updated_at', { ascending: false })

            if (data) {
                setProjects(data)
            }
            setLoading(false)
        }

        loadProjects()
    }, [supabase])

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    const fallbackProjects: Project[] = [
        {
            id: 'proj-demo-1',
            name: 'QuantumPay — NextGen AI Banking App',
            description: 'Autonomous financial assistant with dark mode glassmorphism interface and micro-interactions.',
            cover_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
            user_id: 'u1',
            status: 'completed',
            visibility: 'public',
            is_collaborative: false,
            start_date: null,
            end_date: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            id: 'proj-demo-2',
            name: 'Sphere 3D — Geometric Spatial Studio',
            description: 'Interactive 3D geometry engine built for web experiences and AR/VR spatial devices.',
            cover_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
            user_id: 'u1',
            status: 'in_progress',
            visibility: 'public',
            is_collaborative: false,
            start_date: null,
            end_date: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            id: 'proj-demo-3',
            name: 'Nova Design System — Tokens & Multi-brand',
            description: 'Component architecture with variable color modes, semantic tokens, and React parity.',
            cover_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
            user_id: 'u1',
            status: 'completed',
            visibility: 'public',
            is_collaborative: false,
            start_date: null,
            end_date: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
    ]

    const displayProjects = projects.length > 0 ? projects : fallbackProjects

    return (
        <div className="space-y-6">
            {projects.length === 0 && (
                <div className="flex items-center justify-between p-4 rounded-2xl bg-violet-50/60 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-900/40 text-xs">
                    <span className="font-semibold text-violet-700 dark:text-violet-300">
                        ⚡ Showing sample creator projects. Publish your own work to showcase it here!
                    </span>
                    <Button asChild size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl h-8 px-3">
                        <Link href="/upload">Upload Work</Link>
                    </Button>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    )
}
