"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBriefcase,
  FaPalette,
  FaBuilding,
  FaCoins,
  FaWandMagicSparkles,
  FaCircleCheck,
  FaArrowRight,
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaGithub,
  FaGoogle,
} from "react-icons/fa6"

const CREATOR_DISCIPLINES = [
  "UI/UX & Product Design",
  "3D Spatial & WebXR Engine",
  "Design Systems & Tokens",
  "Frontend & React Engineering",
  "Brand Identity & Art Direction",
  "Motion & Micro-interactions",
]

const CONSUMER_INTENTS = [
  "Hire Full-Time Senior Designers",
  "Contract High-End Freelancers",
  "Commission 3D / Spatial Studio Projects",
  "Enterprise Design System Architecture",
  "Browse Curated Inspiration & License Works",
]

const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 – $20,000",
  "$20,000 – $50,000",
  "$50,000+ (Enterprise)",
]

export function SignupForm() {
  const router = useRouter()
  const { signUp, signInWithGoogle, signInWithGitHub, setLocalSession } = useAuth()

  const [role, setRole] = React.useState<"creator" | "consumer">("creator")
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  // Shared fields
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  // Creator specific fields
  const [discipline, setDiscipline] = React.useState(CREATOR_DISCIPLINES[0])
  const [username, setUsername] = React.useState("")
  const [portfolioUrl, setPortfolioUrl] = React.useState("")
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([
    "Figma",
    "React",
    "Tailwind",
  ])

  // Consumer specific fields
  const [companyName, setCompanyName] = React.useState("")
  const [intent, setIntent] = React.useState(CONSUMER_INTENTS[0])
  const [budget, setBudget] = React.useState(BUDGET_RANGES[1])
  const [location, setLocation] = React.useState("San Francisco, CA")

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  // Handle Form Submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Please enter your full name")
      return
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address")
      return
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    try {
      const result = await signUp(email, password, {
        name,
        full_name: name,
        username: username || (email.split("@")[0] || "user").toLowerCase().replace(/[^a-z0-9_]/g, ""),
        role,
        discipline: role === "creator" ? discipline : undefined,
        portfolio_url: role === "creator" ? portfolioUrl : undefined,
        skills: role === "creator" ? selectedSkills : ["Creative Direction", "Sourcing"],
        company_name: role === "consumer" ? companyName : undefined,
        intent: role === "consumer" ? intent : undefined,
        budget: role === "consumer" ? budget : undefined,
        location,
        avatar_url: name.toLowerCase().includes("abhinav") ? "/images/profile-image-4.png" : undefined,
      })

      if (result.error) {
        toast.error("Registration error", { description: result.error.message })
      } else {
        toast.success(
          role === "creator"
            ? "Welcome to CreateDOT! Your Creator Portfolio is ready."
            : "Welcome to CreateDOT! Your Client & Hiring Account is active.",
          {
            description: `Logged in as ${name} (${role === "creator" ? "Creator" : "Consumer"})`,
          }
        )

        if (role === "creator") {
          router.push("/feed")
        } else {
          router.push("/jobs")
        }
      }
    } catch {
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Quick 1-Click Demo Logins for Testing
  const handleQuickDemo = (demoRole: "creator" | "consumer") => {
    if (demoRole === "creator") {
      setLocalSession({
        id: "u-abhinav",
        email: "abhinav@createdot.io",
        username: "abhinav",
        full_name: "Abhinav",
        avatar_url: "/images/profile-image-4.png",
        cover_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
        bio: "Principal Product Designer & Creative Technologist. Building autonomous AI banking apps, 3D spatial studios, and token design systems on CreateDOT.",
        website_url: "https://createdot.io",
        location: "San Francisco, CA",
        role: "creator",
        verified: true,
        skills: ["UI/UX Design", "3D Spatial Engine", "Design Systems", "React & Tailwind"],
        tools: ["Figma", "TailwindCSS", "Next.js", "Three.js"],
        social_links: { github: "https://github.com", twitter: "https://x.com" },
        followers_count: 24500,
        following_count: 180,
        projects_count: 3,
        likes_count: 142000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      toast.success("Welcome Abhinav! Logged in as Creator.", {
        description: "Profile loaded with 3 real-time projects and verified badge.",
      })
      router.push("/feed")
    } else {
      setLocalSession({
        id: "u-aura-client",
        email: "sarah@aurastudios.design",
        username: "aurastudios",
        full_name: "Sarah Jenkins",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        cover_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
        bio: "Head of Product Experience at Aura Studios. Hiring world-class UI engineers, spatial artists, and brand architects.",
        website_url: "https://aurastudios.design",
        location: "New York & Remote",
        role: "consumer",
        verified: true,
        skills: ["Creative Direction", "Talent Sourcing", "Contracting"],
        tools: ["CreateDOT Studio"],
        social_links: {},
        followers_count: 840,
        following_count: 320,
        projects_count: 0,
        likes_count: 512,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      toast.success("Welcome Sarah! Logged in as Consumer / Client.", {
        description: "Accessing direct creator hiring board and contracts.",
      })
      router.push("/jobs")
    }
  }

  return (
    <div className="space-y-6">
      {/* Role Selection Switcher */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">
          Choose Your Account Type
        </label>
        <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-[#14161F]/5 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10">
          <button
            type="button"
            onClick={() => setRole("creator")}
            className={`flex flex-col items-center justify-center py-3 px-3 rounded-xl transition-all ${
              role === "creator"
                ? "bg-white dark:bg-[#1C2237] text-[#14161F] dark:text-white shadow-md ring-2 ring-[#FF6B6B]"
                : "text-[#5A637A] dark:text-[#9DA7C2] hover:text-[#14161F] dark:hover:text-white"
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <FaPalette className={`text-xs ${role === "creator" ? "text-[#FF6B6B]" : ""}`} />
              <span>Creator Profile</span>
            </div>
            <span className="text-[10px] text-[#8C96AB] mt-0.5">Showcase & Get Hired</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("consumer")}
            className={`flex flex-col items-center justify-center py-3 px-3 rounded-xl transition-all ${
              role === "consumer"
                ? "bg-white dark:bg-[#1C2237] text-[#14161F] dark:text-white shadow-md ring-2 ring-[#10B981]"
                : "text-[#5A637A] dark:text-[#9DA7C2] hover:text-[#14161F] dark:hover:text-white"
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <FaBriefcase className={`text-xs ${role === "consumer" ? "text-[#10B981]" : ""}`} />
              <span>Consumer / Client</span>
            </div>
            <span className="text-[10px] text-[#8C96AB] mt-0.5">Hire & Source Talent</span>
          </button>
        </div>
      </div>

      {/* 1-Click Fast Instant Demo Box */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FAF0D7]/60 to-[#FFF0E6]/50 dark:from-white/5 dark:to-white/[0.02] border border-[#14161F]/8 dark:border-white/10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FaWandMagicSparkles className="text-amber-500 text-xs flex-shrink-0" />
            <span className="text-xs font-bold text-[#14161F] dark:text-white">
              Instant 1-Click Test Access:
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemo("creator")}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#FF6B6B] text-white hover:bg-[#F05555] transition shadow-sm"
            >
              Demo Creator (Abhinav)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("consumer")}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#10B981] text-white hover:bg-[#059669] transition shadow-sm"
            >
              Demo Client
            </button>
          </div>
        </div>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#14161F] dark:text-white flex items-center justify-between">
            <span>{role === "creator" ? "Your Name / Artist Alias" : "Contact Full Name"}</span>
            <span className="text-[10px] text-[#FF6B6B] font-semibold">Required</span>
          </label>
          <div className="relative">
            <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8C96AB]" />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === "creator" ? "Abhinav" : "Sarah Jenkins"}
              className="pl-10 h-11 rounded-2xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs font-medium"
              required
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#14161F] dark:text-white flex items-center justify-between">
            <span>{role === "creator" ? "Creator Email" : "Work / Company Email"}</span>
            <span className="text-[10px] text-[#FF6B6B] font-semibold">Required</span>
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8C96AB]" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === "creator" ? "abhinav@createdot.io" : "sarah@company.com"}
              className="pl-10 h-11 rounded-2xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs font-medium"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#14161F] dark:text-white flex items-center justify-between">
            <span>Password</span>
            <span className="text-[10px] text-[#8C96AB]">8+ characters</span>
          </label>
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

        {/* ---------------- CREATOR SPECIFIC FIELDS ---------------- */}
        {role === "creator" && (
          <div className="space-y-4 pt-1 border-t border-[#14161F]/8 dark:border-white/10">
            {/* Discipline Dropdown */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14161F] dark:text-white">
                Primary Creative Discipline
              </label>
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="w-full h-11 px-3.5 rounded-2xl bg-white/80 dark:bg-[#161B2B] border border-[#14161F]/10 dark:border-white/10 text-xs font-semibold text-[#14161F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
              >
                {CREATOR_DISCIPLINES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Portfolio URL / Username */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#14161F] dark:text-white">
                  Profile Handle
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#8C96AB] font-bold">
                    @
                  </span>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="abhinav"
                    className="pl-7 h-10 rounded-xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#14161F] dark:text-white">
                  Portfolio / Figma
                </label>
                <Input
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://..."
                  className="h-10 rounded-xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs"
                />
              </div>
            </div>

            {/* Skills selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#14161F] dark:text-white">
                Core Craft Skills
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Figma", "React", "Tailwind", "Three.js", "Blender", "TypeScript", "Next.js"].map(
                  (sk) => {
                    const isSelected = selectedSkills.includes(sk)
                    return (
                      <button
                        type="button"
                        key={sk}
                        onClick={() => toggleSkill(sk)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                          isSelected
                            ? "bg-[#FF6B6B] text-white border-[#FF6B6B] shadow-sm"
                            : "bg-white/60 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-[#647087] dark:text-[#9DA7C2]"
                        }`}
                      >
                        {isSelected ? `✓ ${sk}` : `+ ${sk}`}
                      </button>
                    )
                  }
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- CONSUMER / CLIENT SPECIFIC FIELDS ---------------- */}
        {role === "consumer" && (
          <div className="space-y-4 pt-1 border-t border-[#14161F]/8 dark:border-white/10">
            {/* Company / Brand Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14161F] dark:text-white flex items-center justify-between">
                <span>Company or Studio Name</span>
                <span className="text-[10px] text-[#8C96AB]">Optional for individual clients</span>
              </label>
              <div className="relative">
                <FaBuilding className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8C96AB]" />
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Aura Digital Labs, Inc."
                  className="pl-10 h-11 rounded-2xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs font-medium"
                />
              </div>
            </div>

            {/* Hiring Intent Dropdown */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#14161F] dark:text-white">
                What are you looking to accomplish?
              </label>
              <select
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className="w-full h-11 px-3.5 rounded-2xl bg-white/80 dark:bg-[#161B2B] border border-[#14161F]/10 dark:border-white/10 text-xs font-semibold text-[#14161F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              >
                {CONSUMER_INTENTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Estimated Budget & Location */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#14161F] dark:text-white flex items-center gap-1">
                  <FaCoins className="text-amber-500 text-xs" /> Budget Scale
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full h-10 px-2.5 rounded-xl bg-white/80 dark:bg-[#161B2B] border border-[#14161F]/10 dark:border-white/10 text-xs font-medium text-[#14161F] dark:text-white"
                >
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#14161F] dark:text-white">
                  Headquarters
                </label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="San Francisco, CA"
                  className="h-10 rounded-xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
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
                {role === "creator" ? "Complete Creator Registration" : "Launch Client Account"}
              </span>
              <FaArrowRight className="text-xs" />
            </>
          )}
        </Button>
      </form>

      {/* OAuth Register Options */}
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#14161F]/8 dark:border-white/10" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
          <span className="bg-[#FAF7F0] dark:bg-[#14161F] px-3 text-[#8C96AB]">
            Or authenticate with
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
