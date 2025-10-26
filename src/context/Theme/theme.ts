import { createTheme, ThemeOptions } from '@mui/material/styles';

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
      default: 'var(--bg-default)', // body background
      paper: 'transparent', // AppBar, Card, Paper background
    },
    text: {
      primary: 'var(--text-color-default)',
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
