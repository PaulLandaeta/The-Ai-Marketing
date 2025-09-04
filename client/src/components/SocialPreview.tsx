import React, { useState } from 'react';
import { Typography, Tabs, Card, Avatar, Space, Button } from 'antd';
import { 
  InstagramOutlined, 
  TwitterOutlined, 
  LinkedinOutlined,
  HeartOutlined,
  MessageOutlined,
  ShareAltOutlined,
  MoreOutlined
} from '@ant-design/icons';
import { marketingColors } from '../styles/theme';

const { Text, Paragraph } = Typography;

interface SocialPreviewProps {
  content: string;
  imageUrl: string;
  hashtags: string;
}

const SocialPreview: React.FC<SocialPreviewProps> = ({ content, imageUrl, hashtags }) => {
  const [activeTab, setActiveTab] = useState('instagram');

  const InstagramPreview = () => (
    <Card 
      className="hover-lift"
      style={{ 
        maxWidth: '400px', 
        margin: '0 auto',
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #e1e8ed',
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '12px 16px',
        borderBottom: '1px solid #efefef'
      }}>
        <Avatar 
          size={32} 
          style={{ 
            background: marketingColors.gradient,
            marginRight: '12px'
          }}
        >
          AI
        </Avatar>
        <div>
          <Text strong style={{ fontSize: '14px' }}>ai_marketing_pro</Text>
          <div style={{ fontSize: '12px', color: '#8e8e8e' }}>Sponsored</div>
        </div>
        <MoreOutlined style={{ marginLeft: 'auto', fontSize: '16px' }} />
      </div>

      <div style={{ position: 'relative' }}>
        <img 
          src={imageUrl}
          alt="Post"
          style={{ 
            width: '100%', 
            height: '400px', 
            objectFit: 'cover' 
          }}
        />
      </div>

      <div style={{ padding: '12px 16px' }}>
        <Space size="middle" style={{ marginBottom: '8px' }}>
          <HeartOutlined style={{ fontSize: '24px' }} />
          <MessageOutlined style={{ fontSize: '24px' }} />
          <ShareAltOutlined style={{ fontSize: '24px' }} />
        </Space>
        
        <Text strong style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
          1,234 likes
        </Text>
        
        <div>
          <Text strong style={{ marginRight: '8px' }}>ai_marketing_pro</Text>
          <Text style={{ fontSize: '14px', lineHeight: '1.4' }}>
            {content.substring(0, 150)}...
          </Text>
        </div>
        
        <Text type="secondary" style={{ fontSize: '14px', display: 'block', marginTop: '4px' }}>
          {hashtags}
        </Text>
      </div>
    </Card>
  );

  const LinkedInPreview = () => (
    <Card 
      className="hover-lift"
      style={{ 
        maxWidth: '500px', 
        margin: '0 auto',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e1e8ed'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '16px',
        borderBottom: '1px solid #e1e8ed'
      }}>
        <Avatar 
          size={48} 
          style={{ 
            background: marketingColors.gradient,
            marginRight: '12px'
          }}
        >
          AI
        </Avatar>
        <div>
          <Text strong style={{ fontSize: '16px', display: 'block' }}>AI Marketing Pro</Text>
          <Text type="secondary" style={{ fontSize: '14px' }}>Marketing Specialist • 2h</Text>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <Paragraph style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
          {content}
        </Paragraph>
        
        <img 
          src={imageUrl}
          alt="Post"
          style={{ 
            width: '100%', 
            height: '300px', 
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '12px'
          }}
        />
        
        <Text type="secondary" style={{ fontSize: '14px' }}>
          {hashtags}
        </Text>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around',
        padding: '8px 16px',
        borderTop: '1px solid #e1e8ed'
      }}>
        <Button type="text" icon={<HeartOutlined />}>Like</Button>
        <Button type="text" icon={<MessageOutlined />}>Comment</Button>
        <Button type="text" icon={<ShareAltOutlined />}>Share</Button>
      </div>
    </Card>
  );

  const TwitterPreview = () => (
    <Card 
      className="hover-lift"
      style={{ 
        maxWidth: '450px', 
        margin: '0 auto',
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #e1e8ed'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        padding: '16px'
      }}>
        <Avatar 
          size={40} 
          style={{ 
            background: marketingColors.gradient,
            marginRight: '12px'
          }}
        >
          AI
        </Avatar>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <Text strong style={{ marginRight: '4px' }}>AI Marketing</Text>
            <Text type="secondary" style={{ fontSize: '14px' }}>@ai_marketing • 2h</Text>
          </div>
          
          <Text style={{ fontSize: '15px', lineHeight: '1.4', display: 'block', marginBottom: '12px' }}>
            {content.substring(0, 200)}...
          </Text>
          
          <img 
            src={imageUrl}
            alt="Post"
            style={{ 
              width: '100%', 
              height: '250px', 
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '8px'
            }}
          />
          
          <Text type="secondary" style={{ fontSize: '14px', marginBottom: '12px', display: 'block' }}>
            {hashtags}
          </Text>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            maxWidth: '300px'
          }}>
            <Button type="text" icon={<MessageOutlined />} size="small">12</Button>
            <Button type="text" icon={<ShareAltOutlined />} size="small">23</Button>
            <Button type="text" icon={<HeartOutlined />} size="small">156</Button>
          </div>
        </div>
      </div>
    </Card>
  );

  const tabItems = [
    {
      key: 'instagram',
      label: (
        <span>
          <InstagramOutlined style={{ marginRight: '8px' }} />
          Instagram
        </span>
      ),
      children: <InstagramPreview />,
    },
    {
      key: 'linkedin',
      label: (
        <span>
          <LinkedinOutlined style={{ marginRight: '8px' }} />
          LinkedIn
        </span>
      ),
      children: <LinkedInPreview />,
    },
    {
      key: 'twitter',
      label: (
        <span>
          <TwitterOutlined style={{ marginRight: '8px' }} />
          Twitter
        </span>
      ),
      children: <TwitterPreview />,
    },
  ];

  return (
    <div className="fade-in" style={{ width: '100%' }}>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        centered
        size="large"
        className="social-preview-tabs"
      />
    </div>
  );
};

export default SocialPreview;
