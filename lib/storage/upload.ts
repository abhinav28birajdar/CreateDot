import { createClient } from "@/lib/supabase/client"

export async function uploadFile(file: File, bucket: string, path: string) {
    const supabase = createClient()
    return await supabase.storage.from(bucket).upload(path, file)
}
