// src/providers/CustomThemeProvider.tsx
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { ReactNode, useState, useMemo, createContext, useContext } from 'react';
import { lightTheme, darkTheme } from './theme';

interface CustomThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextValue {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeContextValue>({
  mode: 'light',
  toggleMode: () => {},
});

// custom hook to use the theme context
export const useThemeMode = () => useContext(ThemeModeContext);

export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const toggleMode = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode],
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ':root': {
              '--color-primary': theme.palette.primary.main,
              '--color-secondary': theme.palette.secondary.main,
              '--color-background': theme.palette.background.default,
              '--text-primary': theme.palette.text.primary,
            },
          }}
        />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
