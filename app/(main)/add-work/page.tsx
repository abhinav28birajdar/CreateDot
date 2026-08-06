"use client"

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { 
  Upload, 
  X, 
  Plus, 
  Video, 
  FileText,
  ChevronDown,
  Eye,
  Lock,
  Users,
  Globe,
  Tag,
  Palette,
  Monitor,
  Smartphone,
  Camera,
  Brush,
  Type,
  Layout,
  Play,
  Shirt,
  Package,
  Home,
  Gamepad2,
  Save,
  Share2
} from 'lucide-react'

// Design categories
const categories = [
  { id: 'ui-ux', name: 'UI/UX Design', icon: Monitor },
  { id: 'web-design', name: 'Web Design', icon: Layout },
  { id: 'mobile-app', name: 'Mobile App', icon: Smartphone },
  { id: 'branding', name: 'Branding & Identity', icon: Palette },
  { id: 'illustration', name: 'Illustration', icon: Brush },
  { id: 'photography', name: 'Photography', icon: Camera },
  { id: 'typography', name: 'Typography', icon: Type },
  { id: 'motion-graphics', name: 'Motion Graphics', icon: Play },
  { id: 'product-design', name: 'Product Design', icon: Package },
  { id: 'fashion', name: 'Fashion Design', icon: Shirt },
  { id: 'game-design', name: 'Game Design', icon: Gamepad2 },
  { id: 'architecture', name: 'Architecture', icon: Home }
]

// Visibility options
const visibilityOptions = [
  { id: 'public', name: 'Public', description: 'Anyone can view', icon: Globe },
  { id: 'unlisted', name: 'Unlisted', description: 'Only with link', icon: Eye },
  { id: 'private', name: 'Private', description: 'Only you can view', icon: Lock },
  { id: 'team', name: 'Team Only', description: 'Team members only', icon: Users }
]

export default function AddWorkPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedVisibility, setSelectedVisibility] = useState('public')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/') || 
        file.type.startsWith('video/') ||
        file.type === 'application/pdf'
      )
      setUploadedFiles(prev => [...prev, ...newFiles])
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = (isDraft: boolean = false) => {
    // Handle form submission
    console.log({
      title,
      description,
      category: selectedCategory,
      visibility: selectedVisibility,
      tags,
      files: uploadedFiles,
      isDraft
    })
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your <span className="designly-text-gradient">Creative Work</span>
          </h1>
          <p className="text-lg text-gray-600">
            Upload your designs and showcase them to the world
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Files</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    isDragging 
                      ? 'border-designly-purple-500 bg-designly-purple-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-gray-100 rounded-full">
                      <Upload className="h-8 w-8 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Drop your files here, or{' '}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-designly-purple-600 hover:text-designly-purple-700 underline"
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Support for images, videos, and PDF files up to 50MB
                      </p>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Uploaded Files</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            {file.type.startsWith('image/') ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            ) : file.type.startsWith('video/') ? (
                              <div className="flex items-center justify-center h-full">
                                <Video className="h-8 w-8 text-gray-400" />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <FileText className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your project title..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your project, the design process, tools used..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <Label>Category</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between mt-1">
                        {selectedCategory ? (
                          <div className="flex items-center space-x-2">
                            {(() => {
                              const category = categories.find(c => c.id === selectedCategory)
                              const Icon = category?.icon
                              return (
                                <>
                                  {Icon && <Icon className="h-4 w-4" />}
                                  <span>{category?.name}</span>
                                </>
                              )
                            })()}
                          </div>
                        ) : (
                          'Select a category...'
                        )}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      {categories.map((category) => {
                        const Icon = category.icon
                        return (
                          <DropdownMenuItem
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            {category.name}
                          </DropdownMenuItem>
                        )
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Tags */}
                <div>
                  <Label>Tags</Label>
                  <div className="mt-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag..."
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        className="flex-1"
                      />
                      <Button 
                        type="button"
                        size="sm"
                        onClick={addTag}
                        className="px-3"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                            <Tag className="h-3 w-3" />
                            <span>{tag}</span>
                            <button onClick={() => removeTag(tag)}>
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Visibility Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Visibility</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {visibilityOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <div
                        key={option.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedVisibility === option.id
                            ? 'border-designly-purple-500 bg-designly-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedVisibility(option.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-4 w-4 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">{option.name}</p>
                            <p className="text-xs text-gray-600">{option.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleSubmit(false)}
                    className="w-full bg-designly-purple-600 hover:bg-designly-purple-700"
                    disabled={!title || uploadedFiles.length === 0}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Publish Work
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleSubmit(true)}
                    className="w-full"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tips for Better Visibility</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Use descriptive titles and tags</li>
                  <li>• Upload high-quality images</li>
                  <li>• Include process shots if available</li>
                  <li>• Write detailed descriptions</li>
                  <li>• Choose the right category</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
