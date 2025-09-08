import React from 'react';
import { Typography, Card, Row, Col, Space, Tag } from 'antd';
import { 
  DollarOutlined, 
  ClockCircleOutlined, 
  ApiOutlined,
  NumberOutlined,
  FileTextOutlined,
  PictureOutlined
} from '@ant-design/icons';
import { marketingColors } from '../../styles/theme';

const { Text, Title } = Typography;

interface UsageMetrics {
  model: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  llm_usd: number;
  image_usd: number;
  total_usd: number;
}

interface MetricsDisplayProps {
  usage: UsageMetrics;
  processingTime?: number;
  imagesCount?: number;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ 
  usage, 
  processingTime, 
  imagesCount = 0 
}) => {
  const formatCost = (usd: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4
    }).format(usd);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <Card
      size="small"
      style={{
        background: 'rgba(99, 102, 241, 0.02)',
        border: '1px solid rgba(99, 102, 241, 0.1)',
        borderRadius: '12px',
        marginTop: '16px'
      }}
    >
      <div style={{ marginBottom: '12px' }}>
        <Title level={5} style={{ 
          margin: 0,
          color: marketingColors.primary,
          fontSize: '14px'
        }}>
          <ApiOutlined style={{ marginRight: '6px' }} />
          Generation Metrics
        </Title>
      </div>

      <Row gutter={[12, 8]}>
        <Col span={12}>
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                <NumberOutlined style={{ marginRight: '4px' }} />
                Prompt Tokens
              </Text>
              <Text strong style={{ fontSize: '12px' }}>
                {formatNumber(usage.prompt_tokens)}
              </Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                <FileTextOutlined style={{ marginRight: '4px' }} />
                Completion
              </Text>
              <Text strong style={{ fontSize: '12px' }}>
                {formatNumber(usage.completion_tokens)}
              </Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                <PictureOutlined style={{ marginRight: '4px' }} />
                Images
              </Text>
              <Text strong style={{ fontSize: '12px' }}>
                {imagesCount}
              </Text>
            </div>
          </Space>
        </Col>
        
        <Col span={12}>
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                LLM Cost
              </Text>
              <Text strong style={{ fontSize: '12px', color: marketingColors.success }}>
                {formatCost(usage.llm_usd)}
              </Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Images Cost
              </Text>
              <Text strong style={{ fontSize: '12px', color: marketingColors.success }}>
                {formatCost(usage.image_usd)}
              </Text>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              paddingTop: '4px',
              borderTop: '1px solid rgba(99, 102, 241, 0.1)'
            }}>
              <Text strong style={{ fontSize: '12px' }}>
                <DollarOutlined style={{ marginRight: '4px' }} />
                Total Cost
              </Text>
              <Text strong style={{ 
                fontSize: '12px', 
                color: marketingColors.primary,
                fontWeight: 'bold' 
              }}>
                {formatCost(usage.total_usd)}
              </Text>
            </div>
          </Space>
        </Col>
      </Row>

      <div style={{ 
        marginTop: '12px', 
        paddingTop: '8px', 
        borderTop: '1px solid rgba(99, 102, 241, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Space size={8}>
          <Tag color="blue" style={{ fontSize: '11px', margin: 0 }}>
            {usage.model}
          </Tag>
          {processingTime && (
            <Tag color="green" style={{ fontSize: '11px', margin: 0 }}>
              <ClockCircleOutlined style={{ marginRight: '2px' }} />
              {(processingTime / 1000).toFixed(1)}s
            </Tag>
          )}
        </Space>
        <Text type="secondary" style={{ fontSize: '11px' }}>
          Total: {formatNumber(usage.total_tokens)} tokens
        </Text>
      </div>
    </Card>
  );
};

export default MetricsDisplay;
