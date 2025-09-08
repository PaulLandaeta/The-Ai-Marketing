import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  DashboardOutlined,
  FolderOutlined,
  CheckOutlined,
  UserOutlined,
  BranchesOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { marketingColors } from '../../styles/theme';
import { useUIState, useAppStore } from '../../stores';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar: React.FC = () => {
  const { sidebarCollapsed } = useUIState();
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'spaces',
      icon: <FolderOutlined />,
      label: 'Spaces',
    },
    {
      key: 'just-do',
      icon: <CheckOutlined />,
      label: 'Just-do',
    },
    {
      key: 'agents',
      icon: <UserOutlined />,
      label: 'Agents',
    },
    {
      key: 'routes',
      icon: <BranchesOutlined />,
      label: 'Routes',
    },
    {
      key: 'rules',
      icon: <FileTextOutlined />,
      label: 'Rules',
    },
    {
      key: 'bundles',
      icon: <MenuUnfoldOutlined />,
      label: 'Bundles',
    },
  ];

  const bottomMenuItems = [
    {
      key: 'support',
      icon: <QuestionCircleOutlined />,
      label: 'Support',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  return (
    <Sider 
      collapsed={sidebarCollapsed}
      onCollapse={toggleSidebar}
      theme="light"
      width={240}
      className="fade-in"
      style={{ 
        borderRight: '1px solid #f0f0f0',
        background: marketingColors.cardGradient,
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        zIndex: 100,
        boxShadow: marketingColors.shadowSoft
      }}
    >
      <div 
        className="float"
        style={{ 
          padding: '20px 16px', 
          textAlign: 'center',
          borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
          marginBottom: '16px'
        }}
      >
        <Text 
          strong 
          className="gradient-text"
          style={{ 
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          <ThunderboltOutlined style={{ marginRight: '8px', fontSize: '20px' }} />
          AI Marketing
        </Text>
      </div>
      
      <Menu
        mode="inline"
        defaultSelectedKeys={['just-do']}
        items={menuItems}
        className="slide-up"
        style={{ 
          border: 'none',
          background: 'transparent',
          fontSize: '14px'
        }}
      />
      
      <div 
        className="slide-up"
        style={{ 
          position: 'absolute', 
          bottom: 0, 
          width: '100%',
          borderTop: '1px solid rgba(99, 102, 241, 0.1)',
          paddingTop: '8px'
        }}
      >
        <Menu
          mode="inline"
          items={bottomMenuItems}
          style={{ 
            border: 'none',
            background: 'transparent',
            fontSize: '14px'
          }}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
