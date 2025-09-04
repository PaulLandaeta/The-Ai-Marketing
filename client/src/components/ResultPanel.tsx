import React from 'react';
import { Typography } from 'antd';
import { ThunderboltOutlined } from '@ant-design/icons';
import SocialPreview from './SocialPreview';
import LoadingState from './LoadingState';
import { marketingColors } from '../styles/theme';
import { useGenerationState } from '../stores';

const { Text } = Typography;

const ResultPanel: React.FC = () => {
  const { generatedContent, isGenerating } = useGenerationState();
  const hasContent = !!generatedContent;

  return (
    <div 
      className="fade-in"
      style={{ 
        flex: 1, 
        background: marketingColors.cardGradient,
        padding: '24px', 
        borderRadius: '16px',
        boxShadow: marketingColors.shadowSoft,
        border: '1px solid rgba(99, 102, 241, 0.1)',
        position: 'relative',
        minHeight: '500px'
      }}
    >
      {(!hasContent || isGenerating) && (
        <LoadingState isGenerating={isGenerating} hasContent={hasContent} />
      )}

      {hasContent && !isGenerating && (
        <>
          <div style={{ marginBottom: '24px' }}>
            <Text 
              className="gradient-text"
              style={{ 
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              ✨ Generated Content Preview
            </Text>
            <Text style={{ 
              background: 'rgba(99, 102, 241, 0.1)', 
              padding: '6px 12px', 
              borderRadius: '8px',
              fontSize: '12px',
              color: marketingColors.primary,
              border: `1px solid ${marketingColors.primary}20`
            }}>
              <ThunderboltOutlined style={{ marginRight: '4px' }} />
              Ready to publish across platforms!
            </Text>
          </div>

          <SocialPreview 
            content={generatedContent.content}
            imageUrl={generatedContent.images[0]?.url || ''}
            hashtags={generatedContent.hashtags.join(' ')}
          />

          <div 
            className="slide-up hover-lift"
            style={{ 
              marginTop: '24px',
              padding: '16px',
              background: 'rgba(16, 185, 129, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
              <div>
                <Text strong style={{ color: marketingColors.accent, fontSize: '18px', display: 'block' }}>
                  {generatedContent.engagement_score}%
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Engagement Score
                </Text>
              </div>
              <div>
                <Text strong style={{ color: marketingColors.secondary, fontSize: '18px', display: 'block' }}>
                  {(generatedContent.estimated_reach / 1000).toFixed(1)}K
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Est. Reach
                </Text>
              </div>
              <div>
                <Text strong style={{ color: marketingColors.warning, fontSize: '18px', display: 'block' }}>
                  {generatedContent.readability_score}%
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Readability
                </Text>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultPanel;
