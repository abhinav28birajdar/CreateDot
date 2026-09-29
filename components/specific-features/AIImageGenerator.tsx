"use client";

import React, { useState } from 'react';
import { Sparkles, Image, Loader2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSocket } from '@/contexts/SocketContext';
import { AIPrompt } from '@/lib/types';

interface AIGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void;
}

export function AIImageGenerator({ onImageGenerated }: AIGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { socket, isConnected } = useSocket();

  // Mock generation for demonstration (would be replaced with actual socket events)
  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt for the image generation');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setError(null);
    
    // If we have a socket connection, use it for real-time updates
    if (socket && isConnected) {
      // Send generation request to backend via socket
      socket.emit('generate-image', {
        prompt,
        style: 'realistic', // Default style
      });
      
      // Listen for progress updates
      socket.on('generation-progress', (data: { jobId: string; progress: number }) => {
        setProgress(data.progress);
      });
      
      // Listen for completion
      socket.on('generation-complete', (data: { jobId: string; imageUrl: string }) => {
        setGeneratedImage(data.imageUrl);
        setIsGenerating(false);
        if (onImageGenerated) {
          onImageGenerated(data.imageUrl);
        }
        
        // Clean up listeners
        socket.off('generation-progress');
        socket.off('generation-complete');
        socket.off('generation-error');
      });
      
      // Listen for errors
      socket.on('generation-error', (data: { jobId: string; error: string }) => {
        setError(data.error);
        setIsGenerating(false);
        
        // Clean up listeners
        socket.off('generation-progress');
        socket.off('generation-complete');
        socket.off('generation-error');
      });
    } else {
      // Mock generation process for demo purposes when no socket is available
      const mockGeneration = async () => {
        // Simulate progress updates
        for (let i = 0; i <= 100; i += 10) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // For demo purposes, use high-resolution generated creative asset
        const mockImageUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
        setGeneratedImage(mockImageUrl);
        setIsGenerating(false);
        
        if (onImageGenerated) {
          onImageGenerated(mockImageUrl);
        }
      };
      
      mockGeneration();
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-[#8B5DFF]/5 border-b border-designly-purple-500/10">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#8B5DFF]" />
          AI Image Generator
        </CardTitle>
        <CardDescription>
          Generate stunning images with Gemini AI
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="block text-sm font-medium">
            Describe what you want to create
          </label>
          <textarea
            id="prompt"
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="A futuristic logo for a tech startup with purple and teal colors..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {isGenerating && (
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Generating your image...</div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8B5DFF] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-right text-gray-500">{progress}%</div>
          </div>
        )}

        {generatedImage && !isGenerating && (
          <div className="space-y-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
              <img
                src={generatedImage}
                alt="AI Generated"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setGeneratedImage(null)}
              >
                Clear
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 px-6 py-4">
        <Button 
          variant="outline" 
          onClick={() => setPrompt('')}
          disabled={isGenerating || !prompt}
        >
          Clear
        </Button>
        <Button
          onClick={generateImage}
          disabled={isGenerating || !prompt}
          className="bg-[#8B5DFF] hover:bg-[#7B4DE5] text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
