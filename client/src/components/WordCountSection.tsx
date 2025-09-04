import React from 'react';
import { Typography, Slider } from 'antd';
import { CalculatorOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface WordCountSectionProps {
  value: number;
  onChange: (value: number) => void;
}

const WordCountSection: React.FC<WordCountSectionProps> = ({ value, onChange }) => {
  return (
    <div>
      <Title level={5} style={{ color: '#666', marginBottom: '12px' }}>
        <CalculatorOutlined style={{ marginRight: '8px' }} />
        Word Count
      </Title>
      <div style={{ marginBottom: '8px' }}>
        <Text style={{ color: '#666', fontSize: '13px' }}>
          <ThunderboltOutlined style={{ marginRight: '4px' }} />
          Approx. Words
        </Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Text style={{ minWidth: '20px', fontSize: '13px' }}>50</Text>
        <Slider
          min={50}
          max={500}
          value={value}
          onChange={onChange}
          style={{ flex: 1 }}
          trackStyle={{ background: '#ff4d4f' }}
          handleStyle={{ borderColor: '#ff4d4f' }}
        />
        <Text style={{ minWidth: '30px', fontSize: '13px' }}>500</Text>
      </div>
      <Text style={{ fontSize: '12px', color: '#999' }}>
        Current: {value} words
      </Text>
    </div>
  );
};

export default WordCountSection;
