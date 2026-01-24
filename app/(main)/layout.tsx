import type React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar className="hidden lg:block w-64 fixed h-[calc(100vh-4rem)] top-16 border-r overflow-y-auto" />
        <main className="flex-1 lg:pl-64">
          {children}
        </main>
      </div>
    </div>
  )
}
