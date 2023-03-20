import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './components/Routes';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
);
