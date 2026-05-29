export default async function EditShotPage({ params }: { params: Promise<{ shotId: string }> }) {
    await params
    return (
        <div className="container py-8">
            <h1 className="text-2xl font-bold mb-6">Edit Shot</h1>
            <div className="p-12 border rounded text-center text-muted-foreground">
                Edit Form Placeholder
            </div>
        </div>
    )
}
