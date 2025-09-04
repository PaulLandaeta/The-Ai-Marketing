import React from 'react';
import { Typography, Button, Space, message } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import PromptSection from './PromptSection';
import MemorySection from './MemorySection';
import InputSection from './InputSection';
import WordCountSection from './WordCountSection';
import HashtagsEmojiSection from './HashtagsEmojiSection';
import PersonalitySlider from './PersonalitySlider';
import ChatSection from './ChatSection';
import { marketingColors } from '../styles/theme';
import { useFormState, useGenerationState, useAppStore } from '../stores/appStore';

const { Title } = Typography;

const MainForm: React.FC = () => {
  const form = useFormState();
  const { isGenerating } = useGenerationState();
  const {
    updateForm,
    generatePost
  } = useAppStore();

  const handleGenerate = async () => {
    if (!form.prompt.trim()) {
      message.error('Please enter a prompt to generate content');
      return;
    }

    try {
      console.log('Generating content with:', form);
      await generatePost();
      message.success('Content generated successfully!');
    } catch (error) {
      console.error('Error generating content:', error);
      message.error(
        error instanceof Error 
          ? `Failed to generate content: ${error.message}`
          : 'An unexpected error occurred'
      );
    }
  };

  return (
    <div className="fade-in" style={{ flex: 1, maxWidth: '500px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px',
        padding: '16px 0'
      }}>
        <Title 
          level={2} 
          className="gradient-text"
          style={{ 
            margin: 0,
            fontSize: '28px',
            fontWeight: 'bold'
          }}
        >
          ✨ Create Magic
        </Title>
        <Button 
          type="primary" 
          size="large" 
          loading={isGenerating}
          onClick={handleGenerate}
          className={`hover-lift ${isGenerating ? 'pulse' : ''}`}
          style={{ 
            background: marketingColors.gradient,
            border: 'none',
            borderRadius: '12px',
            padding: '0 32px',
            height: '48px',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: marketingColors.shadowPrimary
          }}
          icon={<RocketOutlined />}
        >
          {isGenerating ? 'Generating...' : 'Generate Content'}
        </Button>
      </div>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="slide-up" style={{ animationDelay: '0.1s' }}>
          <PromptSection 
            value={form.prompt} 
            onChange={(value) => updateForm({ prompt: value })} 
          />
        </div>
        
        <div className="slide-up" style={{ animationDelay: '0.2s' }}>
          <MemorySection />
        </div>
        
        <div className="slide-up" style={{ animationDelay: '0.3s' }}>
          <InputSection 
            value={form.url} 
            onChange={(value) => updateForm({ url: value })} 
          />
        </div>
        
        <div className="slide-up" style={{ animationDelay: '0.4s' }}>
          <WordCountSection 
            value={form.wordCount} 
            onChange={(value) => updateForm({ wordCount: value })} 
          />
        </div>
        
        <div className="slide-up" style={{ animationDelay: '0.5s' }}>
          <HashtagsEmojiSection
            generateHashtags={form.generateHashtags}
            includeEmojis={form.includeEmojis}
            onHashtagsChange={(value) => updateForm({ generateHashtags: value })}
            onEmojisChange={(value) => updateForm({ includeEmojis: value })}
          />
        </div>
        
        <div className="slide-up" style={{ animationDelay: '0.6s' }}>
          <PersonalitySlider 
            value={form.personalityValue} 
            onChange={(value) => updateForm({ personalityValue: value })} 
          />
        </div>
        
        <div className="slide-up" style={{ animationDelay: '0.7s' }}>
          <ChatSection />
        </div>
      </Space>
    </div>
  );
};

export default MainForm;
