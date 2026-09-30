"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Download,
  Share2,
  ArrowLeft,
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Globe,
  Sparkles,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProfileResumePage() {
  const experiences = [
    {
      role: "Lead Product Designer",
      company: "CreateDOT Studio",
      location: "San Francisco, CA (Hybrid)",
      period: "2023 - Present",
      description:
        "Architecting autonomous AI-driven creative workflows, cross-platform design systems, and real-time multiplayer 3D canvas tools.",
      skills: ["Design Systems", "AI Product UX", "Figma", "React / Next.js"],
    },
    {
      role: "Senior UX Designer",
      company: "FinTech Quantum",
      location: "New York, NY (Remote)",
      period: "2021 - 2023",
      description:
        "Spearheaded redesign of mobile consumer trading apps. Scaled user retention by 42% and won Red Dot Design Award 2022.",
      skills: ["Mobile UX", "Financial Engineering", "Micro-interactions"],
    },
    {
      role: "UI/UX Designer & Prototyper",
      company: "Stripe Partner Labs",
      location: "San Francisco, CA",
      period: "2019 - 2021",
      description:
        "Built developer checkout flows, customizable billing portals, and high-fidelity Framer prototypes for global payment experiments.",
      skills: ["Interaction Design", "Design Engineering", "User Research"],
    },
  ];

  const educations = [
    {
      degree: "Master of Science in Human-Computer Interaction",
      school: "Stanford University",
      period: "2017 - 2019",
      honors: "Summa Cum Laude, d.school Fellow",
    },
    {
      degree: "Bachelor of Fine Arts in Visual Communications",
      school: "Rhode Island School of Design (RISD)",
      period: "2013 - 2017",
      honors: "Presidential Honors Scholar",
    },
  ];

  const certifications = [
    { title: "Enterprise Design Thinking Co-Creator", issuer: "IBM", year: "2023" },
    { title: "Certified Professional in UX (CPUX-F)", issuer: "UXQB", year: "2022" },
    { title: "Advanced Interaction & Spatial Audio", issuer: "MIT Media Lab Online", year: "2021" },
  ];

  const awards = [
    { title: "Red Dot Best of the Best Award", org: "Red Dot Design", year: "2023", note: "QuantumPay AI App" },
    { title: "Awwwards Site of the Year Nominee", org: "Awwwards", year: "2022", note: "Spatial Vision Platform" },
    { title: "Fast Company Innovation by Design Honoree", org: "Fast Company", year: "2021" },
  ];

  const publications = [
    {
      title: "Designing for Latency-Free Generative AI Canvas Interfaces",
      publisher: "Smashing Magazine",
      year: "2024",
      link: "https://smashingmagazine.com",
    },
    {
      title: "Micro-Gestures in Modern Spatial Computing",
      publisher: "ACM Interactions",
      year: "2023",
      link: "https://interactions.acm.org",
    },
  ];

  return (
    <div className="container max-w-4xl py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/profile" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Profile
            </Link>
            <span>/</span>
            <span>Resume & CV</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Professional Resume & CV</h1>
          <p className="text-muted-foreground text-sm">Comprehensive career timeline, education, certifications, and honors.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 rounded-xl">
            <Share2 className="h-4 w-4" /> Share CV
          </Button>
          <Button className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white gap-2 rounded-xl shadow-sm">
            <Download className="h-4 w-4" /> Download PDF Resume
          </Button>
        </div>
      </div>

      {/* Quick Summary Pill Banner */}
      <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] shadow-sm mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-black">Sarah Chen</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Staff Product Designer & Design Technologist • 8+ Years Exp</p>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 py-1 px-3">
            Available for Select Advising & High-Impact Projects
          </Badge>
        </div>
      </div>

      {/* Work Experience */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-xl bg-[#FF6B6B]/10 text-[#FF6B6B]">
            <Briefcase className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Work Experience</h2>
        </div>

        <div className="space-y-6 border-l-2 border-black/10 dark:border-white/10 ml-4 pl-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative"
            >
              <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-[#FF6B6B] border-2 border-white dark:border-[#111420]" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="font-bold text-base">{exp.role}</h3>
                <span className="text-xs font-semibold text-muted-foreground">{exp.period}</span>
              </div>
              <p className="text-xs font-semibold text-[#FF6B6B] mb-2">{exp.company} • {exp.location}</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exp.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-[11px] font-medium">
                    {s}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Education</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {educations.map((edu) => (
            <div key={edu.degree} className="p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824]">
              <h3 className="font-bold text-sm mb-1">{edu.degree}</h3>
              <p className="text-xs text-[#FF6B6B] font-semibold">{edu.school}</p>
              <p className="text-xs text-muted-foreground mt-2">{edu.period} • {edu.honors}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Awards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold">Certifications</h2>
          </div>
          <div className="space-y-3">
            {certifications.map((c) => (
              <div key={c.title} className="p-4 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824]">
                <h4 className="font-semibold text-xs">{c.title}</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">{c.issuer} • {c.year}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Award className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold">Awards & Honors</h2>
          </div>
          <div className="space-y-3">
            {awards.map((a) => (
              <div key={a.title} className="p-4 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824]">
                <h4 className="font-semibold text-xs">{a.title}</h4>
                <p className="text-[11px] text-[#FF6B6B] font-semibold">{a.org} • {a.year}</p>
                {a.note && <p className="text-[11px] text-muted-foreground mt-0.5">{a.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Publications */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold">Publications & Writing</h2>
        </div>
        <div className="space-y-3">
          {publications.map((p) => (
            <div key={p.title} className="p-4 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#141824] flex items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-xs">{p.title}</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">{p.publisher} • {p.year}</p>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <a href={p.link} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
