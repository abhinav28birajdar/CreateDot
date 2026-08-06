import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Messages - CreateDOT',
  description: 'Your conversations',
}

export default function MessagesPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Messages</h1>
      <div className="flex h-[600px] border rounded-lg overflow-hidden">
        <div className="w-1/3 border-r bg-muted/10 p-4">
          <p className="text-muted-foreground text-sm">No conversations yet.</p>
        </div>
        <div className="flex-1 flex items-center justify-center bg-muted/5">
          <p className="text-muted-foreground">Select a conversation to start messaging</p>
        </div>
      </div>
    </div>
  )
}
