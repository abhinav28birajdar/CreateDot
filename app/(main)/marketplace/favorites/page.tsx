"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Heart, Bookmark, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function MarketplaceFavoritesPage() {
  const [favorites, setFavorites] = useState([
    {
      id: "g-1",
      title: "I will design an ultra-modern SaaS design system in Figma",
      seller: "Sarah Chen",
      rating: 5.0,
      reviews: 142,
      price: "$680",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    },
    {
      id: "g-2",
      title: "I will build interactive WebGL spatial 3D canvas micro-interactions",
      seller: "Marcus Vance",
      rating: 4.9,
      reviews: 89,
      price: "$1,250",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    },
  ]);

  const removeFav = (id: string) => {
    setFavorites(favorites.filter((f) => f.id !== id));
    toast.info("Removed from saved favorites");
  };

  return (
    <div className="container max-w-5xl py-8 px-4 sm:px-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/marketplace" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Marketplace
        </Link>
        <span>/</span>
        <span>Saved Services</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">My Saved Gigs & Favorites</h1>
      <p className="text-muted-foreground text-sm mb-8">Shortlist of freelance services and creator gigs you are considering hiring.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((fav) => (
          <div key={fav.id} className="rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] bg-muted">
                <Image src={fav.image} alt={fav.title} fill className="object-cover" />
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => removeFav(fav.id)}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md text-rose-500"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-2">
                  <Star className="h-3.5 w-3.5 fill-current" /> {fav.rating} ({fav.reviews} reviews)
                </div>
                <h3 className="font-extrabold text-base hover:underline mb-1">
                  <Link href={`/gigs/${fav.id}`}>{fav.title}</Link>
                </h3>
                <p className="text-xs text-muted-foreground">Offered by {fav.seller}</p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-black/5 dark:border-white/10 mt-3 pt-3">
              <span className="text-xs font-semibold text-muted-foreground">
                From <strong className="text-base text-foreground font-black">{fav.price}</strong>
              </span>
              <Button asChild size="sm" className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl font-bold text-xs">
                <Link href={`/orders/checkout?gig=${fav.id}`}>Order Now</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
