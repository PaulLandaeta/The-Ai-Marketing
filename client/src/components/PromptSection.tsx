import React from 'react';
import { Typography, Input } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

interface PromptSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const PromptSection: React.FC<PromptSectionProps> = ({ value, onChange }) => {
  return (
    <div>
      <Title level={5} style={{ color: '#666', marginBottom: '12px' }}>
        PROMPT
      </Title>
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write a compelling social media post starting with an engaging hook or question that grabs attention. Follow with a concise and clear explanation of the core message. Ensure the tone is inviting, suitable for a professional audience. Include relevant and trending hashtags"
        rows={4}
        style={{ borderRadius: '8px' }}
      />
    </div>
  );
};

export default PromptSection;
