import { describe, it, expect, beforeEach } from 'vitest';
import { useThemeStore } from '@/store/useThemeStore';

describe('useThemeStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useThemeStore.setState({ theme: 'light' });
  });

  it('should initialize with light theme', () => {
    const { theme } = useThemeStore.getState();
    expect(theme).toBe('light');
  });

  it('should set theme', () => {
    const { setTheme } = useThemeStore.getState();
    setTheme('dark');
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('should toggle theme from light to dark', () => {
    const { toggleTheme } = useThemeStore.getState();
    toggleTheme();
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    const { setTheme, toggleTheme } = useThemeStore.getState();
    setTheme('dark');
    toggleTheme();
    expect(useThemeStore.getState().theme).toBe('light');
  });
});
