import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Views } from './components';
import UserContext from './components/UserContext';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Grid>
        <Box padding={{ base: '1rem 2rem', md: '1rem 4rem' }}>
          <UserContext>
            <Views />
          </UserContext>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
