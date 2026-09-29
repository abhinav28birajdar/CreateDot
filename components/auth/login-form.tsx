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
  FaWandMagicSparkles,
  FaSpinner,
  FaArrowRight,
  FaPalette,
  FaBriefcase,
  FaGithub,
  FaGoogle,
} from "react-icons/fa6"

export function LoginForm() {
  const [role, setRole] = React.useState<"creator" | "consumer">("creator")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const { signIn, signInWithGoogle, signInWithGitHub, setLocalSession } = useAuth()
  const redirectTo = searchParams?.get("redirectTo") || (role === "creator" ? "/feed" : "/jobs")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address")
      return
    }
    if (!password) {
      toast.error("Please enter your password")
      return
    }

    setIsLoading(true)

    try {
      const result = await signIn(email, password, role)
      if (result.error) {
        toast.error("Login failed", { description: result.error.message })
      } else {
        toast.success(`Signed in successfully as ${role === "creator" ? "Creator" : "Consumer / Client"}!`)
        router.push(redirectTo)
      }
    } catch {
      toast.error("An unexpected error occurred during sign in.")
    } finally {
      setIsLoading(false)
    }
  }

  // Quick 1-Click Demo Login as Creator or Consumer
  const handleDemoLogin = (demoRole: "creator" | "consumer") => {
    if (demoRole === "creator") {
      setLocalSession({
        id: "u-abhinav",
        email: "abhinav@createdot.io",
        username: "abhinav",
        full_name: "Abhinav",
        avatar_url: "/images/profile-image-4.png",
        cover_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
        bio: "Principal Product Designer & Creative Technologist. Crafting autonomous AI banking apps, 3D spatial studios, and token design systems on CreateDOT.",
        website_url: "https://createdot.io",
        location: "San Francisco, CA",
        role: "creator",
        verified: true,
        skills: ["UI/UX Design", "3D Spatial Engine", "Design Systems", "React & Tailwind"],
        tools: ["Figma", "TailwindCSS", "Next.js", "Three.js"],
        social_links: {},
        followers_count: 24500,
        following_count: 180,
        projects_count: 3,
        likes_count: 142000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      toast.success("Welcome, Abhinav! Logged in as Creator.", {
        description: "Verified profile active with 3 real-time projects.",
      })
      router.push("/feed")
    } else {
      setLocalSession({
        id: "u-client-sarah",
        email: "sarah@aurastudios.design",
        username: "aurastudios",
        full_name: "Sarah Jenkins",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        cover_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
        bio: "Creative Director at Aura Studios. Hiring leading UI/UX engineers, spatial artists, and system leads.",
        website_url: "https://aurastudios.design",
        location: "New York, NY",
        role: "consumer",
        verified: true,
        skills: ["Creative Direction", "Contracting", "Talent Sourcing"],
        tools: ["CreateDOT Studio"],
        social_links: {},
        followers_count: 650,
        following_count: 210,
        projects_count: 0,
        likes_count: 340,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      toast.success("Welcome, Sarah! Logged in as Consumer / Client.", {
        description: "Creative directory and talent contracts ready.",
      })
      router.push("/jobs")
    }
  }

  return (
    <div className="space-y-6">
      {/* Role Picker for Login */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">
          Sign In As
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#14161F]/5 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10">
          <button
            type="button"
            onClick={() => setRole("creator")}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              role === "creator"
                ? "bg-white dark:bg-[#1C2237] text-[#14161F] dark:text-white shadow-sm ring-2 ring-[#FF6B6B]"
                : "text-[#5A637A] dark:text-[#9DA7C2] hover:text-[#14161F]"
            }`}
          >
            <FaPalette className={`text-xs ${role === "creator" ? "text-[#FF6B6B]" : ""}`} />
            <span>Creator</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("consumer")}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              role === "consumer"
                ? "bg-white dark:bg-[#1C2237] text-[#14161F] dark:text-white shadow-sm ring-2 ring-[#10B981]"
                : "text-[#5A637A] dark:text-[#9DA7C2] hover:text-[#14161F]"
            }`}
          >
            <FaBriefcase className={`text-xs ${role === "consumer" ? "text-[#10B981]" : ""}`} />
            <span>Consumer / Client</span>
          </button>
        </div>
      </div>

      {/* 1-Click Fast Demo Login Strip */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FAF0D7]/60 to-[#FFF0E6]/50 dark:from-white/5 dark:to-white/[0.02] border border-[#14161F]/8 dark:border-white/10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FaWandMagicSparkles className="text-amber-500 text-xs flex-shrink-0" />
            <span className="text-xs font-bold text-[#14161F] dark:text-white">
              Instant 1-Click Sign In:
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleDemoLogin("creator")}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#FF6B6B] text-white hover:bg-[#F05555] transition shadow-sm"
            >
              Abhinav (Creator)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("consumer")}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#10B981] text-white hover:bg-[#059669] transition shadow-sm"
            >
              Client (Aura)
            </button>
          </div>
        </div>
      </div>

      {/* Standard Email & Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#14161F] dark:text-white">
            Email Address
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8C96AB]" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === "creator" ? "abhinav@createdot.io" : "client@company.com"}
              className="pl-10 h-11 rounded-2xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs font-medium"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#14161F] dark:text-white">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[10px] text-[#FF6B6B] font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8C96AB]" />
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="pl-10 pr-10 h-11 rounded-2xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs font-medium"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C96AB] hover:text-[#14161F] dark:hover:text-white"
            >
              {showPassword ? <FaEyeSlash className="h-3.5 w-3.5" /> : <FaEye className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full h-12 text-white font-bold rounded-full shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider ${
            role === "creator"
              ? "bg-[#FF6B6B] hover:bg-[#F05555] shadow-[#FF6B6B]/25"
              : "bg-[#10B981] hover:bg-[#059669] shadow-[#10B981]/25"
          }`}
        >
          {isLoading ? (
            <FaSpinner className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span>
                {role === "creator" ? "Enter as Creator" : "Enter as Consumer / Client"}
              </span>
              <FaArrowRight className="text-xs" />
            </>
          )}
        </Button>
      </form>

      {/* OAuth Options */}
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#14161F]/8 dark:border-white/10" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
          <span className="bg-[#FAF7F0] dark:bg-[#14161F] px-3 text-[#8C96AB]">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          type="button"
          className="h-10 rounded-xl border-[#14161F]/15 dark:border-white/10 font-bold text-xs flex items-center justify-center gap-2"
          onClick={() => signInWithGitHub()}
        >
          <FaGithub className="h-4 w-4" />
          <span>GitHub</span>
        </Button>
        <Button
          variant="outline"
          type="button"
          className="h-10 rounded-xl border-[#14161F]/15 dark:border-white/10 font-bold text-xs flex items-center justify-center gap-2"
          onClick={() => signInWithGoogle()}
        >
          <FaGoogle className="h-3.5 w-3.5 text-rose-500" />
          <span>Google</span>
        </Button>
      </div>
    </div>
  )
}
