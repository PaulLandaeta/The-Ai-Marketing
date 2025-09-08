import React, { useState } from 'react';
import { Typography, Card, Modal, Space, Button, Tooltip } from 'antd';
import { 
  CameraOutlined, 
  EyeOutlined, 
  DownloadOutlined,
  CopyOutlined,
  ExpandOutlined
} from '@ant-design/icons';
import { marketingColors } from '../../styles/theme';

const { Text } = Typography;

interface ImageGalleryProps {
  images: string[];
  title?: string;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  title = "Generated Images",
  className 
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handlePreview = (image: string) => {
    setPreviewImage(image);
    setPreviewVisible(true);
  };

  const handleCopyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const handleDownloadImage = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `generated-image-${index + 1}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={className} style={{ marginTop: '20px' }}>
      <Text strong style={{ 
        fontSize: '14px', 
        display: 'block', 
        marginBottom: '12px',
        background: marketingColors.primary,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        <CameraOutlined style={{ marginRight: '8px' }} />
        {title} ({images.length})
      </Text>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: images.length === 1 
          ? '1fr' 
          : images.length === 2 
          ? 'repeat(2, 1fr)'
          : 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '12px' 
      }}>
        {images.map((image, index) => (
          <Card
            key={index}
            hoverable
            className="hover-lift"
            style={{
              padding: 0,
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              background: '#fff'
            }}
            bodyStyle={{ padding: 0 }}
            cover={
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={image} 
                  alt={`Generated ${index + 1}`}
                  style={{
                    width: '100%',
                    height: images.length === 1 ? '200px' : '120px',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    cursor: 'pointer'
                  }}
                  className="image-overlay"
                  onClick={() => handlePreview(image)}
                >
                  <Space size="middle">
                    <Tooltip title="Ver imagen completa">
                      <Button 
                        type="text" 
                        icon={<EyeOutlined />} 
                        style={{ color: 'white' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreview(image);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Copiar URL">
                      <Button 
                        type="text" 
                        icon={<CopyOutlined />} 
                        style={{ color: 'white' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyImageUrl(image);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Descargar">
                      <Button 
                        type="text" 
                        icon={<DownloadOutlined />} 
                        style={{ color: 'white' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadImage(image, index);
                        }}
                      />
                    </Tooltip>
                  </Space>
                </div>
              </div>
            }
          >
            <div style={{ 
              padding: '8px 12px',
              background: 'rgba(99, 102, 241, 0.02)',
              borderTop: '1px solid rgba(99, 102, 241, 0.1)'
            }}>
              <Text 
                type="secondary" 
                style={{ fontSize: '11px', textAlign: 'center', display: 'block' }}
              >
                Image {index + 1}
              </Text>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={previewVisible}
        title={
          <span>
            <ExpandOutlined style={{ marginRight: '8px' }} />
            Image Preview
          </span>
        }
        footer={[
          <Button 
            key="copy" 
            icon={<CopyOutlined />}
            onClick={() => handleCopyImageUrl(previewImage)}
          >
            Copy URL
          </Button>,
          <Button 
            key="download" 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={() => {
              const index = images.indexOf(previewImage);
              handleDownloadImage(previewImage, index);
            }}
          >
            Download
          </Button>
        ]}
        onCancel={() => setPreviewVisible(false)}
        width="80%"
        style={{ maxWidth: '800px' }}
      >
        <div style={{ textAlign: 'center' }}>
          <img
            alt="Preview"
            style={{ 
              maxWidth: '100%', 
              maxHeight: '70vh',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
            src={previewImage}
          />
        </div>
      </Modal>

      <style dangerouslySetInnerHTML={{
        __html: `
          .image-overlay:hover {
            opacity: 1 !important;
          }
        `
      }} />
    </div>
  );
};

export default ImageGallery;
