import React from 'react';
import { Typography, Input, Select, Space, Row, Col, Card } from 'antd';
import { MessageOutlined, GlobalOutlined, AimOutlined, BulbOutlined, InstagramOutlined, LinkedinFilled, FacebookFilled, TikTokOutlined, TeamOutlined, DollarOutlined, TrophyOutlined } from '@ant-design/icons';
import { useAppStore } from '../../stores/appStore';

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

export const BriefForm: React.FC = () => {
  const { briefForm, updateBriefForm } = useAppStore();

  return (
    <div style={{ padding: '0 4px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card
          style={{
            borderRadius: '16px',
            border: '1px solid #e8e8f0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            background: '#ffffff'
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
            <MessageOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
            DESCRIPCIÓN DEL BRIEF
          </Title>
          <TextArea
            value={briefForm.prompt}
            onChange={(e) => updateBriefForm({ prompt: e.target.value })}
            placeholder="Describe el objetivo de tu campaña de marketing, el producto o servicio, y el mensaje que quieres transmitir..."
            rows={4}
            showCount
            maxLength={1000}
            style={{ 
              borderRadius: '12px',
              border: '1px solid #e8e8f0',
              fontSize: '14px'
            }}
          />
          <Text style={{ 
            fontSize: '12px', 
            color: '#999', 
            marginTop: '8px', 
            display: 'block' 
          }}>
            Sé específico sobre tu marca, objetivos y audiencia objetivo
          </Text>
        </Card>

        <Card
          style={{
            borderRadius: '16px',
            border: '1px solid #e8e8f0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            background: '#ffffff'
          }}
          bodyStyle={{ padding: '24px' }}
        >
          <Row gutter={24}>
            <Col span={12}>
              <div>
                <Title level={5} style={{ 
                  color: '#666', 
                  marginBottom: '16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  <GlobalOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
                  PLATAFORMA PRINCIPAL
                </Title>
                <Select
                  value={briefForm.platform}
                  onChange={(value) => updateBriefForm({ platform: value })}
                  placeholder="Selecciona la plataforma"
                  size="large"
                  style={{ 
                    width: '100%', 
                    borderRadius: '12px'
                  }}
                >
                  <Option value="Instagram"><InstagramOutlined style={{ marginRight: '8px' }} />Instagram</Option>
                  <Option value="LinkedIn"><LinkedinFilled style={{ marginRight: '8px' }} />LinkedIn</Option>
                  <Option value="Facebook"><FacebookFilled style={{ marginRight: '8px' }} />Facebook</Option>
                  <Option value="TikTok"><TikTokOutlined style={{ marginRight: '8px' }} />TikTok</Option>
                </Select>
              </div>
            </Col>

            <Col span={12}>
              <div>
                <Title level={5} style={{ 
                  color: '#666', 
                  marginBottom: '16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  <AimOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
                  OBJETIVO DE CAMPAÑA
                </Title>
                <Select
                  value={briefForm.objective}
                  onChange={(value) => updateBriefForm({ objective: value })}
                  placeholder="Selecciona el objetivo"
                  size="large"
                  style={{ 
                    width: '100%', 
                    borderRadius: '12px'
                  }}
                >
                  <Option value="Awareness"><AimOutlined style={{ marginRight: '8px' }} />Conocimiento de Marca</Option>
                  <Option value="Engagement"><TeamOutlined style={{ marginRight: '8px' }} />Engagement/Interacción</Option>
                  <Option value="Conversion"><DollarOutlined style={{ marginRight: '8px' }} />Conversión/Ventas</Option>
                  <Option value="LeadGen"><TrophyOutlined style={{ marginRight: '8px' }} />Generación de Leads</Option>
                </Select>
              </div>
            </Col>
          </Row>
        </Card>

        <Card
          style={{
            borderRadius: '16px',
            border: '1px solid #e8e8f0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            background: '#ffffff'
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
            <BulbOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
            GUÍAS DE MARCA (OPCIONAL)
          </Title>
          <TextArea
            value={briefForm.brand_cues}
            onChange={(e) => updateBriefForm({ brand_cues: e.target.value })}
            placeholder="Describe el tono de tu marca, valores, personalidad, colores, estilo de comunicación..."
            rows={3}
            showCount
            maxLength={500}
            style={{ 
              borderRadius: '12px',
              border: '1px solid #e8e8f0',
              fontSize: '14px'
            }}
          />
          <Text style={{ 
            fontSize: '12px', 
            color: '#999', 
            marginTop: '8px', 
            display: 'block' 
          }}>
            Ejemplo: "Marca joven y disruptiva, tono casual pero profesional, colores vibrantes"
          </Text>
        </Card>
      </Space>
    </div>
  );
};
