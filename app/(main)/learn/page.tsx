"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Play, Clock, BookOpen, Star, Sparkles, CheckCircle2, ArrowUpRight, X, ShieldCheck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface Course {
    id: string
    title: string
    category: string
    instructor: {
        name: string
        role: string
        avatar: string
    }
    duration: string
    lessonsCount: number
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    rating: number
    studentsCount: string
    image: string
    description: string
    syllabus: string[]
}

const COURSES: Course[] = [
    {
        id: 'cr1',
        title: 'Tactile Micro-Interactions & Motion Prototyping',
        category: 'UI/UX & Prototyping',
        instructor: {
            name: 'Elena Rostova',
            role: 'Principal Designer @ Nexus',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        },
        duration: '4.5 Hours',
        lessonsCount: 18,
        level: 'Intermediate',
        rating: 4.9,
        studentsCount: '3.2k',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        description: 'Learn the physics, spring physics, and bezier curves behind high-end mobile app animations that feel tactile, responsive, and alive.',
        syllabus: [
            'Understanding spring physics & damping ratios in UI',
            'Card gestures, swipe dismiss, and sheet momentum',
            'Dynamic island & micro-badge notification cues',
            'Exporting assets to production engineers with clean specs'
        ]
    },
    {
        id: 'cr2',
        title: 'Procedural 3D & Spatial Computing in Spline & Blender',
        category: '3D & Spatial UI',
        instructor: {
            name: 'Marcus Chen',
            role: '3D Spatial Artist',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        },
        duration: '6.2 Hours',
        lessonsCount: 24,
        level: 'Advanced',
        rating: 5.0,
        studentsCount: '2.8k',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        description: 'From organic geometry to interactive WebGL exports. Master procedural nodes, glass caustic shaders, and spatial interaction triggers.',
        syllabus: [
            'Blender procedural material setups & refraction',
            'Spline interactive event triggers & hover states',
            'Optimizing polygons & textures for 60fps web performance',
            'Embedding 3D interactive canvases in Next.js & React'
        ]
    },
    {
        id: 'cr3',
        title: 'Scalable Enterprise Design Systems in Figma & Tokens',
        category: 'Design Systems',
        instructor: {
            name: 'Devon Vance',
            role: 'Design Technologist',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
        },
        duration: '5.0 Hours',
        lessonsCount: 20,
        level: 'Intermediate',
        rating: 4.8,
        studentsCount: '4.1k',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
        description: 'Construct enterprise-ready Figma component architecture with variable modes, semantic color tokens, slot components, and code parity.',
        syllabus: [
            'Design token taxonomy: Global, Alias, and Component level',
            'Figma Variables: Themes, density modes, and localization',
            'Component anatomy: Slots, nested instances, and auto-layout 5',
            'Automating Figma to GitHub code token sync pipelines'
        ]
    },
    {
        id: 'cr4',
        title: 'Swiss Typographic Hierarchy & Avant-Garde Editorial',
        category: 'Brand Identity',
        instructor: {
            name: 'Aria Takahashi',
            role: 'Brand Director',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
        },
        duration: '3.8 Hours',
        lessonsCount: 14,
        level: 'Beginner',
        rating: 4.9,
        studentsCount: '1.9k',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
        description: 'Explore the legacy of Swiss modernism and translate it into contemporary digital products, editorial magazines, and branding monographs.',
        syllabus: [
            'Mathematical grid proportions & asymmetric column systems',
            'Pairing neoclassical serifs with geometric grotesque sans',
            'Color theory in high-contrast editorial art direction',
            'Case study creation: Telling stories that win client buy-in'
        ]
    }
]

const TOPICS = ['All Masterclasses', 'UI/UX & Prototyping', '3D & Spatial UI', 'Design Systems', 'Brand Identity']

export default function LearnPage() {
    const [selectedTopic, setSelectedTopic] = useState('All Masterclasses')
    const [activeCourse, setActiveCourse] = useState<Course | null>(null)
    const [enrolled, setEnrolled] = useState<string[]>([])

    const filteredCourses = COURSES.filter(course => {
        if (selectedTopic === 'All Masterclasses') return true
        return course.category === selectedTopic
    })

    const handleEnroll = (course: Course) => {
        setEnrolled([...enrolled, course.id])
        setActiveCourse(null)
        toast.success(`Enrolled in "${course.title}"! 🎉`, {
            description: 'Course added to your workspace. Start watching lesson 1!'
        })
    }

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-[36px] bg-[#14161F] p-8 sm:p-14 text-white shadow-2xl">
                <div className="pointer-events-none absolute -top-10 -right-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 to-[#FFE185]/20 blur-3xl" />
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider mb-4 border border-white/10">
                        <GraduationCap className="h-3.5 w-3.5 text-[#FFE185]" />
                        CreateDOT Academy
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                        Master the Craft of Modern Design.
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-[#9DA7C2] leading-relaxed">
                        Practical, high-production masterclasses taught by top creative directors and design engineers. Learn by building real production-grade work.
                    </p>
                </div>
            </div>

            {/* Filter Topics */}
            <div className="flex items-center gap-1.5 p-1 bg-white/80 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10 rounded-2xl overflow-x-auto w-fit shadow-sm">
                {TOPICS.map(topic => (
                    <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${selectedTopic === topic ? 'bg-[#14161F] text-white dark:bg-white dark:text-[#14161F] shadow-sm' : 'text-[#647087] hover:text-[#14161F] dark:hover:text-white'}`}
                    >
                        {topic}
                    </button>
                ))}
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course, idx) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.08 }}
                        className="group flex flex-col rounded-3xl bg-white/90 dark:bg-white/[0.04] border border-[#14161F]/8 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl shadow-[#14161F]/5 transition-all backdrop-blur-sm"
                    >
                        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-900">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="h-14 w-14 rounded-full bg-white text-[#14161F] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                    <Play className="h-6 w-6 ml-1 fill-current text-[#FF6B6B]" />
                                </div>
                            </div>
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 rounded-full text-xs font-black bg-black/70 backdrop-blur-md text-white border border-white/10">
                                    {course.level}
                                </span>
                            </div>
                            <div className="absolute bottom-4 left-4 flex items-center gap-3 text-xs text-white font-semibold drop-shadow">
                                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {course.lessonsCount} Lessons</span>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between text-xs text-amber-500 font-bold mb-2">
                                    <span className="text-[#FF6B6B] font-bold">{course.category}</span>
                                    <span className="flex items-center gap-1 text-[#647087] dark:text-[#9DA7C2]">
                                        <Star className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800]" /> {course.rating} ({course.studentsCount} students)
                                    </span>
                                </div>
                                <h3 className="font-bold text-xl text-[#14161F] dark:text-white group-hover:text-[#FF6B6B] transition">
                                    {course.title}
                                </h3>
                                <p className="text-xs text-[#647087] dark:text-[#9DA7C2] mt-2 line-clamp-2 leading-relaxed">
                                    {course.description}
                                </p>
                            </div>

                            <div className="mt-6 pt-5 border-t border-[#14161F]/6 dark:border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <img
                                        src={course.instructor.avatar}
                                        alt={course.instructor.name}
                                        className="h-8 w-8 rounded-full object-cover ring-2 ring-black/5"
                                    />
                                    <div>
                                        <p className="text-xs font-bold text-[#14161F] dark:text-white">{course.instructor.name}</p>
                                        <p className="text-[10px] text-[#647087] dark:text-[#9DA7C2]">{course.instructor.role}</p>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => setActiveCourse(course)}
                                    className="bg-[#14161F] hover:bg-[#252B3F] text-white dark:bg-white dark:text-[#14161F] font-bold rounded-full text-xs h-9 px-4 shadow-sm"
                                >
                                    {enrolled.includes(course.id) ? "Continue Watching" : "View Curriculum"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Course Syllabus Modal */}
            <AnimatePresence>
                {activeCourse && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-2xl bg-white dark:bg-[#14161F] rounded-[32px] border border-[#14161F]/10 dark:border-white/10 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setActiveCourse(null)}
                                className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#647087] dark:text-[#9DA7C2]"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-[#FAF0D7] text-[#8A6318] mb-3">
                                {activeCourse.category} • {activeCourse.duration}
                            </div>

                            <h2 className="text-2xl font-black text-[#14161F] dark:text-white mb-2">
                                {activeCourse.title}
                            </h2>
                            <p className="text-xs text-[#647087] dark:text-[#9DA7C2] mb-6">
                                Taught by {activeCourse.instructor.name} ({activeCourse.instructor.role})
                            </p>

                            <div className="space-y-4 text-sm text-[#14161F] dark:text-[#E2E8F0]">
                                <h4 className="font-black text-xs uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2]">Course Overview</h4>
                                <p className="leading-relaxed text-[#5A637A] dark:text-[#9DA7C2]">{activeCourse.description}</p>

                                <h4 className="font-black text-xs uppercase tracking-wider text-[#647087] dark:text-[#9DA7C2] pt-2">Curriculum Modules ({activeCourse.lessonsCount} Lessons)</h4>
                                <div className="space-y-2">
                                    {activeCourse.syllabus.map((lesson, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#14161F]/8 dark:border-white/10 text-xs">
                                            <div className="h-6 w-6 rounded-lg bg-[#14161F] dark:bg-white text-white dark:text-[#14161F] font-black flex items-center justify-center shrink-0 text-[10px]">
                                                {idx + 1}
                                            </div>
                                            <span className="font-semibold text-[#14161F] dark:text-white">{lesson}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-[#14161F]/8 dark:border-white/10 flex items-center justify-between">
                                <span className="text-xs text-[#647087] dark:text-[#9DA7C2]">
                                    Free community masterclass • High definition video
                                </span>
                                <Button
                                    onClick={() => handleEnroll(activeCourse)}
                                    className="bg-[#FF6B6B] hover:bg-[#F35555] text-white font-bold px-8 py-6 rounded-full shadow-lg shadow-[#FF6B6B]/25"
                                >
                                    Enroll Free & Start Learning
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
