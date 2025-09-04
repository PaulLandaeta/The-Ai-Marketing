import { Layout } from 'antd';
import { Sidebar, MainForm, ResultPanel } from './components';
import { marketingColors } from './styles/theme';
import { useUIState } from './stores';

const { Content } = Layout;

function App() {
  const { sidebarCollapsed } = useUIState();

  return (
    <Layout style={{ minHeight: '100vh', background: marketingColors.cardGradient }}>
      <Sidebar />

      <Layout style={{ marginLeft: sidebarCollapsed ? 80 : 240, transition: 'margin-left 0.2s' }}>
        <Content 
          className="fade-in"
          style={{ 
            padding: '32px', 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
            minHeight: '100vh' 
          }}
        >
          <div style={{ 
            display: 'flex', 
            gap: '32px', 
            height: '100%',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <MainForm />
            <ResultPanel />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
