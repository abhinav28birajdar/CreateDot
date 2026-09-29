import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0C] text-slate-900 dark:text-slate-100 flex flex-col justify-center transition-colors">
      {children}
    </div>
  )
}
