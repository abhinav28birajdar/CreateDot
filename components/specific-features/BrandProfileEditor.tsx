"use client";

import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Save, 
  Plus, 
  X, 
  Edit3, 
  MessageSquare, 
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandProfile } from '@/lib/types';

interface BrandProfileEditorProps {
  initialBrand?: Partial<BrandProfile>;
  onSave?: (brand: Partial<BrandProfile>) => void;
}

export function BrandProfileEditor({ initialBrand, onSave }: BrandProfileEditorProps) {
  const [brand, setBrand] = useState<Partial<BrandProfile>>(initialBrand || {
    name: '',
    colors: {
      primary: '#9929EA', // CreateDOT purple as default
      secondary: '#34D399', // CreateDOT emerald as default
      accent: '#F59E0B',
      text: '#1F2937',
      background: '#FFFFFF'
    },
    fonts: {
      heading: 'Plus Jakarta Sans',
      body: 'Inter'
    },
    voice_tone: {
      personality: 'Professional',
      style: 'Clear and concise',
      keywords: ['innovative', 'trustworthy', 'expert']
    },
    image_prefs: {
      style: 'Modern',
      mood: 'Professional',
      subjects: ['business', 'technology']
    }
  });

  const [activeTab, setActiveTab] = useState('colors');

  const handleColorChange = (colorType: string, value: string) => {
    // Create a properly typed color object
    const updatedColors = {
      primary: (colorType === 'primary') ? value : (brand.colors?.primary || '#9929EA'),
      secondary: (colorType === 'secondary') ? value : (brand.colors?.secondary || '#34D399'),
      accent: (colorType === 'accent') ? value : brand.colors?.accent,
      text: (colorType === 'text') ? value : brand.colors?.text,
      background: (colorType === 'background') ? value : brand.colors?.background
    };
    
    setBrand({
      ...brand,
      colors: updatedColors
    });
  };

  const handleFontChange = (fontType: string, value: string) => {
    setBrand({
      ...brand,
      fonts: {
        ...brand.fonts,
        [fontType]: value
      }
    });
  };

  const handleVoiceChange = (voiceType: string, value: string) => {
    setBrand({
      ...brand,
      voice_tone: {
        ...brand.voice_tone,
        [voiceType]: value
      }
    });
  };

  const handleKeywordChange = (index: number, value: string) => {
    const updatedKeywords = [...(brand.voice_tone?.keywords || [])];
    updatedKeywords[index] = value;
    
    setBrand({
      ...brand,
      voice_tone: {
        ...brand.voice_tone,
        keywords: updatedKeywords
      }
    });
  };

  const addKeyword = () => {
    setBrand({
      ...brand,
      voice_tone: {
        ...brand.voice_tone,
        keywords: [...(brand.voice_tone?.keywords || []), '']
      }
    });
  };

  const removeKeyword = (index: number) => {
    const updatedKeywords = [...(brand.voice_tone?.keywords || [])];
    updatedKeywords.splice(index, 1);
    
    setBrand({
      ...brand,
      voice_tone: {
        ...brand.voice_tone,
        keywords: updatedKeywords
      }
    });
  };

  const handleSubjectChange = (index: number, value: string) => {
    const updatedSubjects = [...(brand.image_prefs?.subjects || [])];
    updatedSubjects[index] = value;
    
    setBrand({
      ...brand,
      image_prefs: {
        ...brand.image_prefs,
        subjects: updatedSubjects
      }
    });
  };

  const addSubject = () => {
    setBrand({
      ...brand,
      image_prefs: {
        ...brand.image_prefs,
        subjects: [...(brand.image_prefs?.subjects || []), '']
      }
    });
  };

  const removeSubject = (index: number) => {
    const updatedSubjects = [...(brand.image_prefs?.subjects || [])];
    updatedSubjects.splice(index, 1);
    
    setBrand({
      ...brand,
      image_prefs: {
        ...brand.image_prefs,
        subjects: updatedSubjects
      }
    });
  };

  const handleImagePrefsChange = (prefType: string, value: string) => {
    setBrand({
      ...brand,
      image_prefs: {
        ...brand.image_prefs,
        [prefType]: value
      }
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(brand);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-[#8B5DFF] /20 to-designly-emerald-400/20 border-b">
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-[#8B5DFF]" />
          Brand Profile
        </CardTitle>
        <CardDescription>
          Create a brand identity that AI will use for design generation
        </CardDescription>
      </CardHeader>
      
      <div className="border-b">
        <div className="flex gap-2 px-6 pt-6 pb-2">
          <Input 
            type="text" 
            placeholder="Brand Name" 
            value={brand.name || ''}
            onChange={(e) => setBrand({ ...brand, name: e.target.value })}
            className="text-lg font-semibold"
          />
        </div>
        <div className="flex border-b">
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'colors' 
                ? 'border-designly-purple-500 text-[#8B5DFF]' 
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('colors')}
          >
            <Palette className="h-4 w-4 inline mr-1" />
            Colors
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'typography' 
                ? 'border-designly-purple-500 text-[#8B5DFF]' 
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('typography')}
          >
            <Type className="h-4 w-4 inline mr-1" />
            Typography
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'voice' 
                ? 'border-designly-purple-500 text-[#8B5DFF]' 
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('voice')}
          >
            <MessageSquare className="h-4 w-4 inline mr-1" />
            Voice & Tone
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'imagery' 
                ? 'border-designly-purple-500 text-[#8B5DFF]' 
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('imagery')}
          >
            <ImageIcon className="h-4 w-4 inline mr-1" />
            Imagery
          </button>
        </div>
      </div>
      
      <CardContent className="p-6">
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Brand Colors</h3>
              <p className="text-sm text-gray-600 mb-4">
                Define your brand's color palette to maintain consistency across designs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded-md border" 
                      style={{ backgroundColor: brand.colors?.primary }}
                    />
                    <Input
                      id="primaryColor"
                      type="text"
                      value={brand.colors?.primary || ''}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded-md border" 
                      style={{ backgroundColor: brand.colors?.secondary }}
                    />
                    <Input
                      id="secondaryColor"
                      type="text"
                      value={brand.colors?.secondary || ''}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded-md border" 
                      style={{ backgroundColor: brand.colors?.accent }}
                    />
                    <Input
                      id="accentColor"
                      type="text"
                      value={brand.colors?.accent || ''}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="textColor">Text Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded-md border" 
                      style={{ backgroundColor: brand.colors?.text }}
                    />
                    <Input
                      id="textColor"
                      type="text"
                      value={brand.colors?.text || ''}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#8B5DFF]/5 rounded-lg p-4 border border-designly-purple-500/10">
              <div className="flex items-start">
                <div className="p-2 bg-[#8B5DFF]/10 rounded-full mr-3 mt-1">
                  <Palette className="h-4 w-4 text-[#8B5DFF]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">AI Color Suggestions</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Based on your primary color, AI suggests complementary colors that work well together.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="p-1 rounded-md border border-designly-purple-500/30 bg-[#8B5DFF]/5 hover:bg-[#8B5DFF]/10">
                      <div className="w-6 h-6 rounded-sm" style={{ backgroundColor: '#B061F2' }}></div>
                    </button>
                    <button className="p-1 rounded-md border border-designly-purple-500/30 bg-[#8B5DFF]/5 hover:bg-[#8B5DFF]/10">
                      <div className="w-6 h-6 rounded-sm" style={{ backgroundColor: '#7E32C2' }}></div>
                    </button>
                    <button className="p-1 rounded-md border border-designly-purple-500/30 bg-[#8B5DFF]/5 hover:bg-[#8B5DFF]/10">
                      <div className="w-6 h-6 rounded-sm" style={{ backgroundColor: '#55D6BE' }}></div>
                    </button>
                    <button className="p-1 rounded-md border border-designly-purple-500/30 bg-[#8B5DFF]/5 hover:bg-[#8B5DFF]/10">
                      <div className="w-6 h-6 rounded-sm" style={{ backgroundColor: '#FFD166' }}></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'typography' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Typography</h3>
              <p className="text-sm text-gray-600 mb-4">
                Define your brand's fonts and typography styles.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="headingFont">Heading Font</Label>
                  <Input
                    id="headingFont"
                    type="text"
                    value={brand.fonts?.heading || ''}
                    onChange={(e) => handleFontChange('heading', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bodyFont">Body Font</Label>
                  <Input
                    id="bodyFont"
                    type="text"
                    value={brand.fonts?.body || ''}
                    onChange={(e) => handleFontChange('body', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-[#8B5DFF]/5 rounded-lg p-4 border border-designly-purple-500/10">
              <div className="flex items-start">
                <div className="p-2 bg-[#8B5DFF]/10 rounded-full mr-3 mt-1">
                  <Type className="h-4 w-4 text-[#8B5DFF]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">AI Font Recommendations</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Based on your brand's personality, here are font pairings that work well together:
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button className="p-2 text-left rounded-md border border-designly-purple-500/30 bg-[#8B5DFF]/5 hover:bg-[#8B5DFF]/10">
                      <div className="text-xs font-medium">Modern & Clean</div>
                      <div className="text-[10px] text-gray-600">Montserrat + Roboto</div>
                    </button>
                    <button className="p-2 text-left rounded-md border border-designly-purple-500/30 bg-[#8B5DFF]/5 hover:bg-[#8B5DFF]/10">
                      <div className="text-xs font-medium">Professional</div>
                      <div className="text-[10px] text-gray-600">Raleway + Open Sans</div>
                    </button>
                    <button className="p-2 text-left rounded-md border border-designly-purple-500/30 bg-[#8B5DFF]/5 hover:bg-[#8B5DFF]/10">
                      <div className="text-xs font-medium">Creative</div>
                      <div className="text-[10px] text-gray-600">Playfair Display + Source Sans Pro</div>
                    </button>
                    <button className="p-2 text-left rounded-md border border-designly-purple-500/30 bg-[#8B5DFF]/5 hover:bg-[#8B5DFF]/10">
                      <div className="text-xs font-medium">Tech & Modern</div>
                      <div className="text-[10px] text-gray-600">Plus Jakarta Sans + Inter</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'voice' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Voice & Tone</h3>
              <p className="text-sm text-gray-600 mb-4">
                Define your brand's communication style and personality.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="personality">Brand Personality</Label>
                  <Input
                    id="personality"
                    type="text"
                    value={brand.voice_tone?.personality || ''}
                    onChange={(e) => handleVoiceChange('personality', e.target.value)}
                    placeholder="e.g., Professional, Friendly, Bold"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="style">Communication Style</Label>
                  <Input
                    id="style"
                    type="text"
                    value={brand.voice_tone?.style || ''}
                    onChange={(e) => handleVoiceChange('style', e.target.value)}
                    placeholder="e.g., Formal, Conversational, Technical"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Brand Keywords</Label>
                  <p className="text-xs text-gray-600">Add keywords that describe your brand's attributes</p>
                  
                  {brand.voice_tone?.keywords?.map((keyword, index) => (
                    <div key={index} className="flex gap-2 items-center mt-2">
                      <Input
                        type="text"
                        value={keyword}
                        onChange={(e) => handleKeywordChange(index, e.target.value)}
                        placeholder="e.g., innovative"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeKeyword(index)}
                        className="h-10 w-10 p-0 text-gray-500 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addKeyword}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Keyword
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'imagery' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Imagery Preferences</h3>
              <p className="text-sm text-gray-600 mb-4">
                Define the visual style and subject matter for your brand's imagery.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="style">Visual Style</Label>
                  <Input
                    id="style"
                    type="text"
                    value={brand.image_prefs?.style || ''}
                    onChange={(e) => handleImagePrefsChange('style', e.target.value)}
                    placeholder="e.g., Modern, Vintage, Minimalist"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mood">Visual Mood</Label>
                  <Input
                    id="mood"
                    type="text"
                    value={brand.image_prefs?.mood || ''}
                    onChange={(e) => handleImagePrefsChange('mood', e.target.value)}
                    placeholder="e.g., Energetic, Calm, Professional"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Subject Matter</Label>
                  <p className="text-xs text-gray-600">Add subjects that should appear in your imagery</p>
                  
                  {brand.image_prefs?.subjects?.map((subject, index) => (
                    <div key={index} className="flex gap-2 items-center mt-2">
                      <Input
                        type="text"
                        value={subject}
                        onChange={(e) => handleSubjectChange(index, e.target.value)}
                        placeholder="e.g., people, technology, nature"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeSubject(index)}
                        className="h-10 w-10 p-0 text-gray-500 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addSubject}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Subject
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-[#8B5DFF]/5 rounded-lg p-4 border border-designly-purple-500/10">
              <div className="flex items-start">
                <div className="p-2 bg-[#8B5DFF]/10 rounded-full mr-3 mt-1">
                  <ImageIcon className="h-4 w-4 text-[#8B5DFF]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">AI Style Analysis</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Based on your selections, AI will generate images with these characteristics:
                  </p>
                  <div className="mt-3 text-xs space-y-1">
                    <div className="flex gap-2">
                      <span className="font-medium">Style:</span>
                      <span className="text-gray-700">Clean, modern compositions with bold color accents</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium">Mood:</span>
                      <span className="text-gray-700">Professional with creative touches</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium">Subjects:</span>
                      <span className="text-gray-700">Technology-focused with people in professional settings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 border-t p-4 bg-gray-50">
        <Button variant="outline">Cancel</Button>
        <Button 
          onClick={handleSave}
          className="bg-[#8B5DFF] hover:bg-[#7B4DE5] text-white"
        >
          <Save className="h-4 w-4 mr-1" />
          Save Brand Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
