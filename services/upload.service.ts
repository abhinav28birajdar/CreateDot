import { createClient } from '@/lib/supabase/client'

export interface UploadResult {
  url: string
  thumbnailUrl?: string
}

export function extractDominantColor(fileUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const defaultColors = ['#576A8F', '#4ECDC4', '#FF6B6B', '#B7BDF7', '#22C55E', '#8B5CF6']
    const randomColor = defaultColors[Math.floor(Math.random() * defaultColors.length)] || '#576A8F'

    if (typeof window === 'undefined') {
      return resolve(randomColor)
    }

    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = fileUrl
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return resolve(randomColor)
        canvas.width = 50
        canvas.height = 50
        ctx.drawImage(img, 0, 0, 50, 50)
        const imgData = ctx.getImageData(0, 0, 50, 50).data
        let r = 0, g = 0, b = 0, count = 0
        for (let i = 0; i < imgData.length; i += 16) {
          r += imgData[i] ?? 0
          g += imgData[i + 1] ?? 0
          b += imgData[i + 2] ?? 0
          count++
        }
        r = Math.floor(r / count)
        g = Math.floor(g / count)
        b = Math.floor(b / count)
        const hex = '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
        resolve(hex)
      } catch {
        resolve(randomColor)
      }
    }
    img.onerror = () => resolve(randomColor)
  })
}

export async function uploadFile(file: File, folder = 'projects'): Promise<string> {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
  const filePath = `${fileName}`

  // Choose bucket based on folder name
  const validBuckets = ['covers', 'projects', 'avatars', 'assets']
  const bucketName = validBuckets.includes(folder) ? folder : 'projects'

  const { error } = await supabase.storage.from(bucketName).upload(filePath, file, {
    cacheControl: '31536000',
    upsert: false,
  })

  if (error) {
    // If bucket error, fallback to projects bucket
    const fallbackRes = await supabase.storage.from('projects').upload(filePath, file, {
      cacheControl: '31536000',
      upsert: false,
    })
    if (fallbackRes.error) {
      if (typeof window !== 'undefined') {
        return URL.createObjectURL(file)
      }
      throw fallbackRes.error
    }
    const { data: { publicUrl } } = supabase.storage.from('projects').getPublicUrl(filePath)
    return publicUrl
  }

  const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(filePath)
  return publicUrl
}
