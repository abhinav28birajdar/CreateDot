"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
  url?: string | null
  src?: string | null
  alt?: string
  size?: "sm" | "md" | "lg"
  onError?: React.ReactEventHandler<HTMLImageElement>
}

function Avatar({ className, url, src, alt, size = "md", onError, ...props }: AvatarProps) {
  const sizeClass = size === "sm" ? "size-6" : size === "lg" ? "size-12" : "size-8"
  const imageSrc = url ?? src

  return (
    <AvatarPrimitive.Root
      className={cn(`relative flex ${sizeClass} shrink-0 overflow-hidden rounded-full`, className)}
      {...props}
    >
      {imageSrc ? (
        <AvatarPrimitive.Image src={imageSrc} alt={alt ?? "User avatar"} className={cn("aspect-square size-full")} onError={onError} />
      ) : (
        <AvatarPrimitive.Fallback className={cn("bg-muted flex size-full items-center justify-center rounded-full")}>?</AvatarPrimitive.Fallback>
      )}
    </AvatarPrimitive.Root>
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image className={cn("aspect-square size-full", className)} {...props} />
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn("bg-muted flex size-full items-center justify-center rounded-full", className)}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
