import React, { useState } from 'react';
import { Typography, Tabs, Card, Avatar, Space, Button } from 'antd';
import { 
  InstagramOutlined, 
  TwitterOutlined, 
  LinkedinFilled,
  FacebookFilled,
  YoutubeFilled,
  TikTokOutlined,
  PinterestFilled,
  HeartOutlined,
  MessageOutlined,
  ShareAltOutlined,
  MoreOutlined,
  PlayCircleOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { marketingColors } from '../../styles/theme';

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

  const FacebookPreview = () => (
    <Card 
      className="hover-lift"
      style={{ 
        maxWidth: '500px', 
        margin: '0 auto',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e4e6ea'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '16px',
        borderBottom: '1px solid #e4e6ea'
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
        <div>
          <Text strong style={{ fontSize: '15px', display: 'block' }}>AI Marketing Pro</Text>
          <Text type="secondary" style={{ fontSize: '13px' }}>2 hours ago • 🌍</Text>
        </div>
        <MoreOutlined style={{ marginLeft: 'auto', fontSize: '20px', color: '#65676b' }} />
      </div>

      <div style={{ padding: '16px' }}>
        <Paragraph style={{ fontSize: '15px', lineHeight: '1.33', marginBottom: '12px' }}>
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
        borderTop: '1px solid #e4e6ea'
      }}>
        <Button type="text" icon={<HeartOutlined />} style={{ color: '#65676b' }}>Like</Button>
        <Button type="text" icon={<MessageOutlined />} style={{ color: '#65676b' }}>Comment</Button>
        <Button type="text" icon={<ShareAltOutlined />} style={{ color: '#65676b' }}>Share</Button>
      </div>
    </Card>
  );

  const TikTokPreview = () => (
    <Card 
      className="hover-lift"
      style={{ 
        maxWidth: '350px', 
        margin: '0 auto',
        background: '#000',
        borderRadius: '16px',
        border: 'none',
        color: '#fff'
      }}
    >
      <div style={{ position: 'relative', height: '500px' }}>
        <img 
          src={imageUrl}
          alt="Post"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            borderRadius: '16px'
          }}
        />
        
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '16px',
          right: '60px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Avatar 
              size={32} 
              style={{ 
                background: marketingColors.gradient,
                marginRight: '8px'
              }}
            >
              AI
            </Avatar>
            <Text strong style={{ color: '#fff', fontSize: '14px' }}>@ai_marketing</Text>
          </div>
          
          <Text style={{ color: '#fff', fontSize: '14px', lineHeight: '1.4', display: 'block', marginBottom: '8px' }}>
            {content.substring(0, 100)}...
          </Text>
          
          <Text style={{ color: '#fff', fontSize: '13px' }}>
            {hashtags}
          </Text>
        </div>

        <div style={{
          position: 'absolute',
          right: '12px',
          bottom: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <HeartOutlined style={{ fontSize: '28px', color: '#fff', display: 'block', marginBottom: '4px' }} />
            <Text style={{ color: '#fff', fontSize: '12px' }}>1.2K</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <MessageOutlined style={{ fontSize: '28px', color: '#fff', display: 'block', marginBottom: '4px' }} />
            <Text style={{ color: '#fff', fontSize: '12px' }}>89</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <ShareAltOutlined style={{ fontSize: '28px', color: '#fff', display: 'block', marginBottom: '4px' }} />
            <Text style={{ color: '#fff', fontSize: '12px' }}>234</Text>
          </div>
        </div>
      </div>
    </Card>
  );

  const YouTubePreview = () => (
    <Card 
      className="hover-lift"
      style={{ 
        maxWidth: '500px', 
        margin: '0 auto',
        background: '#fff',
        borderRadius: '12px',
        border: '1px solid #e0e0e0'
      }}
    >
      <div style={{ position: 'relative' }}>
        <img 
          src={imageUrl}
          alt="Video thumbnail"
          style={{ 
            width: '100%', 
            height: '280px', 
            objectFit: 'cover',
            borderRadius: '12px 12px 0 0'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.8)',
          borderRadius: '50%',
          padding: '12px'
        }}>
          <PlayCircleOutlined style={{ fontSize: '40px', color: '#fff' }} />
        </div>
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          background: 'rgba(0,0,0,0.8)',
          color: '#fff',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          5:42
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px', lineHeight: '1.3' }}>
          {content.substring(0, 80)}...
        </Text>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Avatar 
            size={24} 
            style={{ 
              background: marketingColors.gradient,
              marginRight: '8px'
            }}
          >
            AI
          </Avatar>
          <Text type="secondary" style={{ fontSize: '14px' }}>AI Marketing Pro</Text>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            <EyeOutlined style={{ marginRight: '4px' }} />
            12.5K views
          </Text>
          <Text type="secondary" style={{ fontSize: '14px' }}>2 days ago</Text>
        </div>
        
        <Text type="secondary" style={{ fontSize: '13px', marginTop: '8px', display: 'block' }}>
          {hashtags}
        </Text>
      </div>
    </Card>
  );

  const PinterestPreview = () => (
    <Card 
      className="hover-lift"
      style={{ 
        maxWidth: '300px', 
        margin: '0 auto',
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #e1e8ed',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative' }}>
        <img 
          src={imageUrl}
          alt="Pin"
          style={{ 
            width: '100%', 
            height: '400px', 
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: '#e60023',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '24px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Save
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px', lineHeight: '1.2' }}>
          {content.substring(0, 60)}...
        </Text>
        
        <Text type="secondary" style={{ fontSize: '14px', marginBottom: '12px', display: 'block' }}>
          {content.substring(60, 120)}...
        </Text>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            size={24} 
            style={{ 
              background: marketingColors.gradient,
              marginRight: '8px'
            }}
          >
            AI
          </Avatar>
          <Text type="secondary" style={{ fontSize: '14px' }}>AI Marketing</Text>
        </div>
        
        <Text type="secondary" style={{ fontSize: '13px', marginTop: '8px', display: 'block' }}>
          {hashtags}
        </Text>
      </div>
    </Card>
  );

  const tabItems = [
    {
      key: 'instagram',
      label: (
        <InstagramOutlined style={{ 
          fontSize: '32px', 
          color: activeTab === 'instagram' ? '#E4405F' : '#999',
          transition: 'all 0.3s ease'
        }} />
      ),
      children: <InstagramPreview />,
    },
    {
      key: 'facebook',
      label: (
        <FacebookFilled style={{ 
          fontSize: '32px', 
          color: activeTab === 'facebook' ? '#1877f2' : '#999',
          transition: 'all 0.3s ease'
        }} />
      ),
      children: <FacebookPreview />,
    },
    {
      key: 'twitter',
      label: (
        <TwitterOutlined style={{ 
          fontSize: '32px', 
          color: activeTab === 'twitter' ? '#1da1f2' : '#999',
          transition: 'all 0.3s ease'
        }} />
      ),
      children: <TwitterPreview />,
    },
    {
      key: 'linkedin',
      label: (
        <LinkedinFilled style={{ 
          fontSize: '32px', 
          color: activeTab === 'linkedin' ? '#0077b5' : '#999',
          transition: 'all 0.3s ease'
        }} />
      ),
      children: <LinkedInPreview />,
    },
    {
      key: 'tiktok',
      label: (
        <TikTokOutlined style={{ 
          fontSize: '32px', 
          color: activeTab === 'tiktok' ? '#000000' : '#999',
          transition: 'all 0.3s ease'
        }} />
      ),
      children: <TikTokPreview />,
    },
    {
      key: 'youtube',
      label: (
        <YoutubeFilled style={{ 
          fontSize: '32px', 
          color: activeTab === 'youtube' ? '#ff0000' : '#999',
          transition: 'all 0.3s ease'
        }} />
      ),
      children: <YouTubePreview />,
    },
    {
      key: 'pinterest',
      label: (
        <PinterestFilled style={{ 
          fontSize: '32px', 
          color: activeTab === 'pinterest' ? '#e60023' : '#999',
          transition: 'all 0.3s ease'
        }} />
      ),
      children: <PinterestPreview />,
    },
  ];

  return (
    <div className="fade-in" style={{ width: '100%' }}>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        centered
        size="small"
        className="social-preview-tabs"
        tabBarStyle={{
          marginBottom: '20px',
          borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
          paddingBottom: '12px',
          display: 'flex',
          gap: '4px',
        }}
        tabBarGutter={10}
      />
    </div>
  );
};

export default SocialPreview;
