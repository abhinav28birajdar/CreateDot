"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User,
  Briefcase,
  FileText,
  Images,
  Share2,
  Heart,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Check,
  Camera,
  Plus,
  X,
  MapPin,
  Globe,
  Sparkles,
  Upload,
  ExternalLink,
  Loader2,
  ChevronDown,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Step definitions
const steps = [
  { id: 1, icon: User, label: "Profile Basics", description: "Name, photo, location" },
  { id: 2, icon: Briefcase, label: "Professional Info", description: "Skills, experience" },
  { id: 3, icon: FileText, label: "Bio & About", description: "Tell your story" },
  { id: 4, icon: Images, label: "Portfolio", description: "Import or upload work" },
  { id: 5, icon: Share2, label: "Social Links", description: "Connect accounts" },
  { id: 6, icon: Heart, label: "Interests", description: "Preferences & styles" },
  { id: 7, icon: Calendar, label: "Availability", description: "Hiring preferences" },
];

// Skills data
const skillCategories = [
  {
    name: "Design",
    skills: ["UI Design", "UX Design", "Web Design", "Mobile Design", "Graphic Design", "Brand Design", "Motion Design", "3D Design", "Illustration", "Icon Design", "Typography"],
  },
  {
    name: "Development",
    skills: ["Frontend", "Backend", "Full-Stack", "React", "Vue", "Angular", "Node.js", "Python", "iOS", "Android", "Flutter"],
  },
  {
    name: "Creative",
    skills: ["Photography", "Video Production", "Animation", "Sound Design", "Game Design", "AR/VR", "NFT Art"],
  },
];

// Experience levels
const experienceLevels = [
  { id: "student", label: "Student", description: "Still learning & building skills" },
  { id: "junior", label: "Junior (0-2 years)", description: "Starting professional career" },
  { id: "mid", label: "Mid-level (2-5 years)", description: "Experienced professional" },
  { id: "senior", label: "Senior (5-10 years)", description: "Expert in your field" },
  { id: "lead", label: "Lead/Director (10+ years)", description: "Industry veteran" },
];

// Design styles
const designStyles = [
  "Minimalist", "Bold & Vibrant", "Corporate", "Playful", "Elegant", "Retro/Vintage",
  "Futuristic", "Organic/Natural", "Abstract", "Brutalist", "Neomorphic", "Glassmorphism",
];

// Industries
const industries = [
  "Technology", "Healthcare", "Finance", "E-commerce", "Education", "Entertainment",
  "Fashion", "Food & Beverage", "Real Estate", "Travel", "Automotive", "Gaming",
];

// Social platforms
const socialPlatforms = [
  { id: "website", label: "Personal Website", icon: Globe, placeholder: "https://yoursite.com" },
  { id: "behance", label: "Behance", icon: ExternalLink, placeholder: "behance.net/username" },
  { id: "dribbble", label: "Dribbble", icon: ExternalLink, placeholder: "dribbble.com/username" },
  { id: "github", label: "GitHub", icon: ExternalLink, placeholder: "github.com/username" },
  { id: "linkedin", label: "LinkedIn", icon: ExternalLink, placeholder: "linkedin.com/in/username" },
  { id: "twitter", label: "Twitter/X", icon: ExternalLink, placeholder: "@username" },
  { id: "instagram", label: "Instagram", icon: ExternalLink, placeholder: "@username" },
  { id: "youtube", label: "YouTube", icon: ExternalLink, placeholder: "youtube.com/@channel" },
];

// Availability options
const availabilityOptions = [
  { id: "fulltime", label: "Full-time", description: "40+ hours/week" },
  { id: "parttime", label: "Part-time", description: "10-30 hours/week" },
  { id: "freelance", label: "Freelance/Contract", description: "Project-based work" },
  { id: "notavailable", label: "Not Available", description: "Just showcasing work" },
];

const projectTypes = [
  "Web Design", "Mobile App", "Branding", "Illustration", "UI/UX Design",
  "3D/Motion", "Print Design", "Social Media", "Marketing", "Consulting",
];

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Step 1: Profile Basics
  const [displayName, setDisplayName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [pronouns, setPronouns] = useState("");

  // Step 2: Professional Info
  const [headline, setHeadline] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [currentRole, setCurrentRole] = useState("");

  // Step 3: Bio & About
  const [bio, setBio] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [achievements, setAchievements] = useState<string[]>([""]);

  // Step 4: Portfolio
  const [importSource, setImportSource] = useState<string | null>(null);
  const [importUrl, setImportUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [uploadedProjects, setUploadedProjects] = useState<{ name: string; image: string }[]>([]);

  // Step 5: Social Links
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});

  // Step 6: Interests
  const [favoriteStyles, setFavoriteStyles] = useState<string[]>([]);
  const [interestedIndustries, setInterestedIndustries] = useState<string[]>([]);
  const [followTopics, setFollowTopics] = useState<string[]>([]);

  // Step 7: Availability
  const [availability, setAvailability] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [preferredProjects, setPreferredProjects] = useState<string[]>([]);
  const [openToRemote, setOpenToRemote] = useState(true);
  const [openToRelocate, setOpenToRelocate] = useState(false);

  // Pre-fill from interest selection
  useEffect(() => {
    const interest = sessionStorage.getItem("signup-interest");
    if (interest === "hiring") {
      setAvailability("notavailable");
    }
  }, []);

  const handlePhotoUpload = (type: "profile" | "cover") => {
    // Simulate file upload
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (type === "profile") {
            setProfilePhoto(reader.result as string);
          } else {
            setCoverPhoto(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 10) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleImport = async () => {
    if (!importUrl) return;
    setIsImporting(true);
    // Simulate import
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setUploadedProjects([
      { name: "E-commerce Redesign", image: "/api/placeholder/400/300" },
      { name: "Mobile Banking App", image: "/api/placeholder/400/300" },
      { name: "Brand Identity System", image: "/api/placeholder/400/300" },
    ]);
    setIsImporting(false);
  };

  const handleProjectUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            setUploadedProjects((prev) => [
              ...prev,
              { name: file.name.replace(/\.[^/.]+$/, ""), image: reader.result as string },
            ]);
          };
          reader.readAsDataURL(file);
        });
      }
    };
    input.click();
  };

  const addAchievement = () => {
    setAchievements([...achievements, ""]);
  };

  const updateAchievement = (index: number, value: string) => {
    const newAchievements = [...achievements];
    newAchievements[index] = value;
    setAchievements(newAchievements);
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return displayName.trim().length > 0;
      case 2:
        return selectedSkills.length > 0 && experienceLevel;
      case 3:
        return bio.trim().length >= 50;
      case 4:
        return true; // Optional step
      case 5:
        return true; // Optional step
      case 6:
        return favoriteStyles.length > 0;
      case 7:
        return availability !== "";
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Redirect to dashboard
    window.location.href = "/dashboard";
  };

  const handleSkip = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border-b border-slate-200 dark:border-[#1F1F1F] z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#8B5DFF] from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">DesignDot</span>
          </Link>

          <button
            onClick={handleSkip}
            className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            Skip for now
          </button>
        </div>
      </header>

      <div className="pt-24 pb-32 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="hidden md:flex items-center justify-between mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                  className={`flex flex-col items-center gap-2 ${
                    step.id <= currentStep ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      step.id < currentStep
                        ? "bg-[#8B5DFF] text-white"
                        : step.id === currentStep
                        ? "bg-violet-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      step.id === currentStep ? "text-violet-600" : "text-slate-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      step.id < currentStep ? "bg-[#8B5DFF]" : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Step {currentStep} of 7
              </span>
              <span className="text-sm text-slate-500">{steps[currentStep - 1].label}</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-600 transition-all"
                style={{ width: `${(currentStep / 7) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-[#111111] rounded-2xl shadow-xl p-6 md:p-8"
            >
              {/* Step 1: Profile Basics */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Let's set up your profile
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Add your basic information so others can find and recognize you
                    </p>
                  </div>

                  {/* Cover Photo */}
                  <div className="relative">
                    <div
                      onClick={() => handlePhotoUpload("cover")}
                      className="h-32 md:h-48 bg-[#8B5DFF] from-violet-500 to-fuchsia-500 rounded-xl overflow-hidden cursor-pointer group"
                    >
                      {coverPhoto ? (
                        <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/60 group-hover:text-white/80 transition-colors">
                          <div className="text-center">
                            <Camera className="w-8 h-8 mx-auto mb-2" />
                            <span>Add cover photo</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Profile Photo */}
                    <div
                      onClick={() => handlePhotoUpload("profile")}
                      className="absolute -bottom-12 left-6 w-24 h-24 bg-white dark:bg-slate-700 rounded-full border-4 border-white dark:border-[#1F1F1F] overflow-hidden cursor-pointer group"
                    >
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors">
                          <Camera className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-8 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Display Name *
                      </label>
                      <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="How should we call you?"
                        className="text-lg"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <Input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="City, Country"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Timezone
                        </label>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#111111]"
                        >
                          <option value="">Select timezone</option>
                          <option value="PST">Pacific Time (PST)</option>
                          <option value="EST">Eastern Time (EST)</option>
                          <option value="GMT">Greenwich Mean Time (GMT)</option>
                          <option value="CET">Central European Time (CET)</option>
                          <option value="IST">India Standard Time (IST)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Pronouns (Optional)
                      </label>
                      <select
                        value={pronouns}
                        onChange={(e) => setPronouns(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#111111]"
                      >
                        <option value="">Select pronouns</option>
                        <option value="he/him">He/Him</option>
                        <option value="she/her">She/Her</option>
                        <option value="they/them">They/Them</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Professional Info */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Your professional profile
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Tell us about your skills and experience
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Professional Headline
                    </label>
                    <Input
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="e.g., Senior Product Designer at Google"
                      maxLength={100}
                    />
                    <p className="text-xs text-slate-500 mt-1">{headline.length}/100</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Current Company
                      </label>
                      <Input
                        value={currentCompany}
                        onChange={(e) => setCurrentCompany(e.target.value)}
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Current Role
                      </label>
                      <Input
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                        placeholder="Job title"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Experience Level *
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {experienceLevels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => setExperienceLevel(level.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            experienceLevel === level.id
                              ? "border-violet-600 bg-violet-50 dark:bg-violet-900/30"
                              : "border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300"
                          }`}
                        >
                          <div className="font-medium text-slate-900 dark:text-white">
                            {level.label}
                          </div>
                          <div className="text-sm text-slate-500">{level.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Skills * (Select up to 10)
                    </label>
                    <p className="text-sm text-slate-500 mb-3">
                      {selectedSkills.length}/10 selected
                    </p>
                    {skillCategories.map((category) => (
                      <div key={category.name} className="mb-4">
                        <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                          {category.name}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <button
                              key={skill}
                              onClick={() => toggleSkill(skill)}
                              disabled={!selectedSkills.includes(skill) && selectedSkills.length >= 10}
                              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                                selectedSkills.includes(skill)
                                  ? "bg-violet-600 text-white"
                                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 disabled:opacity-50"
                              }`}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Bio & About */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Tell your story
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Share what makes you unique
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Bio * (at least 50 characters)
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Write a short bio about yourself, your background, and what you're passionate about..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#111111] text-slate-900 dark:text-white resize-none"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span className={bio.length < 50 ? "text-red-500" : "text-[#8B5DFF]"}>
                        {bio.length}/50 minimum
                      </span>
                      <span>{bio.length}/500</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      What do you specialize in?
                    </label>
                    <Input
                      value={specialties}
                      onChange={(e) => setSpecialties(e.target.value)}
                      placeholder="e.g., E-commerce design, SaaS products, Mobile apps"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Key Achievements
                    </label>
                    <div className="space-y-2">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={achievement}
                            onChange={(e) => updateAchievement(index, e.target.value)}
                            placeholder={`e.g., Won Awwwards Site of the Day`}
                          />
                          {achievements.length > 1 && (
                            <button
                              onClick={() => removeAchievement(index)}
                              className="p-2 text-slate-400 hover:text-red-500"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={addAchievement}
                      className="mt-2 flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700"
                    >
                      <Plus className="w-4 h-4" />
                      Add another achievement
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Portfolio */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Set up your portfolio
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Import from other platforms or upload your work
                    </p>
                  </div>

                  {/* Import Options */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setImportSource("behance")}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        importSource === "behance"
                          ? "border-[#8B5DFF] bg-blue-50 dark:bg-blue-900/30"
                          : "border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300"
                      }`}
                    >
                      <div className="font-medium text-slate-900 dark:text-white mb-1">
                        Import from Behance
                      </div>
                      <p className="text-sm text-slate-500">
                        Automatically import your Behance projects
                      </p>
                    </button>
                    <button
                      onClick={() => setImportSource("dribbble")}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        importSource === "dribbble"
                          ? "border-pink-500 bg-pink-50 dark:bg-pink-900/30"
                          : "border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300"
                      }`}
                    >
                      <div className="font-medium text-slate-900 dark:text-white mb-1">
                        Import from Dribbble
                      </div>
                      <p className="text-sm text-slate-500">
                        Automatically import your Dribbble shots
                      </p>
                    </button>
                  </div>

                  {importSource && (
                    <div className="flex gap-2">
                      <Input
                        value={importUrl}
                        onChange={(e) => setImportUrl(e.target.value)}
                        placeholder={`Your ${importSource} profile URL`}
                      />
                      <Button
                        onClick={handleImport}
                        disabled={isImporting || !importUrl}
                        className="bg-violet-600 hover:bg-violet-700"
                      >
                        {isImporting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Import"
                        )}
                      </Button>
                    </div>
                  )}

                  {/* Manual Upload */}
                  <div className="relative">
                    <div className="flex items-center gap-4 my-6">
                      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                      <span className="text-sm text-slate-500">Or upload manually</span>
                      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                    </div>

                    <button
                      onClick={handleProjectUpload}
                      className="w-full h-48 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-600 transition-colors"
                    >
                      <Upload className="w-12 h-12 mb-3" />
                      <span className="font-medium">Drop files here or click to upload</span>
                      <span className="text-sm mt-1">PNG, JPG, GIF up to 10MB</span>
                    </button>
                  </div>

                  {/* Uploaded Projects */}
                  {uploadedProjects.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                        Projects ({uploadedProjects.length})
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {uploadedProjects.map((project, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                              <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute inset-0 bg-[#0B0B0C]/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <button
                                onClick={() =>
                                  setUploadedProjects(uploadedProjects.filter((_, i) => i !== index))
                                }
                                className="p-2 bg-red-500 text-white rounded-full"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 truncate">
                              {project.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Social Links */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Connect your accounts
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Add links to your other profiles and websites
                    </p>
                  </div>

                  <div className="space-y-4">
                    {socialPlatforms.map((platform) => (
                      <div key={platform.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                          <platform.icon className="w-5 h-5 text-slate-500" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            {platform.label}
                          </label>
                          <Input
                            value={socialLinks[platform.id] || ""}
                            onChange={(e) =>
                              setSocialLinks({ ...socialLinks, [platform.id]: e.target.value })
                            }
                            placeholder={platform.placeholder}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Interests */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Your preferences
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Help us personalize your experience
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Design styles you love *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {designStyles.map((style) => (
                        <button
                          key={style}
                          onClick={() => {
                            if (favoriteStyles.includes(style)) {
                              setFavoriteStyles(favoriteStyles.filter((s) => s !== style));
                            } else {
                              setFavoriteStyles([...favoriteStyles, style]);
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            favoriteStyles.includes(style)
                              ? "bg-violet-600 text-white"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Industries you're interested in
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {industries.map((industry) => (
                        <button
                          key={industry}
                          onClick={() => {
                            if (interestedIndustries.includes(industry)) {
                              setInterestedIndustries(interestedIndustries.filter((i) => i !== industry));
                            } else {
                              setInterestedIndustries([...interestedIndustries, industry]);
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            interestedIndustries.includes(industry)
                              ? "bg-fuchsia-600 text-white"
                              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                          }`}
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7: Availability */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Your availability
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Let potential clients know if you're available for work
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Work availability *
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {availabilityOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setAvailability(option.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            availability === option.id
                              ? "border-violet-600 bg-violet-50 dark:bg-violet-900/30"
                              : "border-slate-200 dark:border-[#2A2A2A] hover:border-slate-300"
                          }`}
                        >
                          <div className="font-medium text-slate-900 dark:text-white">
                            {option.label}
                          </div>
                          <div className="text-sm text-slate-500">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {availability && availability !== "notavailable" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Hourly Rate (Optional)
                        </label>
                        <div className="flex gap-2">
                          <span className="flex items-center px-3 bg-slate-100 dark:bg-slate-700 rounded-l-lg text-slate-500">
                            $
                          </span>
                          <Input
                            type="number"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            placeholder="75"
                            className="rounded-l-none"
                          />
                          <span className="flex items-center px-3 bg-slate-100 dark:bg-slate-700 rounded-r-lg text-slate-500">
                            /hr
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                          Preferred project types
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {projectTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => {
                                if (preferredProjects.includes(type)) {
                                  setPreferredProjects(preferredProjects.filter((t) => t !== type));
                                } else {
                                  setPreferredProjects([...preferredProjects, type]);
                                }
                              }}
                              className={`px-4 py-2 rounded-full text-sm transition-all ${
                                preferredProjects.includes(type)
                                  ? "bg-violet-600 text-white"
                                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={openToRemote}
                            onChange={(e) => setOpenToRemote(e.target.checked)}
                            className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                          />
                          <span className="text-slate-700 dark:text-slate-300">
                            Open to remote work
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={openToRelocate}
                            onChange={(e) => setOpenToRelocate(e.target.checked)}
                            className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                          />
                          <span className="text-slate-700 dark:text-slate-300">
                            Open to relocation
                          </span>
                        </label>
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111111] border-t border-slate-200 dark:border-[#2A2A2A] p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex gap-3">
            {currentStep < 7 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-violet-600 hover:bg-violet-700 text-white px-8"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!canProceed() || isSubmitting}
                className="bg-[#8B5DFF] from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-8"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <Sparkles className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
