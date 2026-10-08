import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface ImageGenerationOptions {
  prompt: string;
  style?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
  quality?: 'standard' | 'high';
  model?: string;
}

export interface TextGenerationOptions {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  model?: string;
}

export class GeminiAIService {
  private textModel;
  private visionModel;

  constructor() {
    this.textModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.visionModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * Generate text content using Gemini
   */
  async generateText(options: TextGenerationOptions): Promise<string> {
    try {
      const result = await this.textModel.generateContent(options.prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating text with Gemini:', error);
      throw new Error('Failed to generate text content');
    }
  }

  /**
   * Generate design copy variations
   */
  async generateDesignCopy(
    type: 'headline' | 'body' | 'cta' | 'tagline',
    context: string,
    brandVoice?: any
  ): Promise<string[]> {
    const voiceDescription = brandVoice 
      ? `Brand voice: ${brandVoice.formality || 0.5} formality, ${brandVoice.playfulness || 0.5} playfulness, ${brandVoice.creativity || 0.5} creativity.`
      : '';

    const prompts = {
      headline: `Generate 5 compelling headlines for ${context}. ${voiceDescription} Each headline should be under 60 characters and attention-grabbing.`,
      body: `Generate 3 body text variations for ${context}. ${voiceDescription} Each should be 2-3 sentences, clear and engaging.`,
      cta: `Generate 5 call-to-action button text options for ${context}. ${voiceDescription} Each should be 1-3 words, action-oriented.`,
      tagline: `Generate 5 memorable taglines for ${context}. ${voiceDescription} Each should be under 40 characters and memorable.`
    };

    try {
      const result = await this.generateText({ prompt: prompts[type] });
      // Parse the response to extract individual variations
      return result.split('\n').filter(line => line.trim().length > 0).slice(0, 5);
    } catch {
      throw new Error('Failed to generate design copy');
    }
  }

  /**
   * Analyze image content using Gemini Vision
   */
  async analyzeImage(imageBase64: string, prompt: string = "Describe this image"): Promise<string> {
    try {
      const imagePart = {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg"
        }
      };

      const result = await this.visionModel.generateContent([prompt, imagePart]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error analyzing image with Gemini:', error);
      throw new Error('Failed to analyze image');
    }
  }

  /**
   * Generate image prompt enhancement
   */
  async enhanceImagePrompt(
    originalPrompt: string,
    style?: string,
    mood?: string,
    brandContext?: string
  ): Promise<string> {
    const enhancementPrompt = `
      Enhance this image generation prompt for better AI results: "${originalPrompt}"
      
      ${style ? `Style: ${style}` : ''}
      ${mood ? `Mood: ${mood}` : ''}
      ${brandContext ? `Brand context: ${brandContext}` : ''}
      
      Return only the enhanced prompt, making it more specific, descriptive, and optimized for image generation. Include technical details like composition, lighting, and visual style.
    `;

    try {
      return await this.generateText({ prompt: enhancementPrompt });
    } catch {
      throw new Error('Failed to enhance image prompt');
    }
  }

  /**
   * Generate design suggestions based on brief
   */
  async generateDesignSuggestions(
    brief: string,
    designMode: string,
    brandInfo?: any
  ): Promise<{
    layoutSuggestions: string[];
    colorSuggestions: string[];
    typographySuggestions: string[];
    contentSuggestions: string[];
  }> {
    const brandContext = brandInfo 
      ? `Brand context: ${brandInfo.name}, industry: ${brandInfo.industry}, target audience: ${brandInfo.target_audience}`
      : '';

    const suggestionPrompt = `
      For a ${designMode} design project with this brief: "${brief}"
      ${brandContext}
      
      Provide specific suggestions for:
      1. Layout approaches (3 options)
      2. Color schemes (3 options)
      3. Typography choices (3 options)
      4. Content structure (3 options)
      
      Format each section clearly and be specific about design principles.
    `;

    try {
      const result = await this.generateText({ prompt: suggestionPrompt });
      
      // Parse the response (this is a simplified parser - you might want to make it more robust)
      const sections = result.split(/\d+\./);
      
      return {
        layoutSuggestions: this.parseSection(sections[1] || ''),
        colorSuggestions: this.parseSection(sections[2] || ''),
        typographySuggestions: this.parseSection(sections[3] || ''),
        contentSuggestions: this.parseSection(sections[4] || '')
      };
    } catch {
      throw new Error('Failed to generate design suggestions');
    }
  }

  private parseSection(section: string): string[] {
    return section
      .split('\n')
      .filter(line => line.trim().length > 0)
      .slice(0, 3)
      .map(line => line.replace(/^[-*•]\s*/, '').trim());
  }
}

// Export a singleton instance
export const geminiAI = new GeminiAIService();
