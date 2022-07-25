import { Heading, Text, Box, Stack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AccountContext } from '../UserContext';
import LogoutButton from './LogoutButton';

const Homepage = () => {
  const { user } = useContext(AccountContext);
  return (
    <Box>
      <Heading flexDirection="flex-start" mb="1rem">
        Dashboard
      </Heading>
      <Text as="p" mb="1rem">
        Welcome to the home page, {user.username}.
      </Text>
      <LogoutButton />
    </Box>
  );
};

export default Homepage;
