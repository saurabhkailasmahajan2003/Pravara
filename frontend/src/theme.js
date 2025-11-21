export const theme = {
  palette: {
    primary: {
      main: '#1E88E5',  // Blue
      light: '#64B5F6',
      dark: '#1565C0',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4CAF50',  // Green
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F44336',  // Red
      light: '#E57373',
      dark: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFA000',  // Amber
      light: '#FFD54F',
      dark: '#FF8F00',
      contrastText: '#000000',
    },
    info: {
      main: '#2196F3',  // Light Blue
      light: '#4FC3F7',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',  // Green
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',  // Light Gray
      paper: '#FFFFFF',    // White
    },
    text: {
      primary: '#212121',  // Dark Gray
      secondary: '#757575',
      disabled: '#BDBDBD',
      hint: '#9E9E9E',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
      color: '#1E88E5',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3,
      color: '#1E88E5',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.3,
      color: '#1E88E5',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#1E88E5',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#1E88E5',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#1E88E5',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#757575',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#212121',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)',
    '0px 3px 1px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.07),0px 1px 5px 0px rgba(0,0,0,0.06)',
    // Add more shadow levels as needed
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
          '&:hover': {
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
        },
      },
    },
  },
};
