"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Loader2,
  Fingerprint,
  Smartphone,
  Check,
  X,
} from "lucide-react";

// Social login providers
const socialProviders = [
  { id: "google", name: "Google", icon: "/icons/google.svg", color: "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700" },
  { id: "github", name: "GitHub", icon: "/icons/github.svg", color: "bg-slate-900 hover:bg-slate-800 text-white" },
  { id: "linkedin", name: "LinkedIn", icon: "/icons/linkedin.svg", color: "bg-[#0077B5] hover:bg-[#006097] text-white" },
  { id: "apple", name: "Apple", icon: "/icons/apple.svg", color: "bg-black hover:bg-slate-900 text-white" },
];

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [needs2FA, setNeeds2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [trustedDevice, setTrustedDevice] = useState(false);

  const { signIn } = useAuth();
  const router = useRouter();

  // Check for remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Save email if remember me is checked
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    try {
      const { error } = await signIn(email, password);

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        // Check if 2FA is required (mock)
        if (email.includes("2fa")) {
          setNeeds2FA(true);
          setLoading(false);
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleSocialSignIn = (provider: string) => {
    console.log(`Signing in with ${provider}`);
    // Implement OAuth flow
  };

  const verify2FA = async () => {
    setLoading(true);
    // Simulate 2FA verification
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (twoFactorCode === "123456") {
      router.push("/dashboard");
    } else {
      setError("Invalid verification code");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50 dark:from-slate-900 dark:to-slate-800 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">DesignDot</span>
          </Link>

          <AnimatePresence mode="wait">
            {!needs2FA ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Welcome back
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Sign in to continue to your creative journey
                </p>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {socialProviders.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => handleSocialSignIn(provider.id)}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${provider.color}`}
                    >
                      <img src={provider.icon} alt="" className="w-5 h-5" onError={(e) => e.currentTarget.style.display = 'none'} />
                      {provider.name}
                    </button>
                  ))}
                </div>

                <div className="relative flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                  <span className="text-sm text-slate-500">Or continue with email</span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-violet-600 hover:text-violet-700"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Remember me for 30 days
                    </span>
                  </label>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 rounded-xl font-semibold text-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Passkey / Biometric */}
                <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Fingerprint className="w-5 h-5" />
                  Sign in with Passkey
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="2fa"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button
                  onClick={() => setNeeds2FA(false)}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-violet-600 mb-6"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back
                </button>

                <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="w-8 h-8 text-violet-600" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
                  Two-factor authentication
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
                  Enter the 6-digit code from your authenticator app
                </p>

                <div className="space-y-4">
                  <Input
                    type="text"
                    value={twoFactorCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setTwoFactorCode(value);
                      setError("");
                    }}
                    placeholder="000000"
                    className="text-center text-2xl tracking-widest font-mono py-6"
                    maxLength={6}
                  />

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={trustedDevice}
                      onChange={(e) => setTrustedDevice(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Trust this device for 30 days
                    </span>
                  </label>

                  <Button
                    onClick={verify2FA}
                    disabled={twoFactorCode.length !== 6 || loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 rounded-xl font-semibold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify"
                    )}
                  </Button>

                  <p className="text-center text-sm text-slate-500">
                    Lost your authenticator?{" "}
                    <Link href="/recover-2fa" className="text-violet-600 hover:underline">
                      Use backup code
                    </Link>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign Up Link */}
          <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link href="/get-started" className="text-violet-600 dark:text-violet-400 font-medium hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-violet-600 to-fuchsia-600 items-center justify-center p-8">
        <div className="max-w-md text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Your creative workspace awaits
            </h2>
            <p className="text-white/80 mb-8">
              Access your portfolio, connect with clients, and discover amazing design inspiration.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-4xl font-bold">5M+</div>
                <div className="text-white/70 text-sm">Creators</div>
              </div>
              <div>
                <div className="text-4xl font-bold">10M+</div>
                <div className="text-white/70 text-sm">Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold">150K+</div>
                <div className="text-white/70 text-sm">Hires</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
