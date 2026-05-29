"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Image as ImageIcon, 
  Tag, 
  Eye, 
  Globe, 
  Users, 
  Lock,
  ArrowLeft,
  X,
  Plus,
  FileImage,
  Video,
  File
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  'UI/UX Design',
  'Graphic Design',
  'Web Design',
  'Mobile App',
  'Logo Design',
  'Branding',
  'Illustration',
  'Photography',
  'Typography',
  'Print Design'
];

const tags = [
  'modern', 'minimalist', 'colorful', 'dark', 'light', 'gradient',
  'flat', 'material', 'retro', 'vintage', 'clean', 'professional',
  'creative', 'elegant', 'bold', 'subtle', 'corporate', 'startup'
];

export default function ShareWorkPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [] as string[],
    visibility: 'public',
    allowComments: true,
    allowDownload: false
  });

  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileUpload = (uploadedFiles: FileList | File[]) => {
    const newFiles = Array.from(uploadedFiles);
    setFiles(prev => [...prev, ...newFiles]);
    
    // Create previews
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tagInput.trim()) {
        addTag(tagInput.trim());
        setTagInput('');
      }
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <FileImage className="h-8 w-8" />;
    if (file.type.startsWith('video/')) return <Video className="h-8 w-8" />;
    return <File className="h-8 w-8" />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Here you would upload files and create the post
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to profile or feed
      router.push('/profile');
    } catch (error) {
      console.error('Error sharing work:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Share Your Work</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-[#8B5DFF] bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drop your files here, or click to browse
                </h3>
                <p className="text-gray-500 mb-4">
                  Support for JPG, PNG, GIF, PDF, PSD, AI, and more
                </p>
                <Button
                  type="button"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Choose Files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.psd,.ai,.fig"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>

              {/* File Previews */}
              {files.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Uploaded Files ({files.length})
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {files.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          {file.type.startsWith('image/') ? (
                            <img
                              src={filePreviews[index]}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              {getFileIcon(file)}
                            </div>
                          )}
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <p className="text-xs text-gray-500 mt-1 truncate">
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
              {/* Title */}
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Give your work a title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your work, process, tools used..."
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#8B5DFF] focus:border-[#8B5DFF]"
                  rows={4}
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#8B5DFF] focus:border-[#8B5DFF]"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="space-y-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagInputKeyPress}
                    placeholder="Type and press Enter to add tags"
                  />
                  
                  {/* Selected Tags */}
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="flex items-center">
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-4 w-4 p-0"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Suggested Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tags
                      .filter(tag => !formData.tags.includes(tag))
                      .slice(0, 8)
                      .map(tag => (
                        <Button
                          key={tag}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addTag(tag)}
                          className="text-xs"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {tag}
                        </Button>
                      ))
                    }
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Visibility */}
              <div>
                <Label htmlFor="visibility">Visibility</Label>
                <select
                  id="visibility"
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#8B5DFF] focus:border-[#8B5DFF]"
                >
                  <option value="public">
                    🌐 Public - Anyone can see this
                  </option>
                  <option value="followers">
                    👥 Followers only - Only your followers can see this
                  </option>
                  <option value="private">
                    🔒 Private - Only you can see this
                  </option>
                </select>
              </div>

              {/* Settings */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowComments">Allow Comments</Label>
                    <p className="text-sm text-gray-500">
                      Let others comment on your work
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="allowComments"
                    name="allowComments"
                    checked={formData.allowComments}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-[#8B5DFF] focus:ring-[#8B5DFF]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowDownload">Allow Download</Label>
                    <p className="text-sm text-gray-500">
                      Let others download your work
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="allowDownload"
                    name="allowDownload"
                    checked={formData.allowDownload}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-[#8B5DFF] focus:ring-[#8B5DFF]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading || files.length === 0 || !formData.title}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sharing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Share Work
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
