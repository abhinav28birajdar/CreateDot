import type React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#111420] text-[#14161F] dark:text-slate-100 selection:bg-[#FF6B6B]/20 selection:text-[#FF6B6B] transition-colors">
      <Navbar />
      <div className="flex mx-auto max-w-7xl">
        <Sidebar className="hidden lg:flex fixed w-64 h-[calc(100vh-5rem)] top-20 z-30" />
        <main className="flex-1 lg:pl-64 min-w-0 pb-16">
          {children}
        </main>
      </div>
    </div>
  )
}
