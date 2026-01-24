"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Database } from "@/types/database"
import { Loader2, Folder } from "lucide-react"
import { ProjectCard } from "./project-card"

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
    }, [])

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border rounded-lg border-dashed bg-muted/50">
                <div className="bg-background p-4 rounded-full mb-4">
                    <Folder className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No projects yet</h3>
                <p className="text-muted-foreground mb-4">Create your first project to get started.</p>
                <Button variant="outline" asChild>
                    <Link href="/projects/new">Create Project</Link>
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
