import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings - CreatorFlow',
  description: 'Manage your account',
}

export default function SettingsPage() {
  return (
    <div className="container py-6 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Account Settings</h1>
      <div className="grid grid-cols-[250px_1fr] gap-8">
        <nav className="flex flex-col space-y-1">
          <a href="#" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium text-sm">Profile</a>
          <a href="#" className="px-4 py-2 hover:bg-muted rounded-md font-medium text-sm">Account</a>
          <a href="#" className="px-4 py-2 hover:bg-muted rounded-md font-medium text-sm">Notifications</a>
          <a href="#" className="px-4 py-2 hover:bg-muted rounded-md font-medium text-sm">Billing</a>
        </nav>
        <div className="p-6 border rounded-lg">
          <h2 className="text-lg font-medium mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-24 bg-muted rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
