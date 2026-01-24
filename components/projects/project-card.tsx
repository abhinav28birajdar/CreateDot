"use client"

import Link from "next/link"
import { Database } from "@/types/database"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

type Project = Database['public']['Tables']['projects']['Row']

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Card className="group hover:shadow-md transition-shadow">
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <CardTitle className="text-lg font-semibold truncate">
                            <Link href={`/projects/${project.id}`} className="hover:underline">
                                {project.name}
                            </Link>
                        </CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 h-20">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description || "No description"}
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {new Date(project.updated_at).toLocaleDateString()}
                </div>
                <Badge variant={project.status === 'completed' ? 'secondary' : 'default'} className="uppercase text-[10px]">
                    {project.status}
                </Badge>
            </CardFooter>
        </Card>
    )
}
