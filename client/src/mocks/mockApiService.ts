import type { GeneratedPost } from '../api/types';
import type { FormState } from '../stores/appStore';
import { mockPosts } from './defaultPosts';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateMockPost(formData: FormState): Promise<GeneratedPost> {
  const delayTime = Math.random() * 1500 + 1500;
  await delay(delayTime);

  const basePost = mockPosts[Math.floor(Math.random() * mockPosts.length)];
  
  const id = `generated-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  let content = basePost.content;
  
  if (formData.personalityValue > 70) {
    content = `🔥 ${content} Let's make it happen! 💪`;
  } else if (formData.personalityValue < 30) {
    content = content.replace(/!/g, '.').replace(/🚀|🔥|💪/g, '');
  }
  
  if (formData.wordCount < 150) {
    content = content.substring(0, Math.floor(content.length * 0.7));
  } else if (formData.wordCount > 300) {
    content += " This comprehensive approach ensures maximum impact and sustained growth for your business.";
  }
  
  let hashtags = basePost.hashtags;
  if (!formData.generateHashtags) {
    hashtags = [];
  }
  
  if (!formData.includeEmojis) {
    content = content.replace(/🚀|🔥|💪|🎯|📈|✨|⚡|🌟|💡|🎨|📊|🔍/gu, '');
  }
  
  const generatedPost: GeneratedPost = {
    id,
    content,
    hashtags,
    images: basePost.images,
    word_count: formData.wordCount,
    engagement_score: Math.floor(Math.random() * 30) + 70,
    estimated_reach: Math.floor(Math.random() * 5000) + 1000,
    readability_score: Math.floor(Math.random() * 20) + 80
  };
  
  return generatedPost;
}

export async function generateMockPostWithError(): Promise<never> {
  await delay(2000);
  throw new Error('Simulated API error for testing');
}

export async function getMockHistory(): Promise<GeneratedPost[]> {
  await delay(500);
  return mockPosts.slice(0, 5);
}
