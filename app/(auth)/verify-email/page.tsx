"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  CheckCircle,
  RefreshCw,
  AlertCircle,
  Clock,
  Edit2,
  Sparkles,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(5);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1); // Take only last character
    setCode(newCode);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every((digit) => digit !== "") && value) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      const newCode = pastedData.split("").concat(Array(6 - pastedData.length).fill(""));
      setCode(newCode);
      
      // Focus the next empty input or the last input
      const nextEmptyIndex = newCode.findIndex((d) => d === "");
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
        handleVerify(pastedData);
      }
    }
  };

  const handleVerify = async (codeString?: string) => {
    const verificationCode = codeString || code.join("");
    if (verificationCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);
    setError("");

    // Simulate API verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success/failure (for demo, code "123456" succeeds)
    if (verificationCode === "123456") {
      setIsVerified(true);
      // Redirect after animation
      setTimeout(() => {
        window.location.href = "/onboarding";
      }, 2000);
    } else {
      setAttemptsLeft(attemptsLeft - 1);
      if (attemptsLeft <= 1) {
        setError("Too many failed attempts. Please request a new code.");
      } else {
        setError(`Invalid code. ${attemptsLeft - 1} attempts remaining.`);
      }
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }

    setIsVerifying(false);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsResending(false);
    setResendCooldown(60);
    setAttemptsLeft(5);
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const maskEmail = (email: string) => {
    const [local, domain] = email.split("@");
    if (local.length <= 2) return email;
    return `${local[0]}${"*".repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">DesignDot</span>
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            {!isVerified ? (
              <motion.div
                key="verify"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-violet-600" />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
                  Check your email
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-center mb-2">
                  We sent a verification code to
                </p>
                <div className="flex items-center justify-center gap-2 mb-8">
                  <p className="font-medium text-slate-900 dark:text-white">
                    {maskEmail(email)}
                  </p>
                  <Link
                    href="/get-started"
                    className="text-violet-600 hover:text-violet-700"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                </div>

                {/* Code Input */}
                <div className="flex justify-center gap-3 mb-6">
                  {code.map((digit, index) => (
                    <motion.input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      disabled={isVerifying || attemptsLeft <= 0}
                      className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all outline-none ${
                        digit
                          ? "border-violet-600 bg-violet-50 dark:bg-violet-900/30"
                          : "border-slate-200 dark:border-slate-700"
                      } ${
                        error
                          ? "border-red-500 bg-red-50 dark:bg-red-900/30 animate-shake"
                          : ""
                      } focus:border-violet-600 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-800 disabled:opacity-50`}
                      whileFocus={{ scale: 1.05 }}
                    />
                  ))}
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 justify-center text-red-500 mb-6"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Verify Button */}
                <Button
                  onClick={() => handleVerify()}
                  disabled={code.some((d) => !d) || isVerifying || attemptsLeft <= 0}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 rounded-xl font-semibold text-lg disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Email
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                {/* Resend Link */}
                <div className="mt-6 text-center">
                  {resendCooldown > 0 ? (
                    <div className="flex items-center justify-center gap-2 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>Resend code in {resendCooldown}s</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleResend}
                      disabled={isResending}
                      className="flex items-center justify-center gap-2 text-violet-600 hover:text-violet-700 mx-auto"
                    >
                      {isResending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                      <span>Resend verification code</span>
                    </button>
                  )}
                </div>

                {/* Check Spam */}
                <p className="mt-6 text-sm text-slate-500 text-center">
                  Didn't receive the email? Check your spam folder or{" "}
                  <Link href="/support" className="text-violet-600 hover:underline">
                    contact support
                  </Link>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Email Verified!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Your email has been successfully verified.
                  <br />
                  Redirecting you to complete your profile...
                </p>
                <div className="flex justify-center">
                  <Loader2 className="w-6 h-6 text-violet-600 animate-spin" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security Notice */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
          <ShieldCheck className="w-4 h-4" />
          <span>Your data is protected with 256-bit encryption</span>
        </div>
      </motion.div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
