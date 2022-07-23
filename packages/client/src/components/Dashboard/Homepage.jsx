import { Heading, Text, Box } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AccountContext } from '../UserContext';

const Homepage = () => {
  const { user } = useContext(AccountContext);
  console.log(user);
  return (
    <Box>
      <Heading flexDirection="flex-start" mb="1rem">
        Dashboard
      </Heading>
      <Text as="p">Welcome to the home page, {user.username}.</Text>
    </Box>
  );
};

export default Homepage;
