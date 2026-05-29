"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Smartphone,
  Key,
  Copy,
  Check,
  Download,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Loader2,
  Eye,
  EyeOff,
  Lock,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Generate mock backup codes
const generateBackupCodes = () => {
  const codes: string[] = [];
  for (let i = 0; i < 8; i++) {
    const code = Math.random().toString(36).substring(2, 6).toUpperCase() + "-" +
                 Math.random().toString(36).substring(2, 6).toUpperCase();
    codes.push(code);
  }
  return codes;
};

export default function TwoFactorSetupPage() {
  const [step, setStep] = useState<"choose" | "authenticator" | "sms" | "backup" | "complete">("choose");
  const [method, setMethod] = useState<"authenticator" | "sms" | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [backupCodes] = useState(generateBackupCodes);
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [downloadedCodes, setDownloadedCodes] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  // Mock TOTP secret
  const totpSecret = "JBSWY3DPEHPK3PXP";
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/DesignDot:user@example.com?secret=" + totpSecret + "&issuer=DesignDot";

  const handleChooseMethod = (selectedMethod: "authenticator" | "sms") => {
    setMethod(selectedMethod);
    setStep(selectedMethod);
  };

  const handleVerifyAuthenticator = async () => {
    if (verificationCode.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setIsVerifying(true);
    setError("");

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo, "123456" is valid
    if (verificationCode === "123456") {
      setStep("backup");
    } else {
      setError("Invalid code. Please try again.");
    }

    setIsVerifying(false);
  };

  const handleVerifySMS = async () => {
    if (verificationCode.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setIsVerifying(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (verificationCode === "123456") {
      setStep("backup");
    } else {
      setError("Invalid code. Please try again.");
    }

    setIsVerifying(false);
  };

  const handleSendSMS = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsVerifying(true);
    setError("");

    // Simulate sending SMS
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsVerifying(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 2000);
  };

  const downloadCodes = () => {
    const blob = new Blob([
      "DesignDot Backup Codes\n",
      "========================\n",
      "Keep these codes in a safe place. Each code can only be used once.\n\n",
      backupCodes.join("\n"),
      "\n\nGenerated: " + new Date().toISOString(),
    ], { type: "text/plain" });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "designdot-backup-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
    setDownloadedCodes(true);
  };

  const handleComplete = () => {
    // Redirect to dashboard or onboarding
    window.location.href = "/dashboard";
  };

  const handleSkip = () => {
    // Allow skipping 2FA for now
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-[#8B5DFF] from-slate-50 to-violet-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">DesignDot</span>
        </Link>

        <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 1: Choose Method */}
            {step === "choose" && (
              <motion.div
                key="choose"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-violet-600" />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
                  Secure your account
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
                  Add an extra layer of security with two-factor authentication
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => handleChooseMethod("authenticator")}
                    className="w-full p-4 rounded-xl border-2 border-slate-200 dark:border-[#2A2A2A] hover:border-violet-500 text-left transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Smartphone className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            Authenticator App
                          </h3>
                          <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-[#8B5DFF] rounded-full">
                            Recommended
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          Use Google Authenticator, Authy, or 1Password
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 transition-colors" />
                    </div>
                  </button>

                  <button
                    onClick={() => handleChooseMethod("sms")}
                    className="w-full p-4 rounded-xl border-2 border-slate-200 dark:border-[#2A2A2A] hover:border-violet-500 text-left transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Key className="w-6 h-6 text-[#8B5DFF]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          SMS Verification
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          Receive codes via text message
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 transition-colors" />
                    </div>
                  </button>
                </div>

                <button
                  onClick={handleSkip}
                  className="w-full mt-6 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Skip for now (not recommended)
                </button>
              </motion.div>
            )}

            {/* Step 2a: Authenticator Setup */}
            {step === "authenticator" && (
              <motion.div
                key="authenticator"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <button
                  onClick={() => setStep("choose")}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-violet-600 mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Set up Authenticator
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Scan the QR code with your authenticator app
                </p>

                {/* QR Code */}
                <div className="bg-white p-4 rounded-xl mx-auto w-fit mb-6">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="w-48 h-48"
                    onError={(e) => {
                      e.currentTarget.src = "/api/placeholder/200/200";
                    }}
                  />
                </div>

                {/* Manual Entry */}
                <div className="bg-slate-50 dark:bg-[#111111] rounded-xl p-4 mb-6">
                  <p className="text-sm text-slate-500 mb-2">
                    Can't scan? Enter this code manually:
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white dark:bg-[#111111] px-3 py-2 rounded-lg font-mono text-sm">
                      {showSecret ? totpSecret : "••••••••••••••••"}
                    </code>
                    <button
                      onClick={() => setShowSecret(!showSecret)}
                      className="p-2 text-slate-400 hover:text-slate-600"
                    >
                      {showSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(totpSecret)}
                      className="p-2 text-slate-400 hover:text-violet-600"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Verification */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Enter the 6-digit code from your app
                  </label>
                  <Input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setVerificationCode(value);
                      setError("");
                    }}
                    placeholder="000000"
                    className="text-center text-2xl tracking-widest font-mono"
                    maxLength={6}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {error}
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleVerifyAuthenticator}
                  disabled={verificationCode.length !== 6 || isVerifying}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 rounded-xl font-semibold"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Step 2b: SMS Setup */}
            {step === "sms" && (
              <motion.div
                key="sms"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <button
                  onClick={() => setStep("choose")}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-violet-600 mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  SMS Verification
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  We'll send a verification code to your phone
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <select className="px-3 py-2 rounded-lg border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#111111]">
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+81">🇯🇵 +81</option>
                      </select>
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="(555) 123-4567"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSendSMS}
                    disabled={isVerifying || !phoneNumber}
                    variant="outline"
                    className="w-full"
                  >
                    {isVerifying ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="w-5 h-5 mr-2" />
                    )}
                    Send Verification Code
                  </Button>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Enter the 6-digit code
                    </label>
                    <Input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                        setVerificationCode(value);
                        setError("");
                      }}
                      placeholder="000000"
                      className="text-center text-2xl tracking-widest font-mono"
                      maxLength={6}
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        {error}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleVerifySMS}
                  disabled={verificationCode.length !== 6 || isVerifying}
                  className="w-full mt-6 bg-violet-600 hover:bg-violet-700 text-white py-6 rounded-xl font-semibold"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Step 3: Backup Codes */}
            {step === "backup" && (
              <motion.div
                key="backup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Key className="w-8 h-8 text-amber-600" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
                  Save your backup codes
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
                  Keep these codes safe. You'll need them if you lose access to your authenticator.
                </p>

                {/* Warning */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Important:</strong> Each code can only be used once. Store them securely offline.
                    </div>
                  </div>
                </div>

                {/* Backup Codes Grid */}
                <div className="bg-slate-50 dark:bg-[#111111] rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    {backupCodes.map((code, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-[#111111] px-3 py-2 rounded-lg font-mono text-sm text-center"
                      >
                        {code}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={copyToClipboard}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                      copiedCodes
                        ? "border-[#8B5DFF] bg-green-50 text-green-700"
                        : "border-slate-200 dark:border-[#2A2A2A] hover:border-violet-500"
                    }`}
                  >
                    {copiedCodes ? (
                      <>
                        <Check className="w-5 h-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadCodes}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                      downloadedCodes
                        ? "border-[#8B5DFF] bg-green-50 text-green-700"
                        : "border-slate-200 dark:border-[#2A2A2A] hover:border-violet-500"
                    }`}
                  >
                    {downloadedCodes ? (
                      <>
                        <Check className="w-5 h-5" />
                        Downloaded!
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download
                      </>
                    )}
                  </button>
                </div>

                <Button
                  onClick={() => setStep("complete")}
                  disabled={!copiedCodes && !downloadedCodes}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 rounded-xl font-semibold disabled:opacity-50"
                >
                  I've saved my codes
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* Step 4: Complete */}
            {step === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-[#8B5DFF]" />
                </motion.div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Two-factor authentication enabled!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Your account is now more secure. You'll need your {method === "authenticator" ? "authenticator app" : "phone"} when signing in.
                </p>

                <div className="bg-slate-50 dark:bg-[#111111] rounded-xl p-4 mb-8">
                  <div className="flex items-center justify-center gap-3">
                    <Lock className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {method === "authenticator" ? "Authenticator app" : "SMS verification"} is now active
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleComplete}
                  className="w-full bg-[#8B5DFF] from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-6 rounded-xl font-semibold"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
