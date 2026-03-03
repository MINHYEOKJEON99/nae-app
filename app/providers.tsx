'use client';

import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { lightTheme } from '@/styles/theme';
import { makeQueryClient } from '@/lib/queryClient';
import EmotionRegistry from './registry';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <EmotionRegistry>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </EmotionRegistry>
  );
}
