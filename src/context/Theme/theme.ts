import { createTheme, ThemeOptions } from '@mui/material/styles';

export const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: '"FunnelSans", "Roboto", "Helvetica", "Arial", sans-serif',
    htmlFontSize: 10, // base = 10px (because 62.5%)
    fontSize: 14, // base text = 14px
    button: {
      fontSize: '1.4rem', // match body size (14px)
      textTransform: 'none', // optional — disable uppercase
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem', // ensure TextField / Input match
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem', // ensure Button matches
        },
      },
    },
  },
};
export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    background: {
      default: '#f5f6fa', // starlight mist
      paper: '#ffffff',
    },
    primary: {
      main: '#304FFE', // vibrant blue lightsaber
      light: '#7a7cff',
      dark: '#0026ca',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFC107', // gold accent
      light: '#fff350',
      dark: '#c79100',
      contrastText: '#000',
    },
    text: {
      primary: '#111',
      secondary: '#555',
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    background: {
      default: '#0b0c10', // deep space
      paper: '#1f2833',
    },
    primary: {
      main: '#00B0FF', // glowing blue saber
      light: '#69e2ff',
      dark: '#0081cb',
      contrastText: '#000',
    },
    secondary: {
      main: '#FFD700', // golden glow
      light: '#ffef62',
      dark: '#c7a500',
      contrastText: '#000',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
    },
  },
});
