import apiClient from '../api/client';
import type {
  PostGenerationRequest,
  GeneratePostResponse,
} from '../api/types';

class PostsService {
  private readonly endpoint = '/posts:generate';

  private mapFormDataToApiRequest(formData: FormData): GeneratePostRequest {

    const getToneFromPersonality = (value: number): GeneratePostRequest['tone'] => {
      if (value <= 20) return 'professional';
      if (value <= 40) return 'authoritative';
      if (value <= 60) return 'friendly';
      if (value <= 80) return 'casual';
      return 'enthusiastic';
    };

    const getTemplateFromPrompt = (prompt: string): GeneratePostRequest['template'] => {
      const lowerPrompt = prompt.toLowerCase();
      if (lowerPrompt.includes('announce') || lowerPrompt.includes('announcement')) {
        return 'announcement';
      }
      if (lowerPrompt.includes('question') || lowerPrompt.includes('?')) {
        return 'question';
      }
      if (lowerPrompt.includes('story') || lowerPrompt.includes('experience')) {
        return 'story';
      }
      return 'casual';
    };

    const defaultBrandRules: BrandRules = {
      banned_phrases: ['rockstar', 'ninja', 'guru', 'hack'],
      cta_style: 'subtle',
      link_policy: 'allow_links'
    };

    return {
      prompt: formData.prompt,
      template: getTemplateFromPrompt(formData.prompt),
      variations: 1,
      word_count: formData.wordCount,
      tone: getToneFromPersonality(formData.personalityValue),
      audience: 'professional network',
      generate_hashtags: formData.generateHashtags,
      include_emojis: formData.includeEmojis,
      language: 'en',
      seed_hashtags: ['marketing', 'AI', 'content'],
      n_images: 1,
      image_style: 'minimal-ui',
      image_palette: 'blue/green',
      brand_rules: defaultBrandRules
    };
  }

  async generatePost(postRequest: PostGenerationRequest): Promise<GeneratePostResponse> {
    try {
      const start = Date.now();
      const { data: raw } = await apiClient.post(
        this.endpoint,
        postRequest
      );

      // Helper to map a single backend result to the UI shape
      const baseURL = (apiClient.defaults && apiClient.defaults.baseURL) || '';
      const absolutize = (url: string) => (url?.startsWith('http') ? url : `${baseURL}${url || ''}`);
      const withCacheBuster = (url: string, v: string | number) => {
        try {
          const u = new URL(url);
          u.searchParams.set('v', String(v));
          return u.toString();
        } catch {
          return `${url}${url.includes('?') ? '&' : '?'}v=${v}`;
        }
      };

      const toGeneratedPost = (item: any, idx = 0) => ({
        id: `generated-${Date.now()}-${idx}`,
        content: item.post,
        hashtags: item.hashtags || [],
        images: (item.images && Array.isArray(item.images)
          ? item.images
          : (item.image_url ? [item.image_url] : [])
        ).map((url: string) => ({
          url: withCacheBuster(absolutize(url), item.run_id || raw.run_id || Date.now()),
          alt_text: 'Generated image',
          style: postRequest.image_style,
          palette: postRequest.image_palette,
        })),
        run_id: item.run_id || raw.run_id,
        word_count: postRequest.word_count,
        engagement_score: Math.floor(Math.random() * 30) + 70,
        estimated_reach: Math.floor(Math.random() * 5000) + 1000,
        readability_score: Math.floor(Math.random() * 20) + 80,
        usage: raw.usage || item.usage || undefined,
      });

      const posts = 'options' in raw && Array.isArray(raw.options)
        ? raw.options.map((opt: any, i: number) => toGeneratedPost(opt, i))
        : [toGeneratedPost(raw, 0)];

      const response: GeneratePostResponse = {
        success: true,
        data: {
          posts,
          request_id: `req-${Date.now()}`,
          processing_time: Date.now() - start,
        },
        message: 'Content generated successfully',
      };
      return response;
    } catch (error) {
      console.error('Error generating post:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to generate post: ${error.message}`);
      }
      throw new Error('Unknown error occurred while generating post');
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await apiClient.get('/health');
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const postsService = new PostsService();
export default postsService;
