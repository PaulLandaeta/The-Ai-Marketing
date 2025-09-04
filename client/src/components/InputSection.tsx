import React from 'react';
import { Typography, Input } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ value, onChange }) => {
  return (
    <div>
      <Title level={5} style={{ color: '#666', marginBottom: '12px' }}>
        INPUT
      </Title>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        prefix={<LinkOutlined />}
        style={{ borderRadius: '8px' }}
        placeholder="www.untitledui.com"
      />
    </div>
  );
};

export default InputSection;
