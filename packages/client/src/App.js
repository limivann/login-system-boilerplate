import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Views } from './components';
import UserContext from './components/UserContext';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl" position="relative">
        <Box right="0" position="absolute" padding="1rem">
          <ColorModeSwitcher />
        </Box>
        <Box padding={{ base: '4rem 2rem', md: '4rem 4rem' }}>
          <UserContext>
            <Views />
          </UserContext>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
