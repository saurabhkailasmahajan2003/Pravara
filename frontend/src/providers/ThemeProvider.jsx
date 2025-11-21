import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme as customTheme } from '../theme';

export const ThemeProvider = ({ children }) => {
  const theme = createTheme(customTheme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
