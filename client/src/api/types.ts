export interface BriefInput {
  prompt: string;
  platform: 'LinkedIn' | 'Instagram' | 'Facebook' | 'TikTok';
  objective: 'Awareness' | 'Engagement' | 'Conversion' | 'LeadGen';
  brand_cues?: string;
}

export interface VisualFrame {
  title: string;
  shot: string;
}

export interface VisualConcept {
  format: 'Image' | 'Carousel' | 'Video';
  frames: VisualFrame[];
  palette: string[];
  typography: string;
  why: string;
  image_url?: string;
}

export interface FactCard {
  type: string;
  value: string;
  source: string;
}

export interface BriefOutput {
  core_text: string;
  caption: string;
  hashtags: string[];
  post_type: 'Launch' | 'Sale' | 'Educational' | 'Announcement';
  visual_concept: VisualConcept;
  facts: FactCard[];
  reasoning: string;
  run_id: string;
}

export interface PostGenerationRequest {
  prompt: string;
  template: 'casual' | 'professional' | 'storytelling' | 'technical' | 'contrarian' | 'case-study' | 'announcement';
  variations: number;
  word_count: number;
  tone: 'enthusiastic' | 'professional' | 'friendly' | 'humble' | 'confident' | 'technical' | 'celebratory';
  audience: string;
  generate_hashtags: boolean;
  include_emojis: boolean;
  language: string;
  seed_hashtags: string[];
  topic?: string;
  n_images: number;
  image_style: 'minimal-ui' | 'isometric' | 'data-viz' | 'abstract' | 'diagram';
  image_palette: string;
  image_size: '256x256' | '512x512' | '1024x1024';
  brand_rules: {
    banned_phrases: string[];
    cta_style: 'strong' | 'neutral' | 'subtle';
    link_policy: 'no_links' | 'allow_one' | 'allow_many';
  };
}

export interface FormData {
  prompt: string;
  wordCount: number;
  personalityValue: number;
  generateHashtags: boolean;
  includeEmojis: boolean;
}

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

export interface UsageMetrics {
  model: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  llm_usd: number;
  image_usd: number;
  total_usd: number;
}

export interface BriefData {
  core_text: string;
  caption: string;
  hashtags: string[];
  post_type: string;
  visual_concept: {
    format: string;
    frames: {
      title: string;
      shot: string;
    }[];
    palette: string[];
    typography: string;
    why: string;
    image_url?: string;
  };
  facts: {
    type: string;
    value: string;
    source: string;
  }[];
  reasoning: string;
  run_id: string;
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
  usage?: UsageMetrics;
  briefData?: BriefData;
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
