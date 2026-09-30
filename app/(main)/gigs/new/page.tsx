"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
  FaCloudArrowUp,
  FaTrashCan,
  FaPlus,
  FaBolt,
  FaShieldHalved,
  FaEye,
  FaClock,
  FaDollarSign,
  FaCircleCheck,
  FaLayerGroup
} from "react-icons/fa6"

interface Step {
  id: number
  title: string
  subtitle: string
}

const steps: Step[] = [
  { id: 1, title: "Overview", subtitle: "Gig title, category & search tags" },
  { id: 2, title: "Pricing & Packages", subtitle: "Define Basic, Standard & Premium tiers" },
  { id: 3, title: "Description & FAQ", subtitle: "Showcase your deliverable specs" },
  { id: 4, title: "Requirements", subtitle: "Questions for the client to kick off" },
  { id: 5, title: "Gallery & Publish", subtitle: "Upload preview covers and launch" }
]

export default function CreateNewGigPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1: Overview
  const [gigTitle, setGigTitle] = useState("I will design an ultra-modern SaaS design system in Figma")
  const [category, setCategory] = useState("Design & UI/UX")
  const [subcategory, setSubcategory] = useState("Design Systems & Tokens")
  const [tags, setTags] = useState<string[]>(["Figma", "UI/UX", "Design System", "NextGen", "Tailwind"])
  const [tagInput, setTagInput] = useState("")

  // Step 2: Pricing Packages
  const [basicPrice, setBasicPrice] = useState(350)
  const [basicDays, setBasicDays] = useState(3)
  const [standardPrice, setStandardPrice] = useState(680)
  const [standardDays, setStandardDays] = useState(5)
  const [premiumPrice, setPremiumPrice] = useState(1250)
  const [premiumDays, setPremiumDays] = useState(8)

  // Step 3: Description & FAQ
  const [description, setDescription] = useState(
    "High-end, production-oriented UI/UX design crafted with atomic component methodology, strict auto-layout, and WCAG accessibility standards."
  )
  const [faqs, setFaqs] = useState([
    { q: "What design software do you use?", a: "Figma exclusively, organized with full auto-layout and components." },
    { q: "Are revisions included?", a: "Yes, revisions are explicitly included with all packages." }
  ])
  const [newFaqQ, setNewFaqQ] = useState("")
  const [newFaqA, setNewFaqA] = useState("")

  // Step 4: Requirements
  const [requirements, setRequirements] = useState([
    "Brand assets (logo, font licenses if proprietary, brand colors)",
    "Wireframes, user stories or link to existing product",
    "List of 3 benchmark products whose visual style you admire"
  ])
  const [reqInput, setReqInput] = useState("")

  // Step 5: Published state
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPublished, setIsPublished] = useState(false)

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 10) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleAddFaq = () => {
    if (newFaqQ.trim() && newFaqA.trim()) {
      setFaqs([...faqs, { q: newFaqQ.trim(), a: newFaqA.trim() }])
      setNewFaqQ("")
      setNewFaqA("")
    }
  }

  const handleAddRequirement = () => {
    if (reqInput.trim()) {
      setRequirements([...requirements, reqInput.trim()])
      setReqInput("")
    }
  }

  const handlePublish = () => {
    setIsPublishing(true)
    setTimeout(() => {
      setIsPublishing(false)
      setIsPublished(true)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#ff4b6e]/30 selection:text-white pb-24">
      {/* Header bar */}
      <div className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/gigs"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <FaArrowLeft className="text-xs" />
            </Link>
            <div>
              <h1 className="text-base font-bold text-white">Create a New Gig</h1>
              <p className="text-xs text-slate-400">Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title || "Overview"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/gigs")}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>

      {/* Step Tracker Indicator */}
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {steps.map((s) => {
            const isCompleted = currentStep > s.id
            const isActive = currentStep === s.id
            return (
              <button
                key={s.id}
                onClick={() => setCurrentStep(s.id)}
                className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                  isActive
                    ? "border-[#ff4b6e] bg-[#ff4b6e]/10 shadow-lg shadow-[#ff4b6e]/10"
                    : isCompleted
                    ? "border-emerald-500/30 bg-emerald-500/5 text-slate-300"
                    : "border-white/5 bg-white/5 text-slate-500"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-[#ff4b6e]" : isCompleted ? "text-emerald-400" : "text-slate-500"}`}>
                    Step {s.id}
                  </span>
                  {isCompleted && <FaCircleCheck className="text-emerald-400 text-xs" />}
                </div>
                <span className={`text-xs font-semibold ${isActive ? "text-white" : "text-slate-300"}`}>
                  {s.title}
                </span>
              </button>
            )
          })}
        </div>

        {/* Success Modal/Screen if published */}
        {isPublished ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 rounded-3xl border border-emerald-500/30 bg-slate-900/80 p-10 text-center backdrop-blur-xl shadow-2xl max-w-xl mx-auto"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 text-2xl mb-4">
              <FaCheck />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Your Gig is Live!</h2>
            <p className="mt-2 text-sm text-slate-300">
              "{gigTitle}" has been verified and published to the CreateDOT Marketplace. Clients can now order packages directly or send custom inquiries.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/gigs/gig-1"
                className="rounded-xl bg-[#ff4b6e] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/25 hover:brightness-110"
              >
                View Live Gig
              </Link>
              <Link
                href="/gigs"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/10"
              >
                Back to Marketplace
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Step Form Container */
          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-xl">
            {/* STEP 1: Overview */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Gig Title
                  </label>
                  <input
                    type="text"
                    value={gigTitle}
                    onChange={(e) => setGigTitle(e.target.value)}
                    placeholder="e.g. I will design a high-converting SaaS landing page in Figma"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm text-white placeholder-slate-500 focus:border-[#ff4b6e] focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Keep it descriptive, action-oriented, and highlight your unique specialization.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Primary Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-900 p-3.5 text-sm text-white focus:border-[#ff4b6e] focus:outline-none"
                    >
                      <option>Design & UI/UX</option>
                      <option>Full-Stack Web Development</option>
                      <option>3D, Motion & Spline</option>
                      <option>Generative AI & Autonomous Agents</option>
                      <option>Brand Identity & Typography</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      placeholder="e.g. Design Systems, Web Apps, Micro-Interactions"
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm text-white focus:border-[#ff4b6e] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Search Tags (Up to 10)
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      placeholder="Type a tag and press Enter"
                      className="flex-1 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-slate-500 focus:border-[#ff4b6e] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15"
                    >
                      Add Tag
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-pink-500/30 bg-pink-500/10 px-2.5 py-1 text-xs text-pink-300"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-white"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Pricing & Packages */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Basic */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Basic Tier</span>
                      <span className="text-lg font-bold text-white">${basicPrice}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Price ($)</label>
                        <input
                          type="number"
                          value={basicPrice}
                          onChange={(e) => setBasicPrice(Number(e.target.value))}
                          className="w-full rounded-lg border border-white/10 bg-slate-900 p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Delivery Days</label>
                        <input
                          type="number"
                          value={basicDays}
                          onChange={(e) => setBasicDays(Number(e.target.value))}
                          className="w-full rounded-lg border border-white/10 bg-slate-900 p-2 text-xs text-white"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 pt-2">Includes: 3 Screens, Figma Source, 2 Revisions.</p>
                    </div>
                  </div>

                  {/* Standard */}
                  <div className="rounded-2xl border border-pink-500/40 bg-pink-500/5 p-5 relative">
                    <div className="absolute -top-3 right-4 rounded-full bg-[#ff4b6e] px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                      Recommended
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Standard Tier</span>
                      <span className="text-lg font-bold text-white">${standardPrice}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Price ($)</label>
                        <input
                          type="number"
                          value={standardPrice}
                          onChange={(e) => setStandardPrice(Number(e.target.value))}
                          className="w-full rounded-lg border border-white/10 bg-slate-900 p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Delivery Days</label>
                        <input
                          type="number"
                          value={standardDays}
                          onChange={(e) => setStandardDays(Number(e.target.value))}
                          className="w-full rounded-lg border border-white/10 bg-slate-900 p-2 text-xs text-white"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 pt-2">Includes: 8 Screens, Design System, Clickable Prototype, 5 Revisions.</p>
                    </div>
                  </div>

                  {/* Premium */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Premium Tier</span>
                      <span className="text-lg font-bold text-white">${premiumPrice}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Price ($)</label>
                        <input
                          type="number"
                          value={premiumPrice}
                          onChange={(e) => setPremiumPrice(Number(e.target.value))}
                          className="w-full rounded-lg border border-white/10 bg-slate-900 p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Delivery Days</label>
                        <input
                          type="number"
                          value={premiumDays}
                          onChange={(e) => setPremiumDays(Number(e.target.value))}
                          className="w-full rounded-lg border border-white/10 bg-slate-900 p-2 text-xs text-white"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 pt-2">Includes: 15+ Screens, React TSX Export, Handoff Docs, Unlimited Revisions.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Description & FAQ */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Detailed Gig Description
                  </label>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what you will do, your workflow, tools used, and what makes your approach top-tier..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder-slate-500 focus:border-[#ff4b6e] focus:outline-none"
                  />
                </div>

                <div className="border-t border-white/10 pt-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Frequently Asked Questions (FAQ)
                  </label>
                  <div className="space-y-3 mb-4">
                    {faqs.map((faq, i) => (
                      <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
                        <div className="font-semibold text-white mb-1">Q: {faq.q}</div>
                        <div className="text-slate-400">A: {faq.a}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={newFaqQ}
                      onChange={(e) => setNewFaqQ(e.target.value)}
                      placeholder="Question..."
                      className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newFaqA}
                      onChange={(e) => setNewFaqA(e.target.value)}
                      placeholder="Answer..."
                      className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/15"
                  >
                    <FaPlus className="text-[10px]" />
                    <span>Add FAQ</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Requirements */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Client Kick-Off Questions
                  </label>
                  <p className="text-xs text-slate-400 mb-4">
                    These questions are sent automatically to clients right after they complete checkout so you have everything needed to begin work.
                  </p>

                  <div className="space-y-3 mb-4">
                    {requirements.map((req, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300">
                        <span>{i + 1}. {req}</span>
                        <button
                          type="button"
                          onClick={() => setRequirements(requirements.filter((_, idx) => idx !== i))}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <FaTrashCan className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={reqInput}
                      onChange={(e) => setReqInput(e.target.value)}
                      placeholder="Add a required question (e.g. Please link your Figma or branding guidelines)..."
                      className="flex-1 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddRequirement}
                      className="rounded-xl bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/15"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Gallery & Publish */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Gig Showcase Gallery
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center bg-white/5 hover:border-[#ff4b6e] transition-colors cursor-pointer">
                    <FaCloudArrowUp className="mx-auto text-3xl text-pink-400 mb-2" />
                    <p className="text-sm font-semibold text-white">Drag & drop cover images, videos, or design mockups</p>
                    <p className="text-xs text-slate-400 mt-1">Recommended: 1280x720px, PNG or WebP under 5MB</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-emerald-400 flex items-center gap-3">
                  <FaShieldHalved className="text-lg shrink-0" />
                  <div>
                    <span className="font-bold">CreateDOT Creator Terms:</span> By publishing, you agree to deliver work within the promised timeline and adhere to our intellectual property guarantees.
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                >
                  <FaArrowLeft className="text-xs" />
                  <span>Back</span>
                </button>
              ) : <div />}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:brightness-110"
                >
                  <span>Continue</span>
                  <FaArrowRight className="text-xs" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isPublishing}
                  onClick={handlePublish}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4b6e] to-rose-600 px-7 py-3 text-xs font-extrabold text-white shadow-lg shadow-pink-500/25 hover:brightness-110 disabled:opacity-50"
                >
                  <FaBolt />
                  <span>{isPublishing ? "Publishing to Marketplace..." : "Publish Gig Now"}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
