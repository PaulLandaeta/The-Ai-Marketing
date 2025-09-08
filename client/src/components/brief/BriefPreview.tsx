import React from 'react';
import { Typography, Tag, Space, Image, Button } from 'antd';
import { FileTextOutlined, BulbOutlined, PictureOutlined, ShareAltOutlined, BarChartOutlined } from '@ant-design/icons';
import type { BriefData } from '../../api/types';

const { Title, Text, Paragraph } = Typography;

interface BriefPreviewProps {
  briefData: BriefData;
}

export const BriefPreview: React.FC<BriefPreviewProps> = ({ briefData }) => {
  return (
    <div className="fade-in">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div 
          style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileTextOutlined style={{ fontSize: '24px', color: 'white' }} />
            <div>
              <Title level={4} style={{ color: 'white', margin: 0 }}>
                Brief Estratégico
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
                {briefData.post_type} • ID: {briefData.run_id?.substring(0, 8)}
              </Text>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Title level={5} style={{ color: '#666', marginBottom: '8px' }}>
            <BulbOutlined style={{ marginRight: '8px' }} />
            MENSAJE CENTRAL
          </Title>
          <Paragraph style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
            {briefData.core_text}
          </Paragraph>
          
          <div style={{ marginBottom: '12px' }}>
            <Text strong style={{ fontSize: '12px', color: '#666' }}>
              Caption Sugerido:
            </Text>
            <Paragraph style={{ fontStyle: 'italic', color: '#666', fontSize: '13px', margin: '4px 0' }}>
              "{briefData.caption}"
            </Paragraph>
          </div>

          <div>
            <Text strong style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>
              Hashtags:
            </Text>
            <Space wrap>
              {briefData.hashtags.slice(0, 6).map((hashtag, index) => (
                <Tag 
                  key={index} 
                  color="blue"
                  style={{ margin: '2px', fontSize: '11px' }}
                >
                  #{hashtag}
                </Tag>
              ))}
              {briefData.hashtags.length > 6 && (
                <Tag color="default" style={{ fontSize: '11px' }}>
                  +{briefData.hashtags.length - 6} más
                </Tag>
              )}
            </Space>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Title level={5} style={{ color: '#666', marginBottom: '8px' }}>
            <PictureOutlined style={{ marginRight: '8px' }} />
            CONCEPTO VISUAL
          </Title>
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <div style={{ flex: 1 }}>
              <Text strong style={{ fontSize: '12px' }}>Formato:</Text>
              <div><Tag color="purple" style={{ fontSize: '11px' }}>{briefData.visual_concept.format}</Tag></div>
            </div>
            <div style={{ flex: 1 }}>
              <Text strong style={{ fontSize: '12px' }}>Paleta:</Text>
              <div style={{ marginTop: '4px' }}>
                <Space>
                  {briefData.visual_concept.palette.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: color,
                        borderRadius: '3px',
                        border: '1px solid #ddd',
                      }}
                      title={color}
                    />
                  ))}
                </Space>
              </div>
            </div>
          </div>

          {briefData.visual_concept.image_url && (
            <Image
              src={briefData.visual_concept.image_url}
              alt="Visual concept"
              style={{ 
                borderRadius: '6px',
                width: '100%',
                maxHeight: '150px',
                objectFit: 'cover'
              }}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
            />
          )}
        </div>

        {briefData.facts && briefData.facts.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <Title level={5} style={{ color: '#666', marginBottom: '8px' }}>
              <BarChartOutlined style={{ marginRight: '8px' }} />
              DATOS CLAVE
            </Title>
            <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
              {briefData.facts.slice(0, 3).map((fact, index) => (
                <div key={index} style={{ 
                  padding: '8px', 
                  marginBottom: '4px',
                  background: '#f8f9fa',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  <Text strong style={{ fontSize: '11px' }}>{fact.source}:</Text>
                  <div style={{ marginTop: '2px' }}>{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', paddingTop: '8px' }}>
          <Button 
            type="text" 
            icon={<ShareAltOutlined />}
            size="small"
            style={{ color: '#52c41a', flex: 1 }}
          >
            Exportar
          </Button>
          <Button 
            type="text"
            icon={<PictureOutlined />}
            size="small"
            style={{ color: '#1890ff', flex: 1 }}
          >
            Generar Post
          </Button>
        </div>
      </Space>
    </div>
  );
};
