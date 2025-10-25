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
      default: '#121212', // Very dark gray background
      paper: '#1e1e1e', // Slightly lighter dark gray paper/card background
    },
    primary: {
      main: '#e0e0e0', // Light gray for primary actions/buttons
      light: '#ffffff',
      dark: '#b0b0b0',
      contrastText: '#000', // Black text on light primary
    },
    secondary: {
      main: '#a0a0a0', // Medium light gray for secondary actions
      light: '#cccccc',
      dark: '#707070',
      contrastText: '#000', // Black text on medium secondary
    },
    text: {
      primary: '#ffffff', // White for main text
      secondary: '#e0e0e0', // Light gray for secondary text
    },
  },
});
