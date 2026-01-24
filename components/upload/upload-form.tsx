"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UploadDropzone } from "./upload-dropzone"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().optional(),
    tags: z.string().optional(),
})

export function UploadForm() {
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            tags: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!file) {
            toast.error("Please upload an image")
            return
        }

        setUploading(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                toast.error("You must be logged in")
                return
            }

            // 1. Upload File
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${user.id}/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('shots')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('shots')
                .getPublicUrl(filePath)

            // 3. Create Shot Record
            const { error: dbError } = await supabase
                .from('shots')
                .insert({
                    title: values.title,
                    description: values.description,
                    cover_url: publicUrl,
                    user_id: user.id,
                    media_type: file.type.startsWith('video') ? 'video' : 'image',
                    tags: values.tags ? values.tags.split(',').map(t => t.trim()) : [],
                    visibility: 'public'
                })

            if (dbError) throw dbError

            toast.success("Shot uploaded successfully!")
            router.push('/feed')

        } catch (error: any) {
            toast.error("Error uploading shot", { description: error.message })
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8">
            <div>
                <UploadDropzone
                    onFileSelect={setFile}
                    previewUrl={previewUrl}
                    setPreviewUrl={setPreviewUrl}
                />
            </div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Give your shot a name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell us about your process..." className="min-h-[120px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ui, web, mobile (comma separated)" {...field} />
                                    </FormControl>
                                    <FormDescription>Separate tags with commas</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-4 flex justify-end space-x-4">
                            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" disabled={uploading}>
                                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Publish Shot
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
