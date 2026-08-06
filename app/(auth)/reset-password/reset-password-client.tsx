"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
  ShieldCheck,
  XCircle,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function PasswordStrengthIndicator({ password }: { password: string }) {
  const requirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
    { label: "One special character", met: /[!@#$%^&*(),.?\":{}|<>]/.test(password) },
  ];

  const strength = requirements.filter((r) => r.met).length;
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-[#8B5DFF]"];

  return (
    <div className="space-y-3 mt-3">
      <div className="space-y-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < strength ? strengthColors[strength - 1] : "bg-slate-200 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
        {password.length > 0 && (
          <p
            className={`text-xs font-medium ${
              strength >= 4 ? "text-green-600" : strength >= 3 ? "text-yellow-600" : "text-red-600"
            }`}
          >
            Password Strength: {strengthLabels[strength - 1] || "Very Weak"}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        {requirements.map((req, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-2 text-xs"
          >
            {req.met ? (
              <Check className="w-3.5 h-3.5 text-[#8B5DFF]" />
            ) : (
              <X className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
            )}
            <span className={req.met ? "text-green-600 dark:text-[#8B5DFF]" : "text-slate-500"}>
              {req.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const validateToken = async () => {
      setIsValidating(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsTokenValid(Boolean(token && token.length > 5));
      } catch (err) {
        console.error("Token validation error:", err);
        setIsTokenValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  useEffect(() => {
    if (isSubmitted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isSubmitted && countdown === 0) {
      router.push("/signin");
    }
    return undefined;
  }, [isSubmitted, countdown, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter a new password");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (err) {
      console.error("Password reset error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Loader2 className="w-12 h-12 text-violet-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Validating reset link...</p>
        </motion.div>
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Invalid or Expired Link
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            This password reset link is invalid or has expired. Reset links are only valid for 24 hours.
          </p>
          <Link href="/forgot-password">
            <Button className="w-full h-12 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
              Request New Reset Link
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-[#8B5DFF] from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              CreateDOT
            </span>
          </Link>

          {!isSubmitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Reset your password
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Create a new secure password for your account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">New password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <PasswordStrengthIndicator password={password} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 pr-10 h-12 ${
                        confirmPassword && password !== confirmPassword
                          ? "border-red-500"
                          : confirmPassword && password === confirmPassword
                          ? "border-[#8B5DFF]"
                          : ""
                      }`}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Passwords do not match
                    </p>
                  )}
                  {confirmPassword && password === confirmPassword && (
                    <p className="text-sm text-[#8B5DFF] flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Passwords match
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={isLoading} className="w-full h-12 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Resetting password...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      Reset Password
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-[#8B5DFF]" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Password Reset Successfully
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Your password has been updated. You can now sign in with your new password.
              </p>
              <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-violet-700 dark:text-violet-300">
                  Redirecting to sign in in <strong>{countdown}</strong> seconds...
                </p>
              </div>
              <Link href="/signin">
                <Button className="w-full h-12 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
                  Sign In Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Secure Your Account</h2>
            <p className="text-white/80 text-lg max-w-md">
              Choose a strong, unique password to keep your creative work and account safe.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
