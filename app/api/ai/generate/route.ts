import { NextRequest, NextResponse } from 'next/server';
import { geminiAI } from '@/src/lib/gemini';
import { supabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    if (!auth.auth) return auth.error;
    const body = await request.json();
    const { 
      brief, 
      description,
      projectName,
      title,
      type,
      mode,
      aiModeId, 
      designStyleId, 
      brandProfileId, 
      targetPlatforms,
    } = body;

    const projectTitle = projectName || title || 'Creative Design Concept';
    const projectBrief = brief || description || projectTitle;
    const projectCategory = type || 'UI/UX Design';
    const effectiveMode = mode || aiModeId || 'quick';

    // If no userId passed in body, try to check auth header
    const targetUserId = auth.userId;

    // Try AI generation with Gemini if available
    let suggestions: any = null;
    let enhancedPrompt: string = '';
    let copyVariations: any = null;

    try {
      if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: 'AI generation is not configured' }, { status: 503 });
      }
      if (process.env.GEMINI_API_KEY) {
        suggestions = await geminiAI.generateDesignSuggestions(
          projectBrief,
          effectiveMode,
          null
        );

        enhancedPrompt = await geminiAI.enhanceImagePrompt(
          projectBrief,
          'modern minimalist',
          'professional',
          ''
        );

        const headlines = await geminiAI.generateDesignCopy('headline', projectBrief);
        if (headlines && headlines.length) copyVariations.headlines = headlines;
      }
    } catch {
      return NextResponse.json({ error: 'AI generation failed' }, { status: 502 });
    }

    if (!suggestions) {
      return NextResponse.json({ error: 'AI generation returned no result' }, { status: 502 });
    }

    // Pick a thematic cover image based on category
    const categoryCovers: Record<string, string> = {
      'logo': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
      'banner': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'poster': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'social-media': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'web-design': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'branding': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'
    };
    const defaultCover = categoryCovers[type] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

    // Insert project into Supabase if userId is provided
    let createdProject = null;
    if (targetUserId) {
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id: targetUserId,
          title: projectTitle,
          description: projectBrief,
          category: projectCategory,
          cover_image: defaultCover,
          tags: [projectCategory, 'AI Generated', effectiveMode],
          is_published: true,
          status: 'completed'
        })
        .select()
        .single();

      if (!projectError) {
        createdProject = project;
      } else {
        console.warn('Could not insert to projects table:', projectError);
      }
    }

    const projectId = createdProject?.id || `proj-${Date.now()}`;

    return NextResponse.json({
      success: true,
      projectId,
      project: createdProject || {
        id: projectId,
        title: projectTitle,
        description: projectBrief,
        category: projectCategory,
        cover_image: defaultCover,
        status: 'completed'
      },
      aiSuggestions: suggestions,
      enhancedPrompt,
      copyVariations
    });

  } catch (error: any) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error during AI generation' },
      { status: 500 }
    );
  }
}
