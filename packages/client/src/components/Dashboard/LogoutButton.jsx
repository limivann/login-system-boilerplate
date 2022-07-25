import { Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/auth/logout', {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res || !res.ok || res.status >= 400) {
        return;
      }
      const data = await res.json();
      if (data && data.logout) {
        navigate('/login');
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return <Button onClick={() => handleLogout()}>Logout</Button>;
};

export default LogoutButton;
