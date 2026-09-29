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
} from "react-icons/fa6"

export function UserMenu() {
  const { user, signOut } = useAuth()

  // Default to Abhinav if not logged in or default session
  const displayName = user?.full_name || user?.username || 'Abhinav'
  const displayEmail = user?.email || 'abhinav@createdot.io'
  const avatarSrc = user?.avatar_url || '/images/profile-image-4.png'
  const initials = 'AB'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-[#FF6B6B]/30 hover:ring-[#FF6B6B] transition p-0 overflow-hidden">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarSrc} alt={displayName} className="object-cover" />
            <AvatarFallback className="bg-[#14161F] text-white font-bold text-xs">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 p-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none text-foreground flex items-center gap-1.5">
              {displayName}
              <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold bg-[#FF6B6B]/15 text-[#FF6B6B] rounded-full">
                Creator
              </span>
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {displayEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard" className="flex items-center w-full gap-2">
            <FaTableColumns className="h-3.5 w-3.5 text-[#FF6B6B]" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile/abhinav" className="flex items-center w-full gap-2">
            <FaUser className="h-3.5 w-3.5 text-slate-400" />
            <span>Profile (Abhinav)</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/workflows/smart-case-studies" className="flex items-center w-full gap-2">
            <FaWandMagicSparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Studio AI Workflows</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/messages" className="flex items-center w-full gap-2">
            <FaComments className="h-3.5 w-3.5 text-slate-400" />
            <span>Messages</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings" className="flex items-center w-full gap-2">
            <FaGear className="h-3.5 w-3.5 text-slate-400" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => (signOut ? signOut() : null)}
          className="cursor-pointer text-rose-600 dark:text-rose-400 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30 flex items-center gap-2"
        >
          <FaArrowRightFromBracket className="h-3.5 w-3.5" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
