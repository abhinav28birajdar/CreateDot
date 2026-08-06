import type { Metadata } from "next"
import { UploadForm } from "@/components/upload/upload-form"

export const metadata: Metadata = {
    title: "Upload - CreateDOT",
    description: "Share your work with the world",
}

export default function UploadPage() {
    return (
        <div className="container py-8 max-w-5xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Upload new shot</h1>
            </div>
            <UploadForm />
        </div>
    )
}
