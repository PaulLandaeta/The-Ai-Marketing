import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { GeneratedPost } from '../api/types';

export interface FormState {
  prompt: string;
  url: string;
  personalityValue: number;
  wordCount: number;
  generateHashtags: boolean;
  includeEmojis: boolean;
}

interface AppState {

  form: FormState;
  
  isGenerating: boolean;
  generatedContent: GeneratedPost | null;
  
  sidebarCollapsed: boolean;
  
  postHistory: GeneratedPost[];
  
  updateForm: (updates: Partial<FormState>) => void;
  resetForm: () => void;
  
  startGeneration: () => void;
  setGeneratedContent: (content: GeneratedPost | null) => void;
  endGeneration: () => void;
  generatePost: () => Promise<void>;
  
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

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        form: initialFormState,
        isGenerating: false,
        generatedContent: null,
        sidebarCollapsed: false,
        postHistory: [],

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
            const { generateMockPost } = await import('../mocks');
            
            const generatedPost = await generateMockPost(state.form);
            
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

export const useGenerationState = () => {
  const isGenerating = useAppStore((state) => state.isGenerating);
  const generatedContent = useAppStore((state) => state.generatedContent);
  return { isGenerating, generatedContent };
};

export const useUIState = () => {
  const sidebarCollapsed = useAppStore((state) => state.sidebarCollapsed);
  return { sidebarCollapsed };
};

export const usePostHistory = () => useAppStore((state) => state.postHistory);
