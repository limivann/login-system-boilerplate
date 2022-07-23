import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Register } from './Login';
import PrivateRoutes from './PrivateRoutes';
import { AccountContext } from './UserContext';
import { Text } from '@chakra-ui/react';
import { Homepage } from './Dashboard';

const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <Text>Loading</Text>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Homepage />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;
