export interface AppTheme {
  colors: {
    background: string;
    foreground: string;
    button: string;
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    accent: string;
    border: string;
    hot: string;
    success: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    heading: { fontSize: string; fontWeight: number; lineHeight: string };
    subheading: { fontSize: string; fontWeight: number; lineHeight: string };
    body: { fontSize: string; fontWeight: number; lineHeight: string };
    caption: { fontSize: string; fontWeight: number; lineHeight: string };
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  maxWidth: string;
}

export const lightTheme: AppTheme = {
  colors: {
    background: '#f2f4f5',
    foreground: '#ffffff',
    button: '#f2f4f6',
    text: {
      primary: '#191f28',
      secondary: '#8b95a1',
      tertiary: '#b0b8c1',
    },
    accent: '#3182f6',
    border: '#e5e8eb',
    hot: '#f04452',
    success: '#00c853',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    heading: { fontSize: '20px', fontWeight: 700, lineHeight: '28px' },
    subheading: { fontSize: '16px', fontWeight: 600, lineHeight: '24px' },
    body: { fontSize: '14px', fontWeight: 400, lineHeight: '22px' },
    caption: { fontSize: '12px', fontWeight: 400, lineHeight: '18px' },
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  },
  maxWidth: '480px',
};

export const darkTheme: AppTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#101012',
    foreground: '#1c1c1e',
    button: '#2c2d35',
    text: {
      primary: '#f5f5f7',
      secondary: '#aeaeb2',
      tertiary: '#636366',
    },
    border: '#2c2d35',
  },
};
