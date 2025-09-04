import React from 'react';
import { Typography, Checkbox, Space } from 'antd';
import { TagsOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface HashtagsEmojiSectionProps {
  generateHashtags: boolean;
  includeEmojis: boolean;
  onHashtagsChange: (checked: boolean) => void;
  onEmojisChange: (checked: boolean) => void;
}

const HashtagsEmojiSection: React.FC<HashtagsEmojiSectionProps> = ({
  generateHashtags,
  includeEmojis,
  onHashtagsChange,
  onEmojisChange,
}) => {
  return (
    <div>
      <Title level={5} style={{ color: '#666', marginBottom: '12px' }}>
        <TagsOutlined style={{ marginRight: '8px' }} />
        Hashtags & Emojis
      </Title>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Checkbox
          checked={generateHashtags}
          onChange={(e) => onHashtagsChange(e.target.checked)}
          style={{ fontSize: '14px' }}
        >
          Generate Hashtags
        </Checkbox>
        <Checkbox
          checked={includeEmojis}
          onChange={(e) => onEmojisChange(e.target.checked)}
          style={{ fontSize: '14px' }}
        >
          Include Emojis 😍
        </Checkbox>
      </Space>
    </div>
  );
};

export default HashtagsEmojiSection;
