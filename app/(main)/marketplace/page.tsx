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
    ShieldCheck
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface AssetProduct {
    id: string
    title: string
    category: string
    price: string
    originalPrice?: string
    rating: number
    reviewsCount: number
    downloadsCount: string
    image: string
    creator: {
        name: string
        avatar: string
    }
    format: string
    description: string
    isFeatured?: boolean
}

const MARKETPLACE_PRODUCTS: AssetProduct[] = [
    {
        id: 'mp1',
        title: 'Apex OS — Complete Fintech & SaaS UI Kit (400+ Screens)',
        category: 'UI Kits',
        price: '$59',
        originalPrice: '$99',
        rating: 4.9,
        reviewsCount: 142,
        downloadsCount: '2.8k',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        creator: {
            name: 'Elena Rostova',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        },
        format: 'Figma (.fig), Tokens (JSON)',
        description: 'Comprehensive design system and mobile/web templates for modern financial software. Includes dark/light modes, variable typography, and 120+ micro-interaction components.',
        isFeatured: true
    },
    {
        id: 'mp2',
        title: 'Spatial Geometry — 50+ Photorealistic 3D Glass Assets',
        category: '3D Assets',
        price: '$45',
        originalPrice: '$65',
        rating: 5.0,
        reviewsCount: 88,
        downloadsCount: '1.9k',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        creator: {
            name: 'Marcus Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        },
        format: 'Blender, Spline, FBX, GLTF, 4K PNG',
        description: 'Hand-sculpted procedural iridescent glass sculptures with caustics and lighting setups ready for web heroes, keynote presentations, and AR experiences.',
        isFeatured: true
    },
    {
        id: 'mp3',
        title: 'Linear Icons Pro — 1,200+ Vector Micro-Icons',
        category: 'Icons',
        price: '$29',
        rating: 4.8,
        reviewsCount: 310,
        downloadsCount: '4.6k',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
        creator: {
            name: 'Devon Vance',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
        },
        format: 'SVG, React Icons, Figma Component Set',
        description: 'Pixel-perfect, 24px and 16px geometric line and solid icons crafted on standard bounding boxes with dual-tone color support.',
        isFeatured: false
    },
    {
        id: 'mp4',
        title: 'Editorial Studio — Swiss Magazine & Monograph Layouts',
        category: 'Print & Branding',
        price: '$39',
        rating: 4.9,
        reviewsCount: 64,
        downloadsCount: '1.2k',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
        creator: {
            name: 'Aria Takahashi',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
        },
        format: 'InDesign (.indd), Illustrator, Figma',
        description: 'Rigorous Swiss typography grids, editorial spreads, and typographic hierarchy templates built for architectural and luxury brand publishing.',
        isFeatured: false
    },
    {
        id: 'mp5',
        title: 'Device Studio — iPhone 16 Pro & MacBook Clay Mockups',
        category: 'Mockups',
        price: 'Free',
        rating: 4.9,
        reviewsCount: 520,
        downloadsCount: '12.4k',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
        creator: {
            name: 'CreateDOT Team',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        },
        format: 'Figma, PSD (Smart Objects), 6K PNG',
        description: 'Official community asset pack featuring customizable device finishes, realistic glass reflections, and studio lighting presets.',
        isFeatured: false
    },
    {
        id: 'mp6',
        title: 'Motion Kinetics — 60+ Lottie & Rive UI Animations',
        category: 'Motion',
        price: '$49',
        originalPrice: '$79',
        rating: 5.0,
        reviewsCount: 92,
        downloadsCount: '2.1k',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
        creator: {
            name: 'Marcus Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        },
        format: 'Lottie (JSON), Rive (.riv), After Effects',
        description: 'Production-ready micro-interactions for buttons, toggles, success checks, loaders, and delight states.',
        isFeatured: false
    }
]

const CATEGORIES = ['All', 'UI Kits', '3D Assets', 'Icons', 'Print & Branding', 'Mockups', 'Motion']

export default function MarketplacePage() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<AssetProduct | null>(null)
    const [isPurchasing, setIsPurchasing] = useState(false)

    const filteredProducts = MARKETPLACE_PRODUCTS.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
        const matchesQuery = !searchQuery || (
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.format.toLowerCase().includes(searchQuery.toLowerCase())
        )
        return matchesCategory && matchesQuery
    })

    const handleBuy = (product: AssetProduct) => {
        setIsPurchasing(true)
        setTimeout(() => {
            setIsPurchasing(false)
            setSelectedProduct(null)
            toast.success(`Purchased "${product.title}"!`, {
                description: 'Download link and license key sent to your email.'
            })
        }, 1200)
    }

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-[36px] bg-[#14161F] p-8 sm:p-14 text-white shadow-2xl">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 to-[#FFE185]/20 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider mb-4 border border-white/10">
                            <Sparkles className="h-3.5 w-3.5 text-[#FF6B6B]" />
                            Curated Digital Goods
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                            High-Craft Assets for Builders.
                        </h1>
                        <p className="mt-3 text-sm sm:text-base text-[#9DA7C2] leading-relaxed">
                            Accelerate your creative pipeline with hand-crafted UI kits, 3D models, icons, and mockups crafted by world-class designers.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                        <Button
                            onClick={() => toast.success("Seller onboarding initiated! Check your creator dashboard.")}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="group flex flex-col rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl shadow-[#14161F]/5 transition-all backdrop-blur-sm"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                                {product.originalPrice && (
                                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-black/60 text-slate-300 line-through backdrop-blur-md">
                                        {product.originalPrice}
                                    </span>
                                )}
                                <span className="px-3 py-1 rounded-full text-xs font-black bg-[#FF6B6B] text-white shadow-md shadow-[#FF6B6B]/30">
                                    {product.price}
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
                                    <span>{product.rating}</span>
                                    <span className="text-[#6B758E] font-normal">({product.reviewsCount} reviews)</span>
                                    <span className="text-[#6B758E] font-normal ml-auto flex items-center gap-1">
                                        <Download className="h-3 w-3" /> {product.downloadsCount}
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
                                            src={product.creator.avatar}
                                            alt={product.creator.name}
                                            className="h-6 w-6 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                                        />
                                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            {product.creator.name}
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
                                        src={selectedProduct.image}
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
                                            Created by <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedProduct.creator.name}</span>
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="text-3xl font-black text-violet-600 dark:text-violet-400">
                                            {selectedProduct.price}
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
                                        {isPurchasing ? "Processing..." : `Get Asset (${selectedProduct.price})`}
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
    )
}
