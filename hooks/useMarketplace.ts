"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { useRealtimeSubscription } from "./useRealtime"
import { toast } from "sonner"
import type { Database } from "@/types/database"

export type MarketplaceProduct = Database["public"]["Tables"]["marketplace_products"]["Row"] & {
  profiles?: Database["public"]["Tables"]["profiles"]["Row"] | null
  user?: Database["public"]["Tables"]["profiles"]["Row"] | null
}

export interface UseMarketplaceOptions {
  category?: string
  search?: string
}

export function useMarketplace(options: UseMarketplaceOptions = {}) {
  const { category, search } = options
  const { user } = useAuth()
  const [products, setProducts] = useState<MarketplaceProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      let query = supabase
        .from("marketplace_products")
        .select(`
          *,
          profiles:user_id (id, username, full_name, avatar_url, is_verified)
        `)
        .order("created_at", { ascending: false })

      if (category && category !== "All" && category !== "all") {
        query = query.ilike("category", `%${category}%`)
      }

      if (search && search.trim()) {
        const term = search.trim()
        query = query.or(`title.ilike.%${term}%,description.ilike.%${term}%,category.ilike.%${term}%`)
      }

      const { data, error: queryError } = await query

      if (queryError) throw queryError

      const formatted = (data || []).map((p: any) => ({
        ...p,
        user: p.profiles || null,
      }))

      setProducts(formatted)
    } catch (err: any) {
      console.warn("Error fetching marketplace products:", err)
      setError(err?.message || "Failed to load marketplace products")
    } finally {
      setIsLoading(false)
    }
  }, [category, search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Live real-time subscription on marketplace_products
  useRealtimeSubscription({
    table: "marketplace_products",
    onInsert: async (newRecord) => {
      if (newRecord.user_id) {
        const { data: prof } = await supabase
          .from("profiles")
          .select("id, username, full_name, avatar_url, is_verified")
          .eq("id", newRecord.user_id)
          .single()

        const fullProduct: MarketplaceProduct = {
          ...newRecord,
          profiles: prof || null,
          user: prof || null,
        }

        setProducts((prev) => [fullProduct, ...prev.filter((p) => p.id !== fullProduct.id)])
      }
    },
    onUpdate: (updatedRecord) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedRecord.id ? { ...p, ...updatedRecord } : p))
      )
    },
    onDelete: (deletedRecord) => {
      setProducts((prev) => prev.filter((p) => p.id !== deletedRecord.id))
    },
  })

  // Create product
  const createProduct = async (input: {
    title: string
    category: string
    price: number
    originalPrice?: number
    format: string
    description: string
    coverImage: string
    previewImages?: string[]
  }) => {
    if (!user) {
      toast.error("Please sign in to list assets on the Marketplace")
      return { error: new Error("Unauthenticated") }
    }

    setIsSubmitting(true)

    try {
      const { data, error: insertError } = await supabase
        .from("marketplace_products")
        .insert({
          user_id: user.id,
          title: input.title,
          category: input.category,
          price: input.price,
          original_price: input.originalPrice || null,
          format: input.format,
          description: input.description,
          cover_image: input.coverImage,
          preview_images: input.previewImages || [],
          is_featured: true,
        })
        .select(`
          *,
          profiles:user_id (id, username, full_name, avatar_url, is_verified)
        `)
        .single()

      if (insertError) throw insertError

      if (data) {
        const fullProduct: MarketplaceProduct = {
          ...data,
          user: (data as any).profiles || null,
        }
        setProducts((prev) => [fullProduct, ...prev])
      }

      toast.success("Asset listed on the Marketplace!")
      return { error: null, data }
    } catch (err: any) {
      toast.error("Failed to list product", { description: err.message })
      return { error: err }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    products,
    isLoading,
    isSubmitting,
    error,
    createProduct,
    refetch: fetchProducts,
    isEmpty: !isLoading && products.length === 0,
  }
}

export default useMarketplace
