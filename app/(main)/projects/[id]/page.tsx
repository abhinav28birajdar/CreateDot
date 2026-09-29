import { ProjectDetailView } from '@/components/project/ProjectDetailView'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ProjectsPage({ params }: PageProps) {
    const { id } = await params
    return <ProjectDetailView id={id} />
}
