import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AccountContext } from './UserContext';

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
