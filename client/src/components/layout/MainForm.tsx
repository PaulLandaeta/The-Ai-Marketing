import React from 'react';
import { Typography, Button, Space, message } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { useAppStore } from '../../stores/appStore';
import { FormModeSelector } from '../shared/FormModeSelector';
import { BriefForm } from '../brief/BriefForm';
import { PostForm } from '../post/PostForm';

const { Title } = Typography;

const MainForm: React.FC = () => {
  const { formMode, isGenerating, generatePost, generateBrief } = useAppStore();

  const handleGenerate = async () => {
    const state = useAppStore.getState();
    const currentPrompt = formMode === 'brief' ? state.briefForm.prompt : state.postForm.prompt;
    
    if (!currentPrompt.trim()) {
      message.error('Por favor ingresa una descripción para generar contenido');
      return;
    }

    try {
      if (formMode === 'brief') {
        await generateBrief();
      } else {
        await generatePost();
      }
      message.success('¡Contenido generado exitosamente!');
    } catch (error) {
      message.error(
        error instanceof Error 
          ? `Error al generar contenido: ${error.message}`
          : 'Ocurrió un error inesperado'
      );
    }
  };

  const isFormValid = () => {
    const state = useAppStore.getState();
    if (formMode === 'brief') {
      return state.briefForm.prompt.trim().length > 0;
    } else {
      return state.postForm.prompt.trim().length > 0;
    }
  };

  return (
    <div className="fade-in" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px',
        padding: '16px 0'
      }}>
        <Title 
          level={2} 
          className="gradient-text"
          style={{ 
            margin: 0,
            fontSize: '28px',
            fontWeight: 'bold'
          }}
        >
          <RocketOutlined style={{ marginRight: '8px' }} />
          Create Magic
        </Title>
        <Button 
          type="primary" 
          size="large" 
          loading={isGenerating}
          onClick={handleGenerate}
          disabled={!isFormValid()}
          className={`hover-lift ${isGenerating ? 'pulse' : ''}`}
          style={{ 
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            border: 'none',
            borderRadius: '5px',
            padding: '0 32px',
            height: '48px',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
          }}
          icon={<RocketOutlined />}
        >
          {isGenerating 
            ? `Generando ${formMode === 'brief' ? 'Brief' : 'Post'}...` 
            : `Generar ${formMode === 'brief' ? 'Brief' : 'Post'}`
          }
        </Button>
      </div>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="slide-up" style={{ animationDelay: '0.1s' }}>
          <FormModeSelector />
        </div>
        
        <div className="slide-up" style={{ animationDelay: '0.2s' }}>
          {formMode === 'brief' ? <BriefForm /> : <PostForm />}
        </div>
      </Space>
    </div>
  );
};

export default MainForm;
