import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { LoginForm } from "@/components/auth/login-form"
import { FaShieldHalved } from "react-icons/fa6"

export const metadata: Metadata = {
    title: "Login — CreateDOT",
    description: "Sign in to your CreateDOT account to showcase work, discover inspiration, and connect with creative teams.",
}

export default function LoginPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-[#FAF7F0] dark:bg-[#111420] text-[#14161F] dark:text-white">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-[#B6C2F7]/35 to-transparent blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#FF6B6B]/25 via-[#FFE194]/20 to-transparent blur-[130px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-[440px]">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl shadow-md shadow-[#14161F]/15 group-hover:scale-105 transition-transform">
                            <Image
                                src="/images/appicon.png"
                                alt="CreateDOT"
                                width={44}
                                height={44}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-xl font-black tracking-tight text-[#14161F] dark:text-white">
                                CreateDOT<span className="text-[#FF6B6B]">.</span>
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#69728B]">
                                Curated Guild
                            </span>
                        </div>
                    </Link>
                    <h1 className="mt-6 text-3xl font-black tracking-tight text-[#14161F] dark:text-white">
                        Welcome Back.
                    </h1>
                    <p className="mt-2 text-sm text-[#5A637A] dark:text-[#9DA7C2]">
                        Continue showcasing your craft in the curated design guild
                    </p>
                </div>

                {/* Main Card */}
                <div className="rounded-[36px] border border-[#14161F]/8 dark:border-white/10 bg-white/90 dark:bg-white/[0.04] p-6 sm:p-9 shadow-2xl shadow-[#14161F]/5 backdrop-blur-xl">
                    <Suspense fallback={<div className="text-center text-sm py-8 text-muted-foreground animate-pulse">Loading login form...</div>}>
                        <LoginForm />
                    </Suspense>

                    <div className="mt-6 pt-5 border-t border-[#14161F]/8 dark:border-white/10 text-center">
                        <p className="text-xs text-[#5A637A] dark:text-[#9DA7C2]">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="font-bold text-[#FF6B6B] hover:underline">
                                Claim your profile free
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Trust Footer */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#647087] dark:text-[#9DA7C2]">
                    <FaShieldHalved className="h-3.5 w-3.5 text-[#10B981]" />
                    <span>Secure end-to-end creative cloud & authentication</span>
                </div>
            </div>
        </div>
    )
}
