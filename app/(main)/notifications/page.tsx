import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notifications - CreatorFlow',
  description: 'Your updates',
}

export default function NotificationsPage() {
  return (
    <div className="container py-6 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Notifications</h1>
      <div className="space-y-4">
        <div className="p-12 text-center border border-dashed rounded-lg text-muted-foreground">
          No new notifications
        </div>
      </div>
    </div>
  )
}
