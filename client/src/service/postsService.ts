import apiClient from '../api/client';
import { mockGeneratePost } from '../mocks';
import type { 
  GeneratePostRequest, 
  GeneratePostResponse, 
  FormData,
  BrandRules 
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

  async generatePost(formData: FormData): Promise<GeneratePostResponse> {

    const postRequest = {
      prompt: formData.prompt,
      template: 'professional' as const,
      variations: 1,
      word_count: formData.wordCount,
      tone: 'professional' as const,
      audience: 'general',
      generate_hashtags: formData.generateHashtags,
      include_emojis: formData.includeEmojis,
      language: 'en',
      seed_hashtags: [],
      topic: formData.prompt,
      n_images: 1,
      image_style: 'minimal-ui' as const,
      image_palette: 'blue/green',
      image_size: '1024x1024' as const,
      brand_rules: {
        banned_phrases: [],
        cta_style: 'neutral' as const,
        link_policy: 'no_links' as const
      }
    };

    const backendResponse = await mockGeneratePost(postRequest);
    
    if ('post' in backendResponse) {
      const generatedPost = {
        id: `generated-${Date.now()}`,
        content: backendResponse.post,
        hashtags: backendResponse.hashtags,
        images: backendResponse.images.map(url => ({
          url,
          alt_text: 'Generated image',
          style: 'minimal-ui',
          palette: 'blue/green'
        })),
        word_count: formData.wordCount,
        engagement_score: Math.floor(Math.random() * 30) + 70,
        estimated_reach: Math.floor(Math.random() * 5000) + 1000,
        readability_score: Math.floor(Math.random() * 20) + 80,
        usage: backendResponse.usage
      };
      
      return {
        success: true,
        data: {
          posts: [generatedPost],
          request_id: `mock-${Date.now()}`,
          processing_time: Math.random() * 3000 + 1000,
        },
        message: 'Content generated successfully with mock backend'
      };
    } else {
      const posts = backendResponse.options.map((option, index) => ({
        id: `generated-${Date.now()}-${index}`,
        content: option.post,
        hashtags: option.hashtags,
        images: option.images.map(url => ({
          url,
          alt_text: 'Generated image',
          style: 'minimal-ui',
          palette: 'blue/green'
        })),
        word_count: formData.wordCount,
        engagement_score: Math.floor(Math.random() * 30) + 70,
        estimated_reach: Math.floor(Math.random() * 5000) + 1000,
        readability_score: Math.floor(Math.random() * 20) + 80,
        usage: option.usage
      }));
      
      return {
        success: true,
        data: {
          posts,
          request_id: `mock-${Date.now()}`,
          processing_time: Math.random() * 3000 + 1000,
        },
        message: 'Multiple posts generated successfully with mock backend'
      };
    }
    /*
    try {
      const requestData = this.mapFormDataToApiRequest(formData);
      
      console.log('Sending request to API:', requestData);
      
      const response = await apiClient.post<GeneratePostResponse>(
        this.endpoint,
        requestData
      );

      return response.data;
    } catch (error) {
      console.error('Error generating post:', error);
      
      if (error instanceof Error) {
        throw new Error(`Failed to generate post: ${error.message}`);
      }
      
      throw new Error('Unknown error occurred while generating post');
    }
    
    */
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
