import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
    ArrowRight,
    BarChart3,
    Check,
    Clock3,
    Crown,
    Layers3,
    Rocket,
    ShieldCheck,
    Sparkles,
    Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
    title: "Premium | CreateDOT",
    description: "Review your current plan, usage, and request premium access powered by Supabase.",
}

type PlanTier = "free" | "pro" | "team"

type UserProfileRow = {
    username: string | null
    full_name: string | null
    avatar_url: string | null
    subscription_tier: string | null
    credits_remaining: number | null
}

type PremiumRequestRow = {
    id: string
    requested_tier: string
    status: string
    message: string | null
    created_at: string
    reviewed_at: string | null
}

type ActivityRow = {
    event_type: string
    event_data: Record<string, unknown> | null
    created_at: string
}

type SearchParams = {
    requested?: string
    duplicate?: string
}

const planCards = [
    {
        tier: "free" as const,
        name: "Free",
        price: "$0",
        description: "For creators getting started with a focused toolset.",
        accent: "from-slate-900 to-slate-700",
        icon: Sparkles,
        features: ["3 active projects", "Basic profile", "Community access", "10 AI credits"],
    },
    {
        tier: "pro" as const,
        name: "Pro",
        price: "$12",
        description: "For serious creators who need more capacity and visibility.",
        accent: "from-violet-600 to-fuchsia-600",
        icon: Crown,
        features: ["Unlimited uploads", "Advanced analytics", "Priority support", "Pro badge", "Marketplace sales"],
        featured: true,
    },
    {
        tier: "team" as const,
        name: "Team",
        price: "$30",
        description: "For agencies and studios working together at scale.",
        accent: "from-emerald-600 to-cyan-600",
        icon: Layers3,
        features: ["5 team members", "Shared workspaces", "Team dashboard", "Approval flows", "Usage controls"],
    },
]

const productBenefits = [
    {
        title: "Real usage visibility",
        description: "Track projects, AI generation activity, and recent platform events from Supabase.",
        icon: BarChart3,
    },
    {
        title: "Persistent upgrade requests",
        description: "Requests are stored in Supabase so your support workflow can review them later.",
        icon: Clock3,
    },
    {
        title: "Auth-aware access",
        description: "Signed-in users see personalized plan details instead of static marketing copy.",
        icon: ShieldCheck,
    },
]

function normalizeTier(value: string | null | undefined): PlanTier {
    if (value === "pro" || value === "team") {
        return value
    }

    return "free"
}

function formatNumber(value: number) {
    return new Intl.NumberFormat("en-US").format(value)
}

function prettyEventName(eventType: string) {
    return eventType
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
}

async function requestPremiumAccess(formData: FormData) {
    "use server"

    const requestedTier = String(formData.get("requested_tier") ?? "pro")
    const message = String(formData.get("message") ?? "").trim()
    const targetTier: PlanTier = requestedTier === "team" ? "team" : "pro"

    const supabase = await createSupabaseServerClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/sign-in?next=/premium")
    }

    const { data: existingRequest, error: existingRequestError } = await supabase
        .from("premium_requests")
        .select("id")
        .eq("user_id", user.id)
        .eq("requested_tier", targetTier)
        .eq("status", "pending")
        .limit(1)
        .maybeSingle()

    if (existingRequestError) {
        throw existingRequestError
    }

    if (existingRequest) {
        redirect("/premium?duplicate=1")
    }

    const { error } = await supabase.from("premium_requests").insert({
        user_id: user.id,
        requested_tier: targetTier,
        message: message || null,
        status: "pending",
    })

    if (error) {
        throw error
    }

    redirect("/premium?requested=1")
}

function PublicPremiumView() {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(139,93,255,0.12),_transparent_35%),linear-gradient(180deg,_#0b1020_0%,_#0f172a_60%,_#f8fafc_60%,_#f8fafc_100%)]">
            <section className="container mx-auto px-4 py-16 md:py-24 text-white">
                <div className="max-w-3xl">
                    <Badge className="mb-6 border border-white/15 bg-white/10 text-white hover:bg-white/10">
                        Supabase-powered premium access
                    </Badge>
                    <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                        Upgrade your creative workflow with a plan that is actually connected to your account.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-slate-300">
                        This premium surface now reads your live Supabase session, profile, and usage data instead of showing static demo pricing.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button asChild size="lg" className="bg-white text-slate-950 hover:bg-slate-100">
                            <Link href="/sign-in">Sign in to continue</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                            <Link href="/sign-up">Create account</Link>
                        </Button>
                    </div>
                </div>

                <div className="mt-14 grid gap-4 md:grid-cols-3">
                    {productBenefits.map((benefit) => {
                        const Icon = benefit.icon

                        return (
                            <div key={benefit.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                                <Icon className="h-6 w-6 text-[#8B5DFF]" />
                                <h2 className="mt-4 text-lg font-semibold text-white">{benefit.title}</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-300">{benefit.description}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

function PlanCard({
    plan,
    currentTier,
    pendingRequest,
    isAuthenticated,
}: {
    plan: (typeof planCards)[number]
    currentTier: PlanTier
    pendingRequest: PremiumRequestRow | null
    isAuthenticated: boolean
}) {
    const Icon = plan.icon
    const isCurrent = currentTier === plan.tier
    const canRequest = plan.tier !== "free" && plan.tier !== currentTier
    const hasPendingRequest = pendingRequest?.requested_tier === plan.tier && pendingRequest.status === "pending"

    return (
        <div
            className={`rounded-3xl border p-8 shadow-sm transition-transform ${
                plan.featured
                    ? "border-[#8B5DFF] bg-gradient-to-b from-white to-violet-50 shadow-[0_20px_60px_rgba(139,93,255,0.15)]"
                    : "border-slate-200 bg-white"
            }`}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.accent} text-white`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-950">{plan.name}</h2>
                            <p className="text-sm text-slate-500">{plan.description}</p>
                        </div>
                    </div>
                </div>
                {plan.featured ? <Badge className="bg-[#8B5DFF] text-white hover:bg-[#8B5DFF]">Popular</Badge> : null}
            </div>

            <div className="mt-8 flex items-end gap-1">
                <span className="text-4xl font-semibold text-slate-950">{plan.price}</span>
                <span className="pb-1 text-sm text-slate-500">/ month</span>
            </div>

            {isCurrent ? (
                <div className="mt-5">
                    <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Current plan</Badge>
                </div>
            ) : null}

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                        <Check className="h-4 w-4 shrink-0 text-[#8B5DFF]" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-8">
                {!isAuthenticated ? (
                    <Button asChild className="w-full">
                        <Link href="/sign-in">Sign in to upgrade</Link>
                    </Button>
                ) : isCurrent ? (
                    <Button variant="outline" className="w-full" disabled>
                        You are on this plan
                    </Button>
                ) : canRequest ? (
                    hasPendingRequest ? (
                        <Button variant="outline" className="w-full" disabled>
                            Request pending
                        </Button>
                    ) : (
                        <form action={requestPremiumAccess} className="space-y-3">
                            <input type="hidden" name="requested_tier" value={plan.tier} />
                            <textarea
                                name="message"
                                rows={3}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#8B5DFF] focus:ring-2 focus:ring-[#8B5DFF]/20"
                                placeholder={`Tell us why you want ${plan.name.toLowerCase()} access`}
                            />
                            <Button type="submit" className="w-full bg-[#8B5DFF] text-white hover:bg-[#7b4de5]">
                                Request {plan.name} access
                            </Button>
                        </form>
                    )
                ) : (
                    <Button variant="outline" className="w-full" disabled>
                        Contact support to switch
                    </Button>
                )}
            </div>
        </div>
    )
}

export default async function PremiumPage({ searchParams }: { searchParams?: Promise<SearchParams> }) {
    const resolvedSearchParams = (await searchParams) ?? {}
    const supabase = await createSupabaseServerClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return <PublicPremiumView />
    }

    const [{ data: profile }, projectsResult, publishedResult, aiJobsResult, usageResult, requestResult, activityResult] =
        await Promise.all([
            supabase
                .from("user_profiles")
                .select("username, full_name, avatar_url, subscription_tier, credits_remaining")
                .eq("id", user.id)
                .maybeSingle<UserProfileRow>(),
            supabase.from("projects").select("id", { count: "exact", head: true }).eq("user_id", user.id),
            supabase
                .from("projects")
                .select("id", { count: "exact", head: true })
                .eq("user_id", user.id)
                .eq("status", "published"),
            supabase.from("ai_generation_jobs").select("id", { count: "exact", head: true }).eq("user_id", user.id),
            supabase.from("usage_analytics").select("id", { count: "exact", head: true }).eq("user_id", user.id),
            supabase
                .from("premium_requests")
                .select("id, requested_tier, status, message, created_at, reviewed_at")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false })
                .limit(1),
            supabase
                .from("usage_analytics")
                .select("event_type, event_data, created_at")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false })
                .limit(3),
        ])

    const latestRequest = requestResult.data?.[0] ?? null
    const recentActivity = activityResult.data ?? []
    const currentTier = normalizeTier(profile?.subscription_tier)
    const displayName = profile?.full_name || profile?.username || user.email?.split("@")[0] || "Creator"
    const creditsRemaining = profile?.credits_remaining ?? 0
    const isRequested = resolvedSearchParams.requested === "1"
    const isDuplicate = resolvedSearchParams.duplicate === "1"

    const summaryCards = [
        {
            label: "Projects",
            value: formatNumber(projectsResult.count ?? 0),
            note: "All projects connected to your Supabase profile",
            icon: Rocket,
        },
        {
            label: "Published",
            value: formatNumber(publishedResult.count ?? 0),
            note: "Live work visible to the community",
            icon: Sparkles,
        },
        {
            label: "AI jobs",
            value: formatNumber(aiJobsResult.count ?? 0),
            note: "Generation history stored in Supabase",
            icon: Zap,
        },
        {
            label: "Usage events",
            value: formatNumber(usageResult.count ?? 0),
            note: "Analytics events for the last active session history",
            icon: BarChart3,
        },
    ]

    return (
        <div className="min-h-screen bg-slate-50 text-slate-950">
            <section className="relative overflow-hidden bg-[linear-gradient(135deg,_#0f172a_0%,_#111827_45%,_#f8fafc_45%,_#f8fafc_100%)]">
                <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_top_left,_rgba(139,93,255,0.6),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.35),_transparent_30%)]" />
                <div className="relative container mx-auto px-4 py-16 md:py-20">
                    <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                        <div className="text-white">
                            <Badge className="border border-white/10 bg-white/10 text-white hover:bg-white/10">
                                Account connected to Supabase
                            </Badge>
                            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                                Premium access built around your real account, not placeholder content.
                            </h1>
                            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                                Welcome back, {displayName}. Your plan, usage, and premium request history are being loaded from Supabase so the page stays consistent across devices and sessions.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Badge className="border border-white/10 bg-white/10 px-4 py-2 text-white hover:bg-white/10">
                                    Current plan: {currentTier.toUpperCase()}
                                </Badge>
                                <Badge className="border border-white/10 bg-white/10 px-4 py-2 text-white hover:bg-white/10">
                                    Credits remaining: {formatNumber(creditsRemaining)}
                                </Badge>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Button asChild size="lg" className="bg-white text-slate-950 hover:bg-slate-100">
                                    <Link href="/create">Start a new project</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                                    <Link href="/premium#plans">Review plans</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">Status</p>
                                    <h2 className="text-2xl font-semibold">{currentTier.toUpperCase()} member</h2>
                                </div>
                                <div className="rounded-2xl bg-[#8B5DFF]/10 p-3 text-[#8B5DFF]">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                {summaryCards.slice(0, 2).map((card) => {
                                    const Icon = card.icon
                                    return (
                                        <div key={card.label} className="rounded-2xl border border-slate-200 p-4">
                                            <div className="flex items-center justify-between">
                                                <Icon className="h-5 w-5 text-[#8B5DFF]" />
                                                <span className="text-2xl font-semibold">{card.value}</span>
                                            </div>
                                            <p className="mt-3 text-sm font-medium text-slate-700">{card.label}</p>
                                            <p className="mt-1 text-xs leading-5 text-slate-500">{card.note}</p>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="mt-3 rounded-2xl bg-slate-950 p-4 text-white">
                                <p className="text-sm text-slate-300">Latest premium request</p>
                                <div className="mt-2 flex items-center justify-between gap-3">
                                    <span className="font-medium">
                                        {latestRequest ? `${latestRequest.requested_tier.toUpperCase()} · ${latestRequest.status}` : "No request yet"}
                                    </span>
                                    {latestRequest ? (
                                        <Badge className="bg-white/10 text-white hover:bg-white/10">
                                            {new Date(latestRequest.created_at).toLocaleDateString()}
                                        </Badge>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-14">
                {isRequested ? (
                    <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-emerald-900">
                        Your premium request was saved in Supabase and is now waiting for review.
                    </div>
                ) : null}

                {isDuplicate ? (
                    <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-amber-900">
                        You already have a pending request for this plan.
                    </div>
                ) : null}

                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {summaryCards.map((card) => {
                        const Icon = card.icon

                        return (
                            <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500">{card.label}</p>
                                        <p className="mt-2 text-3xl font-semibold">{card.value}</p>
                                    </div>
                                    <div className="rounded-2xl bg-[#8B5DFF]/10 p-3 text-[#8B5DFF]">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                </div>
                                <p className="mt-4 text-sm leading-6 text-slate-600">{card.note}</p>
                            </div>
                        )
                    })}
                </section>

                <section id="plans" className="mt-14">
                    <div className="mb-8 max-w-2xl">
                        <h2 className="text-3xl font-semibold tracking-tight">Choose the plan that matches your workload</h2>
                        <p className="mt-3 text-slate-600">
                            Paid access is now request-driven and stored in Supabase, which makes the experience auditable and ready for a support workflow.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {planCards.map((plan) => (
                            <PlanCard
                                key={plan.tier}
                                plan={plan}
                                currentTier={currentTier}
                                pendingRequest={latestRequest}
                                isAuthenticated
                            />
                        ))}
                    </div>
                </section>

                <section className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-[#8B5DFF]/10 p-3 text-[#8B5DFF]">
                                <Zap className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Premium request form</h3>
                                <p className="text-sm text-slate-500">Send a request to your Supabase-backed review queue.</p>
                            </div>
                        </div>

                        {currentTier === "free" || latestRequest?.status !== "pending" ? (
                            <div className="mt-6 space-y-5">
                                <p className="text-sm leading-6 text-slate-600">
                                    Add context here and your request will be stored in the database for later review.
                                </p>
                                <form action={requestPremiumAccess} className="space-y-4">
                                    <input type="hidden" name="requested_tier" value="pro" />
                                    <textarea
                                        name="message"
                                        rows={5}
                                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#8B5DFF] focus:ring-2 focus:ring-[#8B5DFF]/20"
                                        placeholder="Tell us what you need from Pro and how you plan to use it."
                                    />
                                    <Button type="submit" className="w-full bg-[#8B5DFF] text-white hover:bg-[#7b4de5]">
                                        Request Pro access
                                    </Button>
                                </form>
                            </div>
                        ) : (
                            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                                You already have a pending premium request. Once it is reviewed, the status will be visible here.
                            </div>
                        )}
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                                <ArrowRight className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Recent activity</h3>
                                <p className="text-sm text-slate-500">Latest events pulled from Supabase Analytics.</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            {recentActivity.length > 0 ? (
                                recentActivity.map((activity: any) => (
                                    <div key={`${activity.event_type}-${activity.created_at}`} className="rounded-2xl border border-slate-200 p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="font-medium text-slate-950">{prettyEventName(activity.event_type)}</p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    {activity.event_data && Object.keys(activity.event_data).length > 0
                                                        ? JSON.stringify(activity.event_data)
                                                        : "Recorded event from your account activity log."}
                                                </p>
                                            </div>
                                            <span className="text-xs text-slate-400">
                                                {new Date(activity.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
                                    No analytics events yet. Once you create projects or generate assets, this panel will update automatically.
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="mt-14 grid gap-6 md:grid-cols-3">
                    {productBenefits.map((benefit) => {
                        const Icon = benefit.icon

                        return (
                            <div key={benefit.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <Icon className="h-6 w-6 text-[#8B5DFF]" />
                                <h3 className="mt-4 text-lg font-semibold">{benefit.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>
                            </div>
                        )
                    })}
                </section>
            </main>
        </div>
    )
}
