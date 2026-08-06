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
import { User, Settings, CreditCard, LogOut, LayoutDashboard, MessageCircle, Sparkles } from "lucide-react"

export function UserMenu() {
    const { user, signOut } = useAuth()

    if (!user) {
        return (
            <div className="flex items-center space-x-2">
                <Link href="/sign-in">
                    <Button variant="ghost" size="sm">
                        Sign In
                    </Button>
                </Link>
                <Link href="/sign-up">
                    <Button size="sm" className="bg-[#8B5DFF] hover:bg-[#7B4DE5] text-white">
                        Sign Up
                    </Button>
                </Link>
            </div>
        )
    }

    const displayName = user.full_name || user.username || user.email?.split('@')[0] || 'User'
    const displayEmail = user.email || ''
    const initials = displayName.substring(0, 2).toUpperCase()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-[#8B5DFF]/20 hover:ring-[#8B5DFF]/50 transition">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar_url || ''} alt={displayName} />
                        <AvatarFallback className="bg-[#8B5DFF] text-white font-semibold">{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 p-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none text-foreground flex items-center gap-1.5">
                            {displayName}
                            <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium bg-[#8B5DFF]/10 text-[#8B5DFF] rounded-full">Pro</span>
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                            {displayEmail}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/dashboard" className="flex items-center w-full">
                        <LayoutDashboard className="mr-2 h-4 w-4 text-[#8B5DFF]" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4 text-slate-500" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/messages" className="flex items-center w-full">
                        <MessageCircle className="mr-2 h-4 w-4 text-slate-500" />
                        <span>Messages</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/settings" className="flex items-center w-full">
                        <Settings className="mr-2 h-4 w-4 text-slate-500" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-rose-600 dark:text-rose-400 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
