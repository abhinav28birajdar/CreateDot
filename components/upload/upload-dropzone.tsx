"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, FileImage } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface UploadDropzoneProps {
    onFileSelect: (file: File) => void
    previewUrl: string | null
    setPreviewUrl: (url: string | null) => void
}

export function UploadDropzone({ onFileSelect, previewUrl, setPreviewUrl }: UploadDropzoneProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file) {
            onFileSelect(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }, [onFileSelect, setPreviewUrl])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
            'video/*': ['.mp4']
        },
        maxFiles: 1
    })

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation()
        setPreviewUrl(null)
    }

    if (previewUrl) {
        return (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-muted group">
                <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                <button
                    onClick={removeFile}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <div
            {...getRootProps()}
            className={cn(
                "border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors min-h-[300px]",
                isDragActive ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
            )}
        >
            <input {...getInputProps()} />
            <div className="bg-muted p-4 rounded-full mb-4">
                <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Drag and drop your work</h3>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <p className="text-xs text-muted-foreground/60">
                High resolution images (png, jpg, gif) or videos (mp4) <br />
                Max size: 10MB
            </p>
        </div>
    )
}
