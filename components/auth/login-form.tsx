"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaArrowRight,
  FaGithub,
  FaGoogle,
} from "react-icons/fa6"

export function LoginForm() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOAuthLoading, setIsOAuthLoading] = React.useState<"google" | "github" | null>(null)
  const [showPassword, setShowPassword] = React.useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const { signIn, signInWithGoogle, signInWithGitHub } = useAuth()
  const redirectTo = searchParams?.get("redirectTo") || "/feed"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      toast.error("Please enter a valid email address")
      return
    }
    if (!password || password.length < 6) {
      toast.error("Please enter your password (minimum 6 characters)")
      return
    }

    setIsLoading(true)

    try {
      const result = await signIn(trimmedEmail, password)
      if (result.error) {
        toast.error("Authentication failed", {
          description: result.error.message || "Invalid email or password",
        })
      } else {
        toast.success("Welcome back!", {
          description: "Signed in successfully.",
        })
        router.push(redirectTo)
        router.refresh()
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred during sign in.", {
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
        toast.error(`${provider === "google" ? "Google" : "GitHub"} sign-in failed`, {
          description: res.error.message,
        })
      }
    } catch (err: any) {
      toast.error("OAuth sign-in encountered an error.")
    } finally {
      setIsOAuthLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* OAuth Sign In Buttons */}
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
          Or with email
        </span>
      </div>

      {/* Main Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@creativestudio.com"
              className="pl-11 h-12 rounded-2xl bg-slate-50/50 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-sm focus:ring-2 focus:ring-[#FF6B6B]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[#FF6B6B] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type={showPassword ? "text" : "password"}
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-11 pr-11 h-12 rounded-2xl bg-slate-50/50 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-sm focus:ring-2 focus:ring-[#FF6B6B]"
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
          className="w-full h-12 rounded-2xl bg-[#14161F] hover:bg-[#202330] dark:bg-white dark:hover:bg-slate-200 text-white dark:text-[#14161F] font-bold text-sm shadow-md transition-all active:scale-[0.99] gap-2"
        >
          {isLoading ? (
            <>
              <FaSpinner className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In to CreateDOT
              <FaArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
