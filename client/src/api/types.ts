export interface BrandRules {
  banned_phrases: string[];
  cta_style: 'subtle' | 'direct' | 'casual';
  link_policy: 'no_links' | 'allow_links' | 'branded_only';
}

export interface GeneratePostRequest {
  prompt: string;
  template: 'announcement' | 'casual' | 'professional' | 'story' | 'question';
  variations: number;
  word_count: number;
  tone: 'enthusiastic' | 'professional' | 'casual' | 'friendly' | 'authoritative';
  audience: string;
  generate_hashtags: boolean;
  include_emojis: boolean;
  language: 'en' | 'es' | 'fr' | 'de' | 'pt';
  seed_hashtags: string[];
  n_images: number;
  image_style: 'minimal-ui' | 'photographic' | 'illustration' | 'abstract';
  image_palette: 'blue/green' | 'warm' | 'cool' | 'monochrome' | 'vibrant';
  brand_rules: BrandRules;
}

export interface GeneratedImage {
  url: string;
  alt_text: string;
  style: string;
  palette: string;
}

export interface GeneratedPost {
  id: string;
  content: string;
  hashtags: string[];
  images: GeneratedImage[];
  word_count: number;
  engagement_score: number;
  readability_score: number;
  estimated_reach: number;
}

export interface GeneratePostResponse {
  success: boolean;
  data: {
    posts: GeneratedPost[];
    request_id: string;
    processing_time: number;
  };
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface FormData {
  prompt: string;
  url: string;
  personalityValue: number;
  wordCount: number;
  generateHashtags: boolean;
  includeEmojis: boolean;
}
