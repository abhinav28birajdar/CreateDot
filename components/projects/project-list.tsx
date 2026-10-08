"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Database } from "@/types/database"
import { Loader2, Folder, Plus } from "lucide-react"
import { ProjectCard } from "./project-card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

type Project = Database['public']['Tables']['projects']['Row']

export function ProjectList() {
    const { user } = useAuth()
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadProjects() {
            if (!user) {
                setLoading(false)
                return
            }

            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('updated_at', { ascending: false })

                if (data) {
                    setProjects(data)
                }
            } catch (err) {
                console.warn("Failed to load user projects:", err)
            } finally {
                setLoading(false)
            }
        }

        loadProjects()
    }, [user])

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#FF6B6B]" />
            </div>
        )
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-16 bg-white/70 dark:bg-white/[0.03] rounded-3xl border border-slate-200/80 dark:border-white/10 p-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center mx-auto">
                    <Folder className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold">No projects uploaded yet</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Upload your first design study or portfolio project to display it here.
                </p>
                <Button asChild size="sm" className="bg-[#FF6B6B] hover:bg-[#F35555] text-white rounded-full font-bold px-6">
                    <Link href="/upload">
                        <Plus className="h-4 w-4 mr-1.5" />
                        Upload Project
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}
