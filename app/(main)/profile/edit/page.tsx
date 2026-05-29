"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Camera,
  X,
  Save,
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Globe,
  Briefcase,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  ExternalLink,
  Plus,
  Trash2,
  AlertCircle,
  Check,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ============ MOCK DATA ============
const initialProfile = {
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600&h=400&fit=crop",
  name: "Sarah Chen",
  username: "sarahchen",
  email: "sarah@design.co",
  tagline: "Turning complexity into simplicity through design ✨",
  bio: "Senior Product Designer at Google. Passionate about creating intuitive and beautiful user experiences. Previously at Airbnb and Stripe.",
  location: "San Francisco, CA",
  website: "https://sarahchen.design",
  isAvailable: true,
  skills: ["UI/UX Design", "Product Design", "Design Systems", "Prototyping", "User Research"],
  tools: ["Figma", "Framer", "Principle", "After Effects"],
  experience: "senior",
  socialLinks: {
    twitter: "sarahchen",
    linkedin: "sarahchen",
    instagram: "sarahchen.design",
    github: "sarahchen",
    dribbble: "sarahchen",
    behance: "sarahchen",
  },
  portfolioLinks: [
    { title: "Personal Website", url: "https://sarahchen.design" },
    { title: "Dribbble Portfolio", url: "https://dribbble.com/sarahchen" },
  ],
};

const allSkills = [
  "UI/UX Design",
  "Product Design",
  "Design Systems",
  "Prototyping",
  "User Research",
  "Graphic Design",
  "Motion Design",
  "3D Design",
  "Illustration",
  "Brand Design",
  "Web Design",
  "Mobile Design",
  "Icon Design",
  "Typography",
  "Visual Design",
];

const allTools = [
  "Figma",
  "Sketch",
  "Adobe XD",
  "Framer",
  "Principle",
  "After Effects",
  "Photoshop",
  "Illustrator",
  "InVision",
  "Webflow",
  "Blender",
  "Cinema 4D",
];

const experienceLevels = [
  { value: "student", label: "Student" },
  { value: "junior", label: "Junior (0-2 years)" },
  { value: "mid", label: "Mid-Level (2-5 years)" },
  { value: "senior", label: "Senior (5-10 years)" },
  { value: "lead", label: "Lead/Principal (10+ years)" },
];

// ============ IMAGE UPLOAD ============
function ImageUploader({
  type,
  currentImage,
  onImageChange,
}: {
  type: "avatar" | "cover";
  currentImage: string;
  onImageChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => inputRef.current?.click();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // In real app, handle file upload
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (type === "avatar") {
    return (
      <div className="relative">
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group ${
            isDragging ? "ring-4 ring-violet-500" : ""
          }`}
        >
          <Image src={currentImage} alt="Avatar" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0B0C]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-xs text-slate-500 mt-2 text-center">Click or drag to upload</p>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative h-40 rounded-xl overflow-hidden cursor-pointer group ${
        isDragging ? "ring-4 ring-violet-500" : ""
      }`}
    >
      {currentImage ? (
        <Image src={currentImage} alt="Cover" fill className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-[#8B5DFF] from-violet-500 to-fuchsia-500" />
      )}
      <div className="absolute inset-0 bg-[#0B0B0C]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="text-center text-white">
          <Camera className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">Change cover image</p>
          <p className="text-xs opacity-70">Recommended: 1500 x 400px</p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

// ============ SKILL SELECTOR ============
function SkillSelector({
  selected,
  onSelect,
  options,
  label,
}: {
  selected: string[];
  onSelect: (skills: string[]) => void;
  options: string[];
  label: string;
}) {
  const toggleSkill = (skill: string) => {
    if (selected.includes(skill)) {
      onSelect(selected.filter((s) => s !== skill));
    } else {
      onSelect([...selected, skill]);
    }
  };

  return (
    <div>
      <Label className="mb-3 block">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => toggleSkill(item)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              selected.includes(item)
                ? "bg-violet-100 border-violet-300 text-violet-700"
                : "border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            {selected.includes(item) && <Check className="w-3 h-3 inline mr-1" />}
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ PORTFOLIO LINKS ============
function PortfolioLinks({
  links,
  onChange,
}: {
  links: { title: string; url: string }[];
  onChange: (links: { title: string; url: string }[]) => void;
}) {
  const addLink = () => {
    onChange([...links, { title: "", url: "" }]);
  };

  const removeLink = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: "title" | "url", value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    onChange(newLinks);
  };

  return (
    <div>
      <Label className="mb-3 block">Portfolio & External Links</Label>
      <div className="space-y-3">
        {links.map((link, index) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Link title"
              value={link.title}
              onChange={(e) => updateLink(index, "title", e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="URL"
              value={link.url}
              onChange={(e) => updateLink(index, "url", e.target.value)}
              className="flex-[2]"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeLink(index)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addLink} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Link
        </Button>
      </div>
    </div>
  );
}

// ============ MAIN EDIT PROFILE PAGE ============
export default function EditProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [profile, setProfile] = useState(initialProfile);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  // Update field
  const updateField = (field: string, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  // Update social link
  const updateSocialLink = (platform: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
    setHasChanges(true);
  };

  // Check username availability
  const checkUsername = async (username: string) => {
    if (username === initialProfile.username) {
      setUsernameAvailable(null);
      return;
    }
    // Simulate API call
    await new Promise((r) => setTimeout(r, 500));
    setUsernameAvailable(username !== "taken" && username.length >= 3);
  };

  // Validate form
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!profile.name.trim()) newErrors.name = "Name is required";
    if (!profile.username.trim()) newErrors.username = "Username is required";
    if (profile.username.length < 3) newErrors.username = "Username must be at least 3 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(profile.username))
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    if (profile.website && !/^https?:\/\/.+/.test(profile.website))
      newErrors.website = "Please enter a valid URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save profile
  const handleSave = async () => {
    if (!validate()) return;

    setIsSaving(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsSaving(false);
    setHasChanges(false);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-white dark:bg-[#111111] flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Profile</h1>
              <p className="text-slate-500">Update your personal information</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-violet-500 hover:bg-violet-600"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="mb-8">
          <ImageUploader
            type="cover"
            currentImage={profile.coverImage}
            onImageChange={(url) => updateField("coverImage", url)}
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white dark:bg-[#111111] p-1 rounded-lg mb-6">
            <TabsTrigger value="basic" className="flex-1">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex-1">
              Skills & Tools
            </TabsTrigger>
            <TabsTrigger value="social" className="flex-1">
              Social Links
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex-1">
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <div className="bg-white dark:bg-[#111111] rounded-xl p-6 space-y-6">
              {/* Avatar & Name */}
              <div className="flex flex-col md:flex-row gap-8 pb-6 border-b border-slate-200 dark:border-[#2A2A2A]">
                <ImageUploader
                  type="avatar"
                  currentImage={profile.avatar}
                  onImageChange={(url) => updateField("avatar", url)}
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <Label htmlFor="name">Display Name *</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your full name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="username">Username *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        @
                      </span>
                      <Input
                        id="username"
                        value={profile.username}
                        onChange={(e) => {
                          updateField("username", e.target.value);
                          checkUsername(e.target.value);
                        }}
                        placeholder="username"
                        className={`pl-8 ${errors.username ? "border-red-500" : ""}`}
                      />
                      {usernameAvailable !== null && (
                        <span
                          className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                            usernameAvailable ? "text-[#8B5DFF]" : "text-red-500"
                          }`}
                        >
                          {usernameAvailable ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </span>
                      )}
                    </div>
                    {errors.username && (
                      <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.username}
                      </p>
                    )}
                    <p className="text-xs text-slate-500 mt-1">
                      designdot.com/@{profile.username || "username"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tagline & Bio */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={profile.tagline}
                    onChange={(e) => updateField("tagline", e.target.value)}
                    placeholder="A short tagline about yourself"
                    maxLength={100}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {profile.tagline.length}/100 characters
                  </p>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                    placeholder="Tell us about yourself, your experience, and what you do..."
                    rows={5}
                    maxLength={500}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {profile.bio.length}/500 characters
                  </p>
                </div>
              </div>

              {/* Location & Website */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      placeholder="City, Country"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="website">Personal Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className={`pl-10 ${errors.website ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.website && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.website}
                    </p>
                  )}
                </div>
              </div>

              {/* Portfolio Links */}
              <PortfolioLinks
                links={profile.portfolioLinks}
                onChange={(links) => updateField("portfolioLinks", links)}
              />
            </div>
          </TabsContent>

          {/* Skills & Tools Tab */}
          <TabsContent value="skills">
            <div className="bg-white dark:bg-[#111111] rounded-xl p-6 space-y-8">
              <SkillSelector
                selected={profile.skills}
                onSelect={(skills) => updateField("skills", skills)}
                options={allSkills}
                label="Skills & Expertise"
              />

              <SkillSelector
                selected={profile.tools}
                onSelect={(tools) => updateField("tools", tools)}
                options={allTools}
                label="Design Tools"
              />

              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <select
                  id="experience"
                  value={profile.experience}
                  onChange={(e) => updateField("experience", e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  {experienceLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </TabsContent>

          {/* Social Links Tab */}
          <TabsContent value="social">
            <div className="bg-white dark:bg-[#111111] rounded-xl p-6 space-y-4">
              <p className="text-slate-500 mb-4">
                Connect your social profiles to help others find and follow you.
              </p>

              {[
                { key: "twitter", icon: Twitter, label: "Twitter", prefix: "twitter.com/" },
                { key: "linkedin", icon: Linkedin, label: "LinkedIn", prefix: "linkedin.com/in/" },
                { key: "instagram", icon: Instagram, label: "Instagram", prefix: "instagram.com/" },
                { key: "github", icon: Github, label: "GitHub", prefix: "github.com/" },
              ].map(({ key, icon: Icon, label, prefix }) => (
                <div key={key}>
                  <Label htmlFor={key} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-400">{prefix}</span>
                    <Input
                      id={key}
                      value={profile.socialLinks[key as keyof typeof profile.socialLinks] || ""}
                      onChange={(e) => updateSocialLink(key, e.target.value)}
                      placeholder="username"
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="bg-white dark:bg-[#111111] rounded-xl p-6 space-y-6">
              {/* Availability */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-[#2A2A2A]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      Available for Work
                    </p>
                    <p className="text-sm text-slate-500">
                      Show clients you're open to new opportunities
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateField("isAvailable", !profile.isAvailable)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    profile.isAvailable ? "bg-[#8B5DFF]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      profile.isAvailable ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Profile Visibility */}
              <div className="p-4 rounded-lg border border-slate-200 dark:border-[#2A2A2A]">
                <p className="font-medium text-slate-900 dark:text-white mb-2">
                  Profile Visibility
                </p>
                <p className="text-sm text-slate-500 mb-4">
                  Control who can see your profile and projects
                </p>
                <div className="space-y-2">
                  {[
                    { value: "public", label: "Public", desc: "Anyone can view your profile" },
                    { value: "members", label: "Members Only", desc: "Only logged-in users can view" },
                    { value: "private", label: "Private", desc: "Only you can view your profile" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="visibility"
                        value={option.value}
                        defaultChecked={option.value === "public"}
                        className="w-4 h-4 text-violet-600"
                      />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">
                          {option.label}
                        </p>
                        <p className="text-xs text-slate-500">{option.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20">
                <p className="font-medium text-red-600 dark:text-red-400 mb-2">
                  Danger Zone
                </p>
                <p className="text-sm text-red-500 mb-4">
                  These actions are irreversible. Please proceed with caution.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                    Deactivate Account
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Unsaved Changes Warning */}
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#111111] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4"
          >
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <span>You have unsaved changes</span>
            <Button size="sm" onClick={handleSave} className="bg-violet-500 hover:bg-violet-600">
              Save Now
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
