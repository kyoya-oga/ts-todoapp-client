import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import { customTheme } from './theme/customTheme';

const App: FC = (): ReactElement => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
};

export default App;
