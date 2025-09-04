import { defaultPost, mockPosts } from '../mocks/defaultPosts';
import type { GeneratedPost, FormData, GeneratePostResponse } from '../api/types';

const apiDelay = (min: number = 2000, max: number = 4000): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

const selectMockPost = (formData: FormData): GeneratedPost => {
  const prompt = formData.prompt.toLowerCase();
  
  if (prompt.includes('marketing') || prompt.includes('strategy')) {
    return mockPosts[1];
  } else if (prompt.includes('brand') || prompt.includes('story')) {
    return mockPosts[2];
  }
  
  return defaultPost;
};

const generateRealisticMetrics = (basePost: GeneratedPost, formData: FormData): GeneratedPost => {
  const variation = 0.1;
  
  return {
    ...basePost,
    id: `generated-${Date.now()}`,
    engagement_score: Math.round(basePost.engagement_score * (1 + (Math.random() - 0.5) * variation)),
    estimated_reach: Math.round(basePost.estimated_reach * (1 + (Math.random() - 0.5) * variation)),
    readability_score: Math.round(basePost.readability_score * (1 + (Math.random() - 0.5) * variation)),
    word_count: formData.wordCount || basePost.word_count,
  };
};

export const mockApiService = {
  async generatePost(formData: FormData): Promise<GeneratePostResponse> {
    console.log('Using mock API service for development');
    
    await apiDelay();
    
    const basePost = selectMockPost(formData);
    const generatedPost = generateRealisticMetrics(basePost, formData);
    
    return {
      success: true,
      data: {
        posts: [generatedPost],
        request_id: `mock-${Date.now()}`,
        processing_time: Math.random() * 3000 + 1000,
      },
      message: 'Content generated successfully with mock data'
    };
  }
};
