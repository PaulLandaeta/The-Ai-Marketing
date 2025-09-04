import React from 'react';
import { Typography, Slider } from 'antd';

const { Text } = Typography;

interface PersonalitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const PersonalitySlider: React.FC<PersonalitySliderProps> = ({ value, onChange }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <Text style={{ color: '#666' }}>INTROVERT</Text>
        <Text style={{ color: '#666' }}>EXTROVERT</Text>
      </div>
      <Slider
        value={value}
        onChange={onChange}
        style={{ margin: '0' }}
        trackStyle={{ background: '#8B7CF6' }}
        handleStyle={{ borderColor: '#8B7CF6' }}
      />
    </div>
  );
};

export default PersonalitySlider;
