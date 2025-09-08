import React, { useState } from 'react';
import { Typography, Input, Select, InputNumber, Switch, Space, Row, Col, Slider, Card } from 'antd';
import { MessageOutlined, CalculatorOutlined, PictureOutlined, SettingOutlined, TagsOutlined, BookOutlined, FileTextOutlined, FireOutlined, BarChartOutlined, RocketOutlined, BulbOutlined, SmileOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useAppStore } from '../../stores/appStore';

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

export const PostForm: React.FC = () => {
  const { postForm, updatePostForm } = useAppStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

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
            <FileTextOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
            DESCRIPCIÓN DEL POST
          </Title>
          
          <TextArea
            value={postForm.prompt}
            onChange={(e) => updatePostForm({ prompt: e.target.value })}
            placeholder="Describe el contenido que quieres generar..."
            rows={4}
            size="large"
            style={{ 
              borderRadius: '12px',
              border: '1px solid #e8e8f0',
              fontSize: '14px'
            }}
          />
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
            <SettingOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
            CONFIGURACIÓN BÁSICA
          </Title>
          
          <Row gutter={24}>
            <Col span={8}>
              <Title level={5} style={{ 
                color: '#666', 
                marginBottom: '16px',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                AUDIENCIA
              </Title>
              <Input
                value={postForm.audience}
                onChange={(e) => updatePostForm({ audience: e.target.value })}
                placeholder="Ej: Emprendedores digitales"
                size="large"
                style={{ 
                  borderRadius: '12px',
                  border: '1px solid #e8e8f0',
                  fontSize: '14px'
                }}
              />
            </Col>

            <Col span={8}>
              <Title level={5} style={{ 
                color: '#666', 
                marginBottom: '16px',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                PLANTILLA
              </Title>
              <Select
                value={postForm.template}
                onChange={(value) => updatePostForm({ template: value })}
                size="large"
                style={{ 
                  width: '100%',
                  borderRadius: '12px'
                }}
              >
                <Option value="casual"><SmileOutlined style={{ marginRight: '8px' }} />Casual</Option>
                <Option value="professional"><BookOutlined style={{ marginRight: '8px' }} />Profesional</Option>
                <Option value="storytelling"><MessageOutlined style={{ marginRight: '8px' }} />Historia</Option>
                <Option value="technical"><CalculatorOutlined style={{ marginRight: '8px' }} />Técnico</Option>
                <Option value="contrarian"><FireOutlined style={{ marginRight: '8px' }} />Contrario</Option>
                <Option value="case-study"><BarChartOutlined style={{ marginRight: '8px' }} />Caso de Estudio</Option>
                <Option value="announcement"><RocketOutlined style={{ marginRight: '8px' }} />Anuncio</Option>
              </Select>
            </Col>

            <Col span={8}>
              <Title level={5} style={{ 
                color: '#666', 
                marginBottom: '16px',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                TONO
              </Title>
              <Select
                value={postForm.tone}
                onChange={(value) => updatePostForm({ tone: value })}
                size="large"
                style={{ 
                  width: '100%',
                  borderRadius: '12px'
                }}
              >
                <Option value="enthusiastic"><RocketOutlined style={{ marginRight: '8px' }} />Entusiasta</Option>
                <Option value="professional"><BookOutlined style={{ marginRight: '8px' }} />Profesional</Option>
                <Option value="friendly"><SmileOutlined style={{ marginRight: '8px' }} />Amigable</Option>
                <Option value="humble"><BulbOutlined style={{ marginRight: '8px' }} />Humilde</Option>
                <Option value="confident"><FireOutlined style={{ marginRight: '8px' }} />Confiado</Option>
                <Option value="technical"><CalculatorOutlined style={{ marginRight: '8px' }} />Técnico</Option>
                <Option value="celebratory"><RocketOutlined style={{ marginRight: '8px' }} />Celebratorio</Option>
              </Select>
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
            <BarChartOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
            MÉTRICAS Y OPCIONES
          </Title>
          
          <Row gutter={24}>
            <Col span={12}>
              <Title level={5} style={{ 
                color: '#666', 
                marginBottom: '12px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                <CalculatorOutlined style={{ marginRight: '8px' }} />
                CONTADOR DE PALABRAS
              </Title>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text style={{ minWidth: '20px', fontSize: '13px' }}>50</Text>
                <Slider
                  value={postForm.word_count}
                  onChange={(value) => updatePostForm({ word_count: value })}
                  min={50}
                  max={500}
                  style={{ flex: 1 }}
                  trackStyle={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)' }}
                  handleStyle={{ 
                    borderColor: '#8B5CF6',
                    backgroundColor: '#8B5CF6',
                    boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                  }}
                />
                <Text style={{ minWidth: '30px', fontSize: '13px' }}>500</Text>
              </div>
              
              <Text style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
                Actual: {postForm.word_count} palabras
              </Text>
            </Col>

            <Col span={12}>
              <Title level={5} style={{ 
                color: '#666', 
                marginBottom: '16px',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                VARIACIONES
              </Title>
              <InputNumber
                value={postForm.variations}
                onChange={(value) => updatePostForm({ variations: value || 1 })}
                min={1}
                max={5}
                size="large"
                style={{ 
                  width: '100%',
                  borderRadius: '12px',
                  border: '1px solid #e8e8f0'
                }}
              />
            </Col>
          </Row>

          <Row gutter={24} style={{ marginTop: '24px' }}>
            <Col span={12}>
              <Space>
                <Switch
                  checked={postForm.generate_hashtags}
                  onChange={(checked) => updatePostForm({ generate_hashtags: checked })}
                  style={{ backgroundColor: postForm.generate_hashtags ? '#8b5cf6' : undefined }}
                />
                <Text style={{ fontSize: '14px', color: '#333' }}>
                  <TagsOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
                  Generar Hashtags
                </Text>
              </Space>
            </Col>

            <Col span={12}>
              <Space>
                <Switch
                  checked={postForm.include_emojis}
                  onChange={(checked) => updatePostForm({ include_emojis: checked })}
                  style={{ backgroundColor: postForm.include_emojis ? '#8b5cf6' : undefined }}
                />
                <Text style={{ fontSize: '14px', color: '#333' }}>
                  <SmileOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
                  Incluir Emojis
                </Text>
              </Space>
            </Col>
          </Row>
        </Card>

        <Card
          style={{
            borderRadius: '16px',
            border: '1px solid #e8e8f0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            background: '#ffffff',
            cursor: 'pointer'
          }}
          bodyStyle={{ padding: '16px 24px' }}
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space>
              <SettingOutlined style={{ color: '#8b5cf6', fontSize: '16px' }} />
              <Text style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                color: '#333'
              }}>
                Configuración Avanzada
              </Text>
            </Space>
            {showAdvanced ? 
              <UpOutlined style={{ color: '#8b5cf6' }} /> : 
              <DownOutlined style={{ color: '#8b5cf6' }} />
            }
          </Space>
        </Card>

        {showAdvanced && (
          <>
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
                TEMA ESPECÍFICO (OPCIONAL)
              </Title>
              
              <Input
                value={postForm.topic || ''}
                onChange={(e) => updatePostForm({ topic: e.target.value || undefined })}
                placeholder="Ej: Inteligencia Artificial en Marketing"
                size="large"
                style={{ 
                  borderRadius: '12px',
                  border: '1px solid #e8e8f0',
                  fontSize: '14px'
                }}
              />
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
                <TagsOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
                IDIOMA Y HASHTAGS SEMILLA
              </Title>
              
              <Row gutter={24}>
                <Col span={12}>
                  <Title level={5} style={{ 
                    color: '#666', 
                    marginBottom: '16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    IDIOMA
                  </Title>
                  <Select
                    value={postForm.language}
                    onChange={(value) => updatePostForm({ language: value })}
                    size="large"
                    style={{ 
                      width: '100%',
                      borderRadius: '12px'
                    }}
                  >
                    <Option value="es">🇪🇸 Español</Option>
                    <Option value="en">🇺🇸 Inglés</Option>
                    <Option value="fr">🇫🇷 Francés</Option>
                    <Option value="de">🇩🇪 Alemán</Option>
                    <Option value="pt">🇧🇷 Portugués</Option>
                  </Select>
                </Col>

                <Col span={12}>
                  <Title level={5} style={{ 
                    color: '#666', 
                    marginBottom: '16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    HASHTAGS SEMILLA
                  </Title>
                  <Input
                    value={postForm.seed_hashtags.join(', ')}
                    onChange={(e) => {
                      const hashtags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
                      updatePostForm({ seed_hashtags: hashtags });
                    }}
                    placeholder="Ej: #marketing, #ia, #tecnología"
                    size="large"
                    style={{ 
                      borderRadius: '12px',
                      border: '1px solid #e8e8f0',
                      fontSize: '14px'
                    }}
                  />
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
                <PictureOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
                CONFIGURACIÓN DE IMAGEN
              </Title>
              
              <Row gutter={24}>
                <Col span={6}>
                  <Title level={5} style={{ 
                    color: '#666', 
                    marginBottom: '16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    CANTIDAD
                  </Title>
                  <InputNumber
                    value={postForm.n_images}
                    onChange={(value) => updatePostForm({ n_images: value || 1 })}
                    min={0}
                    max={4}
                    size="large"
                    style={{ 
                      width: '100%',
                      borderRadius: '12px',
                      border: '1px solid #e8e8f0'
                    }}
                  />
                </Col>

                <Col span={6}>
                  <Title level={5} style={{ 
                    color: '#666', 
                    marginBottom: '16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    ESTILO
                  </Title>
                  <Select
                    value={postForm.image_style}
                    onChange={(value) => updatePostForm({ image_style: value })}
                    size="large"
                    style={{ 
                      width: '100%',
                      borderRadius: '12px'
                    }}
                  >
                    <Option value="minimal-ui">Minimal UI</Option>
                    <Option value="isometric">Isométrico</Option>
                    <Option value="data-viz">Data Viz</Option>
                    <Option value="abstract">Abstracto</Option>
                    <Option value="diagram">Diagrama</Option>
                  </Select>
                </Col>

                <Col span={6}>
                  <Title level={5} style={{ 
                    color: '#666', 
                    marginBottom: '16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    PALETA
                  </Title>
                  <Select
                    value={postForm.image_palette}
                    onChange={(value) => updatePostForm({ image_palette: value })}
                    size="large"
                    style={{ 
                      width: '100%',
                      borderRadius: '12px'
                    }}
                  >
                    <Option value="blue/green">Azul/Verde</Option>
                    <Option value="warm">Cálida</Option>
                    <Option value="cool">Fría</Option>
                    <Option value="monochrome">Monocromática</Option>
                    <Option value="vibrant">Vibrante</Option>
                  </Select>
                </Col>

                <Col span={6}>
                  <Title level={5} style={{ 
                    color: '#666', 
                    marginBottom: '16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    TAMAÑO
                  </Title>
                  <Select
                    value={postForm.image_size}
                    onChange={(value) => updatePostForm({ image_size: value })}
                    size="large"
                    style={{ 
                      width: '100%',
                      borderRadius: '12px'
                    }}
                  >
                    <Option value="256x256">256x256</Option>
                    <Option value="512x512">512x512</Option>
                    <Option value="1024x1024">1024x1024</Option>
                  </Select>
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
                <SettingOutlined style={{ marginRight: '8px', color: '#8b5cf6' }} />
                REGLAS DE MARCA
              </Title>
              
              <Row gutter={24}>
                <Col span={8}>
                  <Title level={5} style={{ 
                    color: '#666', 
                    marginBottom: '16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    FRASES PROHIBIDAS
                  </Title>
                  <Input
                    value={postForm.brand_rules.banned_phrases.join(', ')}
                    onChange={(e) => {
                      const phrases = e.target.value.split(',').map(phrase => phrase.trim()).filter(phrase => phrase.length > 0);
                      updatePostForm({ 
                        brand_rules: { 
                          ...postForm.brand_rules, 
                          banned_phrases: phrases 
                        } 
                      });
                    }}
                    placeholder="Ej: gratis, urgente, último día"
                    size="large"
                    style={{ 
                      borderRadius: '12px',
                      border: '1px solid #e8e8f0',
                      fontSize: '14px'
                    }}
                  />
                </Col>

                <Col span={8}>
                  <Title level={5} style={{ 
                    color: '#666', 
                    marginBottom: '16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    ESTILO DE CTA
                  </Title>
                  <Select
                    value={postForm.brand_rules.cta_style}
                    onChange={(value) => updatePostForm({ 
                      brand_rules: { 
                        ...postForm.brand_rules, 
                        cta_style: value 
                      } 
                    })}
                    size="large"
                    style={{ 
                      width: '100%',
                      borderRadius: '12px'
                    }}
                  >
                    <Option value="strong"><FireOutlined style={{ marginRight: '8px' }} />Fuerte</Option>
                    <Option value="neutral"><MessageOutlined style={{ marginRight: '8px' }} />Neutral</Option>
                    <Option value="subtle"><BulbOutlined style={{ marginRight: '8px' }} />Sutil</Option>
                  </Select>
                </Col>

                <Col span={8}>
                  <Title level={5} style={{ 
                    color: '#666', 
                    marginBottom: '16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    POLÍTICA DE ENLACES
                  </Title>
                  <Select
                    value={postForm.brand_rules.link_policy}
                    onChange={(value) => updatePostForm({ 
                      brand_rules: { 
                        ...postForm.brand_rules, 
                        link_policy: value 
                      } 
                    })}
                    size="large"
                    style={{ 
                      width: '100%',
                      borderRadius: '12px'
                    }}
                  >
                    <Option value="no_links">Sin enlaces</Option>
                    <Option value="allow_one">Permitir uno</Option>
                    <Option value="allow_many">Permitir varios</Option>
                  </Select>
                </Col>
              </Row>
            </Card>
          </>
        )}
      </Space>
    </div>
  );
};
