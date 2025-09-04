export interface FormData {
  prompt: string;
  url: string;
  personalityValue: number;
  wordCount: number;
  generateHashtags: boolean;
  includeEmojis: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}

export interface MenuItemType {
  key: string;
  icon: React.ReactNode;
  label: string;
}
