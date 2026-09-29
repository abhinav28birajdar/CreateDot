'use client'

import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import {
  FaUser,
  FaGear,
  FaArrowRightFromBracket,
  FaTableColumns,
  FaComments,
  FaWandMagicSparkles,
  FaPalette,
  FaBriefcase,
  FaRotate,
  FaBuilding,
} from "react-icons/fa6"
import { toast } from 'sonner'

export function UserMenu() {
  const { user, signOut, switchRole } = useAuth()

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-bold text-[#14161F] dark:text-white hover:text-[#FF6B6B]"
          >
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            size="sm"
            className="text-xs font-bold bg-[#FF6B6B] hover:bg-[#F05555] text-white rounded-full px-4 shadow-sm"
          >
            Get Started
          </Button>
        </Link>
      </div>
    )
  }

  const isConsumer = user.role === 'consumer' || user.role === 'client'
  const displayName = user.full_name || user.username || (isConsumer ? 'Client Member' : 'Abhinav')
  const displayEmail = user.email || 'abhinav@createdot.io'
  const avatarSrc = user.avatar_url || (displayName.toLowerCase().includes('abhinav') ? '/images/profile-image-4.png' : '')
  const initials = displayName.substring(0, 2).toUpperCase()

  const handleRoleToggle = () => {
    const nextRole = isConsumer ? 'creator' : 'consumer'
    switchRole(nextRole)
    toast.success(`Switched to ${nextRole === 'creator' ? 'Creator' : 'Consumer / Client'} mode in real time!`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`relative h-10 w-10 rounded-full p-0 overflow-hidden ring-2 transition ${
            isConsumer
              ? 'ring-emerald-500/40 hover:ring-emerald-500'
              : 'ring-[#FF6B6B]/40 hover:ring-[#FF6B6B]'
          }`}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarSrc} alt={displayName} className="object-cover" />
            <AvatarFallback className="bg-[#14161F] text-white font-bold text-xs">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2 shadow-2xl rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-2.5">
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold leading-none text-foreground truncate max-w-[130px]">
                {displayName}
              </p>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black rounded-full uppercase tracking-wider ${
                  isConsumer
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-[#FF6B6B]/10 text-[#FF6B6B] border border-[#FF6B6B]/20'
                }`}
              >
                {isConsumer ? <FaBriefcase className="text-[9px]" /> : <FaPalette className="text-[9px]" />}
                {isConsumer ? 'Client' : 'Creator'}
              </span>
            </div>
            <p className="text-xs leading-none text-muted-foreground truncate font-mono">
              {displayEmail}
            </p>
          </div>
        </DropdownMenuLabel>

        {/* Real-time Role Switcher Item */}
        <DropdownMenuItem
          onClick={handleRoleToggle}
          className="cursor-pointer bg-slate-50 dark:bg-slate-900/60 rounded-xl my-1 p-2 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <FaRotate className="text-indigo-400 text-xs" />
            <span>Switch to {isConsumer ? 'Creator' : 'Client'} Mode</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-indigo-500 bg-indigo-500/10 px-1.5 py-0.5 rounded">
            Live
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem asChild className="cursor-pointer rounded-xl">
          <Link href="/dashboard" className="flex items-center w-full gap-2 text-xs font-semibold py-2">
            <FaTableColumns className="h-3.5 w-3.5 text-[#FF6B6B]" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer rounded-xl">
          <Link href={`/profile/${user.username || 'abhinav'}`} className="flex items-center w-full gap-2 text-xs font-semibold py-2">
            <FaUser className="h-3.5 w-3.5 text-slate-400" />
            <span>Profile ({user.username || 'abhinav'})</span>
          </Link>
        </DropdownMenuItem>

        {isConsumer ? (
          <DropdownMenuItem asChild className="cursor-pointer rounded-xl">
            <Link href="/jobs" className="flex items-center w-full gap-2 text-xs font-semibold py-2">
              <FaBuilding className="h-3.5 w-3.5 text-emerald-500" />
              <span>Hiring & Postings</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild className="cursor-pointer rounded-xl">
            <Link href="/workflows/smart-case-studies" className="flex items-center w-full gap-2 text-xs font-semibold py-2">
              <FaWandMagicSparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Studio AI Workflows</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild className="cursor-pointer rounded-xl">
          <Link href="/messages" className="flex items-center w-full gap-2 text-xs font-semibold py-2">
            <FaComments className="h-3.5 w-3.5 text-slate-400" />
            <span>Messages</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer rounded-xl">
          <Link href="/settings" className="flex items-center w-full gap-2 text-xs font-semibold py-2">
            <FaGear className="h-3.5 w-3.5 text-slate-400" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem
          onClick={() => {
            signOut()
            toast.success("Logged out successfully.")
          }}
          className="cursor-pointer text-rose-600 dark:text-rose-400 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30 flex items-center gap-2 rounded-xl text-xs font-semibold py-2"
        >
          <FaArrowRightFromBracket className="h-3.5 w-3.5" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
