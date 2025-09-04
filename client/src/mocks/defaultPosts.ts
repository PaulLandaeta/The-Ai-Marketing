import type { GeneratedPost } from '../api/types';

export const defaultPost: GeneratedPost = {
  id: "mock-post-1",
  content: "Are you ready to elevate your problem-solving abilities and make smarter choices every day? Mental models are the key to understanding and navigating the complexities of life and business. Dive into this comprehensive guide to learn how these powerful tools can transform your thinking and help you tackle challenges with confidence.",
  hashtags: ["#MentalModels", "#Leadership", "#DecisionMaking", "#Productivity", "#ContinuousLearning", "#ProfessionalGrowth"],
  images: [{
    url: "https://www.lsdigital.com/wp-content/uploads/2024/11/DALL%C2%B7E-2024-11-28-15.05.17-A-vibrant-and-colorful-futuristic-concept-depicting-the-integration-of-AI-in-content-marketing.-The-scene-shows-a-sleek-digital-workspace-filled-with--1024x585.webp",
    alt_text: "AI Marketing Integration Concept",
    style: "photographic",
    palette: "vibrant"
  }],
  word_count: 200,
  engagement_score: 87,
  estimated_reach: 2340,
  readability_score: 94
};

export const mockPosts: GeneratedPost[] = [
  defaultPost,
  {
    id: "mock-post-2",
    content: "🚀 Transform your marketing strategy with AI-powered insights! In today's competitive landscape, data-driven decisions aren't just advantageous—they're essential. Discover how artificial intelligence can revolutionize your content creation process and boost engagement rates by up to 300%.",
    hashtags: ["#AIMarketing", "#DigitalTransformation", "#MarketingStrategy", "#Innovation", "#GrowthHacking"],
    images: [{
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      alt_text: "Digital Marketing Analytics Dashboard",
      style: "photographic",
      palette: "blue/green"
    }],
    word_count: 180,
    engagement_score: 92,
    estimated_reach: 4200,
    readability_score: 89
  },
  {
    id: "mock-post-3",
    content: "Behind every successful brand is a story that resonates ✨ Content isn't just about selling—it's about connecting, inspiring, and building lasting relationships with your audience. What's your brand's story?",
    hashtags: ["#BrandStorytelling", "#ContentMarketing", "#BrandStrategy", "#Engagement", "#Community"],
    images: [{
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      alt_text: "Brand Storytelling Concept",
      style: "illustration",
      palette: "warm"
    }],
    word_count: 150,
    engagement_score: 89,
    estimated_reach: 3100,
    readability_score: 91
  }
];
