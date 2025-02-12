"use client";

import { createContext } from 'react';

export const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}>({
  theme: 'dark',
  setTheme: () => {},
});
