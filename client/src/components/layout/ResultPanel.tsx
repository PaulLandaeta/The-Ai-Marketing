import React from 'react';
import { Typography } from 'antd';
import { CheckCircleOutlined, EyeOutlined, SendOutlined, ClockCircleOutlined, SaveOutlined } from '@ant-design/icons';
import SocialPreview from '../post/SocialPreview';
import LoadingState from '../ui/LoadingState';
import MetricsDisplay from '../post/MetricsDisplay';
import ImageGallery from '../post/ImageGallery';
import { BriefPreview } from '../brief/BriefPreview';
import { marketingColors } from '../../styles/theme';
import { useGenerationState } from '../../stores';

const { Text } = Typography;

const ResultPanel: React.FC = () => {
  const { generatedContent, isGenerating } = useGenerationState();
  const hasContent = !!generatedContent;
  const isBriefData = generatedContent?.briefData != null;

  return (
    <div 
      className="fade-in"
      style={{ 
        position: 'fixed',
        top: 0,
        right: 0,
        width: '550px',
        height: '100vh',
        background: marketingColors.cardGradient,
        padding: '0', 
        boxShadow: marketingColors.shadowSoft,
        border: '1px solid rgba(99, 102, 241, 0.1)',
        borderTop: 'none',
        borderRight: 'none',
        borderBottom: 'none',
        zIndex: 99,
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
        background: 'rgba(99, 102, 241, 0.05)'
      }}>
        <Text 
          className="gradient-text"
          style={{ 
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'block'
          }}
        >
          <EyeOutlined style={{ marginRight: '8px' }} />
          Content Preview
        </Text>
      </div>

      <div style={{ padding: '24px' }}>
        {(!hasContent || isGenerating) && (
          <LoadingState isGenerating={isGenerating} hasContent={hasContent} />
        )}

        {hasContent && !isGenerating && (
          <>
            {isBriefData && generatedContent.briefData ? (
              <BriefPreview 
                briefData={generatedContent.briefData}
              />
            ) : (
              <>
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <Text style={{ 
                    background: 'rgba(99, 102, 241, 0.1)', 
                    padding: '6px 12px', 
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: marketingColors.primary,
                    border: `1px solid ${marketingColors.primary}20`,
                  }}>
                    <CheckCircleOutlined style={{ marginRight: '4px' }} />
                    Ready to publish!
                  </Text>
                  
                  <div style={{ 
                    display: 'flex', 
                    gap: '12px',
                    fontSize: '10px'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <Text strong style={{ color: marketingColors.accent, fontSize: '14px', display: 'block' }}>
                        {generatedContent.engagement_score}%
                      </Text>
                      <Text type="secondary" style={{ fontSize: '10px' }}>
                        Engagement
                      </Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Text strong style={{ color: marketingColors.secondary, fontSize: '14px', display: 'block' }}>
                        {(generatedContent.estimated_reach / 1000).toFixed(1)}K
                      </Text>
                      <Text type="secondary" style={{ fontSize: '10px' }}>
                        Reach
                      </Text>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Text strong style={{ color: marketingColors.warning, fontSize: '14px', display: 'block' }}>
                        {generatedContent.readability_score}%
                      </Text>
                      <Text type="secondary" style={{ fontSize: '10px' }}>
                        Readability
                      </Text>
                    </div>
                  </div>
                </div>

                <SocialPreview 
                  content={generatedContent.content}
                  imageUrl={generatedContent.images[0]?.url || ''}
                  hashtags={generatedContent.hashtags.join(' ')}
                />

                <ImageGallery 
                  images={generatedContent.images?.map(img => typeof img === 'string' ? img : img.url) || []}
                  title="Generated Images"
                />

                {generatedContent.usage && (
                  <MetricsDisplay 
                    usage={generatedContent.usage}
                    imagesCount={generatedContent.images?.length || 0}
                  />
                )}

                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                  }}>
                    <SendOutlined style={{ marginRight: '8px' }} />Publish Now
                  </button>
                  
                  <button style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    color: marketingColors.primary,
                    border: `1px solid ${marketingColors.primary}30`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <ClockCircleOutlined style={{ marginRight: '8px' }} />Schedule Post
                  </button>
                  
                  <button style={{
                    background: 'rgba(156, 163, 175, 0.1)',
                    color: '#6B7280',
                    border: '1px solid rgba(156, 163, 175, 0.3)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <SaveOutlined style={{ marginRight: '8px' }} />Save Draft
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPanel;
