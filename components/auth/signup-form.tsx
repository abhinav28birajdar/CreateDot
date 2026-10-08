"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth, type UserRole } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBriefcase,
  FaPalette,
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGithub,
  FaGoogle,
} from "react-icons/fa6"

export function SignupForm() {
  const router = useRouter()
  const { signUp, signInWithGoogle, signInWithGitHub } = useAuth()

  const [role, setRole] = React.useState<UserRole>("creator")
  const [fullName, setFullName] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOAuthLoading, setIsOAuthLoading] = React.useState<"google" | "github" | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const trimmedName = fullName.trim()
    const trimmedEmail = email.trim()
    const trimmedUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, "")

    if (!trimmedName || trimmedName.length < 2) {
      toast.error("Please enter your full name")
      return
    }

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      toast.error("Please enter a valid email address")
      return
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      const result = await signUp(trimmedEmail, password, {
        fullName: trimmedName,
        username: trimmedUsername || trimmedEmail.split("@")[0],
        role,
      })

      if (result.error) {
        toast.error("Registration failed", {
          description: result.error.message || "Could not complete account creation",
        })
      } else {
        toast.success("Account created successfully! 🎉", {
          description: "Welcome to CreateDOT. Redirecting to your feed...",
        })
        router.push("/feed")
        router.refresh()
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred during signup.", {
        description: err?.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleOAuth(provider: "google" | "github") {
    setIsOAuthLoading(provider)
    try {
      const res = provider === "google" ? await signInWithGoogle() : await signInWithGitHub()
      if (res?.error) {
        toast.error(`${provider === "google" ? "Google" : "GitHub"} signup failed`, {
          description: res.error.message,
        })
      }
    } catch {
      toast.error("OAuth registration failed.")
    } finally {
      setIsOAuthLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Role Picker */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          Select Account Intent
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("creator")}
            className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all ${
              role === "creator"
                ? "border-[#14161F] dark:border-white bg-[#14161F]/5 dark:bg-white/10 ring-1 ring-[#14161F] dark:ring-white"
                : "border-slate-200 dark:border-white/10 hover:border-slate-300"
            }`}
          >
            <div className="h-8 w-8 rounded-xl bg-[#FF6B6B]/15 text-[#FF6B6B] flex items-center justify-center shrink-0">
              <FaPalette className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Creator</p>
              <p className="text-[10px] text-slate-500">Showcase & Get Hired</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole("client")}
            className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all ${
              role === "client"
                ? "border-[#14161F] dark:border-white bg-[#14161F]/5 dark:bg-white/10 ring-1 ring-[#14161F] dark:ring-white"
                : "border-slate-200 dark:border-white/10 hover:border-slate-300"
            }`}
          >
            <div className="h-8 w-8 rounded-xl bg-violet-500/15 text-violet-500 flex items-center justify-center shrink-0">
              <FaBriefcase className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Client / Studio</p>
              <p className="text-[10px] text-slate-500">Discover & Hire Talent</p>
            </div>
          </button>
        </div>
      </div>

      {/* OAuth Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading || isOAuthLoading !== null}
          onClick={() => handleOAuth("google")}
          className="h-11 rounded-2xl border-[#14161F]/10 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 font-medium text-xs gap-2"
        >
          {isOAuthLoading === "google" ? (
            <FaSpinner className="h-4 w-4 animate-spin text-slate-500" />
          ) : (
            <FaGoogle className="h-4 w-4 text-[#EA4335]" />
          )}
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={isLoading || isOAuthLoading !== null}
          onClick={() => handleOAuth("github")}
          className="h-11 rounded-2xl border-[#14161F]/10 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 font-medium text-xs gap-2"
        >
          {isOAuthLoading === "github" ? (
            <FaSpinner className="h-4 w-4 animate-spin text-slate-500" />
          ) : (
            <FaGithub className="h-4 w-4 text-slate-900 dark:text-white" />
          )}
          GitHub
        </Button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-[#14161F]/10 dark:border-white/10 w-full" />
        <span className="bg-white dark:bg-[#151926] px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest absolute">
          Or fill credentials
        </span>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Full Name
          </label>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              type="text"
              required
              disabled={isLoading}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Elena Rostova"
              className="pl-11 h-11 rounded-2xl bg-slate-50/50 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Username handle
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">@</span>
            <Input
              type="text"
              disabled={isLoading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="elena_design"
              className="pl-9 h-11 rounded-2xl bg-slate-50/50 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="elena@studio.design"
              className="pl-11 h-11 rounded-2xl bg-slate-50/50 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Password (minimum 8 characters)
          </label>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              type={showPassword ? "text" : "password"}
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="pl-11 pr-11 h-11 rounded-2xl bg-slate-50/50 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-2xl bg-[#FF6B6B] hover:bg-[#F05555] text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] gap-2 mt-2"
        >
          {isLoading ? (
            <>
              <FaSpinner className="h-4 w-4 animate-spin" />
              Creating profile...
            </>
          ) : (
            <>
              Create Your CreateDOT Account
              <FaArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
