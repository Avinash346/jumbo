'use client';

import { ReactNode, useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useThemeStore((state) => state.theme);

  // Apply theme to html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
};
