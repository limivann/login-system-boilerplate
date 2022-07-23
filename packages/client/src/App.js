import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Views } from './components';
import UserContext from './components/UserContext';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <UserContext>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Views />
          </UserContext>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
