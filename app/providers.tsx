'use client';

import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { lightTheme, darkTheme } from '@/styles/theme';
import { makeQueryClient } from '@/lib/queryClient';
import { useThemeMode } from '@/hooks/useThemeMode';
import EmotionRegistry from './registry';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());
  const isDark = useThemeMode();

  return (
    <EmotionRegistry>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </EmotionRegistry>
  );
}
