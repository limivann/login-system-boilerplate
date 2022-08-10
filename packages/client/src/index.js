import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
console.log(theme.config.initialColorMode);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript
          initialColorMode={{
            initialColorMode: 'dark',
            useSystemColorMode: false,
          }}
        />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
