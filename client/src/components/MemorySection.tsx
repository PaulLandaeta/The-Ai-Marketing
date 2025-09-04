import React from 'react';
import { Typography, Upload } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const MemorySection: React.FC = () => {
  return (
    <div>
      <Title level={5} style={{ color: '#666', marginBottom: '12px' }}>
        MEMORY
      </Title>
      <Upload.Dragger
        style={{ 
          borderRadius: '8px',
          borderStyle: 'dashed',
          borderColor: '#d9d9d9',
          background: '#fafafa'
        }}
      >
        <p className="ant-upload-drag-icon">
          <CloudUploadOutlined style={{ fontSize: '24px', color: '#999' }} />
        </p>
        <p style={{ color: '#999', margin: 0 }}>Click or drag a file to upload</p>
      </Upload.Dragger>
    </div>
  );
};

export default MemorySection;
