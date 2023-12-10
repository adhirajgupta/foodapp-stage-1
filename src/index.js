import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '15px', // Adjust as needed
          height: '15px',
        },
        barColorPrimary: {
          backgroundColor: '#29215D',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: '0px 0px 0px 0px', // Set box shadow to '0' to remove it
          border: '1px solid #e0e0e0', // Add a border if needed
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
