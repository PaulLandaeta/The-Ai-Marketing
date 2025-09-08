import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { GeneratedPost, BriefInput } from '../api/types';
import postsService from '../service/postsService';

export type FormMode = 'post' | 'brief';

export interface FormState {
  prompt: string;
  url: string;
  wordCount: number;
  generateHashtags: boolean;
  includeEmojis: boolean;
}

export interface BriefFormState {
  prompt: string;
  platform: 'LinkedIn' | 'Instagram' | 'Facebook' | 'TikTok';
  objective: 'Awareness' | 'Engagement' | 'Conversion' | 'LeadGen';
  brand_cues: string;
}

export interface PostFormState {
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
  topic: string;
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

export interface FormState {
  prompt: string;
  url: string;
  personalityValue: number;
  wordCount: number;
  generateHashtags: boolean;
  includeEmojis: boolean;
}

interface AppState {
  formMode: FormMode;
  briefForm: BriefFormState;
  postForm: PostFormState;
  form: FormState;
  isGenerating: boolean;
  generatedContent: GeneratedPost | null;
  sidebarCollapsed: boolean;
  postHistory: GeneratedPost[];
  setFormMode: (mode: FormMode) => void;
  updateBriefForm: (updates: Partial<BriefFormState>) => void;
  resetBriefForm: () => void;
  updatePostForm: (updates: Partial<PostFormState>) => void;
  resetPostForm: () => void;
  updateForm: (updates: Partial<FormState>) => void;
  resetForm: () => void;
  startGeneration: () => void;
  setGeneratedContent: (content: GeneratedPost | null) => void;
  endGeneration: () => void;
  generatePost: () => Promise<void>;
  generateBrief: () => Promise<void>;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  addToHistory: (post: GeneratedPost) => void;
  clearHistory: () => void;
  removeFromHistory: (postId: string) => void;
}

const initialFormState: FormState = {
  prompt: '',
  url: 'http://',
  personalityValue: 50,
  wordCount: 200,
  generateHashtags: true,
  includeEmojis: true,
};

const initialBriefFormState: BriefFormState = {
  prompt: '',
  platform: 'Instagram',
  objective: 'Awareness',
  brand_cues: ''
};

const initialPostFormState: PostFormState = {
  prompt: '',
  template: 'casual',
  variations: 3,
  word_count: 100,
  tone: 'professional',
  audience: 'GENERAL',
  generate_hashtags: true,
  include_emojis: true,
  language: 'Spanish',
  seed_hashtags: [],
  topic: '',
  n_images: 1,
  image_style: 'minimal-ui',
  image_palette: 'professional',
  image_size: '512x512',
  brand_rules: {
    banned_phrases: [],
    cta_style: 'neutral',
    link_policy: 'allow_one'
  }
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        formMode: 'post' as FormMode,
        briefForm: initialBriefFormState,
        postForm: initialPostFormState,
        form: initialFormState,
        
        isGenerating: false,
        generatedContent: null,
        sidebarCollapsed: false,
        postHistory: [],
        setFormMode: (mode: FormMode) => set({ formMode: mode }),
        updateBriefForm: (updates: Partial<BriefFormState>) => set((state) => ({
          briefForm: { ...state.briefForm, ...updates }
        })),
        resetBriefForm: () => set({ briefForm: initialBriefFormState }),
        updatePostForm: (updates: Partial<PostFormState>) => set((state) => ({
          postForm: { ...state.postForm, ...updates }
        })),
        resetPostForm: () => set({ postForm: initialPostFormState }),

        updateForm: (updates: Partial<FormState>) =>
          set(
            (state) => ({
              form: { ...state.form, ...updates },
            }),
            false,
            'updateForm'
          ),

        resetForm: () =>
          set(
            { form: initialFormState },
            false,
            'resetForm'
          ),

        startGeneration: () =>
          set(
            { isGenerating: true },
            false,
            'startGeneration'
          ),

        setGeneratedContent: (content: GeneratedPost | null) =>
          set(
            (state) => ({
              generatedContent: content,
              isGenerating: false,
              postHistory: content && !state.postHistory.find((p: GeneratedPost) => p.id === content.id)
                ? [content, ...state.postHistory].slice(0, 10)
                : state.postHistory
            }),
            false,
            'setGeneratedContent'
          ),

        endGeneration: () =>
          set(
            { isGenerating: false },
            false,
            'endGeneration'
          ),

        generatePost: async () => {
          const state = useAppStore.getState();
          
          set({ isGenerating: true }, false, 'generatePost:start');
          
          try {
            const formData = {
              prompt: state.form.prompt,
              url: state.form.url,
              wordCount: state.form.wordCount,
              personalityValue: state.form.personalityValue,
              generateHashtags: state.form.generateHashtags,
              includeEmojis: state.form.includeEmojis
            };

            const response = await postsService.generatePost(formData);
            const generatedPost = response.data.posts[0];
            
            set(
              (currentState) => ({
                generatedContent: generatedPost,
                isGenerating: false,
                postHistory: [generatedPost, ...currentState.postHistory].slice(0, 10)
              }),
              false,
              'generatePost:success'
            );
          } catch (error) {
            console.error('Error generando post:', error);
            set({ isGenerating: false }, false, 'generatePost:error');
          }
        },

        generateBrief: async () => {
          const state = useAppStore.getState();
          
          set({ isGenerating: true }, false, 'generateBrief:start');
          
          try {
            const { mockGenerateBrief } = await import('../mocks');
            
            const briefRequest: BriefInput = state.formMode === 'brief' 
              ? state.briefForm 
              : {
                  prompt: state.form.prompt,
                  platform: 'Instagram' as const,
                  objective: 'Awareness' as const,
                  brand_cues: ''
                };
            
            const response = await mockGenerateBrief(briefRequest);
            
            const generatedPost = {
              id: `generated-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              content: response.core_text,
              hashtags: response.hashtags,
              images: response.visual_concept.image_url ? [{ 
                url: response.visual_concept.image_url, 
                alt_text: 'Generated image', 
                style: 'minimal-ui', 
                palette: 'professional' 
              }] : [],
              word_count: response.core_text.length / 5,
              engagement_score: Math.floor(Math.random() * 30) + 70,
              estimated_reach: Math.floor(Math.random() * 5000) + 1000,
              readability_score: Math.floor(Math.random() * 20) + 80,
              usage: {
                model: 'gpt-4',
                prompt_tokens: 150,
                completion_tokens: 300,
                total_tokens: 450,
                llm_usd: 0.045,
                image_usd: 0.04,
                total_usd: 0.085
              },
              briefData: response
            };
            
            set(
              (currentState) => ({
                generatedContent: generatedPost,
                isGenerating: false,
                postHistory: [generatedPost, ...currentState.postHistory].slice(0, 10)
              }),
              false,
              'generateBrief:success'
            );
          } catch (error) {
            console.error('Error generando brief:', error);
            set({ isGenerating: false }, false, 'generateBrief:error');
          }
        },

        toggleSidebar: () =>
          set(
            (state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
            false,
            'toggleSidebar'
          ),

        setSidebarCollapsed: (collapsed: boolean) =>
          set(
            { sidebarCollapsed: collapsed },
            false,
            'setSidebarCollapsed'
          ),

        addToHistory: (post: GeneratedPost) =>
          set(
            (state) => ({
              postHistory: [post, ...state.postHistory.filter((p: GeneratedPost) => p.id !== post.id)].slice(0, 10),
            }),
            false,
            'addToHistory'
          ),

        clearHistory: () =>
          set(
            { postHistory: [] },
            false,
            'clearHistory'
          ),

        removeFromHistory: (postId: string) =>
          set(
            (state) => ({
              postHistory: state.postHistory.filter((p: GeneratedPost) => p.id !== postId),
            }),
            false,
            'removeFromHistory'
          ),
      }),
      {
        name: 'ai-marketing-store',
        partialize: (state) => ({
          formMode: state.formMode,
          briefForm: state.briefForm,
          postForm: state.postForm,
          form: state.form,
          sidebarCollapsed: state.sidebarCollapsed,
          postHistory: state.postHistory,
        }),
      }
    ),
    {
      name: 'AI Marketing Store',
    }
  )
);

export const useFormState = () => useAppStore((state) => state.form);

export const useBriefFormState = () => useAppStore((state) => state.briefForm);

export const usePostFormState = () => useAppStore((state) => state.postForm);

export const useFormMode = () => useAppStore((state) => state.formMode);

export const useGenerationState = () => {
  const isGenerating = useAppStore((state) => state.isGenerating);
  const generatedContent = useAppStore((state) => state.generatedContent);
  return { isGenerating, generatedContent };
};

export const useUIState = () => {
  const sidebarCollapsed = useAppStore((state) => state.sidebarCollapsed);
  return { sidebarCollapsed };
};
