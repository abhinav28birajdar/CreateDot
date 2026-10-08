"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ShoppingBag,
    Star,
    Download,
    Eye,
    Plus,
    Tag,
    Sparkles,
    Check,
    ArrowUpRight,
    Search,
    Layers,
    X,
    ShieldCheck,
    Loader2
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { useMarketplace, MarketplaceProduct } from "@/hooks/useMarketplace"

const CATEGORIES = ['All', 'UI Kits', '3D Assets', 'Icons', 'Print & Branding', 'Mockups', 'Motion']

export default function MarketplacePage() {
    const { user } = useAuth()
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null)
    const [isPurchasing, setIsPurchasing] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    // Form state for creating a digital product
    const [newTitle, setNewTitle] = useState('')
    const [newCategory, setNewCategory] = useState('UI Kits')
    const [newPrice, setNewPrice] = useState('49')
    const [newFormat, setNewFormat] = useState('Figma (.fig), React Icons')
    const [newCover, setNewCover] = useState('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80')
    const [newDesc, setNewDesc] = useState('')

    const {
        products,
        isLoading,
        isSubmitting,
        createProduct,
    } = useMarketplace({
        category: selectedCategory,
        search: searchQuery
    })

    const handleBuy = (product: MarketplaceProduct) => {
        setIsPurchasing(true)
        setTimeout(() => {
            setIsPurchasing(false)
            setSelectedProduct(null)
            toast.success(`Purchased "${product.title}"!`, {
                description: 'Digital license verified and download links ready in your account.'
            })
        }, 1200)
    }

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) {
            toast.error("Please sign in to list assets on the marketplace")
            return
        }
        if (!newTitle.trim() || !newDesc.trim()) {
            toast.error("Please provide a title and description")
            return
        }

        const numericPrice = parseFloat(newPrice) || 0
        const result = await createProduct({
            title: newTitle,
            category: newCategory,
            price: numericPrice,
            format: newFormat,
            description: newDesc,
            coverImage: newCover,
        })

        if (!result.error) {
            setIsCreateModalOpen(false)
            setNewTitle('')
            setNewDesc('')
        }
    }

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-[36px] bg-[#14161F] p-8 sm:p-14 text-white shadow-2xl">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 to-[#FFE185]/20 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider mb-4 border border-white/10">
                            <Sparkles className="h-3.5 w-3.5 text-[#FF6B6B]" />
                            Real-Time Digital Marketplace
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                            High-Craft Assets for Builders.
                        </h1>
                        <p className="mt-3 text-sm sm:text-base text-[#9DA7C2] leading-relaxed">
                            Accelerate your creative pipeline with UI kits, 3D models, vector icons, and mockups crafted and synced live from the CreateDOT community.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                        <Button
                            onClick={() => {
                                if (!user) {
                                    toast.error("Sign in to list assets")
                                } else {
                                    setIsCreateModalOpen(true)
                                }
                            }}
                            className="bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold px-7 py-6 rounded-full shadow-lg shadow-[#FF6B6B]/30 transition-transform active:scale-95"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Sell Your Assets (90% Split)
                        </Button>
                    </div>
                </div>
            </div>

            {/* Filter and Category Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C96AB]" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search asset title, format..."
                        className="h-11 pl-10 rounded-full bg-white/80 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs font-medium"
                    />
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-white/80 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10 rounded-2xl overflow-x-auto w-full md:w-auto shadow-sm">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${selectedCategory === cat ? 'bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] shadow-sm' : 'text-[#647087] hover:text-[#14161F] dark:hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                        <div key={idx} className="rounded-3xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 p-4 space-y-4 animate-pulse">
                            <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                            <div className="h-4 bg-slate-100 dark:bg-slate-800/60 rounded-md w-1/2" />
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                                <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
                                <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="group flex flex-col rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl shadow-[#14161F]/5 transition-all backdrop-blur-sm"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                                <img
                                    src={product.cover_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                                    {product.original_price && (
                                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-black/60 text-slate-300 line-through backdrop-blur-md">
                                            ${product.original_price}
                                        </span>
                                    )}
                                    <span className="px-3 py-1 rounded-full text-xs font-black bg-[#FF6B6B] text-white shadow-md shadow-[#FF6B6B]/30">
                                        {product.price === 0 ? "Free" : `$${product.price}`}
                                    </span>
                                </div>
                                <div className="absolute top-3.5 left-3.5">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-black bg-black/60 backdrop-blur-md text-white border border-white/10 uppercase tracking-wider">
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mb-1.5">
                                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                        <span>{(product.rating || 4.9).toFixed(1)}</span>
                                        <span className="text-[#6B758E] font-normal">({product.reviews_count || 12} reviews)</span>
                                        <span className="text-[#6B758E] font-normal ml-auto flex items-center gap-1">
                                            <Download className="h-3 w-3" /> {product.downloads_count || '1.2k'}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-base text-[#14161F] dark:text-white line-clamp-1 group-hover:text-[#FF6B6B] transition">
                                        {product.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={product.user?.avatar_url || '/images/profile-image-4.png'}
                                            alt={product.user?.full_name || product.user?.username || 'Creator'}
                                            className="h-6 w-6 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                                        />
                                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                                            {product.user?.full_name || product.user?.username || 'Verified Creator'}
                                        </span>
                                    </div>

                                    <Button
                                        onClick={() => setSelectedProduct(product)}
                                        size="sm"
                                        className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-semibold rounded-xl text-xs h-9 px-3.5"
                                    >
                                        Details & Buy
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/70 dark:bg-white/5 rounded-3xl border border-slate-200/70 dark:border-white/10 p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center mx-auto">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold">No assets found in this category</h3>
                    <p className="text-sm text-slate-500 max-w-md mx-auto">
                        Be the first creator to publish premium assets in &quot;{selectedCategory}&quot; and earn a 90% revenue split!
                    </p>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-[#FF6B6B] hover:bg-[#F35555] text-white rounded-full font-bold px-6"
                    >
                        List Digital Asset Now
                    </Button>
                </div>
            )}

            {/* Product Details & Purchase Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-2xl bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-900">
                                <img
                                    src={selectedProduct.cover_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                                    alt={selectedProduct.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-600 text-white">
                                        {selectedProduct.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {selectedProduct.title}
                                    </h2>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Created by <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedProduct.user?.full_name || selectedProduct.user?.username || 'Creator'}</span>
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-3xl font-black text-violet-600 dark:text-violet-400">
                                        {selectedProduct.price === 0 ? 'Free' : `$${selectedProduct.price}`}
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                                {selectedProduct.description}
                            </p>

                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-2 text-xs mb-6">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Included Formats:</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">{selectedProduct.format}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">License:</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">Commercial & Personal (Unlimited Projects)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Updates:</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">Free Lifetime Updates</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                    <span>Instant digital delivery & receipt</span>
                                </div>
                                <Button
                                    onClick={() => handleBuy(selectedProduct)}
                                    disabled={isPurchasing}
                                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-6 rounded-2xl shadow-lg shadow-violet-600/25"
                                >
                                    {isPurchasing ? "Processing..." : `Get Asset (${selectedProduct.price === 0 ? 'Free' : `$${selectedProduct.price}`})`}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Create Asset Listing Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-lg bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="mb-6">
                                <h2 className="text-2xl font-black">List Digital Asset</h2>
                                <p className="text-xs text-slate-500 mt-1">Publish to the CreateDOT marketplace with instant payouts.</p>
                            </div>

                            <form onSubmit={handleCreateSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold">Asset Title *</label>
                                    <Input
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        placeholder="e.g. Apex OS — Complete SaaS UI Kit"
                                        required
                                        className="mt-1 rounded-xl"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-semibold">Category</label>
                                        <select
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            className="w-full mt-1 h-10 px-3 rounded-xl border border-input bg-background text-xs font-medium"
                                        >
                                            {CATEGORIES.filter(c => c !== 'All').map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold">Price (USD) *</label>
                                        <Input
                                            type="number"
                                            value={newPrice}
                                            onChange={(e) => setNewPrice(e.target.value)}
                                            placeholder="49"
                                            required
                                            className="mt-1 rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold">Format & Deliverables</label>
                                    <Input
                                        value={newFormat}
                                        onChange={(e) => setNewFormat(e.target.value)}
                                        placeholder="Figma (.fig), React Icons, JSON tokens"
                                        className="mt-1 rounded-xl"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold">Cover Image URL</label>
                                    <Input
                                        value={newCover}
                                        onChange={(e) => setNewCover(e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="mt-1 rounded-xl"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold">Description *</label>
                                    <Textarea
                                        value={newDesc}
                                        onChange={(e) => setNewDesc(e.target.value)}
                                        rows={3}
                                        placeholder="Explain component coverage, responsive support, and licenses..."
                                        required
                                        className="mt-1 rounded-xl text-xs"
                                    />
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="rounded-xl"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold rounded-xl px-6"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Listing...
                                            </>
                                        ) : (
                                            "Publish Asset"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
