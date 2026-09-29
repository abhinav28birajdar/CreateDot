import type { Metadata } from 'next'
import { ProjectUploadForm } from '@/components/project/ProjectUploadForm'

export const metadata: Metadata = {
    title: 'Publish Project - CreateDOT',
    description: 'Showcase your creative work to the world',
}

export default function UploadPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8">
            <ProjectUploadForm />
        </div>
    )
}
