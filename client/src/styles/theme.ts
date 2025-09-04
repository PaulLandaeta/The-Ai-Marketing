export const marketingColors = {
  primary: '#6366F1',
  secondary: '#EC4899', 
  accent: '#10B981',
  warning: '#F59E0B',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradientHover: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
  cardGradient: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  textGradient: 'linear-gradient(90deg, #6366F1 0%, #EC4899 100%)',
  shadowPrimary: '0 10px 25px rgba(99, 102, 241, 0.2)',
  shadowSecondary: '0 10px 25px rgba(236, 72, 153, 0.2)',
  shadowSoft: '0 4px 20px rgba(0, 0, 0, 0.08)',
};

export const animations = {
  fadeIn: {
    animation: 'fadeIn 0.5s ease-in-out',
  },
  slideUp: {
    animation: 'slideUp 0.3s ease-out',
  },
  bounce: {
    animation: 'bounce 0.6s ease-in-out',
  },
  pulse: {
    animation: 'pulse 2s infinite',
  },
  float: {
    animation: 'float 3s ease-in-out infinite',
  },
};

export const hoverEffects = {
  card: {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: marketingColors.shadowSoft,
    },
  },
  button: {
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: marketingColors.shadowPrimary,
    },
  },
  scale: {
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
};

export const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
    40%, 43% { transform: translateY(-8px); }
    70% { transform: translateY(-4px); }
    90% { transform: translateY(-2px); }
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes shimmer {
    0% { background-position: -468px 0; }
    100% { background-position: 468px 0; }
  }
`;

export default {
  marketingColors,
  animations,
  hoverEffects,
  keyframes,
};
