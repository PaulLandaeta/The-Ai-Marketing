import React from 'react';
import { Spin, Typography } from 'antd';
import { RobotOutlined, ThunderboltOutlined, EyeInvisibleOutlined, RocketOutlined } from '@ant-design/icons';
import { marketingColors } from '../../styles/theme';
import '../../styles/animations.css';

const { Text } = Typography;

interface LoadingStateProps {
  isGenerating: boolean;
  hasContent: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ isGenerating, hasContent }) => {
  if (hasContent && !isGenerating) {
    return null;
  }

  return (
    <div 
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        padding: '40px',
        background: hasContent ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: hasContent ? 'blur(10px)' : 'none',
        borderRadius: '16px',
        border: hasContent ? '1px solid rgba(99, 102, 241, 0.2)' : 'none',
        position: hasContent ? 'absolute' : 'relative',
        top: hasContent ? 0 : 'auto',
        left: hasContent ? 0 : 'auto',
        right: hasContent ? 0 : 'auto',
        bottom: hasContent ? 0 : 'auto',
        zIndex: hasContent ? 10 : 'auto'
      }}
    >
      {isGenerating ? (
        <>
          <Spin 
            size="large" 
            style={{ 
              marginBottom: '24px',
              color: marketingColors.primary 
            }}
          />
          <RobotOutlined 
            style={{ 
              fontSize: '48px', 
              color: marketingColors.primary,
              marginBottom: '16px',
              animation: 'robotPulse 2s infinite'
            }} 
          />
          <Text 
            style={{ 
              fontSize: '18px',
              fontWeight: 'bold',
              color: marketingColors.primary,
              textAlign: 'center',
              marginBottom: '8px'
            }}
          >
            <RobotOutlined style={{ marginRight: '8px' }} />
            Generating Amazing Content...
          </Text>
          <Text 
            style={{ 
              fontSize: '14px',
              color: '#64748b',
              textAlign: 'center',
              maxWidth: '300px'
            }}
          >
            Our AI is crafting the perfect post for your audience. This may take a few moments.
          </Text>
        </>
      ) : (
        <>
          <div 
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${marketingColors.primary}20, ${marketingColors.secondary}20)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              border: `2px dashed ${marketingColors.primary}40`
            }}
          >
            <EyeInvisibleOutlined 
              style={{ 
                fontSize: '48px',
                color: marketingColors.primary,
                opacity: 0.6
              }} 
            />
          </div>
          <Text 
            style={{ 
              fontSize: '20px',
              fontWeight: 'bold',
              color: marketingColors.primary,
              textAlign: 'center',
              marginBottom: '12px'
            }}
          >
            <RocketOutlined style={{ marginRight: '8px' }} />
            Ready to Create Magic?
          </Text>
          <Text 
            style={{ 
              fontSize: '16px',
              color: '#64748b',
              textAlign: 'center',
              maxWidth: '400px',
              lineHeight: '1.6'
            }}
          >
            Fill out the form and click <strong style={{ color: marketingColors.primary }}>
            <ThunderboltOutlined /> Generate Content</strong> to see your AI-powered social media post come to life!
          </Text>
        </>
      )}
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes robotPulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `
      }} />
    </div>
  );
};

export default LoadingState;
