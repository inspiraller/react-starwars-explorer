import { createTheme, ThemeOptions } from '@mui/material/styles';

const getCSSVar = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name) || fallback;

export const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: '"FunnelSans", "Roboto", "Helvetica", "Arial", sans-serif',
    htmlFontSize: 10, // base = 10px
    fontSize: 14, // base text = 14px
    button: {
      fontSize: '1.4rem',
      textTransform: 'none',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
  },
};

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    background: {
      default: getCSSVar('var(--bg-default)', '#000'), // body background
      paper: 'transparent', // AppBar, Card, Paper background
    },
    text: {
      primary: getCSSVar('var(--text-color-default)', '#efefef'),
    },
  },
  components: {
    ...baseTheme.components,
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #000000;
          color: #ffffff;
        }
      `,
    },
  },
});
