import { NextRequest, NextResponse } from 'next/server';
import { geminiAI } from '@/src/lib/gemini';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
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
      userId 
    } = body;

    const projectTitle = projectName || title || 'Creative Design Concept';
    const projectBrief = brief || description || projectTitle;
    const projectCategory = type || 'UI/UX Design';
    const effectiveMode = mode || aiModeId || 'quick';

    // If no userId passed in body, try to check auth header
    let targetUserId = userId;
    if (!targetUserId) {
      const authHeader = request.headers.get('authorization');
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        const { data: { user } } = await supabase.auth.getUser(token);
        if (user) targetUserId = user.id;
      }
    }

    // Try AI generation with Gemini if available
    let suggestions: any = null;
    let enhancedPrompt: string = '';
    let copyVariations: any = {
      headlines: [`${projectTitle}: Modern Experience`, `The New Standard in ${projectCategory}`],
      body: [`Designed with pixel-perfection and responsive accessibility.`],
      cta: ['Explore Study', 'Get Started']
    };

    try {
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
    } catch (aiErr) {
      console.warn('Gemini AI fallback active:', aiErr);
    }

    if (!suggestions) {
      suggestions = {
        colorPalette: ['#14161F', '#FF6B6B', '#3B82F6', '#FAF7F0'],
        typography: { heading: 'Plus Jakarta Sans', body: 'Inter' },
        layoutSuggestions: [
          'High-contrast hero section with glassmorphic cards',
          'Responsive grid layout with interactive micro-animations',
          'Fluid typography with accessible contrast ratios'
        ]
      };
      enhancedPrompt = `A high-end editorial ${projectCategory} mockup for ${projectTitle}, sleek studio lighting, 8k resolution, minimalist dark glass UI`;
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
