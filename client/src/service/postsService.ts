import apiClient from '../api/client';
import { mockApiService } from '../services/mockApiService';
import type { 
  GeneratePostRequest, 
  GeneratePostResponse, 
  FormData,
  BrandRules 
} from '../api/types';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.DEV;

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

    if (USE_MOCK_API) {
      console.log('Using mock API for development');
      return mockApiService.generatePost(formData);
    }

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
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await apiClient.get('/health');
      return response.status === 200;
    } catch (error) {
      console.error('❌ Health check failed:', error);
      return false;
    }
  }
}

export const postsService = new PostsService();
export default postsService;
