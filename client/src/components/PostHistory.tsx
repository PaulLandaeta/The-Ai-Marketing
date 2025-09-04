import React from 'react';
import { Card, List, Typography, Button, Space, Tag, Avatar } from 'antd';
import { DeleteOutlined, EyeOutlined, CopyOutlined } from '@ant-design/icons';
import { usePostHistory, useAppStore } from '../stores';
import { marketingColors } from '../styles/theme';
import type { GeneratedPost } from '../api/types';

const { Text, Paragraph } = Typography;

const PostHistory: React.FC = () => {
  const postHistory = usePostHistory();
  const { removeFromHistory, clearHistory, setGeneratedContent } = useAppStore();

  const handleViewPost = (post: GeneratedPost) => {
    setGeneratedContent(post);
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (postHistory.length === 0) {
    return (
      <Card
        title="📚 Post History"
        style={{
          background: marketingColors.cardGradient,
          border: '1px solid rgba(99, 102, 241, 0.1)',
          borderRadius: '16px',
        }}
      >
        <div style={{
          textAlign: 'center',
          padding: '20px',
          color: '#64748b'
        }}>
          <Text type="secondary">
            No posts generated yet. Create your first AI-powered post!
          </Text>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="📚 Post History"
      extra={
        <Button 
          type="text" 
          size="small" 
          onClick={clearHistory}
          style={{ color: '#64748b' }}
        >
          Clear All
        </Button>
      }
      style={{
        background: marketingColors.cardGradient,
        border: '1px solid rgba(99, 102, 241, 0.1)',
        borderRadius: '16px',
        maxHeight: '400px',
        overflow: 'hidden'
      }}
      bodyStyle={{ 
        padding: '12px',
        maxHeight: '320px',
        overflowY: 'auto'
      }}
    >
      <List
        itemLayout="vertical"
        size="small"
        dataSource={postHistory}
        renderItem={(post, index) => (
          <List.Item
            key={post.id}
            style={{
              padding: '12px',
              border: '1px solid rgba(99, 102, 241, 0.1)',
              borderRadius: '8px',
              marginBottom: '8px',
              background: '#ffffff',
            }}
            actions={[
              <Button
                key="view"
                type="text"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => handleViewPost(post)}
                style={{ color: marketingColors.primary }}
              >
                View
              </Button>,
              <Button
                key="copy"
                type="text"
                size="small"
                icon={<CopyOutlined />}
                onClick={() => handleCopyContent(post.content)}
                style={{ color: marketingColors.accent }}
              >
                Copy
              </Button>,
              <Button
                key="delete"
                type="text"
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => removeFromHistory(post.id)}
                style={{ color: '#ef4444' }}
              >
                Delete
              </Button>
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    background: `linear-gradient(135deg, ${marketingColors.primary}, ${marketingColors.secondary})`,
                    color: 'white',
                    fontSize: '12px'
                  }}
                >
                  {index + 1}
                </Avatar>
              }
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Text strong style={{ fontSize: '12px' }}>
                    Post #{index + 1}
                  </Text>
                  <Tag color="blue" style={{ fontSize: '10px', margin: 0 }}>
                    {post.word_count} words
                  </Tag>
                </div>
              }
              description={
                <Paragraph
                  style={{
                    fontSize: '11px',
                    lineHeight: '1.4',
                    margin: 0,
                    color: '#64748b'
                  }}
                >
                  {truncateText(post.content)}
                </Paragraph>
              }
            />
            
            <div style={{ marginTop: '8px' }}>
              <Space size="small">
                <Tag color="green" style={{ fontSize: '10px', margin: 0 }}>
                  {post.engagement_score}% engagement
                </Tag>
                <Tag color="orange" style={{ fontSize: '10px', margin: 0 }}>
                  {(post.estimated_reach / 1000).toFixed(1)}K reach
                </Tag>
              </Space>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default PostHistory;
