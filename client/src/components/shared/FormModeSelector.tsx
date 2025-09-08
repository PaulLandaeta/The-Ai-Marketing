import React from 'react';
import { Typography, Segmented, Card } from 'antd';
import { FileTextOutlined, EditOutlined } from '@ant-design/icons';
import { useAppStore } from '../../stores/appStore';

const { Title, Text } = Typography;

export const FormModeSelector: React.FC = () => {
  const { formMode, setFormMode } = useAppStore();

  const options = [
    {
      label: (
        <div style={{ padding: '8px 16px', textAlign: 'center' }}>
          <FileTextOutlined style={{ fontSize: '18px', display: 'block', marginBottom: '4px' }} />
          <span style={{ fontSize: '13px', fontWeight: '500' }}>Brief Estratégico</span>
        </div>
      ),
      value: 'brief',
    },
    {
      label: (
        <div style={{ padding: '8px 16px', textAlign: 'center' }}>
          <EditOutlined style={{ fontSize: '18px', display: 'block', marginBottom: '4px' }} />
          <span style={{ fontSize: '13px', fontWeight: '500' }}>Post Completo</span>
        </div>
      ),
      value: 'post',
    },
  ];

  return (
    <Card
      style={{
        borderRadius: '16px',
        border: '1px solid #e8e8f0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        background: '#ffffff',
        marginBottom: '24px'
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <Title level={5} style={{ 
        color: '#666', 
        marginBottom: '16px',
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '0.5px',
        textTransform: 'uppercase'
      }}>
        <FileTextOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
        TIPO DE GENERACIÓN
      </Title>
      <Segmented
        options={options}
        value={formMode}
        onChange={(value) => setFormMode(value as 'brief' | 'post')}
        size="large"
        style={{ 
          width: '100%',
          backgroundColor: '#f8f9fa',
          padding: '4px',
          borderRadius: '12px'
        }}
      />
      <Text 
        type="secondary" 
        style={{ 
          fontSize: '12px', 
          marginTop: '12px', 
          display: 'block',
          color: '#999'
        }}
      >
        {formMode === 'brief' 
          ? 'Genera un brief estratégico para planificar tu campaña de marketing'
          : 'Genera posts listos para publicar directamente en redes sociales'
        }
      </Text>
    </Card>
  );
};
