"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
  Github,
  Chrome,
  Linkedin,
  Apple,
  AlertCircle,
  Loader2,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// ============ OAUTH BUTTONS ============
function OAuthButtons() {
  const providers = [
    { name: "Google", icon: <Chrome className="w-5 h-5" />, color: "hover:bg-red-50 hover:border-red-200" },
    { name: "GitHub", icon: <Github className="w-5 h-5" />, color: "hover:bg-slate-100 hover:border-slate-300" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, color: "hover:bg-blue-50 hover:border-blue-200" },
    { name: "Apple", icon: <Apple className="w-5 h-5" />, color: "hover:bg-slate-100 hover:border-slate-300" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {providers.map((provider) => (
        <Button
          key={provider.name}
          type="button"
          variant="outline"
          className={`h-12 ${provider.color} transition-colors`}
          title={`Sign in with ${provider.name}`}
        >
          {provider.icon}
        </Button>
      ))}
    </div>
  );
}

// ============ MAIN SIGN IN PAGE ============
export default function SignInPage() {
  const router = useRouter();

  // Form State
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Error State
  const [error, setError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  // Lockout countdown
  React.useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLocked) {
      return;
    }

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock authentication check
      // In production, this would call your auth API
      if (email === "demo@example.com" && password === "password123") {
        // Success - redirect to dashboard
        router.push("/dashboard");
      } else {
        // Failed attempt
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);

        if (attempts >= 5) {
          setIsLocked(true);
          setLockoutTime(300); // 5 minutes lockout
          setError("Too many failed attempts. Account locked for 5 minutes.");
        } else if (attempts >= 3) {
          setError(`Invalid email or password. ${5 - attempts} attempts remaining before lockout.`);
        } else {
          setError("Invalid email or password. Please try again.");
        }
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format lockout time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              DesignDot
            </span>
          </Link>

          {/* Form Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome back
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Sign in to continue to your account
            </p>
          </motion.div>

          {/* Lockout Warning */}
          {isLocked && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3"
            >
              <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-400">
                  Account Temporarily Locked
                </p>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                  Too many failed login attempts. Please wait {formatTime(lockoutTime)} before trying again.
                </p>
              </div>
            </motion.div>
          )}

          {/* OAuth Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <OAuthButtons />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white dark:bg-slate-900 text-slate-500">
                  or continue with email
                </span>
              </div>
            </div>
          </motion.div>

          {/* Sign In Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Error Message */}
            {error && !isLocked && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLocked}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-violet-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLocked}
                  className="pl-10 pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLocked}
              />
              <Label
                htmlFor="remember"
                className="text-sm cursor-pointer text-slate-600 dark:text-slate-400"
              >
                Remember me for 30 days
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || isLocked}
              className="w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : isLocked ? (
                <>
                  <ShieldAlert className="w-4 h-4 mr-2" />
                  Account Locked
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </motion.form>

          {/* Sign Up Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6"
          >
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-violet-600 hover:underline font-medium">
              Sign up
            </Link>
          </motion.p>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-2">
              Demo credentials for testing:
            </p>
            <div className="text-xs text-center">
              <span className="text-slate-600 dark:text-slate-300">
                demo@example.com / password123
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-violet-600 to-fuchsia-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
              <Sparkles className="w-12 h-12" />
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Welcome Back, Creator!
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-md">
              Your portfolio awaits. Sign in to continue creating and inspiring.
            </p>

            {/* Features List */}
            <div className="space-y-4 text-left max-w-sm">
              {[
                "Access your projects and portfolio",
                "Connect with your followers",
                "Discover new opportunities",
                "Track your analytics",
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <span className="text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
