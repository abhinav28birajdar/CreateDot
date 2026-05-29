"use client"

import React, { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AuthGuard } from "@/components/layout/AuthGuard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { 
  ArrowLeft, 
  Sparkles, 
  Target, 
  Layers, 
  Calendar, 
  Share2, 
  Palette, 
  Wand2,
  Upload,
  Type,
  Image as ImageIcon,
  Zap,
  Settings,
  Download,
  Eye,
  RefreshCw,
  Plus,
  ChevronRight,
  Crown,
  Rocket,
  Check,
  FileText
} from "lucide-react"

const projectTypes = [
  {
    id: 'logo',
    name: 'Logo Design',
    description: 'Create unique brand logos with AI assistance',
    icon: <Target className="h-8 w-8" />,
    gradient: '',
    popular: true
  },
  {
    id: 'banner',
    name: 'Banner & Ads',
    description: 'Marketing banners for web and social media',
    icon: <Layers className="h-8 w-8" />,
    gradient: 'to-cyan-500',
    popular: false
  },
  {
    id: 'poster',
    name: 'Poster Design',
    description: 'Eye-catching posters for events and promotions',
    icon: <Calendar className="h-8 w-8" />,
    gradient: 'to-teal-500',
    popular: false
  },
  {
    id: 'social-media',
    name: 'Social Media',
    description: 'Instagram, Facebook, and Twitter post templates',
    icon: <Share2 className="h-8 w-8" />,
    gradient: 'from-orange-500 to-red-500',
    popular: true
  },
  {
    id: 'web-design',
    name: 'Web Graphics',
    description: 'Website headers, buttons, and UI elements',
    icon: <Palette className="h-8 w-8" />,
    gradient: 'from-indigo-500 to-purple-500',
    popular: false
  },
  {
    id: 'branding',
    name: 'Brand Package',
    description: 'Complete branding kit with multiple assets',
    icon: <Crown className="h-8 w-8" />,
    gradient: 'from-yellow-500 to-orange-500',
    popular: true
  }
]

const aiModes = [
  {
    id: 'quick',
    name: 'Quick Generate',
    description: 'Fast AI generation with minimal input',
    icon: <Zap className="h-6 w-6" />,
    time: '30 seconds',
    quality: 'Good',
    free: true
  },
  {
    id: 'enhanced',
    name: 'Enhanced Mode',
    description: 'Higher quality with more customization',
    icon: <Sparkles className="h-6 w-6" />,
    time: '2-3 minutes',
    quality: 'Excellent',
    free: false
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Premium quality with advanced AI models',
    icon: <Crown className="h-6 w-6" />,
    time: '5-10 minutes',
    quality: 'Professional',
    free: false
  }
]

export default function CreateProjectPage() {
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedMode, setSelectedMode] = useState<string>('quick')
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [step, setStep] = useState(1)

  const handleCreateProject = async () => {
    if (!selectedType || !projectName) return

    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName,
          description,
          type: selectedType,
          mode: selectedMode,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        // Redirect to project editor or results page
        window.location.href = `/project/${result.projectId}`
      } else {
        console.error('Failed to create project')
      }
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#8B5DFF] from-slate-50 via-white to-purple-50/30">
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <div className="flex items-center mb-12">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mr-6 hover:bg-designly-purple/5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#8B5DFF] from-designly-purple to-purple-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Create New Project</h1>
              <p className="text-gray-600 mt-2 text-lg">Design anything with AI-powered creativity</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center mb-8">
          <div className={`flex items-center ${step >= 1 ? 'text-designly-purple' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-designly-purple text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="ml-2 font-medium">Choose Type</span>
          </div>
          <ChevronRight className="h-4 w-4 mx-4 text-gray-400" />
          <div className={`flex items-center ${step >= 2 ? 'text-designly-purple' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-designly-purple text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="ml-2 font-medium">Project Details</span>
          </div>
          <ChevronRight className="h-4 w-4 mx-4 text-gray-400" />
          <div className={`flex items-center ${step >= 3 ? 'text-designly-purple' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-designly-purple text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <span className="ml-2 font-medium">AI Generation</span>
          </div>
        </div>

        {step === 1 && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What would you like to create?</h2>
              <p className="text-gray-600 text-lg">Choose a project type to get started with AI-powered design</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 group ${
                    selectedType === type.id 
                      ? 'ring-2 ring-designly-purple bg-[#8B5DFF] from-designly-purple/5 to-purple-50 shadow-lg' 
                      : 'hover:ring-1 hover:ring-designly-purple/30 bg-white shadow-md hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardContent className="p-8">
                    <div className="relative text-center">
                      {type.popular && (
                        <Badge className="absolute -top-4 -right-4 bg-[#8B5DFF] from-orange-400 to-red-500 text-white text-xs font-medium px-3 py-1 shadow-lg">
                          Popular
                        </Badge>
                      )}
                      
                      <div className={`w-20 h-20 mx-auto rounded-2xl bg-[#8B5DFF] ${type.gradient} flex items-center justify-center text-white mb-6 transition-transform group-hover:scale-110 ${
                        selectedType === type.id ? 'scale-110 shadow-lg' : ''
                      }`}>
                        {React.cloneElement(type.icon, { className: "h-10 w-10" })}
                      </div>
                      
                      <h3 className="font-bold text-xl text-gray-900 mb-3">{type.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                      
                      {selectedType === type.id && (
                        <div className="mt-6 inline-flex items-center text-designly-purple bg-designly-purple/10 px-4 py-2 rounded-full">
                          <Check className="h-4 w-4 mr-2" />
                          <span className="text-sm font-semibold">Selected</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button 
                onClick={() => setStep(2)}
                disabled={!selectedType}
                className="bg-designly-purple hover:bg-designly-purple/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Details
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Details</h2>
              <p className="text-gray-600 text-lg">Tell us about your vision and choose your AI generation mode</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="projectName" className="text-base font-semibold text-gray-900 mb-2 block">
                        Project Name *
                      </Label>
                      <Input
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Enter a descriptive name for your project"
                        className="h-12 text-lg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-base font-semibold text-gray-900 mb-2 block">
                        Description
                      </Label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what you want to create. Be specific about style, colors, mood, etc."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-designly-purple focus:border-transparent h-32 resize-none text-base"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        💡 The more detailed your description, the better AI results you'll get
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">AI Generation Mode</h3>
                <div className="space-y-4">
                  {aiModes.map((mode) => (
                    <Card 
                      key={mode.id}
                      className={`cursor-pointer transition-all duration-300 border-0 ${
                        selectedMode === mode.id 
                          ? 'ring-2 ring-designly-purple bg-[#8B5DFF] from-designly-purple/5 to-purple-50 shadow-lg' 
                          : 'hover:ring-1 hover:ring-designly-purple/30 bg-gray-50 hover:bg-gray-100 shadow-sm'
                      }`}
                      onClick={() => setSelectedMode(mode.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl transition-colors ${
                            selectedMode === mode.id 
                              ? 'bg-designly-purple text-white' 
                              : 'bg-white text-designly-purple border border-designly-purple/20'
                          }`}>
                            {React.cloneElement(mode.icon, { className: "h-6 w-6" })}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-bold text-gray-900 text-lg">{mode.name}</h4>
                              {!mode.free && (
                                <Badge variant="outline" className="text-xs">Premium</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{mode.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>⏱️ {mode.time}</span>
                              <span>⭐ {mode.quality}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-12">
              <Button 
                variant="outline"
                onClick={() => setStep(1)}
                className="px-6 py-3 text-base font-medium border-2 hover:bg-gray-50"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <Button 
                onClick={() => setStep(3)}
                disabled={!projectName}
                className="bg-designly-purple hover:bg-designly-purple/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Generation
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Generate</h2>
              <p className="text-gray-600 text-lg">Review your project details and start the AI generation</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <Card className="border-0 bg-[#8B5DFF] from-designly-purple/5 to-purple-50 shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <FileText className="h-6 w-6 mr-3 text-designly-purple" />
                      Project Summary
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">
                          {projectTypes.find(t => t.id === selectedType)?.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{projectName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">AI Mode:</span>
                        <span className="font-medium">
                          {aiModes.find(m => m.id === selectedMode)?.name}
                        </span>
                      </div>
                      {description && (
                        <div>
                          <span className="text-gray-600">Description:</span>
                          <p className="text-sm mt-1 text-gray-800">{description}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-designly-purple text-white flex items-center justify-center text-xs font-medium">1</div>
                        <div>
                          <p className="font-medium text-gray-900">AI Analysis</p>
                          <p className="text-sm text-gray-600">AI analyzes your requirements</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-designly-purple text-white flex items-center justify-center text-xs font-medium">2</div>
                        <div>
                          <p className="font-medium text-gray-900">Generation</p>
                          <p className="text-sm text-gray-600">Multiple design variants are created</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-designly-purple text-white flex items-center justify-center text-xs font-medium">3</div>
                        <div>
                          <p className="font-medium text-gray-900">Customization</p>
                          <p className="text-sm text-gray-600">Edit and refine your chosen design</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-center">
                {isGenerating ? (
                  <Card className="w-full max-w-md">
                    <CardContent className="p-8 text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-designly-purple border-t-transparent mx-auto mb-4"></div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Your Design</h3>
                      <p className="text-gray-600 mb-4">AI is creating amazing designs for you...</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-designly-purple h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="w-full max-w-md">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-[#8B5DFF] from-designly-purple to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Rocket className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Launch</h3>
                      <p className="text-gray-600 mb-6">Click the button below to start AI generation</p>
                      <Button 
                        onClick={handleCreateProject}
                        className="w-full bg-designly-purple hover:bg-designly-purple/90 text-white"
                        size="lg"
                      >
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate with AI
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {!isGenerating && (
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
