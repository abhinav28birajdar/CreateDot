import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProjectList } from "@/components/projects/project-list"

export const metadata: Metadata = {
    title: "Projects - CreatorFlow",
    description: "Manage your projects",
}

export default function ProjectsPage() {
    return (
        <div className="container py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground">Manage and collaborate on your creative projects.</p>
                </div>
                <Button asChild>
                    <Link href="/projects/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Project
                    </Link>
                </Button>
            </div>
            <ProjectList />
        </div>
    )
}
