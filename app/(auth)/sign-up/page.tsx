"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Brush,
  Briefcase
} from "lucide-react";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"creator" | "client">("creator");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signUp } = useAuth();
  const router = useRouter();

  // Password strength calculator
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const { error } = await signUp(email, password, { full_name: fullName, role });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        router.push("/onboarding");
      }
    } catch (err) {
      setError("An error occurred during signup. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0B0C] text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Left Side - Form Card */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-[#121215] p-8 md:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-purple-500/5"
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#8B5DFF] to-violet-500 rounded-xl flex items-center justify-center shadow-md shadow-[#8B5DFF]/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#8B5DFF] to-indigo-600 bg-clip-text text-transparent">
              CreateDOT
            </span>
          </Link>

          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            Join the AI-powered creative engine and portfolio platform.
          </p>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl">
            <button
              type="button"
              onClick={() => setRole("creator")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                role === "creator"
                  ? "bg-white dark:bg-[#1C1C22] text-[#8B5DFF] shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Brush className="w-4 h-4" /> Creator / Designer
            </button>
            <button
              type="button"
              onClick={() => setRole("client")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                role === "client"
                  ? "bg-white dark:bg-[#1C1C22] text-[#8B5DFF] shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-4 h-4" /> Client / Hiring
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 rounded-xl text-rose-600 dark:text-rose-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-9 h-11"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Work Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="email"
                  placeholder="alex@createdot.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-11"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-9 h-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strengthScore <= 1
                          ? "bg-rose-500 w-1/4"
                          : strengthScore === 2
                          ? "bg-amber-500 w-2/4"
                          : strengthScore === 3
                          ? "bg-blue-500 w-3/4"
                          : "bg-emerald-500 w-full"
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-slate-500">
                    {strengthScore <= 1 ? "Weak" : strengthScore === 2 ? "Fair" : strengthScore === 3 ? "Good font" : "Strong"}
                  </span>
                </div>
              )}
            </div>

            <div>
              <Label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-9 h-11"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B5DFF] hover:bg-[#7B4DE5] text-white py-5 rounded-xl font-semibold shadow-md shadow-[#8B5DFF]/20 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account & Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-slate-600 dark:text-slate-400 mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#8B5DFF] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Visual Hero */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#8B5DFF] via-purple-700 to-indigo-900 items-center justify-center p-12 overflow-hidden">
        <div className="max-w-lg text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-white leading-tight">
              Unleash Your Creative Potential
            </h2>
            <p className="text-white/80 text-base mb-8 leading-relaxed max-w-md mx-auto">
              Build stunning portfolios, generate AI design briefs, and showcase your work to a global community of top creatives and clients.
            </p>

            <div className="space-y-3 text-left max-w-sm mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-white/90">AI-Powered Canvas & Design Suggestions</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-white/90">Custom Portfolio Showcase & Custom Domains</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-white/90">Direct Client Hiring & Messaging Platform</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
