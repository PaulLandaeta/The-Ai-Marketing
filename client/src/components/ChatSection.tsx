import React from 'react';
import { Typography, Card, Avatar, Divider } from 'antd';

const { Title, Text } = Typography;

const ChatSection: React.FC = () => {
  return (
    <div>
      <Title level={5} style={{ color: '#666', marginBottom: '12px' }}>
        CHAT
      </Title>
      <Card style={{ borderRadius: '8px', background: '#fafafa' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Avatar size="small" style={{ marginRight: '8px' }}>U</Avatar>
            <Text strong>You</Text>
            <Text type="secondary" style={{ marginLeft: 'auto', fontSize: '12px' }}>
              Friday 2:20pm
            </Text>
          </div>
          <Text style={{ fontSize: '13px', lineHeight: '1.4' }}>
            Ensure the tone is friendly and inviting, suitable for a professional audience. Include relevant and trending hashtags to increase visibility. End with a clear and compelling call to action, encouraging the audience to engage, such as visiting a link, sharing, or commenting.
          </Text>
        </div>
        
        <Divider style={{ margin: '12px 0' }} />
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Avatar size="small" style={{ marginRight: '8px', background: '#8B7CF6' }}>AI</Avatar>
            <Text strong>AI Chatbot</Text>
            <Text type="secondary" style={{ marginLeft: 'auto', fontSize: '12px' }}>
              Friday 2:20pm
            </Text>
          </div>
          <Text style={{ fontSize: '13px', lineHeight: '1.4' }}>
            suitable for a professional audience. Include relevant and trending hashtags to increase visibility. End with a clear and compelling call to
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default ChatSection;
