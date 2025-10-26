// src/providers/CustomThemeProvider.tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ReactNode, createContext, useContext } from 'react';
import { darkTheme } from './theme';

interface CustomThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextValue {
  mode: 'light' | 'dark';
}

const ThemeModeContext = createContext<ThemeContextValue>({
  mode: 'dark',
});

// custom hook to use the theme context
export const useThemeMode = () => useContext(ThemeModeContext);

const mode = 'dark';
const theme = darkTheme;

export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  return (
    <ThemeModeContext.Provider value={{ mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
