"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { createClient } from "@/lib/supabase/client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2, Eye, EyeOff, Sparkles, Mail, Lock, Zap } from "lucide-react"

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

export function LoginForm() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [isDemoLoading, setIsDemoLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()
    const supabase = createClient()
    const redirectTo = searchParams?.get('redirectTo') || '/feed'

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password
            })

            if (error) {
                toast.error("Invalid credentials", {
                    description: error.message,
                })
            } else {
                toast.success("Signed in successfully! Welcome back.")
                router.push(redirectTo)
            }
        } catch (error) {
            toast.error("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDemoLogin = async () => {
        setIsDemoLoading(true)
        try {
            // Set demo cookie for middleware and client access
            document.cookie = `createdot_demo_user=true; path=/; max-age=86400`
            localStorage.setItem("createdot_demo_user", JSON.stringify({
                id: "demo-creator-1",
                name: "Abhinav",
                email: "abhinav@createdot.io",
                username: "abhinav",
                role: "creator",
                avatar_url: "/images/profile-image-4.png"
            }))
            toast.success("Welcome, Abhinav! Logged in to CreateDOT.")
            router.push(redirectTo)
        } catch (e) {
            toast.error("Could not activate demo mode")
        } finally {
            setIsDemoLoading(false)
        }
    }

    const handleOAuthSignIn = async (provider: 'github' | 'google') => {
        setIsLoading(true)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                }
            })
            if (error) throw error
        } catch (error: any) {
            toast.error("OAuth Error", { description: error.message })
            setIsLoading(false)
        }
    }

    return (
        <div className="grid gap-5">
            {/* Quick 1-Click Demo Login Banner */}
            <div className="relative group overflow-hidden rounded-2xl border border-[#14161F]/10 dark:border-white/10 bg-[#FAF0D7]/50 dark:bg-white/5 p-4 transition-all hover:border-[#FF6B6B]/40">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#14161F] text-white shadow-md">
                            <Zap className="h-4 w-4 text-[#FFE185]" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-[#8A6318] dark:text-[#FFE185] uppercase tracking-wider">Fast Preview</p>
                            <p className="text-xs text-[#647087] dark:text-[#9DA7C2] font-medium">Explore full creator experience instantly</p>
                        </div>
                    </div>
                    <Button
                        type="button"
                        size="sm"
                        onClick={handleDemoLogin}
                        disabled={isDemoLoading || isLoading}
                        className="bg-[#14161F] hover:bg-[#252B3F] text-white dark:bg-white dark:text-[#14161F] font-bold shadow-md rounded-full text-xs h-9 px-4"
                    >
                        {isDemoLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "1-Click Demo"}
                    </Button>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-bold text-[#14161F] dark:text-white">Email Address</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C96AB]" />
                                        <Input placeholder="name@example.com" className="pl-10 h-12 rounded-2xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-sm" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel className="text-xs font-bold text-[#14161F] dark:text-white">Password</FormLabel>
                                    <Link href="/forgot-password" className="text-xs text-[#FF6B6B] hover:underline font-bold">
                                        Forgot?
                                    </Link>
                                </div>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C96AB]" />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="pl-10 pr-10 h-12 rounded-2xl bg-white/70 dark:bg-white/5 border-[#14161F]/10 dark:border-white/10 text-sm"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C96AB] hover:text-[#14161F]"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full h-12 bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold rounded-full shadow-lg shadow-[#FF6B6B]/25 transition" disabled={isLoading}>
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In
                    </Button>
                </form>
            </Form>

            <div className="relative my-1">
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
                <Button variant="outline" type="button" className="h-11 rounded-full border-[#14161F]/15 dark:border-white/10 font-bold text-xs" disabled={isLoading} onClick={() => handleOAuthSignIn('github')}>
                    {isLoading ? (
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                    )}
                    GitHub
                </Button>
                <Button variant="outline" type="button" className="h-11 rounded-full border-[#14161F]/15 dark:border-white/10 font-bold text-xs" disabled={isLoading} onClick={() => handleOAuthSignIn('google')}>
                    {isLoading ? (
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>
                    )}
                    Google
                </Button>
            </div>
        </div>
    )
}

