"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  AtSign,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Paintbrush,
  Briefcase,
  Building2,
  GraduationCap,
  Shield,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Social login providers
const socialProviders = [
  { id: "google", name: "Google", icon: "/icons/google.svg", color: "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700" },
  { id: "github", name: "GitHub", icon: "/icons/github.svg", color: "bg-[#111111] hover:bg-[#111111] text-white" },
  { id: "linkedin", name: "LinkedIn", icon: "/icons/linkedin.svg", color: "bg-[#0077B5] hover:bg-[#006097] text-white" },
  { id: "apple", name: "Apple", icon: "/icons/apple.svg", color: "bg-[#0B0B0C] hover:bg-[#111111] text-white" },
];

const importProviders = [
  { id: "behance", name: "Behance", icon: "/icons/behance.svg", description: "Import your Behance portfolio" },
  { id: "dribbble", name: "Dribbble", icon: "/icons/dribbble.svg", description: "Import your Dribbble shots" },
];

const accountTypes = [
  { id: "creator", icon: Paintbrush, label: "Creator/Designer", description: "Showcase work & get hired" },
  { id: "client", icon: Briefcase, label: "Client/Company", description: "Find & hire talent" },
  { id: "agency", icon: Building2, label: "Agency", description: "Manage team portfolios" },
  { id: "student", icon: GraduationCap, label: "Student", description: "Build your first portfolio" },
];

const passwordRequirements = [
  { id: "length", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { id: "uppercase", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { id: "number", label: "One number", test: (p: string) => /\d/.test(p) },
  { id: "special", label: "One special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

const howDidYouHear = [
  "Google Search",
  "Social Media",
  "Friend/Colleague",
  "Blog/Article",
  "Design Community",
  "Job Board",
  "Advertisement",
  "Other",
];

export default function EnhancedSignupPage() {
  // Form state
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [howHeard, setHowHeard] = useState("");
  
  // Consent state
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [isOver13, setIsOver13] = useState(false);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check for pre-signup interest
  useEffect(() => {
    const interest = sessionStorage.getItem("signup-interest");
    if (interest) {
      setAccountType(interest);
    }
  }, []);

  // Email validation with domain suggestion
  useEffect(() => {
    if (email && email.includes("@")) {
      const domain = email.split("@")[1] ?? "";
      const commonDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
      const closest = commonDomains.find(
        (d) => d.startsWith(domain.slice(0, 3)) && d !== domain
      );
      if (closest && domain.length > 2 && domain !== closest) {
        setEmailSuggestion(email.split("@")[0] + "@" + closest);
      } else {
        setEmailSuggestion("");
      }
    } else {
      setEmailSuggestion("");
    }
  }, [email]);

  // Username availability check (debounced)
  useEffect(() => {
    if (username.length >= 3) {
      setUsernameStatus("checking");
      const timer = setTimeout(() => {
        // Simulate API check
        const taken = ["admin", "createdot", "test", "user"];
        if (taken.includes(username.toLowerCase())) {
          setUsernameStatus("taken");
          setUsernameSuggestions([
            username + Math.floor(Math.random() * 100),
            username + "_design",
            username + ".creator",
          ]);
        } else {
          setUsernameStatus("available");
          setUsernameSuggestions([]);
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setUsernameStatus("idle");
    }
    return undefined;
  }, [username]);

  // Auto-generate username from name
  useEffect(() => {
    if (firstName && lastName && !username) {
      const suggested = (firstName + lastName).toLowerCase().replace(/\s/g, "");
      setUsername(suggested);
    }
  }, [firstName, lastName]);

  const getPasswordStrength = () => {
    let strength = 0;
    passwordRequirements.forEach((req) => {
      if (req.test(password)) strength++;
    });
    return strength;
  };

  const getPasswordStrengthLabel = () => {
    const strength = getPasswordStrength();
    if (strength === 0) return { label: "", color: "" };
    if (strength === 1) return { label: "Weak", color: "bg-red-500" };
    if (strength === 2) return { label: "Fair", color: "bg-orange-500" };
    if (strength === 3) return { label: "Good", color: "bg-yellow-500" };
    return { label: "Excellent", color: "bg-[#8B5DFF]" };
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Signing up with ${provider}`);
    // Implement OAuth flow
  };

  const handleImport = (provider: string) => {
    console.log(`Importing from ${provider}`);
    // Implement portfolio import
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    else if (getPasswordStrength() < 3) newErrors.password = "Password is too weak";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    if (username.length < 3) newErrors.username = "Username must be at least 3 characters";
    else if (usernameStatus === "taken") newErrors.username = "Username is taken";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!accountType) newErrors.accountType = "Please select an account type";
    if (!isOver13) newErrors.age = "You must be at least 13 years old";
    if (!agreeTerms) newErrors.terms = "You must agree to the Terms of Service";
    if (!agreePrivacy) newErrors.privacy = "You must agree to the Privacy Policy";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else {
      if (validateStep2()) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Redirect to verification page
        window.location.href = "/verify-email?email=" + encodeURIComponent(email);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#8B5DFF] from-slate-50 to-violet-50 dark:from-slate-900 dark:to-slate-800 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-lg"
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">CreateDOT</span>
          </Link>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-violet-600" : "bg-slate-200 dark:bg-slate-700"}`} />
            <div className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-violet-600" : "bg-slate-200 dark:bg-slate-700"}`} />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Create your account
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Join millions of creatives on CreateDOT
                </p>

                {/* Social Signup */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {socialProviders.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => handleSocialSignup(provider.id)}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${provider.color}`}
                    >
                      <img src={provider.icon} alt="" className="w-5 h-5" onError={(e) => e.currentTarget.style.display = 'none'} />
                      {provider.name}
                    </button>
                  ))}
                </div>

                {/* Portfolio Import */}
                <div className="flex gap-3 mb-6">
                  {importProviders.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => handleImport(provider.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-violet-500 hover:text-violet-600 transition-all"
                    >
                      <img src={provider.icon} alt="" className="w-5 h-5" onError={(e) => e.currentTarget.style.display = 'none'} />
                      Import from {provider.name}
                    </button>
                  ))}
                </div>

                <div className="relative flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                  <span className="text-sm text-slate-500">Or sign up with email</span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
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
                        placeholder="john@example.com"
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                      />
                    </div>
                    {emailSuggestion && (
                      <button
                        type="button"
                        onClick={() => setEmail(emailSuggestion)}
                        className="text-violet-600 text-sm mt-1 hover:underline"
                      >
                        Did you mean {emailSuggestion}?
                      </button>
                    )}
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Username
                    </label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, ""))}
                        placeholder="johndoe"
                        className={`pl-10 pr-10 ${errors.username ? "border-red-500" : ""}`}
                      />
                      {usernameStatus === "checking" && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 animate-spin" />
                      )}
                      {usernameStatus === "available" && (
                        <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B5DFF]" />
                      )}
                      {usernameStatus === "taken" && (
                        <X className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <p className="text-slate-500 text-xs mt-1">createdot.com/@{username || "username"}</p>
                    {usernameStatus === "taken" && usernameSuggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {usernameSuggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => setUsername(suggestion)}
                            className="text-xs px-2 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full hover:bg-violet-200"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    {errors.username && (
                      <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Strength */}
                    {password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-2">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full ${
                                getPasswordStrength() >= level
                                  ? getPasswordStrengthLabel().color
                                  : "bg-slate-200 dark:bg-slate-700"
                              }`}
                            />
                          ))}
                        </div>
                        <p className={`text-xs ${getPasswordStrength() >= 3 ? "text-[#8B5DFF]" : "text-orange-500"}`}>
                          {getPasswordStrengthLabel().label}
                        </p>
                        <div className="grid grid-cols-2 gap-1 mt-2">
                          {passwordRequirements.map((req) => (
                            <div
                              key={req.id}
                              className={`flex items-center gap-1 text-xs ${
                                req.test(password) ? "text-[#8B5DFF]" : "text-slate-400"
                              }`}
                            >
                              {req.test(password) ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <X className="w-3 h-3" />
                              )}
                              {req.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">Passwords don't match</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 rounded-xl font-semibold text-lg"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-violet-600 mb-6"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back
                </button>

                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Almost there!
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Tell us a bit more about yourself
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Account Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      What best describes you?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {accountTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setAccountType(type.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            accountType === type.id
                              ? "border-violet-600 bg-violet-50 dark:bg-violet-900/30"
                              : "border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300"
                          }`}
                        >
                          <type.icon
                            className={`w-6 h-6 mb-2 ${
                              accountType === type.id
                                ? "text-violet-600"
                                : "text-slate-400"
                            }`}
                          />
                          <div className="font-medium text-slate-900 dark:text-white text-sm">
                            {type.label}
                          </div>
                          <div className="text-xs text-slate-500">{type.description}</div>
                        </button>
                      ))}
                    </div>
                    {errors.accountType && (
                      <p className="text-red-500 text-xs mt-1">{errors.accountType}</p>
                    )}
                  </div>

                  {/* Referral Code */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Referral Code (Optional)
                    </label>
                    <Input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                      placeholder="FRIEND2026"
                      className="uppercase"
                    />
                  </div>

                  {/* How did you hear */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      How did you hear about us? (Optional)
                    </label>
                    <select
                      value={howHeard}
                      onChange={(e) => setHowHeard(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#111111] text-slate-900 dark:text-white"
                    >
                      <option value="">Select an option</option>
                      {howDidYouHear.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Consents */}
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isOver13}
                        onChange={(e) => setIsOver13(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 mt-0.5"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        I confirm that I am at least 13 years old
                      </span>
                    </label>
                    {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 mt-0.5"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        I agree to the{" "}
                        <Link href="/terms" className="text-violet-600 hover:underline">
                          Terms of Service
                        </Link>
                      </span>
                    </label>
                    {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreePrivacy}
                        onChange={(e) => setAgreePrivacy(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 mt-0.5"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        I agree to the{" "}
                        <Link href="/privacy" className="text-violet-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    {errors.privacy && <p className="text-red-500 text-xs">{errors.privacy}</p>}

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeMarketing}
                        onChange={(e) => setAgreeMarketing(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 mt-0.5"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Send me tips, trends, and special offers (optional)
                      </span>
                    </label>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-green-700 dark:text-[#8B5DFF]">
                      <strong>Your data is secure.</strong> We use industry-standard encryption to protect your information.
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 rounded-xl font-semibold text-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign In Link */}
          <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-violet-600 dark:text-violet-400 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 items-center justify-center p-8">
        <div className="max-w-md text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Join the world's largest creative community
            </h2>
            <p className="text-white/80 mb-8">
              Showcase your work, discover inspiration, and connect with millions of designers worldwide.
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
