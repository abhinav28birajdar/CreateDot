import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketplace - CreatorFlow',
  description: 'Buy and sell design assets',
}

export default function MarketplacePage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Marketplace</h1>
      <div className="p-12 text-center border border-dashed rounded-lg text-muted-foreground">
        Marketplace coming soon
      </div>
    </div>
  )
}
